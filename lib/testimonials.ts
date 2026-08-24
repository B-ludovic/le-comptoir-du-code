import type { TierId } from '@/lib/pricing'

/* Avis clients, repris de la page publique de recommandations Codeur.com.

   Trois règles tiennent ce fichier :

   — le texte français est le verbatim de l'auteur. Seule la ponctuation
     manquante a été rétablie ; pas un mot n'a été ajouté, retiré ni déplacé ;
   — aucune note n'est inventée. Codeur affiche « Recommandé » sans valeur
     chiffrée, donc les Review sortent sans reviewRating plutôt qu'avec un 5/5
     fabriqué ;
   — la traduction anglaise est affichée comme traduction, sous l'original, et
     n'entre jamais dans les données structurées : on ne cite pas quelqu'un
     dans une langue qu'il n'a pas employée.

   Publier ces textes avec le nom de leur auteur suppose son accord : c'est une
   donnée personnelle, republiée pour une finalité différente de celle d'origine. */

export const REVIEWS_SOURCE = 'https://www.codeur.com/-b-ludovic/recommendations'
export const REVIEWS_SOURCE_NAME = 'Codeur.com'

export type Testimonial = {
  id: string
  /* Prénom tel que publié sur la source. */
  author: string
  organisation: string
  /* Le projet, tel que nommé dans les réalisations. */
  project: string
  sector: { fr: string; en: string }
  tier: TierId
  datePublished: string
  body: string
  translation: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'vivi-fairy-chair-studio',
    author: 'Vivi',
    organisation: 'Fairy Chair Studio',
    project: 'Fairy Chair Studio',
    sector: { fr: 'Coiffure et accessoires', en: 'Hair care and accessories' },
    tier: 'boutique',
    datePublished: '2026-04-01',
    body:
      "J'ai fait appel à Ludovic pour la création complète de mon site dans le domaine de la coiffure et des accessoires, et je suis entièrement satisfaite du résultat. Très professionnel, réactif et à l'écoute, il a su m'accompagner de A à Z avec beaucoup de sérieux et de créativité. Il est force de proposition, a un excellent sens du style, et comprend rapidement les besoins de ses clients. La communication a été fluide, avec une grande disponibilité, et même des déplacements lorsque nécessaire ; un vrai plus. Les délais ont été largement respectés. Il est fiable, impliqué et très talentueux !",
    translation:
      'I asked Ludovic to build my entire website in the hair care and accessories field, and I am completely satisfied with the result. Very professional, responsive and attentive, he guided me from start to finish with great care and creativity. He brings ideas of his own, has an excellent sense of style, and grasps his clients’ needs quickly. Communication was smooth, he was highly available, and he even travelled to meet us when needed — a real plus. Deadlines were comfortably met. He is reliable, committed and very talented.',
  },
  {
    id: 'thierry-la-requeyrie',
    author: 'Thierry',
    organisation: 'Gîte la Requeyrie',
    project: 'La Requeyrie',
    sector: { fr: 'Hébergement touristique', en: 'Holiday accommodation' },
    tier: 'presence',
    datePublished: '2026-04-09',
    body:
      "Ludovic a été très à l'écoute de nos désirs et de très bons conseils pour mettre en valeur notre domaine et le faire évoluer. Merci encore pour votre professionnalisme et votre courtoisie. Cordialement.",
    translation:
      'Ludovic listened closely to what we wanted and gave excellent advice on how to show our estate at its best and help it grow. Thank you again for your professionalism and your courtesy. Kind regards.',
  },
  {
    id: 'francois-mea-vita-creation',
    author: 'François',
    organisation: 'Mea Vita Création',
    project: 'Mea Vita Création',
    sector: { fr: 'Maroquinerie artisanale', en: 'Artisan leather goods' },
    tier: 'boutique',
    datePublished: '2026-04-11',
    body:
      "Un partenariat qui a abouti rapidement et efficacement. Chaque modification s'est faite avec pertinence et compréhension. Il a su être à mon écoute et s'approprier les différents éléments de la marque afin de me proposer un résultat totalement satisfaisant ! Un grand merci",
    translation:
      'A partnership that came together quickly and efficiently. Every change was made with judgement and understanding. He listened to me and took ownership of the different elements of the brand to deliver a thoroughly satisfying result. Many thanks.',
  },
]
