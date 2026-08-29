'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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

/* La révélation radiale du panneau prend ~850 ms depuis le burger ; les liens
   n'entrent en scène qu'une fois le voile posé (REVEAL_MS), puis se suivent
   toutes les STAGGER_MS. Le pied ferme la marche. */
const REVEAL_MS = 280
const STAGGER_MS = 80

export default function Header({ locale, nav, switchLocaleHref }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const pathname = usePathname()
  const router = useRouter()

  const panelRef = useRef<HTMLDivElement>(null)
  const burgerRef = useRef<HTMLButtonElement>(null)

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

  /* Le panneau recouvre la page mais le hamburger lui reste devant : c'est la
     seule poignée pour refermer. Il fait donc partie de la boucle du piège à
     focus, sans quoi on tournerait dans un panneau dont on ne peut plus sortir
     au clavier. Échap referme et rend le focus à cette poignée. */
  useEffect(() => {
    if (!menuOpen) return
    const panel = panelRef.current
    if (!panel) return

    const inPanel = Array.from(
      panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
    )
    const loop = burgerRef.current ? [...inPanel, burgerRef.current] : inPanel
    inPanel[0]?.focus()

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        burgerRef.current?.focus()
        return
      }
      if (e.key !== 'Tab' || loop.length === 0) return
      const first = loop[0]
      const last = loop[loop.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }

    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [menuOpen])

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
            <span className={styles.logoTop}>L&apos;ÉCHOPPE</span>
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
        <a
          href={`/${locale}/echoppe-solidaire`}
          className={`${styles.portraitMedallion} ${menuOpen ? styles.portraitMuted : ''}`}
          aria-label="L'Échoppe Solidaire — tarification associative"
          aria-hidden={menuOpen}
          tabIndex={menuOpen ? -1 : undefined}
        >
          {/* Le fichier source fait 768 × 1024 pour un médaillon de 32 px :
              servi tel quel, c'était 128 Ko sur chaque page du site. Passé à
              l'optimiseur, il en pèse deux ou trois. `sizes` dit la taille
              réelle d'affichage, sans quoi Next préparerait des variantes de
              la largeur de l'écran. */}
          <Image
            src="/ludovic.jpeg"
            alt="Ludovic — L'Échoppe du Code"
            width={32}
            height={32}
            sizes="32px"
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

          {/* Le burger devient une cible ronde de 42 px : trois traits qui se
              croisent en X, et un anneau cuivré qui s'allume à l'ouverture —
              c'est aussi le point d'origine de la révélation du panneau. */}
          <button
            ref={burgerRef}
            className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-panel"
          >
            <span className={styles.hamburgerRing} />
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
          </button>
        </div>
      </div>

      {/* Panneau mobile. Les délais sont posés en inline parce qu'ils dépendent
          du rang du lien ; le bloc « mouvement réduit » de la feuille les annule
          d'un transition-delay: 0s !important, qui ne pourrait pas gagner contre
          un style inline sans ce !important. */}
      <div
        id="mobile-panel"
        ref={panelRef}
        className={`${styles.mobilePanel} ${menuOpen ? styles.mobileOpen : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav className={styles.mobileNav}>
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className={`${styles.mobileNavLink} ${activeSection === link.section ? styles.mobileNavLinkActive : ''}`}
              style={{ transitionDelay: menuOpen ? `${REVEAL_MS + i * STAGGER_MS}ms` : '0ms' }}
              onClick={() => setMenuOpen(false)}
            >
              <span className={styles.mobileNavIndex}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.mobileNavLabel}>{link.label}</span>
            </a>
          ))}
        </nav>

        <div
          className={styles.mobileFooter}
          style={{ transitionDelay: menuOpen ? `${REVEAL_MS + navLinks.length * STAGGER_MS}ms` : '0ms' }}
        >
          <button
            className={styles.mobileLangSwitch}
            onClick={switchLocale}
            aria-label="Changer de langue"
          >
            <span className={locale === 'fr' ? styles.langActive : ''}>FR</span>
            <span className={styles.langSeparator}>|</span>
            <span className={locale === 'en' ? styles.langActive : ''}>EN</span>
          </button>

          <a
            href={`/${locale}/echoppe-solidaire`}
            className={styles.mobileSolidaire}
            onClick={() => setMenuOpen(false)}
          >
            L&apos;Échoppe Solidaire
          </a>
        </div>
      </div>
    </header>
  )
}
