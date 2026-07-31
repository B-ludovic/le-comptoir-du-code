import type { Post } from '@/lib/blog'

/* Données structurées propres à une page, en complément du bloc
   ProfessionalService global posé par le layout.

   Sans BlogPosting, un article ne se distingue pas d'une page commerciale :
   ni auteur, ni date de publication, ni langue exploitables. C'est ce qui
   permet à un moteur — génératif ou non — d'attribuer une citation à
   quelqu'un plutôt que de reprendre un texte anonyme. */

export const BASE_URL = 'https://lechoppeducode.com'

const author = {
  '@type': 'Person',
  name: 'Ludovic BATAILLE',
  jobTitle: 'Développeur Web Freelance',
  url: BASE_URL,
  sameAs: ['https://github.com/B-ludovic'],
} as const

const publisher = {
  '@type': 'Organization',
  name: "L'Echoppe du Code",
  url: BASE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/logo.png`,
  },
} as const

export function blogPostingJsonLd(post: Post, locale: string) {
  const url = `${BASE_URL}/${locale}/blog/${post.slug}`

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    /* Faute de suivi des révisions, la date de modification vaut celle de
       publication : mieux vaut une valeur exacte qu'une fraîcheur simulée. */
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: locale === 'en' ? 'en' : 'fr',
    author,
    publisher,
    image: `${BASE_URL}${post.coverImage ?? '/og-image.png'}`,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    isPartOf: {
      '@type': 'Blog',
      name: locale === 'en' ? 'Journal' : 'Le Carnet',
      url: `${BASE_URL}/${locale}/blog`,
    },
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.path}`,
    })),
  }
}
