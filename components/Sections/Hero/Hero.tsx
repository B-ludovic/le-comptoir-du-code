import styles from './Hero.module.css'
import TestimonialTicker from './TestimonialTicker'

type Props = {
  locale: string
  dict: {
    eyebrow: string
    h1: string
    lead: string
    facts: string
    cta: string
    cta_secondary: string
    reviews_label: string
    reviews_source: string
  }
}

/* Bloc d'accroche — le premier écran, et le premier paragraphe que lisent les
   robots d'indexation comme les moteurs génératifs. D'où deux textes distincts :
   `lead` dit qui fait quoi, `facts` donne les chiffres. Chacun se tient seul,
   sans son voisin ni son contexte visuel : c'est la condition pour être cité. */
export default function Hero({ locale, dict }: Props) {
  return (
    <section id="hero" className={styles.hero}>
      <div className="container">
        {/* Deux colonnes : l'accroche porte le discours, le bandeau porte la
            preuve. Les avis y défilent en continu, et le premier écran cesse
            d'être une promesse pour devenir une promesse plus un témoin. */}
        <div className={styles.layout}>
          <div className={styles.pitch}>
        <p className={styles.eyebrow}>{dict.eyebrow}</p>
        <h1 className={styles.title}>{dict.h1}</h1>

        <div className={styles.rule} />

        <p className={styles.lead}>{dict.lead}</p>
        <p className={styles.facts}>{dict.facts}</p>

        <div className={styles.actions}>
          <a href="#contact" className={styles.btn}>{dict.cta}</a>
          <a href="#solutions" className={styles.btnGhost}>{dict.cta_secondary}</a>
        </div>
          </div>

          <TestimonialTicker
            locale={locale}
            label={dict.reviews_label}
            sourceLabel={dict.reviews_source}
          />
        </div>
      </div>
    </section>
  )
}
