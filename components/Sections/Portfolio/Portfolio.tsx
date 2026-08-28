import Link from 'next/link'
import styles from './Portfolio.module.css'
import ProjectCarousel from './ProjectCarousel'
import { portfolioJsonLd } from '@/lib/structured-data'
import { getProjects, projectHref } from '@/lib/projects'
import { hasCaseStudy, caseStudyPath } from '@/lib/case-studies'

type Props = {
  locale: string
  dict: {
    eyebrow: string
    section_title: string
    intro: string
    builds_label: string
  } & Record<string, string>
}

export default function Portfolio({ locale, dict }: Props) {
  // Médias, adresses et état de chaque chantier : lib/projects.ts. Les textes
  // vivent dans les dictionnaires sous project{n}_*.
  const projects = getProjects(dict)

  return (
    <section id="portfolio" className={styles.section}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(portfolioJsonLd(projects, locale, dict.intro)),
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
          /* L'ancre porte le nom du chantier plutôt qu'un numéro : c'est elle
             que cite l'@id de l'entité JSON-LD, et elle reste valable même si
             l'ordre de la liste change. */
          <div key={project.slug} id={project.slug} className={styles.projectWrapper}>
            <div className={styles.projectRow}>
              <div className={styles.projectMedia}>
                <div className={styles.projectImage}>
                  <ProjectCarousel images={project.images} alt={project.title} />
                </div>

                <div className={styles.tags}>
                  {project.stack.split(' · ').map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                {project.features.length > 0 && (
                  <div className={styles.features}>
                    <p className={styles.featuresLabel}>{dict.features_label}</p>
                    <p className={styles.featuresList}>{project.features.join(' · ')}</p>
                  </div>
                )}

                {project.challenge && (
                  <div className={styles.challenge}>
                    <p className={styles.challengeLabel}>{dict.challenge_label}</p>
                    <p className={styles.challengeText}>{project.challenge}</p>
                  </div>
                )}

                {project.statValue && project.statLabel && (
                  <p className={styles.stat}>
                    <span className={styles.statValue}>{project.statValue}</span>
                    <span className={styles.statLabel}>{project.statLabel}</span>
                  </p>
                )}
              </div>

              <div className={styles.projectText}>
                <span className={styles.number}>{project.number}</span>
                <div className={styles.textContent}>
                  {/* Le titre mène au site quand il tourne, au code sinon.
                      Un chantier fermé garde ainsi une preuve consultable. */}
                  {projectHref(project) ? (
                    <a
                      href={projectHref(project)!}
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

                  {/* Le chantier qui a son étude de cas emmène plus loin. Le
                      titre continue de mener au site en production : le lien
                      externe montre le produit, celui-ci raconte le chantier. */}
                  {hasCaseStudy(project.slug) && (
                    <Link
                      href={caseStudyPath(locale, project.slug)}
                      className={styles.caseLink}
                    >
                      {dict.case_link}
                      <span aria-hidden="true"> →</span>
                    </Link>
                  )}

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
