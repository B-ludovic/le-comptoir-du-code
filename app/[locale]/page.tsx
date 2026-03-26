export default  async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <main>
      {/* Header */}
      {/* <Header locale={locale} /> */}

      {/* Section 2 — Méthode */}
      {/* <Method locale={locale} /> */}

      {/* Section 3 — Solutions */}
      {/* <Solutions locale={locale} /> */}

      {/* Section 4 — Réalisations */}
      {/* <Portfolio locale={locale} /> */}

      {/* Section 5 — Le Codeur */}
      {/* <About locale={locale} /> */}

      {/* Section 6 — Contact */}
      {/* <Contact locale={locale} /> */}
    </main>
  )
}
