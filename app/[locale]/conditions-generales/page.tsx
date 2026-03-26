import type { Metadata } from 'next'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import styles from '@/components/Legal/Legal.module.css'
import fr from '@/app/dictionaries/fr.json'
import en from '@/app/dictionaries/en.json'

const BASE_URL = 'https://lecomptoirducode.fr'
const slug = 'conditions-generales'
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
      ? 'Conditions Générales de Prestation | Le Comptoir du Code'
      : 'Terms of Service | Le Comptoir du Code',
    description: isFr
      ? 'Conditions générales de prestation de services du Comptoir du Code — tarifs, délais, maintenance, propriété intellectuelle.'
      : 'Terms of service for Le Comptoir du Code — pricing, timelines, maintenance, intellectual property.',
    alternates: {
      canonical: `${BASE_URL}/${locale}/${slug}`,
      languages: {
        fr: `${BASE_URL}/fr/${slug}`,
        en: `${BASE_URL}/en/${slug}`,
      },
    },
  }
}

const articles = {
  fr: [
    {
      title: "1. Objet et champ d'application",
      content:
        "Les présentes conditions régissent les prestations de développement web et de conseil proposées par Ludovic BATAILLE (ci-après \"Le Comptoir du Code\") à ses clients. Toute signature d'un devis implique l'acceptation sans réserve de ces conditions. Ici, on travaille en confiance, mais le cadre est défini.",
    },
    {
      title: "2. Formation du contrat et Acompte",
      content:
        "Un projet démarre officiellement à réception de deux éléments : le devis daté, signé, et portant la mention \"Bon pour accord\", et le paiement d'un acompte de 30 % du montant total (sauf mention contraire sur le devis). Sans ces deux éléments, aucune ligne de code ne sera écrite. L'acompte valide la réservation de mon temps et n'est pas remboursable en cas d'annulation par le client.",
    },
    {
      title: "3. Les engagements du Client (Le contenu)",
      content:
        "Pour que je puisse livrer un moteur performant dans les temps, j'ai besoin de carburant. Le client s'engage à fournir l'ensemble des contenus (textes, logos, images, accès serveurs) nécessaires à la réalisation du projet dans les délais convenus. Tout retard dans la livraison de ces éléments entraînera un report proportionnel de la date de livraison finale. Je ne saurais en être tenu responsable.",
    },
    {
      title: "4. Tarifs et Modalités de paiement",
      content:
        "Les prix sont indiqués en euros et hors taxes (TVA non applicable, art. 293 B du CGI). Le solde de la facture est exigible à la livraison du projet (mise en ligne ou livraison du code source), avec un délai maximum de 15 jours à compter de la date d'émission de la facture.",
    },
    {
      title: "5. Retard de paiement",
      content:
        "Tout retard de paiement entraînera de plein droit, dès le premier jour de retard, l'application de pénalités de retard égales à 3 fois le taux d'intérêt légal en vigueur, ainsi qu'une indemnité forfaitaire pour frais de recouvrement de 40 €. Le Comptoir du Code se réserve également le droit de suspendre la mise en ligne du site jusqu'au règlement intégral.",
    },
    {
      title: "6. Propriété Intellectuelle (Le Code)",
      content:
        "C'est une règle absolue de l'artisanat : l'œuvre appartient à son créateur tant qu'elle n'est pas payée. Le transfert des droits de propriété intellectuelle sur le code sur-mesure et le design ne s'opère qu'au moment du paiement intégral de la facture finale. Une fois soldé, le code vous appartient.",
    },
    {
      title: "7. Garantie et Maintenance technique",
      content:
        "Pour les projets d'une valeur égale ou supérieure à 2 500 € (offres E-commerce et Sur-Mesure), la prestation inclut une maintenance technique d'une durée de 12 mois à compter de la mise en ligne. Cette maintenance couvre exclusivement les mises à jour de sécurité et la correction de bugs critiques liés à mon code. Elle ne couvre en aucun cas les demandes de nouvelles fonctionnalités, les modifications de contenu, les refontes de design, ou les pannes causées par une manipulation du client. Pour les projets d'une valeur inférieure à 2 500 € (offre Présence), le site est livré clé en main. Toute intervention technique post-livraison fera l'objet d'un devis séparé.",
    },
    {
      title: "8. Résiliation",
      content:
        "En cas de rupture du contrat avant son terme par le client, l'acompte reste acquis au Comptoir du Code. De plus, les heures déjà travaillées au-delà du montant de l'acompte seront facturées au prorata.",
    },
    {
      title: "9. Litiges",
      content:
        "Les présentes conditions sont soumises au droit français. En cas de litige, on essaiera toujours de trouver une solution à l'amiable autour du comptoir. À défaut, le tribunal compétent sera celui du siège social du Comptoir du Code.",
    },
  ],
  en: [
    {
      title: "1. Object and Scope",
      content:
        'These conditions govern the web development and consulting services provided by Ludovic BATAILLE (hereinafter "Le Comptoir du Code") to its clients. Any signature of a quote implies unconditional acceptance of these conditions. Here, we work on trust — but the framework is defined.',
    },
    {
      title: "2. Contract Formation and Deposit",
      content:
        'A project officially starts upon receipt of two elements: the quote, dated, signed, with the mention "Accepted", and a deposit of 30% of the total amount (unless otherwise stated on the quote). Without these two elements, not a single line of code will be written. The deposit validates the reservation of my time and is non-refundable in case of cancellation by the client.',
    },
    {
      title: "3. Client Commitments (Content)",
      content:
        "For me to deliver a high-performance engine on time, I need fuel. The client undertakes to provide all content (texts, logos, images, server access) necessary for the project within the agreed timeframes. Any delay in delivering these elements will result in a proportional delay in the final delivery date. I cannot be held responsible for this.",
    },
    {
      title: "4. Pricing and Payment Terms",
      content:
        "Prices are quoted in euros, excluding taxes (VAT not applicable, art. 293 B of the French Tax Code). The invoice balance is due upon project delivery (launch or source code delivery), with a maximum deadline of 15 days from the invoice date.",
    },
    {
      title: "5. Late Payment",
      content:
        "Any late payment will automatically, from the first day of delay, incur late payment penalties equal to 3 times the applicable legal interest rate, as well as a flat-rate recovery fee of €40. Le Comptoir du Code also reserves the right to suspend the website until full payment is received.",
    },
    {
      title: "6. Intellectual Property (The Code)",
      content:
        "This is an absolute rule of craftsmanship: the work belongs to its creator until it is paid for. The transfer of intellectual property rights over custom code and design only occurs upon full payment of the final invoice. Once settled, the code is yours.",
    },
    {
      title: "7. Warranty and Technical Maintenance",
      content:
        "For projects valued at €2,500 or more (E-commerce and Custom plans), the service includes technical maintenance for 12 months from the launch date. This maintenance covers exclusively security updates and critical bug fixes related to my code. It does not cover requests for new features, content modifications, design overhauls, or malfunctions caused by the client. For projects under €2,500 (Presence plan), the site is delivered turnkey. Any post-delivery technical work will be subject to a separate quote.",
    },
    {
      title: "8. Termination",
      content:
        "In case of contract termination before completion by the client, the deposit remains with Le Comptoir du Code. Additionally, hours already worked beyond the deposit amount will be invoiced on a pro-rata basis.",
    },
    {
      title: "9. Disputes",
      content:
        "These conditions are governed by French law. In case of a dispute, we will always try to find an amicable solution at the counter. Failing that, the competent court will be that of Le Comptoir du Code's registered office.",
    },
  ],
}

export default async function ConditionsGenerales({
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
            {isFr
              ? 'Conditions Générales de Prestation de Services'
              : 'General Terms and Conditions of Service'}
          </h1>

          {content.map((article) => (
            <div key={article.title} className={styles.block}>
              <h2 className={styles.heading}>{article.title}</h2>
              <p className={styles.text}>{article.content}</p>
            </div>
          ))}

        </div>
      </main>
      <Footer locale={locale} dict={dict.footer} />
    </>
  )
}
