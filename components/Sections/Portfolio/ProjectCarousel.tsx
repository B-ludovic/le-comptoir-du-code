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
  loaded,
  variant,
}: {
  images: string[]
  alt: string
  current: number
  setCurrent: (i: number) => void
  loaded: number[]
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

  /* La vignette remplit son cadre (cover, cadrée en haut) ; la modale montre
     la capture entière (contain). En 16/9 et en `contain`, une capture de page
     laissait deux bandes vides au-dessus et en dessous : elle ne pesait plus
     rien dans la fiche. Même composant, deux cadrages. */
  const fit = variant === 'modal' ? styles.screenshotModal : styles.screenshot

  return (
    <div className={variant === 'modal' ? styles.carouselModal : styles.carousel}>
      <div className={styles.track}>
        {images.map((src, i) => (
          <div key={src} className={`${styles.slide} ${i === current ? styles.active : ''}`}>
            {/* Une slide masquée par `opacity: 0` occupe sa place dans la page :
                le chargement différé du navigateur regarde la position, pas
                l'opacité, et téléchargeait donc les cinq captures d'un chantier
                dès que sa carte entrait à l'écran. On ne pose l'image que sur
                les vues déjà atteintes — la suivante étant toujours préparée
                d'avance, le fondu ne tombe jamais sur du vide. */}
            {loaded.includes(i) && (
              <Image
                src={src}
                alt={`${alt} — ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1400px"
                className={fit}
              />
            )}
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
  const [isHovered, setIsHovered] = useState(false)

  /* La vue de départ et la suivante : de quoi afficher et de quoi enchaîner.
     La liste s'allonge au fil du défilement, jamais au-delà de ce qui a
     réellement été montré. */
  const [loaded, setLoaded] = useState<number[]>(() =>
    images.length > 1 ? [0, 1] : [0]
  )

  /* Cette liste se déduit du numéro de vue : elle ne synchronise rien avec le
     monde extérieur, elle prolonge une valeur que React a déjà en main. Un
     effet était donc le mauvais outil — il attendait la peinture pour déclencher
     un second rendu, soit une image affichée sur du vide entre les deux.

     Le motif est celui que React documente sous « ajuster l'état pendant le
     rendu » : on garde en mémoire le numéro déjà pris en compte, et quand il
     bouge on rallonge la liste dans la foulée. React interrompt le rendu en
     cours et le rejoue avec la nouvelle liste, avant de peindre quoi que ce
     soit. Rien ne s'affiche entre les deux passes. */
  const [tracked, setTracked] = useState(current)

  if (tracked !== current) {
    setTracked(current)
    const upcoming = (current + 1) % images.length
    if (!loaded.includes(current) || !loaded.includes(upcoming)) {
      setLoaded([...new Set([...loaded, current, upcoming])])
    }
  }

  // Défilement automatique de la miniature — en pause au survol, modale ouverte,
  // ou si le visiteur préfère réduire les animations
  useEffect(() => {
    if (isOpen || isHovered) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [isOpen, isHovered, current, images.length])

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
      <div
        className={styles.thumbnailWrapper}
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="button"
        tabIndex={0}
        aria-label="Ouvrir la galerie"
      >
        <CarouselInner images={images} alt={alt} current={current} setCurrent={setCurrent} loaded={loaded} variant="inline" />
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
            <CarouselInner images={images} alt={alt} current={current} setCurrent={setCurrent} loaded={loaded} variant="modal" />
          </div>
        </div>
      )}
    </>
  )
}
