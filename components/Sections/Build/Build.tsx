import styles from './Build.module.css'

export type BuildItem = {
  title: string
  text: string
  /* Lien vers un chantier réel. Facultatif : sur la page associative, les
     lignes décrivent des outils, pas des réalisations. */
  link?: { label: string; href: string }
}

type Props = {
  id?: string
  dict: {
    eyebrow: string
    section_title: string
    intro: string
  }
  items: BuildItem[]
}

/* Ce que je construis.

   Trois lignes, pas trois cartes, et aucun prix : le visiteur doit se
   reconnaître dans une famille de projets, pas comparer des forfaits. Les prix
   arrivent dans la Méthodologie, à l'étape qui les produit.

   Le composant sert deux pages : l'accueil (trois familles de projets, chacune
   reliée à un chantier) et L'Échoppe Solidaire (trois outils pour les
   associations, sans lien). Les lignes arrivent donc toutes faites, la page
   qui l'appelle décide de leur contenu. */
export default function Build({ id = 'construire', dict, items }: Props) {
  return (
    <section id={id} className={styles.section}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.head} data-reveal="">
          <p className={styles.eyebrow}>{dict.eyebrow}</p>
          <h2 className={styles.title}>{dict.section_title}</h2>
          <p className={styles.intro}>{dict.intro}</p>
        </div>

        <ol className={styles.rows}>
          {items.map((item, index) => (
            <li
              key={item.title}
              className={styles.rowWrap}
              data-reveal=""
              style={{ '--i': index } as React.CSSProperties}
            >
              <div className={styles.row}>
                <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className={styles.rowTitle}>{item.title}</h3>
                  <p className={styles.rowText}>{item.text}</p>
                  {item.link && (
                    <a href={item.link.href} className={styles.link}>
                      {item.link.label}
                      <span aria-hidden="true"> →</span>
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
