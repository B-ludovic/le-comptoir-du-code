import type { CaseStudy } from './index'

/* Chantier 03 — Fairy Chair Studio.

   La boutique est livrée, testée et fonctionnelle, mais son catalogue n'est pas
   ouvert à la vente : le site en production ne sert aucun prix. Aucune phrase de
   cette page ne suppose donc un commerce en activité — pas de commande traitée,
   pas de « zéro survente » qui serait un zéro trivial et inviterait la seule
   question à laquelle on ne peut pas répondre.

   La page dit ce qui est livré et ce que la mécanique sait faire, ce qui est
   entièrement vrai. Elle ne dit pas pourquoi le rayon est vide : ce n'est pas
   au prestataire de commenter publiquement le calendrier de sa cliente.

   L'ouverture est le montage de la vitrine, comme sur les deux autres
   chantiers : les pages sont peu hautes, et ce que la version téléphone ajoute
   au récit, un défilement filmé ne l'apprendrait pas. */

export const fairyChairStudio: CaseStudy = {
  slug: 'fairy-chair-studio',
  number: '03',

  /* Le montage d'ouverture : la vitrine sur écran large, et à côté le même site
     sur téléphone. Une capture desktop seule laisse ouverte la question que se
     pose tout visiteur venu juger du travail — « et sur mobile ? ». */
  hero: {
    kind: 'composite',
    desktop: { src: '/images/accueil-fcs.webp', width: 2400, height: 1385 },
    mobiles: [
      { src: '/images/mobile-fcs.webp', width: 974, height: 2164 },
      { src: '/images/burger-fcs.webp', width: 974, height: 2164 },
    ],
  },

  gallery: [
    { src: '/images/fcs-bijoux.png', width: 3450, height: 2166 },
    { src: '/images/fcs-drawer.png', width: 3450, height: 2166 },
  ],

  stack: [
    'Next.js', 'NestJS', 'PostgreSQL', 'Prisma',
    'Stripe', 'Brevo', 'Tiptap', 'Sentry',
  ],

  content: {
    fr: {
      metaTitle: "Fairy Chair Studio — étude de cas | L'Échoppe du Code",
      metaDescription:
        "E-commerce bilingue pour un salon de coiffure afro : boutique, paiements Stripe, remboursements partiels, factures et avoirs PDF, chaîne d'expédition et espace admin complet. Le chantier raconté en détail.",
      kind: 'E-commerce',
      status: 'En production',
      lede:
        "E-commerce complet pour un salon de coiffure afro : boutique bilingue — gamme Love Your Curls et bijoux —, paiements Stripe, newsletters, et un espace admin qui tient tout, des commandes aux horaires du salon.",
      facts: [
        { label: 'Client', value: 'Fairy Chair Studio' },
        { label: 'Secteur', value: 'Coiffure & cosmétique' },
        /* À REMPLACER par la date réelle de mise en production. */
        { label: 'Livraison', value: '2025' },
        { label: 'Rôle', value: 'Conception & développement' },
        { label: 'Voir', value: 'fairychairstudio.com', href: 'https://fairychairstudio.com/fr' },
      ],
      heroCaption:
        "La page d'accueil, sur écran large et sur téléphone : le salon, ses spécialités et sa gamme — en français et en anglais.",
      heroMobileAlts: [
        'Le premier écran sur téléphone : la réservation et la boutique offertes côte à côte.',
        'Le menu de navigation ouvert : les prestations, la réservation, le compte client et la bascule vers l\'anglais.',
      ],
      back: 'Retour aux archives',

      brief: {
        kicker: 'La commande',
        title: 'Un salon qui voulait vendre au-delà de ses murs',
        lead:
          "Une gérante, une gamme de soins, des bijoux — et des journées déjà pleines de clientes en fauteuil.",
        body: [
          "Fairy Chair Studio est un salon de coiffure afro qui vit d'abord de ses fauteuils. Sa gérante voulait prolonger le salon en ligne : vendre sa gamme de soins Love Your Curls et ses bijoux, présenter ses prestations et son équipe, tenir sa clientèle informée — **sans que la boutique lui vole le temps qu'elle doit au salon**.",
          "Deux décisions ont cadré le chantier. La réservation des prestations reste chez Planity, où la clientèle a déjà ses habitudes — on ne réinvente pas la roue, on la branche. Et tout ce qui peut se passer de la gérante doit s'en passer : paiement, facture, avoir, email d'expédition, remise en rayon des paniers abandonnés. **La boutique devait savoir travailler seule.**",
        ],
      },

      personas: {
        kicker: 'Ce qui a été construit',
        title: 'La cliente, la gérante — et la boutique qui veille',
        lead:
          "Deux personnes se servent de l'outil. La troisième travailleuse de la maison, c'est la boutique elle-même.",
        items: [
          {
            role: 'La cliente',
            verb: 'commande',
            body:
              "Elle crée son compte — email vérifié avant la première connexion —, remplit son panier dans la boutique bilingue et paie par Stripe, **en livraison ou en retrait au salon**. Les avis validés l'éclairent sur les fiches produits, et dès l'envoi de son colis, elle reçoit **son numéro de suivi et le lien La Poste**. Pour une coiffure, un clic la mène sur Planity.",
          },
          {
            role: 'La gérante',
            verb: 'pilote',
            body:
              "Entre deux clientes, elle gère produits, commandes, promotions et horaires du salon — affichés en temps réel sur la vitrine. Un retour ? **Elle sélectionne les lignes à rembourser, et Stripe, l'avoir et l'email au client suivent dans la seconde**. Un clic exporte ses commandes au format Colissimo Entreprise, et un guide intégré, module par module, lui rappelle chaque geste.",
          },
          {
            role: 'La boutique',
            verb: 'veille',
            body:
              "La nuit, elle fait le ménage : **les paniers abandonnés depuis 24 heures sont annulés et leurs articles remis en rayon**. Les meilleures ventes de l'accueil se reclassent d'elles-mêmes à chaque commande payée, et Sentry monte la garde — si quelque chose se casse, le développeur le sait avant la gérante.",
          },
        ],
      },

      results: {
        kicker: 'Le résultat',
        title: 'Une boutique livrée prête à tenir son rayon',
        /* Registre de ce qui est livré, pas d'un commerce en activité : le
           catalogue n'est pas ouvert à la vente. Chaque phrase reste vraie le
           jour de la livraison comme le jour de la première commande. */
        lead:
          "Encaisser, facturer, rembourser, expédier : le parcours marchand est complet et automatique de bout en bout — la gérante garde ses journées pour ses clientes.",
        items: [
          { value: '2 langues', label: 'de l’accueil au tunnel de commande, FAQ et e-mails compris' },
          { value: '24 h', label: 'avant qu’un panier abandonné rende son stock au rayon' },
          { value: '0 €', label: 'd’abonnement mensuel à une plateforme — la boutique appartient au salon' },
        ],
      },

      gallery: {
        kicker: 'En images',
        title: 'Du rayon au panier',
        lead:
          "Deux écrans : la boutique bijoux côté cliente, et le panier en tiroir qui tire le stock en temps réel.",
        shots: [
          {
            alt: 'Boutique bijoux de Fairy Chair Studio',
            caption: 'La boutique bijoux : fiches produits, avis validés, stock affiché.',
          },
          {
            alt: 'Panier en tiroir ouvert sur la boutique',
            caption: 'Le panier en tiroir : le stock se vérifie en direct, sans quitter la page.',
          },
        ],
      },

      challenge: {
        kicker: 'Le nœud du chantier',
        title: 'Deux clientes, un dernier article',
        lead: "Le problème le plus dur du chantier, celui qui a décidé de la forme du reste.",
        quote:
          "Deux clientes sur le dernier article, un code promo tiré deux fois au même instant, deux avoirs qui réclament le même numéro : chaque course critique a été fermée en base — transactions sérialisables et écritures conditionnelles — plutôt que dans l'interface.",
      },

      workshop: {
        kicker: 'Sous le capot',
        title: 'Ce qui tient la maison debout',
        lead: "Pour les curieux et les gens du métier : la mécanique, quand personne ne regarde.",
        items: [
          {
            title: 'Pas de survente possible',
            body:
              "Le stock est vérifié avant l'ouverture de la session Stripe, puis décrémenté en une écriture conditionnelle — elle n'aboutit que si le stock suffit encore à l'instant même. Deux clientes ne peuvent pas acheter le dernier article en même temps ; la seconde est prévenue, pas débitée.",
          },
          {
            title: 'Le remboursement en un geste',
            body:
              "Depuis l'admin, les lignes se sélectionnent une à une avec leur quantité : le remboursement Stripe part immédiatement, l'avoir se génère dans la foulée — montants en négatif, HT, TVA et TTC — et le client reçoit son email, sans attendre le retour du webhook.",
          },
          {
            title: "Chaîne d'expédition intégrée",
            body:
              "Un export CSV prêt pour Colissimo Entreprise — poids calculé ligne à ligne, emballage compris — passe les commandes en préparation. La saisie du numéro de suivi les expédie en envoyant au client son lien de tracking La Poste.",
          },
          {
            title: 'Un courrier unifié et signé',
            body:
              "Tous les emails partent d'un même socle — vérification, bienvenue, confirmation, expédition, newsletter Tiptap via Brevo — et le lien de désabonnement est signé HMAC : impossible de désabonner quelqu'un d'autre en manipulant l'URL.",
          },
          {
            title: 'Des sessions qui se révoquent',
            body:
              "Session en cookie invisible du navigateur, double jeton à rafraîchissement, et un tampon en base : à la déconnexion, tout jeton émis avant l'instant est rejeté. L'inscription et la connexion sont limitées à cinq essais par minute et par adresse.",
          },
          {
            title: 'Une vitrine qui se référence seule',
            body:
              "Données structurées HairSalon, Product et FAQPage, hreflang sur les deux langues, sitemap daté produit par produit, et un catalogue complet servi aux moteurs IA, remis à jour chaque jour. Le tout accessible au clavier, panier en tiroir compris.",
          },
        ],
      },

      cta: {
        title: 'Un chantier de cette ampleur commence petit.',
        body:
          "Toujours par la même porte : un cadrage qui pose le périmètre, l'architecture et le budget — avant la première ligne de code.",
        primary: 'Réserver un cadrage',
        secondary: 'Voir les autres chantiers',
      },
    },

    en: {
      metaTitle: "Fairy Chair Studio — case study | L'Échoppe du Code",
      metaDescription:
        'Bilingual e-commerce for an Afro hair salon: shop, Stripe payments, partial refunds, PDF invoices and credit notes, shipping chain and a full admin area. The project in full.',
      kind: 'E-commerce',
      status: 'In production',
      lede:
        'A complete e-commerce site for an Afro hair salon: a bilingual shop — the Love Your Curls range and jewellery —, Stripe payments, newsletters, and an admin area that holds it all, from orders to the salon’s opening hours.',
      facts: [
        { label: 'Client', value: 'Fairy Chair Studio' },
        { label: 'Sector', value: 'Hair & cosmetics' },
        { label: 'Delivered', value: '2025' },
        { label: 'Role', value: 'Design & development' },
        { label: 'Visit', value: 'fairychairstudio.com', href: 'https://fairychairstudio.com/en' },
      ],
      heroCaption:
        'The home page, on a wide screen and on a phone: the salon, its specialities and its range — in French and English.',
      heroMobileAlts: [
        'The first screen on a phone: booking and the shop offered side by side.',
        'The navigation menu open: services, booking, the customer account and the switch to English.',
      ],
      back: 'Back to selected work',

      brief: {
        kicker: 'The brief',
        title: 'A salon that wanted to sell beyond its walls',
        lead:
          'One owner, a range of hair care, some jewellery — and days already full of clients in the chair.',
        body: [
          'Fairy Chair Studio is an Afro hair salon that lives first and foremost off its chairs. Its owner wanted to extend the salon online: sell her Love Your Curls range and her jewellery, present her services and her team, keep her clients informed — **without the shop stealing the time she owes the salon**.',
          'Two decisions framed the project. Service booking stays with Planity, where the clients already have their habits — you do not reinvent the wheel, you plug it in. And anything that can happen without the owner must happen without her: payment, invoice, credit note, dispatch email, abandoned baskets put back on the shelf. **The shop had to know how to work alone.**',
        ],
      },

      personas: {
        kicker: 'What was built',
        title: 'The client, the owner — and the shop that keeps watch',
        lead:
          'Two people use the tool. The third worker in the house is the shop itself.',
        items: [
          {
            role: 'The client',
            verb: 'orders',
            body:
              'She creates her account — email verified before the first sign-in —, fills her basket in the bilingual shop and pays with Stripe, **for delivery or collection at the salon**. Approved reviews inform her on the product pages, and as soon as her parcel goes out she gets **her tracking number and the carrier link**. For a haircut, one click takes her to Planity.',
          },
          {
            role: 'The owner',
            verb: 'runs it',
            body:
              'Between two clients, she manages products, orders, promotions and the salon’s opening hours — shown live on the shop window. A return? **She picks the lines to refund, and Stripe, the credit note and the customer email follow within the second**. One click exports her orders in the carrier’s format, and a built-in guide, module by module, reminds her of every step.',
          },
          {
            role: 'The shop',
            verb: 'keeps watch',
            body:
              'At night it tidies up: **baskets abandoned for 24 hours are cancelled and their items put back on the shelf**. The best sellers on the home page re-rank themselves with every paid order, and Sentry stands guard — if something breaks, the developer knows before the owner does.',
          },
        ],
      },

      results: {
        kicker: 'The outcome',
        title: 'A shop delivered ready to hold its own shelf',
        lead:
          'Taking payment, invoicing, refunding, shipping: the retail journey is complete and automatic end to end — the owner keeps her days for her clients.',
        items: [
          { value: '2 languages', label: 'from the home page to the checkout, FAQ and emails included' },
          { value: '24 h', label: 'before an abandoned basket gives its stock back to the shelf' },
          { value: '£0', label: 'in monthly platform fees — the shop belongs to the salon' },
        ],
      },

      gallery: {
        kicker: 'In pictures',
        title: 'From the shelf to the basket',
        lead:
          'Two screens: the jewellery shop on the client’s side, and the drawer basket that reads stock live.',
        shots: [
          {
            alt: 'Fairy Chair Studio jewellery shop',
            caption: 'The jewellery shop: product pages, approved reviews, stock on show.',
          },
          {
            alt: 'Drawer basket open over the shop',
            caption: 'The drawer basket: stock is checked live, without leaving the page.',
          },
        ],
      },

      challenge: {
        kicker: 'The hard part',
        title: 'Two clients, one last item',
        lead: 'The hardest problem of the project, and the one that shaped everything else.',
        quote:
          'Two clients on the last item, a promo code drawn twice at the same instant, two credit notes claiming the same number: every critical race was closed in the database — serialisable transactions and conditional writes — rather than in the interface.',
      },

      workshop: {
        kicker: 'Under the bonnet',
        title: 'What holds the house up',
        lead: 'For the curious and for people in the trade: the mechanism, when nobody is watching.',
        items: [
          {
            title: 'Overselling is impossible',
            body:
              'Stock is checked before the Stripe session opens, then decremented in a conditional write — one that only succeeds if stock is still sufficient at that very instant. Two clients cannot buy the last item at the same time; the second is told, not charged.',
          },
          {
            title: 'Refunds in one gesture',
            body:
              'From the admin, lines are picked one by one with their quantity: the Stripe refund goes out immediately, the credit note is generated straight after — negative amounts, net, VAT and gross — and the customer gets their email, without waiting for the webhook to come back.',
          },
          {
            title: 'Shipping chain built in',
            body:
              'A CSV export ready for the carrier — weight computed line by line, packaging included — moves orders into preparation. Entering the tracking number ships them, sending the customer their tracking link.',
          },
          {
            title: 'Mail unified and signed',
            body:
              'Every email goes out on a common base — verification, welcome, confirmation, dispatch, Tiptap newsletter via Brevo — and the unsubscribe link is HMAC-signed: nobody can unsubscribe somebody else by editing the URL.',
          },
          {
            title: 'Sessions that can be revoked',
            body:
              'Session in a cookie the browser cannot read, twin refreshing tokens, and a stamp in the database: on sign-out, any token issued before that instant is rejected. Sign-up and sign-in are limited to five attempts per minute per address.',
          },
          {
            title: 'A shop window that indexes itself',
            body:
              'HairSalon, Product and FAQPage structured data, hreflang across both languages, a sitemap dated product by product, and a full catalogue served to AI engines, refreshed daily. All of it keyboard accessible, drawer basket included.',
          },
        ],
      },

      cta: {
        title: 'A project this size starts small.',
        body:
          'Always through the same door: a scoping workshop that sets the scope, the architecture and the budget — before the first line of code.',
        primary: 'Book a scoping workshop',
        secondary: 'See the other projects',
      },
    },
  },
}
