import { Suspense } from 'react'
import { reviewsJsonLd } from '@/lib/structured-data'
import { TESTIMONIALS, REVIEWS_SOURCE, REVIEWS_SOURCE_NAME } from '@/lib/testimonials'
import Header from '@/components/Header/Header'
import Hero from '@/components/Sections/Hero/Hero'
import Build from '@/components/Sections/Build/Build'
import Method from '@/components/Sections/Method/Method'
import Portfolio from '@/components/Sections/Portfolio/Portfolio'
import Testimonials from '@/components/Sections/Testimonials/Testimonials'
import About from '@/components/Sections/About/About'
import Contact from '@/components/Sections/Contact/Contact'
import Footer from '@/components/Footer/Footer'
import ScrollToHash from '@/components/ScrollToHash/ScrollToHash'
import RevealController from '@/components/Reveal/RevealController'
import fr from '@/app/dictionaries/fr.json'
import en from '@/app/dictionaries/en.json'

const dictionaries = { fr, en }

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const dict = dictionaries[locale as 'fr' | 'en'] ?? dictionaries.fr

  return (
    <main>
      <Header locale={locale} nav={dict.nav} />
      <ScrollToHash />
      <RevealController />
      {/* Les avis sont déclarés là où ils sont affichés : la section
          Testimonials, plus bas sur cette page. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            reviewsJsonLd(TESTIMONIALS, locale, {
              url: REVIEWS_SOURCE,
              name: REVIEWS_SOURCE_NAME,
            }),
          ),
        }}
      />
      {/* Section 1 — Accroche. Porte le H1, visible : le titre le plus lourd de
          la page ne peut pas être celui que personne ne voit. */}
      <Hero dict={dict.hero} />

      {/* Section 2 — Ce que je construis : trois familles, aucun prix */}
      <Build
        dict={dict.build}
        items={[
          {
            title: dict.build.item1_title,
            text: dict.build.item1_text,
            link: { label: dict.build.item1_link, href: '#muse' },
          },
          {
            title: dict.build.item2_title,
            text: dict.build.item2_text,
            link: { label: dict.build.item2_link, href: '#fairy-chair-studio' },
          },
          {
            title: dict.build.item3_title,
            text: dict.build.item3_text,
            link: { label: dict.build.item3_link, href: '#la-requeyrie' },
          },
        ]}
      />

      {/* Section 3 — Méthodologie : cadrage (étape 01), construction (02),
          mise en service (03). Remplace Méthode, Cadrage et Solutions. */}
      <Method locale={locale} dict={dict.method} />

      {/* Section 4 — Réalisations */}
      <Portfolio locale={locale} dict={dict.portfolio} />

      {/* Avis clients, fixes : ce sont eux que déclare le JSON-LD ci-dessus. */}
      <Testimonials locale={locale} dict={dict.testimonials} />

      {/* Section 5 — Le Codeur */}
      <About dict={dict.about} />

      {/* Section 6 — Contact + Footer */}
      <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
        <Suspense>
          <Contact dict={dict.contact} locale={locale} />
        </Suspense>
        <Footer locale={locale} dict={dict.footer} />
      </div>
    </main>
  )
}
