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
    ? "Développeur web freelance basé en Île-de-France. Cadrage de projet à partir de 290 € HT, sites vitrines, e-commerce et applications web sur-mesure. Code propre, performant et livré avec ses sources."
    : 'Paris-based freelance web developer. Project scoping from €290, custom websites, e-commerce and tailored web applications. Clean, performant code, delivered with its sources.'

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

/* Catalogue distinct plutôt que des offres marquées au sein du précédent :
   l'Échoppe Solidaire est une offre à part entière, avec ses propres tarifs
   de maintenance qui ne sont pas la moitié des tarifs standards.
   eligibleCustomerType porte le vocabulaire GoodRelations, seul moyen en
   schema.org de dire « réservé aux structures non commerciales ». */
const NON_BUSINESS = 'http://purl.org/goodrelations/v1#NonBusinessEntity'

const solidaireCatalog = {
  '@type': 'OfferCatalog',
  name: "L'Échoppe Solidaire — tarification associative",
  description:
    "Mécénat de compétences de 50 % sur les forfaits de développement, réservé aux associations loi 1901 et structures à but non lucratif, en priorité LGBTQI+. Conditionné à la fourniture d'un récépissé de déclaration en préfecture ou équivalent.",
  itemListElement: [
    {
      '@type': 'Offer',
      name: 'Cadrage (tarif associatif)',
      price: '145.00',
      priceCurrency: 'EUR',
      eligibleCustomerType: NON_BUSINESS,
      description:
        'Atelier de cadrage et dossier écrit au tarif associatif, à partir de 145 € HT.',
    },
    {
      '@type': 'Offer',
      name: 'La Présence — Site Vitrine (tarif associatif)',
      price: '725.00',
      priceCurrency: 'EUR',
      eligibleCustomerType: NON_BUSINESS,
      description:
        'Site vitrine sur-mesure à partir de 725 € HT au lieu de 1 450 € HT. Maintenance solidaire à partir de 40 € HT par mois.',
    },
    {
      '@type': 'Offer',
      name: "L'E-commerce & Dons (tarif associatif)",
      price: '1425.00',
      priceCurrency: 'EUR',
      eligibleCustomerType: NON_BUSINESS,
      description:
        "Boutique en ligne ou collecte de dons à partir de 1 425 € HT au lieu de 2 850 € HT. Sécurisation des dons via Stripe, sans commission intermédiaire. Maintenance solidaire à partir de 50 € HT par mois.",
    },
    {
      /* Pas de champ price : la page annonce « sur étude budgétaire », et
         déduire la moitié du tarif standard serait inventer un chiffre. */
      '@type': 'Offer',
      name: 'Les Outils Sur-Mesure (tarif associatif)',
      priceCurrency: 'EUR',
      eligibleCustomerType: NON_BUSINESS,
      description:
        'Application métier sur-mesure pour association, sur étude budgétaire. Maintenance sur étude.',
    },
    {
      '@type': 'Offer',
      name: 'Maintenance solidaire — Site vitrine',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '40.00',
        priceCurrency: 'EUR',
        unitCode: 'MON',
      },
      eligibleCustomerType: NON_BUSINESS,
      description:
        "Mises à jour de sécurité au tarif solidaire, à partir de 40 € HT par mois. Ce tarif n'est pas la moitié du tarif standard mais un barème dédié.",
    },
    {
      '@type': 'Offer',
      name: 'Maintenance solidaire — E-commerce & Dons',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '50.00',
        priceCurrency: 'EUR',
        unitCode: 'MON',
      },
      eligibleCustomerType: NON_BUSINESS,
      description:
        "Mises à jour de sécurité au tarif solidaire, à partir de 50 € HT par mois. Ce tarif n'est pas la moitié du tarif standard mais un barème dédié.",
    },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: "L'Echoppe du Code",
  description:
    "Développeur web freelance basé en Île-de-France. Cadrage de projet, création de sites vitrines, e-commerce et applications web sur-mesure. Code propre et performant, livré avec ses sources. Un an de mises à jour de sécurité inclus sur les forfaits E-commerce et Sur-Mesure.",
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
  hasOfferCatalog: [{
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
      /* Maintenance : facturée au mois, d'où le UnitPriceSpecification en
         unitCode MON, sur le modèle de la conception produit facturée en DAY. */
      {
        '@type': 'Offer',
        name: 'Maintenance & sécurité — Site vitrine',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '70.00',
          priceCurrency: 'EUR',
          unitCode: 'MON',
        },
        description:
          'Mises à jour de sécurité et correction des bugs bloquants pour un site vitrine. Option facultative, 70 € HT par mois.',
      },
      {
        '@type': 'Offer',
        name: 'Maintenance & sécurité — E-commerce & Réservation',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '85.00',
          priceCurrency: 'EUR',
          unitCode: 'MON',
        },
        description:
          "Mises à jour de sécurité et correction des bugs bloquants. Un an inclus à la livraison du forfait E-commerce & Réservation, puis 85 € HT par mois.",
      },
      {
        '@type': 'Offer',
        name: 'Maintenance & sécurité — Outils Sur-Mesure',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '165.00',
          priceCurrency: 'EUR',
          unitCode: 'MON',
        },
        description:
          "Mises à jour de sécurité et correction des bugs bloquants. Un an inclus à la livraison du forfait Outils Sur-Mesure, puis à partir de 165 € HT par mois.",
      },
    ],
  }, solidaireCatalog],
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
        {/* Polices auto-hébergées (voir public/fonts.css). Le préchargement
            des deux familles visibles au premier écran compense la disparition
            du preconnect vers Google. L'attribut crossOrigin est obligatoire
            sur un preload de police, y compris en same-origin. */}
        <link
          rel="preload"
          href="/fonts/dm-sans-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/cormorant-garamond-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-css-tags --
            Feuille délibérément non bundlée : l'iframe d'aperçu du devis a
            besoin d'une URL stable pour charger les mêmes @font-face, ce qu'un
            import bundlé au nom haché ne permet pas. */}
        <link rel="stylesheet" href="/fonts.css" />
        {/* Rend llms.txt découvrable autrement qu'en devinant son adresse.
            La convention est encore peu suivie par les robots ; le lien coûte
            une ligne et ne fait de mal à personne. */}
        <link
          rel="alternate"
          type="text/markdown"
          href="/llms.txt"
          title="Résumé du site au format Markdown"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
