import styles from './Hero.module.css'
import HeroStage from './HeroStage'
import { liveProjects, projectDomain } from '@/lib/projects'
import { REVIEWS_SOURCE, REVIEWS_SOURCE_NAME } from '@/lib/testimonials'

type Props = {
  dict: {
    kicker: string
    h1_lead: string
    h1_accent: string
    h1_tail: string
    sub: string
    cta: string
    cta_secondary: string
    reassurance: string
    demo_caption: string
    reviews_label: string
    live_label: string
    live_cta: string
  }
}

/* Accroche.

   Le texte à gauche dit ce qui est vendu ; l'objet à droite montre qu'on sait
   le construire. Le H1 et le sous-titre ne portent aucune animation : ce sont
   eux qui fixent le LCP, et le premier texte qu'un robot ou un moteur lit.

   Le H1 garde « Développeur web freelance à Paris et en Île-de-France » : visuellement
   un surtitre, pour Google la première moitié du titre. Remplacer ces mots
   par la seule accroche aurait fait perdre le signal local.

   La bande du bas reprend le bandeau des sites en ligne : des adresses qui
   s'ouvrent prouvent plus qu'un badge. Le défilement automatique des avis a
   disparu (carrousel automatique, exclu par la charte d'animation) ; l'avis
   reste cité, fixe, dans les Réalisations. */
export default function Hero({ dict }: Props) {
  const sites = liveProjects()

  return (
    <section id="hero" className={styles.hero}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.pitch}>
          <h1 className={styles.title}>
            <span className={styles.kicker}>{dict.kicker}</span>
            {dict.h1_lead}
            <em className={styles.accent}>{dict.h1_accent}</em>
            {dict.h1_tail}
          </h1>

          <p className={styles.sub}>{dict.sub}</p>

          <div className={styles.actions}>
            <a href="#method" className={styles.btn}>{dict.cta}</a>
            <a href="#portfolio" className={styles.btnGhost}>{dict.cta_secondary}</a>
          </div>

          <p className={styles.reassurance}>{dict.reassurance}</p>
        </div>

        <div className={styles.visual}>
          <HeroStage />
          <p className={styles.caption}>{dict.demo_caption}</p>
        </div>
      </div>

      <div className={styles.proof}>
        <div className={`container ${styles.proofInner}`}>
          <a
            href={REVIEWS_SOURCE}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.proofLink}
          >
            {dict.reviews_label} {REVIEWS_SOURCE_NAME}
            <span aria-hidden="true"> ↗</span>
          </a>

          {sites.length > 0 && (
            <>
              <span className={styles.proofDot} aria-hidden="true" />
              <span className={styles.proofLabel}>{dict.live_label}</span>
              <ul className={styles.domains}>
                {sites.map((project) => (
                  <li key={project.slug}>
                    <a
                      href={project.url!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.domain}
                    >
                      {projectDomain(project)}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}

          <span className={styles.proofDot} aria-hidden="true" />
          <a href="#portfolio" className={styles.proofLink}>
            {dict.live_cta}
            <span aria-hidden="true"> ↓</span>
          </a>
        </div>
      </div>
    </section>
  )
}
