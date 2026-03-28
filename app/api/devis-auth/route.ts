import { NextRequest, NextResponse } from 'next/server'
import { timingSafeEqual } from 'crypto'

// Rate limiting en mémoire — max 5 tentatives / 15 min par IP
const attempts = new Map<string, { count: number; resetAt: number }>()
const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000

function safeCompare(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a)
    const bufB = Buffer.from(b)
    if (bufA.length !== bufB.length) {
      // Comparaison fictive pour éviter le timing leak sur la longueur
      timingSafeEqual(bufA, bufA)
      return false
    }
    return timingSafeEqual(bufA, bufB)
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const now = Date.now()

  // Vérification rate limit
  const entry = attempts.get(ip)
  if (entry) {
    if (now < entry.resetAt && entry.count >= MAX_ATTEMPTS) {
      return NextResponse.json({ error: 'Trop de tentatives. Réessayez dans 15 minutes.' }, { status: 429 })
    }
    if (now >= entry.resetAt) {
      attempts.delete(ip)
    }
  }

  const { password } = await request.json()

  const isValid =
    typeof password === 'string' &&
    typeof process.env.DEVIS_PASSWORD === 'string' &&
    safeCompare(password, process.env.DEVIS_PASSWORD)

  if (!isValid) {
    const current = attempts.get(ip)
    if (current && now < current.resetAt) {
      current.count++
    } else {
      attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    }
    return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 })
  }

  attempts.delete(ip)

  const response = NextResponse.json({ success: true })
  response.cookies.set('devis_auth', process.env.DEVIS_TOKEN!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 8,
    path: '/',
  })

  return response
}
