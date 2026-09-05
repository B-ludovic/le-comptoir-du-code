import Link from 'next/link'
import styles from './Portfolio.module.css'
import ProjectCarousel from './ProjectCarousel'
import ArchiveRow from './ArchiveRow'
import { portfolioJsonLd } from '@/lib/structured-data'
import {
  getProjects,
  projectHref,
  projectDomain,
  projectStatusKey,
  splitProjects,
} from '@/lib/projects'
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

/* Réalisations — refonte.

   L'alternance gauche/droite a disparu. Elle donnait à la section un zigzag
   qui fatiguait la lecture, et elle se payait de rattrapages au cas par cas
   dans la feuille de style (un `#aux-ptits-pois` en dur, notamment). Chaque
   fiche suit désormais le même ordre, toujours du même côté :

     numéro et état → titre et domaine → capture → pitch → chiffre-preuve →
     défi → gros œuvre → livré avec

   Deux rangs, tirés du `flagship` de lib/projects.ts : trois fiches complètes,
   trois lignes dépliables. Le contenu est identique à l'ancienne version — rien
   n'a été coupé, tout reste dans le DOM. */
export default function Portfolio({ locale, dict }: Props) {
  const projects = getProjects(dict)
  const { flagships, archives } = splitProjects(projects)

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

        {/* Sommaire. Six ancres sur une ligne de filets : la section annonce sa
            longueur au lieu de la faire découvrir au défilement. */}
        <nav className={styles.summary} aria-label={dict.summary_label}>
          {projects.map((project) => (
            <a key={project.slug} href={`#${project.slug}`} className={styles.summaryLink}>
              <span className={styles.summaryNumber}>{project.number}</span>
              {project.title}
            </a>
          ))}
        </nav>

        {flagships.map((project) => {
          const href = projectHref(project)
          const domain = projectDomain(project)

          return (
            /* L'ancre porte le nom du chantier plutôt qu'un numéro : c'est elle
               que cite l'@id de l'entité JSON-LD, et elle reste valable même si
               l'ordre de la liste change. */
            <article key={project.slug} id={project.slug} className={styles.project}>
              <div className={styles.projectMeta}>
                <span className={styles.number}>
                  {project.number}
                  <span className={styles.metaRule} aria-hidden="true" />
                  <span className={styles.liveDot} aria-hidden="true" />
                  <span className={styles.status}>{dict[projectStatusKey(project)]}</span>
                </span>
                <div className={styles.tags}>
                  {project.stack.split(' · ').map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.titleRow}>
                {/* Le titre mène au site quand il tourne, au code sinon.
                    Un chantier fermé garde ainsi une preuve consultable. */}
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.titleLink}
                  >
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                  </a>
                ) : (
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                )}

                {/* Le domaine, écrit en clair. C'est la preuve : un badge
                    « en production » n'engage que celui qui l'écrit, une adresse
                    qui s'ouvre engage le chantier. */}
                {domain && (
                  <a
                    href={project.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.domain}
                  >
                    {domain}
                    <span aria-hidden="true"> ↗</span>
                  </a>
                )}
              </div>

              <div className={styles.body}>
                <div className={styles.media}>
                  <ProjectCarousel images={project.images} alt={project.title} />
                </div>

                <div className={styles.aside}>
                  <p className={styles.projectDesc}>{project.desc}</p>

                  {project.statValue && project.statLabel && (
                    <p className={styles.stat}>
                      <span className={styles.statValue}>{project.statValue}</span>
                      <span className={styles.statLabel}>{project.statLabel}</span>
                    </p>
                  )}

                  {project.challenge && (
                    <div className={styles.challenge}>
                      <p className={styles.label}>{dict.challenge_label}</p>
                      <p className={styles.challengeText}>{project.challenge}</p>
                    </div>
                  )}

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
                </div>
              </div>

              {project.builds.length > 0 && (
                <div className={styles.builds}>
                  <p className={styles.label}>{dict.builds_label}</p>
                  <ul className={styles.buildsList}>
                    {project.builds.map((build) => (
                      <li key={build} className={styles.buildItem}>
                        {build}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.features.length > 0 && (
                <div className={styles.features}>
                  <p className={styles.label}>{dict.features_label}</p>
                  <p className={styles.featuresList}>{project.features.join(' · ')}</p>
                </div>
              )}
            </article>
          )
        })}

        {archives.length > 0 && (
          <>
            <div className={styles.foundations}>
              <p className={styles.eyebrow}>{dict.foundations_label}</p>
              <p className={styles.foundationsIntro}>{dict.foundations_intro}</p>
            </div>

            {archives.map((project) => (
              <ArchiveRow
                key={project.slug}
                project={project}
                statusLabel={dict[projectStatusKey(project)]}
                labels={{
                  builds: dict.builds_label,
                  features: dict.features_label,
                  challenge: dict.challenge_label,
                  openSite: dict.open_site,
                  openRepo: dict.open_repo,
                  toggle: dict.archive_toggle,
                }}
              />
            ))}
            <div className={styles.closingRule} />
          </>
        )}
      </div>
    </section>
  )
}
