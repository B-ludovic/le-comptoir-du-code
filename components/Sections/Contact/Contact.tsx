'use client'

import { useState, useRef, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
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
  const [selectedBudget, setSelectedBudget] = useState('')
  const searchParams = useSearchParams()

  useEffect(() => {
    const budget = searchParams.get('budget')
    if (budget === '1') setSelectedBudget(dict.budget_1)
    else if (budget === '2') setSelectedBudget(dict.budget_2)
    else if (budget === '3') setSelectedBudget(dict.budget_3)
  }, [searchParams, dict.budget_1, dict.budget_2, dict.budget_3])

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
      setSelectedBudget('')
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
              <label className={styles.label}>{dict.field_name}</label>
              <input
                type="text"
                name="from_name"
                required
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>{dict.field_email}</label>
              <input
                type="email"
                name="reply_to"
                required
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>{dict.field_budget}</label>
            <div className={styles.selectWrapper}>
              <select
                name="budget"
                required
                className={styles.select}
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
              >
                <option value="">—</option>
                <option value={dict.budget_1}>{dict.budget_1}</option>
                <option value={dict.budget_2}>{dict.budget_2}</option>
                <option value={dict.budget_3}>{dict.budget_3}</option>
              </select>
              <span className={styles.selectArrow}>↓</span>
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>{dict.field_description}</label>
            <textarea
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
              <p className={styles.successMsg}>Message envoyé. Je reviens vers vous rapidement.</p>
            )}
            {status === 'error' && (
              <p className={styles.errorMsg}>Une erreur est survenue. Réessayez ou écrivez directement à votre adresse email.</p>
            )}
          </div>

        </form>

      </div>
    </section>
  )
}
