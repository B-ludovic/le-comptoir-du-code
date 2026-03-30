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
        "Les présentes conditions régissent les prestations de développement web et de conseil proposées par Ludovic BATAILLE (Le Comptoir du Code), agissant sous le statut d'entrepreneur-salarié et hébergé juridiquement par la coopérative Jump Green, à ses clients. Toute signature d'une proposition commerciale ou d'un devis implique l'acceptation sans réserve de ces conditions. Ici, on travaille en confiance, mais le cadre est défini.",
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
        "Les prix sur les devis sont indiqués en euros et Hors Taxes (HT). La Taxe sur la Valeur Ajoutée (TVA) au taux en vigueur s'applique en sus. Le solde de la facture est exigible à la livraison du projet (mise en ligne ou livraison du code source), avec un délai maximum de 15 jours à compter de la date d'émission de la facture. Le règlement s'effectue par virement bancaire uniquement, sur le compte bancaire professionnel indiqué sur la facture.",
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
        "Pour les projets d'une valeur égale ou supérieure à 3 000 € (offres E-commerce et Sur-Mesure), la prestation inclut une maintenance technique d'une durée de 12 mois à compter de la mise en ligne. Au terme de cette première année, un contrat de maintenance mensuel est proposé : 100 €/mois pour l'offre E-commerce, 120 €/mois pour l'offre Sur-Mesure. Cette maintenance couvre exclusivement les mises à jour de sécurité et la correction de bugs bloquants liés à mon code, définis comme toute anomalie empêchant l'utilisation normale de l'outil tel que livré. Elle ne couvre en aucun cas les demandes de nouvelles fonctionnalités, les modifications de contenu, les refontes de design, ou les pannes causées par une manipulation du client. Pour les projets d'une valeur inférieure à 3 000 € (offre Présence), une maintenance optionnelle est disponible à 80 €/mois. En l'absence de contrat de maintenance, toute intervention technique post-livraison fera l'objet d'un devis séparé. Le contrat de maintenance mensuel est résiliable à tout moment avec un préavis d'un mois calendaire, sans pénalité.",
    },
    {
      title: "8. Résiliation",
      content:
        "En cas de rupture du contrat avant son terme par le client, l'acompte reste acquis au Comptoir du Code. De plus, les heures déjà travaillées au-delà du montant de l'acompte seront facturées sur la base du taux journalier en vigueur indiqué sur le devis.",
    },
    {
      title: "9. Litiges",
      content:
        "Les présentes conditions sont soumises au droit français. En cas de litige, on essaiera toujours de trouver une solution à l'amiable autour du comptoir. À défaut, le tribunal compétent sera celui du ressort du siège social de la coopérative Jump Green (Tribunal de Commerce de Bobigny).",
    },
  ],
  en: [
    {
      title: "1. Purpose and Scope",
      content:
        "These Terms and Conditions govern the web development and consulting services provided to clients by Ludovic BATAILLE (Le Comptoir du Code), operating under the status of employee-entrepreneur and legally hosted by the Jump Green cooperative. Signing a commercial proposal or quote implies unconditional acceptance of these terms. We work on a foundation of trust here, but the framework must be clearly defined.",
    },
    {
      title: "2. Contract Formation and Deposit",
      content:
        'A project officially begins upon receipt of two items: the quote—dated, signed, and bearing the handwritten note "Accepted" (Bon pour accord)—and the payment of a 30% deposit of the total amount (unless otherwise specified on the quote). Without these two elements, not a single line of code will be written. This deposit secures my time and is non-refundable should the client cancel the project.',
    },
    {
      title: "3. Client Commitments (Content)",
      content:
        "To deliver a high-performance engine on time, I need fuel. The client agrees to provide all necessary content (texts, logos, images, server access) within the agreed deadlines. Any delay in delivering these materials will result in a proportional extension of the final delivery date. I cannot be held liable for such delays.",
    },
    {
      title: "4. Pricing and Payment Terms",
      content:
        "Prices on quotes are listed in euros, excluding taxes (HT). Value-Added Tax (VAT) at the current rate is applied additionally. The remaining balance is due upon delivery of the project (website launch or source code handover), with a strict maximum payment term of 15 days from the invoice issue date. Payments must be made exclusively by bank transfer to the professional account indicated on the invoice.",
    },
    {
      title: "5. Late Payment",
      content:
        "Any late payment will automatically trigger, from the very first day of delay, late payment penalties equal to 3 times the applicable legal interest rate, along with a flat-rate recovery indemnity of €40. Le Comptoir du Code also reserves the right to suspend the website's hosting or launch until the balance is paid in full.",
    },
    {
      title: "6. Intellectual Property (The Code)",
      content:
        "This is an absolute rule of craftsmanship: the work belongs to its creator until it is paid for. The transfer of intellectual property rights for custom code and design takes place only upon full payment of the final invoice. Once the balance is settled, the code is entirely yours.",
    },
    {
      title: "7. Warranty and Technical Maintenance",
      content:
        "For projects valued at €3,000 or more (E-commerce and Custom plans), the service includes technical maintenance for 12 months following the launch date. After this initial year, a monthly maintenance contract is offered: €100/month for the E-commerce plan, and €120/month for the Custom plan. This maintenance strictly covers security updates and the fixing of blocking bugs related to my code (defined as any anomaly preventing the normal use of the delivered tool). It explicitly does not cover requests for new features, content updates, design overhauls, or breakdowns caused by client mishandling. For projects under €3,000 (Presence plan), optional maintenance is available for €80/month. Without an active maintenance contract, any post-delivery technical intervention will require a separate quote. The monthly maintenance contract can be canceled at any time with a one-month calendar notice, penalty-free.",
    },
    {
      title: "8. Termination",
      content:
        "If the client terminates the contract before its completion, the deposit is forfeited and retained by Le Comptoir du Code. Furthermore, any hours already worked that exceed the value of the deposit will be invoiced based on the current daily rate indicated on the quote.",
    },
    {
      title: "9. Disputes",
      content:
        "These terms are governed by French law. In the event of a dispute, we will always try to find an amicable solution around the counter first. Failing that, the competent jurisdiction will be the Commercial Court of Bobigny, aligned with the registered office of the Jump Green cooperative.",
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
