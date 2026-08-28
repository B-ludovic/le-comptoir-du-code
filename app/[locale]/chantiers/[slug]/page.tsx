import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import styles from './CaseStudy.module.css'
import { emphasize } from './emphasize'
import fr from '@/app/dictionaries/fr.json'
import en from '@/app/dictionaries/en.json'
import { getCaseStudy, getCaseStudySlugs, contentFor } from '@/lib/case-studies'
import { PROJECT_MEDIA } from '@/lib/projects'
import { BASE_URL, caseStudyJsonLd, breadcrumbJsonLd } from '@/lib/structured-data'

const dictionaries = { fr, en }

export const dynamicParams = true

/* Même raison que les articles du Carnet : le middleware pose un nonce neuf à
   chaque requête, une page mise en cache servirait celui du premier rendu, et
   le navigateur bloquerait tous les scripts dès le second appel. */
export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const study = getCaseStudy(slug)
  if (!study) return {}

  const content = contentFor(study, locale)
  const url = `${BASE_URL}/${locale}/chantiers/${slug}`
  /* Le slug est un nom propre : il ne se traduit pas, donc les deux versions
     partagent la même adresse à la locale près. */
  const image = `${BASE_URL}${
    study.hero.kind === 'image' ? study.hero.src : study.hero.poster
  }`

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    authors: [{ name: 'Ludovic BATAILLE' }],
    alternates: {
      canonical: url,
      languages: {
        fr: `${BASE_URL}/fr/chantiers/${slug}`,
        en: `${BASE_URL}/en/chantiers/${slug}`,
        'x-default': `${BASE_URL}/fr/chantiers/${slug}`,
      },
    },
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      siteName: "L'Échoppe du Code",
      locale: locale === 'en' ? 'en_US' : 'fr_FR',
      type: 'article',
      url,
      images: [{ url: image, width: 1200, height: 630, alt: content.metaTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.metaTitle,
      description: content.metaDescription,
      images: [image],
    },
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const dict = dictionaries[locale as 'fr' | 'en'] ?? dictionaries.fr
  const isFr = locale !== 'en'
  const study = getCaseStudy(slug)

  if (!study) notFound()

  const content = contentFor(study, locale)
  const media = PROJECT_MEDIA.find((project) => project.slug === slug)
  const altLocale = isFr ? 'en' : 'fr'

  const jsonLd = [
    caseStudyJsonLd(study, content, locale, media?.url ?? null),
    breadcrumbJsonLd([
      { name: isFr ? 'Accueil' : 'Home', path: `/${locale}` },
      { name: isFr ? 'Réalisations' : 'Selected work', path: `/${locale}#portfolio` },
      { name: content.facts[0]?.value ?? slug, path: `/${locale}/chantiers/${slug}` },
    ]),
  ]

  /* Numéro de chapitre affiché en filigrane. Il court d'un bloc à l'autre :
     ce n'est pas une donnée, c'est de la mise en page. */
  let chapter = 0
  const nextNumber = () => String(++chapter).padStart(2, '0')

  return (
    <>
      {/* Bloc de données, pas de script : type="application/ld+json" échappe à
          la directive script-src, donc pas de nonce à poser. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header
        locale={locale}
        nav={dict.nav}
        switchLocaleHref={`/${altLocale}/chantiers/${slug}`}
      />

      <main className={styles.main}>
        <div className="container">
          <a href={`/${locale}#portfolio`} className={styles.back}>
            ← {content.back}
          </a>

          {/* ── Ouverture ─────────────────────────────────────────────── */}
          <div className={styles.hero}>
            <p className={styles.eyebrow}>
              <span>
                {isFr ? 'Chantier' : 'Project'} {study.number}
              </span>
              <span className={styles.eyebrowRule} aria-hidden="true" />
              <span className={styles.eyebrowKind}>{content.kind}</span>
              <span className={styles.badge}>{content.status}</span>
            </p>

            <h1 className={styles.title}>{content.facts[0]?.value ?? slug}</h1>
            <p className={styles.lede}>{content.lede}</p>

            <dl className={styles.facts}>
              {content.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>
                    {fact.href ? (
                      <a href={fact.href} target="_blank" rel="noopener noreferrer">
                        {fact.value}
                      </a>
                    ) : (
                      fact.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <figure className={styles.shot}>
              <div className={styles.chrome} aria-hidden="true">
                <i /><i /><i />
              </div>
              {study.hero.kind === 'video' ? (
                /* Lecture au clic, jamais automatique : pas d'octet dépensé
                   sans geste du visiteur, et rien qui bouge tout seul pour qui
                   a demandé moins d'animation. Le WebM passe en premier — le
                   navigateur retient la première source qu'il sait lire, et
                   VP9 pèse un tiers de moins que H.264. */
                <video
                  className={styles.video}
                  controls
                  muted
                  playsInline
                  loop
                  preload="none"
                  poster={study.hero.poster}
                  aria-label={content.heroCaption}
                >
                  <source src={study.hero.webm} type="video/webm" />
                  <source src={study.hero.mp4} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={study.hero.src}
                  alt={content.heroCaption}
                  width={study.hero.width}
                  height={study.hero.height}
                  sizes="(max-width: 1200px) 100vw, 1136px"
                  priority
                />
              )}
              <figcaption>{content.heroCaption}</figcaption>
            </figure>
          </div>

          {/* ── La commande ───────────────────────────────────────────── */}
          <section className={styles.chapter}>
            <span className={styles.ghost} aria-hidden="true">{nextNumber()}</span>
            <div className={styles.chapterHead}>
              <div>
                <span className={styles.kicker}>{content.brief.kicker}</span>
                <h2>{content.brief.title}</h2>
              </div>
              <p className={styles.lead}>{content.brief.lead}</p>
            </div>
            <div className={styles.prose}>
              {content.brief.body.map((paragraph, index) => (
                <p key={index}>{emphasize(paragraph)}</p>
              ))}
            </div>
          </section>

          {/* ── Trois personnes ───────────────────────────────────────── */}
          <section className={styles.chapter}>
            <span className={styles.ghost} aria-hidden="true">{nextNumber()}</span>
            <div className={styles.chapterHead}>
              <div>
                <span className={styles.kicker}>{content.personas.kicker}</span>
                <h2>{content.personas.title}</h2>
              </div>
              <p className={styles.lead}>{content.personas.lead}</p>
            </div>
            <div className={styles.trio}>
              {content.personas.items.map((persona) => (
                <article key={persona.role} className={styles.persona}>
                  <h3>
                    <span>{persona.role}</span> {persona.verb}
                  </h3>
                  <p>{emphasize(persona.body)}</p>
                </article>
              ))}
            </div>
          </section>

          {/* ── Le résultat ───────────────────────────────────────────── */}
          <section className={styles.chapter}>
            <span className={styles.ghost} aria-hidden="true">{nextNumber()}</span>
            <div className={styles.chapterHead}>
              <div>
                <span className={styles.kicker}>{content.results.kicker}</span>
                <h2>{content.results.title}</h2>
              </div>
              <p className={styles.lead}>{content.results.lead}</p>
            </div>
            <div className={styles.results}>
              {content.results.items.map((result) => (
                <p key={result.label} className={styles.result}>
                  <span className={styles.resultValue}>{result.value}</span>
                  <span className={styles.resultLabel}>{result.label}</span>
                </p>
              ))}
            </div>
          </section>

          {/* ── En images ─────────────────────────────────────────────── */}
          <section className={styles.chapter}>
            <span className={styles.ghost} aria-hidden="true">{nextNumber()}</span>
            <div className={styles.chapterHead}>
              <div>
                <span className={styles.kicker}>{content.gallery.kicker}</span>
                <h2>{content.gallery.title}</h2>
              </div>
              <p className={styles.lead}>{content.gallery.lead}</p>
            </div>
            <div className={styles.gallery}>
              {study.gallery.map((shot, index) => {
                const text = content.gallery.shots[index]
                if (!text) return null
                return (
                  <figure key={shot.src} className={styles.shot}>
                    <div className={styles.chrome} aria-hidden="true">
                      <i /><i /><i />
                    </div>
                    <Image
                      src={shot.src}
                      alt={text.alt}
                      width={shot.width}
                      height={shot.height}
                      sizes="(max-width: 1200px) 100vw, 1136px"
                    />
                    <figcaption>{text.caption}</figcaption>
                  </figure>
                )
              })}
            </div>
          </section>

          {/* ── Le nœud du chantier ───────────────────────────────────── */}
          <section className={styles.chapter}>
            <span className={styles.ghost} aria-hidden="true">{nextNumber()}</span>
            <div className={styles.chapterHead}>
              <div>
                <span className={styles.kicker}>{content.challenge.kicker}</span>
                <h2>{content.challenge.title}</h2>
              </div>
              <p className={styles.lead}>{content.challenge.lead}</p>
            </div>
            <blockquote className={styles.challenge}>
              <p>{content.challenge.quote}</p>
              {content.challenge.cite && <cite>{content.challenge.cite}</cite>}
            </blockquote>
          </section>
        </div>

        {/* ── Sous le capot ───────────────────────────────────────────────
            La bande s'éclaire d'un cran au lieu de s'assombrir : sur un fond
            déjà sombre, descendre encore reviendrait à disparaître. */}
        <div className={styles.workshop}>
          <div className="container">
            <section className={styles.chapter}>
              <span className={styles.ghost} aria-hidden="true">{nextNumber()}</span>
              <div className={styles.chapterHead}>
                <div>
                  <span className={styles.kicker}>{content.workshop.kicker}</span>
                  <h2>{content.workshop.title}</h2>
                </div>
                <p className={styles.lead}>{content.workshop.lead}</p>
              </div>

              <div className={styles.stack} aria-label={isFr ? 'Technologies' : 'Technologies'}>
                {study.stack.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>

              <div className={styles.workshopGrid}>
                {content.workshop.items.map((item) => (
                  <div key={item.title} className={styles.workshopItem}>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* ── Appel ─────────────────────────────────────────────────────── */}
        <div className="container">
          <div className={styles.cta}>
            <h2>{content.cta.title}</h2>
            <p>{content.cta.body}</p>
            <a className={styles.btn} href={`/${locale}?budget=cadrage#contact`}>
              {content.cta.primary}
            </a>
            <span className={styles.ctaAlt}>
              <a href={`/${locale}#portfolio`}>{content.cta.secondary} →</a>
            </span>
          </div>
        </div>
      </main>

      <Footer locale={locale} dict={dict.footer} />
    </>
  )
}
