import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import styles from './APropos.module.css'
import fr from '@/app/dictionaries/fr.json'
import en from '@/app/dictionaries/en.json'
import {
  BASE_URL,
  PROFILE_SLUG,
  profilePageJsonLd,
  breadcrumbJsonLd,
} from '@/lib/structured-data'
import { TIERS, formatPrice } from '@/lib/pricing'
import { getProjects } from '@/lib/projects'

const dictionaries = { fr, en }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale !== 'en'
  const title = isFr
    ? "Ludovic Bataille, développeur web indépendant | L'Échoppe du Code"
    : "Ludovic Bataille, independent web developer | L'Échoppe du Code"
  const description = isFr
    ? "Qui code L'Échoppe du Code : dix-huit ans d'encadrement de terrain, une reconversion, et des applications web livrées seul de bout en bout."
    : "Who builds L'Échoppe du Code: eighteen years managing frontline teams, a career change, and web applications shipped end to end single-handed."

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/${PROFILE_SLUG}`,
      languages: {
        fr: `${BASE_URL}/fr/${PROFILE_SLUG}`,
        en: `${BASE_URL}/en/${PROFILE_SLUG}`,
        'x-default': `${BASE_URL}/fr/${PROFILE_SLUG}`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'profile',
      url: `${BASE_URL}/${locale}/${PROFILE_SLUG}`,
      images: [{ url: `${BASE_URL}/ludovic.jpeg`, alt: 'Ludovic Bataille' }],
    },
  }
}

/* Le contenu reprend ce que le site publie déjà — la section « Le Codeur » de
   la page d'accueil et l'article sur le titre professionnel. La page ne révèle
   rien de neuf : elle rassemble, sous une adresse à laquelle un moteur peut
   rattacher une personne. */
const copy = {
  fr: {
    eyebrow: 'L’artisan derrière l’écran',
    h1: 'Ludovic Bataille, développeur web indépendant',
    lead:
      'Je conçois et je livre des applications web sur-mesure depuis l’Île-de-France. Seul interlocuteur, du cadrage à la mise en ligne.',
    sections: [
      {
        title: 'Deux métiers, une même exigence',
        paragraphs: [
          'Pendant dix-huit ans, j’ai encadré des équipes de douze à quinze personnes dans le retail aéroportuaire. Des plannings, des inventaires, des imprévus de terminal, et une équipe à faire tourner quoi qu’il arrive. Puis j’ai tombé la cravate pour revenir à ma véritable obsession : la mécanique pure du web.',
          'De cette première vie, j’ai gardé une grille de lecture implacable. Un chef d’entreprise n’a pas le temps pour le jargon : il a besoin d’outils qui tournent. Mon œil a été formé à repérer les frictions — ce qui ralentit vos clients, ce qui alourdit une interface, ce qui sonne faux.',
        ],
      },
      {
        title: 'Ce que je construis',
        paragraphs: [
          'Des sites vitrines, des boutiques en ligne et des applications métier, en Next.js, React, TypeScript et NestJS, sur PostgreSQL et Stripe. Pas de template revendu : chaque projet est écrit pour le besoin qu’il sert, et le code source appartient au client dès le paiement intégral.',
          'Mon dernier projet livré, Fairy Chair Studio, est une boutique en ligne complète pour un salon de coiffure afro : stock en temps réel, paiements Stripe avec remboursements partiels et totaux, export des expéditions Colissimo, facturation PDF, espace d’administration. Portée seule, de l’analyse du besoin à la mise en production.',
          'Deux autres chantiers tournent aujourd’hui en production : Miabelangue, plateforme d’apprentissage du mina et de l’éwé pour la diaspora togolaise, qui encaisse en euros par carte et en francs CFA par mobile money ; et Aux P’tits Pois, l’outil complet d’une AMAP — paniers hebdomadaires, adhérents, trésorerie au chèque, contrats PDF — tenu au quotidien par un bureau bénévole.',
        ],
      },
      {
        title: 'Le titre et l’établi',
        paragraphs: [
          'Je prépare le titre de Concepteur Développeur d’Applications ; les deux premiers blocs sont validés. Je ne le passe pas pour apprendre mon métier — le travail livré en dit plus — mais parce qu’un logiciel de tri de CV cherche une ligne, et sort le dossier sans elle.',
          'Le code s’apprend vite quand on sait déjà travailler. L’inverse est beaucoup moins vrai.',
        ],
      },
    ],
    workLabel: 'Où me trouver',
    priceIntro: 'Ce que je facture',
    worksLabel: 'Chantiers en ligne',
  },
  en: {
    eyebrow: 'The craftsman behind the screen',
    h1: 'Ludovic Bataille, independent web developer',
    lead:
      'I design and ship custom web applications from the Paris region of France. One point of contact, from scoping to launch.',
    sections: [
      {
        title: 'Two trades, one standard',
        paragraphs: [
          'For eighteen years I managed teams of twelve to fifteen people in airport retail. Rotas, stock counts, terminal disruptions, and a team to keep running whatever happened. Then I put the tie away and went back to my real obsession: the mechanics of the web.',
          'From that first career I kept an unforgiving way of reading a problem. A business owner has no time for jargon: they need tools that work. My eye was trained to spot friction — what slows your customers down, what clutters an interface, what rings false.',
        ],
      },
      {
        title: 'What I build',
        paragraphs: [
          'Marketing websites, online shops and business applications, built with Next.js, React, TypeScript and NestJS, on PostgreSQL and Stripe. No resold template: every project is written for the need it serves, and the source code belongs to the client on final payment.',
          'My most recent delivery, Fairy Chair Studio, is a complete online shop for an Afro hair salon: real-time stock, Stripe payments with partial and full refunds, Colissimo shipping exports, PDF invoicing and a full admin area. Carried end to end, alone, from requirements to production.',
          'Two further builds are running in production today: Miabelangue, a Mina and Ewe learning platform for the Togolese diaspora, taking card payments in euros and mobile money in CFA francs; and Aux P’tits Pois, the full toolkit of a community-supported agriculture scheme — weekly baskets, members, cheque-based accounting, PDF contracts — run day to day by a volunteer committee.',
        ],
      },
      {
        title: 'The stamp and the workbench',
        paragraphs: [
          'I am sitting for the French state-recognised developer title; the first two blocks are validated. I am not taking it to learn the craft — the delivered work says more — but because a CV-screening tool looks for one line, and drops the file without it.',
          'Code is learned quickly when you already know how to work. The reverse is far less true.',
        ],
      },
    ],
    workLabel: 'Where to find me',
    priceIntro: 'What I charge',
    worksLabel: 'Live projects',
  },
} as const

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/B-ludovic' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ludovic-bataille-2a8aa0371/' },
  { label: 'Portfolio', href: 'https://b-ludovic.dev' },
]

export default async function AProposPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dict = dictionaries[locale as 'fr' | 'en'] ?? dictionaries.fr
  const isFr = locale !== 'en'
  const t = isFr ? copy.fr : copy.en
  const lang = isFr ? 'fr' : 'en'

  /* Seuls les chantiers phares, et seulement s'ils répondent encore : une page
     de référence qui pointe vers un domaine mort dessert la personne qu'elle
     présente. */
  const liveProjects = getProjects(
    dict.portfolio as unknown as Record<string, string>,
  ).filter((project) => project.flagship && project.url)

  const jsonLd = [
    profilePageJsonLd(locale),
    breadcrumbJsonLd([
      { name: isFr ? 'Accueil' : 'Home', path: `/${locale}` },
      { name: t.h1, path: `/${locale}/${PROFILE_SLUG}` },
    ]),
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header locale={locale} nav={dict.nav} switchLocaleHref={`/${isFr ? 'en' : 'fr'}/${PROFILE_SLUG}`} />

      <main className={styles.main}>
        <div className="container">
          <article className={styles.article}>

            <header className={styles.header}>
              <div className={styles.portraitWrapper}>
                <Image
                  src="/ludovic.jpeg"
                  alt="Ludovic Bataille"
                  width={160}
                  height={160}
                  className={styles.portrait}
                  priority
                />
              </div>
              <div>
                <p className={styles.eyebrow}>{t.eyebrow}</p>
                <h1 className={styles.title}>{t.h1}</h1>
                <p className={styles.lead}>{t.lead}</p>
              </div>
            </header>

            {t.sections.map((section) => (
              <section key={section.title} className={styles.section}>
                <h2 className={styles.sectionTitle}>{section.title}</h2>
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)} className={styles.text}>{p}</p>
                ))}
              </section>
            ))}

            {/* Les tarifs viennent de la grille : une page « à propos » qui cite
                des prix périmés vaut moins que pas de prix du tout. */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{t.priceIntro}</h2>
              <ul className={styles.tiers}>
                {TIERS.map((tier) => (
                  <li key={tier.id} className={styles.tier}>
                    <span className={styles.tierName}>{tier.name}</span>
                    <span className={styles.tierPrice}>
                      {isFr ? 'à partir de' : 'from'} {formatPrice(tier.price, lang)}
                      {isFr ? ' HT' : ''}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Les chantiers en production, nommés et liés depuis la page de
                la personne. Sans ce bloc, l'entité « Ludovic Bataille » ne
                pointait vers aucune réalisation : un moteur lisait un parcours
                sans jamais pouvoir l'attacher à un site qui tourne. */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{t.worksLabel}</h2>
              <ul className={styles.links}>
                {liveProjects.map((project) => (
                  <li key={project.slug}>
                    <a
                      href={project.url!}
                      className={styles.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.title}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{t.workLabel}</h2>
              <ul className={styles.links}>
                {LINKS.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className={styles.link} rel="me noopener" target="_blank">
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="mailto:contact@lechoppeducode.com" className={styles.link}>
                    contact@lechoppeducode.com
                  </a>
                </li>
              </ul>
            </section>

          </article>
        </div>
      </main>
      <Footer locale={locale} dict={dict.footer} />
    </>
  )
}
