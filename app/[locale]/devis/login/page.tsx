'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import styles from './login.module.css'

export default function DevisLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/devis-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push(`/${locale}/devis`)
    } else {
      setError('Mot de passe incorrect.')
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.logo}>
          <span className={styles.logoMark}>C/C</span>
          <span className={styles.logoText}>Accès privé</span>
        </div>
        <label htmlFor="password" className="sr-only">Mot de passe</label>
        <input
          id="password"
          type="password"
          className={styles.input}
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoFocus
          aria-invalid={!!error}
          aria-describedby={error ? 'password-error' : undefined}
        />
        {error && <p id="password-error" className={styles.error} role="alert" aria-live="assertive">{error}</p>}
        <button type="submit" className={styles.btn} disabled={loading}>
          {loading ? '...' : 'Entrer'}
        </button>
      </form>
    </div>
  )
}
