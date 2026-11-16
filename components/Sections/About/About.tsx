import Image from 'next/image'
import styles from './About.module.css'
import { liveProjects } from '@/lib/projects'

type Props = {
  dict: {
    eyebrow: string
    section_title: string
    body: string
    portrait_alt: string
    portrait_caption: string
    stat1_value: string
    stat1_label: string
    stat2_value: string
    stat2_label: string
    stat3_value: string
    stat3_label: string
  }
}

function parseHighlights(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  )
}

/* Le Codeur.

   Deux ajouts. Le portrait, d'abord : le fichier existait déjà et ne servait
   qu'à un médaillon de 32 px dans la barre. Une page qui parle de « l'artisan
   derrière l'écran » sans jamais le montrer se prive de son argument le moins
   coûteux. Traité comme les captures — nuances de gris, filet, pas d'ombre.

   Trois chiffres, ensuite. Le paragraphe dit le métier ; les chiffres le
   rendent citable, y compris par un moteur génératif qui n'aura pas lu la
   prose.

   Refonte : les quatre paragraphes d'origine, qui ouvraient sur le récit de
   reconversion, passent à un seul. Le nombre de sites en ligne n'est plus
   écrit à la main : il vient de lib/projects.ts, comme le bandeau de
   l'accroche — une fermeture de domaine le met à jour partout. */
export default function About({ dict }: Props) {
  const stats = [
    { value: dict.stat1_value, label: dict.stat1_label },
    {
      value: dict.stat2_value,
      label: dict.stat2_label.replace('{live}', String(liveProjects().length)),
    },
    { value: dict.stat3_value, label: dict.stat3_label },
  ]

  return (
    <section id="about" className={styles.section}>
      <div className="container">
        <div className={styles.layout} data-reveal="">

          <div className={styles.left}>
            <p className={styles.eyebrow}>{dict.eyebrow}</p>
            <h2 className={styles.sectionTitle}>{dict.section_title}</h2>

            <div className={styles.portrait}>
              {/* Le fichier source fait 768 × 1024 : `sizes` dit la largeur
                  réelle d'affichage, sans quoi Next préparerait des variantes
                  de la largeur de l'écran. */}
              <Image
                src="/ludovic.jpeg"
                alt={dict.portrait_alt}
                width={560}
                height={747}
                sizes="(max-width: 768px) 60vw, 280px"
                className={styles.portraitImage}
              />
            </div>
            <p className={styles.portraitCaption}>{dict.portrait_caption}</p>
          </div>

          <div className={styles.right}>
            <p className={styles.text}>{parseHighlights(dict.body)}</p>

            <dl className={styles.stats}>
              {stats.map((stat) => (
                <div key={stat.label} className={styles.stat}>
                  <dt className={styles.statValue}>{stat.value}</dt>
                  <dd className={styles.statLabel}>{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>

        </div>
      </div>
    </section>
  )
}
