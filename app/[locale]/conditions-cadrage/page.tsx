import type { Metadata } from 'next'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import styles from '@/components/Legal/Legal.module.css'
import { linkifyEmails } from '@/components/Legal/linkify'
import fr from '@/app/dictionaries/fr.json'
import en from '@/app/dictionaries/en.json'

const BASE_URL = 'https://lechoppeducode.com'
const slug = 'conditions-cadrage'
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
      ? "Conditions Générales de Prestation — Cadrage | L'Echoppe du Code"
      : "Terms of Service — Scoping | L'Echoppe du Code",
    description: isFr
      ? "Conditions générales des prestations de cadrage et de conception produit de L'Echoppe du Code — livrable, paiement, propriété du dossier, rétractation."
      : "Terms and conditions for L'Echoppe du Code scoping and product design services — deliverable, payment, ownership, withdrawal.",
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
        "Les présentes conditions régissent les prestations de cadrage et de conception produit réalisées par Ludovic BATAILLE, opérant sous la marque commerciale \"L'Échoppe du Code\", ci-après désigné \"le Prestataire\", agissant en qualité de salarié porté par la société de portage salarial JUMP GREEN (SAS).\n\nLa prestation de cadrage est une prestation d'étude et de conseil aboutissant à la remise d'un dossier écrit. Elle est distincte de toute prestation de développement, laquelle fait l'objet d'un contrat et de conditions séparés. La validation du devis de cadrage par la personne physique ou morale ayant passé commande, ci-après désignée \"le Client\", implique l'acceptation sans réserve des présentes conditions.\n\nLes présentes conditions s'appliquent exclusivement aux Clients professionnels, agissant dans le cadre de leur activité commerciale, industrielle, artisanale, libérale ou associative. Le Prestataire ne contracte pas avec des consommateurs au sens du code de la consommation.",
    },
    {
      title: "2. Formation du contrat et paiement",
      content:
        "La prestation débute à réception du devis daté, signé et portant la mention \"Bon pour accord\", accompagné du règlement dû à la commande. Aucune date d'atelier n'est réservée avant réception de ce règlement.\n\nPour les paliers 01 et 02, le règlement intégral du montant HT, majoré de la TVA applicable, est exigible à la commande. Pour le palier 03 ainsi que pour les prestations de conception produit, 50 % du montant HT sont exigibles à la commande et le solde à la remise du dossier, payable sous quinze (15) jours. Le règlement s'effectue par virement bancaire uniquement, sur le compte professionnel indiqué sur la facture.\n\nLes sommes versées d'avance constituent un acompte, et non des arrhes au sens de l'article 1590 du code civil. Elles engagent définitivement les deux parties et valent réservation du créneau d'atelier.",
    },
    {
      title: "2 bis. Imputation en cas de poursuite en développement",
      content:
        "La prestation de cadrage est autonome et due en totalité, quelle que soit la suite que le Client décide de lui donner. Le dossier lui appartient dans les conditions de l'article 7 et il demeure libre d'en confier la réalisation au prestataire de son choix.\n\nLorsque le Client signe auprès du Prestataire un devis de développement dans un délai de trois (3) mois à compter de la remise du dossier, cinquante pour cent (50 %) du montant HT effectivement réglé au titre du cadrage s'imputent sur le prix HT de cette prestation de développement, dans les conditions prévues à l'article 4 bis des conditions générales de prestation de services.\n\nCette imputation suppose le paiement intégral préalable du cadrage. Elle s'applique une seule fois par dossier, ne peut donner lieu à aucun remboursement et ne concerne ni les prestations de conception produit facturées à la journée, ni les heures d'atelier complémentaires visées à l'article 10.",
    },
    {
      title: "3. Faculté de rétractation du Client professionnel (article L221-3)",
      content:
        "Par exception, lorsque le contrat est conclu hors établissement, que le Client emploie cinq (5) salariés au plus et que l'objet du contrat n'entre pas dans le champ de son activité principale, le Client bénéficie, en application de l'article L221-3 du code de la consommation, d'un délai de quatorze (14) jours à compter de la conclusion du contrat pour se rétracter.\n\nLe Client peut demander expressément l'exécution de la prestation avant l'expiration de ce délai, en cochant et paraphant la mention prévue à cet effet sur le devis. La prestation pleinement exécutée avant la fin du délai éteint cette faculté ; en cas d'exécution partielle, le Client demeure redevable du montant correspondant à la prestation déjà fournie.\n\nEn dehors de ce cas, notamment lorsque le contrat est conclu à distance, aucune faculté de rétractation n'est ouverte au Client.",
    },
    {
      title: "4. Engagements du Client",
      content:
        "Le Client s'engage à retourner le questionnaire de pré-qualification complété et à transmettre les éléments demandés au devis au plus tard quarante-huit (48) heures avant la date de l'atelier. À défaut, l'atelier est reporté et le créneau réservé n'est ni remboursé ni reporté sans frais.\n\nLe Client garantit l'exactitude et l'exhaustivité des informations qu'il communique. Les recommandations du Prestataire en découlent directement : toute information inexacte, incomplète ou omise engage la seule responsabilité du Client.",
    },
    {
      title: "5. Déroulé de l'atelier",
      content:
        "L'atelier se tient en visioconférence, pour la durée fixée au devis. Il ne fait l'objet d'aucun enregistrement audio ou vidéo.\n\nToute demande de report ou d'annulation émanant du Client doit parvenir au Prestataire au moins quarante-huit (48) heures avant l'heure prévue. En deçà de ce délai, le créneau est considéré comme consommé et n'ouvre droit à aucun remboursement ni report. L'absence du Client à l'atelier vaut consommation du créneau.",
    },
    {
      title: "6. Livrable et corrections",
      content:
        "Le Prestataire remet un dossier au format PDF comprenant les sections listées au devis, dans le délai qui y est indiqué, courant à compter de la date de l'atelier.\n\nLe Client dispose de quinze (15) jours à compter de la remise pour transmettre, en un seul envoi, une série unique de corrections limitée à dix (10) points. Ces corrections portent exclusivement sur des erreurs factuelles ou des omissions au regard des éléments communiqués lors de l'atelier.\n\nTout changement d'orientation, tout élément nouveau non évoqué lors de l'atelier et tout nouvel arbitrage constituent une prestation complémentaire, facturée 150 € HT de l'heure et soumise à devis préalable.",
    },
    {
      title: "7. Propriété du dossier",
      content:
        "Au paiement intégral du prix, le Client devient propriétaire du dossier remis et des droits d'exploitation y afférents. Il est libre de le communiquer à tout tiers et d'en confier l'exécution au prestataire de son choix. Le Prestataire ne revendique aucune exclusivité sur la réalisation du projet décrit.\n\nTant que le solde n'est pas réglé, le dossier demeure la propriété exclusive du Prestataire et toute exploitation en est interdite.",
    },
    {
      title: "8. Absence de conseil juridique",
      content:
        "Les trames de mentions légales, de conditions générales et les cartographies de conformité figurant au dossier sont des documents de travail destinés à être soumis à un avocat ou à un juriste avant toute mise en ligne ou utilisation.\n\nLe Prestataire n'exerce pas d'activité de consultation juridique et n'émet aucun avis juridique. Sa responsabilité ne saurait être engagée au titre de la conformité légale ou réglementaire du projet du Client.",
    },
    {
      title: "9. Obligation de moyens",
      content:
        "Le Prestataire est tenu d'une obligation de moyens. Les recommandations techniques, économiques et fonctionnelles reposent sur les éléments communiqués par le Client et sur l'état de l'art à la date de la remise du dossier.\n\nElles ne constituent ni une garantie de résultat commercial, ni un engagement sur le coût final de réalisation du projet, ni une garantie de pérennité des technologies, services tiers ou tarifs mentionnés.",
    },
    {
      title: "10. Dépassement et prestations complémentaires",
      content:
        "Toute heure d'atelier au-delà de la durée incluse au devis est facturée 150 € HT.\n\nLorsque le cadrage établit que le projet n'est pas défini et requiert un travail de conception produit — définition des fonctionnalités, des règles de gestion, de la structure des contenus ou du modèle économique — cette prestation est distincte du cadrage. Elle fait l'objet d'un devis séparé, établi en jours, au tarif journalier en vigueur. Elle n'est en aucun cas incluse dans le prix du cadrage.",
    },
    {
      title: "11. Confidentialité",
      content:
        "Chacune des parties s'engage à ne pas divulguer les informations confidentielles portées à sa connaissance à l'occasion de la prestation, pendant toute sa durée et pendant deux (2) ans à compter de la remise du dossier. Cette obligation ne s'applique pas aux informations relevant du domaine public ni à celles dont la divulgation est imposée par la loi ou par une autorité compétente.",
    },
    {
      title: "12. Droit de référence",
      content:
        "Le Prestataire est autorisé à mentionner le projet à titre de référence sur ses supports de communication, dans les conditions prévues à l'article 6 bis de ses Conditions Générales de Vente et de Prestation de Services, sauf opposition écrite du Client formulée avant la remise du dossier.",
    },
    {
      title: "13. Règlement des litiges et juridiction compétente",
      content:
        "Les présentes conditions sont soumises au droit français. En cas de différend, les parties s'efforcent d'abord de trouver une solution amiable, après réclamation écrite préalable adressée au Prestataire.\n\nÀ défaut de résolution amiable dans un délai de trente (30) jours, tout litige relève de la compétence exclusive du tribunal dans le ressort du siège social de la Société de Portage.",
    },
  ],
  en: [
    {
      title: "1. Purpose and Scope",
      content:
        "These terms govern the scoping and product design services provided by Ludovic BATAILLE, operating under the trade name \"L'Échoppe du Code\", hereinafter referred to as \"the Service Provider\", acting as an employee of the umbrella company JUMP GREEN (SAS) under a \"portage salarial\" arrangement.\n\nThe scoping service is a study and advisory service resulting in the delivery of a written report. It is distinct from any development service, which is governed by a separate contract and separate terms. Validation of the scoping quote by the individual or legal entity placing the order, hereinafter referred to as \"the Client\", implies unconditional acceptance of these terms.\n\nThese terms apply exclusively to professional Clients acting in the course of their commercial, industrial, craft, professional or non-profit activity. The Service Provider does not contract with consumers within the meaning of the French Consumer Code.",
    },
    {
      title: "2. Contract Formation and Payment",
      content:
        "The service begins upon receipt of the quote — dated, signed and bearing the handwritten note \"Bon pour accord\" — together with the payment due on order. No workshop date is reserved before that payment is received.\n\nFor tiers 01 and 02, the full amount excl. VAT, plus applicable VAT, is due on order. For tier 03 and for product design services, 50% of the amount excl. VAT is due on order and the balance upon delivery of the report, payable within fifteen (15) days. Payment is made exclusively by bank transfer to the professional account indicated on the invoice.\n\nSums paid in advance constitute a deposit (acompte), not arrhes within the meaning of Article 1590 of the French Civil Code. They bind both parties definitively and secure the workshop slot.",
    },
    {
      title: "2 bis. Set-Off Where the Project Proceeds to Development",
      content:
        "The scoping engagement stands on its own and is payable in full, whatever the Client decides to do next. The report belongs to the Client under the terms of Article 7, and the Client remains free to have it carried out by the provider of their choice.\n\nWhere the Client signs a development quote with the Service Provider within three (3) months of the delivery of the report, fifty per cent (50%) of the amount actually paid, excluding VAT, in respect of the scoping engagement is set off against the price, excluding VAT, of those development services, under the terms of Article 4 bis of the general terms and conditions of service.\n\nThe set-off is subject to prior payment in full of the scoping engagement. It applies once per report, may not give rise to any refund, and covers neither product design services billed by the day nor the additional workshop hours referred to in Article 10.",
    },
    {
      title: "3. Professional Client's Right of Withdrawal (Article L221-3)",
      content:
        "By exception, where the contract is concluded off-premises, the Client employs no more than five (5) staff and the subject-matter falls outside the Client's main field of activity, the Client benefits, under Article L221-3 of the French Consumer Code, from fourteen (14) days from the conclusion of the contract to withdraw.\n\nThe Client may expressly request performance before the end of that period by ticking and initialling the corresponding statement on the quote. A service fully performed before the end of the period extinguishes that right; in the event of partial performance, the Client remains liable for the amount corresponding to the service already provided.\n\nOutside that case — in particular where the contract is concluded at a distance — the Client has no right of withdrawal.",
    },
    {
      title: "4. Client Commitments",
      content:
        "The Client undertakes to return the completed pre-qualification questionnaire and to supply the materials listed in the quote no later than forty-eight (48) hours before the workshop date. Failing that, the workshop is postponed and the reserved slot is neither refunded nor rescheduled free of charge.\n\nThe Client warrants the accuracy and completeness of the information they provide. The Service Provider's recommendations follow directly from it: any inaccurate, incomplete or omitted information is the sole responsibility of the Client.",
    },
    {
      title: "5. Workshop Format",
      content:
        "The workshop is held by video conference, for the duration set out in the quote. It is not recorded, in audio or video form.\n\nAny request to postpone or cancel from the Client must reach the Service Provider at least forty-eight (48) hours before the scheduled time. Below that threshold, the slot is deemed consumed and gives rise to no refund or rescheduling. The Client's absence from the workshop counts as consumption of the slot.",
    },
    {
      title: "6. Deliverable and Corrections",
      content:
        "The Service Provider delivers a PDF report containing the sections listed in the quote, within the timeframe stated therein, running from the date of the workshop.\n\nThe Client has fifteen (15) days from delivery to submit, in a single message, one set of corrections limited to ten (10) points. These corrections relate exclusively to factual errors or omissions with regard to the information communicated during the workshop.\n\nAny change of direction, any new element not raised during the workshop and any fresh trade-off constitute an additional service, invoiced at €150 excl. VAT per hour and subject to a prior quote.",
    },
    {
      title: "7. Ownership of the Report",
      content:
        "Upon full payment of the price, the Client becomes the owner of the delivered report and of the related exploitation rights. They are free to share it with any third party and to entrust its execution to the provider of their choice. The Service Provider claims no exclusivity over the delivery of the project described.\n\nUntil the balance is settled, the report remains the exclusive property of the Service Provider and any use of it is prohibited.",
    },
    {
      title: "8. No Legal Advice",
      content:
        "The draft legal notices, draft terms and conditions, and compliance maps included in the report are working documents intended to be reviewed by a lawyer before any publication or use.\n\nThe Service Provider does not carry out legal consultancy and issues no legal opinion. No liability may be attached to the Service Provider in respect of the legal or regulatory compliance of the Client's project.",
    },
    {
      title: "9. Best-Efforts Obligation",
      content:
        "The Service Provider is bound by a best-efforts obligation. Technical, economic and functional recommendations are based on the information communicated by the Client and on the state of the art at the date the report is delivered.\n\nThey constitute neither a guarantee of commercial outcome, nor a commitment as to the final cost of delivering the project, nor a guarantee as to the durability of the technologies, third-party services or prices mentioned.",
    },
    {
      title: "10. Overruns and Additional Services",
      content:
        "Any workshop hour beyond the duration included in the quote is invoiced at €150 excl. VAT.\n\nWhere the scoping work establishes that the project is not defined and requires product design work — defining features, business rules, content structure or the economic model — that service is distinct from scoping. It is the subject of a separate quote, expressed in days, at the daily rate in force. It is under no circumstances included in the price of the scoping service.",
    },
    {
      title: "11. Confidentiality",
      content:
        "Each party undertakes not to disclose confidential information brought to its attention in connection with the service, for the duration of the service and for two (2) years from delivery of the report. This obligation does not apply to information in the public domain, nor to information whose disclosure is required by law or by a competent authority.",
    },
    {
      title: "12. Right of Reference",
      content:
        "The Service Provider is authorised to mention the project as a reference across their communication materials, under the conditions set out in Article 6b of their General Terms and Conditions of Sale and Service, unless the Client objects in writing before the report is delivered.",
    },
    {
      title: "13. Disputes and Jurisdiction",
      content:
        "These terms are governed by French law. In the event of a dispute, the parties first seek an amicable solution, following a prior written complaint addressed to the Service Provider.\n\nFailing an amicable resolution within thirty (30) days, any dispute falls within the exclusive jurisdiction of the court in the district of the umbrella company's registered office.",
    },
  ],
}

export default async function ConditionsCadrage({
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
              ? 'Conditions Générales de Prestation — Cadrage et Conception'
              : 'General Terms of Service — Scoping and Product Design'}
          </h1>

          <p className={styles.text} style={{ opacity: 0.6, fontSize: '0.85rem', marginBottom: '2rem' }}>
            {isFr ? 'Dernière mise à jour : 30 juillet 2026 (v1)' : 'Last updated: July 30, 2026 (v1)'}
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
