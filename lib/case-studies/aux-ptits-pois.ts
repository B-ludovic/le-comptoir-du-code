import type { CaseStudy } from './index'

/* Chantier 02 — Aux P'tits Pois.

   Le récit tient sur une seule idée : l'outil doit survivre au bureau qui l'a
   commandé. « La commande » pose ce problème et s'arrête là ; « Le nœud du
   chantier » livre la réponse — le guide intégré et les garde-fous. La maquette
   donnait les deux au premier chapitre, puis les répétait deux fois : le
   lecteur qui descendait avait l'impression de relire.

   L'ouverture est le défilement de la vitrine, comme sur le chantier 01. */

export const auxPtitsPois: CaseStudy = {
  slug: 'aux-ptits-pois',
  number: '02',

  hero: {
    kind: 'video',
    poster: '/videos/ptitspois-accueil.jpg',
    mp4: '/videos/ptitspois-accueil.mp4',
    webm: '/videos/ptitspois-accueil.webm',
  },

  gallery: [
    { src: '/images/abonnement-auxptitspois.png', width: 3450, height: 2166 },
    { src: '/images/recette-auxptitspois.png', width: 3450, height: 2166 },
  ],

  stack: [
    'Next.js', 'Express', 'PostgreSQL', 'Prisma',
    'Puppeteer', 'Tiptap', 'Brevo', 'Zod', 'Vitest',
  ],

  content: {
    fr: {
      metaTitle: "Aux P'tits Pois — étude de cas | L'Échoppe du Code",
      metaDescription:
        "Plateforme de gestion d'AMAP : paniers hebdomadaires, adhérents et producteurs, permanences, trésorerie au chèque, contrats PDF et newsletters — tenue par des bénévoles. Le chantier raconté en détail.",
      kind: 'Plateforme associative',
      status: 'En production',
      lede:
        "Une AMAP gérée de bout en bout : paniers hebdomadaires, adhérents et producteurs, permanences, trésorerie, contrats PDF et newsletters — pensée dès la première ligne pour être tenue par des bénévoles.",
      facts: [
        { label: 'Client', value: "Aux P'tits Pois" },
        { label: 'Secteur', value: 'Association · circuits courts' },
        /* À REMPLACER par la date réelle de mise en production : « 2026 » seul,
           à côté du « Août 2026 » de Miabelangue, se lit comme un trou. */
        { label: 'Livraison', value: '2026' },
        { label: 'Rôle', value: 'Conception & développement' },
        { label: 'Voir', value: 'auxptitspois.fr', href: 'https://www.auxptitspois.fr' },
      ],
      heroCaption:
        "La vitrine publique : les producteurs, les abonnements et les recettes de la semaine.",
      back: 'Retour aux archives',

      brief: {
        kicker: 'La commande',
        title: 'Une association qui tournait sur papier',
        lead:
          "Des paniers, des chèques, des permanences et des bénévoles qui se relaient — tout tenait sur des tableurs et de la bonne volonté.",
        body: [
          "Une AMAP vit d'un rythme : chaque semaine, des paniers de légumes composés chez les fermes partenaires, distribués lors d'une permanence tenue par des adhérents bénévoles. Autour de ce rythme, une mécanique administrative entière — demandes d'abonnement, contrats signés, chèques encaissés au fil des mois, relances, newsletters — portée par un bureau qui change au gré des assemblées générales.",
          "La commande n'était donc pas « un site ». C'était **un outil que des bénévoles non techniciens puissent tenir seuls, d'une année sur l'autre**, sans dépendre de la personne qui l'a construit. Un logiciel dont le mode d'emploi vit dans la tête de son auteur meurt avec le mandat du bureau qui l'a commandé.",
        ],
      },

      personas: {
        kicker: 'Ce qui a été construit',
        title: 'Trois personnes, un même outil',
        lead:
          "La meilleure façon de comprendre ce qui a été livré, c'est de suivre les trois personnes qui s'en servent chaque semaine.",
        items: [
          {
            role: "L'adhérente",
            verb: 'reçoit son panier',
            body:
              "Elle demande son abonnement en ligne — formule, taille de panier, règlement en 1, 2 ou 4 chèques — avec **les montants exacts affichés avant l'envoi**. Chaque semaine, elle consulte le contenu de son panier, l'horaire et l'adresse du retrait, et pioche dans **les recettes suggérées d'après ses légumes**. Elle s'inscrit aux permanences, et reçoit un rappel **trente jours avant le dépôt de chacun de ses chèques**.",
          },
          {
            role: 'Le producteur',
            verb: 'fournit la semaine',
            body:
              "Sa ferme a sa fiche — commune, distance au point de retrait, certification — et ses produits portent leur saison. S'il déclare une absence, **ses produits sortent d'eux-mêmes du tirage des paniers** le temps qu'il faut. Les fermes candidates déposent leur demande en ligne et reçoivent une vraie réponse.",
          },
          {
            role: 'Le bureau bénévole',
            verb: 'tient la maison',
            body:
              "Dix-huit écrans d'administration, et **un guide intégré, écran par écran**, pour que la passation d'un bureau à l'autre ne perde rien. Les demandes se valident, **le contrat PDF sort pré-rempli**, la liste d'émargement se pointe en distribution, et le trésorier suit chaque chèque — en main, en banque, encaissé — avec **sa liste de remise reçue sept jours avant le dépôt**.",
          },
        ],
      },

      results: {
        kicker: 'Le résultat',
        title: 'Une AMAP qui se transmet',
        lead:
          "Demandes, contrats, chèques, paniers, courriers : l'association se pilote depuis son back-office, et l'outil survivra au bureau qui l'a commandé.",
        items: [
          { value: '18 écrans', label: "d’administration, chacun avec son guide intégré pour les bénévoles" },
          { value: '9 tâches', label: 'tournent toutes seules — rappels, paniers, purges, relances de chèques' },
          { value: 'Au centime', label: 'la somme des chèques égale exactement le prix du contrat, en 1, 2 ou 4 fois' },
        ],
      },

      gallery: {
        kicker: 'En images',
        /* Le titre suit ce que les captures montrent réellement — les deux sont
           côté public. Il n'existe aucune capture des dix-huit écrans
           d'administration, qui sont pourtant l'argument central de la page :
           une capture du back-office la rendrait nettement plus forte. */
        title: "Ce que voit l'adhérente",
        lead:
          "Deux écrans : le moment où elle choisit sa formule, et ce que le panier de la semaine lui souffle.",
        shots: [
          {
            alt: "Page des abonnements d'Aux P'tits Pois avec les formules et leurs montants",
            caption:
              "Les formules d'abonnement : les montants exacts, ventilation en chèques comprise, avant tout engagement.",
          },
          {
            alt: "Détail d'une recette suggérée d'après les légumes du panier",
            caption: 'Les recettes suggérées d’après les légumes du panier de la semaine.',
          },
        ],
      },

      challenge: {
        kicker: 'Le nœud du chantier',
        title: "Le vrai défi n'était pas technique",
        lead: "Le problème le plus dur du chantier, celui qui a décidé de la forme du reste.",
        quote:
          "L'outil est tenu par le bureau bénévole d'une association — des mains qui changent, pas des informaticiens. D'où un guide intégré, écran par écran, et des garde-fous qui refusent de démarrer sur une configuration incomplète plutôt que de tomber en panne plus tard, un mercredi de distribution.",
      },

      workshop: {
        kicker: 'Sous le capot',
        title: 'Ce qui tient la maison debout',
        lead: "Pour les curieux et les gens du métier : la mécanique, quand personne ne regarde.",
        items: [
          {
            title: "Le prix ne s'écrit jamais à la main",
            body:
              "Toute la tarification se déduit de deux nombres — le prix hebdomadaire du panier et le nombre de semaines réellement livrées — dans une source unique côté serveur. Le formulaire public et le contrat PDF signé lisent la même table, et la ventilation en chèques arrondit les premiers à l'euro puis fait absorber la monnaie au dernier : la somme égale exactement le prix.",
          },
          {
            title: 'La trésorerie au rythme du papier',
            body:
              "Chaque chèque suit son cycle — en main, en banque, encaissé ou rejeté — organisé autour de la remise du mois. L'adhérent est prévenu trente jours avant le dépôt, le trésorier reçoit sa liste de remise sept jours avant, et les chèques restés en pochette sont relancés.",
          },
          {
            title: "Le courrier ne s'arrête pas à l'envoi",
            body:
              "Confier un message au relais n'est que le premier temps : un webhook Brevo rapporte le second — remis, rejeté, signalé. Une adresse qui rebondit définitivement est écartée des envois ; une plainte pour indésirable coupe la lettre d'information mais jamais les messages du contrat — l'avis de dépôt d'un chèque doit continuer d'arriver.",
          },
          {
            title: 'Des paniers qui se composent seuls',
            body:
              "Chaque semaine, le panier suivant se tire du catalogue de la saison en cours, fermes absentes écartées, semaine sautée si une fermeture la couvre. La publication notifie les abonnés actifs par vagues — et un envoi interrompu en plein vol reprend au redémarrage, sans écrire deux fois aux adresses déjà servies.",
          },
          {
            title: 'Des garde-fous plutôt que des pannes',
            body:
              "Sans sa configuration complète, le serveur refuse de démarrer au lieu de rater ses connexions en silence. Le site peut vivre en ligne porte fermée — une invitation signée laisse entrer le bureau avant l'ouverture publique — et trente-deux actions d'administration laissent leur trace au journal d'audit : qui, quoi, quand.",
          },
          {
            title: 'RGPD par construction',
            body:
              "Export des données personnelles et suppression de compte en libre-service, purge définitive des comptes supprimés après quatre-vingt-dix jours — en transaction, et un compte restauré entre-temps y échappe. Session en cookie invisible du navigateur, révocable à l'instant, et consentement cookies conforme dès la première visite.",
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
      metaTitle: "Aux P'tits Pois — case study | L'Échoppe du Code",
      metaDescription:
        'Management platform for a community-supported agriculture scheme: weekly veg boxes, members and growers, volunteer shifts, cheque bookkeeping, PDF contracts and newsletters — run by volunteers. The project in full.',
      kind: 'Community platform',
      status: 'In production',
      lede:
        'A community-supported agriculture scheme run end to end: weekly veg boxes, members and growers, volunteer shifts, bookkeeping, PDF contracts and newsletters — designed from the first line to be run by volunteers.',
      facts: [
        { label: 'Client', value: "Aux P'tits Pois" },
        { label: 'Sector', value: 'Non-profit · local food' },
        { label: 'Delivered', value: '2026' },
        { label: 'Role', value: 'Design & development' },
        { label: 'Visit', value: 'auxptitspois.fr', href: 'https://www.auxptitspois.fr' },
      ],
      heroCaption:
        'The public site: the growers, the membership plans and the recipes of the week.',
      back: 'Back to selected work',

      brief: {
        kicker: 'The brief',
        title: 'An association still running on paper',
        lead:
          'Veg boxes, cheques, volunteer shifts and people taking turns — all of it held together by spreadsheets and goodwill.',
        body: [
          'A CSA scheme lives by a rhythm: every week, boxes of vegetables put together at the partner farms and handed out at a collection run by volunteer members. Around that rhythm sits a whole administrative machine — membership applications, signed contracts, cheques banked over the months, reminders, newsletters — carried by a committee that changes at every annual meeting.',
          'So the brief was never “a website”. It was **a tool that non-technical volunteers could run on their own, year after year**, without depending on the person who built it. Software whose instructions live in its author’s head dies with the committee that commissioned it.',
        ],
      },

      personas: {
        kicker: 'What was built',
        title: 'Three people, one tool',
        lead:
          'The clearest way to understand what was delivered is to follow the three people who use it every week.',
        items: [
          {
            role: 'The member',
            verb: 'collects her box',
            body:
              'She applies online — plan, box size, payment in 1, 2 or 4 cheques — with **the exact amounts shown before she submits**. Each week she checks what is in her box, the time and place of collection, and picks from **recipes suggested from her own vegetables**. She signs up for volunteer shifts, and gets a reminder **thirty days before each of her cheques is banked**.',
          },
          {
            role: 'The grower',
            verb: 'supplies the week',
            body:
              'His farm has its page — parish, distance to the collection point, certification — and his produce carries its season. If he declares an absence, **his produce drops out of the box selection by itself** for as long as needed. Farms wanting to join apply online and get a real answer.',
          },
          {
            role: 'The volunteer committee',
            verb: 'keeps the house',
            body:
              'Eighteen admin screens, and **a built-in guide on every one of them**, so that handing over from one committee to the next loses nothing. Applications are approved, **the PDF contract comes out pre-filled**, the attendance sheet is ticked off at collection, and the treasurer follows every cheque — in hand, at the bank, cleared — with **the paying-in list arriving seven days before the deposit**.',
          },
        ],
      },

      results: {
        kicker: 'The outcome',
        title: 'A CSA scheme that can be handed on',
        lead:
          'Applications, contracts, cheques, boxes, mail: the association runs itself from its back office, and the tool will outlive the committee that commissioned it.',
        items: [
          { value: '18 screens', label: 'of administration, each with its own built-in guide for volunteers' },
          { value: '9 jobs', label: 'run on their own — reminders, boxes, purges, cheque chasing' },
          { value: 'To the penny', label: 'the cheques add up to exactly the contract price, in 1, 2 or 4 instalments' },
        ],
      },

      gallery: {
        kicker: 'In pictures',
        title: 'What the member sees',
        lead:
          'Two screens: the moment she picks her plan, and what the week’s box suggests to her.',
        shots: [
          {
            alt: "Aux P'tits Pois membership page showing the plans and their prices",
            caption:
              'The membership plans: exact amounts, cheque breakdown included, before any commitment.',
          },
          {
            alt: 'A recipe suggested from the vegetables in the box',
            caption: 'Recipes suggested from the vegetables in the week’s box.',
          },
        ],
      },

      challenge: {
        kicker: 'The hard part',
        title: 'The real difficulty was not technical',
        lead: 'The hardest problem of the project, and the one that shaped everything else.',
        quote:
          'The tool is run by the volunteer committee of an association — hands that change, not IT people. Hence a guide built into every screen, and safeguards that refuse to start on an incomplete configuration rather than fail later, on a collection Wednesday.',
      },

      workshop: {
        kicker: 'Under the bonnet',
        title: 'What holds the house up',
        lead: 'For the curious and for people in the trade: the mechanism, when nobody is watching.',
        items: [
          {
            title: 'The price is never typed by hand',
            body:
              'All pricing derives from two numbers — the weekly box price and the number of weeks actually delivered — in a single server-side source. The public form and the signed PDF contract read the same table, and the cheque breakdown rounds the first instalments to the pound and lets the last one absorb the remainder: the total is exactly the price.',
          },
          {
            title: 'Bookkeeping at the pace of paper',
            body:
              'Every cheque follows its cycle — in hand, at the bank, cleared or bounced — organised around the month’s deposit. The member is warned thirty days before it is banked, the treasurer gets the paying-in list seven days ahead, and cheques still sitting in the folder are chased.',
          },
          {
            title: 'Mail does not stop at sending',
            body:
              'Handing a message to the relay is only the first half: a Brevo webhook reports the second — delivered, bounced, flagged. An address that hard-bounces is dropped from sends; a spam complaint stops the newsletter but never the contract messages — notice that a cheque is about to be banked has to keep arriving.',
          },
          {
            title: 'Boxes that compose themselves',
            body:
              'Each week the next box is drawn from the current season’s catalogue, absent farms excluded, the week skipped if a closure covers it. Publishing notifies active members in waves — and a send interrupted mid-flight resumes on restart, without writing twice to addresses already served.',
          },
          {
            title: 'Safeguards rather than failures',
            body:
              'Without its full configuration, the server refuses to start rather than miss its connections in silence. The site can live online with the door shut — a signed invitation lets the committee in before the public opening — and thirty-two administrative actions leave their trace in the audit log: who, what, when.',
          },
          {
            title: 'GDPR by construction',
            body:
              'Self-service export of personal data and account deletion, permanent purge of deleted accounts after ninety days — in a transaction, and an account restored in the meantime escapes it. Session held in a cookie the browser cannot read, revocable instantly, and cookie consent compliant from the first visit.',
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
