import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Check, FilePen, Handshake, KeyRound, HeartHandshake, BadgeCheck, LockKeyhole } from 'lucide-react'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import Contact from '@/components/Sections/Contact/Contact'
import ScrollToHash from '@/components/ScrollToHash/ScrollToHash'
import styles from './EchoppeSolidaire.module.css'
import fr from '@/app/dictionaries/fr.json'
import en from '@/app/dictionaries/en.json'

const BASE_URL = 'https://lechoppeducode.com'
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
      ? "L'Échoppe Solidaire — Développement Web pour Associations | L'Echoppe du Code"
      : "L'Échoppe Solidaire — Web Development for Non-Profits | L'Echoppe du Code",
    description: isFr
      ? "Création de sites internet et d'outils numériques sur-mesure pour les associations, en priorité LGBTQI+. Mécénat de compétences 50 %, même exigence technique, zéro concession sur la qualité."
      : "Custom websites and digital tools for non-profit organisations, with a priority focus on LGBTQI+ causes. 50% skills sponsorship, same technical standards, no compromise on quality.",
    alternates: {
      canonical: `${BASE_URL}/${locale}/echoppe-solidaire`,
      languages: {
        fr: `${BASE_URL}/fr/echoppe-solidaire`,
        en: `${BASE_URL}/en/echoppe-solidaire`,
        'x-default': `${BASE_URL}/fr/echoppe-solidaire`,
      },
    },
  }
}

export default async function EchoppeSolidairePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dict = dictionaries[locale as 'fr' | 'en'] ?? dictionaries.fr
  const isFr = locale !== 'en'

  const cards = [
    {
      number: '01',
      budgetParam: '1',
      title: isFr ? 'La Présence' : 'The Presence',
      subtitle: isFr ? 'Vitrine ou association locale' : 'Informational site for local non-profits',
      originalPrice: '1 450 €',
      price: isFr ? 'À partir de 725 €' : 'From €725',
      badge: isFr ? 'Mécénat de compétences 50 %' : '50% pro bono discount',
      desc: isFr
        ? 'Un site professionnel, rapide et référencé. Votre présence en ligne, enfin à la hauteur de votre engagement.'
        : 'A professional, fast and SEO-ready website. Your online presence, finally matching your commitment.',
      features: isFr
        ? ['Design sur-mesure responsive', 'SEO local inclus', 'Formulaire de contact sécurisé', 'Mise en ligne incluse']
        : ['Responsive custom design', 'Local SEO included', 'Secure contact form', 'Deployment included'],
      maintenance: isFr ? 'Maintenance à partir de 40 €\u00A0HT/mois' : 'Maintenance from €40 excl. VAT/month',
      delay: isFr ? '3 à 4 jours' : '3 to 4 days',
    },
    {
      number: '02',
      budgetParam: '2',
      title: isFr ? "L'E-commerce & Dons" : 'E-commerce & Donations',
      subtitle: isFr ? 'Dons, adhésions & espaces membres' : 'Donations, memberships & member areas',
      originalPrice: '2 850 €',
      price: isFr ? 'À partir de 1 425 €' : 'From €1,425',
      badge: isFr ? 'Mécénat de compétences 50 %' : '50% pro bono discount',
      desc: isFr
        ? 'Gestion des dons Stripe, des adhésions récurrentes et des espaces membres sécurisés. Tout ce dont une association active a besoin.'
        : 'Stripe donation management, recurring memberships and secure member areas. Everything an active non-profit needs.',
      features: isFr
        ? ['Paiements Stripe sécurisés', 'Adhésions récurrentes', 'Espace membres privé', 'Reçus fiscaux PDF']
        : ['Secure Stripe payments', 'Recurring memberships', 'Private member portal', 'Automated PDF tax receipts'],
      maintenance: isFr ? 'Maintenance à partir de 50 €\u00A0HT/mois' : 'Maintenance from €50 excl. VAT/month',
      delay: isFr ? '7 à 12 jours' : '7 to 12 days',
    },
    {
      number: '03',
      budgetParam: '3',
      title: isFr ? 'Les Outils Sur-Mesure' : 'Custom Tools',
      subtitle: isFr ? 'Fédérations & grosses infrastructures' : 'Federations & large infrastructures',
      originalPrice: '4 800 €',
      price: isFr ? 'Sur étude budgétaire' : 'Custom quote',
      badge: isFr ? 'Remise calculée selon vos subventions' : 'Discount based on your grants',
      desc: isFr
        ? 'Votre projet est unique. La remise est calculée sur-mesure en fonction de vos subventions, votre budget réel, et l\'ampleur de votre infrastructure.'
        : 'Your project is unique. The discount is tailored to your grants, your actual budget, and the scale of your infrastructure.',
      features: isFr
        ? ['Architecture sur-mesure', 'Gestion des rôles & sécurité', 'Base de données dédiée', 'RGPD renforcé (données sensibles)']
        : ['Custom architecture', 'Role management & security', 'Dedicated database', 'Enhanced GDPR (sensitive data)'],
      maintenance: isFr ? 'Maintenance sur étude' : 'Maintenance on review',
      delay: isFr ? 'À définir' : 'To be defined',
    },
  ]

  const approach = [
    {
      number: '01',
      icon: FilePen,
      title: isFr ? 'Transparence totale' : 'Total transparency',
      text: isFr
        ? "Le mécénat n'est pas du bricolage. Sur présentation de vos justificatifs, je vous fournis un devis officiel détaillant exactement la valeur de l'architecture et l'effort de mécénat appliqué. Un contrat en bonne et due forme est signé. Pas de zones d'ombre : vous connaissez la valeur réelle de votre outil, et nous avançons en toute sécurité."
        : "Pro bono work is not guesswork. On presentation of your supporting documents, I provide an official quote detailing the exact value of the architecture and the sponsorship applied. A proper contract is signed. No grey areas: you know the real value of your tool, and we move forward with full confidence.",
    },
    {
      number: '02',
      icon: Handshake,
      title: isFr ? "L'alliance stratégique" : 'The strategic alliance',
      text: isFr
        ? "Je ne suis pas juste un exécutant derrière un clavier. Je m'assois à votre table comme un partenaire technique. On challenge vos besoins réels, on élimine le superflu, et on conçoit ensemble la mécanique qui soulagera concrètement vos équipes sur le terrain. Mon rôle est de traduire vos enjeux militants en une infrastructure technique implacable."
        : "I am not just an order-taker behind a keyboard. I sit at your table as a technical partner. We challenge your real needs, eliminate the superfluous, and design together the mechanism that will concretely support your teams in the field. My role is to translate your missions into a bulletproof technical infrastructure.",
    },
    {
      number: '03',
      icon: KeyRound,
      title: isFr ? "L'indépendance totale" : 'Total independence',
      text: isFr
        ? "Le code vous appartient. Point. À la livraison, je vous remets les clés de la maison : l'infrastructure est à votre nom, le code source est le vôtre, conçu pour durer sans moi. Je vous forme à son utilisation. Vous êtes 100 % libres — et si vous avez besoin de moi plus tard, je suis là."
        : "The code is yours. Full stop. At delivery, I hand over the keys: the infrastructure is in your name, the source code is yours, built to last without me. I train you on how to use it. You are 100% free — and if you need me later, I am here.",
    },
  ]

  const tools = [
    {
      number: '01',
      icon: HeartHandshake,
      title: isFr ? 'Sécurisation des dons' : 'Donation security',
      text: isFr
        ? 'Intégration Stripe directe — sans plateforme intermédiaire. Vous ne payez que les frais Stripe standard, sans commission supplémentaire prélevée par un tiers.'
        : 'Direct Stripe integration — no intermediary platform. You only pay standard Stripe fees, with no additional commission taken by a third party.',
    },
    {
      number: '02',
      icon: BadgeCheck,
      title: isFr ? 'Gestion des membres' : 'Member management',
      text: isFr
        ? "Espaces adhérents privés, automatisation des adhésions et génération de reçus fiscaux PDF. Moins d'administration, plus de terrain."
        : 'Private member areas, membership automation and PDF tax receipt generation. Less admin, more fieldwork.',
    },
    {
      number: '03',
      icon: LockKeyhole,
      title: isFr ? 'RGPD renforcé & anonymat' : 'Enhanced GDPR & privacy',
      text: isFr
        ? 'Vos données sont sensibles (orientation, santé, convictions). Bases de données verrouillées, accès stricts par rôle, hébergement souverain. Votre infrastructure est inattaquable.'
        : 'Your data is sensitive (orientation, health, beliefs). Locked databases, strict role-based access, sovereign hosting. Your infrastructure is bulletproof.',
    },
  ]

  return (
    <>
      <Header locale={locale} nav={dict.nav} />
      <ScrollToHash />
      <main>

        {/* Hero — même layout que Method */}
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <div className={styles.headerLeft}>
                <p className={styles.eyebrow}>L&apos;Échoppe Solidaire</p>
                <h1 className={styles.sectionTitle}>
                  {isFr
                    ? 'Le code au service de celles et ceux qui font.'
                    : 'Code in the service of those who act.'}
                </h1>
              </div>
              <div className={styles.headerRight}>
                <p className={styles.intro}>
                  {isFr
                    ? "Militer, informer, rassembler — ça demande une énergie colossale. Vous ne devriez pas en perdre une seule once à vous battre contre des outils numériques inadaptés. L'Échoppe Solidaire s'adresse en priorité aux associations LGBTQI+, et plus largement à toutes les structures engagées. La même exigence technique, le même code sur-mesure, le même artisan — avec une tarification pensée pour le monde associatif."
                    : "Campaigning, informing, bringing people together — it takes enormous energy. You should not waste a single ounce of it fighting inadequate digital tools. L'Échoppe Solidaire works primarily with LGBTQI+ organisations, and more broadly with any committed non-profit. The same technical standards, the same custom code, the same craftsman — with pricing built for the non-profit world."}
                </p>
              </div>
            </div>

            <div className={styles.blocks}>
              {approach.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={item.number} className={styles.block}>
                    <span className={styles.blockNumber}>{item.number}</span>
                    <div className={styles.blockContent}>
                      <h3 className={styles.blockTitle}>
                        <Icon size={20} strokeWidth={1.5} className={styles.blockIcon} />
                        {item.title}
                      </h3>
                      <p className={styles.blockText}>{item.text}</p>
                    </div>
                    {index < approach.length - 1 && <div className={styles.blockSeparator} />}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Cards — même layout que Solutions */}
        <section className={styles.cards}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <div className={styles.headerLeft}>
                <p className={styles.eyebrow}>{isFr ? 'Tarification' : 'Pricing'}</p>
                <h2 className={styles.sectionTitle}>
                  {isFr ? 'La transparence contractuelle.' : 'Contractual transparency.'}
                </h2>
              </div>
              <div className={styles.headerRight}>
                <p className={styles.intro}>
                  {isFr
                    ? 'Les mêmes forfaits que nos clients commerciaux, avec un mécénat de compétences appliqué directement sur le prix. Aucune concession sur la qualité du code.'
                    : 'The same packages as our commercial clients, with a skills sponsorship applied directly to the price. No compromise on code quality.'}
                </p>
              </div>
            </div>

            <div className={styles.grid}>
              {cards.map((card, index) => (
                <div key={card.number} className={styles.card}>
                  <span className={styles.cardNumber}>{card.number}</span>
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <h3 className={styles.cardTitle}>{card.title}</h3>
                      {card.subtitle && (
                        <span className={styles.cardSubtitle}>{card.subtitle}</span>
                      )}
                    </div>
                    <div className={styles.priceBlock}>
                      <span className={styles.originalPrice}>{card.originalPrice} HT</span>
                      <p className={styles.cardPrice}>
                        {card.price}&nbsp;<span className={styles.cardPriceHT}>HT</span>
                      </p>
                      <span className={styles.badge}>{card.badge}</span>
                    </div>
                    <p className={styles.cardDesc}>{card.desc}</p>
                    <ul className={styles.features}>
                      {card.features.map((f) => (
                        <li key={f} className={styles.feature}>
                          <Check size={14} strokeWidth={2} className={styles.checkIcon} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className={styles.warranty}>
                      <span className={styles.warrantyIcon}>✦</span>
                      {card.maintenance}
                    </div>
                    <div className={styles.cardFooter}>
                      <span className={styles.delay}>{card.delay}</span>
                      <a href={`?budget=${card.budgetParam}#contact`} className={styles.btn}>
                        {isFr ? 'Démarrer ce projet' : 'Start this project'}
                      </a>
                    </div>
                  </div>
                  {index < cards.length - 1 && <div className={styles.separator} />}
                </div>
              ))}
            </div>

            <p className={styles.vatNotice}>
              {isFr
                ? '* Le mécénat de compétences est conditionné à la fourniture d\'un récépissé de déclaration en préfecture ou équivalent.'
                : '* Skills sponsorship is conditional on providing a declaration receipt from the prefecture or equivalent.'}
            </p>
          </div>
        </section>

        {/* Outils — même layout que Method */}
        <section className={styles.tools}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <div className={styles.headerLeft}>
                <p className={styles.eyebrow}>{isFr ? 'Ce que je construis pour vous' : 'What I build for you'}</p>
                <h2 className={styles.sectionTitle}>
                  {isFr ? 'Des outils à la hauteur de vos combats.' : 'Tools worthy of your causes.'}
                </h2>
              </div>
              <div className={styles.headerRight}>
                <p className={styles.intro}>
                  {isFr
                    ? "En tant qu'ancien manager d'équipes, je sais que les associations perdent un temps précieux à se battre contre des outils inadaptés. Mon métier est de vous fournir une architecture web robuste — pour que vous puissiez concentrer votre énergie sur le terrain."
                    : "As a former team manager, I know that non-profits waste precious time fighting inadequate tools. My job is to provide you with a robust web architecture — so you can focus your energy on the ground."}
                </p>
              </div>
            </div>

            <div className={styles.blocks}>
              {tools.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={item.number} className={styles.block}>
                    <span className={styles.blockNumber}>{item.number}</span>
                    <div className={styles.blockContent}>
                      <h3 className={styles.blockTitle}>
                        <Icon size={20} strokeWidth={1.5} className={styles.blockIcon} />
                        {item.title}
                      </h3>
                      <p className={styles.blockText}>{item.text}</p>
                    </div>
                    {index < tools.length - 1 && <div className={styles.blockSeparator} />}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <div className={styles.faq}>
          <div className="container">
            <p className={styles.faqEyebrow}>{isFr ? 'Questions fréquentes' : 'FAQ'}</p>
            <div className={styles.faqList}>
              {[
                {
                  q: isFr ? 'Comment prouver le statut de mon association ?' : 'How do I prove my non-profit status?',
                  a: isFr
                    ? "Un récépissé de déclaration en préfecture, vos statuts déposés, ou un extrait du RNA suffisent. Je les demande avant la signature du devis — pas de paperasse au dernier moment."
                    : "A registration receipt from the relevant authority, your filed articles of association, or an RNA extract are sufficient. I ask for these before signing the quote — no last-minute paperwork.",
                },
                {
                  q: isFr ? 'La remise de 50 % s\'applique aussi à la maintenance ?' : 'Does the 50% discount apply to maintenance too?',
                  a: isFr
                    ? "La maintenance post-livraison est calculée sur un tarif solidaire dédié, indiqué sur chaque forfait. Elle n'est pas automatiquement à −50 % du tarif standard, mais reste très en dessous du marché."
                    : "Post-delivery maintenance is calculated at a dedicated solidarity rate, shown on each plan. It is not automatically 50% off the standard rate, but remains well below market price.",
                },
                {
                  q: isFr ? 'Vous travaillez exclusivement avec des associations LGBTQI+ ?' : 'Do you work exclusively with LGBTQI+ organisations?',
                  a: isFr
                    ? "En priorité, oui. Mais L'Échoppe Solidaire est ouverte à toutes les structures à but non lucratif dont les valeurs s'alignent. Je prends chaque demande au cas par cas."
                    : "Primarily, yes. But L'Échoppe Solidaire is open to all non-profit structures whose values align. I assess each request individually.",
                },
                {
                  q: isFr ? 'Et si notre budget est inférieur aux forfaits affichés ?' : 'What if our budget is below the listed plans?',
                  a: isFr
                    ? "Écrivez-moi quand même. Je peux adapter le périmètre, étaler les paiements, ou orienter vers une solution plus légère. Une conversation honnête vaut mieux qu'un formulaire fermé."
                    : "Write to me anyway. I can adjust the scope, spread payments, or point you towards a lighter solution. An honest conversation is worth more than a closed form.",
                },
                {
                  q: isFr ? 'Comment se passe le paiement avec l\'acompte ?' : 'How does payment work with the deposit?',
                  a: isFr
                    ? "30 % à la signature (une facture d'acompte officielle est émise par Jump Green), 70 % à la mise en ligne. Règlement par virement uniquement. Aucun paiement avant que vous ayez validé le devis officiel."
                    : "30% on signing (an official deposit invoice is issued by Jump Green), 70% on go-live. Bank transfer only. No payment before you have validated the official quote.",
                },
                {
                  q: isFr ? 'Que se passe-t-il après la livraison ?' : 'What happens after delivery?',
                  a: isFr
                    ? "Je vous forme à l'utilisation de votre outil, je vous remets toutes les clés d'accès, et le code vous appartient intégralement. Si vous avez besoin de moi plus tard, je suis là — mais vous n'en dépendez pas."
                    : "I train you on using your tool, hand over all access credentials, and the code is entirely yours. If you need me later, I am here — but you will not depend on me.",
                },
              ].map((item, i) => (
                <details key={i} className={styles.faqItem}>
                  <summary>{item.q}</summary>
                  <div className={styles.faqAnswer}>
                    <div className={styles.faqAnswerInner}>{item.a}</div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* Brief — même composant que Contact */}
        <Suspense>
          <Contact dict={{
            eyebrow: isFr ? 'Votre projet' : 'Your project',
            section_title: isFr ? 'Parlons de votre association.' : 'Let\'s talk about your organisation.',
            intro: isFr
              ? 'Décrivez-moi votre structure, vos besoins et vos contraintes budgétaires. Je reviens vers vous sous 48h avec une proposition honnête.'
              : 'Tell me about your organisation, your needs and your budget constraints. I\'ll get back to you within 48h with an honest proposal.',
            field_name: isFr ? 'Nom & association' : 'Name & organisation',
            field_email: 'Email',
            field_description: isFr ? 'Votre projet' : 'Your project',
            field_description_placeholder: isFr
              ? 'Décrivez votre association, ce que vous souhaitez construire, et ce qui bloque aujourd\'hui…'
              : 'Describe your organisation, what you want to build, and what is blocking you today…',
            field_budget: isFr ? 'Forfait souhaité' : 'Desired package',
            field_budget_placeholder: isFr ? '— Choisir un forfait —' : '— Choose a package —',
            budget_scoping: isFr ? 'Cadrage — À partir de 145 € HT' : 'Scoping — From €145 excl. VAT',
            budget_1: isFr ? 'La Présence — À partir de 725 € HT' : 'The Presence — From €725 excl. VAT',
            budget_2: isFr ? 'L\'E-commerce & Dons — À partir de 1 425 € HT' : 'E-commerce & Donations — From €1,425 excl. VAT',
            budget_3: isFr ? 'Les Outils Sur-Mesure — Sur étude budgétaire' : 'Custom Tools — On budget review',
            btn_submit: isFr ? 'Envoyer ma demande' : 'Send my request',
          }} />
        </Suspense>

      </main>
      <Footer locale={locale} dict={dict.footer} />
    </>
  )
}
