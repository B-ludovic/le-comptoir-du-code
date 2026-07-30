'use client'

import { useState, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { SECTIONS } from './fields'
import styles from './Questionnaire.module.css'

type Status = 'idle' | 'sending' | 'success' | 'error'
type Locale = 'fr' | 'en'

export default function QuestionnaireForm({ locale }: { locale: Locale }) {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!formRef.current) return

    setStatus('sending')
    const data = new FormData(formRef.current)

    // On renvoie les libellés avec les valeurs : l'email reçu est lisible
    // sans avoir à connaître les noms de champs.
    const answers = SECTIONS.flatMap((section) =>
      section.fields.map((field) => ({
        section: section.title[locale],
        label: field.label[locale],
        value: String(data.get(field.name) ?? ''),
      }))
    )

    try {
      const res = await fetch('/api/questionnaire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: String(data.get('company') ?? ''),
          contact_email: String(data.get('contact_email') ?? ''),
          answers,
        }),
      })

      if (!res.ok) throw new Error()

      setStatus('success')
      formRef.current.reset()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setStatus('error')
    }
  }

  const isFr = locale === 'fr'

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={styles.form} noValidate>
      {SECTIONS.map((section) => (
        <fieldset key={section.title.en} className={styles.section}>
          <legend className={styles.legend}>{section.title[locale]}</legend>
          {section.note && <p className={styles.note}>{section.note[locale]}</p>}

          {section.fields.map((field) => {
            const id = `q_${field.name}`
            return (
              <div key={field.name} className={styles.field}>
                <label htmlFor={id} className={styles.label}>
                  {field.label[locale]}
                  {field.required && <span className={styles.required}> *</span>}
                </label>

                {field.type === 'textarea' ? (
                  <textarea id={id} name={field.name} required={field.required} rows={3} className={styles.textarea} />
                ) : field.type === 'select' ? (
                  <div className={styles.selectWrapper}>
                    <select id={id} name={field.name} required={field.required} defaultValue="" className={styles.select}>
                      <option value="" disabled>
                        {isFr ? '— Choisir —' : '— Select —'}
                      </option>
                      {field.options?.map((opt) => (
                        <option key={opt.en} value={opt[locale]}>
                          {opt[locale]}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={14} strokeWidth={1.5} className={styles.selectArrow} aria-hidden="true" />
                  </div>
                ) : (
                  <input id={id} type={field.type} name={field.name} required={field.required} className={styles.input} />
                )}
              </div>
            )
          })}
        </fieldset>
      ))}

      <div className={styles.actions}>
        <button type="submit" className={styles.btn} disabled={status === 'sending'}>
          {status === 'sending'
            ? isFr ? 'Envoi…' : 'Sending…'
            : isFr ? 'Envoyer le questionnaire' : 'Send questionnaire'}
        </button>

        {status === 'success' && (
          <p className={styles.successMsg}>
            {isFr
              ? 'Questionnaire reçu. Je le lis avant notre atelier et je reviens vers vous si un point demande une précision.'
              : 'Questionnaire received. I will read it before our workshop and get back to you if anything needs clarifying.'}
          </p>
        )}

        {status === 'error' && (
          <p className={styles.errorMsg}>
            {isFr
              ? 'L’envoi a échoué. Réessayez, ou écrivez-moi directement à contact@lechoppeducode.com.'
              : 'Sending failed. Please try again, or write to contact@lechoppeducode.com.'}
          </p>
        )}
      </div>
    </form>
  )
}
