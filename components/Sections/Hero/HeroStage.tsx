'use client'

import dynamic from 'next/dynamic'
import styles from './Hero.module.css'

/* Le shader n'a rien à faire dans le HTML rendu côté serveur : il est chargé
   à part, après le premier affichage. En attendant, la forme CSS de repli
   occupe la place, à la même taille, pour que rien ne saute.

   `ssr: false` n'est permis que dans un Client Component (Next 16), d'où ce
   fichier-relais entre le Hero, rendu côté serveur, et l'objet lui-même. */
const HeroObject = dynamic(() => import('./HeroObject'), {
  ssr: false,
  loading: () => (
    <div className={styles.stage}>
      <div className={styles.fallback} aria-hidden="true" />
    </div>
  ),
})

export default function HeroStage() {
  return <HeroObject />
}
