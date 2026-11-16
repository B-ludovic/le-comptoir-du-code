import styles from './Build.module.css'

type Item = {
  title: string
  text: string
  link: string
  anchor: string
}

type Props = {
  dict: {
    eyebrow: string
    section_title: string
    intro: string
    item1_title: string
    item1_text: string
    item1_link: string
    item2_title: string
    item2_text: string
    item2_link: string
    item3_title: string
    item3_text: string
    item3_link: string
  }
}

/* Ce que je construis.

   Trois lignes, pas trois cartes, et aucun prix : le visiteur doit se
   reconnaître dans une famille de projets, pas comparer des forfaits. Les prix
   arrivent dans la Méthodologie, à l'étape qui les produit.

   L'ordre est voulu : le projet le plus technique d'abord, c'est lui qui porte
   le positionnement. Chaque ligne renvoie à un chantier réel, par son ancre
   dans les Réalisations. */
export default function Build({ dict }: Props) {
  const items: Item[] = [
    { title: dict.item1_title, text: dict.item1_text, link: dict.item1_link, anchor: 'muse' },
    { title: dict.item2_title, text: dict.item2_text, link: dict.item2_link, anchor: 'fairy-chair-studio' },
    { title: dict.item3_title, text: dict.item3_text, link: dict.item3_link, anchor: 'la-requeyrie' },
  ]

  return (
    <section id="construire" className={styles.section}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.head} data-reveal="">
          <p className={styles.eyebrow}>{dict.eyebrow}</p>
          <h2 className={styles.title}>{dict.section_title}</h2>
          <p className={styles.intro}>{dict.intro}</p>
        </div>

        <ol className={styles.rows}>
          {items.map((item, index) => (
            <li
              key={item.anchor}
              className={styles.rowWrap}
              data-reveal=""
              style={{ '--i': index } as React.CSSProperties}
            >
              <div className={styles.row}>
                <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className={styles.rowTitle}>{item.title}</h3>
                  <p className={styles.rowText}>{item.text}</p>
                  <a href={`#${item.anchor}`} className={styles.link}>
                    {item.link}
                    <span aria-hidden="true"> →</span>
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
