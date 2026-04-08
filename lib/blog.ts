import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type PostMeta = {
  slug: string
  title: string
  description: string
  date: string
  excerpt: string
  coverImage?: string
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
    coverImage: data.coverImage ?? null,
    content,
  }
}

export function getAllPosts(locale: string): PostMeta[] {
  return getPostSlugs(locale)
    .map((slug) => getPost(slug, locale))
    .filter((p): p is Post => p !== null)
    .map(({ slug, title, description, date, excerpt }) => ({
      slug,
      title,
      description,
      date,
      excerpt,
    }))
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}
