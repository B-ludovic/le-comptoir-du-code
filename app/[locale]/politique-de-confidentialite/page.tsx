import type { Metadata } from 'next'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import styles from '@/components/Legal/Legal.module.css'
import fr from '@/app/dictionaries/fr.json'
import en from '@/app/dictionaries/en.json'

const BASE_URL = 'https://lechoppeducode.com'
const slug = 'politique-de-confidentialite'
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
      ? "Politique de Confidentialité | L'Echoppe du Code"
      : "Privacy Policy | L'Echoppe du Code",
    description: isFr
      ? "Politique de confidentialité du site L'Echoppe du Code — données personnelles, cookies, droits des utilisateurs."
      : "Privacy policy for L'Echoppe du Code — personal data, cookies, user rights.",
    alternates: {
      canonical: `${BASE_URL}/${locale}/${slug}`,
      languages: {
        fr: `${BASE_URL}/fr/${slug}`,
        en: `${BASE_URL}/en/${slug}`,
      },
    },
  }
}

export default async function PolitiqueDeConfidentialite({
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
            {isFr ? 'Politique de Confidentialité' : 'Privacy Policy'}
          </h1>

          <div className={styles.block}>
            <p className={styles.text}>
              <strong>
                {isFr
                  ? "À l'Echoppe du Code, je traite vos données comme je traite le code : avec rigueur et sans fioritures."
                  : "At L'Echoppe du Code, I handle your data the same way I handle code: with rigour and without unnecessary clutter."}
              </strong>
            </p>
          </div>

          <div className={styles.block}>
            <h2 className={styles.heading}>
              {isFr ? 'Ce que je collecte et pourquoi' : 'What I collect and why'}
            </h2>
            <p className={styles.text}>
              {isFr
                ? "Lorsque vous déposez un brief, je collecte uniquement les informations nécessaires pour vous répondre : votre nom, votre adresse email, votre estimation budgétaire et le détail de votre projet. Ces données ne servent qu'à une seule chose : étudier votre demande et vous recontacter."
                : "When you submit a brief, I only collect the information needed to respond: your name, email address, budget estimate and project details. This data serves one purpose only: to review your request and get back to you."}
            </p>
          </div>

          <div className={styles.block}>
            <h2 className={styles.heading}>
              {isFr ? 'Ce que je ne fais PAS' : 'What I do NOT do'}
            </h2>
            <p className={styles.text}>
              {isFr
                ? "Vos données ne seront jamais revendues, louées, ou cédées à des tiers. Je ne vous inscrirai jamais d'office à une newsletter ou à une liste de prospection automatisée."
                : "Your data will never be sold, rented or transferred to third parties. You will never be automatically added to a newsletter or automated prospecting list."}
            </p>
          </div>

          <div className={styles.block}>
            <h2 className={styles.heading}>
              {isFr ? 'Transit des données' : 'Data transit'}
            </h2>
            <p className={styles.text}>
              {isFr
                ? <><a href="https://improvmx.com/" target="_blank" rel="noopener noreferrer">ImprovMX</a> — les emails envoyés via le formulaire transitent de manière sécurisée par leur service transactionnel, pour atterrir directement dans ma boîte de réception professionnelle.</>
                : <>Emails sent via the form are securely transmitted through <a href="https://improvmx.com/" target="_blank" rel="noopener noreferrer">ImprovMX</a>{"'"}s transactional service, landing directly in my professional inbox.</> }
            </p>
          </div>

          <div className={styles.block}>
            <h2 className={styles.heading}>
              {isFr ? 'Vos droits' : 'Your rights'}
            </h2>
            <p className={styles.text}>
              {isFr
                ? "Conformément au RGPD, vous gardez le contrôle total. Vous pouvez à tout moment me demander d'accéder à vos données, de les modifier ou de les supprimer en m'écrivant directement à : "
                : "In accordance with GDPR, you retain full control. You can at any time request access to your data, modify or delete it by writing to: "}
              <a href="mailto:contact@lechoppeducode.com">
                contact@lechoppeducode.com
              </a>
            </p>
          </div>

        </div>
      </main>
      <Footer locale={locale} dict={dict.footer} />
    </>
  )
}
