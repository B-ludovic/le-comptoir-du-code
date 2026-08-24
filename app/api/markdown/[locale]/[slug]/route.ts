import { getPost } from '@/lib/blog'
import { BASE_URL } from '@/lib/structured-data'

/* Source Markdown d'un article, servie sous /{locale}/blog/{slug}.md par la
   réécriture déclarée dans next.config.ts. La convention « la même URL avec
   .md » est ce que suivent les crawlers de moteurs génératifs : ils y trouvent
   le texte sans navigation, sans styles et sans JSON-LD à écarter.

   Le handler vit sous /api pour que le segment dynamique reste un segment
   propre : Next ne sait pas nommer un dossier « [slug].md ». */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string; slug: string }> },
) {
  const { locale, slug } = await params
  const post = getPost(slug, locale)
  if (!post) return new Response('Not found', { status: 404 })

  const canonical = `${BASE_URL}/${locale}/blog/${post.slug}`
  const brief = post.summary?.length ? `> ${post.summary.join('\n> ')}\n\n` : ''

  const body = [
    `# ${post.title}`,
    '',
    `${post.description}`,
    '',
    `Publié le ${post.date} — ${canonical}`,
    `Auteur : Ludovic BATAILLE — L'Échoppe du Code`,
    '',
    brief + post.content.trim(),
    '',
  ].join('\n')

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      /* Dit au moteur quelle URL fait autorité : la page HTML, pas ce miroir.
         Sans ça, les deux se concurrencent dans l'index. */
      Link: `<${canonical}>; rel="canonical"`,
      'X-Robots-Tag': 'noindex',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
