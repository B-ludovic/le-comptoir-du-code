import type { Metadata } from 'next'
import '@/app/styles/variables.css'
import '@/app/styles/globals.css'

export const metadata: Metadata = {
  title: 'Le Comptoir du Code | Développeur Web Indépendant',
  description:
    'Création de sites vitrines, e-commerce et applications sur-mesure. Un code propre, performant, et 1 an de maintenance technique engagée.',
  keywords: 'développeur freelance, site vitrine, e-commerce, outil sur-mesure, Next.js, NestJS',
  authors: [{ name: 'Ludovic BATAILLE' }],
  openGraph: {
    title: 'Le Comptoir du Code',
    description: 'Des applications qui tournent en production. Parlons de votre projet.',
    url: 'https://lecomptoirducode.fr',
    siteName: 'Le Comptoir du Code',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: 'https://lecomptoirducode.fr/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Le Comptoir du Code — Développeur Web Indépendant',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Le Comptoir du Code | Développeur Web Indépendant',
    description: 'Des applications qui tournent en production. Parlons de votre projet.',
    images: ['https://lecomptoirducode.fr/og-image.png'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Le Comptoir du Code',
  description:
    'Développeur Web Indépendant spécialisé en Next.js et React. Création de sites vitrines, e-commerce et applications sur-mesure.',
  url: 'https://lecomptoirducode.fr',
  priceRange: 'À partir de 1200€',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'FR',
  },
  offers: [
    {
      '@type': 'Offer',
      name: 'La Présence (Site Vitrine)',
      price: '1200.00',
      priceCurrency: 'EUR',
      description: 'À partir de 1 200 €',
    },
    {
      '@type': 'Offer',
      name: "L'E-commerce & Réservation",
      price: '2500.00',
      priceCurrency: 'EUR',
      description: 'À partir de 2 500 €. Inclut 1 an de mises à jour de sécurité.',
    },
    {
      '@type': 'Offer',
      name: 'Les Outils Sur-Mesure',
      price: '5000.00',
      priceCurrency: 'EUR',
      description: 'À partir de 5 000 €. Inclut 1 an de mises à jour de sécurité.',
    },
  ],
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