import type { CaseStudy } from './index'

/* Chantier 01 — Miabelangue.

   Le rail de paiement en francs CFA est écrit, testé et prêt, mais il
   n'encaisse encore rien : l'école n'a pas ouvert sa structure au Togo. Il
   n'est donc jamais annoncé comme un flux en production — ni dans les
   chiffres du chapitre « Le résultat », ni ailleurs. Sa place est sous le
   capot, au temps qui convient : construit, en attente d'une décision qui
   appartient à la cliente. */

export const miabelangue: CaseStudy = {
  slug: 'miabelangue',
  number: '01',

  hero: {
    kind: 'video',
    poster: '/videos/miabe-accueil.jpg',
    mp4: '/videos/miabe-accueil.mp4',
    webm: '/videos/miabe-accueil.webm',
  },

  gallery: [
    { src: '/images/onboarding-miabe.png', width: 3450, height: 2166 },
    { src: '/images/admin-miabe.png', width: 3450, height: 2166 },
  ],

  stack: [
    'Next.js', 'NestJS', 'PostgreSQL', 'Prisma',
    'Stripe', 'Socket.io', 'Cal.com', 'Resend', 'Cloudflare R2',
  ],

  content: {
    fr: {
      metaTitle: "Miabelangue — étude de cas | L'Échoppe du Code",
      metaDescription:
        "École de langue en ligne pour la diaspora togolaise : cours protégés, séances avec professeur, abonnements et librairie, en trois langues. Le chantier raconté en détail.",
      kind: "Plateforme d'apprentissage",
      status: 'En production',
      lede:
        "Une école de langue en ligne, construite de zéro pour la diaspora togolaise : apprendre le mina et l'éwé, réserver un professeur, acheter ses livres — en trois langues, du premier écran jusqu'aux factures.",
      facts: [
        { label: 'Client', value: 'Miabelangue' },
        { label: 'Secteur', value: 'Éducation en ligne' },
        { label: 'Livraison', value: 'Août 2026' },
        { label: 'Rôle', value: 'Conception & développement' },
        { label: 'Voir', value: 'miabelangue.com', href: 'https://miabelangue.com/fr' },
      ],
      heroCaption:
        "La vitrine publique, du premier écran aux formules — en français, anglais et allemand.",
      back: 'Retour aux archives',

      brief: {
        kicker: 'La commande',
        title: "Une langue qu'on n'apprend nulle part ailleurs",
        lead:
          "Un lieu unique pour des élèves dispersés entre la France, l'Allemagne et le monde anglophone — et rien sur le marché pour le faire.",
        body: [
          "Quand on grandit loin du pays, la langue est souvent le premier lien qui s'effiloche. La fondatrice de Miabelangue voulait un lieu unique où le retrouver : des cours écrits, des vidéos et des audios, des séances en direct avec un professeur, et une boutique de livres.",
          "Il n'existait rien sur quoi s'appuyer. Pas de logiciel du marché qui combine cours protégés, réservation de professeurs, abonnements et librairie, encore moins en trois langues avec des élèves sur plusieurs fuseaux horaires. **Tout était à construire, et tout devait tenir sans équipe technique derrière** : la plateforme se gère depuis un back-office, par l'école elle-même.",
        ],
      },

      personas: {
        kicker: 'Ce qui a été construit',
        title: 'Trois personnes, un même outil',
        lead:
          "La meilleure façon de comprendre ce qui a été livré, c'est de suivre les trois personnes qui s'en servent chaque jour.",
        items: [
          {
            role: "L'élève",
            verb: 'apprend',
            body:
              "Elle s'inscrit, choisit un abonnement, et son espace affiche **ses cours, sa bibliothèque et son solde de séances**. Elle réserve un créneau avec son professeur en précisant son objectif, échange avec lui par messages écrits ou vocaux, et reçoit chaque rappel **à l'heure de sa propre montre** — qu'elle vive à Paris, Berlin ou Londres.",
          },
          {
            role: 'Le professeur',
            verb: 'enseigne',
            body:
              "Il déclare ses disponibilités, retrouve chaque réservation **dans son agenda et dans son espace**, et anime ses classes de discussion. Après chaque séance, son débrief pose le niveau de l'élève et **ouvre le cours travaillé** — c'est ce geste qui relie la séance vécue au contenu en ligne.",
          },
          {
            role: 'La propriétaire',
            verb: 'pilote',
            body:
              "Depuis son back-office, elle crée les cours, met les supports en ligne, gère les livres, suit les élèves et les réservations. Les factures se génèrent seules, les e-mails partent seuls, les relances aussi : **aucun geste manuel n'est nécessaire nulle part** dans le parcours d'un élève.",
          },
        ],
      },

      results: {
        kicker: 'Le résultat',
        title: 'Une école qui tourne sans son développeur',
        lead:
          "Le parcours complet — inscription, achat, apprentissage, réservation, facture, clôture de compte — fonctionne de bout en bout, sans intervention technique.",
        items: [
          { value: '3 langues', label: 'du premier écran jusqu’aux factures PDF' },
          { value: '0 €', label: 'd’abonnement logiciel par professeur, quel que soit leur nombre' },
          { value: '0 geste', label: 'manuel dans le parcours d’un élève, de l’inscription à la clôture' },
        ],
      },

      gallery: {
        kicker: 'En images',
        title: "L'outil, de l'élève à l'atelier",
        lead:
          "Deux écrans : ce que voit un nouvel élève, et ce que la propriétaire pilote depuis son back-office.",
        shots: [
          {
            alt: "Parcours d'accueil d'un nouvel élève sur Miabelangue",
            caption: "L'arrivée d'un nouvel élève : choisir sa langue, son niveau, son abonnement.",
          },
          {
            alt: "Back-office de gestion de l'école Miabelangue",
            caption: "Le back-office : cours, livres, élèves, réservations — l'école se pilote ici.",
          },
        ],
      },

      challenge: {
        kicker: 'Le nœud du chantier',
        title: 'Deux caisses, une seule comptabilité',
        lead: "Le problème le plus dur du chantier, celui qui a décidé de la forme du reste.",
        quote:
          "Deux caisses en deux monnaies devaient produire une seule comptabilité : l'encaissement d'une commande n'est écrit qu'une fois, côté serveur — et le franc CFA, qui n'a pas de centime, a imposé des montants en francs entiers jusque dans les factures PDF.",
      },

      workshop: {
        kicker: 'Sous le capot',
        title: 'Ce qui tient la maison debout',
        lead: "Pour les curieux et les gens du métier : la mécanique, quand personne ne regarde.",
        items: [
          {
            title: 'Deux caisses, un seul bordereau',
            body:
              "Carte en euros via Stripe, mobile money en francs CFA via CinetPay : les deux rails remplissent la même écriture côté serveur. L'encaissement — jetons posés, facture émise — n'existe qu'une fois dans le code. Le rail CFA est construit, couvert par les tests et prêt à encaisser ; il attend l'ouverture de la structure togolaise, une décision qui appartient à l'école.",
          },
          {
            title: 'Facturation réglementaire',
            body:
              "Factures et avoirs sur deux séries de numérotation continues, l'avoir reprenant les taux de TVA de la pièce qu'il crédite, PDF archivés et journal des envois consultable pièce par pièce.",
          },
          {
            title: "Une réservation qui s'entretient seule",
            body:
              "Le webhook Cal.com se réenregistre à chaque démarrage, une ronde demi-horaire rattrape les annulations perdues, et la salle d'un nouveau professeur se crée en un clic depuis le back-office.",
          },
          {
            title: "Le courrier à l'heure du destinataire",
            body:
              "Rappels de séance, cycle d'abonnement, échéance refusée par la banque : chaque e-mail part dans la langue de son destinataire, à l'heure de son fuseau, et laisse une trace au journal des envois, purgé à douze mois.",
          },
          {
            title: 'RGPD par construction',
            body:
              "Consentement parental bloquant pour les mineurs, clôture de compte par anonymisation — les preuves de consentement et les factures restent rattachées —, purges programmées et journal d'audit des gestes sensibles.",
          },
          {
            title: '1 361 tests sur une vraie base',
            body:
              "Les chemins qui font perdre de l'argent ou de la confiance — encaissement, remboursement, litige, annulation tardive — sont tenus par 1 361 tests d'API sur un vrai Postgres et six parcours de bout en bout dans un vrai navigateur.",
          },
        ],
      },

      cta: {
        title: "Un chantier de cette ampleur commence petit.",
        body:
          "Toujours par la même porte : un cadrage qui pose le périmètre, l'architecture et le budget — avant la première ligne de code.",
        primary: 'Réserver un cadrage',
        secondary: 'Voir les autres chantiers',
      },
    },

    en: {
      metaTitle: "Miabelangue — case study | L'Échoppe du Code",
      metaDescription:
        'Online language school for the Togolese diaspora: protected lessons, one-to-one teacher sessions, subscriptions and a bookshop, in three languages. The project in full.',
      kind: 'Learning platform',
      status: 'In production',
      lede:
        'An online language school, built from scratch for the Togolese diaspora: learn Mina and Ewe, book a teacher, buy the books — in three languages, from the first screen through to the invoices.',
      facts: [
        { label: 'Client', value: 'Miabelangue' },
        { label: 'Sector', value: 'Online education' },
        { label: 'Delivered', value: 'August 2026' },
        { label: 'Role', value: 'Design & development' },
        { label: 'Visit', value: 'miabelangue.com', href: 'https://miabelangue.com/en' },
      ],
      heroCaption:
        'The public site, from the first screen to the plans — in French, English and German.',
      back: 'Back to selected work',

      brief: {
        kicker: 'The brief',
        title: 'A language you cannot learn anywhere else',
        lead:
          'One place for students scattered across France, Germany and the English-speaking world — and nothing on the market that could do it.',
        body: [
          'When you grow up far from the country, the language is often the first thread to fray. The founder of Miabelangue wanted a single place to pick it back up: written lessons, video and audio, live sessions with a teacher, and a bookshop.',
          'There was nothing to build on. No off-the-shelf software combines protected lessons, teacher booking, subscriptions and a bookshop — let alone in three languages, with students across several time zones. **Everything had to be built, and all of it had to hold without a technical team behind it**: the platform is run from a back office, by the school itself.',
        ],
      },

      personas: {
        kicker: 'What was built',
        title: 'Three people, one tool',
        lead:
          'The clearest way to understand what was delivered is to follow the three people who use it every day.',
        items: [
          {
            role: 'The student',
            verb: 'learns',
            body:
              'She signs up, picks a plan, and her space shows **her lessons, her library and her session balance**. She books a slot with her teacher and states her goal, exchanges written and voice messages, and gets every reminder **on her own clock** — whether she lives in Paris, Berlin or London.',
          },
          {
            role: 'The teacher',
            verb: 'teaches',
            body:
              'He sets his availability, finds every booking **in his calendar and in his space**, and runs his discussion classes. After each session, his debrief records the student’s level and **opens the lesson they worked on** — the gesture that ties the live session to the online content.',
          },
          {
            role: 'The owner',
            verb: 'runs it',
            body:
              'From her back office she creates lessons, uploads the materials, manages the books, follows students and bookings. Invoices generate themselves, emails send themselves, so do the reminders: **no manual step is needed anywhere** in a student’s journey.',
          },
        ],
      },

      results: {
        kicker: 'The outcome',
        title: 'A school that runs without its developer',
        lead:
          'The whole journey — sign-up, purchase, learning, booking, invoice, account closure — works end to end, with no technical intervention.',
        items: [
          { value: '3 languages', label: 'from the first screen through to the PDF invoices' },
          { value: '€0', label: 'in per-teacher software subscriptions, however many there are' },
          { value: '0 manual steps', label: 'in a student’s journey, from sign-up to closure' },
        ],
      },

      gallery: {
        kicker: 'In pictures',
        title: 'The tool, from the student to the workshop',
        lead:
          'Two screens: what a new student sees, and what the owner runs from her back office.',
        shots: [
          {
            alt: 'Onboarding flow for a new Miabelangue student',
            caption: 'A new student arrives: choosing a language, a level, a plan.',
          },
          {
            alt: 'Back office for running the Miabelangue school',
            caption: 'The back office: lessons, books, students, bookings — the school is run from here.',
          },
        ],
      },

      challenge: {
        kicker: 'The hard part',
        title: 'Two tills, one set of books',
        lead: 'The hardest problem of the project, and the one that shaped everything else.',
        quote:
          'Two tills in two currencies had to produce a single set of books: order settlement is written once, server-side — and the CFA franc, which has no cents, forced whole-franc amounts all the way into the PDF invoices.',
      },

      workshop: {
        kicker: 'Under the bonnet',
        title: 'What holds the house up',
        lead: 'For the curious and for people in the trade: the mechanism, when nobody is watching.',
        items: [
          {
            title: 'Two payment rails, one ledger',
            body:
              'Card payments in euros via Stripe, mobile money in CFA francs via CinetPay: both rails fill the same server-side record. Settlement — credits granted, invoice issued — exists exactly once in the code. The CFA rail is built, covered by tests and ready to take payments; it is waiting on the Togolese company being opened, a decision that belongs to the school.',
          },
          {
            title: 'Compliant invoicing',
            body:
              'Invoices and credit notes on two continuous numbering series, each credit note carrying the VAT rates of the document it credits, archived PDFs, and a delivery log you can read document by document.',
          },
          {
            title: 'Booking that maintains itself',
            body:
              'The Cal.com webhook re-registers on every startup, a half-hourly sweep catches missed cancellations, and a new teacher’s room is created in one click from the back office.',
          },
          {
            title: 'Mail on the recipient’s clock',
            body:
              'Session reminders, subscription cycle, a payment refused by the bank: every email goes out in its recipient’s language, at their local time, and leaves a trace in the delivery log, purged at twelve months.',
          },
          {
            title: 'GDPR by construction',
            body:
              'Blocking parental consent for minors, account closure by anonymisation — consent records and invoices stay attached —, scheduled purges and an audit log of sensitive actions.',
          },
          {
            title: '1,361 tests against a real database',
            body:
              'The paths that lose money or trust — settlement, refund, dispute, late cancellation — are held by 1,361 API tests against a real Postgres, plus six end-to-end journeys in a real browser.',
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
