import Link from 'next/link'
import styles from './Method.module.css'
import InterfaceBlueprint, { type BlueprintCopy } from './InterfaceBlueprint'
import {
  SCOPING_TIERS,
  SCOPING_SET_OFF,
  PRODUCT_DESIGN_DAY_RATE,
  NON_PROFIT_DISCOUNT,
  TIERS,
  formatPrice,
  formatMonthly,
  type Locale,
  type TierId,
} from '@/lib/pricing'

type ScopingCopy = {
  for: string
  content: string
  workshop: string
  delivery: string
}

type Props = {
  locale: string
  dict: {
    eyebrow: string
    section_title: string
    intro1: string
    intro2: string
    steps: { title: string; text: string }[]
    e1_tag: string
    e1_title: string
    e1_p1: string
    e1_p2: string
    why_title: string
    why_text: string
    demo_title: string
    demo_where_wide: string
    demo_where_narrow: string
    demo_lead: string
    demo_hover: string
    demo_touch: string
    demo_questions: string
    demo_p2: string
    blueprint: BlueprintCopy
    sheet_title: string
    sheet_intro: string
    scoping: ScopingCopy[]
    optional_note: string
    setoff_note: string
    design_note: string
    e2_tag: string
    e2_title: string
    e2_p1: string
    e2_p2: string
    e3_tag: string
    e3_title: string
    e3_p1: string
    e3_p2: string
    socles: Record<TierId, string>
    from: string
    cta: string
    cta_secondary: string
    terms_link: string
    vat_notice: string
    nonprofit: string
    nonprofit_link: string
  }
}

/* Méthodologie.

   Fusion des anciennes sections Méthode, Cadrage et Solutions. Les trois
   cadrages ne sont plus une offre posée à côté des autres : ils deviennent
   l'étape 01 d'un parcours en trois temps. Le prix du développement
   n'apparaît plus qu'à l'étape 02, celle qui le produit.

   Les anciennes ancres restent valables (#method, #cadrage, #solutions) :
   des liens partagés, la FAQ ou les pages de chantier y pointent encore.

   Les montants viennent tous de lib/pricing.ts ; le dictionnaire ne porte que
   ce qui se traduit. */
export default function Method({ locale, dict }: Props) {
  const lang: Locale = locale === 'en' ? 'en' : 'fr'
  const ht = lang === 'en' ? 'excl. VAT' : 'HT'

  return (
    <section id="method" className={styles.section}>
      <div className="container">

        <header className={styles.head} data-reveal="">
          <p className={styles.eyebrow}>{dict.eyebrow}</p>
          <h2 className={styles.title}>{dict.section_title}</h2>
          <p className={styles.lead}>{dict.intro1}</p>
          <p className={styles.lead}>{dict.intro2}</p>
        </header>

        <ol className={styles.steps} data-reveal="">
          {dict.steps.map((step, index) => (
            <li key={step.title} className={styles.step}>
              <span className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepText}>{step.text}</p>
            </li>
          ))}
        </ol>

        {/* Étape 01 — le cadrage */}
        <div className={styles.stage} data-reveal="">
          <div className={styles.stageTop}>
            <div className={styles.stageText}>
              <span className={styles.tag}>{dict.e1_tag}</span>
              <h3 className={styles.h3}>{dict.e1_title}</h3>
              <p>{dict.e1_p1}</p>
              <p>{dict.e1_p2}</p>
            </div>
            <aside className={styles.why}>
              <h4 className={styles.whyTitle}>{dict.why_title}</h4>
              <p>{dict.why_text}</p>
            </aside>
          </div>

          <div className={styles.demo}>
            <div className={styles.demoText}>
              <h3 className={styles.h3}>{dict.demo_title}</h3>
              <p>
                <span className={styles.wide}>{dict.demo_where_wide}</span>
                <span className={styles.narrow}>{dict.demo_where_narrow}</span>
                {dict.demo_lead}{' '}
                <span className={styles.hoverOnly}>{dict.demo_hover}</span>
                <span className={styles.touchOnly}>{dict.demo_touch}</span>{' '}
                {dict.demo_questions}
              </p>
              <p>{dict.demo_p2}</p>
            </div>
            <div className={styles.demoCard}>
              <InterfaceBlueprint copy={dict.blueprint} />
            </div>
          </div>
        </div>

        {/* Les trois paliers : une fiche technique, pas une grille d'abonnements.
            Le prix est la dernière information de la ligne, pas la première. */}
        <div id="cadrage" className={styles.sheet} data-reveal="">
          <div className={styles.sheetHead}>
            <h3 className={styles.h3}>{dict.sheet_title}</h3>
            <p>{dict.sheet_intro}</p>
          </div>

          {SCOPING_TIERS.map((tier, index) => {
            const copy = dict.scoping[index]
            return (
              <div key={tier.id} className={styles.tier}>
                <span className={styles.tierNumber}>{String(index + 1).padStart(2, '0')}</span>
                <div className={styles.tierName}>
                  <h4>{tier.name[lang]}</h4>
                  <p>{copy.for}</p>
                </div>
                <p className={styles.tierContent}>{copy.content}</p>
                <p className={styles.tierMeta}>
                  {copy.workshop}
                  <br />
                  {copy.delivery}
                </p>
                <p className={styles.tierPrice}>
                  {formatPrice(tier.price, lang)}
                  <small>{ht}</small>
                </p>
              </div>
            )
          })}

          <div className={styles.notes}>
            <p className={styles.optional}>{dict.optional_note}</p>
            <p>{dict.setoff_note.replace('{rate}', `${Math.round(SCOPING_SET_OFF * 100)}\u00a0%`)}</p>
            <p>{dict.design_note.replace('{price}', formatPrice(PRODUCT_DESIGN_DAY_RATE, lang))}</p>
          </div>
        </div>

        {/* Étapes 02 et 03 */}
        <div id="solutions" className={styles.next} data-reveal="">
          <div className={styles.card}>
            <span className={styles.tag}>{dict.e2_tag}</span>
            <h3 className={styles.h3}>{dict.e2_title}</h3>
            <p>{dict.e2_p1}</p>
            <p>{dict.e2_p2}</p>
            <ul className={styles.prices}>
              {TIERS.map((tier) => (
                <li key={tier.id}>
                  <a href={`?budget=${tier.id}#contact`} className={styles.priceRow}>
                    <span>{dict.socles[tier.id]}</span>
                    <span>
                      {dict.from} {formatPrice(tier.price, lang)} {ht}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.card}>
            <span className={styles.tag}>{dict.e3_tag}</span>
            <h3 className={styles.h3}>{dict.e3_title}</h3>
            <p>{dict.e3_p1}</p>
            <p>{dict.e3_p2}</p>
            <ul className={styles.prices}>
              {TIERS.map((tier) => (
                <li key={tier.id} className={styles.priceRow}>
                  <span>{dict.socles[tier.id]}</span>
                  <span>{formatMonthly(tier.maintenance.price, lang)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.actions} data-reveal="">
          <a href="?budget=cadrage#contact" className={styles.btn}>{dict.cta}</a>
          <a href="#contact" className={styles.btnGhost}>{dict.cta_secondary}</a>
          <Link href={`/${locale}/conditions-cadrage`} className={styles.textLink}>
            {dict.terms_link}
          </Link>
          <p className={styles.fine}>
            {dict.vat_notice}{' '}
            {dict.nonprofit.replace('{rate}', `${Math.round(NON_PROFIT_DISCOUNT * 100)}\u00a0%`)}{' '}
            <Link href={`/${locale}/echoppe-solidaire`} className={styles.textLink}>
              {dict.nonprofit_link}
            </Link>
          </p>
        </div>

      </div>
    </section>
  )
}
