import type { Post } from '@/lib/blog'
import {
  TIERS,
  SCOPING_TIERS,
  SCOPING_NON_PROFIT_FROM,
  SCOPING_SET_OFF,
  PRODUCT_DESIGN_DAY_RATE,
  addonsFor,
  formatPrice,
  formatMonthly,
  type Tier,
  type TierId,
} from '@/lib/pricing'

/* Sans BlogPosting, un article ne se distingue pas d'une page commerciale :
   ni auteur, ni date de publication, ni langue exploitables. C'est ce qui
   permet à un moteur — génératif ou non — d'attribuer une citation à
   quelqu'un plutôt que de reprendre un texte anonyme. */

/* Domaine canonique : la forme avec www, parce que c'est celle que Vercel sert
   réellement — https://lechoppeducode.com répond 308 vers elle. Déclarer
   l'autre revenait à faire pointer chaque canonical, chaque @id et chaque URL
   du sitemap vers une redirection, ce qu'un moteur ignore purement et
   simplement. */
export const BASE_URL = 'https://www.lechoppeducode.com'

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
    /* `abstract` porte la synthèse affichée en tête d'article. description est
       une accroche destinée au clic ; abstract est la réponse de l'article, et
       c'est elle qu'un moteur peut restituer sans avoir à résumer lui-même. */
    ...(post.summary?.length ? { abstract: post.summary.join(' ') } : {}),
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
        ? "Frequently asked questions — L'Échoppe du Code"
        : "Questions fréquentes — L'Échoppe du Code",
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
    name: locale === 'en' ? 'Selected work' : "Réalisations de L'Échoppe du Code",
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

/* Index du Carnet. Sans ce nœud, la page de sommaire n'est qu'une liste de
   liens : rien ne dit qu'elle est le point d'entrée d'un blog, ni que les
   articles qu'elle recense ont un auteur et un éditeur communs. Le `Blog`
   porte cette appartenance, et `blogPost` rattache chaque entrée à son URL. */
export function blogIndexJsonLd(
  posts: { slug: string; title: string; description: string; date: string }[],
  rawLocale: string,
) {
  const locale: Locale = rawLocale === 'en' ? 'en' : 'fr'
  const url = `${BASE_URL}/${locale}/blog`

  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': url,
    url,
    name: locale === 'en' ? 'Journal' : 'Le Carnet',
    description:
      locale === 'en'
        ? 'Articles on building a website, the real cost of platforms and digital craftsmanship.'
        : "Articles sur la création de site internet, le coût réel des plateformes et l'artisanat numérique.",
    inLanguage: locale,
    author: authorRef,
    publisher: publisherRef,
    isPartOf: { '@id': `${BASE_URL}/${locale}/#website` },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      url: `${BASE_URL}/${locale}/blog/${post.slug}`,
      author: authorRef,
    })),
  }
}

/* Les avis clients, en entités autonomes rattachées à l'entreprise. Ils sont
   déclarés sur la page d'accueil, là où le bandeau les affiche.

   Chacun porte l'URL de sa source publique : c'est ce qui le rend vérifiable
   et le distingue d'un texte qu'on aurait pu écrire soi-même. `publisher`
   désigne la plateforme où l'avis a d'abord paru, pas celui qui le republie.

   Pas de reviewRating ni d'aggregateRating : la source n'affiche aucune note
   chiffrée, et Google n'accorde de toute façon plus de rich result aux avis
   qu'un site publie sur lui-même. La valeur est ailleurs — un moteur génératif
   y trouve des phrases attribuées à des personnes nommées et vérifiables. */
export function reviewsJsonLd(
  reviews: {
    id: string
    author: string
    organisation: string
    datePublished: string
    body: string
  }[],
  rawLocale: string,
  source: { url: string; name: string },
) {
  const locale: Locale = rawLocale === 'en' ? 'en' : 'fr'
  const pageUrl = `${BASE_URL}/${locale}`

  return reviews.map((review) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    '@id': `${pageUrl}#${review.id}`,
    author: {
      '@type': 'Person',
      name: review.author,
      worksFor: { '@type': 'Organization', name: review.organisation },
    },
    datePublished: review.datePublished,
    reviewBody: review.body,
    /* Les avis ont été écrits en français : le déclarer évite qu'un moteur les
       attribue à la version anglaise du site. */
    inLanguage: 'fr',
    itemReviewed: { '@id': ORGANIZATION_ID },
    url: source.url,
    publisher: { '@type': 'Organization', name: source.name, url: source.url },
  }))
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

/* eligibleCustomerType porte le vocabulaire GoodRelations, seul moyen en
   schema.org de dire « réservé aux structures non commerciales ». */
const NON_BUSINESS = 'http://purl.org/goodrelations/v1#NonBusinessEntity'

/* Les offres ne sont plus recopiées ici : elles sont dérivées de la grille de
   lib/pricing.ts, comme les cartes de la page d'accueil, le llms.txt et le
   devis. Un seul endroit à modifier quand un prix bouge, donc plus de
   catalogue qui annonce un montant que la page dément. */

const tierPitch: Record<TierId, Bilingual> = {
  presence: {
    fr: 'Site vitrine sur-mesure : design, jusqu’à 5 pages, SEO technique et mise en ligne.',
    en: 'Custom marketing website: design, up to 5 pages, technical SEO and launch.',
  },
  boutique: {
    fr: 'Boutique en ligne : catalogue, paiements Stripe sécurisés, gestion des commandes et back-office.',
    en: 'Online shop: catalogue, secure Stripe payments, order management and back office.',
  },
  outils: {
    fr: 'Application métier sur-mesure : modélisation des données, rôles et permissions, tableau de bord, back-office.',
    en: 'Custom business application: data modelling, roles and permissions, dashboard, back office.',
  },
}

const priceBlock = (price: number) => ({ price: price.toFixed(2), priceCurrency: 'EUR' })

const monthlyBlock = (price: number) => ({
  priceSpecification: {
    '@type': 'UnitPriceSpecification',
    price: price.toFixed(2),
    priceCurrency: 'EUR',
    unitCode: 'MON',
  },
})

function sentence(parts: string[]): string {
  return parts.filter(Boolean).join(' ')
}

/* Un socle et ses modules donnent deux offres distinctes : le socle porte un
   prix ferme, chaque module porte le sien. Les noyer dans une seule offre
   « à partir de » reviendrait à cacher ce que le client peut retirer. */
function tierOffers(t: Tier, locale: Locale, nonProfit: boolean) {
  const price = nonProfit ? t.nonProfitPrice : t.price
  const maintenance = nonProfit ? t.maintenance.nonProfitPrice : t.maintenance.price
  const suffix = nonProfit
    ? locale === 'en'
      ? ' Non-profit rate, 50 % skills sponsorship.'
      : ' Tarif associatif, mécénat de compétences de 50 %.'
    : ''

  const socle = {
    '@type': 'Offer',
    name: nonProfit ? `${t.name} (tarif associatif)` : t.name,
    ...priceBlock(price),
    ...(nonProfit ? { eligibleCustomerType: NON_BUSINESS } : {}),
    description: sentence([
      tierPitch[t.id][locale],
      locale === 'en'
        ? `${t.days} days of engineering, ${formatPrice(price, 'en')} excluding VAT.`
        : `${t.days} jours d’ingénierie, ${formatPrice(price, 'fr')} HT.`,
      locale === 'en'
        ? `${t.maintenance.includedMonths} months of security updates included, then ${formatMonthly(maintenance, 'en')}.`
        : `${t.maintenance.includedMonths} mois de mises à jour de sécurité inclus, puis ${formatMonthly(maintenance, 'fr')}.`,
      suffix.trim(),
    ]),
  }

  const upkeep = {
    '@type': 'Offer',
    name: locale === 'en'
      ? `Security maintenance — ${t.name}`
      : `Maintenance & sécurité — ${t.name}`,
    ...monthlyBlock(maintenance),
    ...(nonProfit ? { eligibleCustomerType: NON_BUSINESS } : {}),
    description: locale === 'en'
      ? `Security updates and blocking-bug fixes. ${formatMonthly(maintenance, 'en')}.`
      : `Mises à jour de sécurité et correction des bugs bloquants. ${formatMonthly(maintenance, 'fr')}.`,
  }

  /* Les modules ne sont pas déclinés au tarif associatif : la remise porte sur
     le devis complet, et publier deux prix par module doublerait le catalogue
     sans rien apprendre à un moteur. */
  const modules = nonProfit
    ? []
    : addonsFor(t.id).map((addon) => ({
        '@type': 'Offer',
        name: `${t.name} — ${addon.label[locale]}`,
        ...priceBlock(addon.price),
        description: locale === 'en'
          ? `Optional module: ${addon.label.en}. ${addon.days} day${addon.days > 1 ? 's' : ''} of work, ${formatPrice(addon.price, 'en')} excluding VAT.`
          : `Module optionnel : ${addon.label.fr}. ${addon.days} jour${addon.days > 1 ? 's' : ''} de travail, ${formatPrice(addon.price, 'fr')} HT.`,
      }))

  return [socle, upkeep, ...modules]
}

function scopingOffers(locale: Locale) {
  const setOff = Math.round(SCOPING_SET_OFF * 100)

  const tiers = SCOPING_TIERS.map((s) => ({
    '@type': 'Offer',
    name: s.name[locale],
    ...priceBlock(s.price),
    description: locale === 'en'
      ? `Scoping workshop and written report. ${formatPrice(s.price, 'en')} excluding VAT. ${setOff} % set off against development if a quote is signed within three months.`
      : `Atelier de cadrage et dossier écrit. ${formatPrice(s.price, 'fr')} HT. ${setOff} % imputables sur le développement en cas de signature sous trois mois.`,
  }))

  const design = {
    '@type': 'Offer',
    name: locale === 'en' ? 'Product design' : 'Conception produit',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: PRODUCT_DESIGN_DAY_RATE.toFixed(2),
      priceCurrency: 'EUR',
      unitCode: 'DAY',
    },
    description: locale === 'en'
      ? `Product design billed by the day, when the product is still to be invented: features, business rules, content structure, business model. ${formatPrice(PRODUCT_DESIGN_DAY_RATE, 'en')} per day excluding VAT.`
      : `Conception de produit à la journée, lorsque le projet reste à inventer : fonctionnalités, règles de gestion, structure des contenus, modèle économique. ${formatPrice(PRODUCT_DESIGN_DAY_RATE, 'fr')} HT par jour.`,
  }

  return [...tiers, design]
}

const scopingNonProfitOffer = (locale: Locale) => ({
  '@type': 'Offer',
  name: locale === 'en' ? 'Scoping (non-profit rate)' : 'Cadrage (tarif associatif)',
  ...priceBlock(SCOPING_NON_PROFIT_FROM),
  eligibleCustomerType: NON_BUSINESS,
  description: locale === 'en'
    ? `Scoping workshop and written report at the non-profit rate, from ${formatPrice(SCOPING_NON_PROFIT_FROM, 'en')} excluding VAT.`
    : `Atelier de cadrage et dossier écrit au tarif associatif, à partir de ${formatPrice(SCOPING_NON_PROFIT_FROM, 'fr')} HT.`,
})

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

export const PROFILE_SLUG = 'a-propos'

/* Biographie de l'entité, reprise de ce que le site dit déjà de lui — la
   section « Le Codeur » et l'article sur le titre professionnel. Rien n'est
   ajouté ici qui ne soit déjà publié ailleurs. */
const personBio: Bilingual = {
  fr: "Développeur web indépendant en Île-de-France. Après dix-huit ans à encadrer des équipes de terrain dans le retail aéroportuaire, il conçoit et livre seul des applications web sur-mesure : sites vitrines, boutiques en ligne et outils métier, en Next.js, TypeScript et NestJS.",
  en: 'Independent web developer in the Paris region of France. After eighteen years managing frontline teams in airport retail, he designs and ships custom web applications single-handed: marketing sites, online shops and business tools, built with Next.js, TypeScript and NestJS.',
}

const profileName: Bilingual = {
  fr: 'Ludovic BATAILLE — développeur web indépendant',
  en: 'Ludovic BATAILLE — independent web developer',
}

/* ProfilePage plutôt que WebPage : le type dit explicitement « cette page a
   pour sujet une personne ». C'est ce qui autorise un moteur à attribuer une
   citation à quelqu'un au lieu de la rattacher à un site anonyme. */
export function profilePageJsonLd(rawLocale: string) {
  const locale: Locale = rawLocale === 'en' ? 'en' : 'fr'
  const url = `${BASE_URL}/${locale}/${PROFILE_SLUG}`

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': url,
    url,
    inLanguage: locale,
    name: profileName[locale],
    isPartOf: { '@id': `${BASE_URL}/${locale}/#website` },
    mainEntity: {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: 'Ludovic BATAILLE',
      jobTitle: jobTitle[locale],
      description: personBio[locale],
      url,
      image: `${BASE_URL}/ludovic.jpeg`,
      email: 'contact@lechoppeducode.com',
      knowsLanguage: ['fr', 'en'],
      sameAs: SAME_AS,
      worksFor: { '@id': ORGANIZATION_ID },
      founder: { '@id': ORGANIZATION_ID },
      knowsAbout: [
        'Next.js',
        'React',
        'TypeScript',
        'NestJS',
        'Node.js',
        'PostgreSQL',
        'Prisma',
        'Stripe',
        locale === 'en' ? 'Web accessibility' : 'Accessibilité web',
        locale === 'en' ? 'Technical SEO' : 'Référencement technique',
      ],
      hasOccupation: {
        '@type': 'Occupation',
        name: jobTitle[locale],
        occupationLocation: [
          { '@type': 'City', name: 'Paris' },
          { '@type': 'AdministrativeArea', name: 'Île-de-France' },
        ],
        skills: serviceTypes[locale].join(', '),
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Aulnay-sous-Bois',
        addressRegion: 'Île-de-France',
        addressCountry: 'FR',
      },
    },
  }
}

export function siteGraphJsonLd(rawLocale: string) {
  const locale: Locale = rawLocale === 'en' ? 'en' : 'fr'
  const siteUrl = `${BASE_URL}/${locale}`

  const person = {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Ludovic BATAILLE',
    jobTitle: jobTitle[locale],
    /* L'entité a désormais une page à elle. Tant que `url` pointait vers la
       page d'accueil, la personne n'était qu'un attribut de l'entreprise :
       rien ne permettait à un moteur de citer quelqu'un plutôt qu'un site. */
    url: `${siteUrl}/${PROFILE_SLUG}`,
    mainEntityOfPage: { '@id': `${siteUrl}/${PROFILE_SLUG}` },
    image: `${BASE_URL}/ludovic.jpeg`,
    description: personBio[locale],
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
    name: "L'Échoppe du Code",
    /* Le nom s'écrit avec l'accent, comme dans les conditions générales. Les
       variantes restent déclarées : le site a longtemps servi la graphie sans
       accent, les moteurs l'ont mémorisée, et alternateName est ce qui les
       rattache à la même entité au lieu d'en laisser flotter deux. */
    alternateName: ["L'Echoppe du Code", 'Echoppe du Code', 'Échoppe du Code'],
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
        itemListElement: [
          ...scopingOffers(locale),
          ...TIERS.flatMap((t) => tierOffers(t, locale, false)),
        ],
      },
      /* Catalogue distinct plutôt que des offres marquées au sein du
         précédent : l'Échoppe Solidaire est une offre à part entière, avec ses
         propres tarifs de maintenance qui ne sont pas la moitié des standards. */
      {
        '@type': 'OfferCatalog',
        name: catalogNames[locale].solidaire,
        description: solidaireDescription[locale],
        itemListElement: [
          scopingNonProfitOffer(locale),
          ...TIERS.flatMap((t) => tierOffers(t, locale, true)),
        ],
      },
    ],
  }

  const website = {
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: "L'Échoppe du Code",
    description: orgDescription[locale],
    inLanguage: locale,
    publisher: publisherRef,
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [person, organization, website],
  }
}
