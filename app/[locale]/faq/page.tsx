import type { Metadata } from 'next'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import styles from '@/components/Legal/Legal.module.css'
import fr from '@/app/dictionaries/fr.json'
import en from '@/app/dictionaries/en.json'
import { BASE_URL, faqJsonLd, breadcrumbJsonLd } from '@/lib/structured-data'

const slug = 'faq'
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
      ? "Questions Fréquentes | L'Echoppe du Code"
      : "Frequently Asked Questions | L'Echoppe du Code",
    description: isFr
      ? "Prix, propriété du code, paiement, maintenance, tarif associatif : les réponses aux questions qu'on me pose avant de signer un devis."
      : "Pricing, code ownership, payment, maintenance, non-profit rates: answers to the questions I get asked before a quote is signed.",
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

type Entry = { question: string; answer: string[] }

const entries: Record<'fr' | 'en', Entry[]> = {
  fr: [
    {
      question: 'Combien coûte un site internet sur-mesure ?',
      answer: [
        "Un site vitrine démarre à 1 450 € HT, une boutique en ligne ou un système de réservation à 2 850 € HT, une application métier à 4 800 € HT. Le cadrage préalable, quand le projet en a besoin, va de 290 € à 1 190 € HT et se facture séparément.",
        "Ces montants sont des planchers, pas des étiquettes. Un devis se construit une fois qu'on sait ce qu'on construit — c'est précisément le rôle du cadrage.",
      ],
    },
    {
      question: 'Le devis est-il payant ?',
      answer: [
        "Non. Le devis et le premier échange sont gratuits. Un devis chiffre un périmètre : les lots, ce qu'ils contiennent, le prix, les conditions.",
        "Ce qu'il ne contient pas, c'est l'étude — arborescence, modèle de données, choix des solutions, arbitrages techniques. Cette étude porte un nom, c'est le cadrage, et elle est facturée parce qu'elle est le travail lui-même.",
        "Concrètement : si vous savez ce que vous voulez construire, je chiffre et on démarre. Si le projet reste à définir, c'est le cadrage qui le définit — un plan ne se dessine pas en marge d'un devis.",
      ],
    },
    {
      question: 'Pourquoi le cadrage est-il facturé à part ?',
      answer: [
        "Parce qu'il produit quelque chose. Le cadrage est un atelier suivi d'un dossier écrit : arborescence, choix de solution, conformité RGPD, périmètre de la première version. Ce dossier vous appartient, que vous poursuiviez avec moi ou non.",
        "Un artisan ne coupe pas dans le bois avant d'avoir le plan sous les yeux. Le cadrage est ce plan, et il a sa valeur propre : rien n'oblige à faire réaliser le meuble par celui qui l'a dessiné.",
        "Si vous décidez de poursuivre avec moi, la moitié de ce que vous avez réglé pour le cadrage vient en déduction du développement, à condition de signer dans les trois mois suivant la remise du dossier. Le plan reste payé, mais il compte double.",
      ],
    },
    {
      question: "À qui appartient le code une fois le site livré ?",
      answer: [
        "À vous, dès l'encaissement du solde. Les droits patrimoniaux sur le code sur-mesure et les créations graphiques originales vous sont cédés à titre exclusif, pour le monde entier et pour toute la durée légale de protection.",
        "Restent en dehors de cette cession mes briques réutilisables et les bibliothèques tierces, notamment open source, qui gardent leurs licences respectives. Vous en recevez un droit d'usage sans limite de durée, cessible avec le site : personne ne peut vous prendre les clés de votre propre atelier.",
      ],
    },
    {
      question: 'Pourquoi ne pas simplement prendre Wix, Shopify ou un générateur IA ?',
      answer: [
        "Parce qu'on n'y loue pas le même objet. Sur une plateforme, vous louez une vitrine dans une galerie marchande : elle est prête vite, mais le loyer court tant que le site existe, et le jour où vous voulez déménager, les murs restent sur place.",
        "Un site sur-mesure vous coûte plus cher à la construction et vous appartient ensuite. Le calcul honnête se fait sur cinq ans, abonnements, commissions et migrations comprises — c'est le sujet de plusieurs articles du Carnet.",
      ],
    },
    {
      question: 'Comment se passe le paiement ?',
      answer: [
        "Un acompte de 30 % du montant HT à la signature du devis, le solde de 70 % à la mise en ligne. Règlement par virement bancaire uniquement, sous quinze jours à compter de l'émission de la facture. Tous les prix sont indiqués hors taxes ; la TVA au taux en vigueur s'ajoute.",
        "La production ne démarre qu'à réception du devis signé et de l'acompte. Cet acompte réserve le temps d'atelier qui vous est alloué : il n'est pas remboursable.",
      ],
    },
    {
      question: 'Qui émet le devis et la facture ?',
      answer: [
        "La société de portage salarial JUMP GREEN (SAS), immatriculée au RCS de Bobigny sous le numéro 977 610 781, TVA FR10 977 610 781. Je suis salarié porté : vous contractez avec une structure établie, avec toutes les garanties qui vont avec.",
        "Concrètement, rien ne change pour vous côté interlocuteur. Le devis porte l'en-tête de Jump Green, mais c'est la même personne qui vous répond, du premier atelier à la mise en ligne.",
      ],
    },
    {
      question: 'Que couvre exactement la maintenance ?',
      answer: [
        "Les mises à jour de sécurité et la correction des bugs bloquants liés au code que j'ai livré. Douze mois sont inclus sur les forfaits E-commerce et Sur-Mesure, puis 85 € HT/mois pour l'E-commerce et à partir de 165 € HT/mois pour le Sur-Mesure. Pour un site vitrine, c'est une option à 70 € HT/mois.",
        "Elle ne couvre pas les nouvelles fonctionnalités, les changements de contenu ni les refontes de design : ce sont des chantiers, pas de l'entretien. Les coûts d'hébergement, de nom de domaine et de services tiers restent à votre charge directe. Le contrat mensuel se résilie à tout moment avec un mois de préavis, sans pénalité.",
      ],
    },
    {
      question: 'Mon association peut-elle bénéficier du tarif solidaire ?',
      answer: [
        "Oui, avec un mécénat de compétences de 50 % sur les forfaits de développement : le site vitrine passe à 725 € HT, l'e-commerce ou la collecte de dons à 1 425 € HT, le cadrage à 145 € HT. L'offre s'adresse aux structures à but non lucratif reconnues, en priorité LGBTQI+.",
        "Il faut fournir avant la signature un récépissé de déclaration en préfecture, des statuts enregistrés ou un extrait du RNA. La maintenance suit un barème solidaire dédié — pas la moitié du tarif standard, mais très en dessous du marché. L'exigence technique, elle, ne bouge pas d'un millimètre.",
      ],
    },
    {
      question: "Travaillez-vous en dehors de l'Île-de-France ?",
      answer: [
        "Oui. Paris et l'Île-de-France en présentiel, le reste de la France et l'international à distance, en français comme en anglais.",
        "L'atelier a une adresse, mais l'établi voyage : un projet se mène très bien en visio dès lors que le cadrage a posé les bases écrites.",
      ],
    },
    {
      question: 'Serai-je dépendant de vous après la livraison ?',
      answer: [
        "Non, et c'est un choix d'architecture autant qu'un engagement. Votre site est construit avec des technologies standards et documentées — Next.js, React, TypeScript, NestJS, PostgreSQL — que n'importe quel développeur du marché sait reprendre. Pas de constructeur de pages, pas de thème acheté, pas de format propriétaire qui n'existerait que chez moi.",
        "Vous recevez les sources. Si vous décidez un jour de confier votre site à quelqu'un d'autre, cette personne ouvrira le code et s'y retrouvera. C'est la différence entre un meuble et un meuble scellé au mur.",
      ],
    },
  ],
  en: [
    {
      question: 'How much does a custom website cost?',
      answer: [
        'A marketing website starts at €1,450, an online shop or booking system at €2,850, a business application at €4,800 — all excluding VAT. Scoping, when the project calls for it, runs from €290 to €1,190 and is billed separately.',
        "These are floors, not price tags. A quote takes shape once we know what we are building — which is exactly what scoping is for.",
      ],
    },
    {
      question: 'Is the quote itself chargeable?',
      answer: [
        'No. The quote and the first conversation are free. A quote prices a scope: the work packages, what they contain, the price, the terms.',
        'What it does not contain is the study — site structure, data model, solution choices, technical trade-offs. That study has a name, it is the scoping engagement, and it is billed because it is the work itself.',
        'In practice: if you know what you want to build, I price it and we start. If the project is still to be defined, scoping is what defines it — a plan is not drawn in the margins of a quote.',
      ],
    },
    {
      question: 'Why is scoping billed separately?',
      answer: [
        'Because it produces something. Scoping is a workshop followed by a written report: site structure, solution choice, GDPR compliance, scope of the first version. That report is yours, whether or not you go on to work with me.',
        'A craftsman does not cut into the wood before the plan is on the bench. Scoping is that plan, and it holds its own value: nothing obliges you to have the piece built by whoever drew it.',
        'If you do decide to go on with me, half of what you paid for the scoping engagement is set off against the development price, provided you sign within three months of the report being delivered. The plan stays paid for, but it counts twice.',
      ],
    },
    {
      question: 'Who owns the code once the site is delivered?',
      answer: [
        'You do, as soon as the final payment clears. The economic rights to the custom code and the original graphic work are transferred to you exclusively, worldwide, for the full legal term of copyright protection.',
        'Outside that transfer sit my own reusable components and third-party libraries, notably open source ones, which keep their own licences. You receive an unlimited right of use over them, transferable with the site: nobody can take away the keys to your own workshop.',
      ],
    },
    {
      question: 'Why not just use Wix, Shopify or an AI website generator?',
      answer: [
        'Because you are not renting the same thing. On a platform you rent a unit in a shopping centre: it opens fast, but the rent runs for as long as the site exists, and the day you move out the walls stay behind.',
        'A custom site costs more to build and belongs to you afterwards. The honest comparison runs over five years, subscriptions, commissions and migrations included — the subject of several articles in the Journal.',
      ],
    },
    {
      question: 'How does payment work?',
      answer: [
        'A 30 % deposit on the pre-VAT amount when the quote is signed, the remaining 70 % on go-live. Payment by bank transfer only, within fifteen days of the invoice date. All prices exclude VAT, which is added at the applicable rate.',
        'Production starts only once the signed quote and the deposit are both in. That deposit reserves the workshop time set aside for you, and is non-refundable.',
      ],
    },
    {
      question: 'Who issues the quote and the invoice?',
      answer: [
        'JUMP GREEN (SAS), an umbrella employment company registered with the Bobigny Trade & Companies Register under no. 977 610 781, VAT FR10 977 610 781. I work under a portage salarial contract, so you contract with an established company and every guarantee that comes with it.',
        'In practice nothing changes on your side. The quote carries the Jump Green letterhead, but the same person answers you, from the first workshop to go-live.',
      ],
    },
    {
      question: 'What exactly does maintenance cover?',
      answer: [
        'Security updates and fixes for blocking bugs in the code I delivered. Twelve months are included with the E-commerce and Custom Tools packages, then €85/month for E-commerce and from €165/month for Custom Tools. For a marketing website it is an option at €70/month.',
        'It does not cover new features, content changes or design overhauls: those are building work, not upkeep. Hosting, domain names and third-party services stay on your own account. The monthly contract can be cancelled at any time with one month of notice, with no penalty.',
      ],
    },
    {
      question: 'Can my non-profit get the solidarity rate?',
      answer: [
        'Yes, with 50 % skills sponsorship on development packages: a marketing website drops to €725, an online shop or donation platform to €1,425, scoping to €145. The offer is for registered non-profits, with priority given to LGBTQI+ organisations.',
        'Proof of registration must be provided before signing. Maintenance follows a dedicated solidarity scale — not half the standard rate, but well below market. The technical standard does not move an inch.',
      ],
    },
    {
      question: 'Do you work outside the Paris region?',
      answer: [
        'Yes. Paris and Île-de-France in person, the rest of France and international remotely, in French or in English.',
        'The workshop has an address, but the bench travels: a project runs perfectly well over video once scoping has put the groundwork in writing.',
      ],
    },
    {
      question: 'Will I be dependent on you after delivery?',
      answer: [
        'No, and that is an architectural choice as much as a commitment. Your site is built with standard, documented technologies — Next.js, React, TypeScript, NestJS, PostgreSQL — that any developer on the market can pick up. No page builder, no bought theme, no proprietary format that exists only here.',
        'You receive the sources. If you one day hand your site to someone else, that person will open the code and find their way around it. That is the difference between a piece of furniture and a piece of furniture bolted to the wall.',
      ],
    },
  ],
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dict = dictionaries[locale as 'fr' | 'en'] ?? dictionaries.fr
  const isFr = locale !== 'en'
  const list = isFr ? entries.fr : entries.en

  const jsonLd = [
    faqJsonLd(list, locale),
    breadcrumbJsonLd([
      { name: isFr ? 'Accueil' : 'Home', path: `/${locale}` },
      {
        name: isFr ? 'Questions fréquentes' : 'Frequently asked questions',
        path: `/${locale}/${slug}`,
      },
    ]),
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header locale={locale} nav={dict.nav} />
      <main className={styles.main}>
        <div className="container">

          <a href={`/${locale}`} className={styles.back}>
            ← {isFr ? 'Retour' : 'Back'}
          </a>

          <h1 className={styles.title}>
            {isFr ? 'Questions Fréquentes' : 'Frequently Asked Questions'}
          </h1>

          {list.map((entry) => (
            <div key={entry.question} className={styles.block}>
              <h2 className={styles.heading}>{entry.question}</h2>
              {entry.answer.map((paragraph, index) => (
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
