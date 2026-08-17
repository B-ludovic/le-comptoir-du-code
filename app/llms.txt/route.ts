import { getAllPosts, type PostMeta } from '@/lib/blog'
import { BASE_URL } from '@/lib/structured-data'

export const dynamic = 'force-static'

function postLines(locale: string): string {
  return getAllPosts(locale)
    .map(
      (post: PostMeta) =>
        `- ${BASE_URL}/${locale}/blog/${post.slug} — ${post.title} (${post.date})`,
    )
    .join('\n')
}

const legalPages = [
  ['conditions-cadrage', 'Conditions générales de la prestation de cadrage', 'Terms of the scoping engagement'],
  ['conditions-generales', 'Conditions générales de vente et de prestation', 'Terms and conditions of sale'],
  ['mentions-legales', 'Mentions légales', 'Legal notice'],
  ['politique-de-confidentialite', 'Politique de confidentialité', 'Privacy policy'],
  ['gestion-des-cookies', 'Gestion des cookies', 'Cookie settings'],
] as const

function legalLines(locale: 'fr' | 'en'): string {
  return legalPages
    .map(([slug, fr, en]) => `- ${BASE_URL}/${locale}/${slug} — ${locale === 'fr' ? fr : en}`)
    .join('\n')
}

function body(): string {
  return `# L'Echoppe du Code

> Développeur web indépendant à Paris / Île-de-France — cadrage de projet, sites vitrines, e-commerce et applications sur-mesure.

Ludovic BATAILLE est développeur web freelance basé en Île-de-France, spécialisé en Next.js, React, TypeScript et NestJS. Il conçoit et livre des applications web performantes, accessibles et maintenables pour des entrepreneurs, des PME, des associations et des startups. Interlocuteur unique du cadrage à la mise en production.

Statut : entrepreneur-salarié hébergé par Jump Green (SIRET 97761078100014, RCS de Bobigny, TVA FR10977610781). Prestations en français et en anglais. Tous les prix sont indiqués hors taxes.

## Cadrage et conception

Étape préalable facultative, facturée séparément, pour les projets qui ne sont pas encore définis. Le livrable est un dossier écrit qui appartient au client, qu'il poursuive ou non avec L'Echoppe du Code.

- **Cadrage Vitrine — 290 € HT** — Atelier et dossier écrit pour un site vitrine : choix de solution, arborescence, conformité RGPD, périmètre de la V1.
- **Cadrage E-commerce & Business — 590 € HT** — Atelier et dossier écrit pour un projet de vente en ligne ou de réservation : tunnel de vente, solution de paiement, workflows, conformité RGPD e-commerce.
- **Cadrage Architecture Métier — 1 190 € HT** — Atelier et dossier d'architecture pour une application métier : modèle de données, back-office, rôles et permissions, sécurité, modèle économique.
- **Conception produit — 650 € HT par jour** — Lorsque le projet reste à inventer : fonctionnalités, règles de gestion, structure des contenus, modèle économique.

Imputation : lorsque le client signe un devis de développement dans les trois mois suivant la remise du dossier, 50 % du montant HT réglé au titre du cadrage viennent en déduction du prix du développement. L'imputation ne s'applique ni à la conception produit facturée à la journée, ni aux heures d'atelier complémentaires.

Conditions détaillées : ${BASE_URL}/fr/conditions-cadrage

## Développement

- **La Présence — à partir de 1 450 € HT** — Site vitrine sur-mesure. Design soigné, performances optimisées, SEO technique inclus. Maintenance optionnelle (mises à jour de sécurité) à 70 € HT/mois.
- **L'E-commerce & Réservation — à partir de 2 850 € HT** — Boutique en ligne ou système de réservation. Un an de mises à jour de sécurité inclus, puis 85 € HT/mois.
- **Les Outils Sur-Mesure — à partir de 4 800 € HT** — Application métier, tableau de bord, outil interne. Un an de mises à jour de sécurité inclus, puis à partir de 165 € HT/mois.

Conditions détaillées : ${BASE_URL}/fr/conditions-generales

## L'Échoppe Solidaire — tarification associative

Offre dédiée aux associations loi 1901 et structures à but non lucratif, en priorité LGBTQI+. Mécénat de compétences de 50 % sur les forfaits de développement, conditionné à la fourniture d'un récépissé de déclaration en préfecture ou équivalent. Même exigence technique, zéro concession sur la qualité.

- **Cadrage (associatif)** — à partir de 145 € HT.
- **La Présence (associative)** — à partir de 725 € HT au lieu de 1 450 € HT. Maintenance solidaire à partir de 40 € HT/mois.
- **L'E-commerce & Dons (associatif)** — à partir de 1 425 € HT au lieu de 2 850 € HT. Maintenance solidaire à partir de 50 € HT/mois.
- **Les Outils Sur-Mesure (associatif)** — sur étude budgétaire, au lieu de 4 800 € HT minimum. Maintenance sur étude.

La maintenance associative suit un barème solidaire dédié : elle n'est pas automatiquement à moitié prix du tarif standard, mais reste très en dessous du marché.

Spécialités associations : sécurisation des dons via Stripe (sans commission intermédiaire), gestion des adhérents, conformité RGPD renforcée. À la livraison, l'infrastructure est mise au nom de l'association et le code source lui appartient.

Paiement : 30 % à la signature (facture d'acompte émise par Jump Green), 70 % à la mise en ligne, par virement uniquement.

## Stack technique

Next.js, React, TypeScript, NestJS, Node.js, PostgreSQL, Stripe, Vercel. CSS Modules et design tokens plutôt que frameworks utilitaires.

## Engagements

- Code propre et documenté, livré avec les sources
- Interlocuteur unique du cadrage à la mise en production
- Pas de template revendu : chaque projet est développé sur-mesure
- Droits de propriété intellectuelle transférés au client à réception du paiement intégral
- Devis officiel émis par Jump Green, société de portage salarial

## Zone d'intervention

Paris et Île-de-France en présentiel, reste de la France et international à distance.

## Contact

- Site : ${BASE_URL}
- Email : contact@lechoppeducode.com
- GitHub : https://github.com/B-ludovic

## Pages

- ${BASE_URL}/fr — Page d'accueil
- ${BASE_URL}/fr/echoppe-solidaire — L'Échoppe Solidaire, tarification associative
- ${BASE_URL}/fr/faq — Questions fréquentes : prix, propriété du code, paiement, maintenance, tarif associatif
${legalLines('fr')}

## Le Carnet (blog)

Articles pratiques sur la création de site internet, le coût réel des plateformes et l'artisanat numérique.

- ${BASE_URL}/fr/blog — Le Carnet, sommaire
${postLines('fr')}

---

# L'Echoppe du Code (English)

> Independent web developer in Paris / Île-de-France — project scoping, marketing websites, e-commerce and custom web applications.

Ludovic BATAILLE is a freelance web developer based in the Paris region of France, specialising in Next.js, React, TypeScript and NestJS. He designs and ships performant, accessible and maintainable web applications for entrepreneurs, small businesses, non-profits and startups. A single point of contact from scoping to production. All prices exclude VAT.

## Scoping and product design

An optional first step, billed separately, for projects that are not yet defined. The written report belongs to the client whether or not they go on to work with L'Echoppe du Code.

- **Marketing site scoping — €290** — Workshop and written report: solution choice, site structure, GDPR compliance, scope of the first version.
- **E-commerce & business scoping — €590** — Workshop and written report: sales funnel, payment provider, workflows, e-commerce GDPR compliance.
- **Business architecture scoping — €1,190** — Workshop and architecture report: data model, back office, roles and permissions, security, business model.
- **Product design — €650 per day** — When the product is still to be invented: features, business rules, content structure, business model.

Set-off: where the client signs a development quote within three months of the scoping report being delivered, 50 % of the amount paid for the scoping engagement is set off against the development price. The set-off covers neither product design billed by the day nor additional workshop hours.

## Development

- **La Présence — from €1,450** — Custom marketing website. Careful design, optimised performance, technical SEO included. Optional security maintenance at €70/month.
- **L'E-commerce & Réservation — from €2,850** — Online shop or booking system. One year of security updates included, then €85/month.
- **Les Outils Sur-Mesure — from €4,800** — Business application, dashboard or internal tool. One year of security updates included, then from €165/month.

## Non-profit pricing

50 % skills sponsorship on development packages for registered non-profits, with priority given to LGBTQI+ organisations, subject to proof of registration. Same technical standard, no compromise on quality.

- **Scoping (non-profit)** — from €145.
- **La Présence (non-profit)** — from €725 instead of €1,450. Solidarity maintenance from €40/month.
- **E-commerce & Donations (non-profit)** — from €1,425 instead of €2,850. Solidarity maintenance from €50/month.
- **Les Outils Sur-Mesure (non-profit)** — on budget review, instead of €4,800 minimum.

Maintenance for non-profits follows a dedicated solidarity rate: it is not automatically half the standard price, but stays well below market rates. At delivery the infrastructure is registered in the organisation's name and the source code belongs to it.

## Contact

- Website: ${BASE_URL}/en
- Email: contact@lechoppeducode.com
- GitHub: https://github.com/B-ludovic
- Portfolio: https://b-ludovic.dev

## Pages

- ${BASE_URL}/en — Homepage
- ${BASE_URL}/en/echoppe-solidaire — L'Échoppe Solidaire, non-profit pricing
- ${BASE_URL}/en/faq — Frequently asked questions: pricing, code ownership, payment, maintenance, non-profit rates
${legalLines('en')}

## Journal (blog)

Practical articles on building a website, the real cost of website platforms and digital craftsmanship.

- ${BASE_URL}/en/blog — Journal, index
${postLines('en')}
`
}

export function GET() {
  return new Response(body(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
