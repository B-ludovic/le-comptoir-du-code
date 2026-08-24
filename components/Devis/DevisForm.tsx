'use client'

import styles from './Devis.module.css'
import {
  TIERS,
  ENGINEERING_DAY_RATE,
  addonsFor,
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
}

/* Les montants et les libellés de palier viennent de la grille : le devis PDF
   ne doit jamais pouvoir annoncer un prix que la page publique dément. Restent
   ici les deux textes propres au devis — la description contractuelle et le
   délai annoncé au client, qui n'ont pas leur place dans la grille. */
const TIER_DESCRIPTIONS: Record<TierId, string> = {
  presence:
    'Design sur-mesure, jusqu\u2019\u00E0 5 pages, responsive, formulaire de contact, SEO technique et mise en ligne.',
  boutique:
    'Site vitrine inclus, catalogue et fiches produits, paiements Stripe, gestion des commandes, back-office et e-mails transactionnels.',
  outils:
    'Mod\u00E9lisation des donn\u00E9es, authentification, r\u00F4les et permissions, tableau de bord, back-office, d\u00E9ploiement.',
}

const TIER_DELAYS: Record<TierId, string> = {
  presence: '2 \u00E0 3 semaines',
  boutique: '5 \u00E0 7 semaines',
  outils: '8 \u00E0 10 semaines',
}

const FORFAITS = [
  ...TIERS.map((t) => ({
    label: t.name,
    service: {
      name: t.name,
      description: TIER_DESCRIPTIONS[t.id],
      type: 'Forfait',
      delay: TIER_DELAYS[t.id],
      amount: String(t.price),
    } as Service,
    maintenance_option: 'offered' as const,
    maintenance_rate: formatMonthly(t.maintenance.price, 'fr'),
    prestation_type: 'dev' as const,
  })),
  {
    label: 'Cadrage 01 \u2014 Vitrine',
    service: {
      name: 'Cadrage Vitrine',
      description:
        "Atelier 1 h 30 puis dossier \u00E9crit : choix de solution argument\u00E9, arborescence, checklist RGPD, p\u00E9rim\u00E8tre de la V1, trames l\u00E9gales \u00E0 faire valider par un avocat.",
      type: 'Cadrage',
      delay: '48 h apr\u00E8s l\u2019atelier',
      amount: '290',
    } as Service,
    maintenance_option: 'none' as const,
    maintenance_rate: '',
    prestation_type: 'cadrage_full' as const,
  },
  {
    label: 'Cadrage 02 \u2014 E-commerce & Business',
    service: {
      name: 'Cadrage E-commerce & Business',
      description:
        "Atelier 1 h 30 puis dossier \u00E9crit : tunnel de vente et solution de paiement, workflows de r\u00E9servation et synchronisation, cartographie RGPD e-commerce, trame de CGV, p\u00E9rim\u00E8tre de la V1.",
      type: 'Cadrage',
      delay: '48 h apr\u00E8s l\u2019atelier',
      amount: '590',
    } as Service,
    maintenance_option: 'none' as const,
    maintenance_rate: '',
    prestation_type: 'cadrage_full' as const,
  },
  {
    label: 'Cadrage 03 \u2014 Architecture M\u00E9tier',
    service: {
      name: 'Cadrage Architecture M\u00E9tier',
      description:
        "Atelier 2 h puis dossier d\u2019architecture : mod\u00E8le de donn\u00E9es et sch\u00E9ma BDD, architecture applicative, sp\u00E9cification du back-office, matrice r\u00F4les et permissions, s\u00E9curit\u00E9, mod\u00E8le \u00E9conomique, MVP d\u00E9coup\u00E9 en phases.",
      type: 'Cadrage',
      delay: '5 jours ouvr\u00E9s',
      amount: '1190',
    } as Service,
    maintenance_option: 'none' as const,
    maintenance_rate: '',
    prestation_type: 'cadrage_split' as const,
  },
  {
    label: 'Conception produit \u2014 \u00E0 la journ\u00E9e',
    service: {
      name: 'Conception produit',
      description:
        "Conception du produit lorsqu\u2019il reste \u00E0 inventer : fonctionnalit\u00E9s, r\u00E8gles de gestion, structure des contenus, mod\u00E8le \u00E9conomique. 650 \u20AC HT par jour \u2014 nombre de jours fix\u00E9 par le cadrage.",
      type: 'R\u00E9gie',
      delay: '\u00C0 d\u00E9finir',
      amount: '',
    } as Service,
    maintenance_option: 'none' as const,
    maintenance_rate: '',
    prestation_type: 'cadrage_split' as const,
  },
]

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

/* Les modules ne sont pas des forfaits : choisir un socle définit la première
   ligne du devis, alors qu'un module vient s'ajouter à la suite. D'où deux
   sélecteurs distincts plutôt qu'une liste unique où l'un écrase l'autre. */
const MODULES = TIERS.map((t) => ({
  tier: t,
  items: addonsFor(t.id).map((a) => ({
    id: a.id,
    label: `${a.label.fr} — ${formatPrice(a.price, 'fr')} HT`,
    service: {
      name: a.label.fr,
      description: `Module optionnel du socle ${t.name}. ${a.days} jour${a.days > 1 ? 's' : ''} de travail au taux de ${formatPrice(ENGINEERING_DAY_RATE, 'fr')} HT par jour.`,
      type: 'Module',
      delay: 'Selon le planning du socle',
      amount: String(a.price),
    } as Service,
  })),
}))

const MODULE_BY_ID = new Map(
  MODULES.flatMap((group) => group.items.map((item) => [item.id, item.service])),
)

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
    const service = MODULE_BY_ID.get(id)
    if (!service) return
    /* Copie du service : deux modules identiques ne doivent pas partager le
       même objet, sinon éditer l'un modifie l'autre. */
    set('services', [...data.services, { ...service }])
  }

  function applyForfait(index: string) {
    const i = parseInt(index)
    const forfait = FORFAITS[i]
    if (!forfait) return
    onChange({
      ...data,
      services: [forfait.service, ...data.services.slice(1)],
      maintenance_option: forfait.maintenance_option,
      maintenance_rate: forfait.maintenance_rate,
      prestation_type: forfait.prestation_type,
    })
  }

  return (
    <div className={styles.formPanel}>
      <div className={styles.topBar}>
        <select className={styles.forfaitSelect} defaultValue="" onChange={e => applyForfait(e.target.value)}>
          <option value="" disabled>— Choisir un forfait —</option>
          {FORFAITS.map((f, i) => (
            <option key={i} value={i}>{f.label}</option>
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
          {MODULES.map((group) => (
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
            onClick={() => set('devis_locale', 'fr')}
          >FR</button>
          <button
            type="button"
            className={`${styles.localeBtn} ${data.devis_locale === 'en' ? styles.localeBtnActive : ''}`}
            onClick={() => set('devis_locale', 'en')}
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
