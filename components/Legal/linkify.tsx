import { Fragment, type ReactNode } from 'react'

/* Les textes légaux sont stockés en chaînes brutes, donc rendus sans HTML.
   On transforme ici les adresses email en liens mailto au moment du rendu.
   Le motif de domaine impose au moins un point entre deux groupes de
   caractères-mots, ce qui évite d'avaler la ponctuation de fin de phrase
   (« …@lechoppeducode.com. » ne capture pas le point final). */
const SPLIT_EMAIL = /([\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g
const IS_EMAIL = /^[\w.+-]+@[\w-]+(?:\.[\w-]+)+$/

export function linkifyEmails(text: string): ReactNode[] {
  return text.split(SPLIT_EMAIL).map((part, index) =>
    IS_EMAIL.test(part) ? (
      <a key={index} href={`mailto:${part}`}>
        {part}
      </a>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    )
  )
}
