import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

const BASE_URL = 'https://lechoppeducode.com'
const locales = ['fr', 'en']

const legalPages = [
  'mentions-legales',
  'politique-de-confidentialite',
  'gestion-des-cookies',
  'conditions-generales',
  'conditions-cadrage',
]

/* Date de dernière révision éditoriale, tenue à la main.
   `new Date()` renverrait la date du build : le sitemap annoncerait alors une
   modification à chaque déploiement, y compris pour des pages inchangées. Un
   signal de fraîcheur qui se déclenche tout le temps ne signale plus rien. */
const CONTENT_LAST_REVIEWED = new Date('2026-08-17')

/* hreflang dans le sitemap : indique aux moteurs que /fr et /en sont deux
   versions de la même page et non deux pages concurrentes. */
function withAlternates(path: string) {
  return {
    languages: Object.fromEntries(
      locales.map(locale => [locale, `${BASE_URL}/${locale}${path}`]),
    ),
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const homepages = locales.map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: CONTENT_LAST_REVIEWED,
    changeFrequency: 'monthly' as const,
    priority: 1.0,
    alternates: withAlternates(''),
  }))

  const legalRoutes = locales.flatMap((locale) =>
    legalPages.map((page) => ({
      url: `${BASE_URL}/${locale}/${page}`,
      lastModified: CONTENT_LAST_REVIEWED,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
      alternates: withAlternates(`/${page}`),
    }))
  )

  const blogListings = locales.map((locale) => ({
    url: `${BASE_URL}/${locale}/blog`,
    lastModified: CONTENT_LAST_REVIEWED,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
    alternates: withAlternates('/blog'),
  }))

  /* Les articles portent leur propre date de publication, qui est un vrai
     signal de fraîcheur. Le hreflang s'appuie sur alternate_slug, les slugs
     étant traduits d'une langue à l'autre. */
  const blogArticles = locales.flatMap((locale) =>
    getAllPosts(locale).map((post) => {
      const altLocale = locale === 'fr' ? 'en' : 'fr'
      const altSlug = post.alternate_slug ?? post.slug
      return {
        url: `${BASE_URL}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        alternates: {
          languages: {
            [locale]: `${BASE_URL}/${locale}/blog/${post.slug}`,
            [altLocale]: `${BASE_URL}/${altLocale}/blog/${altSlug}`,
          },
        },
      }
    })
  )

  const profileRoutes = locales.map((locale) => ({
    url: `${BASE_URL}/${locale}/a-propos`,
    lastModified: CONTENT_LAST_REVIEWED,
    changeFrequency: 'yearly' as const,
    priority: 0.7,
    alternates: withAlternates('/a-propos'),
  }))

  const faqRoutes = locales.map((locale) => ({
    url: `${BASE_URL}/${locale}/faq`,
    lastModified: CONTENT_LAST_REVIEWED,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
    alternates: withAlternates('/faq'),
  }))

  const solidaireRoutes = locales.map((locale) => ({
    url: `${BASE_URL}/${locale}/echoppe-solidaire`,
    lastModified: CONTENT_LAST_REVIEWED,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
    alternates: withAlternates('/echoppe-solidaire'),
  }))

  return [
    ...homepages,
    ...profileRoutes,
    ...solidaireRoutes,
    ...faqRoutes,
    ...blogListings,
    ...blogArticles,
    ...legalRoutes,
  ]
}
