/* Source de vérité unique de la grille tarifaire.

   Avant ce fichier, les mêmes montants étaient réécrits à la main dans les
   dictionnaires, le graphe schema.org, le llms.txt, la FAQ, la page
   associative et le générateur de devis. Neuf copies, donc neuf occasions de
   diverger — et elles avaient divergé : la grille annonçait 1 450 € là où un
   article de blog écrivait 1 500 €, et un TJM de 350 € cohabitait avec une
   journée de conception à 650 € sans que rien n'explique l'écart.

   Règle de construction : tout prix de développement est un nombre de jours
   multiplié par le taux journalier, puis arrondi à la dizaine commerciale.
   `days` reste exposé à côté de `price` pour que l'arrondi se vérifie à l'œil
   et que chaque montant se défende devant un client. */

export type Locale = 'fr' | 'en'
type Bilingual = { fr: string; en: string }

/* Ingénierie : conception, développement, tests, mise en ligne.

   Seul taux contractuel. C'est lui qui chiffre les avenants au périmètre et
   les travaux déjà réalisés en cas de rupture. Un contrat qui connaîtrait
   deux taux ouvrirait, à chaque journée facturée, la discussion sur celui
   qui s'applique — et cette discussion, on la perd toujours à moitié. La
   conception produit ci-dessous ne se facture jamais à l'intérieur d'un
   projet : seulement en amont, sur un devis distinct. */
export const ENGINEERING_DAY_RATE = 435

/* Conception produit : décider quoi construire vaut plus cher qu'exécuter.
   Facturée à la journée, hors forfait, et rattachée au cadrage. */
export const PRODUCT_DESIGN_DAY_RATE = 650

/* Heure d'atelier vendue seule, au-delà de la durée incluse au cadrage. Le
   tarif horaire porte une prime assumée sur la journée : une heure isolée
   mobilise une préparation et un créneau que la journée amortit. Il vivait
   en dur dans deux articles des conditions de cadrage — exactement ce que
   l'en-tête de ce fichier reproche à l'état antérieur. */
export const WORKSHOP_HOUR_RATE = 150

/* Date d'entrée en vigueur de la grille, reportée sur le devis. Le taux
   applicable à un contrat est celui en vigueur au jour de la signature, y
   compris pour ses avenants ultérieurs : dater la grille rend cette règle
   vérifiable au lieu de discutable. À mettre à jour à chaque revalorisation,
   en même temps que les montants. */
export const TARIFF_VERSION: Bilingual = {
  fr: '1er septembre 2026',
  en: '1 September 2026',
}

/* Mécénat de compétences de L'Échoppe Solidaire. La maintenance associative
   n'en découle pas : elle suit un barème dédié, porté par chaque palier. */
export const NON_PROFIT_DISCOUNT = 0.5

export type TierId = 'presence' | 'boutique' | 'outils'

export type Tier = {
  id: TierId
  /* Nom commercial, identique dans les deux langues : c'est une marque. */
  name: string
  days: number
  price: number
  nonProfitPrice: number
  maintenance: {
    price: number
    nonProfitPrice: number
    /* Mois de maintenance inclus à la livraison. Zéro n'existe plus : une
       maintenance « optionnelle » n'est jamais souscrite. */
    includedMonths: number
  }
}

export const TIERS: Tier[] = [
  {
    id: 'presence',
    name: 'La Présence',
    days: 6,
    price: 2600,
    nonProfitPrice: 1300,
    maintenance: { price: 90, nonProfitPrice: 55, includedMonths: 3 },
  },
  {
    id: 'boutique',
    name: 'La Boutique',
    days: 15,
    price: 6500,
    nonProfitPrice: 3250,
    maintenance: { price: 140, nonProfitPrice: 85, includedMonths: 12 },
  },
  {
    id: 'outils',
    name: 'Les Outils Sur-Mesure',
    days: 22,
    price: 9500,
    nonProfitPrice: 4750,
    maintenance: { price: 240, nonProfitPrice: 140, includedMonths: 12 },
  },
]

/* Les modules se cumulent à un socle. Leur intérêt n'est pas d'allonger la
   facture mais de la rendre réversible : le client compose, et surtout il
   retire. On ne négocie plus un prix, on négocie un périmètre. */
export type Addon = {
  id: string
  tier: TierId
  label: Bilingual
  days: number
  price: number
}

export const ADDONS: Addon[] = [
  // La Présence
  {
    id: 'extra-page',
    tier: 'presence',
    label: { fr: 'Page supplémentaire', en: 'Additional page' },
    days: 0.5,
    price: 220,
  },
  {
    id: 'booking',
    tier: 'presence',
    label: {
      fr: 'Réservation avec agenda synchronisé et confirmations',
      en: 'Booking with synchronised calendar and confirmations',
    },
    days: 6,
    price: 2600,
  },
  {
    id: 'blog',
    tier: 'presence',
    label: { fr: 'Blog éditorial', en: 'Editorial blog' },
    days: 3,
    price: 1300,
  },
  {
    id: 'presence-i18n',
    tier: 'presence',
    label: { fr: 'Site multilingue (par langue)', en: 'Multilingual site (per language)' },
    days: 3,
    price: 1300,
  },
  {
    id: 'presence-newsletter',
    tier: 'presence',
    label: { fr: 'Newsletter et CRM (Brevo)', en: 'Newsletter and CRM (Brevo)' },
    days: 2,
    price: 900,
  },

  // La Boutique
  {
    id: 'live-stock',
    tier: 'boutique',
    label: { fr: 'Stock en temps réel', en: 'Real-time stock' },
    days: 4,
    price: 1700,
  },
  {
    id: 'refunds',
    tier: 'boutique',
    label: { fr: 'Remboursements partiels et totaux', en: 'Partial and full refunds' },
    days: 2,
    price: 900,
  },
  {
    id: 'shipping',
    tier: 'boutique',
    label: {
      fr: 'Expédition et étiquettes transporteur',
      en: 'Shipping and carrier labels',
    },
    days: 3,
    price: 1300,
  },
  {
    id: 'invoicing',
    tier: 'boutique',
    label: { fr: 'Facturation PDF automatique', en: 'Automatic PDF invoicing' },
    days: 2,
    price: 900,
  },
  {
    id: 'accounts',
    tier: 'boutique',
    label: {
      fr: 'Comptes clients et historique de commandes',
      en: 'Customer accounts and order history',
    },
    days: 3,
    price: 1300,
  },
  {
    id: 'promo',
    tier: 'boutique',
    label: { fr: "Codes promo et bons d'achat", en: 'Promo codes and gift vouchers' },
    days: 1.5,
    price: 650,
  },
  {
    id: 'subscriptions',
    tier: 'boutique',
    label: {
      fr: 'Abonnements récurrents (Stripe Billing)',
      en: 'Recurring subscriptions (Stripe Billing)',
    },
    days: 5,
    price: 2200,
  },
  {
    id: 'boutique-i18n',
    tier: 'boutique',
    label: { fr: 'Site multilingue (par langue)', en: 'Multilingual site (per language)' },
    days: 3,
    price: 1300,
  },

  // Les Outils Sur-Mesure
  {
    id: 'client-portal',
    tier: 'outils',
    label: { fr: 'Espace client ou portail externe', en: 'Client area or external portal' },
    days: 5,
    price: 2200,
  },
  {
    id: 'payments',
    tier: 'outils',
    label: { fr: 'Paiements et abonnements', en: 'Payments and subscriptions' },
    days: 5,
    price: 2200,
  },
  {
    id: 'api-integration',
    tier: 'outils',
    label: {
      fr: 'Intégration à une API existante',
      en: 'Integration with an existing API',
    },
    days: 4,
    price: 1700,
  },
  {
    id: 'reporting',
    tier: 'outils',
    label: { fr: 'Statistiques et rapports', en: 'Statistics and reports' },
    days: 3,
    price: 1300,
  },
  {
    id: 'import-export',
    tier: 'outils',
    label: { fr: 'Import et export de données', en: 'Data import and export' },
    days: 2,
    price: 900,
  },
  {
    id: 'notifications',
    tier: 'outils',
    label: {
      fr: 'Notifications et e-mails automatisés',
      en: 'Automated notifications and emails',
    },
    days: 2,
    price: 900,
  },
  {
    id: 'mobile-app',
    tier: 'outils',
    label: {
      fr: 'Application mobile sur base existante',
      en: 'Mobile app on an existing backend',
    },
    days: 25,
    price: 10900,
  },
]

/* Cadrage : inchangé. C'est la partie la mieux calibrée de la grille, et son
   imputation à 50 % en fait un filtre à projets sérieux plutôt qu'un péage. */
export type ScopingTier = {
  id: string
  name: Bilingual
  price: number
}

export const SCOPING_TIERS: ScopingTier[] = [
  {
    id: 'scoping-vitrine',
    name: { fr: 'Cadrage Vitrine', en: 'Marketing site scoping' },
    price: 290,
  },
  {
    id: 'scoping-ecommerce',
    name: { fr: 'Cadrage E-commerce & Business', en: 'E-commerce & business scoping' },
    price: 590,
  },
  {
    id: 'scoping-architecture',
    name: { fr: 'Cadrage Architecture Métier', en: 'Business architecture scoping' },
    price: 1190,
  },
]

/* Un seul tarif associatif pour le cadrage, quel que soit le palier : la
   marche d'entrée compte plus que la dégressivité pour une association. */
export const SCOPING_NON_PROFIT_FROM = 145

/* Part du cadrage déduite du développement en cas de signature sous trois mois. */
export const SCOPING_SET_OFF = 0.5

export function tier(id: TierId): Tier {
  const found = TIERS.find((t) => t.id === id)
  if (!found) throw new Error(`Palier tarifaire inconnu : ${id}`)
  return found
}

export function addonsFor(id: TierId): Addon[] {
  return ADDONS.filter((addon) => addon.tier === id)
}

/* Formatage fait à la main plutôt que par Intl : le rendu d'Intl dépend de la
   version d'ICU embarquée, qui n'est pas la même en local et sur Vercel. Un
   prix qui change de séparateur entre deux environnements est un prix qui
   casse la comparaison entre le devis PDF et la page web. */
export function formatPrice(amount: number, locale: Locale): string {
  /* Espaces insécables en français, comme partout ailleurs sur le site : un
     montant ne doit jamais se couper entre le millier et l'unité, ni lâcher
     son symbole € en début de ligne. */
  const grouped = String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, locale === 'en' ? ',' : ' ')
  return locale === 'en' ? `€${grouped}` : `${grouped} €`
}

/* « 90 € HT/mois » et « €90/month excl. VAT ». */
export function formatMonthly(amount: number, locale: Locale): string {
  return locale === 'en'
    ? `${formatPrice(amount, 'en')}/month excl. VAT`
    : `${formatPrice(amount, 'fr')} HT/mois`
}
