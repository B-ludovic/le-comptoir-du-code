'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaLinkedin, FaGithub, FaReact } from 'react-icons/fa'
import styles from './Footer.module.css'

type Props = {
  locale: string
  dict: {
    copyright: string
    faq: string
    legal: string
    privacy: string
    cookies: string
    cgp_scoping: string
    cgps: string
  }
}

export default function Footer({ locale, dict }: Props) {
  const pathname = usePathname()

  const legalLinks = [
    { href: `/${locale}/faq`, label: dict.faq },
    { href: `/${locale}/mentions-legales`, label: dict.legal },
    { href: `/${locale}/politique-de-confidentialite`, label: dict.privacy },
    { href: `/${locale}/gestion-des-cookies`, label: dict.cookies },
    { href: `/${locale}/conditions-generales`, label: dict.cgps },
    { href: `/${locale}/conditions-cadrage`, label: dict.cgp_scoping },
  ]

  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        <div className={styles.inner}>

          <p className={styles.copyright}>{dict.copyright}</p>

          <nav className={styles.legalLinks}>
            {legalLinks.map((link, i) => (
              <Fragment key={link.href}>
                {i > 0 && <span className={styles.sep}>—</span>}
                <Link
                  href={link.href}
                  className={pathname === link.href ? styles.legalLinkActive : ''}
                >
                  {link.label}
                </Link>
              </Fragment>
            ))}
          </nav>

          <div className={styles.social}>
            <a
              href="https://www.linkedin.com/in/ludovic-bataille-2a8aa0371/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href="https://github.com/B-ludovic"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="https://b-ludovic.dev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Portfolio React"
            >
              <FaReact size={18} />
            </a>
          </div>

        </div>
      </div>
    </footer>
  )
}
