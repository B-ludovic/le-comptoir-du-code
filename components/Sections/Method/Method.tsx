import { ClipboardList, Code2, PackageCheck } from 'lucide-react'
import styles from './Method.module.css'

type Props = {
  dict: {
    section_title: string
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

export default function Method({ dict }: Props) {
  return (
    <section id="method" className={styles.section}>
      <div className="container">

        <h2 className={styles.sectionTitle}>{dict.section_title}</h2>

        <div className={styles.blocks}>
          {blocks.map((block, index) => {
            const Icon = block.icon
            return (
              <div key={block.number} className={styles.block}>

                {/* Numéro fantôme en arrière-plan */}
                <span className={styles.number}>{block.number}</span>

                {/* Contenu au premier plan */}
                <div className={styles.blockContent}>
                  <h3 className={styles.blockTitle}>
                    <Icon
                      size={20}
                      strokeWidth={1.5}
                      className={styles.icon}
                    />
                    {dict[block.titleKey]}
                  </h3>
                  <p className={styles.blockText}>{dict[block.textKey]}</p>
                </div>

                {index < blocks.length - 1 && (
                  <div className={styles.separator} />
                )}

              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}