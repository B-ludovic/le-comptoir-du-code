'use client'

import styles from './Devis.module.css'

export type Service = {
  name: string
  description: string
  type: string
  delay: string
  amount: string
}

const FORFAITS = [
  {
    label: 'La Présence — Site Vitrine',
    service: {
      name: 'La Présence — Site Vitrine',
      description: 'Design sur-mesure, responsive, formulaire de contact, mise en ligne incluse.',
      type: 'Forfait',
      delay: '3 à 4 jours',
      amount: '1500',
    } as Service,
    maintenance_option: 'none' as const,
    maintenance_rate: '80\u00A0\u20AC\u2060/\u2060mois',
  },
  {
    label: "L'E-commerce & Réservation",
    service: {
      name: "L'E-commerce & Réservation",
      description: 'Site vitrine inclus, boutique en ligne, paiements Stripe, synchronisation agenda.',
      type: 'Forfait',
      delay: '7 à 12 jours',
      amount: '3000',
    } as Service,
    maintenance_option: 'offered' as const,
    maintenance_rate: '100\u00A0\u20AC\u2060/\u2060mois',
  },
  {
    label: 'Les Outils Sur-Mesure',
    service: {
      name: 'Les Outils Sur-Mesure — Application Métier',
      description: 'Développement sur-mesure, base de données, tableau de bord, API dédiée.',
      type: 'Forfait',
      delay: 'À définir',
      amount: '5000',
    } as Service,
    maintenance_option: 'offered' as const,
    maintenance_rate: '165\u00A0\u20AC\u2060/\u2060mois HT',
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
  client_type: 'standard' | 'association'
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
        value={value}
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
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        rows={1}
      />
    </div>
  )
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

  function applyForfait(index: string) {
    const i = parseInt(index)
    const forfait = FORFAITS[i]
    if (!forfait) return
    onChange({
      ...data,
      services: [forfait.service, ...data.services.slice(1)],
      maintenance_option: forfait.maintenance_option,
      maintenance_rate: forfait.maintenance_rate,
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
        <select
          className={`${styles.forfaitSelect} ${data.client_type === 'association' ? styles.assoSelect : ''}`}
          value={data.client_type}
          onChange={e => set('client_type', e.target.value as DevisData['client_type'])}
        >
          <option value="standard">Client standard</option>
          <option value="association">Association — −50 %</option>
        </select>
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
                <option value="offered">Année 1 offerte — puis {data.maintenance_rate}/mois</option>
                <option value="paid">Année 1 facturée à {data.maintenance_rate}/mois</option>
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
