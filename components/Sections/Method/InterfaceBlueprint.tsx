'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './InterfaceBlueprint.module.css'

export type BlueprintCopy = {
  label: string
  product_name: string
  product_sub: string
  product_price: string
  product_stock: string
  product_pay: string
  product_invoice: string
  schema_browser: string
  schema_api: string
  schema_db: string
  schema_stripe: string
  schema_webhook: string
  arch_record: string
  arch_price: string
  arch_stock: string
  arch_pay: string
  arch_invoice: string
  show_architecture: string
  show_interface: string
  hint: string
}

type Face = 'interface' | 'architecture'

/* Carte « Interface → Architecture ».

   Face A : une fiche produit très propre. Face B : la même fiche en plan,
   chaque élément à sa place exacte, relié à la mécanique qui le fait tenir.
   Les quatre mécaniques montrées existent dans M.U.S.E. : la carte montre du
   vrai, pas de l'illustratif.

   La bascule n'est pas un retournement 3D : une ligne balaie la carte et la
   face B remplace la face A sous elle. Les contours restent en place, et le
   visiteur voit que *ce* prix correspond à *ce* calcul — c'est tout l'argument.

   Déclencheurs :
   — souris : survol, avec 120 ms de délai pour ignorer un simple passage ;
   — tactile et clavier : le bouton sous la carte, seul déclencheur hors souris.

   Les deux faces sont dans le DOM, en vrai texte : un lecteur d'écran lit la
   face B sans avoir à la « voir ». La face masquée sort de l'arbre
   d'accessibilité par aria-hidden. */
export default function InterfaceBlueprint({ copy }: { copy: BlueprintCopy }) {
  const [face, setFace] = useState<Face>('interface')
  const [touched, setTouched] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const canHover = useRef(false)

  useEffect(() => {
    canHover.current = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  const show = (next: Face) => {
    setTouched(true)
    setFace(next)
  }

  const onEnter = () => {
    if (!canHover.current) return
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => show('architecture'), 120)
  }

  const onLeave = () => {
    if (timer.current) clearTimeout(timer.current)
    if (face === 'architecture') show('interface')
  }

  const isArch = face === 'architecture'
  const state = isArch ? styles.arch : touched ? styles.back : ''

  return (
    <figure className={styles.wrap} aria-label={copy.label}>
      <div className={`${styles.card} ${state}`} onMouseEnter={onEnter} onMouseLeave={onLeave}>
        {/* Face A — interface */}
        <div className={`${styles.face} ${styles.faceA}`} aria-hidden={isArch}>
          <div className={styles.media}>
            <svg width="120" height="110" viewBox="0 0 120 110" fill="none" aria-hidden="true">
              <path d="M22 40h76l-6 62H28z" />
              <path d="M42 40V30a18 18 0 0 1 36 0v10" />
              <path d="M24 54h72" className={styles.seam} />
            </svg>
          </div>
          <div className={styles.rowTitle}>
            <span className={styles.name}>{copy.product_name}</span>
            <span className={styles.sub}>{copy.product_sub}</span>
          </div>
          <div className={styles.rowPrice}>
            <span className={styles.price}>{copy.product_price}</span>
          </div>
          <div className={styles.rowStock}>
            <span className={styles.stock}>
              <i aria-hidden="true" />
              {copy.product_stock}
            </span>
          </div>
          <div className={styles.rowPay}>
            <span className={styles.pay}>{copy.product_pay}</span>
          </div>
          <div className={styles.rowInvoice}>
            <span className={styles.invoice}>{copy.product_invoice}</span>
          </div>
        </div>

        {/* Face B — architecture */}
        <div className={`${styles.face} ${styles.faceB}`} aria-hidden={!isArch}>
          <div className={`${styles.media} ${styles.schema}`}>
            <p className={styles.schemaRow}>
              <span className={styles.box}>{copy.schema_browser}</span>
              <span aria-hidden="true">→</span>
              <span className={styles.box}>{copy.schema_api}</span>
              <span aria-hidden="true">→</span>
              <span className={styles.box}>{copy.schema_db}</span>
            </p>
            <p className={styles.schemaRow}>
              <span className={styles.box}>{copy.schema_stripe}</span>
              <span>→ {copy.schema_webhook} →</span>
              <span className={styles.box}>{copy.schema_api}</span>
            </p>
          </div>
          <ul className={styles.mechanics}>
            <li className={styles.rowTitle}>
              <span className={styles.outline} style={{ width: '38%' }} />
              <span className={styles.leader} />
              <span className={styles.note}>{copy.arch_record}</span>
            </li>
            <li className={styles.rowPrice}>
              <span className={styles.outline} style={{ width: '30%' }} />
              <span className={styles.leader} />
              <span className={styles.note}>{copy.arch_price}</span>
            </li>
            <li className={styles.rowStock}>
              <span className={styles.outline} style={{ width: '38%' }} />
              <span className={styles.leader} />
              <span className={styles.note}>{copy.arch_stock}</span>
            </li>
            <li className={styles.rowPay}>
              <span className={`${styles.outline} ${styles.outlineFull}`}>
                <span className={styles.note}>{copy.arch_pay}</span>
              </span>
            </li>
            <li className={styles.rowInvoice}>
              <span className={styles.outline} style={{ width: '42%' }} />
              <span className={styles.leader} />
              <span className={styles.note}>{copy.arch_invoice}</span>
            </li>
          </ul>
        </div>

        <span className={styles.scan} aria-hidden="true" />
      </div>

      <figcaption className={styles.controls}>
        <button
          type="button"
          className={styles.toggle}
          aria-pressed={isArch}
          onClick={() => {
            if (timer.current) clearTimeout(timer.current)
            show(isArch ? 'interface' : 'architecture')
          }}
        >
          {isArch ? copy.show_interface : copy.show_architecture}
        </button>
        <span className={styles.hint}>{copy.hint}</span>
      </figcaption>
    </figure>
  )
}
