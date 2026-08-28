/* Les études de cas — un chantier raconté au long, sur sa propre adresse.
   Même principe de séparation que lib/projects.ts : les médias et les adresses
   d'un côté, les textes de l'autre, une entrée par langue. La page, le JSON-LD
   et le sitemap lisent tous cette table, donc un chantier ne peut pas annoncer
   ici une capture ou une URL que le fichier d'à côté dément.

   La carte de la page d'accueil reste la vitrine : trois phrases et un lien.
   C'est cette page-ci qui porte le récit complet, pour le lecteur qui veut
   descendre — recruteur, directeur technique, prospect méthodique. */

import { miabelangue } from './miabelangue'
import { auxPtitsPois } from './aux-ptits-pois'
import { fairyChairStudio } from './fairy-chair-studio'

export type Locale = 'fr' | 'en'

/* Cartouche d'identité : client, secteur, date, rôle, adresse. `href` n'est
   posé que sur la ligne qui mène quelque part. */
export type Fact = { label: string; value: string; href?: string }

/* « L'élève apprend » : le rôle porte l'accent, le verbe le suit. Les deux
   sont séparés parce que seul le premier est coloré au rendu. */
export type Persona = { role: string; verb: string; body: string }

export type Result = { value: string; label: string }
export type WorkshopItem = { title: string; body: string }

/* Tout chapitre s'ouvre pareil : sur-titre, titre, phrase calée à droite.
   C'est la grille éditoriale des sections de la page d'accueil. */
export type Chapter = { kicker: string; title: string; lead: string }

export type CaseContent = {
  metaTitle: string
  metaDescription: string
  /* Nature du chantier, affichée en sur-titre à côté du numéro. */
  kind: string
  status: string
  lede: string
  facts: Fact[]
  heroCaption: string
  /* Un alt par vignette mobile du montage d'ouverture, dans l'ordre de
     `hero.mobiles` : même jointure par position que `gallery.shots`. Absent
     quand le chantier n'ouvre pas sur un montage. */
  heroMobileAlts?: string[]
  back: string
  brief: Chapter & { body: string[] }
  personas: Chapter & { items: Persona[] }
  results: Chapter & { items: Result[] }
  /* `shots` suit l'ordre de `gallery` côté média : c'est la position qui fait
     la jointure, comme les puces numérotées des dictionnaires. */
  gallery: Chapter & { shots: { alt: string; caption: string }[] }
  /* `cite` reste possible pour une vraie attribution — un mot du client, une
     phrase de cahier des charges. Vide, le bloc se ferme sur sa citation :
     répéter le sur-titre du chapitre juste en dessous n'apprend rien. */
  challenge: Chapter & { quote: string; cite?: string }
  workshop: Chapter & { items: WorkshopItem[] }
  cta: { title: string; body: string; primary: string; secondary: string }
}

export type Shot = { src: string; width: number; height: number }

/* Média d'ouverture. Trois formes possibles, jamais deux à la fois : c'est le
   premier écran.

   `composite` est le montage — la capture desktop et, à côté, deux vignettes du
   même site sur téléphone. C'est la seule forme qui montre d'un coup d'œil
   qu'un chantier a été mené sur les deux tailles d'écran ; une capture desktop
   seule laisse la question ouverte.

   `image` reste pour un chantier dont une seule capture dit tout.

   Il y a eu une troisième forme, `video` : un défilement filmé de la vitrine,
   posé en `preload="none"` avec des contrôles. Le visiteur voyait donc une
   affiche fixe et devait cliquer pour lancer la lecture, ce que presque personne
   ne faisait — trois mégaoctets de rushes au service d'une image immobile. Le
   montage dit la même chose, tout de suite et pour cent fois moins lourd. */
export type HeroMedia =
  | { kind: 'composite'; desktop: Shot; mobiles: Shot[] }
  | { kind: 'image'; src: string; width: number; height: number }

export type CaseStudy = {
  /* Même slug que dans PROJECT_MEDIA : c'est lui qui relie la carte de la page
     d'accueil à cette page, et l'ancre au chapitre. */
  slug: string
  number: string
  hero: HeroMedia
  gallery: Shot[]
  stack: string[]
  content: Record<Locale, CaseContent>
}

/* Le registre. Un chantier absent d'ici n'a pas de page : sa carte reste une
   carte, sans lien vers nulle part. C'est volontaire — mieux vaut cinq cartes
   muettes qu'un lien qui promet une étude de cas inexistante. */
export const CASE_STUDIES: CaseStudy[] = [miabelangue, auxPtitsPois, fairyChairStudio]

/* L'image que le chantier montre à l'extérieur — Open Graph, Twitter, JSON-LD.
   Toujours une capture paysage : d'un montage on ne retient que le desktop, les
   vignettes de téléphone seraient illisibles une fois rognées au format d'une
   carte de partage. Passer par cette fonction plutôt que par un ternaire posé
   sur place évite qu'une quatrième variante de `HeroMedia` casse silencieusement
   deux fichiers éloignés. */
export function heroShareImage(hero: HeroMedia): string {
  return hero.kind === 'composite' ? hero.desktop.src : hero.src
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((study) => study.slug === slug)
}

export function getCaseStudySlugs(): string[] {
  return CASE_STUDIES.map((study) => study.slug)
}

export function hasCaseStudy(slug: string): boolean {
  return CASE_STUDIES.some((study) => study.slug === slug)
}

export function caseStudyPath(locale: string, slug: string): string {
  return `/${locale}/chantiers/${slug}`
}

export function contentFor(study: CaseStudy, rawLocale: string): CaseContent {
  return study.content[rawLocale === 'en' ? 'en' : 'fr']
}
