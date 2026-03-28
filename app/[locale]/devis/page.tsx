'use client'

import { useState } from 'react'
import DevisForm, { type DevisData } from '@/components/Devis/DevisForm'
import DevisPreview from '@/components/Devis/DevisPreview'
import styles from '@/components/Devis/Devis.module.css'

function today(): string {
  return new Date().toISOString().split('T')[0]
}

const defaultData: DevisData = {
  devis_number: '',
  devis_date: today(),
  siret: '',
  client_company: '',
  client_name: '',
  client_email: '',
  client_address: '',
  project_description: '',
  service_1_name: '',
  service_1_description: '',
  service_1_type: 'Forfait',
  service_1_delay: '',
  service_1_amount: '',
  service_2_name: '',
  service_2_description: '',
  service_2_type: 'Forfait',
  service_2_delay: '—',
  service_2_amount: '',
  maintenance_option: 'none',
  maintenance_rate: '',
}

export default function DevisPage() {
  const [data, setData] = useState<DevisData>(defaultData)

  return (
    <div className={styles.page}>
      <DevisForm data={data} onChange={setData} />
      <DevisPreview data={data} />
    </div>
  )
}
