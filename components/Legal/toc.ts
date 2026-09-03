/* Les titres d'articles sont de la forme « 7 bis. Intégrité du livrable » ou
   « 7b. Integrity of the Deliverable ». Le numéro qui précède le premier
   point sert d'ancre : stable d'une version à l'autre tant que la
   numérotation ne bouge pas, et lisible dans l'URL (#article-7-bis). */
export type TocItem = {
  id: string
  number: string
  label: string
}

export function articleId(title: string): string {
  const number = title.split('.')[0].trim().toLowerCase()
  return `article-${number.replace(/\s+/g, '-')}`
}

export function tocItems(articles: { title: string }[]): TocItem[] {
  return articles.map(({ title }) => {
    const dot = title.indexOf('.')
    return {
      id: articleId(title),
      number: title.slice(0, dot).trim(),
      label: title.slice(dot + 1).trim(),
    }
  })
}
