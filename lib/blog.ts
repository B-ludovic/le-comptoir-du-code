import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type PostMeta = {
  slug: string
  title: string
  description: string
  date: string
  excerpt: string
  /* Résumé de l'article en deux ou trois phrases autonomes. Distinct de
     `description` et d'`excerpt`, qui sont des accroches : celui-ci donne la
     conclusion, pour être lisible — et citable — sans lire l'article. */
  summary?: string[]
  coverImage?: string
  alternate_slug?: string
}

export type Post = PostMeta & {
  content: string
}

const contentDir = path.join(process.cwd(), 'content/blog')

export function getPostSlugs(locale: string): string[] {
  const dir = path.join(contentDir, locale)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

export function getPost(slug: string, locale: string): Post | null {
  /* Le slug et la locale viennent de l'URL et sont concaténés dans un chemin
     de fichier. La plateforme rejette aujourd'hui les séparateurs encodés,
     mais c'est elle qui nous protège, pas nous : on refuse ici tout ce qui
     n'est pas un segment simple avant de toucher au système de fichiers. */
  if (!/^[a-z0-9-]+$/.test(slug) || !/^[a-z]{2}$/.test(locale)) return null

  const filePath = path.join(contentDir, locale, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return {
    slug,
    title: data.title ?? '',
    description: data.description ?? '',
    date: data.date ?? '',
    excerpt: data.excerpt ?? '',
    summary: Array.isArray(data.summary) ? data.summary : undefined,
    coverImage: data.coverImage ?? null,
    alternate_slug: data.alternate_slug ?? null,
    content,
  }
}

export function getAllPosts(locale: string): PostMeta[] {
  return getPostSlugs(locale)
    .map((slug) => getPost(slug, locale))
    .filter((p): p is Post => p !== null)
    .map(({ slug, title, description, date, excerpt, summary, alternate_slug }) => ({
      slug,
      title,
      description,
      date,
      excerpt,
      summary,
      alternate_slug,
    }))
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}
