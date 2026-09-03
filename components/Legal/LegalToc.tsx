'use client'

import { useEffect, useId, useState } from 'react'
import styles from './LegalToc.module.css'
import type { TocItem } from './toc'

type Props = {
  items: TocItem[]
  locale: string
}

/* Sommaire des pages légales. Sur grand écran il reste collé sous le header
   pendant le défilement et souligne l'article en cours de lecture ; sous
   1024px il se replie derrière un bouton en tête de page, parce qu'un bloc
   collant y mangerait la moitié de l'écran. L'article courant est celui
   dont le haut a franchi la ligne des 40 % de la fenêtre : même réglage que
   le header de la page d'accueil, pour que les deux réagissent pareil. */
export default function LegalToc({ items, locale }: Props) {
  const [active, setActive] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const headingId = useId()
  const listId = useId()
  const isFr = locale !== 'en'

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { threshold: 0, rootMargin: '-15% 0px -60% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [items])

  return (
    <nav className={styles.toc} aria-labelledby={headingId}>
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((value) => !value)}
      >
        <span id={headingId} className={styles.eyebrow}>
          {isFr ? 'Sommaire' : 'Contents'}
        </span>
        <span className={styles.chevron} aria-hidden="true" />
      </button>

      <ol id={listId} className={`${styles.list} ${open ? styles.open : ''}`}>
        {items.map(({ id, number, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`${styles.link} ${active === id ? styles.active : ''}`}
              aria-current={active === id ? 'location' : undefined}
              onClick={() => setOpen(false)}
            >
              <span className={styles.number}>{number}</span>
              <span className={styles.label}>{label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
