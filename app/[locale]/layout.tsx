import type { Metadata } from 'next'
import '@/app/styles/variables.css'
import '@/app/styles/globals.css'
import { BASE_URL, siteGraphJsonLd } from '@/lib/structured-data'

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
    metadataBase: new URL(BASE_URL),
    title,
    description,
    keywords,
    authors: [{ name: 'Ludovic BATAILLE' }],
    creator: 'Ludovic BATAILLE',
    publisher: "L'Echoppe du Code",
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        fr: `${BASE_URL}/fr`,
        en: `${BASE_URL}/en`,
        'x-default': `${BASE_URL}/fr`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraphJsonLd(locale)) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
