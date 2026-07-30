/* Trame du questionnaire de pré-qualification, exigé par l'article 4 des CGP.
   Une seule source de vérité : le formulaire rend cette liste, et l'email
   reçu reprend exactement ces libellés dans cet ordre. */

export type Field = {
  name: string
  label: { fr: string; en: string }
  type: 'text' | 'textarea' | 'select' | 'email' | 'date'
  required?: boolean
  options?: { fr: string; en: string }[]
}

export type Section = {
  title: { fr: string; en: string }
  note?: { fr: string; en: string }
  fields: Field[]
}

const yesNo = [
  { fr: 'Oui', en: 'Yes' },
  { fr: 'Non', en: 'No' },
  { fr: 'Je ne sais pas', en: "I don't know" },
]

export const SECTIONS: Section[] = [
  {
    title: { fr: 'Identité', en: 'Identity' },
    fields: [
      { name: 'company', label: { fr: 'Raison sociale', en: 'Company name' }, type: 'text', required: true },
      { name: 'siret', label: { fr: 'SIRET', en: 'Company registration number' }, type: 'text', required: true },
      { name: 'address', label: { fr: 'Adresse', en: 'Address' }, type: 'text' },
      { name: 'contact_name', label: { fr: 'Interlocuteur', en: 'Contact person' }, type: 'text', required: true },
      { name: 'contact_email', label: { fr: 'Email', en: 'Email' }, type: 'email', required: true },
      {
        name: 'decision_maker',
        label: {
          fr: 'Qui décide en dernier ressort ?',
          en: 'Who makes the final decision?',
        },
        type: 'text',
        required: true,
      },
    ],
  },
  {
    title: { fr: 'Le projet', en: 'The project' },
    fields: [
      {
        name: 'objective',
        label: { fr: "Objectif principal, en une phrase", en: 'Main objective, in one sentence' },
        type: 'textarea',
        required: true,
      },
      { name: 'audience', label: { fr: 'Public visé', en: 'Target audience' }, type: 'text', required: true },
      { name: 'launch_date', label: { fr: 'Date de lancement visée', en: 'Target launch date' }, type: 'date' },
      {
        name: 'existing',
        label: { fr: 'Ce qui existe déjà', en: 'What already exists' },
        type: 'select',
        required: true,
        options: [
          { fr: 'Rien pour le moment', en: 'Nothing yet' },
          { fr: 'Des maquettes ou un document', en: 'Mock-ups or a document' },
          { fr: 'Un site déjà en ligne', en: 'A website already live' },
          { fr: 'Un MVP généré par une IA', en: 'An AI-generated MVP' },
        ],
      },
    ],
  },
  {
    title: { fr: 'Fonctionnel & technique', en: 'Features & technical' },
    fields: [
      {
        name: 'features',
        label: {
          fr: 'Fonctionnalités indispensables au lancement',
          en: 'Features essential at launch',
        },
        type: 'textarea',
        required: true,
      },
      {
        name: 'has_accounts',
        label: { fr: 'Des comptes utilisateurs sont-ils prévus ?', en: 'Will there be user accounts?' },
        type: 'select',
        required: true,
        options: yesNo,
      },
      {
        name: 'has_payment',
        label: { fr: 'Du paiement en ligne est-il prévu ?', en: 'Will there be online payment?' },
        type: 'select',
        required: true,
        options: yesNo,
      },
      {
        name: 'integrations',
        label: {
          fr: 'Outils à intégrer (agenda, CRM, logiciel métier…)',
          en: 'Tools to integrate (calendar, CRM, business software…)',
        },
        type: 'textarea',
      },
      {
        name: 'volumetry',
        label: { fr: 'Volumétrie attendue (produits, utilisateurs, trafic)', en: 'Expected volume (products, users, traffic)' },
        type: 'text',
      },
      {
        name: 'autonomy',
        label: { fr: 'Autonomie souhaitée après livraison', en: 'Desired autonomy after delivery' },
        type: 'select',
        options: [
          { fr: 'Je veux tout gérer moi-même', en: 'I want to manage everything myself' },
          { fr: 'Je veux gérer les contenus seulement', en: 'I want to manage content only' },
          { fr: 'Je préfère déléguer entièrement', en: 'I prefer to delegate entirely' },
        ],
      },
    ],
  },
  {
    title: { fr: 'Juridique & données', en: 'Legal & data' },
    fields: [
      {
        name: 'personal_data',
        label: {
          fr: 'Quelles données personnelles seront collectées ?',
          en: 'What personal data will be collected?',
        },
        type: 'textarea',
        required: true,
      },
      {
        name: 'minors',
        label: { fr: 'Des mineurs pourront-ils s’inscrire ?', en: 'Will minors be able to register?' },
        type: 'select',
        required: true,
        options: yesNo,
      },
      {
        name: 'countries',
        label: { fr: 'Pays dans lesquels vous opérez', en: 'Countries you operate in' },
        type: 'text',
        required: true,
      },
      {
        name: 'legal_docs',
        label: {
          fr: 'Mentions légales et CGV déjà rédigées par un juriste ?',
          en: 'Legal notices and T&Cs already drafted by a lawyer?',
        },
        type: 'select',
        required: true,
        options: yesNo,
      },
    ],
  },
  {
    title: { fr: 'Contenus & accès', en: 'Content & access' },
    note: {
      fr: 'Ce bloc est le plus déterminant : c’est l’absence de contenus qui retarde le plus souvent un projet.',
      en: 'This block matters most: missing content is the most common cause of delay.',
    },
    fields: [
      {
        name: 'who_writes',
        label: {
          fr: 'Qui rédige les textes, et sont-ils déjà écrits ?',
          en: 'Who writes the copy, and is it already written?',
        },
        type: 'textarea',
        required: true,
      },
      {
        name: 'photos',
        label: {
          fr: 'Photos et visuels : existent-ils, et sont-ils libres de droits ?',
          en: 'Photos and visuals: do they exist, and are they royalty-free?',
        },
        type: 'textarea',
        required: true,
      },
      {
        name: 'logo',
        label: { fr: 'Logo disponible', en: 'Available logo' },
        type: 'select',
        required: true,
        options: [
          { fr: 'Vectoriel (SVG, AI, EPS, PDF)', en: 'Vector (SVG, AI, EPS, PDF)' },
          { fr: 'PNG sur fond transparent', en: 'PNG on transparent background' },
          { fr: 'Une image de qualité incertaine', en: 'An image of uncertain quality' },
          { fr: 'Aucun logo', en: 'No logo' },
        ],
      },
      {
        name: 'brand',
        label: { fr: 'Charte graphique existante ?', en: 'Existing brand guidelines?' },
        type: 'select',
        required: true,
        options: yesNo,
      },
      {
        name: 'accounts_owner',
        label: {
          fr: 'Qui détient le nom de domaine, l’hébergement et les comptes tiers ?',
          en: 'Who owns the domain name, hosting and third-party accounts?',
        },
        type: 'textarea',
        required: true,
      },
    ],
  },
  {
    title: { fr: 'Budget', en: 'Budget' },
    fields: [
      {
        name: 'budget_build',
        label: { fr: 'Enveloppe estimée pour la réalisation', en: 'Estimated budget for the build' },
        type: 'text',
        required: true,
      },
      {
        name: 'budget_monthly',
        label: {
          fr: 'Budget mensuel accepté pour les frais récurrents (hébergement, services)',
          en: 'Accepted monthly budget for recurring costs (hosting, services)',
        },
        type: 'text',
        required: true,
      },
    ],
  },
]
