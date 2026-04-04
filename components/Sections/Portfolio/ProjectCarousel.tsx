'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import styles from './ProjectCarousel.module.css'

type Props = {
  images: string[]
  alt: string
}

export default function ProjectCarousel({ images, alt }: Props) {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length)
  const next = () => setCurrent((c) => (c + 1) % images.length)

  return (
    <div className={styles.carousel}>
      <div className={styles.track}>
        {images.map((src, i) => (
          <div key={src} className={`${styles.slide} ${i === current ? styles.active : ''}`}>
            <Image
              src={src}
              alt={`${alt} — ${i + 1}`}
              width={800}
              height={500}
              className={styles.screenshot}
            />
          </div>
        ))}
      </div>

      <button onClick={prev} className={`${styles.arrow} ${styles.arrowLeft}`} aria-label="Image précédente">
        <ChevronLeft size={18} strokeWidth={1.5} />
      </button>
      <button onClick={next} className={`${styles.arrow} ${styles.arrowRight}`} aria-label="Image suivante">
        <ChevronRight size={18} strokeWidth={1.5} />
      </button>

      <div className={styles.dots}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            aria-label={`Image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
