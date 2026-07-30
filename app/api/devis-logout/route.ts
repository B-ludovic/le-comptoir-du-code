import { NextRequest, NextResponse } from 'next/server'
import { sameOrigin } from '@/lib/http'

/* Sans déconnexion, la seule façon de fermer une session était d'attendre huit
   heures ou de faire tourner DEVIS_SECRET, ce qui déconnecte tout le monde.
   Le jeton étant signé et autonome, il suffit d'effacer le cookie. */
export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) {
    return NextResponse.json({ error: 'Origine non autorisée' }, { status: 403 })
  }

  const response = NextResponse.json({ success: true })
  response.cookies.set('devis_auth', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  })

  return response
}
