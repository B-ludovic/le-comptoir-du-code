import type { Metadata } from 'next'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import styles from '@/components/Legal/Legal.module.css'
import fr from '@/app/dictionaries/fr.json'
import en from '@/app/dictionaries/en.json'

const BASE_URL = 'https://lechoppeducode.com'
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
      ? "Conditions Générales de Prestation | L'Echoppe du Code"
      : "Terms of Service | L'Echoppe du Code",
    description: isFr
      ? "Conditions générales de prestation de services de L'Echoppe du Code — tarifs, délais, maintenance, propriété intellectuelle."
      : "Terms of service for L'Echoppe du Code — pricing, timelines, maintenance, intellectual property.",
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
        "Les présentes conditions régissent les prestations de développement web et de conseil réalisées par Ludovic BATAILLE (opérant sous la marque commerciale \"L'Échoppe du Code\"), agissant en qualité de consultant autonome (Salarié porté) et hébergé juridiquement par la société de portage salarial Jump Green, ci-après désignée \"Le Prestataire\". Toute validation d'une proposition commerciale ou d'un devis implique l'acceptation sans réserve des présentes conditions par le client.",
    },
    {
      title: "2. Formation du contrat et Acompte",
      content:
        "Un projet débute officiellement à réception de deux éléments : le devis daté, signé, et portant la mention \"Bon pour accord\", ainsi que le paiement d'un acompte de 30 % du montant total TTC (sauf mention contraire sur le devis). La production ne démarrera qu'à réception de ces éléments. L'acompte valide la réservation du temps alloué au projet et n'est pas remboursable en cas d'annulation unilatérale par le client.",
    },
    {
      title: "3. Les engagements du Client (Fourniture des contenus)",
      content:
        "Pour garantir le respect des délais, le client s'engage à fournir l'ensemble des contenus (textes, logos, images, accès serveurs) nécessaires à la réalisation du projet dans les temps convenus. Tout retard dans la livraison de ces éléments entraînera un report proportionnel de la date de livraison finale. Le Prestataire ne saurait en être tenu responsable.",
    },
    {
      title: "4. Tarifs et Modalités de paiement",
      content:
        "Les prix figurant sur les devis sont indiqués en euros et Hors Taxes (HT). La Taxe sur la Valeur Ajoutée (TVA) au taux en vigueur s'applique en sus. Le solde de la facture est exigible à la livraison du projet (mise en ligne ou livraison du code source), avec un délai de paiement maximum de 15 jours à compter de la date d'émission de la facture. Le règlement s'effectue par virement bancaire uniquement, sur le compte professionnel indiqué sur la facture.",
    },
    {
      title: "5. Retard de paiement",
      content:
        "Tout retard de paiement entraînera de plein droit, dès le premier jour de retard, l'application de pénalités de retard égales à 3 fois le taux d'intérêt légal en vigueur, ainsi qu'une indemnité forfaitaire pour frais de recouvrement de 40 €. Le Prestataire se réserve également le droit de suspendre la mise en ligne ou la livraison du site jusqu'au règlement intégral.",
    },
    {
      title: "6. Propriété Intellectuelle",
      content:
        "Le transfert des droits de propriété intellectuelle sur le code sur-mesure et le design ne s'opère qu'au moment du paiement intégral de la facture finale. Tant que le solde n'est pas réglé, l'œuvre demeure la propriété exclusive du Prestataire. Une fois le paiement intégral effectué, la propriété du code est définitivement cédée au client.",
    },
    {
      title: "7. Garantie et Maintenance technique",
      content:
        "Pour les projets d'une valeur égale ou supérieure à 3 000 € HT (offres E-commerce et Sur-Mesure), la prestation inclut une maintenance technique d'une durée de 12 mois à compter de la mise en ligne. Au terme de cette période, un contrat de maintenance mensuel optionnel est proposé (85 € HT/mois pour l'offre E-commerce, à partir de 165 € HT/mois pour l'offre Sur-Mesure). Cette maintenance couvre exclusivement les mises à jour de sécurité et la correction de bugs bloquants liés au code livré (anomalies empêchant l'utilisation normale de l'outil). Elle exclut les demandes de nouvelles fonctionnalités, les modifications de contenu, les refontes de design, ou les pannes causées par une manipulation du client. Pour les projets d'une valeur inférieure à 3 000 € HT (offre Présence), une maintenance optionnelle est disponible à 70 € HT/mois. En l'absence de contrat de maintenance, toute intervention technique post-livraison fera l'objet d'un devis séparé. Les coûts d'infrastructure (hébergement, noms de domaine, services tiers) sont exclus de la maintenance et restent à la charge directe du client.",
    },
    {
      title: "8. Résiliation",
      content:
        "En cas de rupture du contrat avant son terme par le client, l'acompte versé reste acquis au Prestataire à titre de dédommagement. De plus, les heures de production déjà réalisées au-delà du montant de l'acompte seront facturées sur la base du taux journalier en vigueur indiqué sur le devis.",
    },
    {
      title: "9. Litiges",
      content:
        "Les présentes conditions sont soumises au droit français. En cas de litige, les parties s'efforceront de trouver une solution amiable. À défaut d'accord, le tribunal compétent sera celui du ressort du siège social de la société de portage (Tribunal de Commerce compétent).",
    },
  ],
  en: [
    {
      title: "1. Purpose and Scope",
      content:
        "These Terms and Conditions govern the web development and consulting services provided by Ludovic BATAILLE (operating under the trade name \"L'Échoppe du Code\"), acting as an autonomous consultant (portage salarial) and legally hosted by the umbrella company Jump Green, hereinafter referred to as \"the Service Provider\". Signing or validating a commercial proposal or quote implies unconditional acceptance of these terms by the client.",
    },
    {
      title: "2. Contract Formation and Deposit",
      content:
        'A project officially begins upon receipt of two items: the quote—dated, signed, and bearing the handwritten note "Accepted" (Bon pour accord)—and the payment of a 30% deposit of the total amount including VAT (unless otherwise specified on the quote). Production will not begin until both elements are received. This deposit secures the time allocated to the project and is non-refundable should the client unilaterally cancel.',
    },
    {
      title: "3. Client Commitments (Content Delivery)",
      content:
        "To ensure deadlines are met, the client agrees to provide all necessary content (texts, logos, images, server access) within the agreed timeframes. Any delay in delivering these materials will result in a proportional extension of the final delivery date. The Service Provider cannot be held liable for such delays.",
    },
    {
      title: "4. Pricing and Payment Terms",
      content:
        "Prices on quotes are listed in euros, excluding VAT (HT). Value-Added Tax at the current applicable rate is added on top. The remaining balance is due upon delivery of the project (website launch or source code handover), with a maximum payment term of 15 days from the invoice issue date. Payments must be made exclusively by bank transfer to the professional account indicated on the invoice.",
    },
    {
      title: "5. Late Payment",
      content:
        "Any late payment will automatically trigger, from the very first day of delay, late payment penalties equal to 3 times the applicable legal interest rate, along with a flat-rate recovery indemnity of €40. The Service Provider also reserves the right to suspend the delivery or launch of the website until the balance is paid in full.",
    },
    {
      title: "6. Intellectual Property",
      content:
        "The transfer of intellectual property rights over the custom code and design takes place only upon full payment of the final invoice. Until the balance is settled, the work remains the exclusive property of the Service Provider. Once full payment is received, ownership of the code is permanently transferred to the client.",
    },
    {
      title: "7. Warranty and Technical Maintenance",
      content:
        "For projects valued at €3,000 excl. VAT or more (E-commerce and Custom plans), the service includes 12 months of technical maintenance from the launch date. After this period, an optional monthly maintenance contract is available (€85 excl. VAT/month for the E-commerce plan, from €165 excl. VAT/month for the Custom plan). This maintenance covers only security updates and the correction of blocking bugs in the delivered code (anomalies preventing normal use of the tool). It excludes new feature requests, content updates, design overhauls, or issues caused by client mishandling. For projects under €3,000 excl. VAT (Presence plan), optional maintenance is available at €70 excl. VAT/month. Without a maintenance contract, any post-delivery technical intervention will require a separate quote. Infrastructure costs (hosting, domain names, third-party services) are excluded from maintenance and remain the client's direct responsibility.",
    },
    {
      title: "8. Termination",
      content:
        "If the client terminates the contract before its completion, the deposit paid is forfeited and retained by the Service Provider as compensation. Furthermore, any production hours already completed beyond the value of the deposit will be invoiced at the daily rate indicated on the quote.",
    },
    {
      title: "9. Disputes",
      content:
        "These terms are governed by French law. In the event of a dispute, the parties will endeavour to reach an amicable resolution. Failing that, the competent jurisdiction will be the Commercial Court with authority over the registered office of the umbrella company.",
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
              ? 'Conditions Générales de Vente et de Prestation de Services'
              : 'General Terms and Conditions of Sale and Service'}
          </h1>

          <p className={styles.text} style={{ opacity: 0.6, fontSize: '0.85rem', marginBottom: '2rem' }}>
            {isFr ? 'Dernière mise à jour : 8 avril 2026' : 'Last updated: April 8, 2026'}
          </p>

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
