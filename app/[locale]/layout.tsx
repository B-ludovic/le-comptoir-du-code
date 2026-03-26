import type { Metadata } from 'next'
import '@/app/styles/variables.css'
import '@/app/styles/globals.css'

export const metadata: Metadata = {
  title: 'Le Comptoir du Code',
  description: 'Développement web sur-mesure pour les indépendants et TPE. Sites vitrines, e-commerce, outils métiers.',
  keywords: 'développeur freelance, site vitrine, e-commerce, outil sur-mesure, Next.js, NestJS',
  authors: [{ name: 'Ludovic B.' }],
  openGraph: {
    title: 'Le Comptoir du Code',
    description: 'Développement web sur-mesure pour les indépendants et TPE.',
    locale: 'fr_FR',
    type: 'website',
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
      <body>{children}</body>
    </html>
  )
}