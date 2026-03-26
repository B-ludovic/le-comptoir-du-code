import Link from 'next/link'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import styles from './Footer.module.css'

type Props = {
  locale: string
  dict: {
    copyright: string
    legal: string
    privacy: string
    cookies: string
    cgps: string
  }
}

export default function Footer({ locale, dict }: Props) {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>

          <p className={styles.copyright}>{dict.copyright}</p>

          <nav className={styles.legalLinks}>
            <Link href={`/${locale}/mentions-legales`}>{dict.legal}</Link>
            <span className={styles.sep}>—</span>
            <Link href={`/${locale}/politique-de-confidentialite`}>{dict.privacy}</Link>
            <span className={styles.sep}>—</span>
            <Link href={`/${locale}/gestion-des-cookies`}>{dict.cookies}</Link>
            <span className={styles.sep}>—</span>
            <Link href={`/${locale}/conditions-generales`}>{dict.cgps}</Link>
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
          </div>

        </div>
      </div>
    </footer>
  )
}
