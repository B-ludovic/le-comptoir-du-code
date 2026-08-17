import type { Post } from '@/lib/blog'

/* Sans BlogPosting, un article ne se distingue pas d'une page commerciale :
   ni auteur, ni date de publication, ni langue exploitables. C'est ce qui
   permet à un moteur — génératif ou non — d'attribuer une citation à
   quelqu'un plutôt que de reprendre un texte anonyme. */

export const BASE_URL = 'https://lechoppeducode.com'

export const ORGANIZATION_ID = `${BASE_URL}/#organization`
export const PERSON_ID = `${BASE_URL}/#person`

type Locale = 'fr' | 'en'
type Bilingual = { fr: string; en: string }

const authorRef = { '@id': PERSON_ID } as const
const publisherRef = { '@id': ORGANIZATION_ID } as const

const SAME_AS = [
  'https://github.com/B-ludovic',
  'https://www.linkedin.com/in/ludovic-bataille-2a8aa0371/',
  'https://b-ludovic.dev',
]

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
    author: authorRef,
    publisher: publisherRef,
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

export function faqJsonLd(
  entries: { question: string; answer: string[] }[],
  rawLocale: string,
) {
  const locale: Locale = rawLocale === 'en' ? 'en' : 'fr'
  const url = `${BASE_URL}/${locale}/faq`

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': url,
    url,
    inLanguage: locale,
    name:
      locale === 'en'
        ? "Frequently asked questions — L'Echoppe du Code"
        : "Questions fréquentes — L'Echoppe du Code",
    publisher: publisherRef,
    author: authorRef,
    mainEntity: entries.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: entry.answer.join(' '),
      },
    })),
  }
}

export function portfolioJsonLd(
  projects: { title: string; desc: string; stack: string; url: string | null }[],
  rawLocale: string,
) {
  const locale: Locale = rawLocale === 'en' ? 'en' : 'fr'

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: locale === 'en' ? 'Selected work' : "Réalisations de L'Echoppe du Code",
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'WebApplication',
        name: project.title,
        description: project.desc,
        applicationCategory: 'BusinessApplication',
        inLanguage: locale,
        creator: authorRef,
        provider: publisherRef,
        ...(project.url ? { url: project.url } : {}),
        keywords: project.stack.split(' · ').join(', '),
      },
    })),
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

type OfferSpec = {
  name: string
  price?: string
  unit?: 'MON' | 'DAY'
  description: Bilingual
}

/* eligibleCustomerType porte le vocabulaire GoodRelations, seul moyen en
   schema.org de dire « réservé aux structures non commerciales ». */
const NON_BUSINESS = 'http://purl.org/goodrelations/v1#NonBusinessEntity'

const standardOffers: OfferSpec[] = [
  {
    name: 'La Présence — Site Vitrine',
    price: '1450.00',
    description: {
      fr: 'Site vitrine sur-mesure à partir de 1 450 € HT. Idéal pour artisans, indépendants et petites entreprises.',
      en: 'Custom marketing website from €1,450 excluding VAT. Suited to craftspeople, freelancers and small businesses.',
    },
  },
  {
    name: "L'E-commerce & Réservation",
    price: '2850.00',
    description: {
      fr: 'Boutique en ligne ou système de réservation à partir de 2 850 € HT. Inclut 1 an de maintenance.',
      en: 'Online shop or booking system from €2,850 excluding VAT. Includes one year of maintenance.',
    },
  },
  {
    name: 'Les Outils Sur-Mesure',
    price: '4800.00',
    description: {
      fr: 'Application web sur-mesure à partir de 4 800 € HT. Inclut 1 an de maintenance.',
      en: 'Custom web application from €4,800 excluding VAT. Includes one year of maintenance.',
    },
  },
  {
    name: 'Cadrage Vitrine',
    price: '290.00',
    description: {
      fr: "Atelier de cadrage et dossier écrit pour un site vitrine : choix de solution, arborescence, conformité RGPD, périmètre de la V1. 290 € HT. 50 % imputables sur le développement en cas de signature sous trois mois.",
      en: 'Scoping workshop and written report for a marketing website: solution choice, site structure, GDPR compliance, scope of the first version. €290 excluding VAT. 50 % set off against development if a quote is signed within three months.',
    },
  },
  {
    name: 'Cadrage E-commerce & Business',
    price: '590.00',
    description: {
      fr: "Atelier de cadrage et dossier écrit pour un projet de vente en ligne ou de réservation : tunnel de vente, solution de paiement, workflows, conformité RGPD e-commerce. 590 € HT. 50 % imputables sur le développement en cas de signature sous trois mois.",
      en: 'Scoping workshop and written report for an online sales or booking project: sales funnel, payment provider, workflows, e-commerce GDPR compliance. €590 excluding VAT. 50 % set off against development if a quote is signed within three months.',
    },
  },
  {
    name: 'Cadrage Architecture Métier',
    price: '1190.00',
    description: {
      fr: "Atelier de cadrage et dossier d'architecture pour une application métier : modèle de données, back-office, rôles et permissions, sécurité, modèle économique. 1 190 € HT. 50 % imputables sur le développement en cas de signature sous trois mois.",
      en: 'Scoping workshop and architecture report for a business application: data model, back office, roles and permissions, security, business model. €1,190 excluding VAT. 50 % set off against development if a quote is signed within three months.',
    },
  },
  {
    name: 'Conception produit',
    price: '650.00',
    unit: 'DAY',
    description: {
      fr: "Conception de produit à la journée, lorsque le projet reste à inventer : fonctionnalités, règles de gestion, structure des contenus, modèle économique. 650 € HT par jour.",
      en: 'Product design billed by the day, when the product is still to be invented: features, business rules, content structure, business model. €650 per day excluding VAT.',
    },
  },
  {
    name: 'Maintenance & sécurité — Site vitrine',
    price: '70.00',
    unit: 'MON',
    description: {
      fr: 'Mises à jour de sécurité et correction des bugs bloquants pour un site vitrine. Option facultative, 70 € HT par mois.',
      en: 'Security updates and blocking-bug fixes for a marketing website. Optional, €70 per month excluding VAT.',
    },
  },
  {
    name: 'Maintenance & sécurité — E-commerce & Réservation',
    price: '85.00',
    unit: 'MON',
    description: {
      fr: "Mises à jour de sécurité et correction des bugs bloquants. Un an inclus à la livraison du forfait E-commerce & Réservation, puis 85 € HT par mois.",
      en: 'Security updates and blocking-bug fixes. One year included with the E-commerce & Booking package, then €85 per month excluding VAT.',
    },
  },
  {
    name: 'Maintenance & sécurité — Outils Sur-Mesure',
    price: '165.00',
    unit: 'MON',
    description: {
      fr: "Mises à jour de sécurité et correction des bugs bloquants. Un an inclus à la livraison du forfait Outils Sur-Mesure, puis à partir de 165 € HT par mois.",
      en: 'Security updates and blocking-bug fixes. One year included with the Custom Tools package, then from €165 per month excluding VAT.',
    },
  },
]

const solidaireOffers: OfferSpec[] = [
  {
    name: 'Cadrage (tarif associatif)',
    price: '145.00',
    description: {
      fr: 'Atelier de cadrage et dossier écrit au tarif associatif, à partir de 145 € HT.',
      en: 'Scoping workshop and written report at the non-profit rate, from €145 excluding VAT.',
    },
  },
  {
    name: 'La Présence — Site Vitrine (tarif associatif)',
    price: '725.00',
    description: {
      fr: 'Site vitrine sur-mesure à partir de 725 € HT au lieu de 1 450 € HT. Maintenance solidaire à partir de 40 € HT par mois.',
      en: 'Custom marketing website from €725 instead of €1,450 excluding VAT. Solidarity maintenance from €40 per month.',
    },
  },
  {
    name: "L'E-commerce & Dons (tarif associatif)",
    price: '1425.00',
    description: {
      fr: "Boutique en ligne ou collecte de dons à partir de 1 425 € HT au lieu de 2 850 € HT. Sécurisation des dons via Stripe, sans commission intermédiaire. Maintenance solidaire à partir de 50 € HT par mois.",
      en: 'Online shop or donation collection from €1,425 instead of €2,850 excluding VAT. Donations secured through Stripe with no intermediary commission. Solidarity maintenance from €50 per month.',
    },
  },
  {
    /* Pas de champ price : la page annonce « sur étude budgétaire », et
       déduire la moitié du tarif standard serait inventer un chiffre. */
    name: 'Les Outils Sur-Mesure (tarif associatif)',
    description: {
      fr: 'Application métier sur-mesure pour association, sur étude budgétaire. Maintenance sur étude.',
      en: 'Custom business application for non-profits, on budget review. Maintenance on review.',
    },
  },
  {
    name: 'Maintenance solidaire — Site vitrine',
    price: '40.00',
    unit: 'MON',
    description: {
      fr: "Mises à jour de sécurité au tarif solidaire, à partir de 40 € HT par mois. Ce tarif n'est pas la moitié du tarif standard mais un barème dédié.",
      en: 'Security updates at the solidarity rate, from €40 per month excluding VAT. This is a dedicated rate, not half the standard price.',
    },
  },
  {
    name: 'Maintenance solidaire — E-commerce & Dons',
    price: '50.00',
    unit: 'MON',
    description: {
      fr: "Mises à jour de sécurité au tarif solidaire, à partir de 50 € HT par mois. Ce tarif n'est pas la moitié du tarif standard mais un barème dédié.",
      en: 'Security updates at the solidarity rate, from €50 per month excluding VAT. This is a dedicated rate, not half the standard price.',
    },
  },
]

function buildOffer(spec: OfferSpec, locale: Locale, nonProfit: boolean) {
  const priceBlock = spec.unit
    ? {
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: spec.price,
          priceCurrency: 'EUR',
          unitCode: spec.unit,
        },
      }
    : spec.price
      ? { price: spec.price, priceCurrency: 'EUR' }
      : { priceCurrency: 'EUR' }

  return {
    '@type': 'Offer',
    name: spec.name,
    ...priceBlock,
    ...(nonProfit ? { eligibleCustomerType: NON_BUSINESS } : {}),
    description: spec.description[locale],
  }
}

const orgDescription: Bilingual = {
  fr: "Développeur web freelance basé en Île-de-France. Cadrage de projet, création de sites vitrines, e-commerce et applications web sur-mesure. Code propre et performant, livré avec ses sources. Un an de mises à jour de sécurité inclus sur les forfaits E-commerce et Sur-Mesure.",
  en: 'Freelance web developer based in the Paris region of France. Project scoping, marketing websites, e-commerce and custom web applications. Clean, performant code delivered with its sources. One year of security updates included with the E-commerce and Custom Tools packages.',
}

const jobTitle: Bilingual = {
  fr: 'Développeur Web Freelance',
  en: 'Freelance Web Developer',
}

const serviceTypes: Record<Locale, string[]> = {
  fr: [
    'Création de site internet',
    'Développement web freelance',
    'Site vitrine sur-mesure',
    'Site e-commerce',
    'Application web sur-mesure',
  ],
  en: [
    'Website creation',
    'Freelance web development',
    'Custom marketing website',
    'E-commerce website',
    'Custom web application',
  ],
}

const catalogNames: Record<Locale, { standard: string; solidaire: string }> = {
  fr: {
    standard: 'Prestations de cadrage et de développement web',
    solidaire: "L'Échoppe Solidaire — tarification associative",
  },
  en: {
    standard: 'Web scoping and development services',
    solidaire: "L'Échoppe Solidaire — non-profit pricing",
  },
}

const solidaireDescription: Bilingual = {
  fr: "Mécénat de compétences de 50 % sur les forfaits de développement, réservé aux associations loi 1901 et structures à but non lucratif, en priorité LGBTQI+. Conditionné à la fourniture d'un récépissé de déclaration en préfecture ou équivalent.",
  en: '50 % skills sponsorship on development packages, reserved for registered non-profits, with priority given to LGBTQI+ organisations. Subject to proof of registration.',
}

export function siteGraphJsonLd(rawLocale: string) {
  const locale: Locale = rawLocale === 'en' ? 'en' : 'fr'
  const siteUrl = `${BASE_URL}/${locale}`

  const person = {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Ludovic BATAILLE',
    jobTitle: jobTitle[locale],
    url: siteUrl,
    email: 'contact@lechoppeducode.com',
    knowsLanguage: ['fr', 'en'],
    sameAs: SAME_AS,
    worksFor: { '@id': ORGANIZATION_ID },
    knowsAbout: [
      'Next.js',
      'React',
      'TypeScript',
      'NestJS',
      'Node.js',
      'PostgreSQL',
      'Stripe',
    ],
  }

  const organization = {
    '@type': 'ProfessionalService',
    '@id': ORGANIZATION_ID,
    name: "L'Echoppe du Code",
    description: orgDescription[locale],
    url: BASE_URL,
    email: 'contact@lechoppeducode.com',
    image: `${BASE_URL}/og-image.png`,
    logo: { '@type': 'ImageObject', url: `${BASE_URL}/logo.png` },
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    founder: { '@id': PERSON_ID },
    employee: { '@id': PERSON_ID },
    sameAs: SAME_AS,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: locale === 'en' ? 'sales' : 'commercial',
      email: 'contact@lechoppeducode.com',
      availableLanguage: ['fr', 'en'],
    },
    areaServed: [
      { '@type': 'City', name: 'Paris' },
      { '@type': 'AdministrativeArea', name: 'Île-de-France' },
      { '@type': 'Country', name: 'France' },
    ],
    serviceType: serviceTypes[locale],
    knowsAbout: [
      'Next.js',
      'React',
      'TypeScript',
      'NestJS',
      'Node.js',
      'PostgreSQL',
      locale === 'en' ? 'Web development' : 'Développement web',
      locale === 'en' ? 'Custom applications' : 'Applications sur-mesure',
      locale === 'en' ? 'Marketing websites' : 'Sites vitrines',
      'E-commerce',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Aulnay-sous-Bois',
      addressRegion: 'Île-de-France',
      addressCountry: 'FR',
    },
    hasOfferCatalog: [
      {
        '@type': 'OfferCatalog',
        name: catalogNames[locale].standard,
        itemListElement: standardOffers.map((o) => buildOffer(o, locale, false)),
      },
      /* Catalogue distinct plutôt que des offres marquées au sein du
         précédent : l'Échoppe Solidaire est une offre à part entière, avec ses
         propres tarifs de maintenance qui ne sont pas la moitié des standards. */
      {
        '@type': 'OfferCatalog',
        name: catalogNames[locale].solidaire,
        description: solidaireDescription[locale],
        itemListElement: solidaireOffers.map((o) => buildOffer(o, locale, true)),
      },
    ],
  }

  const website = {
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: "L'Echoppe du Code",
    description: orgDescription[locale],
    inLanguage: locale,
    publisher: publisherRef,
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [person, organization, website],
  }
}
