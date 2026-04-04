'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import styles from './ProjectCarousel.module.css'

type Props = {
  images: string[]
  alt: string
}

function CarouselInner({
  images,
  alt,
  current,
  setCurrent,
  variant,
}: {
  images: string[]
  alt: string
  current: number
  setCurrent: (i: number) => void
  variant: 'inline' | 'modal'
}) {
  const prev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrent((current - 1 + images.length) % images.length)
  }
  const next = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrent((current + 1) % images.length)
  }

  return (
    <div className={variant === 'modal' ? styles.carouselModal : styles.carousel}>
      <div className={styles.track}>
        {images.map((src, i) => (
          <div key={src} className={`${styles.slide} ${i === current ? styles.active : ''}`}>
            <Image
              src={src}
              alt={`${alt} — ${i + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1400px"
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
            onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            aria-label={`Image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default function ProjectCarousel({ images, alt }: Props) {
  const [current, setCurrent] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      {/* Inline thumbnail */}
      <div className={styles.thumbnailWrapper} onClick={() => setIsOpen(true)} role="button" tabIndex={0} aria-label="Ouvrir la galerie">
        <CarouselInner images={images} alt={alt} current={current} setCurrent={setCurrent} variant="inline" />
        <div className={styles.hoverOverlay}>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className={styles.modalBackdrop} onClick={() => setIsOpen(false)}>
          <button className={styles.closeButton} onClick={() => setIsOpen(false)} aria-label="Fermer la galerie">
            <X size={22} strokeWidth={1.5} />
          </button>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <CarouselInner images={images} alt={alt} current={current} setCurrent={setCurrent} variant="modal" />
          </div>
        </div>
      )}
    </>
  )
}
