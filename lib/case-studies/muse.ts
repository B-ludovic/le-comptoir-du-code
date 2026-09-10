import type { CaseStudySource } from './index'

/* Chantier 01 — M.U.S.E.

   Deux règles tiennent cette page, et elles vont ensemble.

   La première : le produit n'est pas ouvert au public, et ce qui fait sa
   singularité ne s'écrit pas ici. Une page indexée qui détaille les mécaniques
   distinctives d'un produit qui n'a pas encore de clients rend service au
   premier concurrent qui la lit. Ce chantier se raconte donc par sa difficulté
   d'ingénierie — l'encaissement pour le compte d'autrui, l'idempotence du
   chemin de paiement, la concurrence sur le stock, les registres — et pas par
   ce qu'il offre à ses vendeurs.

   La seconde : la règle vaut pour les captures autant que pour les phrases. Une
   image montre plus vite qu'un paragraphe. Celles retenues ici sont des écrans
   d'exploitation, jamais l'atelier de composition ni les formats de vente. */

export const muse: CaseStudySource = {
  slug: 'muse',

  /* Le montage d'ouverture, comme sur tous les chantiers : l'écran large, et à
     côté le même produit sur téléphone. Une capture desktop seule laisse ouverte
     la question que se pose tout visiteur venu juger du travail — « et sur
     mobile ? ».

     Une différence avec les autres chantiers, assumée dans la légende : la
     capture large montre la vitrine publique, les deux téléphones montrent
     l'espace du vendeur. Le montage ne prouve donc pas ici « la même page aux
     deux tailles », mais « les deux faces du produit tiennent sur un
     téléphone » — ce qui, pour un outil de gestion, est la question qui compte. */
  hero: {
    kind: 'composite',
    desktop: { src: '/images/muse-accueil.png', width: 3450, height: 1926 },
    mobiles: [
      { src: '/images/muse-dashboard-mobile.jpeg', width: 1320, height: 2393 },
      { src: '/images/muse-mobile.jpeg', width: 1320, height: 2381 },
    ],
  },

  gallery: [
    { src: '/images/muse-dashboard.png', width: 3450, height: 1926 },
    { src: '/images/muse-legal.png', width: 3450, height: 1926 },
    { src: '/images/muse-admin.png', width: 3450, height: 1926 },
  ],

  stack: [
    'Next.js', 'NestJS', 'PostgreSQL', 'Prisma',
    'Stripe Connect', 'Redis', 'BullMQ', 'Turborepo',
  ],

  content: {
    fr: {
      metaTitle: "M.U.S.E. — étude de cas | L'Échoppe du Code",
      metaDescription:
        "Place de marché multi-vendeurs : encaissement pour le compte de tiers, chemin de paiement rejouable, concurrence sur le stock, registres et obligations fiscales. Le chantier raconté en détail.",
      kind: 'Place de marché multi-vendeurs',
      status: 'En test privé',
      lede:
        "Une place de marché où l'argent ne s'arrête jamais chez la plateforme : chaque vendeur encaisse sur son propre compte, la part de la maison est prélevée au passage — et c'est pourtant la plateforme qui répond des registres.",
      facts: [
        { label: 'Projet', value: 'M.U.S.E.' },
        { label: 'Nature', value: 'Produit propre' },
        { label: 'État', value: 'Test privé, ouverture à venir' },
        { label: 'Rôle', value: 'Conception, développement, exploitation' },
        { label: 'Couverture', value: '4 074 tests automatisés' },
      ],
      heroCaption:
        "La vitrine publique sur écran large, et l'espace du vendeur sur téléphone — un outil de gestion se tient aussi d'une main.",
      heroMobileAlts: [
        "Le tableau de bord d'un vendeur sur téléphone : chiffre d'affaires du mois, stocks en alerte, et la distance qui reste avant le seuil de franchise de TVA.",
        "Le menu de navigation ouvert sur téléphone : le pilotage, la boutique et la vitrine, chacun avec ses écrans.",
      ],
      back: 'Retour aux archives',

      brief: {
        kicker: 'Le point de départ',
        title: "Encaisser sans jamais toucher l'argent",
        lead:
          "Un produit à moi, sans client pour arbitrer : toutes les décisions du même côté de la table, et toutes les responsabilités avec.",
        body: [
          "Une place de marché n'est pas une boutique avec plusieurs rayons. Dans une boutique, le commerçant vend ce qui lui appartient et encaisse pour lui-même. Sur une place de marché, la maison met deux inconnus en relation, prend une part au passage, et se retrouve à répondre d'une transaction qui n'est pas la sienne.",
          "**Tout le chantier découle de là.** L'argent doit aller directement au vendeur, sans jamais transiter par un compte que je détiendrais — sinon la plateforme devient un intermédiaire de paiement, avec l'agrément et les obligations qui vont avec. Les registres, eux, restent à sa charge : factures dans les deux sens, TVA, déclarations fiscales, conservation des pièces, traçabilité des vendeurs.",
          "Et comme c'est un produit propre, personne ne vient dire quand c'est fini. Pas de recette client, pas de date qui tombe d'en haut. **Le seul juge qui ne cède pas à l'impatience, c'est la suite de tests** — c'est elle qui décide si un chemin est tenu ou seulement écrit.",
        ],
      },

      personas: {
        kicker: 'Ce qui a été construit',
        title: 'Trois rôles, un même registre',
        lead:
          "Le plus court chemin pour comprendre une place de marché, c'est de suivre les trois personnes qui se retrouvent dans la même transaction.",
        items: [
          {
            role: 'Le vendeur',
            verb: 'encaisse',
            body:
              "Il relie son propre compte de paiement : l'argent de ses ventes lui arrive **sans jamais s'arrêter chez moi**, la part de la maison étant prélevée au moment même du paiement. Son espace lui montre ce qu'il a vendu, ce qu'il doit expédier, ce que la plateforme lui a facturé — et ce que l'administration fiscale verra de lui en fin d'année.",
          },
          {
            role: "L'acheteur",
            verb: 'achète',
            body:
              "Il paie sur une page tenue par le prestataire de paiement : **aucun numéro de carte ne traverse mon code**. Selon ce qu'il achète, la loi lui doit des choses différentes — un délai de rétractation ou son exclusion motivée, un formulaire type, une facture nominative. Ces différences vivent dans le modèle de données, pas dans une page d'aide qu'il faudrait penser à relire.",
          },
          {
            role: "L'administrateur",
            verb: 'répond',
            body:
              "Il surveille ce que la plateforme doit être capable de **prouver** : mouvements de stock, pièces comptables, seuils fiscaux, gestes sensibles horodatés. Rien de tout cela ne se saisit à la main — c'est le code qui écrit dans ces registres, ou personne. Un registre qu'on peut remplir à la main est un registre qu'on peut oublier de remplir.",
          },
        ],
      },

      results: {
        kicker: 'Le résultat',
        title: "Une plateforme qui répond d'elle-même",
        lead:
          "Le produit n'est pas encore ouvert, mais les chemins qui font perdre de l'argent ou de la confiance sont tenus, et rejouables à volonté.",
        items: [
          { value: '4 074', label: 'tests automatisés, dont 61 parcours joués de bout en bout' },
          { value: '0 €', label: "de flux transitant par un compte de la plateforme" },
          { value: '15 min', label: "au pire avant qu'un paiement perdu soit rattrapé tout seul" },
        ],
      },

      gallery: {
        kicker: 'En images',
        title: 'Le pilotage, la conformité, les registres',
        lead:
          "Trois écrans d'exploitation — ceux qu'on ne montre jamais, et qui font pourtant le plus gros du chantier.",
        shots: [
          {
            alt: "Tableau de bord d'un vendeur : chiffre d'affaires, seuils de TVA, alertes de stock",
            caption:
              "L'espace du vendeur : ce qu'il a vendu, ce qui manque en rayon, et à quelle distance il est du seuil qui l'obligera à collecter la TVA.",
          },
          {
            alt: 'Écran de conformité listant les documents légaux obligatoires d\'une boutique',
            caption:
              "La conformité comme un écran, pas comme une page d'aide : ce qui manque est nommé, compté, et se met en travers de la mise en vente.",
          },
          {
            alt: "Back-office d'administration : commissions, transactions, registres de conformité",
            caption:
              "Le back-office : commissions, transactions, preuves de stock, seuils fiscaux, historique horodaté des gestes sensibles.",
          },
        ],
      },

      challenge: {
        kicker: 'Le nœud du chantier',
        title: 'Un paiement perdu ne doit rien perdre',
        lead: "Le problème le plus dur du chantier, celui qui a décidé de la forme du reste.",
        quote:
          "Le prestataire de paiement annonce un encaissement par un appel qui peut se perdre : souscription mal réglée, panne plus longue que les relances, ou moyen de paiement différé qui déclare une session « complète » et « impayée » dans la même réponse. Tout ce qu'un paiement déclenche est donc écrit à un seul endroit, appelé à l'identique par cet appel et par une ronde qui repasse toutes les quinze minutes en interrogeant le prestataire en sens inverse. Les deux chemins ne peuvent pas diverger : c'est le même code, et il ne sait écrire qu'une fois.",
      },

      workshop: {
        kicker: 'Sous le capot',
        title: 'Ce qui tient la maison debout',
        lead: "Pour les curieux et les gens du métier : la mécanique, quand personne ne regarde.",
        items: [
          {
            title: "L'argent ne s'arrête jamais chez la maison",
            body:
              "Chaque vendeur relie son propre compte auprès du prestataire de paiement. La commission est prélevée dans la transaction elle-même, à l'instant du paiement, et les frais d'expédition y sont refondus pour que le vendeur touche le net de son travail et pas le port de quelqu'un d'autre. Aucun montant venu du navigateur n'est cru sur parole : le total est recalculé côté serveur depuis la base, à chaque commande.",
          },
          {
            title: 'Un seul chemin après le paiement',
            body:
              "Tous les effets d'un encaissement — écriture de la commande, fenêtre d'annulation, compteurs, facture, mise en préparation — vivent dans une seule fonction. Le rappel du prestataire l'appelle ; la ronde de rattrapage l'appelle aussi, à l'identique. C'est ce qui rend les deux chemins incapables de diverger, et le rattrapage incapable d'écrire deux fois ce que le rappel avait déjà écrit.",
          },
          {
            title: 'Deux acheteurs sur la dernière pièce',
            body:
              "La réservation est posée en mémoire partagée avec une durée de vie courte, réajustée à chaque changement de quantité, puis rendue à la base une fois la vente close ou le délai écoulé. La disponibilité est diffusée aux acheteurs connectés sans qu'aucun recharge sa page. La réservation reste un confort : c'est le passage en caisse, côté serveur, qui tranche pour de bon.",
          },
          {
            title: "Le stock n'était qu'un nombre, il est devenu un livre",
            body:
              "Une quantité en stock est un tableau noir : on efface 40, on écrit 3, et plus personne ne sait qu'il y a eu 40. Chaque variation s'inscrit désormais à la ligne suivante, avec son origine — geste du vendeur, vente, retour, correction. La capture est faite par un déclencheur de la base, dans la transaction du geste lui-même : la poser dans le code applicatif l'aurait rendue aveugle à la vente, qui s'écrit en SQL brut au moment du règlement. Le livre ne se rature pas — modification et vidage sont refusés quel que soit le rôle, et la seule suppression admise s'annonce d'avance dans sa propre transaction.",
          },
          {
            title: "Les pièces comptables et l'impôt",
            body:
              "Facture du vendeur à l'acheteur et facture de la plateforme au vendeur, sur des numérotations continues et des PDF figés à l'émission. Numéro de TVA vérifié en direct auprès du répertoire européen. Déclaration fiscale enregistrée transaction par transaction, avec l'alerte au vendeur qui approche du seuil qui l'obligera à collecter. Les montants ne sont jamais recalculés après coup : une pièce émise est un instantané, pas une vue sur des données qui bougent.",
          },
          {
            title: "Un registre qu'on ne peut pas raturer",
            body:
              "Toute action d'administration passe par une liste fermée de verbes, chacun qualifié au regard du règlement européen sur les plateformes. Le journal s'ajoute et ne se modifie jamais : le nom de l'auteur y est figé en clair, si bien que la trace reste lisible même après la suppression du compte qui l'a produite. On n'y garde que les champs qui ont changé, jamais l'objet entier. Et les fiches du registre des traitements ne sont pas rédigées à la main : une commande les génère depuis le code, parce qu'un document écrit dérive de la réalité en trois mois sans que personne s'en aperçoive avant un contrôle.",
          },
          {
            title: 'Sanctionner par degrés, et rendre exactement',
            body:
              "Entre ne rien faire et fermer un compte, il manquait un cran. La mesure conservatoire vise des fiches nommées, et la restriction éteint leur publication au lieu d'ajouter un second filtre à la lecture : aucune des quinze portes publiques ne peut l'oublier. L'état d'avant est mémorisé fiche par fiche, pour que lever la mesure rende exactement ce qu'elle avait retiré — ni plus, ni moins. Le vendeur est entendu avant, pas après : demande d'explication motivée, cinq jours ouvrés pour répondre, aucune mesure pendant ce délai, et la décision reste humaine.",
          },
          {
            title: 'Deux horloges pour une session',
            body:
              "Une session a une fenêtre d'inactivité — revenez avant sept jours — et un plafond absolu qui la termine quoi qu'il arrive. Les deux durées suivent l'enjeu et non le confort : vingt-quatre heures pour un administrateur qui voit tous les comptes et l'argent, quinze jours pour un vendeur qui encaisse et rembourse, trente pour un acheteur qui n'engage que ses propres achats. Le plafond est éprouvé à chaque lecture depuis la naissance de la session, jamais sur une colonne d'expiration que le socle repousse tout seul.",
          },
          {
            title: "Un fichier déposé par un inconnu",
            body:
              "Reprendre un catalogue existant, c'est accepter un fichier et des adresses d'images fournis par quelqu'un qu'on ne connaît pas. L'adresse IP d'une image est donc vérifiée au moment où la connexion l'utilise, et pas avant — valider d'abord se contourne en changeant la réponse DNS entre les deux. Les plages privées sont refusées, celle des métadonnées du fournisseur cloud comprise ; les redirections sont suivies à la main et repassent par toutes les gardes ; la taille se mesure sur les octets reçus, pas sur celle que le serveur annonce. Quant aux en-têtes du fichier, ils partent dans un modèle de langage : la défense contre l'injection n'est pas dans la consigne donnée au modèle, elle est dans le contrôle qui refuse en bloc toute réponse citant une colonne absente du fichier réel.",
          },
          {
            title: "4 074 tests, et ce qu'ils gardent",
            body:
              "342 fichiers de test, dont 61 parcours joués de bout en bout dans un vrai navigateur. Ils couvrent d'abord ce qui coûte cher quand ça casse : l'encaissement, le remboursement, la reprise après un rappel perdu, les autorisations d'accès, et les calculs qui finissent sur une pièce comptable. S'y ajoutent des tirs de charge : trente-cinq mille huit cents encaissements en dix-huit minutes sans une seule erreur serveur, la file rendant un refus franc plutôt que de s'effondrer quand elle sature. Banc d'essai local, donc : la preuve qu'il n'y a pas de dérive dans la durée, pas encore celle des temps de réponse en conditions réelles.",
          },
          {
            title: 'Un dépôt, deux services, un seul processus',
            body:
              "Le monorepo abrite la vitrine, le serveur et les parcours de test, avec un paquet de contrats partagés — codes d'erreur, constantes métier — qui empêche l'interface, l'API et l'administration de diverger sur un même mot. En production, un même exécutable joue deux rôles selon une variable d'environnement : servir les requêtes, faire tourner la vingtaine de tâches planifiées, ou les deux. Le service qui les porte est donc contraint à une instance unique — deux instances feraient tourner ces tâches en double, et ce genre de doublon ne se voit qu'au moment où il facture deux fois.",
          },
          {
            title: 'Une mise en ligne qui reste annulable',
            body:
              "L'intégration continue refuse le code qui fait baisser la couverture, module par module. Et une migration destructive n'est jamais déployée avec le code qui en dépend : renommer une colonne prend trois mises en ligne — ajouter la nouvelle en écrivant dans les deux, basculer la lecture, supprimer l'ancienne une fois qu'aucun code en vol n'en dépend. Le retour arrière du code est gratuit, celui d'un schéma ne l'est pas : les migrations s'appliquent avant le basculement de version, si bien qu'un code ancien redéployé sur un schéma déjà amputé ne se rattrape avec aucun bouton.",
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
      metaTitle: "M.U.S.E. — case study | L'Échoppe du Code",
      metaDescription:
        'A multi-vendor marketplace: taking payment on behalf of others, a replayable payment path, stock contention, records and tax obligations. The project in full.',
      kind: 'Multi-vendor marketplace',
      status: 'Private beta',
      lede:
        "A marketplace where the money never stops at the platform: every seller is paid into their own account and the house takes its cut on the way past — yet it is the platform that answers for the records.",
      facts: [
        { label: 'Project', value: 'M.U.S.E.' },
        { label: 'Nature', value: 'Own product' },
        { label: 'Status', value: 'Private beta, opening ahead' },
        { label: 'Role', value: 'Design, development, operations' },
        { label: 'Coverage', value: '4,074 automated tests' },
      ],
      heroCaption:
        'The public front on a wide screen, the seller’s workspace on a phone — a management tool has to work one-handed too.',
      heroMobileAlts: [
        'A seller’s dashboard on a phone: revenue for the month, low-stock alerts, and how far they still are from the VAT registration threshold.',
        'The navigation menu open on a phone: operations, shop and storefront, each with its own screens.',
      ],
      back: 'Back to the archives',

      brief: {
        kicker: 'The starting point',
        title: 'Taking payment without ever touching the money',
        lead:
          'My own product, with no client to arbitrate: every decision on one side of the table, and every liability with it.',
        body: [
          "A marketplace is not a shop with several aisles. In a shop, the trader sells what belongs to them and is paid for themselves. In a marketplace, the house introduces two strangers, takes a cut on the way past, and ends up answering for a transaction that is not its own.",
          "**The whole build follows from that.** The money has to reach the seller directly, never passing through an account I hold — otherwise the platform becomes a payment intermediary, with the licence and the obligations that come with it. The records, though, stay its problem: invoices in both directions, VAT, tax filings, document retention, seller traceability.",
          "And because it is my own product, nobody turns up to say when it is done. No client sign-off, no date handed down. **The only judge that never gives in to impatience is the test suite** — it decides whether a path is held or merely written.",
        ],
      },

      personas: {
        kicker: 'What was built',
        title: 'Three roles, one set of records',
        lead:
          'The shortest way to understand a marketplace is to follow the three people who meet inside the same transaction.',
        items: [
          {
            role: 'The seller',
            verb: 'gets paid',
            body:
              "They connect their own payment account: the money from their sales reaches them **without ever stopping at mine**, with the house's cut taken at the moment of payment. Their space shows what they sold, what they owe the post office, what the platform invoiced them — and what the tax authority will see of them at year end.",
          },
          {
            role: 'The buyer',
            verb: 'buys',
            body:
              "They pay on a page held by the payment provider: **no card number ever crosses my code**. Depending on what they buy, the law owes them different things — a withdrawal period or a reasoned exclusion, a standard form, a named invoice. Those differences live in the data model, not in a help page someone has to remember to re-read.",
          },
          {
            role: 'The administrator',
            verb: 'answers',
            body:
              "They watch over what the platform must be able to **prove**: stock movements, accounting documents, tax thresholds, timestamped sensitive actions. None of it is entered by hand — the code writes to those registers, or nobody does. A register you can fill in by hand is a register you can forget to fill in.",
          },
        ],
      },

      results: {
        kicker: 'The outcome',
        title: 'A platform that answers for itself',
        lead:
          'The product is not open yet, but the paths that lose money or trust are held, and can be replayed at will.',
        items: [
          { value: '4,074', label: 'automated tests, 61 of them full end-to-end journeys' },
          { value: '£0 / €0', label: 'of funds passing through a platform account' },
          { value: '15 min', label: 'worst case before a lost payment catches itself up' },
        ],
      },

      gallery: {
        kicker: 'In pictures',
        title: 'Operations, compliance, records',
        lead:
          'Three operational screens — the ones nobody shows, and the ones that took most of the work.',
        shots: [
          {
            alt: "Seller dashboard: revenue, VAT thresholds, stock alerts",
            caption:
              'The seller’s space: what they sold, what is missing from the shelves, and how far they are from the threshold that will force them to charge VAT.',
          },
          {
            alt: 'Compliance screen listing the legal documents a shop must publish',
            caption:
              'Compliance as a screen, not a help page: what is missing is named, counted, and stands in the way of going on sale.',
          },
          {
            alt: 'Administration back office: commissions, transactions, compliance registers',
            caption:
              'The back office: commissions, transactions, stock evidence, tax thresholds, a timestamped history of sensitive actions.',
          },
        ],
      },

      challenge: {
        kicker: 'The hard part',
        title: 'A lost payment must lose nothing',
        lead: 'The hardest problem of the build, the one that decided the shape of everything else.',
        quote:
          "The payment provider announces a charge through a call that can go missing: a badly configured subscription, an outage longer than the retries, or a deferred payment method declaring a session both “complete” and “unpaid” in the same response. So everything a payment sets in motion is written in one place, called identically by that call and by a sweep that comes round every fifteen minutes and queries the provider the other way about. The two paths cannot diverge: it is the same code, and it only knows how to write once.",
      },

      workshop: {
        kicker: 'Under the bonnet',
        title: 'What holds the house up',
        lead: 'For the curious and for people in the trade: the mechanism, when nobody is watching.',
        items: [
          {
            title: 'The money never stops at the house',
            body:
              "Each seller connects their own account with the payment provider. The commission is taken inside the transaction itself, at the instant of payment, and shipping costs are folded back in so the seller receives the net on their own work rather than somebody else's postage. No amount coming from the browser is taken on trust: the total is recomputed server-side from the database, on every order.",
          },
          {
            title: 'One path after the payment',
            body:
              'Every effect of a charge — writing the order, the cancellation window, the counters, the invoice, moving it into fulfilment — lives in a single function. The provider callback calls it; the recovery sweep calls it too, identically. That is what makes the two paths incapable of diverging, and the sweep incapable of writing twice what the callback already wrote.',
          },
          {
            title: 'Two buyers on the last item',
            body:
              'The hold is placed in shared memory with a short lifetime, readjusted on every quantity change, then handed back to the database once the sale closes or the clock runs out. Availability is pushed to connected buyers without anyone reloading. The hold stays a convenience: checkout, server-side, is what actually decides.',
          },
          {
            title: 'Stock was a number, it became a ledger',
            body:
              'A stock quantity is a blackboard: you rub out 40, you write 3, and nobody can tell there was ever 40. Every change is now entered on the next line, with its origin — seller action, sale, return, correction. The capture is done by a database trigger, inside the transaction of the action itself: putting it in application code would have left it blind to the sale, which is written in raw SQL at settlement. The ledger cannot be rubbed out — updates and truncation are refused whatever the role, and the only deletion allowed announces itself in advance inside its own transaction.',
          },
          {
            title: 'Accounting documents and tax',
            body:
              'Seller-to-buyer invoices and platform-to-seller invoices, on unbroken numbering and PDFs frozen at issue. VAT numbers checked live against the European register. Tax reporting recorded transaction by transaction, with a warning to any seller approaching the threshold that will force them to charge VAT. Amounts are never recomputed after the fact: an issued document is a snapshot, not a view onto data that keeps moving.',
          },
          {
            title: 'A register that cannot be rubbed out',
            body:
              'Every administrative action goes through a closed list of verbs, each qualified against the European platform-to-business regulation. The log is append-only: the author’s name is frozen in plain text, so the trace stays readable even after the account that produced it is deleted. Only the fields that changed are kept, never the whole object. And the records of processing activities are not typed by hand: a command generates them from the code, because a written document drifts from reality within three months and nobody notices until an audit.',
          },
          {
            title: 'Sanction by degrees, and give back exactly',
            body:
              'Between doing nothing and closing an account, a step was missing. A precautionary measure targets named listings, and the restriction switches off their publication rather than adding a second filter at read time: none of the fifteen public doors can forget it. The previous state is remembered listing by listing, so that lifting the measure gives back exactly what it took away — no more, no less. The seller is heard first, not afterwards: a reasoned request for explanation, five working days to answer, no measure during that time, and the decision stays human.',
          },
          {
            title: 'Two clocks for one session',
            body:
              'A session has an inactivity window — come back within seven days — and an absolute ceiling that ends it whatever happens. Both durations follow the stakes rather than convenience: twenty-four hours for an administrator who sees every account and the money, fifteen days for a seller who takes payment and issues refunds, thirty for a buyer who commits only their own purchases. The ceiling is tested on every read, from the birth of the session, never against an expiry column the auth layer pushes forward on its own.',
          },
          {
            title: 'A file dropped off by a stranger',
            body:
              'Importing an existing catalogue means accepting a file and image addresses supplied by someone you do not know. So an image’s IP address is checked at the moment the connection uses it, not before — validating first can be worked around by changing the DNS answer in between. Private ranges are refused, including the cloud provider’s metadata address; redirects are followed by hand and go back through every guard; size is measured on the bytes received, not on the one the server announces. As for the file’s headers, they go off to a language model: the defence against injection is not in the instructions given to the model, it is in the check that rejects outright any answer citing a column absent from the real file.',
          },
          {
            title: '4,074 tests, and what they guard',
            body:
              '342 test files, 61 of them full journeys played out in a real browser. They cover first what is expensive when it breaks: charging, refunding, recovery after a lost callback, access rules, and any calculation that ends up on an accounting document. On top of that come load runs: thirty-five thousand eight hundred charges accepted in eighteen minutes with no server error at all, the queue returning an honest refusal rather than collapsing once saturated. A local rig, so: proof that nothing drifts over time, not yet proof of response times under real conditions.',
          },
          {
            title: 'One repository, two services, one process',
            body:
              'The monorepo holds the storefront, the server and the end-to-end journeys, with a shared contracts package — error codes, business constants — that stops the interface, the API and the admin drifting apart on the same word. In production one executable plays two roles depending on an environment variable: serving requests, running the twenty-odd scheduled jobs, or both. The service carrying them is therefore pinned to a single instance — two would run those jobs twice over, and that kind of duplicate only shows itself the day it charges someone twice.',
          },
          {
            title: 'A release that stays reversible',
            body:
              'Continuous integration refuses code that lowers coverage, module by module. And a destructive migration is never shipped alongside the code that depends on it: renaming a column takes three releases — add the new one and write to both, switch the reads, drop the old one once no code in flight still needs it. Rolling back code is free, rolling back a schema is not: migrations are applied before the version switch, so old code redeployed onto an already-amputated schema is beyond any button.',
          },
        ],
      },

      cta: {
        title: 'A build this size starts small.',
        body:
          'Always through the same door: a scoping phase that settles the scope, the architecture and the budget — before the first line of code.',
        primary: 'Book a scoping phase',
        secondary: 'See the other projects',
      },
    },
  },
}
