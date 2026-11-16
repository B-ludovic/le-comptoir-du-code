import styles from './Testimonials.module.css'
import { TESTIMONIALS, REVIEWS_SOURCE, REVIEWS_SOURCE_NAME } from '@/lib/testimonials'

type Props = {
  locale: string
  dict: {
    eyebrow: string
    section_title: string
    source: string
    translation_label: string
  }
}

/* Avis clients, affichés fixes.

   Ils défilaient en continu à côté de l'accroche. Le défilement automatique
   est sorti de la charte d'animation, mais les avis ne peuvent pas sortir de
   la page : le JSON-LD de la page d'accueil les déclare, et une donnée
   structurée doit décrire ce que le visiteur voit.

   En anglais, l'original reste affiché et la traduction vient dessous, en
   tant que traduction : on ne cite pas quelqu'un dans une langue qu'il n'a
   pas employée (voir lib/testimonials.ts). */
export default function Testimonials({ locale, dict }: Props) {
  const isFr = locale !== 'en'

  return (
    <section id="avis" className={styles.section} aria-labelledby="avis-title">
      <div className="container">
        <div className={styles.head} data-reveal="">
          <p className={styles.eyebrow}>{dict.eyebrow}</p>
          <h2 id="avis-title" className={styles.title}>{dict.section_title}</h2>
        </div>

        <div className={styles.grid}>
          {TESTIMONIALS.map((review, index) => (
            <figure
              key={review.id}
              className={styles.card}
              data-reveal=""
              style={{ '--i': index % 2 } as React.CSSProperties}
            >
              <blockquote className={styles.quote} lang="fr">
                « {review.body} »
              </blockquote>
              {!isFr && (
                <p className={styles.translation}>
                  <span className={styles.translationLabel}>{dict.translation_label}</span>{' '}
                  {review.translation}
                </p>
              )}
              <figcaption className={styles.caption}>
                <span className={styles.author}>{review.author}</span>
                <span>{review.organisation}</span>
                <span className={styles.sector}>{review.sector[isFr ? 'fr' : 'en']}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className={styles.source}>
          {dict.source}{' '}
          <a
            href={REVIEWS_SOURCE}
            className={styles.sourceLink}
            rel="nofollow noopener"
            target="_blank"
          >
            {REVIEWS_SOURCE_NAME}
          </a>
        </p>
      </div>
    </section>
  )
}
