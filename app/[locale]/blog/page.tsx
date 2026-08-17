import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import styles from './Blog.module.css'
import fr from '@/app/dictionaries/fr.json'
import en from '@/app/dictionaries/en.json'
import { getAllPosts } from '@/lib/blog'

const BASE_URL = 'https://lechoppeducode.com'
const dictionaries = { fr, en }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale !== 'en'
  return {
    title: isFr
      ? "Blog — Conseils Web & Développement | L'Echoppe du Code"
      : "Blog — Web Tips & Development | L'Echoppe du Code",
    description: isFr
      ? "Articles pratiques sur la création de site internet, le choix entre freelance et plateforme, et les coulisses du développement web sur-mesure."
      : "Practical articles about website creation, choosing between freelance and platforms, and the ins and outs of custom web development.",
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog`,
      languages: {
        fr: `${BASE_URL}/fr/blog`,
        en: `${BASE_URL}/en/blog`,
        'x-default': `${BASE_URL}/fr/blog`,
      },
    },
  }
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dict = dictionaries[locale as 'fr' | 'en'] ?? dictionaries.fr
  const isFr = locale !== 'en'
  const posts = getAllPosts(locale)

  return (
    <>
      <Header locale={locale} nav={dict.nav} />
      <main className={styles.main}>
        <div className="container">

          <a href={`/${locale}`} className={styles.back}>
            ← {isFr ? 'Retour' : 'Back'}
          </a>

          <h1 className={styles.title}>
            {isFr ? 'Le carnet de l\'échoppe' : 'The Workshop Journal'}
          </h1>
          <p className={styles.subtitle}>
            {isFr
              ? 'Des articles sans jargon sur le web, l\'artisanat numérique, et les vraies questions à se poser avant de commander un site.'
              : 'Plain-language articles on the web, digital craftsmanship, and the real questions to ask before commissioning a website.'}
          </p>

          {posts.length === 0 ? (
            <p className={styles.empty}>
              {isFr ? 'Les premiers articles arrivent bientôt.' : 'First articles coming soon.'}
            </p>
          ) : (
            <ul className={styles.list}>
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/${locale}/blog/${post.slug}`} className={styles.card}>
                    <time className={styles.date}>
                      {new Date(post.date).toLocaleDateString(isFr ? 'fr-FR' : 'en-GB', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <h2 className={styles.cardTitle}>{post.title}</h2>
                    <p className={styles.excerpt}>{post.excerpt}</p>
                    <span className={styles.readMore}>
                      {isFr ? 'Lire l\'article →' : 'Read article →'}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

        </div>
      </main>
      <Footer locale={locale} dict={dict.footer} />
    </>
  )
}
