/* Les chantiers du portfolio, en un seul endroit — même principe que la grille
   tarifaire de lib/pricing.ts. Les textes vivent dans les dictionnaires sous
   portfolio.project{n}_*, les médias et les adresses vivent ici. La section
   Réalisations, le JSON-LD et le llms.txt lisent tous les trois cette table :
   une mise en ligne, une fermeture ou un changement de domaine ne se corrige
   donc qu'à un seul endroit, au lieu de laisser une page annoncer une adresse
   que le fichier d'à côté dément. */

export type ProjectMedia = {
  /* Ancre du chantier dans la page d'accueil. Elle sert deux fois : à l'attribut
     id du bloc HTML, et à l'@id de l'entité JSON-LD — un identifiant qui ne
     pointe vers rien de réel n'apprend rien à un moteur. */
  slug: string
  images: string[]
  /* Adresse du site en production. `null` quand le chantier n'est plus servi :
     déclarer une URL morte revient à faire indexer une erreur. */
  url: string | null
  /* Code public, quand il existe. Ce n'est pas l'adresse du produit : un dépôt
     déclaré comme `url` ferait de github.com le site du projet. */
  repo?: string
  status: 'online' | 'archived'
  /* Chantiers mis en avant : ceux qu'un prospect ou un moteur peut ouvrir et
     parcourir aujourd'hui. Ils passent en tête de liste et sont les seuls
     détaillés dans le llms.txt. */
  flagship?: boolean
}

export const PROJECT_MEDIA: ProjectMedia[] = [
  {
    slug: 'miabelangue',
    images: [
      '/images/accueil-miabe.png',
      '/images/inscription-miabe.png',
      '/images/onboarding-miabe.png',
      '/images/admin-miabe.png',
    ],
    url: 'https://miabelangue.com/fr',
    status: 'online',
    flagship: true,
  },
  {
    slug: 'aux-ptits-pois',
    images: [
      '/images/accueil-auxptitspois.png',
      '/images/product-auxptitspois.png',
      '/images/recette-auxptitspois.png',
      '/images/abonnement-auxptitspois.png',
    ],
    url: 'https://www.auxptitspois.fr/',
    status: 'online',
    flagship: true,
  },
  {
    slug: 'fairy-chair-studio',
    images: [
      '/images/page-salon.png',
      '/images/fcs-drawer.png',
      '/images/fcs-bijoux.png',
      '/images/fcs-accordeon.png',
      '/images/fcs-coeur.png',
    ],
    url: 'https://fairychairstudio.com/fr',
    status: 'online',
    flagship: true,
  },
  {
    slug: 'okanime',
    images: [
      '/images/accueil-okanime.png',
      '/images/bibliotheque-okanime.png',
      '/images/detail-okanime.png',
      '/images/base-okanime.png',
    ],
    url: 'https://okanime.live/',
    status: 'online',
  },
  {
    slug: 'la-requeyrie',
    images: [
      '/images/req-appartements.png',
      '/images/req-around.png',
      '/images/req-footer.png',
    ],
    url: 'https://www.larequeyrie.fr',
    status: 'online',
  },
  {
    /* La boutique n'est plus servie : le domaine ne résout plus. Le chantier
       reste au catalogue — c'est le point de départ que le portfolio raconte —
       mais sans URL, avec son seul code public. */
    slug: 'mea-vita-creation',
    images: [
      '/images/page-meavita.png',
      '/images/mea-accueil.png',
      '/images/mea-sacs.png',
      '/images/mea-presentation.png',
      '/images/mea-inscription.png',
    ],
    url: null,
    repo: 'https://github.com/B-ludovic/mea-vita-creation',
    status: 'archived',
  },
]

export type Project = ProjectMedia & {
  number: string
  title: string
  desc: string
  stack: string
  builds: string[]
  features: string[]
  challenge?: string
  statValue?: string
  statLabel?: string
}

/* Recolle les médias et les textes du dictionnaire de la locale demandée. */
export function getProjects(dict: Record<string, string>): Project[] {
  return PROJECT_MEDIA.map((media, index) => {
    const n = index + 1
    const pick = (prefix: string) =>
      [1, 2, 3, 4, 5, 6]
        .map((i) => dict[`project${n}_${prefix}${i}`])
        .filter((text): text is string => Boolean(text))

    return {
      ...media,
      number: String(n).padStart(2, '0'),
      title: dict[`project${n}_title`],
      desc: dict[`project${n}_desc`],
      stack: dict[`project${n}_stack`],
      builds: pick('build'),
      features: pick('feat'),
      challenge: dict[`project${n}_challenge`],
      statValue: dict[`project${n}_stat_value`],
      statLabel: dict[`project${n}_stat_label`],
    }
  })
}

/* Le lien qu'on peut réellement offrir au visiteur : le site s'il tourne, le
   dépôt sinon, rien du tout si les deux manquent. */
export function projectHref(project: ProjectMedia): string | null {
  return project.url ?? project.repo ?? null
}
