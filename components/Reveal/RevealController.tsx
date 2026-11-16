'use client'

import { useEffect } from 'react'

/* Un seul IntersectionObserver pour toute la page.

   Les sections restent des Server Components : elles posent `data-reveal` sur
   ce qui doit apparaître, et ce composant, monté une fois, fait le reste. Pas
   d'enveloppe client autour de chaque bloc, donc pas de JavaScript de plus
   par section.

   Ordre des opérations, pour éviter tout clignotement : on marque d'abord
   comme visible ce qui est déjà à l'écran, puis seulement on arme le CSS qui
   cache le reste. Armer d'abord ferait disparaître une frame le contenu du
   premier écran, le temps que l'observateur rende son premier verdict. */
export default function RevealController() {
  useEffect(() => {
    const root = document.documentElement
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) return

    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const viewport = window.innerHeight

    const pending = elements.filter((el) => {
      const rect = el.getBoundingClientRect()
      const onScreen = rect.top < viewport * 0.9 && rect.bottom > 0
      if (onScreen) el.dataset.visible = ''
      return !onScreen
    })

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          ;(entry.target as HTMLElement).dataset.visible = ''
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    )

    pending.forEach((el) => observer.observe(el))
    root.classList.add('reveal-armed')

    return () => {
      observer.disconnect()
      root.classList.remove('reveal-armed')
    }
  }, [])

  return null
}
