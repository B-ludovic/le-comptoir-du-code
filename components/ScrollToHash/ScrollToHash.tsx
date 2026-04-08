'use client'

import { useEffect } from 'react'

export default function ScrollToHash() {
  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return
    const id = hash.slice(1)
    const el = document.getElementById(id)
    if (!el) return
    setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100)
  }, [])

  return null
}
