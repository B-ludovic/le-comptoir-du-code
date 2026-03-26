import styles from './About.module.css'

type Props = {
  dict: {
    eyebrow: string
    section_title: string
    p1: string
    p2: string
    p3: string
    p4: string
  }
}

function parseHighlights(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  )
}

export default function About({ dict }: Props) {
  const paragraphs = [dict.p1, dict.p2, dict.p3, dict.p4]

  return (
    <section id="about" className={styles.section}>
      <div className="container">
        <div className={styles.layout}>

          <div className={styles.left}>
            <p className={styles.eyebrow}>{dict.eyebrow}</p>
            <h2 className={styles.sectionTitle}>{dict.section_title}</h2>
          </div>

          <div className={styles.right}>
            {paragraphs.map((p, i) => (
              <p key={i} className={styles.text}>
                {parseHighlights(p)}
              </p>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
