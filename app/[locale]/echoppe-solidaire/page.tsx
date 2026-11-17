import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { BASE_URL } from '@/lib/structured-data'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import Build from '@/components/Sections/Build/Build'
import Contact from '@/components/Sections/Contact/Contact'
import ScrollToHash from '@/components/ScrollToHash/ScrollToHash'
import RevealController from '@/components/Reveal/RevealController'
import styles from './EchoppeSolidaire.module.css'
import {
  TIERS,
  tier,
  NON_PROFIT_DISCOUNT,
  SCOPING_NON_PROFIT_FROM,
  formatPrice,
  formatMonthly,
  type Locale,
} from '@/lib/pricing'
import fr from '@/app/dictionaries/fr.json'
import en from '@/app/dictionaries/en.json'

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
      ? "L'Échoppe Solidaire — Développement Web pour Associations | L'Échoppe du Code"
      : "L'Échoppe Solidaire — Web Development for Non-Profits | L'Échoppe du Code",
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

/* L'Échoppe Solidaire — refonte sur le modèle de l'accueil.

   Même ossature que la page d'accueil : un hero avec le surtitre dans le H1,
   les outils en trois lignes (le composant Build, partagé), puis la méthode en
   trois étapes. Les trois grandes cartes de prix ont disparu : les tarifs
   solidaires sont des lignes dans les étapes 02 et 03, le prix standard barré
   à côté, pour que le mécénat se lise d'un coup d'œil.

   Les textes vivent dans les dictionnaires (clé `solidaire`) et les montants
   dans lib/pricing.ts : une revalorisation de la grille ou du taux de mécénat
   met cette page à jour sans qu'on la relise. */
export default async function EchoppeSolidairePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dict = dictionaries[locale as 'fr' | 'en'] ?? dictionaries.fr
  const t = dict.solidaire
  const lang: Locale = locale === 'en' ? 'en' : 'fr'
  const ht = lang === 'en' ? 'excl. VAT' : 'HT'
  const rate = `${Math.round(NON_PROFIT_DISCOUNT * 100)} %`
  const withRate = (text: string) => text.replace('{rate}', rate)

  return (
    <>
      <Header locale={locale} nav={dict.nav} />
      <ScrollToHash />
      <RevealController />
      <main>

        {/* Hero */}
        <section className={styles.hero}>
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.heroText}>
              <h1 className={styles.title}>
                <span className={styles.kicker}>{t.hero.kicker}</span>
                {t.hero.h1_lead}
                <em className={styles.accent}>{t.hero.h1_accent}</em>
                {t.hero.h1_tail}
              </h1>
              <p className={styles.sub}>{withRate(t.hero.sub)}</p>
              <div className={styles.actions}>
                <a href="#contact" className={styles.btn}>{t.hero.cta}</a>
                <a href="#methode" className={styles.btnGhost}>{t.hero.cta_secondary}</a>
              </div>
              <p className={styles.reassurance}>{t.hero.reassurance}</p>
            </div>

            <aside className={styles.heroSide} aria-label={t.hero.engagements_label}>
              <ol className={styles.engagements}>
                {t.hero.engagements.map((item, index) => (
                  <li key={item.title} className={styles.engagement}>
                    <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <h2 className={styles.engagementTitle}>{item.title}</h2>
                      <p className={styles.engagementText}>{item.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </aside>
          </div>

          <div className={styles.proof}>
            <ul className={`container ${styles.proofInner}`}>
              {t.hero.proof.map((item) => (
                <li key={item}>{withRate(item)}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Outils — même composant que « Ce que je construis » sur l'accueil */}
        <Build id="outils" dict={t.tools} items={t.tools.items} />

        {/* Méthode et tarifs */}
        <section id="methode" className={styles.method}>
          <div className="container">
            <header className={styles.methodHead} data-reveal="">
              <p className={styles.eyebrow}>{t.method.eyebrow}</p>
              <h2 className={styles.h2}>{withRate(t.method.section_title)}</h2>
              <p className={styles.lead}>{t.method.intro}</p>
            </header>

            <ol className={styles.steps} data-reveal="">
              {t.method.steps.map((step, index) => (
                <li key={step.title} className={styles.step}>
                  <span className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</span>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepText}>{step.text}</p>
                </li>
              ))}
            </ol>

            {/* Étape 01 — le cadrage, au tarif associatif */}
            <div id="cadrage" className={styles.stage} data-reveal="">
              <div className={styles.stageText}>
                <span className={styles.tag}>{t.method.e1_tag}</span>
                <h3 className={styles.h3}>{t.method.e1_title}</h3>
                <p>{t.method.e1_text.replace('{price}', formatPrice(SCOPING_NON_PROFIT_FROM, lang))}</p>
                <p className={styles.note}>{t.method.optional_note}</p>
              </div>
              <aside className={styles.why}>
                <h4 className={styles.whyTitle}>{t.method.why_title}</h4>
                <p>{t.method.why_text}</p>
              </aside>
            </div>

            {/* Étapes 02 et 03 — prix standard barré, prix solidaire à côté */}
            <div className={styles.next} data-reveal="">
              <div className={styles.card}>
                <span className={styles.tag}>{t.method.e2_tag}</span>
                <h3 className={styles.h3}>{t.method.e2_title}</h3>
                <p>{t.method.e2_text}</p>
                <ul className={styles.prices}>
                  {TIERS.map((socle) => (
                    <li key={socle.id}>
                      <a href={`?budget=${socle.id}#contact`} className={styles.priceRow}>
                        <span>{t.method.socles[socle.id]}</span>
                        <span className={styles.priceValue}>
                          <s>
                            <span className="sr-only">{t.method.standard_label} </span>
                            {formatPrice(socle.price, lang)}
                          </s>
                          <b>
                            {t.method.from} {formatPrice(socle.nonProfitPrice, lang)} {ht}
                          </b>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
                <p className={styles.budgetNote}>{t.method.budget_note}</p>
              </div>

              <div className={styles.card}>
                <span className={styles.tag}>{t.method.e3_tag}</span>
                <h3 className={styles.h3}>{t.method.e3_title}</h3>
                <p>{t.method.e3_text}</p>
                <ul className={styles.prices}>
                  {TIERS.map((socle) => (
                    <li key={socle.id} className={styles.priceRow}>
                      <span>{t.method.socles[socle.id]}</span>
                      <span className={styles.priceValue}>
                        <s>
                          <span className="sr-only">{t.method.standard_label} </span>
                          {formatPrice(socle.maintenance.price, lang)}
                        </s>
                        <b>{formatMonthly(socle.maintenance.nonProfitPrice, lang)}</b>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.methodActions} data-reveal="">
              <a href="#contact" className={styles.btn}>{t.method.cta}</a>
              <Link href={`/${locale}/conditions-generales`} className={styles.textLink}>
                {t.method.terms_link}
              </Link>
              <p className={styles.fine}>{t.method.vat_notice}</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className={styles.faq}>
          <div className="container">
            <div className={styles.faqInner} data-reveal="">
              <p className={styles.eyebrow}>{t.faq.eyebrow}</p>
              <div className={styles.faqList}>
                {t.faq.items.map((item) => (
                  <details key={item.q} className={styles.faqItem}>
                    <summary>{item.q}</summary>
                    <div className={styles.faqAnswer}>
                      <div className={styles.faqAnswerInner}>{item.a}</div>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Brief — même composant que le contact de l'accueil */}
        <Suspense>
          <Contact
            locale={locale}
            dict={{
              ...t.contact,
              budget_scoping: t.contact.budget_scoping.replace(
                '{price}',
                formatPrice(SCOPING_NON_PROFIT_FROM, lang),
              ),
              budget_1: t.contact.budget_tier
                .replace('{name}', tier('presence').name)
                .replace('{price}', formatPrice(tier('presence').nonProfitPrice, lang)),
              budget_2: t.contact.budget_tier
                .replace('{name}', tier('boutique').name)
                .replace('{price}', formatPrice(tier('boutique').nonProfitPrice, lang)),
              budget_3: t.contact.budget_tier
                .replace('{name}', tier('outils').name)
                .replace('{price}', formatPrice(tier('outils').nonProfitPrice, lang)),
            }}
          />
        </Suspense>

      </main>
      <Footer locale={locale} dict={dict.footer} />
    </>
  )
}
