'use client'

import styles from './Devis.module.css'
import {
  TIERS,
  ENGINEERING_DAY_RATE,
  PRODUCT_DESIGN_DAY_RATE,
  addonsFor,
  tier,
  formatPrice,
  formatMonthly,
  type TierId,
} from '@/lib/pricing'

export type Service = {
  name: string
  description: string
  type: string
  delay: string
  amount: string
  /* Renseigné pour les lignes issues du catalogue, absent pour celles saisies
     à la main : c'est ce qui permet de retraduire les unes sans écraser les
     autres quand on bascule la langue du devis. */
  sourceId?: string
}

export type DevisData = {
  devis_number: string
  devis_date: string
  siret: string
  client_company: string
  client_name: string
  client_email: string
  client_address: string
  project_description: string
  services: Service[]
  maintenance_option: 'none' | 'offered' | 'paid'
  /* Palier dont provient le taux de maintenance, pour pouvoir le reformater
     dans l'autre langue. Absent quand le taux a été saisi à la main. */
  maintenance_tier?: TierId
  maintenance_rate: string
  infra_rate: string
  cadrage_paid: string
  client_type: 'standard' | 'association'
  devis_locale: 'fr' | 'en'
  /* Échéancier applicable — dépend du contrat dont relève la prestation.
     dev            → CGV développement : 30 % à la commande, 70 % à la mise en ligne
     cadrage_full   → CGP cadrage, paliers 01 et 02 : 100 % à la commande
     cadrage_split  → CGP cadrage, palier 03 et conception : 50 % / 50 % */
  prestation_type: 'dev' | 'cadrage_full' | 'cadrage_split'
}

type Props = {
  data: DevisData
  onChange: (data: DevisData) => void
}

function Field({ label, value, onChange, type = 'text', placeholder }: {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  placeholder?: string
}) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      <input
        type={type}
        className={styles.input}
        value={value ?? ''}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}

function TextareaField({ label, value, onChange, placeholder }: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      <textarea
        className={styles.textarea}
        value={value ?? ''}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        rows={1}
      />
    </div>
  )
}

/* Catalogue du devis, bilingue.

   Chaque prestation insérée depuis un menu emporte son `sourceId`. C'est ce qui
   permet au bouton FR/EN de la retraduire : sans identifiant, on ne saurait pas
   distinguer une ligne issue du catalogue d'une ligne saisie à la main, et
   basculer la langue écraserait le texte libre du client.

   Les socles et les modules sont dérivés de lib/pricing.ts ; seuls les cadrages
   portent ici leurs textes, parce qu'ils décrivent un déroulé d'atelier qui n'a
   pas sa place dans une grille tarifaire. */

type Copy = { name: string; description: string; type: string; delay: string }
type Bi = { fr: Copy; en: Copy }

export type CatalogKind = 'tier' | 'module' | 'scoping'

type Entry = {
  id: string
  kind: CatalogKind
  /* Libellé du menu, côté interface d'administration : toujours en français. */
  label: string
  group?: string
  amount: string
  copy: Bi
  maintenance_tier?: TierId
  maintenance_option: 'none' | 'offered' | 'paid'
  prestation_type: DevisData['prestation_type']
}

const TYPE_LABEL = {
  tier: { fr: 'Forfait', en: 'Package' },
  module: { fr: 'Module', en: 'Module' },
  scoping: { fr: 'Cadrage', en: 'Scoping' },
  regie: { fr: 'Régie', en: 'Time & materials' },
} as const

const TIER_COPY: Record<TierId, Bi> = {
  presence: {
    fr: {
      name: 'La Présence — Site Vitrine',
      description:
        'Design sur-mesure, jusqu’à 5 pages, responsive, formulaire de contact, SEO technique et mise en ligne.',
      type: TYPE_LABEL.tier.fr,
      delay: '2 à 3 semaines',
    },
    en: {
      name: 'La Présence — Marketing Website',
      description:
        'Custom design, up to 5 pages, responsive, contact form, technical SEO and launch.',
      type: TYPE_LABEL.tier.en,
      delay: '2 to 3 weeks',
    },
  },
  boutique: {
    fr: {
      name: 'La Boutique — Vente en ligne',
      description:
        'Site vitrine inclus, catalogue et fiches produits, paiements Stripe, gestion des commandes, back-office et e-mails transactionnels.',
      type: TYPE_LABEL.tier.fr,
      delay: '5 à 7 semaines',
    },
    en: {
      name: 'La Boutique — Online Sales',
      description:
        'Marketing website included, product catalogue and pages, Stripe payments, order management, back office and transactional emails.',
      type: TYPE_LABEL.tier.en,
      delay: '5 to 7 weeks',
    },
  },
  outils: {
    fr: {
      name: 'Les Outils Sur-Mesure — Application métier',
      description:
        'Modélisation des données, authentification, rôles et permissions, tableau de bord, back-office, déploiement.',
      type: TYPE_LABEL.tier.fr,
      delay: '8 à 10 semaines',
    },
    en: {
      name: 'Les Outils Sur-Mesure — Business Application',
      description:
        'Data modelling, authentication, roles and permissions, dashboard, back office, deployment.',
      type: TYPE_LABEL.tier.en,
      delay: '8 to 10 weeks',
    },
  },
}

const SCOPING_ENTRIES: Entry[] = [
  {
    id: 'scoping-vitrine',
    kind: 'scoping',
    label: 'Cadrage 01 — Vitrine',
    amount: '290',
    maintenance_option: 'none',
    prestation_type: 'cadrage_full',
    copy: {
      fr: {
        name: 'Cadrage Vitrine',
        description:
          'Atelier 1 h 30 puis dossier écrit : choix de solution argumenté, arborescence, checklist RGPD, périmètre de la V1, trames légales à faire valider par un avocat.',
        type: TYPE_LABEL.scoping.fr,
        delay: '48 h après l’atelier',
      },
      en: {
        name: 'Marketing site scoping',
        description:
          'A 1.5-hour workshop followed by a written report: reasoned choice of solution, site structure, GDPR checklist, scope of the first version, draft legal texts to be reviewed by a lawyer.',
        type: TYPE_LABEL.scoping.en,
        delay: '48 h after the workshop',
      },
    },
  },
  {
    id: 'scoping-ecommerce',
    kind: 'scoping',
    label: 'Cadrage 02 — E-commerce & Business',
    amount: '590',
    maintenance_option: 'none',
    prestation_type: 'cadrage_full',
    copy: {
      fr: {
        name: 'Cadrage E-commerce & Business',
        description:
          'Atelier 1 h 30 puis dossier écrit : tunnel de vente et solution de paiement, workflows de réservation et synchronisation, cartographie RGPD e-commerce, trame de CGV, périmètre de la V1.',
        type: TYPE_LABEL.scoping.fr,
        delay: '48 h après l’atelier',
      },
      en: {
        name: 'E-commerce & business scoping',
        description:
          'A 1.5-hour workshop followed by a written report: sales funnel and payment provider, booking and synchronisation workflows, e-commerce GDPR mapping, draft terms of sale, scope of the first version.',
        type: TYPE_LABEL.scoping.en,
        delay: '48 h after the workshop',
      },
    },
  },
  {
    id: 'scoping-architecture',
    kind: 'scoping',
    label: 'Cadrage 03 — Architecture Métier',
    amount: '1190',
    maintenance_option: 'none',
    prestation_type: 'cadrage_split',
    copy: {
      fr: {
        name: 'Cadrage Architecture Métier',
        description:
          'Atelier 2 h puis dossier d’architecture : modèle de données et schéma BDD, architecture applicative, spécification du back-office, matrice rôles et permissions, sécurité, modèle économique, MVP découpé en phases.',
        type: TYPE_LABEL.scoping.fr,
        delay: '5 jours ouvrés',
      },
      en: {
        name: 'Business architecture scoping',
        description:
          'A 2-hour workshop followed by an architecture report: data model and database schema, application architecture, back-office specification, roles and permissions matrix, security, business model, MVP broken down into phases.',
        type: TYPE_LABEL.scoping.en,
        delay: '5 working days',
      },
    },
  },
  {
    id: 'product-design',
    kind: 'scoping',
    label: 'Conception produit — à la journée',
    amount: '',
    maintenance_option: 'none',
    prestation_type: 'cadrage_split',
    copy: {
      fr: {
        name: 'Conception produit',
        description: `Conception du produit lorsqu’il reste à inventer : fonctionnalités, règles de gestion, structure des contenus, modèle économique. ${formatPrice(PRODUCT_DESIGN_DAY_RATE, 'fr')} HT par jour — nombre de jours fixé par le cadrage.`,
        type: TYPE_LABEL.regie.fr,
        delay: 'À définir',
      },
      en: {
        name: 'Product design',
        description: `Product design when the product is still to be invented: features, business rules, content structure, business model. ${formatPrice(PRODUCT_DESIGN_DAY_RATE, 'en')} per day excluding VAT — number of days set by the scoping report.`,
        type: TYPE_LABEL.regie.en,
        delay: 'To be defined',
      },
    },
  },
]

const TIER_ENTRIES: Entry[] = TIERS.map((t) => ({
  id: `tier-${t.id}`,
  kind: 'tier' as const,
  label: t.name,
  amount: String(t.price),
  copy: TIER_COPY[t.id],
  maintenance_tier: t.id,
  maintenance_option: 'offered' as const,
  prestation_type: 'dev' as const,
}))

const MODULE_ENTRIES: Entry[] = TIERS.flatMap((t) =>
  addonsFor(t.id).map((a) => {
    const day = (n: number, locale: 'fr' | 'en') =>
      locale === 'en' ? `${n} day${n > 1 ? 's' : ''}` : `${n} jour${n > 1 ? 's' : ''}`
    return {
      id: `module-${a.id}`,
      kind: 'module' as const,
      label: `${a.label.fr} — ${formatPrice(a.price, 'fr')} HT`,
      group: t.name,
      amount: String(a.price),
      maintenance_option: 'none' as const,
      prestation_type: 'dev' as const,
      copy: {
        fr: {
          name: a.label.fr,
          description: `Module optionnel du socle ${t.name}. ${day(a.days, 'fr')} de travail au taux de ${formatPrice(ENGINEERING_DAY_RATE, 'fr')} HT par jour.`,
          type: TYPE_LABEL.module.fr,
          delay: 'Selon le planning du socle',
        },
        en: {
          name: a.label.en,
          description: `Optional module for the ${t.name} package. ${day(a.days, 'en')} of work at €${ENGINEERING_DAY_RATE} excluding VAT per day.`,
          type: TYPE_LABEL.module.en,
          delay: 'Aligned with the package schedule',
        },
      },
    }
  }),
)

const CATALOG: Entry[] = [...TIER_ENTRIES, ...SCOPING_ENTRIES, ...MODULE_ENTRIES]
const BY_ID = new Map(CATALOG.map((e) => [e.id, e]))

/* Les deux menus de la barre du haut : les socles et cadrages définissent la
   première ligne du devis, les modules s'ajoutent à la suite. */
const FORFAITS = CATALOG.filter((e) => e.kind !== 'module')
const MODULE_GROUPS = TIERS.map((t) => ({
  tier: t,
  items: MODULE_ENTRIES.filter((e) => e.group === t.name),
}))

function serviceFrom(entry: Entry, locale: 'fr' | 'en', amount?: string): Service {
  const copy = entry.copy[locale]
  return {
    sourceId: entry.id,
    name: copy.name,
    description: copy.description,
    type: copy.type,
    delay: copy.delay,
    amount: amount ?? entry.amount,
  }
}

function maintenanceRateFor(tierId: TierId | undefined, locale: 'fr' | 'en'): string {
  if (!tierId) return ''
  return formatMonthly(tier(tierId).maintenance.price, locale)
}

const emptyService = (): Service => ({
  name: '',
  description: '',
  type: 'Forfait',
  delay: '',
  amount: '',
})

export default function DevisForm({ data, onChange }: Props) {
  function set<K extends keyof DevisData>(name: K, value: DevisData[K]) {
    onChange({ ...data, [name]: value })
  }

  function setService(index: number, field: keyof Service, value: string) {
    const updated = data.services.map((s, i) =>
      i === index ? { ...s, [field]: value } : s
    )
    set('services', updated)
  }

  function addService() {
    set('services', [...data.services, emptyService()])
  }

  function removeService(index: number) {
    if (data.services.length <= 1) return
    set('services', data.services.filter((_, i) => i !== index))
  }

  function addModule(id: string) {
    const entry = BY_ID.get(id)
    if (!entry) return
    set('services', [...data.services, serviceFrom(entry, data.devis_locale)])
  }

  function applyForfait(id: string) {
    const entry = BY_ID.get(id)
    if (!entry) return
    onChange({
      ...data,
      services: [serviceFrom(entry, data.devis_locale), ...data.services.slice(1)],
      maintenance_option: entry.maintenance_option,
      maintenance_tier: entry.maintenance_tier,
      maintenance_rate: maintenanceRateFor(entry.maintenance_tier, data.devis_locale),
      prestation_type: entry.prestation_type,
    })
  }

  /* Bascule de langue du document. Elle ne se contente plus de changer les
     libellés figés de l'aperçu : elle retraduit chaque ligne venue du catalogue
     ainsi que le taux de maintenance. Les montants sont conservés — ils ont pu
     être ajustés à la main — et les lignes sans `sourceId`, saisies librement,
     ne sont pas touchées. */
  function setDevisLocale(next: 'fr' | 'en') {
    if (next === data.devis_locale) return
    onChange({
      ...data,
      devis_locale: next,
      services: data.services.map((s) => {
        const entry = s.sourceId ? BY_ID.get(s.sourceId) : undefined
        return entry ? serviceFrom(entry, next, s.amount) : s
      }),
      maintenance_rate: data.maintenance_tier
        ? maintenanceRateFor(data.maintenance_tier, next)
        : data.maintenance_rate,
    })
  }

  return (
    <div className={styles.formPanel}>
      <div className={styles.topBar}>
        <select className={styles.forfaitSelect} defaultValue="" onChange={e => applyForfait(e.target.value)}>
          <option value="" disabled>— Choisir un forfait —</option>
          {FORFAITS.map((f) => (
            <option key={f.id} value={f.id}>{f.label}</option>
          ))}
        </select>
        {/* Reste sur la valeur vide : le même module doit pouvoir être ajouté
            deux fois, et le menu doit se rouvrir sur son intitulé. */}
        <select
          className={styles.forfaitSelect}
          value=""
          onChange={e => addModule(e.target.value)}
          title="Ajouter un module à la suite des prestations"
        >
          <option value="" disabled>+ Ajouter un module</option>
          {MODULE_GROUPS.map((group) => (
            <optgroup key={group.tier.id} label={group.tier.name}>
              {group.items.map((item) => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </optgroup>
          ))}
        </select>
        <select
          className={`${styles.forfaitSelect} ${data.client_type === 'association' ? styles.assoSelect : ''}`}
          value={data.client_type}
          onChange={e => set('client_type', e.target.value as DevisData['client_type'])}
        >
          <option value="standard">Client standard</option>
          <option value="association">Association — −50 %</option>
        </select>
        <select
          className={styles.forfaitSelect}
          value={data.prestation_type}
          onChange={e => set('prestation_type', e.target.value as DevisData['prestation_type'])}
          title="Échéancier de paiement applicable"
        >
          <option value="dev">Développement — 30 % / 70 %</option>
          <option value="cadrage_full">Cadrage 01-02 — 100 % à la commande</option>
          <option value="cadrage_split">Cadrage 03 & conception — 50 % / 50 %</option>
        </select>
        <div className={styles.localeToggle}>
          <button
            type="button"
            className={`${styles.localeBtn} ${data.devis_locale === 'fr' ? styles.localeBtnActive : ''}`}
            onClick={() => setDevisLocale('fr')}
          >FR</button>
          <button
            type="button"
            className={`${styles.localeBtn} ${data.devis_locale === 'en' ? styles.localeBtnActive : ''}`}
            onClick={() => setDevisLocale('en')}
          >EN</button>
        </div>
      </div>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Devis & Client</h3>
        <div className={styles.row}>
          <Field label="Numéro" value={data.devis_number} onChange={v => set('devis_number', v)} placeholder="DEV-2026-001" />
          <Field label="Date" value={data.devis_date} onChange={v => set('devis_date', v)} type="date" />
        </div>
        <div className={styles.row}>
          <Field label="Entreprise" value={data.client_company} onChange={v => set('client_company', v)} />
          <Field label="Nom contact" value={data.client_name} onChange={v => set('client_name', v)} />
        </div>
        <div className={styles.row}>
          <Field label="Email" value={data.client_email} onChange={v => set('client_email', v)} type="email" />
          <Field label="SIRET" value={data.siret} onChange={v => set('siret', v)} placeholder="En cours…" />
        </div>
        <TextareaField label="Adresse & Objet" value={data.client_address} onChange={v => set('client_address', v)} />
        <TextareaField label="Description du projet" value={data.project_description} onChange={v => set('project_description', v)} />
        {data.prestation_type === 'dev' && (
          <Field
            label="Cadrage déjà réglé (€ HT) — 50 % imputés"
            value={data.cadrage_paid}
            onChange={v => set('cadrage_paid', v)}
            type="number"
            placeholder="0"
          />
        )}
      </section>

      {data.services.map((service, index) => (
        <section key={index} className={styles.section}>
          <div className={styles.sectionTitleRow}>
            <h3 className={styles.sectionTitle}>
              Prestation {index + 1}{index === 0 ? '' : ' (optionnel)'}
            </h3>
            {data.services.length > 1 && (
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => removeService(index)}
              >
                Supprimer
              </button>
            )}
          </div>
          <div className={styles.row}>
            <Field label="Nom" value={service.name} onChange={v => setService(index, 'name', v)} />
            <Field label="Montant (€)" value={service.amount} onChange={v => setService(index, 'amount', v)} type="number" placeholder="0" />
          </div>
          <TextareaField label="Description" value={service.description} onChange={v => setService(index, 'description', v)} />
          <div className={styles.row}>
            <Field label="Type" value={service.type} onChange={v => setService(index, 'type', v)} placeholder="Forfait" />
            <Field label="Délai" value={service.delay} onChange={v => setService(index, 'delay', v)} placeholder="7 jours" />
          </div>
          {index === 0 && (
            <div className={styles.field}>
              <label className={styles.label}>Maintenance</label>
              <select
                className={styles.select}
                value={data.maintenance_option}
                onChange={e => set('maintenance_option', e.target.value as DevisData['maintenance_option'])}
              >
                <option value="none">Aucune</option>
                <option value="offered">Année 1 offerte — puis {data.maintenance_rate}</option>
                <option value="paid">Année 1 facturée à {data.maintenance_rate}</option>
              </select>
            </div>
          )}
        </section>
      ))}

      <button type="button" className={styles.addServiceBtn} onClick={addService}>
        + Ajouter une prestation
      </button>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Infrastructure (indicatif)</h3>
        <Field
          label="Coût estimé / mois"
          value={data.infra_rate}
          onChange={v => set('infra_rate', v)}
          placeholder="~50–100 € HT/mois"
        />
      </section>
    </div>
  )
}
