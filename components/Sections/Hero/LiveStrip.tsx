import styles from './LiveStrip.module.css'
import { liveProjects, projectDomain } from '@/lib/projects'

type Props = {
  label: string
  cta: string
}

/* Bandeau « en ligne en ce moment ».

   Le premier écran promettait des applications sur-mesure sans rien qui prouve
   qu'il en existe. Cinq domaines qui s'ouvrent, listés au-dessus de la ligne de
   flottaison, le prouvent avant tout argument — et sans ajouter une ligne de
   discours. Les adresses viennent de PROJECT_MEDIA : une fermeture de domaine
   les retire d'ici comme du portfolio, sans double saisie. */
export default function LiveStrip({ label, cta }: Props) {
  const sites = liveProjects()
  if (sites.length === 0) return null

  return (
    <div className={styles.strip}>
      <p className={styles.label}>
        <span className={styles.dot} aria-hidden="true" />
        {label}
      </p>

      <ul className={styles.list}>
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

      <a href="#portfolio" className={styles.cta}>
        {cta}
        <span aria-hidden="true"> ↓</span>
      </a>
    </div>
  )
}
