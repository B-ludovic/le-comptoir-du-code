import Header from '@/components/Header/Header'
import fr from '@/app/dictionaries/fr.json'
import en from '@/app/dictionaries/en.json'

const dictionaries = { fr, en }

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dict = dictionaries[locale as 'fr' | 'en']

  return (
    <main>
      <Header locale={locale} nav={dict.nav} />

      {/* Section 2 — Méthode */}
      {/* <Method locale={locale} dict={dict.method} /> */}

      {/* Section 3 — Solutions */}
      {/* <Solutions locale={locale} dict={dict.solutions} /> */}

      {/* Section 4 — Réalisations */}
      {/* <Portfolio locale={locale} dict={dict.portfolio} /> */}

      {/* Section 5 — Le Codeur */}
      {/* <About locale={locale} dict={dict.about} /> */}

      {/* Section 6 — Contact */}
      {/* <Contact locale={locale} dict={dict.contact} /> */}
    </main>
  )
}