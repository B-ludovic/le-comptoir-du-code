import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import styles from './Article.module.css'
import fr from '@/app/dictionaries/fr.json'
import en from '@/app/dictionaries/en.json'
import { getPost, getPostSlugs } from '@/lib/blog'

const BASE_URL = 'https://lechoppeducode.com'
const dictionaries = { fr, en }

export const dynamicParams = true

/* Coût assumé du nonce : une page mise en cache sert le HTML tel qu'il a été
   rendu la première fois, nonce compris, alors que le middleware pose un
   nonce neuf à chaque requête. Les deux ne concordent plus dès le second
   appel et le navigateur bloque tous les scripts de la page.
   Les articles sont donc rendus à la demande. */
export const dynamic = 'force-dynamic'

export async function generateStaticParams({
  params,
}: {
  params: { locale: string }
}) {
  const locales = params?.locale ? [params.locale] : ['fr', 'en']
  return locales.flatMap((locale) =>
    getPostSlugs(locale).map((slug) => ({ slug }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const post = getPost(slug, locale)
  if (!post) return {}
  return {
    title: `${post.title} | L'Echoppe du Code`,
    description: post.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog/${slug}`,
      languages: {
        fr: `${BASE_URL}/fr/blog/${locale === 'fr' ? slug : (post.alternate_slug ?? slug)}`,
        en: `${BASE_URL}/en/blog/${locale === 'en' ? slug : (post.alternate_slug ?? slug)}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      url: `${BASE_URL}/${locale}/blog/${slug}`,
    },
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const dict = dictionaries[locale as 'fr' | 'en'] ?? dictionaries.fr
  const isFr = locale !== 'en'
  const post = getPost(slug, locale)

  if (!post) notFound()

  const altLocale = locale === 'fr' ? 'en' : 'fr'
  const altSlug = post.alternate_slug ?? slug
  const switchLocaleHref = `/${altLocale}/blog/${altSlug}`

  return (
    <>
      <Header locale={locale} nav={dict.nav} switchLocaleHref={switchLocaleHref} />
      <main className={styles.main}>
        <div className="container">

          <a href={`/${locale}/blog`} className={styles.back}>
            ← {isFr ? 'Retour au carnet' : 'Back to journal'}
          </a>

          <article className={styles.article}>
            <header className={styles.header}>
              <time className={styles.date}>
                {new Date(post.date).toLocaleDateString(isFr ? 'fr-FR' : 'en-GB', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <h1 className={styles.title}>{post.title}</h1>
              <p className={styles.description}>{post.description}</p>
              {post.coverImage && (
                <div className={styles.coverWrapper}>
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 720px"
                    className={styles.coverImage}
                  />
                </div>
              )}
            </header>

            <div className={styles.content}>
              <MDXRemote source={post.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
            </div>
          </article>

        </div>
      </main>
      <Footer locale={locale} dict={dict.footer} />
    </>
  )
}
