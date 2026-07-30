import { Fragment } from 'react'
import styles from './Scoping.module.css'

type Tier = {
  number: string
  title: string
  label: string
  price: string
}

type Props = {
  locale: string
  dict: {
    eyebrow: string
    section_title: string
    intro: string
    tier1_title: string
    tier1_label: string
    tier1_price: string
    tier2_title: string
    tier2_label: string
    tier2_price: string
    tier3_title: string
    tier3_label: string
    tier3_price: string
    condition: string
    design_title: string
    design_price: string
    design_unit: string
    design_note: string
    cta: string
    terms_link: string
    vat_notice: string
  }
}

export default function Scoping({ locale, dict }: Props) {
  const tiers: Tier[] = [
    { number: '01', title: dict.tier1_title, label: dict.tier1_label, price: dict.tier1_price },
    { number: '02', title: dict.tier2_title, label: dict.tier2_label, price: dict.tier2_price },
    { number: '03', title: dict.tier3_title, label: dict.tier3_label, price: dict.tier3_price },
  ]

  return (
    <section id="cadrage" className={styles.section}>
      <div className="container">
        <div className={styles.band}>

          <div className={styles.head}>
            <div>
              <p className={styles.eyebrow}>{dict.eyebrow}</p>
              <h2 className={styles.title}>
                {dict.section_title.split('\n').map((line, index) => (
                  <Fragment key={line}>
                    {index > 0 && <br />}
                    {line}
                  </Fragment>
                ))}
              </h2>
            </div>
            <p className={styles.intro}>{dict.intro}</p>
          </div>

          <div className={styles.rule} />

          <div className={styles.tiers}>
            {tiers.map((tier) => (
              <div key={tier.number} className={styles.tier}>
                <span className={styles.tierGhost} aria-hidden="true">{tier.number}</span>
                <h3 className={styles.tierTitle}>{tier.title}</h3>
                <p className={styles.tierLabel}>{tier.label}</p>
                <p className={styles.tierPrice}>{tier.price}</p>
              </div>
            ))}
          </div>

          <div className={styles.condition}>
            <p>{dict.condition}</p>
          </div>

          <div className={styles.rule} />

          <div className={styles.foot}>
            <div className={styles.design}>
              <div className={styles.designHead}>
                <span className={styles.designTitle}>{dict.design_title}</span>
                <span className={styles.designPrice}>
                  {dict.design_price}
                  <span className={styles.designUnit}>{dict.design_unit}</span>
                </span>
              </div>
              <p className={styles.designNote}>{dict.design_note}</p>
            </div>

            <div className={styles.action}>
              <a href="?budget=cadrage#contact" className={styles.btn}>{dict.cta}</a>
              <p className={styles.notice}>
                <span className={styles.star}>✦</span>
                {dict.vat_notice}{' '}
                <a href={`/${locale}/conditions-cadrage`} className={styles.termsLink}>
                  {dict.terms_link}
                </a>
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
