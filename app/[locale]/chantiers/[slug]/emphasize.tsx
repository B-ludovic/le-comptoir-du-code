import { Fragment, type ReactNode } from 'react'

/* Les textes des études de cas sont des chaînes brutes, donc rendus sans HTML —
   même principe que linkifyEmails pour les pages légales. Le gras y porte du
   sens : c'est la phrase que retient un lecteur qui balaie la page sans tout
   lire. On l'écrit **entre deux paires d'astérisques** dans les données, et il
   devient un <strong> au rendu. Pas de dangerouslySetInnerHTML : rien de ce qui
   vient des données ne peut se transformer en balise. */
const SPLIT_BOLD = /(\*\*[^*]+\*\*)/g

export function emphasize(text: string): ReactNode[] {
  return text.split(SPLIT_BOLD).map((part, index) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={index}>{part.slice(2, -2)}</strong>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    )
  )
}
