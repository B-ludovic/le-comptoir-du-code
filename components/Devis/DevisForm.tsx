'use client'

import styles from './Devis.module.css'

const FORFAITS = [
  {
    label: 'La Présence — Site Vitrine',
    service_1_name: 'La Présence — Site Vitrine',
    service_1_description: 'Design sur-mesure, responsive, formulaire de contact, mise en ligne incluse.',
    service_1_type: 'Forfait',
    service_1_delay: '3 à 4 jours',
    service_1_amount: '1500',
    maintenance_option: 'none' as const,
    maintenance_rate: '80\u00A0\u20AC\u2060/\u2060mois',
  },
  {
    label: "L'E-commerce & Réservation",
    service_1_name: "L'E-commerce & Réservation",
    service_1_description: 'Site vitrine inclus, boutique en ligne, paiements Stripe, synchronisation agenda.',
    service_1_type: 'Forfait',
    service_1_delay: '7 à 12 jours',
    service_1_amount: '3000',
    maintenance_option: 'offered' as const,
    maintenance_rate: '100\u00A0\u20AC\u2060/\u2060mois',
  },
  {
    label: 'Les Outils Sur-Mesure',
    service_1_name: 'Les Outils Sur-Mesure — Application Métier',
    service_1_description: 'Développement sur-mesure, base de données, tableau de bord, API dédiée.',
    service_1_type: 'Forfait',
    service_1_delay: 'À définir',
    service_1_amount: '5000',
    maintenance_option: 'offered' as const,
    maintenance_rate: '120\u00A0\u20AC\u2060/\u2060mois',
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
  service_1_name: string
  service_1_description: string
  service_1_type: string
  service_1_delay: string
  service_1_amount: string
  service_2_name: string
  service_2_description: string
  service_2_type: string
  service_2_delay: string
  service_2_amount: string
  maintenance_option: 'none' | 'offered' | 'paid'
  maintenance_rate: string
}

type Props = {
  data: DevisData
  onChange: (data: DevisData) => void
}

function Field({ label, name, value, onChange, type = 'text', placeholder }: {
  label: string
  name: keyof DevisData
  value: string
  onChange: (name: keyof DevisData, value: string) => void
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
        onChange={e => onChange(name, e.target.value)}
      />
    </div>
  )
}

function TextareaField({ label, name, value, onChange, placeholder }: {
  label: string
  name: keyof DevisData
  value: string
  onChange: (name: keyof DevisData, value: string) => void
  placeholder?: string
}) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      <textarea
        className={styles.textarea}
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(name, e.target.value)}
        rows={1}
      />
    </div>
  )
}

export default function DevisForm({ data, onChange }: Props) {
  function set(name: keyof DevisData, value: string) {
    onChange({ ...data, [name]: value } as DevisData)
  }

  function applyForfait(index: string) {
    const i = parseInt(index)
    const forfait = FORFAITS[i]
    if (!forfait) return
    onChange({
      ...data,
      service_1_name: forfait.service_1_name,
      service_1_description: forfait.service_1_description,
      service_1_type: forfait.service_1_type,
      service_1_delay: forfait.service_1_delay,
      service_1_amount: forfait.service_1_amount,
      maintenance_option: forfait.maintenance_option,
      maintenance_rate: forfait.maintenance_rate,
    })
  }

  return (
    <div className={styles.formPanel}>
      <select className={styles.forfaitSelect} defaultValue="" onChange={e => applyForfait(e.target.value)}>
        <option value="" disabled>— Choisir un forfait —</option>
        {FORFAITS.map((f, i) => (
          <option key={i} value={i}>{f.label}</option>
        ))}
      </select>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Devis & Client</h3>
        <div className={styles.row}>
          <Field label="Numéro" name="devis_number" value={data.devis_number} onChange={set} placeholder="DEV-2026-001" />
          <Field label="Date" name="devis_date" value={data.devis_date} onChange={set} type="date" />
        </div>
        <div className={styles.row}>
          <Field label="Entreprise" name="client_company" value={data.client_company} onChange={set} />
          <Field label="Nom contact" name="client_name" value={data.client_name} onChange={set} />
        </div>
        <div className={styles.row}>
          <Field label="Email" name="client_email" value={data.client_email} onChange={set} type="email" />
          <Field label="SIRET" name="siret" value={data.siret} onChange={set} placeholder="En cours…" />
        </div>
        <TextareaField label="Adresse & Objet" name="client_address" value={data.client_address} onChange={set} />
        <TextareaField label="Description du projet" name="project_description" value={data.project_description} onChange={set} />
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Prestation 1</h3>
        <div className={styles.row}>
          <Field label="Nom" name="service_1_name" value={data.service_1_name} onChange={set} />
          <Field label="Montant (€)" name="service_1_amount" value={data.service_1_amount} onChange={set} type="number" placeholder="0" />
        </div>
        <TextareaField label="Description" name="service_1_description" value={data.service_1_description} onChange={set} />
        <div className={styles.row}>
          <Field label="Type" name="service_1_type" value={data.service_1_type} onChange={set} placeholder="Forfait" />
          <Field label="Délai" name="service_1_delay" value={data.service_1_delay} onChange={set} placeholder="7 jours" />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Maintenance</label>
          <select
            className={styles.select}
            value={data.maintenance_option}
            onChange={e => onChange({ ...data, maintenance_option: e.target.value as DevisData['maintenance_option'] })}
          >
            <option value="none">Aucune</option>
            <option value="offered">Année 1 offerte — puis {data.maintenance_rate}/mois</option>
            <option value="paid">Année 1 facturée à {data.maintenance_rate}/mois</option>
          </select>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Prestation 2 (optionnel)</h3>
        <div className={styles.row}>
          <Field label="Nom" name="service_2_name" value={data.service_2_name} onChange={set} />
          <Field label="Montant (€)" name="service_2_amount" value={data.service_2_amount} onChange={set} type="number" placeholder="0" />
        </div>
        <TextareaField label="Description" name="service_2_description" value={data.service_2_description} onChange={set} />
        <div className={styles.row}>
          <Field label="Type" name="service_2_type" value={data.service_2_type} onChange={set} placeholder="Forfait" />
          <Field label="Délai" name="service_2_delay" value={data.service_2_delay} onChange={set} placeholder="—" />
        </div>
      </section>
    </div>
  )
}
