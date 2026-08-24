import { getAllPosts, getPost } from '@/lib/blog'
import { BASE_URL } from '@/lib/structured-data'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }]
}

/* Cinq caractères sont interdits dans un document XML. Les laisser passer
   produit un flux que les agrégateurs rejettent en bloc — pas un article
   abîmé, tout le flux. */
function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/* RSS impose la date au format RFC 822, que toLocaleString ne sait pas
   produire. Les noms de jours et de mois y sont en anglais quelle que soit la
   langue du flux : c'est une contrainte du format, pas un oubli de traduction. */
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function rfc822(iso: string): string {
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    `${DAYS[d.getUTCDay()]}, ${pad(d.getUTCDate())} ${MONTHS[d.getUTCMonth()]} ` +
    `${d.getUTCFullYear()} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())} GMT`
  )
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale: raw } = await params
  const locale = raw === 'en' ? 'en' : 'fr'
  const isFr = locale === 'fr'

  const feedUrl = `${BASE_URL}/${locale}/blog/rss.xml`
  const blogUrl = `${BASE_URL}/${locale}/blog`
  const title = isFr ? "Le Carnet — L'Échoppe du Code" : "Journal — L'Échoppe du Code"
  const description = isFr
    ? "Articles sur la création de site internet, le coût réel des plateformes et l'artisanat numérique."
    : 'Articles on building a website, the real cost of platforms and digital craftsmanship.'

  const posts = getAllPosts(locale)

  const items = posts
    .map((meta) => {
      const post = getPost(meta.slug, locale)
      if (!post) return ''
      const url = `${BASE_URL}/${locale}/blog/${post.slug}`
      /* La synthèse plutôt que l'accroche : un lecteur de flux doit pouvoir
         décider s'il ouvre l'article sans avoir à l'ouvrir. */
      const body = post.summary?.length ? post.summary.join(' ') : post.description
      return `    <item>
      <title>${esc(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(post.date)}</pubDate>
      <description>${esc(body)}</description>
      ${post.coverImage ? `<enclosure url="${BASE_URL}${post.coverImage}" type="image/png" length="0" />` : ''}
    </item>`
    })
    .filter(Boolean)
    .join('\n')

  const lastBuild = posts[0] ? rfc822(posts[0].date) : rfc822(new Date(0).toISOString())

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(title)}</title>
    <link>${blogUrl}</link>
    <description>${esc(description)}</description>
    <language>${locale}</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <managingEditor>contact@lechoppeducode.com (Ludovic BATAILLE)</managingEditor>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
