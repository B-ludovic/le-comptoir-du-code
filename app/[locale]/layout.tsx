import type { Metadata } from 'next'
import '@/app/styles/variables.css'
import '@/app/styles/globals.css'

const BASE_URL = 'https://lechoppeducode.com'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const ogLocale = locale === 'fr' ? 'fr_FR' : 'en_US'

  const isFr = locale !== 'en'

  const title = isFr
    ? "Création Site Internet Freelance Paris | L'Echoppe du Code"
    : "Freelance Web Developer Paris | Custom Websites & Apps | L'Echoppe du Code"

  const description = isFr
    ? 'Développeur web freelance basé en Île-de-France. Création de sites vitrines, e-commerce et applications web sur-mesure. Code propre et performant, avec 1 an de maintenance technique incluse.'
    : 'Paris-based freelance web developer. Custom websites, e-commerce and tailored web applications. Clean, performant code with 1 year of technical maintenance included.'

  const keywords = isFr
    ? 'création site internet freelance, développeur web Paris, site vitrine sur-mesure, e-commerce freelance, application web sur-mesure, Next.js, développeur indépendant Île-de-France'
    : 'freelance web developer Paris, custom website creation, e-commerce developer, bespoke web application, Next.js developer France'

  return {
    title,
    description,
    keywords,
    authors: [{ name: 'Ludovic BATAILLE' }],
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        fr: `${BASE_URL}/fr`,
        en: `${BASE_URL}/en`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}`,
      siteName: "L'Echoppe du Code",
      locale: ogLocale,
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "L'Echoppe du Code — Développeur Web Freelance Paris",
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${BASE_URL}/og-image.png`],
    },
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: "L'Echoppe du Code",
  description:
    'Développeur web freelance basé en Île-de-France. Création de sites vitrines, e-commerce et applications web sur-mesure. Code propre et performant, avec 1 an de maintenance technique incluse.',
  url: 'https://lechoppeducode.com',
  email: 'contact@lechoppeducode.com',
  image: 'https://lechoppeducode.com/og-image.png',
  priceRange: '€€',
  founder: {
    '@type': 'Person',
    name: 'Ludovic BATAILLE',
    jobTitle: 'Développeur Web Freelance',
  },
  areaServed: [
    { '@type': 'City', name: 'Paris' },
    { '@type': 'AdministrativeArea', name: 'Île-de-France' },
    { '@type': 'Country', name: 'France' },
  ],
  serviceType: [
    'Création de site internet',
    'Développement web freelance',
    'Site vitrine sur-mesure',
    'Site e-commerce',
    'Application web sur-mesure',
  ],
  sameAs: ['https://github.com/B-ludovic'],
  knowsAbout: [
    'Next.js',
    'React',
    'TypeScript',
    'NestJS',
    'Node.js',
    'PostgreSQL',
    'Développement web',
    'Applications sur-mesure',
    'Sites vitrines',
    'E-commerce',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Aulnay-sous-Bois',
    addressRegion: 'Île-de-France',
    addressCountry: 'FR',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Prestations de cadrage et de développement web',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'La Présence — Site Vitrine',
        price: '1450.00',
        priceCurrency: 'EUR',
        description:
          'Site vitrine sur-mesure à partir de 1 450 € HT. Idéal pour artisans, indépendants et petites entreprises.',
      },
      {
        '@type': 'Offer',
        name: "L'E-commerce & Réservation",
        price: '2850.00',
        priceCurrency: 'EUR',
        description:
          'Boutique en ligne ou système de réservation à partir de 2 850 € HT. Inclut 1 an de maintenance.',
      },
      {
        '@type': 'Offer',
        name: 'Les Outils Sur-Mesure',
        price: '4800.00',
        priceCurrency: 'EUR',
        description:
          'Application web sur-mesure à partir de 4 800 € HT. Inclut 1 an de maintenance.',
      },
      {
        '@type': 'Offer',
        name: 'Cadrage Vitrine',
        price: '290.00',
        priceCurrency: 'EUR',
        description:
          "Atelier de cadrage et dossier écrit pour un site vitrine : choix de solution, arborescence, conformité RGPD, périmètre de la V1. 290 € HT.",
      },
      {
        '@type': 'Offer',
        name: 'Cadrage E-commerce & Business',
        price: '590.00',
        priceCurrency: 'EUR',
        description:
          "Atelier de cadrage et dossier écrit pour un projet de vente en ligne ou de réservation : tunnel de vente, solution de paiement, workflows, conformité RGPD e-commerce. 590 € HT.",
      },
      {
        '@type': 'Offer',
        name: 'Cadrage Architecture Métier',
        price: '1190.00',
        priceCurrency: 'EUR',
        description:
          "Atelier de cadrage et dossier d'architecture pour une application métier : modèle de données, back-office, rôles et permissions, sécurité, modèle économique. 1 190 € HT.",
      },
      {
        '@type': 'Offer',
        name: 'Conception produit',
        price: '650.00',
        priceCurrency: 'EUR',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '650.00',
          priceCurrency: 'EUR',
          unitCode: 'DAY',
        },
        description:
          "Conception de produit à la journée, lorsque le projet reste à inventer : fonctionnalités, règles de gestion, structure des contenus, modèle économique. 650 € HT par jour.",
      },
    ],
  },
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
