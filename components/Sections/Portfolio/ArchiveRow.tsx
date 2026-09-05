'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './ArchiveRow.module.css'
import type { Project } from '@/lib/projects'

type Props = {
  project: Project
  statusLabel: string
  labels: {
    builds: string
    features: string
    challenge: string
    openSite: string
    openRepo: string
    toggle: string
  }
}

/* Ligne d'archive dépliable.

   Le détail n'est pas monté à l'ouverture : il est là depuis le premier rendu,
   replié par une transition sur `grid-template-rows` (0fr → 1fr), comme la FAQ
   de l'Échoppe Solidaire. Deux raisons : un moteur — ou un moteur génératif —
   lit le texte sans avoir à cliquer, et la hauteur s'anime sans qu'on ait à la
   mesurer en JavaScript. */
export default function ArchiveRow({ project, statusLabel, labels }: Props) {
  const [open, setOpen] = useState(false)
  const href = project.url ?? project.repo ?? null
  const linkLabel = project.url ? labels.openSite : labels.openRepo

  return (
    <div id={project.slug} className={styles.row}>
      <button
        type="button"
        className={styles.summary}
        aria-expanded={open}
        aria-controls={`${project.slug}-detail`}
        onClick={() => setOpen((value) => !value)}
      >
        <span className={styles.thumb}>
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            sizes="180px"
            className={styles.thumbImage}
          />
        </span>

        <span className={styles.identity}>
          <span className={styles.number}>
            {project.number}
            <span className={styles.metaRule} aria-hidden="true" />
            <span className={styles.status}>{statusLabel}</span>
          </span>
          <span className={styles.title}>{project.title}</span>
          <span className={styles.stack}>{project.stack}</span>
        </span>

        <span className={styles.trailing}>
          {project.statValue && project.statLabel && (
            <span className={styles.stat}>
              <span className={styles.statValue}>{project.statValue}</span>
              <span className={styles.statLabel}>{project.statLabel}</span>
            </span>
          )}
          <span className={styles.sign} aria-hidden="true">
            {open ? '−' : '+'}
          </span>
          <span className="sr-only">{labels.toggle}</span>
        </span>
      </button>

      <div
        id={`${project.slug}-detail`}
        className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`}
      >
        <div className={styles.drawerClip}>
          <div className={styles.detail}>
            <div className={styles.detailLeft}>
              <p className={styles.desc}>{project.desc}</p>

              {project.challenge && (
                <div className={styles.challenge}>
                  <p className={styles.label}>{labels.challenge}</p>
                  <p className={styles.challengeText}>{project.challenge}</p>
                </div>
              )}

              {project.features.length > 0 && (
                <div>
                  <p className={styles.label}>{labels.features}</p>
                  <p className={styles.features}>{project.features.join(' · ')}</p>
                </div>
              )}

              {href && (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  {linkLabel}
                  <span aria-hidden="true"> →</span>
                </a>
              )}
            </div>

            {project.builds.length > 0 && (
              <div>
                <p className={styles.label}>{labels.builds}</p>
                <ul className={styles.buildsList}>
                  {project.builds.map((build) => (
                    <li key={build} className={styles.buildItem}>
                      {build}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
