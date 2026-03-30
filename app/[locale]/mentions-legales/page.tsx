import type { Metadata } from 'next'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import styles from '@/components/Legal/Legal.module.css'
import fr from '@/app/dictionaries/fr.json'
import en from '@/app/dictionaries/en.json'

const BASE_URL = 'https://lecomptoirducode.fr'
const slug = 'mentions-legales'
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
      ? 'Mentions Légales | Le Comptoir du Code'
      : 'Legal Notice | Le Comptoir du Code',
    description: isFr
      ? 'Mentions légales du site Le Comptoir du Code — éditeur, hébergement, propriété intellectuelle.'
      : 'Legal notice for Le Comptoir du Code — publisher, hosting, intellectual property.',
    alternates: {
      canonical: `${BASE_URL}/${locale}/${slug}`,
      languages: {
        fr: `${BASE_URL}/fr/${slug}`,
        en: `${BASE_URL}/en/${slug}`,
      },
    },
  }
}

export default async function MentionsLegales({
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
            {isFr ? 'Mentions Légales' : 'Legal Notice'}
          </h1>

          <div className={styles.block}>
            <h2 className={styles.heading}>
              {isFr ? 'Éditeur du site' : 'Site Publisher'}
            </h2>
            <p className={styles.text}>Ludovic BATAILLE</p>
            <p className={styles.text}>
              {isFr
                ? 'Statut : Entrepreneur-salarié (Le Comptoir du Code)'
                : 'Status: Employee-entrepreneur (Le Comptoir du Code)'}
            </p>
            <p className={styles.text}>
              {isFr
                ? <>Hébergé juridiquement par la coopérative : <a href="https://www.join-jump.com" target="_blank" rel="noopener noreferrer">Jump Green</a></>
                : <>Legally hosted by the cooperative: <a href="https://www.join-jump.com" target="_blank" rel="noopener noreferrer">Jump Green</a></>}
            </p>
            <p className={styles.text}>
              {isFr
                ? "Adresse : 7 Place de l'Hôtel de Ville, 93600 Aulnay-sous-Bois"
                : "Address: 7 Place de l'Hôtel de Ville, 93600 Aulnay-sous-Bois, France"}
            </p>
            <p className={styles.text}>
              {isFr
                ? 'SIRET : 97761078100014 — RCS de Bobigny — NAF : 7022Z — TVA : FR10977610781'
                : 'SIRET: 97761078100014 — Trade Register (RCS) of Bobigny — NAF: 7022Z — VAT: FR10977610781'}
            </p>
            <p className={styles.text}>
              {isFr ? 'Email : ' : 'Email: '}
              <a href="mailto:contact@lecomptoirducode.fr">
                contact@lecomptoirducode.fr
              </a>
            </p>
            <p className={styles.text}>
              {isFr
                ? 'Directeur de la publication : Ludovic BATAILLE'
                : 'Publication Director: Ludovic BATAILLE'}
            </p>
          </div>

          <div className={styles.block}>
            <h2 className={styles.heading}>
              {isFr ? 'Hébergement' : 'Hosting'}
            </h2>
            <p className={styles.text}>
              {isFr
                ? <>Ce site est hébergé par <a href="https://vercel.com/" target="_blank" rel="noopener noreferrer">Vercel Inc.</a>, dont le siège social est situé au 340 S Lemon Ave, Walnut, CA 91789, USA.</>
                : <>This website is hosted by <a href="https://vercel.com/" target="_blank" rel="noopener noreferrer">Vercel Inc.</a>, headquartered at 340 S Lemon Ave, Walnut, CA 91789, USA.</>}
            </p>
          </div>

          <div className={styles.block}>
            <h2 className={styles.heading}>
              {isFr ? 'Propriété intellectuelle' : 'Intellectual Property'}
            </h2>
            <p className={styles.text}>
              {isFr
                ? "L'architecture, le design, les textes et le code de ce site appartiennent exclusivement à Ludovic BATAILLE. Toute reproduction, copie ou utilisation mécanique de ces éléments, même partielle, est strictement interdite sans accord écrit préalable."
                : "The architecture, design, texts, and source code of this website are the exclusive property of Ludovic BATAILLE. Any reproduction, copying, or mechanical use of these elements, whether in whole or in part, is strictly prohibited without prior written consent."}
            </p>
          </div>

        </div>
      </main>
      <Footer locale={locale} dict={dict.footer} />
    </>
  )
}
