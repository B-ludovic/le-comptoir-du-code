import { Check } from 'lucide-react'
import styles from './Solutions.module.css'

type Card = {
  title: string
  subtitle?: string
  price: string
  desc: string
  features: string[]
  delay: string
  cta: string
}

type Props = {
  dict: {
    eyebrow: string
    section_title: string
    intro: string
    card1_title: string
    card1_subtitle?: string
    card1_price: string
    card1_desc: string
    card1_features: string[]
    card1_delay: string
    card2_title: string
    card2_subtitle?: string
    card2_price: string
    card2_desc: string
    card2_features: string[]
    card2_delay: string
    card3_title: string
    card3_subtitle?: string
    card3_price: string
    card3_desc: string
    card3_features: string[]
    card3_delay: string
    cta: string
  }
}

export default function Solutions({ dict }: Props) {
  const cards: (Card & { number: string; budgetParam: string })[] = [
    {
      number: '01',
      title: dict.card1_title,
      subtitle: dict.card1_subtitle,
      price: dict.card1_price,
      desc: dict.card1_desc,
      features: dict.card1_features,
      delay: dict.card1_delay,
      cta: dict.cta,
      budgetParam: '1',
    },
    {
      number: '02',
      title: dict.card2_title,
      subtitle: dict.card2_subtitle,
      price: dict.card2_price,
      desc: dict.card2_desc,
      features: dict.card2_features,
      delay: dict.card2_delay,
      cta: dict.cta,
      budgetParam: '2',
    },
    {
      number: '03',
      title: dict.card3_title,
      subtitle: dict.card3_subtitle,
      price: dict.card3_price,
      desc: dict.card3_desc,
      features: dict.card3_features,
      delay: dict.card3_delay,
      cta: dict.cta,
      budgetParam: '3',
    },
  ]

  return (
    <section id="solutions" className={styles.section}>
      <div className="container">

        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <p className={styles.eyebrow}>{dict.eyebrow}</p>
            <h2 className={styles.sectionTitle}>{dict.section_title}</h2>
          </div>
          <div className={styles.headerRight}>
            <p className={styles.intro}>{dict.intro}</p>
          </div>
        </div>

        <div className={styles.grid}>
          {cards.map((card, index) => (
            <div key={card.number} className={styles.card}>

              <span className={styles.number}>{card.number}</span>

              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  {card.subtitle && (
                    <span className={styles.cardSubtitle}>{card.subtitle}</span>
                  )}
                  <p className={styles.cardPrice}>{card.price}</p>
                </div>

                <p className={styles.cardDesc}>{card.desc}</p>

                <ul className={styles.features}>
                  {card.features.map((feature) => (
                    <li key={feature} className={styles.feature}>
                      <Check size={14} strokeWidth={2} className={styles.checkIcon} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className={styles.cardFooter}>
                  <span className={styles.delay}>{card.delay}</span>
                  <a href={`?budget=${card.budgetParam}#contact`} className={styles.btn}>{card.cta}</a>
                </div>
              </div>

              {index < cards.length - 1 && <div className={styles.separator} />}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
