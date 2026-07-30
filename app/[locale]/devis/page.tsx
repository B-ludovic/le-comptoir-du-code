import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyDevisToken } from '@/lib/devis-auth'
import DevisClient from './DevisClient'

/* Second verrou, indépendant du middleware : celui-ci s'appuie sur un matcher
   dont chaque exclusion (_next, api, extensions) est un contournement en
   puissance. Ici le cookie est vérifié au moment du rendu de la page. */
export default async function DevisPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const token = (await cookies()).get('devis_auth')?.value
  if (!(await verifyDevisToken(token))) {
    redirect(`/${locale === 'en' ? 'en' : 'fr'}/devis/login`)
  }

  return <DevisClient />
}
