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
  const [activeSection, setActiveSection] = useState('')
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const ids = ['method', 'solutions', 'portfolio', 'about', 'contact']
    const observers: IntersectionObserver[] = []

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
            window.history.replaceState(null, '', `#${id}`)
          }
        },
        { threshold: 0.4 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  function switchLocale() {
    const next = locale === 'fr' ? 'en' : 'fr'
    const segments = pathname.split('/')
    segments[1] = next
    router.push(segments.join('/'))
  }

  const navLinks = [
    { href: `/${locale}#method`, label: nav.method, section: 'method' },
    { href: `/${locale}#solutions`, label: nav.solutions, section: 'solutions' },
    { href: `/${locale}#portfolio`, label: nav.portfolio, section: 'portfolio' },
    { href: `/${locale}#about`, label: nav.about, section: 'about' },
    { href: `/${locale}#contact`, label: nav.contact, section: 'contact' },
  ]

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link href={`/${locale}`} className={styles.logo}>
          <span className={styles.logoMark}>C/C</span>
          <span className={styles.logoText}>
            <span className={styles.logoTop}>LE COMPTOIR</span>
            <span className={styles.logoBottom}>du Code</span>
          </span>
        </Link>

        {/* Nav desktop */}
        <nav className={styles.nav}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${activeSection === link.section ? styles.navLinkActive : ''}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Portrait */}
        <div className={styles.portraitMedallion}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ludovic.jpeg"
            alt="Ludovic — Le Comptoir du Code"
            width={32}
            height={32}
            className={styles.portraitImage}
          />
        </div>

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
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Nav mobile */}
      <nav id="mobile-nav" className={`${styles.mobileNav} ${menuOpen ? styles.mobileOpen : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`${styles.mobileNavLink} ${activeSection === link.section ? styles.mobileNavLinkActive : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Overlay blur */}
      {menuOpen && (
        <div className={styles.overlay} onClick={() => setMenuOpen(false)} />
      )}
    </header>
  )
}
