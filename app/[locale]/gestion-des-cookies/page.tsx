import type { Metadata } from 'next'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import styles from '@/components/Legal/Legal.module.css'
import fr from '@/app/dictionaries/fr.json'
import en from '@/app/dictionaries/en.json'

const BASE_URL = 'https://lecomptoirducode.fr'
const slug = 'gestion-des-cookies'
const dictionaries = { fr, en }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale !== 'en'
  return {
    title: isFr
      ? 'Gestion des Cookies | Le Comptoir du Code'
      : 'Cookie Policy | Le Comptoir du Code',
    description: isFr
      ? 'Gestion des cookies du site Le Comptoir du Code — types de cookies utilisés et paramétrage.'
      : 'Cookie policy for Le Comptoir du Code — types of cookies used and configuration.',
    alternates: {
      canonical: `${BASE_URL}/${locale}/${slug}`,
      languages: {
        fr: `${BASE_URL}/fr/${slug}`,
        en: `${BASE_URL}/en/${slug}`,
      },
    },
  }
}

export default async function GestionDesCookies({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dict = dictionaries[locale as 'fr' | 'en'] ?? dictionaries.fr
  const isFr = locale !== 'en'

  return (
    <>
      <Header locale={locale} nav={dict.nav} />
      <main className={styles.main}>
        <div className="container">

          <a href={`/${locale}`} className={styles.back}>
            ← {isFr ? 'Retour' : 'Back'}
          </a>

          <h1 className={styles.title}>
            {isFr ? 'Gestion des Cookies' : 'Cookie Policy'}
          </h1>

          <div className={styles.block}>
            <p className={styles.text}>
              <strong>{isFr ? 'Ici, pas de mouchards.' : 'No trackers here.'}</strong>
            </p>
            <p className={styles.text}>
              {isFr
                ? "La majorité des sites web vous traquent pour revendre votre attention. Pas le mien."
                : "Most websites track you to resell your attention. Not this one."}
            </p>
          </div>

          <div className={styles.block}>
            <p className={styles.text}>
              {isFr
                ? "Le Comptoir du Code a été conçu pour être rapide, propre et respectueux de votre navigation. Par conséquent, ce site n'utilise aucun cookie de ciblage publicitaire ou de tracking marketing (pas de Google Analytics, pas de Pixel Facebook)."
                : "Le Comptoir du Code was designed to be fast, clean and respectful of your browsing. As a result, this site uses no advertising or marketing tracking cookies (no Google Analytics, no Facebook Pixel)."}
            </p>
            <p className={styles.text}>
              {isFr
                ? "Les seuls cookies ou stockages locaux qui pourraient être sollicités sont d'ordre strictement technique (nécessaires à la sécurité du formulaire ou à la fluidité de l'interface)."
                : "The only cookies or local storage that may be used are strictly technical in nature (necessary for form security or interface smoothness)."}
            </p>
            <p className={styles.text}>
              <strong>
                {isFr
                  ? "Vous pouvez naviguer en paix, votre écran vous appartient."
                  : "Browse in peace — your screen belongs to you."}
              </strong>
            </p>
          </div>

        </div>
      </main>
      <Footer locale={locale} dict={dict.footer} />
    </>
  )
}
