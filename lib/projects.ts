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
  /* Adresse du site en production. `null` quand rien ne s'ouvre — chantier
     fermé, ou chantier encore gardé par un portique d'accès. Déclarer une URL
     morte revient à faire indexer une erreur ; déclarer une URL qui répond par
     une porte close est pire, puisque c'est l'argument même de la section — une
     adresse qui s'ouvre engage le chantier — qu'on retourne contre soi. */
  url: string | null
  /* Le domaine d'un chantier qui n'ouvre pas encore. Il s'écrit sur la fiche,
     mais en texte mort : l'adresse est réservée, elle ne se visite pas. Sans ce
     champ, un chantier en test privé n'aurait que ses captures à montrer, et le
     visiteur n'aurait aucun nom à retenir pour y revenir le jour de
     l'ouverture. */
  domain?: string
  /* Code public, quand il existe. Ce n'est pas l'adresse du produit : un dépôt
     déclaré comme `url` ferait de github.com le site du projet. */
  repo?: string
  /* Trois états, parce que deux ne suffisaient pas : un chantier peut tourner
     pour de vrai sans être encore ouvert au public. `beta` est cet entre-deux —
     il n'est ni servi à tous, ni abandonné. */
  status: 'online' | 'beta' | 'archived'
  /* Chantiers mis en avant : ceux qu'un prospect ou un moteur peut ouvrir et
     parcourir aujourd'hui. Ils passent en tête de liste, sont les seuls
     détaillés dans le llms.txt — et depuis la refonte de la page d'accueil,
     les seuls présentés en fiche complète. Les autres tiennent en une ligne
     dépliable. Un chantier en test privé y a sa place lui aussi : il n'est pas
     ouvrable, mais il est ce qu'on montre en premier. */
  flagship?: boolean
}

export const PROJECT_MEDIA: ProjectMedia[] = [
  {
    /* Le vaisseau amiral, encore derrière son portique : bymaisonmuse.com
       répond aujourd'hui par une redirection vers /beta. D'où `url: null` — le
       titre ne mène nulle part plutôt que vers une porte close — et le domaine
       écrit juste à côté, sans lien. Le jour de l'ouverture, il suffit de
       déplacer l'adresse de `domain` vers `url` et de passer le statut à
       `online` : la fiche, le llms.txt, le bandeau de l'accroche et la page
       « à propos » suivent tout seuls. */
    slug: 'muse',
    /* Quatre captures choisies pour ce qu'elles ne montrent pas. La galerie de
       templates et la page des ventes événementielles ont été écartées : elles
       prenaient pour sujet ce qui distingue le produit, et la seconde traînait
       en plus la barre d'onglets du navigateur. Restent la vitrine, le pilotage
       vendeur, la conformité et les registres d'administration — ce que la
       fiche raconte, et rien de plus. */
    images: [
      '/images/muse-accueil.webp',
      '/images/muse-dashboard.webp',
      '/images/muse-legal.webp',
      '/images/muse-admin.webp',
    ],
    url: null,
    domain: 'bymaisonmuse.com',
    status: 'beta',
    flagship: true,
  },
  {
    slug: 'miabelangue',
    images: [
      '/images/accueil-miabe.webp',
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
      '/images/accueil-amap.webp',
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

/* Deux rangs de présentation, tirés du seul `flagship` déjà déclaré au-dessus.
   La page d'accueil détaillait les six chantiers à poids égal ; un prospect
   n'en lisait donc aucun. Les trois chantiers phares gardent la fiche complète,
   les trois autres tiennent en une ligne dépliable — même contenu, rangé plus
   serré, et toujours dans le DOM pour les moteurs. */
export function splitProjects(projects: Project[]): {
  flagships: Project[]
  archives: Project[]
} {
  return {
    flagships: projects.filter((project) => project.flagship),
    archives: projects.filter((project) => !project.flagship),
  }
}

/* Le domaine, nu, tel qu'on l'écrirait sur une carte de visite. Affiché à côté
   du titre : c'est la preuve la moins contestable qu'un chantier tourne — plus
   qu'un badge « en production », qui n'engage que celui qui l'écrit. Rien pour
   un chantier fermé, et rien pour un dépôt : github.com n'est pas un produit. */
export function projectDomain(project: ProjectMedia): string | null {
  if (!project.url) return project.domain ?? null
  return project.url
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/.*$/, '')
}

/* Clé de libellé d'état, à lire dans le dictionnaire. Quatre cas : un chantier
   phare en ligne, un chantier en ligne, un chantier en test privé, un chantier
   fermé. Le test privé se lit avant le rang : un chantier phare qu'on ne peut
   pas encore ouvrir ne s'annonce pas « en production ». */
export function projectStatusKey(
  project: ProjectMedia,
): 'status_production' | 'status_online' | 'status_beta' | 'status_archived' {
  if (project.status === 'archived') return 'status_archived'
  if (project.status === 'beta') return 'status_beta'
  return project.flagship ? 'status_production' : 'status_online'
}

/* Les chantiers ouvrables aujourd'hui, pour le bandeau de l'accroche. */
export function liveProjects(): ProjectMedia[] {
  return PROJECT_MEDIA.filter((project) => project.url !== null)
}
