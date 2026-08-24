import styles from './TestimonialTicker.module.css'
import { TESTIMONIALS, REVIEWS_SOURCE, REVIEWS_SOURCE_NAME } from '@/lib/testimonials'

type Props = {
  locale: string
  label: string
  sourceLabel: string
}

/* Bandeau d'avis en défilement continu, à droite de l'accroche.

   La liste est rendue deux fois : l'animation translate le rail de la moitié
   de sa hauteur, ce qui ramène exactement le second exemplaire à la position
   du premier et donne une boucle sans raccord. La copie est masquée aux
   lecteurs d'écran — elle n'existe que pour la mécanique visuelle. */
export default function TestimonialTicker({ locale, label, sourceLabel }: Props) {
  const isFr = locale !== 'en'

  const card = (review: (typeof TESTIMONIALS)[number], copy: boolean) => (
    <figure key={`${review.id}-${copy ? 'b' : 'a'}`} className={styles.card}>
      <blockquote className={styles.quote}>{review.body}</blockquote>
      <figcaption className={styles.caption}>
        <span className={styles.author}>{review.author}</span>
        <span className={styles.org}>{review.organisation}</span>
        <span className={styles.sector}>{review.sector[isFr ? 'fr' : 'en']}</span>
      </figcaption>
    </figure>
  )

  return (
    <aside className={styles.ticker} aria-label={label}>
      <p className={styles.label}>{label}</p>

      <div className={styles.viewport}>
        <div className={styles.rail}>
          {TESTIMONIALS.map((review) => card(review, false))}
          <div aria-hidden="true" className={styles.clone}>
            {TESTIMONIALS.map((review) => card(review, true))}
          </div>
        </div>
      </div>

      <p className={styles.source}>
        {sourceLabel}{' '}
        <a
          href={REVIEWS_SOURCE}
          className={styles.sourceLink}
          rel="nofollow noopener"
          target="_blank"
        >
          {REVIEWS_SOURCE_NAME}
        </a>
      </p>
    </aside>
  )
}
