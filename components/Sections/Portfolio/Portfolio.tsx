import Image from 'next/image'
import styles from './Portfolio.module.css'
import ProjectCarousel from './ProjectCarousel'

type Project = {
  number: string
  title: string
  desc: string
  stack: string
  image?: string
  images?: string[]
  url: string | null
}

type Props = {
  dict: {
    eyebrow: string
    section_title: string
    intro: string
    project1_title: string
    project1_desc: string
    project1_stack: string
    project2_title: string
    project2_desc: string
    project2_stack: string
    project3_title: string
    project3_desc: string
    project3_stack: string
    project4_title: string
    project4_desc: string
    project4_stack: string
    project5_title: string
    project5_desc: string
    project5_stack: string
  }
}

export default function Portfolio({ dict }: Props) {
  const projects: Project[] = [
    { number: '01', title: dict.project1_title, desc: dict.project1_desc, stack: dict.project1_stack, image: '/images/page-salon.png', url: null },
    { number: '02', title: dict.project2_title, desc: dict.project2_desc, stack: dict.project2_stack, image: '/images/page-meavita.png', url: null },
    { number: '03', title: dict.project3_title, desc: dict.project3_desc, stack: dict.project3_stack, image: '/images/accueil-okanime.png', url: 'https://okanime.live/' },
    { number: '04', title: dict.project4_title, desc: dict.project4_desc, stack: dict.project4_stack, image: '/images/accueil-auxptitspois.png', url: 'https://www.auxptitspois.fr/' },
    {
      number: '05',
      title: dict.project5_title,
      desc: dict.project5_desc,
      stack: dict.project5_stack,
      images: [
        '/images/req-appartements.jpeg.png',
        '/images/req-around.jpeg.png',
        '/images/req-footer.jpeg.png',
      ],
      url: 'https://www.larequeyrie.fr',
    },
  ]

  return (
    <section id="portfolio" className={styles.section}>
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
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                  {project.url ? (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className={styles.titleLink}>
                      <h3 className={styles.projectTitle}>{project.title}</h3>
                    </a>
                  ) : (
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                  )}
                  <p className={styles.projectDesc}>{project.desc}</p>
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
