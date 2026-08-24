import type { Metadata } from 'next'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import QuestionnaireForm from '@/components/Questionnaire/QuestionnaireForm'
import styles from '@/components/Legal/Legal.module.css'
import fr from '@/app/dictionaries/fr.json'
import en from '@/app/dictionaries/en.json'

const dictionaries = { fr, en }

/* Page privée : son URL est transmise au Client après commande.
   Pas de lien depuis la navigation, et pas d'indexation. */
export const metadata: Metadata = {
  title: "Questionnaire de cadrage | L'Échoppe du Code",
  robots: { index: false, follow: false },
}

export default async function QuestionnairePage({
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
            {isFr ? 'Questionnaire de cadrage' : 'Scoping questionnaire'}
          </h1>

          <p className={styles.text} style={{ maxWidth: 680, marginBottom: '1rem' }}>
            {isFr
              ? "Ce questionnaire prépare notre atelier. Il doit me parvenir au plus tard 48 heures avant la séance : c'est ce qui me permet d'arriver avec des questions précises plutôt que de découvrir votre projet en direct."
              : 'This questionnaire prepares our workshop. It must reach me no later than 48 hours before the session: it is what allows me to arrive with precise questions rather than discovering your project live.'}
          </p>

          <p className={styles.text} style={{ maxWidth: 680, marginBottom: '3rem' }}>
            {isFr
              ? "Répondez au plus juste. Un « je ne sais pas » honnête vaut mieux qu'une réponse approximative — c'est précisément ce que l'atelier sert à trancher. Les champs marqués d'une étoile sont obligatoires."
              : "Answer as accurately as you can. An honest “I don't know” is worth more than a vague answer — that is exactly what the workshop is for. Fields marked with a star are required."}
          </p>

          <QuestionnaireForm locale={isFr ? 'fr' : 'en'} />

        </div>
      </main>
      <Footer locale={locale} dict={dict.footer} />
    </>
  )
}
