import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Espace devis | L'Echoppe du Code",
  robots: { index: false, follow: false },
}

export default function DevisLayout({ children }: { children: React.ReactNode }) {
  return children
}
