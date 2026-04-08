import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
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
        fr: `${BASE_URL}/fr/blog/${slug}`,
        en: `${BASE_URL}/en/blog/${slug}`,
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

  return (
    <>
      <Header locale={locale} nav={dict.nav} />
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
