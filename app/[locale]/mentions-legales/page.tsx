import type { Metadata } from 'next'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import styles from '@/components/Legal/Legal.module.css'
import fr from '@/app/dictionaries/fr.json'
import en from '@/app/dictionaries/en.json'

const BASE_URL = 'https://lechoppeducode.com'
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
      ? "Mentions Légales | L'Echoppe du Code"
      : "Legal Notice | L'Echoppe du Code",
    description: isFr
      ? "Mentions légales du site L'Echoppe du Code — éditeur, hébergement, propriété intellectuelle."
      : "Legal notice for L'Echoppe du Code — publisher, hosting, intellectual property.",
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
                ? "Statut : Entrepreneur-salarié (L'Echoppe du Code)"
                : "Status: Employee-entrepreneur (L'Echoppe du Code)"}
            </p>
            <p className={styles.text}>
              {isFr
                ? <>Hébergé juridiquement par la société de portage salarial : <a href="https://www.join-jump.com" target="_blank" rel="noopener noreferrer">Jump Blue</a></>
                : <>Legally hosted by the umbrella company: <a href="https://www.join-jump.com" target="_blank" rel="noopener noreferrer">Jump Blue</a></>}
            </p>
            <p className={styles.text}>
              {isFr
                ? "Adresse : 28 Rue du Chemin Vert, 75011 Paris, France"
                : "Address: 28 Rue du Chemin Vert, 75011 Paris, France"}
            </p>
            <p className={styles.text}>
              {isFr
                ? 'SIRET : 892 135 112 00019 — RCS de Paris — NAF : 7022Z — TVA : FR69892135112'
                : 'SIRET: 892 135 112 00019 — Trade Register (RCS) of Paris — NAF: 7022Z — VAT: FR69892135112'}
            </p>
            <p className={styles.text}>
              {isFr ? 'Email : ' : 'Email: '}
              <a href="mailto:contact@lechoppeducode.com">
                contact@lechoppeducode.com
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
