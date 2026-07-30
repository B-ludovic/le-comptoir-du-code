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
        "Les présentes conditions régissent les prestations de développement web et de conseil réalisées par Ludovic BATAILLE, opérant sous la marque commerciale \"L'Échoppe du Code\", ci-après désigné \"le Prestataire\", agissant en qualité de salarié porté et hébergé juridiquement par la société de portage salarial Jump Green, ci-après désignée \"la Société de Portage\". Toute validation d'une proposition commerciale ou d'un devis par la personne physique ou morale ayant passé commande, ci-après désignée \"le Client\", implique l'acceptation sans réserve des présentes conditions.",
    },
    {
      title: "2. Formation du contrat et Acompte",
      content:
        "Un projet débute officiellement à réception de deux éléments : le devis daté, signé, et portant la mention \"Bon pour accord\", ainsi que le paiement d'un acompte de 30 % du montant total HT, auquel s'ajoute la TVA applicable. Une facture d'acompte est émise et transmise au Client dès réception du paiement. Le solde de 70 % est exigible à la mise en ligne du projet. La production ne démarrera qu'à réception de ces deux éléments. L'acompte valide la réservation du temps alloué au projet et n'est pas remboursable en cas d'annulation unilatérale par le Client.",
    },
    {
      title: "2 bis. Tarification solidaire — Associations",
      content:
        "L'Échoppe du Code propose une tarification réduite, dite \"tarification solidaire\", aux structures à but non lucratif reconnues, en priorité aux associations LGBTQI+. Pour en bénéficier, le Client doit justifier de son statut associatif en fournissant, avant la signature du devis, l'un des documents suivants : récépissé de déclaration en préfecture, statuts déposés et enregistrés, ou extrait du Répertoire National des Associations (RNA). La réduction s'applique sur le montant HT indiqué sur le devis spécifique établi dans le cadre de cette offre. Tout Client ne pouvant produire ce justificatif sera facturé aux tarifs standards. Le Prestataire se réserve le droit de vérifier la validité des documents fournis et de refuser l'application de la tarification solidaire en cas de doute ou de non-conformité.",
    },
    {
      title: "3. Engagements du Client (Fourniture des contenus)",
      content:
        "Le Client s'engage à fournir l'ensemble des éléments nécessaires à la réalisation du projet : textes définitifs, logo, images et accès techniques (hébergement, nom de domaine, services tiers). Ces éléments doivent être exploitables en l'état, selon les standards suivants : les textes sont livrés rédigés, relus et validés, dans un format éditable (traitement de texte, fichier texte ou document partagé), à l'exclusion des captures d'écran et des documents numérisés ; le logo est fourni en format vectoriel (SVG, AI, EPS, PDF) ou, à défaut, en PNG sur fond transparent d'une largeur minimale de 1 000 pixels ; les images sont fournies dans une définition minimale de 1 500 pixels de largeur ; les accès techniques sont vérifiés et fonctionnels. Le Client garantit détenir l'ensemble des droits de propriété intellectuelle et des autorisations nécessaires, notamment le droit à l'image des personnes représentées, sur les éléments qu'il transmet, et garantit le Prestataire contre tout recours de tiers à ce titre.\n\nTout retard dans la livraison de ces éléments entraîne un report proportionnel de la date de livraison finale, sans que la responsabilité du Prestataire puisse être engagée. À défaut de fourniture d'éléments conformes dans un délai de trente (30) jours calendaires à compter de la demande écrite du Prestataire, le projet est mis en sommeil : le créneau de production réservé est libéré et l'acompte reste acquis au Prestataire. La reprise du projet est subordonnée au paiement de frais de réactivation de 150 € HT et à la disponibilité d'un nouveau créneau de production. Passé un délai de quatre-vingt-dix (90) jours de mise en sommeil, le contrat est résilié de plein droit dans les conditions de l'article 8.\n\nLorsque le Client n'est pas en mesure de fournir tout ou partie de ces éléments, le Prestataire peut lui proposer une prestation complémentaire de rédaction ou de création d'identité visuelle, faisant l'objet d'un devis distinct. En l'absence d'une telle prestation, le Prestataire est fondé à livrer le projet avec des contenus de substitution provisoires ; cette livraison vaut livraison conforme et rend le solde exigible dans les conditions de l'article 4.",
    },
    {
      title: "3 bis. Conception graphique et directives du Client",
      content:
        "Le devis distingue expressément deux natures de prestation. La conception désigne le travail de création mené par le Prestataire : direction artistique, maquettes, choix typographiques et chromatiques, création ou adaptation de l'identité visuelle. L'intégration désigne la mise en œuvre technique d'éléments graphiques fournis ou imposés par le Client. Sauf mention contraire au devis, la prestation relève de l'intégration et n'emporte aucune création d'identité visuelle : la production d'un logo, d'une charte graphique ou d'une ligne éditoriale fait l'objet d'un devis distinct.\n\nLorsque le Client impose des éléments ou des directives graphiques, le Prestataire les met en œuvre après avoir signalé par écrit, le cas échéant, les conséquences qu'il anticipe en matière de lisibilité, d'accessibilité, de performance ou de cohérence visuelle. Si le Client maintient sa directive après ce signalement, il en assume la responsabilité : le résultat ne peut fonder ni une demande de reprise à titre gratuit, ni un refus de réception.\n\nLa prestation de conception comprend deux séries d'ajustements à compter de la présentation des maquettes ; toute demande au-delà fait l'objet d'un devis complémentaire.",
    },
    {
      title: "4. Tarifs et Modalités de paiement",
      content:
        "Les prix figurant sur les devis sont indiqués en euros et Hors Taxes (HT). La Taxe sur la Valeur Ajoutée (TVA) au taux en vigueur s'applique en sus. Le solde de la facture est exigible à la livraison du projet (mise en ligne ou livraison du code source), avec un délai de paiement maximum de 15 jours à compter de la date d'émission de la facture. Le règlement s'effectue par virement bancaire uniquement, sur le compte professionnel du Prestataire indiqué sur la facture.",
    },
    {
      title: "5. Retard de paiement",
      content:
        "Tout retard de paiement du Client entraînera de plein droit, dès le premier jour de retard, l'application de pénalités de retard égales à 3 fois le taux d'intérêt légal en vigueur, ainsi qu'une indemnité forfaitaire pour frais de recouvrement de 40 €. Le Prestataire se réserve également le droit de suspendre la mise en ligne ou la livraison du site jusqu'au règlement intégral.",
    },
    {
      title: "6. Propriété Intellectuelle",
      content:
        "Le transfert des droits de propriété intellectuelle sur le code sur-mesure et le design ne s'opère qu'au moment du paiement intégral de la facture finale par le Client. Tant que le solde n'est pas réglé, l'œuvre demeure la propriété exclusive du Prestataire. Une fois le paiement intégral effectué, la propriété du code est définitivement cédée au Client.",
    },
    {
      title: "6 bis. Paternité, mention et droit de référence",
      content:
        "Conformément au droit moral de l'auteur, qui est inaliénable, le Prestataire conserve le droit de voir son nom associé aux œuvres qu'il a conçues, indépendamment du transfert des droits patrimoniaux prévu à l'article 6. Une mention discrète « Réalisé par L'Échoppe du Code », accompagnée d'un lien hypertexte, est apposée en pied de page du site livré. Le Client peut en demander le retrait par écrit ; ce retrait ne remet pas en cause le droit de référence défini ci-après.\n\nSymétriquement, le Prestataire se réserve le droit de ne pas apposer cette mention et de ne pas citer le projet parmi ses références, notamment lorsque l'identité visuelle, les contenus ou les orientations graphiques lui ont été imposés par le Client au sens de l'article 3 bis. Cette décision relève de sa seule appréciation et n'ouvre droit à aucune réduction de prix ni à aucune indemnité.\n\nSauf opposition écrite du Client formulée avant la mise en ligne, le Prestataire est autorisé à présenter le projet à titre de référence sur ses supports de communication (portfolio, réseaux professionnels, dossiers de candidature), sous forme de captures d'écran, de description fonctionnelle et de mention du nom du Client, à l'exclusion de toute information confidentielle, donnée personnelle ou élément couvert par un accord de confidentialité.",
    },
    {
      title: "7. Garantie et Maintenance technique",
      content:
        "Pour les projets d'une valeur égale ou supérieure à 2 850 € HT (offres E-commerce et Sur-Mesure), la prestation inclut une maintenance technique d'une durée de 12 mois à compter de la mise en ligne. Au terme de cette période, un contrat de maintenance mensuel optionnel est proposé au Client (85 € HT/mois pour l'offre E-commerce, à partir de 165 € HT/mois pour l'offre Sur-Mesure).\n\nCette maintenance couvre exclusivement les mises à jour de sécurité et la correction de bugs bloquants liés au code livré par le Prestataire (anomalies empêchant l'utilisation normale de l'outil). Elle exclut les demandes de nouvelles fonctionnalités, les modifications de contenu, les refontes de design, ou les pannes causées par une manipulation du Client. Pour les projets d'une valeur inférieure à 2 850 € HT (offre Présence), une maintenance optionnelle est disponible à 70 € HT/mois.\n\nEn l'absence de contrat de maintenance, toute intervention technique post-livraison fera l'objet d'un devis séparé soumis au Client. Le contrat de maintenance mensuel est résiliable à tout moment par le Client avec un préavis d'un mois calendaire, sans pénalité. Les coûts d'infrastructure (hébergement, noms de domaine, services tiers) sont exclus de la maintenance et restent à la charge directe du Client.",
    },
    {
      title: "8. Résiliation",
      content:
        "En cas de rupture du contrat avant son terme par le Client, l'acompte versé reste acquis au Prestataire à titre de dédommagement. De plus, les heures de production déjà réalisées au-delà du montant de l'acompte seront facturées au Client sur la base du taux journalier indiqué sur le devis ou, à défaut, sur la base d'un taux journalier communiqué par le Prestataire.",
    },
    {
      title: "9. Litiges",
      content:
        "Les présentes conditions sont soumises au droit français. En cas de litige entre le Client et le Prestataire, les parties s'efforceront de trouver une solution amiable. À défaut d'accord, le tribunal compétent sera celui du ressort du siège social de la Société de Portage (Tribunal de Commerce compétent).",
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
        'A project officially begins upon receipt of two items: the quote—dated, signed, and bearing the handwritten note "Accepted" (Bon pour accord)—and the payment of a 30% deposit of the total amount excl. VAT, plus applicable VAT. A deposit invoice is issued and sent to the Client upon receipt of payment. The remaining balance of 70% is due upon the project going live. Production will not begin until both elements are received. This deposit secures the time allocated to the project and is non-refundable should the Client unilaterally cancel.',
    },
    {
      title: "2b. Solidarity Pricing — Non-Profit Organisations",
      content:
        "L'Échoppe du Code offers a reduced rate, referred to as \"solidarity pricing\", to recognised non-profit organisations, with a priority focus on LGBTQI+ associations. To qualify, the Client must provide proof of non-profit status before signing the quote, by submitting one of the following documents: official registration receipt from the relevant authority, filed and registered articles of association, or an extract from the National Register of Associations (RNA) or equivalent. The discount applies to the excl. VAT amount shown on the specific quote issued under this scheme. Any Client unable to provide such documentation will be invoiced at standard rates. The Service Provider reserves the right to verify the validity of submitted documents and to refuse solidarity pricing in the event of doubt or non-compliance.",
    },
    {
      title: "3. Client Commitments (Content Delivery)",
      content:
        "The Client undertakes to provide all materials required to carry out the project: final copy, logo, images, and technical access credentials (hosting, domain name, third-party services). These materials must be usable as delivered, according to the following standards: copy must be written, proofread and approved, supplied in an editable format (word processor file, text file or shared document), excluding screenshots and scanned documents; the logo must be supplied in a vector format (SVG, AI, EPS, PDF) or, failing that, as a PNG on a transparent background at least 1,000 pixels wide; images must be supplied at a minimum width of 1,500 pixels; technical access credentials must be verified and working. The Client warrants that it holds all intellectual property rights and permissions — including image rights for any individuals depicted — over the materials it supplies, and shall indemnify the Service Provider against any third-party claim in this respect.\n\nAny delay in delivering these materials will result in a proportional extension of the final delivery date, without any liability on the part of the Service Provider. Should compliant materials not be supplied within thirty (30) calendar days of the Service Provider's written request, the project will be placed on hold: the reserved production slot is released and the deposit remains forfeited to the Service Provider. Resuming the project is subject to payment of a reactivation fee of €150 excl. VAT and to the availability of a new production slot. After ninety (90) days on hold, the contract is automatically terminated under the conditions of Article 8.\n\nWhere the Client is unable to supply all or part of these materials, the Service Provider may offer additional copywriting or visual identity services under a separate quote. In the absence of such a service, the Service Provider is entitled to deliver the project with temporary placeholder content; such delivery constitutes compliant delivery and renders the balance payable under the conditions of Article 4.",
    },
    {
      title: "3b. Design Work and Client Directives",
      content:
        "The quote expressly distinguishes between two types of service. Design refers to creative work carried out by the Service Provider: art direction, mock-ups, typographic and colour choices, and the creation or adaptation of a visual identity. Integration refers to the technical implementation of graphic materials supplied or imposed by the Client. Unless the quote states otherwise, the service constitutes integration and does not include the creation of any visual identity: producing a logo, a brand style guide or an editorial line is the subject of a separate quote.\n\nWhere the Client imposes graphic materials or directives, the Service Provider will implement them after giving written notice, where applicable, of the consequences it anticipates in terms of legibility, accessibility, performance or visual consistency. If the Client maintains its directive after such notice, the Client assumes responsibility for it: the resulting work cannot form the basis of either a free-of-charge rework request or a refusal of acceptance.\n\nDesign services include two rounds of adjustments from the presentation of the mock-ups; any request beyond that is subject to an additional quote.",
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
      title: "6b. Attribution, Credit and Right of Reference",
      content:
        "In accordance with the author's moral right, which is inalienable under French law, the Service Provider retains the right to have their name associated with the works they have designed, irrespective of the transfer of economic rights set out in Article 6. A discreet credit reading \"Réalisé par L'Échoppe du Code\", together with a hyperlink, is placed in the footer of the delivered website. The Client may request its removal in writing; such removal does not affect the right of reference defined below.\n\nConversely, the Service Provider reserves the right not to display this credit and not to list the project among their references, in particular where the visual identity, the content or the graphic direction has been imposed by the Client within the meaning of Article 3b. This decision is at the Service Provider's sole discretion and gives rise to no price reduction or compensation.\n\nUnless the Client objects in writing before the website goes live, the Service Provider is authorised to present the project as a reference across their communication materials (portfolio, professional networks, job applications), in the form of screenshots, a functional description and mention of the Client's name, excluding any confidential information, personal data or material covered by a non-disclosure agreement.",
    },
    {
      title: "7. Warranty and Technical Maintenance",
      content:
        "For projects valued at €2,850 excl. VAT or more (E-commerce and Custom plans), the service includes 12 months of technical maintenance from the launch date. After this period, an optional monthly maintenance contract is available (€85 excl. VAT/month for the E-commerce plan, from €165 excl. VAT/month for the Custom plan).\n\nThis maintenance covers only security updates and the correction of blocking bugs in the delivered code (anomalies preventing normal use of the tool). It excludes new feature requests, content updates, design overhauls, or issues caused by client mishandling. For projects under €2,850 excl. VAT (Presence plan), optional maintenance is available at €70 excl. VAT/month.\n\nWithout a maintenance contract, any post-delivery technical intervention will require a separate quote submitted to the Client. The monthly maintenance contract may be cancelled by the Client at any time with one calendar month's notice, without penalty. Infrastructure costs (hosting, domain names, third-party services) are excluded from maintenance and remain the Client's direct responsibility.",
    },
    {
      title: "8. Termination",
      content:
        "If the Client terminates the contract before its completion, the deposit paid is forfeited and retained by the Service Provider as compensation. Furthermore, any production hours already completed beyond the value of the deposit will be invoiced at the daily rate indicated on the quote or, failing that, at a daily rate communicated by the Service Provider.",
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
            {isFr ? 'Dernière mise à jour : 30 juillet 2026 (v4)' : 'Last updated: July 30, 2026 (v4)'}
          </p>

          {content.map((article) => (
            <div key={article.title} className={styles.block}>
              <h2 className={styles.heading}>{article.title}</h2>
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className={styles.text}>
                  {paragraph}
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
