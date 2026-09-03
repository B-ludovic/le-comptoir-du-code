import type { Metadata } from 'next'
import { BASE_URL } from '@/lib/structured-data'
import { tier, formatMonthly, formatPrice, ENGINEERING_DAY_RATE } from '@/lib/pricing'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import styles from '@/components/Legal/Legal.module.css'
import { linkifyEmails } from '@/components/Legal/linkify'
import fr from '@/app/dictionaries/fr.json'
import en from '@/app/dictionaries/en.json'

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
      ? "Conditions Générales de Prestation | L'Échoppe du Code"
      : "Terms of Service | L'Échoppe du Code",
    description: isFr
      ? "Conditions générales de prestation de services de L'Échoppe du Code — tarifs, délais, maintenance, propriété intellectuelle."
      : "Terms of service for L'Échoppe du Code — pricing, timelines, maintenance, intellectual property.",
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
      title: "1. Objet et champ d'application",
      content:
        "Les présentes conditions régissent les prestations de développement web et de conseil réalisées par Ludovic BATAILLE, opérant sous la marque commerciale \"L'Échoppe du Code\", ci-après désigné \"le Prestataire\", agissant en qualité de salarié porté par la société de portage salarial JUMP GREEN (SAS), ci-après désignée \"la Société de Portage\". Toute validation d'une proposition commerciale ou d'un devis par la personne physique ou morale ayant passé commande, ci-après désignée \"le Client\", implique l'acceptation sans réserve des présentes conditions.\n\nLes présentes conditions s'appliquent exclusivement aux Clients professionnels, agissant dans le cadre de leur activité commerciale, industrielle, artisanale, libérale ou associative. Le Prestataire ne contracte pas avec des consommateurs au sens du code de la consommation.",
    },
    {
      title: "2. Formation du contrat et acompte",
      content:
        "Un projet débute officiellement à réception de deux éléments : le devis daté, signé et portant la mention « Bon pour accord », ainsi que le versement d'un acompte de 30 % du montant total HT, majoré de la TVA applicable. Une facture d'acompte est émise et transmise au Client dès réception du paiement. Le solde de 70 % est exigible à la mise en ligne du projet. La production ne démarre qu'à réception de ces deux éléments.\n\nLes sommes versées d'avance constituent un acompte, et non des arrhes au sens de l'article 1590 du code civil. Elles engagent définitivement les deux parties : aucune faculté de dédit n'est ouverte, et l'annulation unilatérale du Client demeure régie par l'article 8. L'acompte n'est pas remboursable et vaut réservation du temps de production alloué au projet.",
    },
    {
      title: "2 bis. Tarification solidaire — Associations",
      content:
        "L'Échoppe du Code propose une tarification réduite, dite \"tarification solidaire\", aux structures à but non lucratif reconnues, en priorité aux associations LGBTQI+. Pour en bénéficier, le Client doit justifier de son statut associatif en fournissant, avant la signature du devis, l'un des documents suivants : récépissé de déclaration en préfecture, statuts déposés et enregistrés, ou extrait du Répertoire National des Associations (RNA). La réduction s'applique sur le montant HT indiqué sur le devis spécifique établi dans le cadre de cette offre. Tout Client ne pouvant produire ce justificatif sera facturé aux tarifs standards. Le Prestataire se réserve le droit de vérifier la validité des documents fournis et de refuser l'application de la tarification solidaire en cas de doute ou de non-conformité.",
    },
    {
      title: "2 ter. Faculté de rétractation du Client professionnel (article L221-3)",
      content:
        "Par exception, lorsque le contrat est conclu hors établissement, que le Client emploie cinq (5) salariés au plus et que l'objet du contrat n'entre pas dans le champ de son activité principale, le Client bénéficie, en application de l'article L221-3 du code de la consommation, d'un délai de quatorze (14) jours à compter de la conclusion du contrat pour se rétracter. Il peut l'exercer par toute déclaration écrite dénuée d'ambiguïté adressée à contact@lechoppeducode.com.\n\nLe Client peut demander expressément l'exécution de la prestation avant l'expiration de ce délai, en cochant et paraphant la mention prévue à cet effet sur le devis. La prestation pleinement exécutée avant la fin du délai éteint alors cette faculté ; en cas d'exécution partielle, le Client demeure redevable du montant correspondant à la prestation déjà fournie.\n\nEn dehors de ce cas, notamment lorsque le contrat est conclu à distance ou dans les locaux du Prestataire, aucune faculté de rétractation n'est ouverte au Client.",
    },
    {
      title: "3. Engagements du Client (Fourniture des contenus)",
      content:
        "Le Client s'engage à fournir l'ensemble des éléments nécessaires à la réalisation du projet : textes définitifs, logo, images et accès techniques (hébergement, nom de domaine, services tiers). Ces éléments doivent être exploitables en l'état, selon les standards suivants : les textes sont livrés rédigés, relus et validés, dans un format éditable (traitement de texte, fichier texte ou document partagé), à l'exclusion des captures d'écran et des documents numérisés ; le logo est fourni en format vectoriel (SVG, AI, EPS, PDF) ou, à défaut, en PNG sur fond transparent d'une largeur minimale de 1 000 pixels ; les images sont fournies dans une définition minimale de 1 500 pixels de largeur ; les accès techniques sont vérifiés et fonctionnels. Le Client garantit détenir l'ensemble des droits de propriété intellectuelle et des autorisations nécessaires, notamment le droit à l'image des personnes représentées, sur les éléments qu'il transmet, et garantit le Prestataire contre tout recours de tiers à ce titre.\n\nTout retard dans la livraison de ces éléments entraîne un report proportionnel de la date de livraison finale, sans que la responsabilité du Prestataire puisse être engagée. À défaut de fourniture d'éléments conformes dans un délai de trente (30) jours calendaires à compter de la demande écrite du Prestataire, le projet est mis en sommeil : le créneau de production réservé est libéré et l'acompte reste acquis au Prestataire. La reprise du projet est subordonnée au paiement de frais de réactivation de 150 € HT et à la disponibilité d'un nouveau créneau de production. Passé un délai de quatre-vingt-dix (90) jours de mise en sommeil, le contrat est résilié de plein droit dans les conditions de l'article 8.\n\nLorsque le Client n'est pas en mesure de fournir tout ou partie de ces éléments, le Prestataire peut lui proposer une prestation complémentaire de rédaction ou de création d'identité visuelle, faisant l'objet d'un devis distinct. En l'absence d'une telle prestation, le Prestataire est fondé à livrer le projet avec des contenus de substitution provisoires ; cette livraison vaut livraison conforme et rend le solde exigible dans les conditions de l'article 4.",
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
      title: "4 bis. Imputation de la prestation de cadrage",
      content:
        "Lorsque le Client a fait réaliser par le Prestataire une prestation de cadrage et qu'il signe un devis de développement dans un délai de trois (3) mois à compter de la remise du dossier de cadrage, cinquante pour cent (50 %) du montant HT effectivement réglé au titre de ce cadrage s'imputent sur le prix HT de la prestation de développement.\n\nL'imputation est mentionnée sur la proposition commerciale ou le devis de développement, où elle apparaît en diminution du prix hors taxes, avant application de la taxe sur la valeur ajoutée. Elle ne peut donner lieu à aucun remboursement, ni excéder le prix de la prestation de développement, ni être cédée à un tiers.\n\nLe bénéfice de cette imputation suppose le paiement intégral préalable de la prestation de cadrage. Elle s'applique une seule fois par dossier de cadrage et ne concerne ni les prestations de conception produit facturées à la journée, ni les heures d'atelier complémentaires, lesquelles demeurent dues en totalité.\n\nPassé le délai de trois (3) mois courant à compter de la remise du dossier, la prestation de cadrage demeure intégralement acquise au Prestataire, sans imputation possible.",
    },
    {
      title: "5. Retard de paiement",
      content:
        "Tout retard de paiement du Client entraînera de plein droit, dès le premier jour de retard, l'application de pénalités de retard égales à 3 fois le taux d'intérêt légal en vigueur, ainsi qu'une indemnité forfaitaire pour frais de recouvrement de 40 €. Le Prestataire se réserve également le droit de suspendre la mise en ligne ou la livraison du site jusqu'au règlement intégral.",
    },
    {
      title: "6. Propriété intellectuelle et cession des droits",
      content:
        "Le code développé sur mesure et les créations graphiques originales réalisés spécifiquement pour le Client demeurent la propriété exclusive du Prestataire jusqu'au paiement intégral du prix. À compter de l'encaissement du solde, le Prestataire cède au Client, à titre exclusif et pour la durée légale de protection des droits d'auteur, les droits patrimoniaux sur ces éléments : droits de reproduction, de représentation, d'adaptation et de modification, pour tous les usages liés à l'exploitation du site livré, pour le monde entier et sur tout support numérique.\n\nSont expressément exclus de cette cession les composants, bibliothèques et briques logicielles réutilisables préexistants du Prestataire, ainsi que les logiciels et dépendances tiers, notamment open source, qui demeurent régis par leurs licences respectives. Sur ces éléments, le Prestataire concède au Client, dans la mesure nécessaire à l'exploitation du site, un droit d'usage non exclusif, cessible avec le site et sans limitation de durée.\n\nLe droit moral de l'auteur, inaliénable, demeure réservé dans les conditions de l'article 6 bis.",
    },
    {
      title: "6 bis. Paternité, mention et droit de référence",
      content:
        "Conformément au droit moral de l'auteur, qui est inaliénable, le Prestataire conserve le droit de voir son nom associé aux œuvres qu'il a conçues, indépendamment du transfert des droits patrimoniaux prévu à l'article 6. Une mention discrète « Réalisé par L'Échoppe du Code », accompagnée d'un lien hypertexte, est apposée en pied de page du site livré. Le Client peut en demander le retrait par écrit ; ce retrait ne remet pas en cause le droit de référence défini ci-après.\n\nSymétriquement, le Prestataire se réserve le droit de ne pas apposer cette mention et de ne pas citer le projet parmi ses références, notamment lorsque l'identité visuelle, les contenus ou les orientations graphiques lui ont été imposés par le Client au sens de l'article 3 bis. Cette décision relève de sa seule appréciation et n'ouvre droit à aucune réduction de prix ni à aucune indemnité.\n\nSauf opposition écrite du Client formulée avant la mise en ligne, le Prestataire est autorisé à présenter le projet à titre de référence sur ses supports de communication (portfolio, réseaux professionnels, dossiers de candidature), sous forme de captures d'écran, de description fonctionnelle et de mention du nom du Client, à l'exclusion de toute information confidentielle, donnée personnelle ou élément couvert par un accord de confidentialité.",
    },
    {
      title: "7. Garantie et Maintenance technique",
      content:
        `Les offres La Boutique et Les Outils Sur-Mesure incluent une maintenance technique de 12 mois à compter de la mise en ligne. L'offre La Présence en inclut 3 mois. Au terme de cette période, la maintenance se poursuit au tarif en vigueur (${formatMonthly(tier('presence').maintenance.price, 'fr')} pour La Présence, ${formatMonthly(tier('boutique').maintenance.price, 'fr')} pour La Boutique, ${formatMonthly(tier('outils').maintenance.price, 'fr')} pour Les Outils Sur-Mesure).\n\nCette maintenance couvre exclusivement les mises à jour de sécurité et la correction de bugs bloquants liés au code livré par le Prestataire (anomalies empêchant l'utilisation normale de l'outil). Elle exclut les demandes de nouvelles fonctionnalités, les modifications de contenu, les refontes de design, ou les pannes causées par une manipulation du Client. À l'issue de la période incluse, la maintenance se poursuit par reconduction tacite d'année en année au tarif en vigueur, résiliable par chacune des parties avec un préavis d'un mois avant l'échéance.\n\nEn l'absence de contrat de maintenance, toute intervention technique post-livraison fera l'objet d'un devis séparé soumis au Client. Le contrat de maintenance mensuel est résiliable à tout moment par le Client avec un préavis d'un mois calendaire, sans pénalité. Les coûts d'infrastructure (hébergement, noms de domaine, services tiers) sont exclus de la maintenance et restent à la charge directe du Client.`,
    },
    {
      title: "7 bis. Intégrité du livrable et interventions de tiers",
      content:
        `Constitue une intervention technique, au sens du présent article, toute modification du code source, des dépendances, des scripts, de la configuration, des variables d'environnement, de la base de données, de l'infrastructure d'hébergement, des enregistrements DNS ou des services tiers raccordés au livrable, réalisée par le Client ou par un tiers non mandaté par écrit par le Prestataire. L'utilisation normale du livrable par les interfaces prévues à cet effet, notamment l'espace d'administration et la gestion des contenus, du catalogue et des commandes, ne constitue pas une intervention technique.\n\nLe Client informe le Prestataire par écrit, préalablement, de toute intervention technique envisagée. Le Prestataire peut l'autoriser, l'encadrer ou proposer de la réaliser lui-même sur devis. L'autorisation n'est jamais tacite.\n\nToute intervention technique non autorisée entraîne, de plein droit et sans mise en demeure, la déchéance de la garantie et de la maintenance incluses à l'article 7 pour la période restant à courir. Le Prestataire n'est plus tenu d'aucune correction, mise à jour de sécurité ni veille sur le livrable ; toute demande ultérieure fait l'objet d'un devis distinct.\n\nLorsque le Client bénéficie d'un contrat de maintenance mensuel, l'intervention technique non autorisée suspend de plein droit les obligations du Prestataire, qui en notifie le Client par écrit. La reprise de la maintenance est subordonnée à une remise en conformité : le Prestataire établit un diagnostic et un devis de remise en état, facturés au taux journalier d'ingénierie de ${formatPrice(ENGINEERING_DAY_RATE, 'fr')} HT, l'unité de facturation étant la demi-journée. Aucune correction n'est déployée avant l'encaissement de la facture correspondante. Les redevances mensuelles demeurent dues pendant la suspension, le Client conservant la faculté de résilier dans les conditions de l'article 7. À défaut d'acceptation du devis dans un délai de trente (30) jours, le Prestataire peut résilier le contrat de maintenance sans préavis ni indemnité.\n\nLe Prestataire ne répond d'aucun dysfonctionnement, régression, perte de données ou faille de sécurité survenant postérieurement à une intervention technique non autorisée. Ces désordres sont présumés imputables à l'intervention, sauf preuve contraire rapportée par le Client. Les composants issus d'une telle intervention sont exclus des obligations de sécurité du Prestataire au titre de l'article 8 ter. L'historique du dépôt de code ainsi que les journaux de déploiement et d'hébergement font foi entre les parties de l'existence et de la date de l'intervention. Le Prestataire peut en outre retirer la mention et le lien prévus à l'article 6 bis.`,
    },
    {
      title: "8. Résiliation",
      content:
        "En cas de rupture du contrat avant son terme par le Client, l'acompte versé reste acquis au Prestataire à titre de dédommagement. De plus, les heures de production déjà réalisées au-delà du montant de l'acompte seront facturées au Client sur la base du taux journalier indiqué sur le devis ou, à défaut, sur la base d'un taux journalier communiqué par le Prestataire.",
    },
    {
      title: "8 bis. Responsabilité",
      content:
        "Le Prestataire est tenu d'une obligation de moyens : il met en œuvre les compétences et diligences propres à sa profession, sans garantir un résultat commercial, un niveau de référencement, de trafic ou de chiffre d'affaires. La responsabilité du Prestataire, tous préjudices confondus, est limitée au montant HT effectivement payé par le Client au titre de la prestation concernée.\n\nLe Prestataire ne répond pas des dommages indirects, tels que perte d'exploitation, perte de données, perte de chiffre d'affaires, de clientèle ou d'image, ni des défaillances imputables au Client, aux contenus qu'il fournit, à ses propres manipulations, aux services tiers (hébergement, services externes) ou à un cas de force majeure. Les présentes limitations ne s'appliquent ni en cas de faute lourde ou dolosive, ni lorsque la loi les prohibe.",
    },
    {
      title: "8 ter. Données personnelles et sous-traitance (RGPD)",
      content:
        "Lorsque la prestation conduit le Prestataire à traiter des données à caractère personnel pour le compte du Client (hébergement, maintenance, base de données, formulaires), le Prestataire agit en qualité de sous-traitant au sens de l'article 28 du RGPD et n'intervient que sur instruction documentée du Client, responsable de traitement. Les parties concluent à cet effet un accord de traitement des données (DPA) précisant l'objet, la durée, la nature et la finalité du traitement, les catégories de données et de personnes concernées, les mesures de sécurité et le sort des données en fin de contrat.\n\nLe Prestataire s'engage à la confidentialité, à ne recourir qu'à des sous-traitants ultérieurs présentant des garanties suffisantes et à assister le Client dans le respect de ses propres obligations (sécurité, violations de données, exercice des droits des personnes).",
    },
    {
      title: "8 quater. Absence de conseil juridique",
      content:
        "Les mentions légales, conditions générales, politiques de confidentialité et autres textes à portée juridique ou réglementaire que le Prestataire rédige, adapte ou intègre au projet sont des documents de travail, destinés à être soumis à un avocat ou à un juriste avant toute mise en ligne. Leur validation relève du seul Client.\n\nIl en va de même des dispositifs techniques liés à la conformité — bandeau de consentement, gestion des cookies, formulaires de collecte, durées de conservation : leur mise en œuvre par le Prestataire ne vaut ni audit, ni attestation de conformité.\n\nLe Prestataire n'exerce pas d'activité de consultation juridique et n'émet aucun avis juridique. Sa responsabilité ne saurait être engagée au titre de la conformité légale ou réglementaire du projet du Client, ni des conséquences d'une mise en ligne intervenue sans validation préalable par un professionnel du droit.",
    },
    {
      title: "9. Règlement des litiges et juridiction compétente",
      content:
        "Les présentes conditions sont soumises au droit français. En cas de différend, les parties s'efforcent d'abord de trouver une solution amiable, après réclamation écrite préalable adressée au Prestataire.\n\nÀ défaut de résolution amiable dans un délai de trente (30) jours, tout litige relève de la compétence exclusive du tribunal dans le ressort du siège social de la Société de Portage, y compris en cas de pluralité de défendeurs ou d'appel en garantie.",
    },
  ],
  en: [
    {
      title: "1. Purpose and Scope",
      content:
        "These Terms and Conditions govern the web development and consulting services provided by Ludovic BATAILLE (operating under the trade name \"L'Échoppe du Code\"), acting as an employee of the umbrella company JUMP GREEN (SAS) under a \"portage salarial\" arrangement, hereinafter referred to as \"the Service Provider\". Signing or validating a commercial proposal or quote implies unconditional acceptance of these terms by the client.\n\nThese terms apply exclusively to professional Clients acting in the course of their commercial, industrial, craft, professional or non-profit activity. The Service Provider does not contract with consumers within the meaning of the French Consumer Code.",
    },
    {
      title: "2. Contract Formation and Deposit",
      content:
        "A project officially begins upon receipt of two items: the quote — dated, signed and bearing the note « Bon pour accord » — and the payment of a 30 % deposit of the total amount excl. VAT, plus applicable VAT. A deposit invoice is issued and sent to the Client upon receipt of payment. The remaining 70 % balance is due when the project goes live. Production begins only once both items are received.\n\nSums paid in advance constitute a deposit (acompte), not arrhes within the meaning of Article 1590 of the French Civil Code. They bind both parties definitively: neither party has a right of withdrawal by forfeiture, and any unilateral cancellation by the Client remains governed by Article 8. The deposit is non-refundable and secures the production time allocated to the project.",
    },
    {
      title: "2b. Solidarity Pricing — Non-Profit Organisations",
      content:
        "L'Échoppe du Code offers a reduced rate, referred to as \"solidarity pricing\", to recognised non-profit organisations, with a priority focus on LGBTQI+ associations. To qualify, the Client must provide proof of non-profit status before signing the quote, by submitting one of the following documents: official registration receipt from the relevant authority, filed and registered articles of association, or an extract from the National Register of Associations (RNA) or equivalent. The discount applies to the excl. VAT amount shown on the specific quote issued under this scheme. Any Client unable to provide such documentation will be invoiced at standard rates. The Service Provider reserves the right to verify the validity of submitted documents and to refuse solidarity pricing in the event of doubt or non-compliance.",
    },
    {
      title: "2 ter. Professional Client's Right of Withdrawal (Article L221-3)",
      content:
        "By exception, where the contract is concluded off-premises, the Client employs no more than five (5) staff and the subject-matter of the contract falls outside the Client's main field of activity, the Client benefits, under Article L221-3 of the French Consumer Code, from fourteen (14) days from the conclusion of the contract to withdraw. This may be exercised by any clear written statement sent to contact@lechoppeducode.com.\n\nThe Client may expressly request performance before the end of that period by ticking and initialling the corresponding statement on the quote. A service fully performed before the end of the period extinguishes that right; in the event of partial performance, the Client remains liable for the amount corresponding to the service already provided.\n\nOutside that case — in particular where the contract is concluded at a distance or on the Service Provider's premises — the Client has no right of withdrawal.",
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
      title: "4 bis. Set-Off of the Scoping Engagement",
      content:
        "Where the Client has commissioned a scoping engagement from the Service Provider and signs a development quote within three (3) months of the delivery of the scoping report, fifty per cent (50%) of the amount actually paid, excluding VAT, in respect of that scoping engagement is set off against the price, excluding VAT, of the development services.\n\nThe set-off is stated on the commercial proposal or the development quote, where it appears as a reduction of the price excluding VAT, before value-added tax is applied. It may not give rise to any refund, exceed the price of the development services, or be assigned to a third party.\n\nEntitlement to the set-off is subject to prior payment in full of the scoping engagement. It applies once per scoping report and covers neither product design services billed by the day nor additional workshop hours, which remain payable in full.\n\nAfter the three (3) month period running from delivery of the report, the scoping engagement remains fully acquired by the Service Provider, with no set-off available.",
    },
    {
      title: "5. Late Payment",
      content:
        "Any late payment will automatically trigger, from the very first day of delay, late payment penalties equal to 3 times the applicable legal interest rate, along with a flat-rate recovery indemnity of €40. The Service Provider also reserves the right to suspend the delivery or launch of the website until the balance is paid in full.",
    },
    {
      title: "6. Intellectual Property and Assignment of Rights",
      content:
        "The custom-developed code and the original graphic works produced specifically for the Client remain the exclusive property of the Service Provider until full payment. Upon receipt of the balance, the Service Provider assigns to the Client, exclusively and for the legal term of copyright protection, the economic rights in those elements: rights of reproduction, representation, adaptation and modification, for all uses related to operating the delivered website, worldwide and on any digital medium.\n\nExpressly excluded from this assignment are the Service Provider's pre-existing reusable components, libraries and software building blocks, as well as third-party and open-source software and dependencies, which remain governed by their respective licences. On those elements, the Service Provider grants the Client, to the extent necessary to operate the website, a non-exclusive right of use, transferable with the website and unlimited in time.\n\nThe author's moral right, being inalienable, is reserved under the conditions of Article 6b.",
    },
    {
      title: "6b. Attribution, Credit and Right of Reference",
      content:
        "In accordance with the author's moral right, which is inalienable under French law, the Service Provider retains the right to have their name associated with the works they have designed, irrespective of the transfer of economic rights set out in Article 6. A discreet credit reading \"Réalisé par L'Échoppe du Code\", together with a hyperlink, is placed in the footer of the delivered website. The Client may request its removal in writing; such removal does not affect the right of reference defined below.\n\nConversely, the Service Provider reserves the right not to display this credit and not to list the project among their references, in particular where the visual identity, the content or the graphic direction has been imposed by the Client within the meaning of Article 3b. This decision is at the Service Provider's sole discretion and gives rise to no price reduction or compensation.\n\nUnless the Client objects in writing before the website goes live, the Service Provider is authorised to present the project as a reference across their communication materials (portfolio, professional networks, job applications), in the form of screenshots, a functional description and mention of the Client's name, excluding any confidential information, personal data or material covered by a non-disclosure agreement.",
    },
    {
      title: "7. Warranty and Technical Maintenance",
      content:
        `La Boutique and Les Outils Sur-Mesure include 12 months of technical maintenance from the launch date. La Présence includes 3 months. After this period, maintenance continues at the rate then in force (${formatMonthly(tier('presence').maintenance.price, 'en')} for La Présence, ${formatMonthly(tier('boutique').maintenance.price, 'en')} for La Boutique, ${formatMonthly(tier('outils').maintenance.price, 'en')} for Les Outils Sur-Mesure).\n\nThis maintenance covers only security updates and the correction of blocking bugs in the delivered code (anomalies preventing normal use of the tool). It excludes new feature requests, content updates, design overhauls, or issues caused by client mishandling. After the included period, maintenance renews automatically from year to year at the rate then in force, and may be terminated by either party with one month's notice before the renewal date.\n\nWithout a maintenance contract, any post-delivery technical intervention will require a separate quote submitted to the Client. The monthly maintenance contract may be cancelled by the Client at any time with one calendar month's notice, without penalty. Infrastructure costs (hosting, domain names, third-party services) are excluded from maintenance and remain the Client's direct responsibility.`,
    },
    {
      title: "7b. Integrity of the Deliverable and Third-Party Interventions",
      content:
        `For the purposes of this article, a technical intervention means any modification of the source code, dependencies, scripts, configuration, environment variables, database, hosting infrastructure, DNS records or third-party services connected to the deliverable, carried out by the Client or by a third party not mandated in writing by the Service Provider. Normal use of the deliverable through the interfaces provided for that purpose, in particular the administration area and the management of content, catalogue and orders, does not constitute a technical intervention.\n\nThe Client shall inform the Service Provider in writing, in advance, of any technical intervention it intends to carry out. The Service Provider may authorise it, set conditions for it, or offer to carry it out itself under a separate quote. Authorisation is never implied.\n\nAny unauthorised technical intervention automatically forfeits, without prior notice, the warranty and the included maintenance provided for in Article 7 for the remainder of their term. The Service Provider is then no longer bound to any correction, security update or monitoring of the deliverable; any subsequent request is subject to a separate quote.\n\nWhere the Client holds a monthly maintenance contract, an unauthorised technical intervention automatically suspends the Service Provider's obligations, and the Service Provider notifies the Client in writing. Resumption of maintenance is conditional upon remediation: the Service Provider carries out a diagnosis and issues a remediation quote, invoiced at the engineering day rate of ${formatPrice(ENGINEERING_DAY_RATE, 'en')} excl. VAT, billed in half-day units. No correction is deployed before the corresponding invoice has been settled and the funds received. Monthly fees remain due during the suspension, and the Client retains the right to cancel under the conditions of Article 7. If the quote is not accepted within thirty (30) days, the Service Provider may terminate the maintenance contract without notice or compensation.\n\nThe Service Provider is not liable for any malfunction, regression, data loss or security vulnerability arising after an unauthorised technical intervention. Such issues are presumed attributable to the intervention unless the Client proves otherwise. Components resulting from such an intervention are excluded from the Service Provider's security obligations under Article 8 ter. The code repository history and the deployment and hosting logs constitute evidence between the parties of the existence and date of the intervention. The Service Provider may also remove the credit and link provided for in Article 6b.`,
    },
    {
      title: "8. Termination",
      content:
        "If the Client terminates the contract before its completion, the deposit paid is forfeited and retained by the Service Provider as compensation. Furthermore, any production hours already completed beyond the value of the deposit will be invoiced at the daily rate indicated on the quote or, failing that, at a daily rate communicated by the Service Provider.",
    },
    {
      title: "8 bis. Liability",
      content:
        "The Service Provider is bound by a best-efforts obligation and does not guarantee any commercial outcome, search-ranking, traffic or revenue level. The Service Provider's liability, for all losses combined, is limited to the amount excl. VAT actually paid by the Client for the service concerned.\n\nThe Service Provider is not liable for indirect damages (loss of business, data, revenue, clientele or reputation), nor for failures attributable to the Client, the content it supplies, its own handling, third-party services (hosting, external services) or force majeure. These limitations do not apply in the event of gross negligence or wilful misconduct, nor where the law prohibits them.",
    },
    {
      title: "8 ter. Personal Data and Sub-processing (GDPR)",
      content:
        "Where the service leads the Service Provider to process personal data on behalf of the Client (hosting, maintenance, database, forms), the Service Provider acts as a processor within the meaning of Article 28 GDPR and only on the documented instructions of the Client, who is the controller. The parties enter into a Data Processing Agreement (DPA) setting out the subject-matter, duration, nature and purpose of the processing, the categories of data and data subjects, the security measures and the fate of the data at the end of the contract.\n\nThe Service Provider undertakes to maintain confidentiality, to use only sub-processors offering sufficient guarantees, and to assist the Client with its own obligations (security, data breaches, handling of data-subject requests).",
    },
    {
      title: "8 quater. No Legal Advice",
      content:
        "Legal notices, terms and conditions, privacy policies and any other text of a legal or regulatory nature drafted, adapted or integrated into the project by the Service Provider are working documents, intended to be reviewed by a lawyer before any publication. Their validation is a matter for the Client alone.\n\nThe same applies to the technical arrangements relating to compliance — consent banner, cookie management, collection forms, retention periods: their implementation by the Service Provider constitutes neither an audit nor a certificate of compliance.\n\nThe Service Provider does not carry out legal consultancy and issues no legal opinion. No liability may be attached to the Service Provider in respect of the legal or regulatory compliance of the Client's project, nor in respect of the consequences of any publication carried out without prior review by a legal professional.",
    },
    {
      title: "9. Disputes and Jurisdiction",
      content:
        "These terms are governed by French law. In the event of a dispute, the parties first seek an amicable solution, following a prior written complaint addressed to the Service Provider.\n\nFailing an amicable resolution within thirty (30) days, any dispute falls within the exclusive jurisdiction of the court in the district of the umbrella company's registered office, including where there are multiple defendants or third-party claims.",
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
            {isFr ? 'Dernière mise à jour : 3 septembre 2026 (v6)' : 'Last updated: September 3, 2026 (v6)'}
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
