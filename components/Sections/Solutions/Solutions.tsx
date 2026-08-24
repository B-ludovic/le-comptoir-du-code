import { Check } from 'lucide-react'
import styles from './Solutions.module.css'
import {
  TIERS,
  formatPrice,
  formatMonthly,
  type Locale,
  type TierId,
} from '@/lib/pricing'

type CardCopy = {
  subtitle: string
  desc: string
  features: string[]
  modules: string
  delay: string
}

type Props = {
  locale: string
  dict: {
    eyebrow: string
    section_title: string
    intro: string
    from: string
    maintenance_included: string
    modules_label: string
    cards: Record<TierId, CardCopy>
    cta: string
    vat_notice: string
  }
}

/* Les montants ne vivent plus dans le dictionnaire : ils viennent de
   lib/pricing.ts, comme ceux du graphe schema.org, du llms.txt et du devis.
   Le dictionnaire ne porte plus que ce qui se traduit. */
export default function Solutions({ locale, dict }: Props) {
  const lang: Locale = locale === 'en' ? 'en' : 'fr'

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
          {TIERS.map((tier, index) => {
            const copy = dict.cards[tier.id]
            const maintenance = dict.maintenance_included
              .replace('{months}', String(tier.maintenance.includedMonths))
              .replace('{rate}', formatMonthly(tier.maintenance.price, lang))

            return (
              <div key={tier.id} className={styles.card}>

                <span className={styles.number} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>{tier.name}</h3>
                    <span className={styles.cardSubtitle}>{copy.subtitle}</span>
                  </div>
                  <p className={styles.cardPrice}>
                    {dict.from} {formatPrice(tier.price, lang)}&nbsp;
                    <span className={styles.cardPriceHT}>HT</span>
                  </p>

                  <p className={styles.cardDesc}>{copy.desc}</p>

                  <ul className={styles.features}>
                    {copy.features.map((feature) => (
                      <li key={feature} className={styles.feature}>
                        <Check size={14} strokeWidth={2} className={styles.checkIcon} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Annonce le système de modules sans l'étaler : le socle reste
                      lisible d'un coup d'œil, et le client comprend qu'il compose. */}
                  <p className={styles.modules}>
                    <span className={styles.modulesLabel}>{dict.modules_label} — </span>
                    {copy.modules}
                  </p>

                  <div className={styles.warranty}>
                    <span className={styles.warrantyIcon}>✦</span>
                    {maintenance}
                  </div>

                  <div className={styles.cardFooter}>
                    <span className={styles.delay}>{copy.delay}</span>
                    <a href={`?budget=${tier.id}#contact`} className={styles.btn}>
                      {dict.cta}
                    </a>
                  </div>
                </div>

                {index < TIERS.length - 1 && <div className={styles.separator} />}
              </div>
            )
          })}
        </div>

        <p className={styles.vatNotice}>{dict.vat_notice}</p>

      </div>
    </section>
  )
}
