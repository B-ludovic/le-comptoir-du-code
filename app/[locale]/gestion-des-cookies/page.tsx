import type { Metadata } from 'next'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import styles from '@/components/Legal/Legal.module.css'
import fr from '@/app/dictionaries/fr.json'
import en from '@/app/dictionaries/en.json'

const BASE_URL = 'https://lechoppeducode.com'
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
      ? "Gestion des Cookies | L'Échoppe du Code"
      : "Cookie Policy | L'Échoppe du Code",
    description: isFr
      ? "Gestion des cookies du site L'Échoppe du Code — types de cookies utilisés et paramétrage."
      : "Cookie policy for L'Échoppe du Code — types of cookies used and configuration.",
    alternates: {
      canonical: `${BASE_URL}/${locale}/${slug}`,
      languages: {
        fr: `${BASE_URL}/fr/${slug}`,
        en: `${BASE_URL}/en/${slug}`,
        'x-default': `${BASE_URL}/fr/${slug}`,
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
                ? "L'Échoppe du Code a été conçu pour être rapide, propre et respectueux de votre navigation. Par conséquent, ce site n'utilise aucun cookie de ciblage publicitaire ou de tracking marketing (pas de Google Analytics, pas de Pixel Facebook)."
                : "L'Échoppe du Code was designed to be fast, clean and respectful of your browsing. As a result, this site uses no advertising or marketing tracking cookies (no Google Analytics, no Facebook Pixel)."}
            </p>
            <p className={styles.text}>
              {isFr
                ? "Aucun stockage local (localStorage, sessionStorage) n'est utilisé. Un seul cookie existe sur ce site, et il n'est déposé qu'après une connexion volontaire à l'espace privé réservé au prestataire. En tant que simple visiteur, vous n'en recevez aucun."
                : "No local storage (localStorage, sessionStorage) is used. A single cookie exists on this site, and it is only set after a deliberate login to the provider's private area. As an ordinary visitor, you receive none."}
            </p>

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>{isFr ? 'Nom' : 'Name'}</th>
                    <th>{isFr ? 'Finalité' : 'Purpose'}</th>
                    <th>{isFr ? 'Durée' : 'Duration'}</th>
                    <th>{isFr ? 'Consentement' : 'Consent'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>devis_auth</code></td>
                    <td>
                      {isFr
                        ? "Authentification de l'espace privé de génération de propositions commerciales"
                        : 'Authentication for the private quote-generation area'}
                    </td>
                    <td>{isFr ? '8 heures' : '8 hours'}</td>
                    <td>
                      {isFr
                        ? 'Non requis — strictement nécessaire'
                        : 'Not required — strictly necessary'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className={styles.text}>
              {isFr
                ? "Ce cookie étant strictement nécessaire à la fourniture d'un service expressément demandé, il est exempté de consentement au titre de l'article 82 de la loi Informatique et Libertés. C'est la raison pour laquelle aucun bandeau ne vous est imposé."
                : 'As this cookie is strictly necessary for the provision of a service expressly requested by the user, it is exempt from consent under Article 82 of the French Data Protection Act. That is why no banner is imposed on you.'}
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
