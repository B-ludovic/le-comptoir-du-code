'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import styles from './Header.module.css'

type Props = {
  locale: string
  nav: {
    method: string
    solutions: string
    portfolio: string
    about: string
    contact: string
  }
}

export default function Header({ locale, nav }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function switchLocale() {
    const next = locale === 'fr' ? 'en' : 'fr'
    const segments = pathname.split('/')
    segments[1] = next
    router.push(segments.join('/'))
  }

  const navLinks = [
    { href: '#method', label: nav.method },
    { href: '#solutions', label: nav.solutions },
    { href: '#portfolio', label: nav.portfolio },
    { href: '#about', label: nav.about },
    { href: '#contact', label: nav.contact },
  ]

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link href={`/${locale}`} className={styles.logo}>
          Le Comptoir du Code
        </Link>

        {/* Nav desktop */}
        <nav className={styles.nav}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions : langue + hamburger */}
        <div className={styles.actions}>
          <button
            className={styles.langSwitch}
            onClick={switchLocale}
            aria-label="Changer de langue"
          >
            <span className={locale === 'fr' ? styles.langActive : ''}>FR</span>
            <span className={styles.langSeparator}>|</span>
            <span className={locale === 'en' ? styles.langActive : ''}>EN</span>
          </button>

          <button
            className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Nav mobile */}
      <nav className={`${styles.mobileNav} ${menuOpen ? styles.mobileOpen : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={styles.mobileNavLink}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
