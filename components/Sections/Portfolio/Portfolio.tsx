import Image from 'next/image'
import styles from './Portfolio.module.css'
import ProjectCarousel from './ProjectCarousel'
import { portfolioJsonLd } from '@/lib/structured-data'

type Project = {
  number: string
  title: string
  desc: string
  stack: string
  builds: string[]
  statValue?: string
  statLabel?: string
  image?: string
  images?: string[]
  url: string | null
}

type Props = {
  locale: string
  dict: {
    eyebrow: string
    section_title: string
    intro: string
    builds_label: string
  } & Record<string, string>
}

// Médias et liens de chaque chantier ; les textes (titre, desc, gros œuvre,
// chiffre-preuve) vivent dans les dictionnaires sous project{n}_*.
const projectMedia: { images: string[]; url: string | null }[] = [
  {
    images: [
      '/images/accueil-miabe.png',
      '/images/inscription-miabe.png',
      '/images/onboarding-miabe.png',
      '/images/admin-miabe.png',
    ],
    url: null,
  },
  {
    images: [
      '/images/page-salon.png',
      '/images/fcs-drawer.png',
      '/images/fcs-bijoux.png',
      '/images/fcs-accordeon.png',
      '/images/fcs-coeur.png',
    ],
    url: 'https://fairychairstudio.com/fr',
  },
  {
    images: [
      '/images/page-meavita.png',
      '/images/mea-accueil.png',
      '/images/mea-sacs.png',
      '/images/mea-presentation.png',
      '/images/mea-inscription.png',
    ],
    url: 'https://github.com/B-ludovic/mea-vita-creation',
  },
  {
    images: [
      '/images/accueil-okanime.png',
      '/images/bibliotheque-okanime.png',
      '/images/detail-okanime.png',
      '/images/base-okanime.png',
    ],
    url: 'https://okanime.live/',
  },
  {
    images: [
      '/images/accueil-auxptitspois.png',
      '/images/product-auxptitspois.png',
      '/images/recette-auxptitspois.png',
      '/images/abonnement-auxptitspois.png',
    ],
    url: 'https://www.auxptitspois.fr/',
  },
  {
    images: [
      '/images/req-appartements.png',
      '/images/req-around.png',
      '/images/req-footer.png',
    ],
    url: 'https://www.larequeyrie.fr',
  },
]

export default function Portfolio({ locale, dict }: Props) {
  const projects: Project[] = projectMedia.map((media, index) => {
    const n = index + 1
    const builds = [1, 2, 3, 4]
      .map((b) => dict[`project${n}_build${b}`])
      .filter((text): text is string => Boolean(text))

    return {
      number: String(n).padStart(2, '0'),
      title: dict[`project${n}_title`],
      desc: dict[`project${n}_desc`],
      stack: dict[`project${n}_stack`],
      builds,
      statValue: dict[`project${n}_stat_value`],
      statLabel: dict[`project${n}_stat_label`],
      ...media,
    }
  })

  return (
    <section id="portfolio" className={styles.section}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(portfolioJsonLd(projects, locale)),
        }}
      />
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

        {projects.map((project, index) => (
          <div key={project.number} className={styles.projectWrapper}>
            <div className={styles.projectRow}>
              <div className={styles.projectImage}>
                {project.images ? (
                  <ProjectCarousel images={project.images} alt={project.title} />
                ) : (
                  <Image
                    src={project.image!}
                    alt={project.title}
                    width={800}
                    height={500}
                    className={styles.screenshot}
                  />
                )}
              </div>

              <div className={styles.projectText}>
                <span className={styles.number}>{project.number}</span>
                <div className={styles.textContent}>
                  <div className={styles.tags}>
                    {project.stack.split(' · ').map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.titleLink}
                    >
                      <h3 className={styles.projectTitle}>{project.title}</h3>
                    </a>
                  ) : (
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                  )}
                  <p className={styles.projectDesc}>{project.desc}</p>

                  {project.builds.length > 0 && (
                    <div className={styles.builds}>
                      <p className={styles.buildsLabel}>{dict.builds_label}</p>
                      <ul className={styles.buildsList}>
                        {project.builds.map((build) => (
                          <li key={build} className={styles.buildItem}>
                            {build}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.statValue && project.statLabel && (
                    <p className={styles.stat}>
                      <span className={styles.statValue}>{project.statValue}</span>
                      <span className={styles.statLabel}>{project.statLabel}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {index !== projects.length - 1 && <div className={styles.separator} />}
          </div>
        ))}
      </div>
    </section>
  )
}
