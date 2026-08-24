import type { Metadata } from 'next'
import { BASE_URL } from '@/lib/structured-data'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import styles from '@/components/Legal/Legal.module.css'
import { linkifyEmails } from '@/components/Legal/linkify'
import fr from '@/app/dictionaries/fr.json'
import en from '@/app/dictionaries/en.json'

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
      ? "Politique de Confidentialité | L'Échoppe du Code"
      : "Privacy Policy | L'Échoppe du Code",
    description: isFr
      ? "Politique de confidentialité du site L'Échoppe du Code — données personnelles, cookies, droits des utilisateurs."
      : "Privacy policy for L'Échoppe du Code — personal data, cookies, user rights.",
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

const articles = {
  fr: [
    {
      title: "Responsable du traitement",
      content:
        "Les données que vous transmettez via le formulaire sont traitées par Ludovic BATAILLE, salarié porté de la société JUMP GREEN (SAS), 7 Place de l'Hôtel de Ville, 93600 Aulnay-sous-Bois. Contact : contact@lechoppeducode.com.",
    },
    {
      title: "Ce que je collecte et pourquoi",
      content:
        "Lorsque vous déposez un brief, je collecte uniquement les informations nécessaires pour vous répondre : votre nom, votre adresse email, votre estimation budgétaire et le détail de votre projet. Ces données servent exclusivement à étudier votre demande et à vous recontacter.",
    },
    {
      title: "Le questionnaire de cadrage",
      content:
        "Avant un atelier de cadrage, je peux vous adresser un questionnaire de pré-qualification. Il collecte des informations sur votre entreprise (raison sociale, SIRET, adresse), sur votre projet (objectifs, fonctionnalités, budget, contraintes réglementaires) et sur vos interlocuteurs : nom de la personne référente et identité du décideur. Ces réponses me sont transmises par email et servent uniquement à préparer l'atelier et la proposition commerciale associée. Lorsque vous y renseignez les coordonnées d'un tiers, c'est à vous de l'informer que ces données me sont communiquées à cette fin ; il dispose auprès de moi des mêmes droits que vous, décrits plus bas.",
    },
    {
      title: "Base légale",
      content:
        "Le traitement repose sur l'exécution de mesures précontractuelles prises à votre demande (article 6.1.b du RGPD) et, pour le suivi de nos échanges, sur mon intérêt légitime à répondre aux sollicitations professionnelles (article 6.1.f). Les données de tiers renseignées dans le questionnaire de cadrage relèvent de ce même intérêt légitime, limité à la préparation de la prestation.",
    },
    {
      title: "Durée de conservation",
      content:
        "Les demandes restées sans suite sont conservées trois (3) ans à compter de notre dernier échange, puis supprimées. Lorsqu'une relation contractuelle est nouée, les données sont conservées pendant la durée de la prestation, puis archivées le temps des obligations légales et de la prescription applicable.",
    },
    {
      title: "Destinataires et sous-traitants",
      content:
        "Je suis le seul destinataire de vos données. Y concourent techniquement, en qualité de sous-traitants : ImprovMX (acheminement des emails du formulaire), Vercel Inc. (hébergement du site) et Apple / iCloud (serveur d'envoi SMTP). Aucun de ces prestataires n'est autorisé à exploiter vos données pour son propre compte.",
    },
    {
      title: "Transfert de données hors Union européenne",
      content:
        "ImprovMX, Vercel et Apple sont des prestataires établis aux États-Unis : vos données peuvent y être transférées. Ces transferts sont encadrés par les clauses contractuelles types de la Commission européenne et/ou la certification Data Privacy Framework, qui garantissent un niveau de protection adéquat.",
    },
    {
      title: "Ce que je ne fais PAS",
      content:
        "Vos données ne seront jamais revendues, louées ni cédées à des tiers. Je ne vous inscrirai jamais d'office à une newsletter ou à une liste de prospection automatisée.",
    },
    {
      title: "Vos droits",
      content:
        "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition, de limitation et de portabilité sur vos données. Vous pouvez les exercer à tout moment en m'écrivant à contact@lechoppeducode.com. Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la CNIL — 3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07, www.cnil.fr.",
    },
    {
      title: "Cookies",
      content:
        "La gestion des cookies fait l'objet d'une page dédiée, accessible depuis le pied de page.",
    },
  ],
  en: [
    {
      title: "Data Controller",
      content:
        "The data you submit through the form is processed by Ludovic BATAILLE, employed under a \"portage salarial\" arrangement with JUMP GREEN (SAS), 7 Place de l'Hôtel de Ville, 93600 Aulnay-sous-Bois, France. Contact: contact@lechoppeducode.com.",
    },
    {
      title: "What I collect and why",
      content:
        "When you submit a brief, I only collect what is needed to reply: your name, email address, budget estimate and project details. This data is used solely to review your request and get back to you.",
    },
    {
      title: "The scoping questionnaire",
      content:
        "Ahead of a scoping workshop, I may send you a pre-qualification questionnaire. It collects information about your company (legal name, registration number, address), about your project (objectives, features, budget, regulatory constraints) and about the people involved: the name of the main contact and the identity of the decision-maker. These answers reach me by email and are used solely to prepare the workshop and the related proposal. Where you enter a third party's details, it is for you to inform them that this data is passed on to me for that purpose; they hold the same rights towards me as you do, as set out below.",
    },
    {
      title: "Legal basis",
      content:
        "Processing is based on pre-contractual steps taken at your request (Article 6.1.b GDPR) and, for following up our exchanges, on my legitimate interest in responding to professional enquiries (Article 6.1.f). Third-party data entered in the scoping questionnaire falls under that same legitimate interest, limited to preparing the engagement.",
    },
    {
      title: "Retention period",
      content:
        "Enquiries with no follow-up are kept for three (3) years from our last exchange, then deleted. Where a contract is entered into, data is kept for the duration of the service and then archived for the period required by legal obligations and applicable limitation periods.",
    },
    {
      title: "Recipients and processors",
      content:
        "I am the sole recipient of your data. Acting as technical processors are: ImprovMX (routing of form emails), Vercel Inc. (website hosting) and Apple / iCloud (SMTP sending). None of them may use your data for their own purposes.",
    },
    {
      title: "Transfers outside the European Union",
      content:
        "ImprovMX, Vercel and Apple are established in the United States: your data may be transferred there. These transfers are governed by the European Commission's Standard Contractual Clauses and/or Data Privacy Framework certification, ensuring an adequate level of protection.",
    },
    {
      title: "What I do NOT do",
      content:
        "Your data will never be sold, rented or transferred to third parties. You will never be automatically added to a newsletter or automated prospecting list.",
    },
    {
      title: "Your rights",
      content:
        "Under the GDPR, you have rights of access, rectification, erasure, objection, restriction and portability. You can exercise them at any time by writing to contact@lechoppeducode.com. If you believe your rights are not respected, you may lodge a complaint with the CNIL — 3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07, www.cnil.fr.",
    },
    {
      title: "Cookies",
      content:
        "Cookie management is covered on a dedicated page, accessible from the footer.",
    },
  ],
}

export default async function PolitiqueDeConfidentialite({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dict = dictionaries[locale as 'fr' | 'en'] ?? dictionaries.fr
  const isFr = locale !== 'en'
  const content = isFr ? articles.fr : articles.en

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

          <p className={styles.text} style={{ opacity: 0.6, fontSize: '0.85rem', marginBottom: '2rem' }}>
            {isFr ? 'Dernière mise à jour : 30 juillet 2026' : 'Last updated: July 30, 2026'}
          </p>

          {content.map((article) => (
            <div key={article.title} className={styles.block}>
              <h2 className={styles.heading}>{article.title}</h2>
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className={styles.text}>
                  {linkifyEmails(paragraph)}
                </p>
              ))}
            </div>
          ))}

        </div>
      </main>
      <Footer locale={locale} dict={dict.footer} />
    </>
  )
}
