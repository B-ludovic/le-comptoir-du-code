import { MetadataRoute } from 'next'

const BASE_URL = 'https://lecomptoirducode.fr'
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

  return [...homepages, ...legalRoutes]
}
