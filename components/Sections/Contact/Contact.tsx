'use client'

import { useState, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import styles from './Contact.module.css'

type Props = {
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
  }
}

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function Contact({ dict }: Props) {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<Status>('idle')
  const searchParams = useSearchParams()

  // Valeur dérivée de l'URL, calculée au rendu : pas d'effet, donc pas de
  // rendu à vide avant que le budget ne s'affiche.
  const budgetParam = searchParams.get('budget')
  const budgetFromUrl =
    budgetParam === 'cadrage' ? dict.budget_scoping :
    budgetParam === '1' ? dict.budget_1 :
    budgetParam === '2' ? dict.budget_2 :
    budgetParam === '3' ? dict.budget_3 :
    ''

  // Dès que l'utilisateur choisit lui-même, son choix prend le pas sur l'URL.
  const [budgetOverride, setBudgetOverride] = useState<string | null>(null)
  const selectedBudget = budgetOverride ?? budgetFromUrl

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!formRef.current) return

    setStatus('sending')

    const data = new FormData(formRef.current)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from_name: data.get('from_name'),
          reply_to: data.get('reply_to'),
          budget: data.get('budget'),
          message: data.get('message'),
        }),
      })

      if (!res.ok) throw new Error()

      setStatus('success')
      formRef.current.reset()
      setBudgetOverride('')
    } catch {
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
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="reply_to" className={styles.label}>{dict.field_email}</label>
              <input
                id="reply_to"
                type="email"
                name="reply_to"
                required
                className={styles.input}
              />
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
              >
                <option value="" disabled>{dict.field_budget_placeholder}</option>
                <option value={dict.budget_scoping}>{dict.budget_scoping}</option>
                <option value={dict.budget_1}>{dict.budget_1}</option>
                <option value={dict.budget_2}>{dict.budget_2}</option>
                <option value={dict.budget_3}>{dict.budget_3}</option>
              </select>
              <ChevronDown size={14} strokeWidth={1.5} className={styles.selectArrow} aria-hidden="true" />
            </div>
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
            />
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

            {status === 'success' && (
              <p className={styles.successMsg} role="status" aria-live="polite">
                Message envoyé. Je reviens vers vous rapidement.
              </p>
            )}
            {status === 'error' && (
              <p className={styles.errorMsg} role="alert" aria-live="assertive">
                Une erreur est survenue. Réessayez ou écrivez directement à votre adresse email.
              </p>
            )}
          </div>

        </form>

      </div>
    </section>
  )
}
