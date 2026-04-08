import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

const BASE_URL = 'https://lechoppeducode.com'
const locales = ['fr', 'en']

const legalPages = [
  'mentions-legales',
  'politique-de-confidentialite',
  'gestion-des-cookies',
  'conditions-generales',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const homepages = locales.map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 1.0,
  }))

  const legalRoutes = locales.flatMap((locale) =>
    legalPages.map((page) => ({
      url: `${BASE_URL}/${locale}/${page}`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    }))
  )

  const blogListings = locales.map((locale) => ({
    url: `${BASE_URL}/${locale}/blog`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const blogArticles = locales.flatMap((locale) =>
    getAllPosts(locale).map((post) => ({
      url: `${BASE_URL}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  )

  return [...homepages, ...blogListings, ...blogArticles, ...legalRoutes]
}
