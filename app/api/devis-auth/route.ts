import { NextRequest, NextResponse } from 'next/server'
import { timingSafeEqual } from 'crypto'
import { clientIp, sameOrigin } from '@/lib/http'
import { createRateLimiter } from '@/lib/rate-limit'
import { issueDevisToken, TOKEN_TTL_SECONDS } from '@/lib/devis-auth'

// Rate limiting en mémoire — max 5 tentatives / 15 min par IP
const attempts = createRateLimiter(5, 15 * 60 * 1000)

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
  if (!sameOrigin(request)) {
    return NextResponse.json({ error: 'Origine non autorisée' }, { status: 403 })
  }

  const ip = clientIp(request)

  // Vérification rate limit
  if (attempts.exceeded(ip)) {
    return NextResponse.json({ error: 'Trop de tentatives. Réessayez dans 15 minutes.' }, { status: 429 })
  }

  let password: unknown
  try {
    ;({ password } = await request.json())
  } catch {
    return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 })
  }

  const isValid =
    typeof password === 'string' &&
    typeof process.env.DEVIS_PASSWORD === 'string' &&
    safeCompare(password, process.env.DEVIS_PASSWORD)

  if (!isValid) {
    attempts.fail(ip)
    return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 })
  }

  attempts.reset(ip)

  const response = NextResponse.json({ success: true })
  response.cookies.set('devis_auth', await issueDevisToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    // Le navigateur oublie le cookie au même moment où le serveur cesserait
    // de l'accepter : les deux échéances ne peuvent pas diverger.
    maxAge: TOKEN_TTL_SECONDS,
    path: '/',
  })

  return response
}
