import { ClipboardList, Code2, PackageCheck } from 'lucide-react'
import styles from './Method.module.css'

type Props = {
  dict: {
    eyebrow: string
    section_title: string
    intro: string
    block1_title: string
    block1_text: string
    block2_title: string
    block2_text: string
    block3_title: string
    block3_text: string
  }
}

const blocks = [
  {
    number: '01',
    icon: ClipboardList,
    titleKey: 'block1_title' as const,
    textKey: 'block1_text' as const,
  },
  {
    number: '02',
    icon: Code2,
    titleKey: 'block2_title' as const,
    textKey: 'block2_text' as const,
  },
  {
    number: '03',
    icon: PackageCheck,
    titleKey: 'block3_title' as const,
    textKey: 'block3_text' as const,
  },
]

/* Méthode — trois colonnes sous un filet chacune.

   Le numéro était posé en fantôme géant derrière le texte, et les blocs
   séparés par des filets verticaux. Le numéro passe devant, en monospace :
   c'est le même signal que le logo mark, et il fait de la liste un sommaire
   plutôt qu'un décor. Le filet devient horizontal, un par colonne — c'est
   désormais la grammaire commune de Méthode, Cadrage et Réalisations. */
export default function Method({ dict }: Props) {
  return (
    <section id="method" className={styles.section}>
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

        <div className={styles.blocks}>
          {blocks.map((block) => {
            const Icon = block.icon
            return (
              <div key={block.number} className={styles.block}>
                <span className={styles.number}>{block.number}</span>
                <Icon size={22} strokeWidth={1.5} className={styles.icon} />
                <h3 className={styles.blockTitle}>{dict[block.titleKey]}</h3>
                <p className={styles.blockText}>{dict[block.textKey]}</p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
