'use client'

import { useState, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import styles from './Contact.module.css'

type Props = {
  locale: string
  dict: {
    eyebrow?: string
    section_title: string
    intro: string
    field_name: string
    field_email: string
    field_description: string
    field_description_placeholder: string
    field_budget: string
    field_budget_placeholder: string
    budget_scoping: string
    budget_1: string
    budget_2: string
    budget_3: string
    btn_submit: string
    privacy_note: string
    privacy_link: string
    success: string
    error_invalid: string
    error_rate_limited: string
    error_transport: string
    err_name: string
    err_email: string
    err_budget: string
    err_message: string
  }
}

const CONTACT_EMAIL = 'contact@lechoppeducode.com'

/* Le palier voyage par clé, pas par libellé : c'est déjà la clé que les cartes
   de la page d'accueil passent dans l'URL, et un brief archivé doit rester
   lisible le jour où le libellé change de mot. */
const BUDGET_KEYS = ['cadrage', 'presence', 'boutique', 'outils'] as const
type BudgetKey = (typeof BUDGET_KEYS)[number]

type Status = 'idle' | 'sending' | 'success' | 'error'
type ErrorCode = 'RATE_LIMITED' | 'INVALID_PAYLOAD' | 'TRANSPORT_FAILED'
type FieldName = 'from_name' | 'reply_to' | 'budget' | 'message'
type FieldErrors = Partial<Record<FieldName, string>>

export default function Contact({ dict, locale }: Props) {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [errorCode, setErrorCode] = useState<ErrorCode | null>(null)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const searchParams = useSearchParams()

  // Valeur dérivée de l'URL, calculée au rendu : pas d'effet, donc pas de
  // rendu à vide avant que le budget ne s'affiche.
  const budgetParam = searchParams.get('budget')
  /* Les cartes de la page d'accueil passent l'identifiant du palier, la page
     associative passe encore les anciens '1', '2', '3'. Les deux formes
     restent acceptées : un lien enregistré ou envoyé par mail ne doit pas
     cesser de préremplir le champ. */
  const budgetFromUrl: BudgetKey | '' =
    budgetParam === 'cadrage' ? 'cadrage' :
    budgetParam === 'presence' || budgetParam === '1' ? 'presence' :
    budgetParam === 'boutique' || budgetParam === '2' ? 'boutique' :
    budgetParam === 'outils' || budgetParam === '3' ? 'outils' :
    ''

  // Dès que l'utilisateur choisit lui-même, son choix prend le pas sur l'URL.
  const [budgetOverride, setBudgetOverride] = useState<string | null>(null)
  const selectedBudget = budgetOverride ?? budgetFromUrl

  /* Le libellé part avec la clé : la page associative affiche ses propres
     tarifs, donc seul le client sait ce que le visiteur avait sous les yeux. */
  const budgetLabels: Record<BudgetKey, string> = {
    cadrage: dict.budget_scoping,
    presence: dict.budget_1,
    boutique: dict.budget_2,
    outils: dict.budget_3,
  }

  /* Le formulaire garde noValidate : les bulles natives du navigateur ont leur
     propre typographie et leur propre placement, elles jureraient ici. On
     rejoue donc les mêmes règles que le schéma zod du serveur, à la virgule
     près — trim compris, sans quoi dix espaces passeraient le client et se
     feraient refuser à l'arrivée. */
  function validate(data: FormData): FieldErrors {
    const errors: FieldErrors = {}
    const name = String(data.get('from_name') ?? '').trim()
    const email = String(data.get('reply_to') ?? '').trim()
    const budget = String(data.get('budget') ?? '')
    const message = String(data.get('message') ?? '').trim()

    if (name.length < 2 || name.length > 100) errors.from_name = dict.err_name
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.reply_to = dict.err_email
    if (!BUDGET_KEYS.includes(budget as BudgetKey)) errors.budget = dict.err_budget
    if (message.length < 10 || message.length > 5000) errors.message = dict.err_message

    return errors
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!formRef.current) return

    const data = new FormData(formRef.current)
    const errors = validate(data)
    setFieldErrors(errors)

    if (Object.keys(errors).length > 0) {
      setStatus('idle')
      setErrorCode(null)
      return
    }

    setStatus('sending')
    setErrorCode(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from_name: data.get('from_name'),
          reply_to: data.get('reply_to'),
          budget: data.get('budget'),
          budget_label: budgetLabels[String(data.get('budget')) as BudgetKey],
          message: data.get('message'),
        }),
      })

      if (!res.ok) {
        /* Le serveur ne renvoie qu'un code : c'est ici, où le dictionnaire est
           déjà chargé, que le code devient une phrase dans la bonne langue.
           Tout code inconnu retombe sur la panne de transport, la seule
           formulation qui offre une porte de sortie au visiteur. */
        const body = await res.json().catch(() => null)
        const code = body?.error
        setErrorCode(
          code === 'RATE_LIMITED' || code === 'INVALID_PAYLOAD' ? code : 'TRANSPORT_FAILED'
        )
        setStatus('error')
        return
      }

      setStatus('success')
      formRef.current.reset()
      setBudgetOverride('')
      setFieldErrors({})
    } catch {
      setErrorCode('TRANSPORT_FAILED')
      setStatus('error')
    }
  }

  return (
    <section id="contact" className={styles.section}>
      <div className="container">

        <div className={styles.header}>
          <div className={styles.headerLeft}>
            {dict.eyebrow && <p className={styles.eyebrow}>{dict.eyebrow}</p>}
            <h2 className={styles.sectionTitle}>{dict.section_title}</h2>
          </div>
          <div className={styles.headerRight}>
            <p className={styles.intro}>{dict.intro}</p>
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className={styles.form} noValidate>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="from_name" className={styles.label}>{dict.field_name}</label>
              <input
                id="from_name"
                type="text"
                name="from_name"
                required
                className={styles.input}
                aria-invalid={!!fieldErrors.from_name}
                aria-describedby={fieldErrors.from_name ? 'from_name-error' : undefined}
              />
              {fieldErrors.from_name && (
                <p id="from_name-error" className={styles.fieldError} role="alert">
                  {fieldErrors.from_name}
                </p>
              )}
            </div>
            <div className={styles.field}>
              <label htmlFor="reply_to" className={styles.label}>{dict.field_email}</label>
              <input
                id="reply_to"
                type="email"
                name="reply_to"
                required
                className={styles.input}
                aria-invalid={!!fieldErrors.reply_to}
                aria-describedby={fieldErrors.reply_to ? 'reply_to-error' : undefined}
              />
              {fieldErrors.reply_to && (
                <p id="reply_to-error" className={styles.fieldError} role="alert">
                  {fieldErrors.reply_to}
                </p>
              )}
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="budget" className={styles.label}>{dict.field_budget}</label>
            <div className={styles.selectWrapper}>
              <select
                id="budget"
                name="budget"
                required
                className={styles.select}
                value={selectedBudget}
                onChange={(e) => setBudgetOverride(e.target.value)}
                aria-invalid={!!fieldErrors.budget}
                aria-describedby={fieldErrors.budget ? 'budget-error' : undefined}
              >
                <option value="" disabled>{dict.field_budget_placeholder}</option>
                <option value="cadrage">{dict.budget_scoping}</option>
                <option value="presence">{dict.budget_1}</option>
                <option value="boutique">{dict.budget_2}</option>
                <option value="outils">{dict.budget_3}</option>
              </select>
              <ChevronDown size={14} strokeWidth={1.5} className={styles.selectArrow} aria-hidden="true" />
            </div>
            {fieldErrors.budget && (
              <p id="budget-error" className={styles.fieldError} role="alert">
                {fieldErrors.budget}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="message" className={styles.label}>{dict.field_description}</label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              placeholder={dict.field_description_placeholder}
              className={styles.textarea}
              aria-invalid={!!fieldErrors.message}
              aria-describedby={fieldErrors.message ? 'message-error' : undefined}
            />
            {fieldErrors.message && (
              <p id="message-error" className={styles.fieldError} role="alert">
                {fieldErrors.message}
              </p>
            )}
          </div>

          <div className={styles.footer}>
            <button
              type="submit"
              disabled={status === 'sending'}
              className={styles.btn}
            >
              {status === 'sending' ? (
                <span className={styles.dots}>
                  <span>.</span><span>.</span><span>.</span>
                </span>
              ) : dict.btn_submit}
            </button>

            <p className={styles.privacyNote}>
              {dict.privacy_note}{' '}
              <a href={`/${locale}/politique-de-confidentialite`} className={styles.privacyLink}>
                {dict.privacy_link}
              </a>
            </p>

            {status === 'success' && (
              <p className={styles.successMsg} role="status" aria-live="polite">
                {dict.success}
              </p>
            )}
            {status === 'error' && (
              <p className={styles.errorMsg} role="alert" aria-live="assertive">
                {errorCode === 'RATE_LIMITED' && dict.error_rate_limited}
                {errorCode === 'INVALID_PAYLOAD' && dict.error_invalid}
                {errorCode === 'TRANSPORT_FAILED' && (
                  <>
                    {dict.error_transport}{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`} className={styles.errorLink}>
                      {CONTACT_EMAIL}
                    </a>.
                  </>
                )}
              </p>
            )}
          </div>

        </form>

      </div>
    </section>
  )
}
