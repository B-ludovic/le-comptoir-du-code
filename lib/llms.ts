import { getAllPosts, getPost, type PostMeta } from '@/lib/blog'
import { BASE_URL } from '@/lib/structured-data'
import {
  TIERS,
  ENGINEERING_DAY_RATE,
  addonsFor,
  formatPrice,
  formatMonthly,
  type Locale,
} from '@/lib/pricing'

/* Chaque article est annoncé avec sa source Markdown : un crawler qui préfère
   le texte brut n'a pas à deviner l'adresse, elle est dans l'index. */
function postLines(locale: string): string {
  return getAllPosts(locale)
    .map(
      (post: PostMeta) =>
        `- ${BASE_URL}/${locale}/blog/${post.slug} — ${post.title} (${post.date})` +
        ` — source Markdown : ${BASE_URL}/${locale}/blog/${post.slug}.md`,
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

/* Les paliers et leurs modules sont rendus depuis lib/pricing.ts. Un moteur
   génératif lit ce fichier comme une grille tarifaire : autant qu'elle soit
   exactement celle du site, module par module, plutôt qu'un résumé rédigé une
   fois puis oublié. */
function tierLines(locale: Locale): string {
  return TIERS.map((t) => {
    const price = formatPrice(t.price, locale)
    const upkeep = formatMonthly(t.maintenance.price, locale)
    const included = t.maintenance.includedMonths
    const heading =
      locale === 'en'
        ? `- **${t.name} — from ${price}** — Socle: ${t.days} days of engineering. ${included} months of security updates included, then ${upkeep}.`
        : `- **${t.name} — à partir de ${price} HT** — Socle : ${t.days} jours d'ingénierie. ${included} mois de mises à jour de sécurité inclus, puis ${upkeep}.`
    const modules = addonsFor(t.id)
      .map((a) => {
        const unit = locale === 'en' ? `${a.days} day${a.days > 1 ? 's' : ''}` : `${a.days} j`
        const amount = locale === 'en' ? formatPrice(a.price, 'en') : `${formatPrice(a.price, 'fr')} HT`
        return `  - ${a.label[locale]} — ${amount} (${unit})`
      })
      .join('\n')
    return `${heading}\n${modules}`
  }).join('\n\n')
}

function solidaireLines(locale: Locale): string {
  return TIERS.map((t) => {
    const price = formatPrice(t.nonProfitPrice, locale)
    const full = formatPrice(t.price, locale)
    const upkeep = formatMonthly(t.maintenance.nonProfitPrice, locale)
    return locale === 'en'
      ? `- **${t.name} (non-profit)** — from ${price} instead of ${full}. Solidarity maintenance from ${upkeep}.`
      : `- **${t.name} (associatif)** — à partir de ${price} HT au lieu de ${full} HT. Maintenance solidaire à partir de ${upkeep}.`
  }).join('\n')
}

function body(): string {
  return `# L'Échoppe du Code

> Développeur web indépendant à Paris / Île-de-France — cadrage de projet, sites vitrines, e-commerce et applications sur-mesure.

Ludovic BATAILLE est développeur web freelance basé en Île-de-France, spécialisé en Next.js, React, TypeScript et NestJS. Il conçoit et livre des applications web performantes, accessibles et maintenables pour des entrepreneurs, des PME, des associations et des startups. Interlocuteur unique du cadrage à la mise en production.

Statut : entrepreneur-salarié hébergé par Jump Green (SIRET 97761078100014, RCS de Bobigny, TVA FR10977610781). Prestations en français et en anglais. Tous les prix sont indiqués hors taxes.

## Cadrage et conception

Étape préalable facultative, facturée séparément, pour les projets qui ne sont pas encore définis. Le livrable est un dossier écrit qui appartient au client, qu'il poursuive ou non avec L'Échoppe du Code.

- **Cadrage Vitrine — 290 € HT** — Atelier et dossier écrit pour un site vitrine : choix de solution, arborescence, conformité RGPD, périmètre de la V1.
- **Cadrage E-commerce & Business — 590 € HT** — Atelier et dossier écrit pour un projet de vente en ligne ou de réservation : tunnel de vente, solution de paiement, workflows, conformité RGPD e-commerce.
- **Cadrage Architecture Métier — 1 190 € HT** — Atelier et dossier d'architecture pour une application métier : modèle de données, back-office, rôles et permissions, sécurité, modèle économique.
- **Conception produit — 650 € HT par jour** — Lorsque le projet reste à inventer : fonctionnalités, règles de gestion, structure des contenus, modèle économique.

Imputation : lorsque le client signe un devis de développement dans les trois mois suivant la remise du dossier, 50 % du montant HT réglé au titre du cadrage viennent en déduction du prix du développement. L'imputation ne s'applique ni à la conception produit facturée à la journée, ni aux heures d'atelier complémentaires.

Conditions détaillées : ${BASE_URL}/fr/conditions-cadrage

## Développement

Chaque offre est un socle au périmètre défini, chiffré en jours d'ingénierie au taux de ${ENGINEERING_DAY_RATE} € HT par jour. Les besoins spécifiques s'ajoutent en modules, eux aussi chiffrés en jours. Le client peut retirer un module : il compose un périmètre au lieu de négocier un prix.

${tierLines('fr')}

Conditions détaillées : ${BASE_URL}/fr/conditions-generales

## L'Échoppe Solidaire — tarification associative

Offre dédiée aux associations loi 1901 et structures à but non lucratif, en priorité LGBTQI+. Mécénat de compétences de 50 % sur les forfaits de développement, conditionné à la fourniture d'un récépissé de déclaration en préfecture ou équivalent. Même exigence technique, zéro concession sur la qualité.

- **Cadrage (associatif)** — à partir de 145 € HT.
${solidaireLines('fr')}

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

Version intégrale de ce document, articles compris : ${BASE_URL}/llms-full.txt

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

# L'Échoppe du Code (English)

> Independent web developer in Paris / Île-de-France — project scoping, marketing websites, e-commerce and custom web applications.

Ludovic BATAILLE is a freelance web developer based in the Paris region of France, specialising in Next.js, React, TypeScript and NestJS. He designs and ships performant, accessible and maintainable web applications for entrepreneurs, small businesses, non-profits and startups. A single point of contact from scoping to production. All prices exclude VAT.

## Scoping and product design

An optional first step, billed separately, for projects that are not yet defined. The written report belongs to the client whether or not they go on to work with L'Échoppe du Code.

- **Marketing site scoping — €290** — Workshop and written report: solution choice, site structure, GDPR compliance, scope of the first version.
- **E-commerce & business scoping — €590** — Workshop and written report: sales funnel, payment provider, workflows, e-commerce GDPR compliance.
- **Business architecture scoping — €1,190** — Workshop and architecture report: data model, back office, roles and permissions, security, business model.
- **Product design — €650 per day** — When the product is still to be invented: features, business rules, content structure, business model.

Set-off: where the client signs a development quote within three months of the scoping report being delivered, 50 % of the amount paid for the scoping engagement is set off against the development price. The set-off covers neither product design billed by the day nor additional workshop hours.

## Development

Each package is a foundation with a defined scope, priced in engineering days at €${ENGINEERING_DAY_RATE} excluding VAT per day. Specific needs are added as modules, also priced in days. A client can remove a module: they compose a scope rather than negotiate a price.

${tierLines('en')}

## Non-profit pricing

50 % skills sponsorship on development packages for registered non-profits, with priority given to LGBTQI+ organisations, subject to proof of registration. Same technical standard, no compromise on quality.

- **Scoping (non-profit)** — from €145.
${solidaireLines('en')}

Maintenance for non-profits follows a dedicated solidarity rate: it is not automatically half the standard price, but stays well below market rates. At delivery the infrastructure is registered in the organisation's name and the source code belongs to it.

## Contact

- Website: ${BASE_URL}/en
- Email: contact@lechoppeducode.com
- GitHub: https://github.com/B-ludovic
- Portfolio: https://b-ludovic.dev

Full version of this document, articles included: ${BASE_URL}/llms-full.txt

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

/* Index seul : la carte du site, telle que la convention llms.txt la décrit. */
export function llmsIndex(): string {
  return body()
}

/* Version intégrale : la même carte, suivie du texte complet de chaque article.
   Un crawler qui suit un lien du llms.txt reçoit sinon du HTML — navigation,
   styles, JSON-LD — qu'il doit nettoyer avant de comprendre, et qu'il tronque
   souvent avant la fin. Ici, il reçoit la source. */
export function llmsFull(): string {
  const sections = (['fr', 'en'] as const).map((locale) => {
    const heading = locale === 'fr' ? '# Le Carnet — articles complets' : '# Journal — full articles'
    const posts = getAllPosts(locale)
      .map((meta) => {
        const post = getPost(meta.slug, locale)
        if (!post) return ''
        const url = `${BASE_URL}/${locale}/blog/${post.slug}`
        const brief = post.summary?.length
          ? `\n> ${post.summary.join('\n> ')}\n`
          : ''
        return [
          `## ${post.title}`,
          '',
          `${url} — ${post.date}`,
          '',
          post.description,
          brief,
          post.content.trim(),
        ].join('\n')
      })
      .filter(Boolean)
      .join('\n\n---\n\n')
    return `${heading}\n\n${posts}`
  })

  return [body(), '', '---', '', ...sections].join('\n')
}
