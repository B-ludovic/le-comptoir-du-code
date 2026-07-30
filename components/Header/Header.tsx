'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import styles from './Header.module.css'

type Props = {
  locale: string
  nav: {
    method: string
    scoping: string
    solutions: string
    portfolio: string
    about: string
    contact: string
    blog: string
  }
  switchLocaleHref?: string
}

export default function Header({ locale, nav, switchLocaleHref }: Props) {
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
    const ids = ['method', 'cadrage', 'solutions', 'portfolio', 'about', 'contact']
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
        { threshold: 0, rootMargin: '0px 0px -50% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  function switchLocale() {
    if (switchLocaleHref) {
      router.push(switchLocaleHref)
      return
    }
    const next = locale === 'fr' ? 'en' : 'fr'
    const segments = pathname.split('/')
    segments[1] = next
    router.push(segments.join('/'))
  }

  const navLinks = [
    { href: `/${locale}#method`, label: nav.method, section: 'method' },
    { href: `/${locale}#cadrage`, label: nav.scoping, section: 'cadrage' },
    { href: `/${locale}#solutions`, label: nav.solutions, section: 'solutions' },
    { href: `/${locale}#portfolio`, label: nav.portfolio, section: 'portfolio' },
    { href: `/${locale}#about`, label: nav.about, section: 'about' },
    { href: `/${locale}#contact`, label: nav.contact, section: 'contact' },
    { href: `/${locale}/blog`, label: nav.blog, section: 'blog' },
  ]

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        {/* Logo */}
        <Link href={`/${locale}`} className={styles.logo}>
          <span className={styles.logoMark}>E/C</span>
          <span className={styles.logoText}>
            <span className={styles.logoTop}>L&apos;ECHOPPE</span>
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

        {/* Portrait — lien vers L'Échoppe Solidaire */}
        <a href={`/${locale}/echoppe-solidaire`} className={styles.portraitMedallion} aria-label="L'Échoppe Solidaire — tarification associative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ludovic.jpeg"
            alt="Ludovic — L'Echoppe du Code"
            width={32}
            height={32}
            className={styles.portraitImage}
          />
          <span className={styles.portraitTooltip}>
            {locale === 'fr' ? 'Vous êtes une association ?' : 'Are you a non-profit?'}
          </span>
        </a>

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
