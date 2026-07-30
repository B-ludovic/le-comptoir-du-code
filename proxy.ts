import { NextRequest, NextResponse } from 'next/server'
import { isDevisPath, verifyDevisToken } from '@/lib/devis-auth'
import { buildCsp, generateNonce } from '@/lib/csp'

const locales = ['fr', 'en']
const defaultLocale = 'fr'

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const preferred = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim().substring(0, 2))
      .find(lang => locales.includes(lang))
    if (preferred) return preferred
  }
  return defaultLocale
}

function withCsp(response: NextResponse, csp: string): NextResponse {
  response.headers.set('Content-Security-Policy', csp)
  return response
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  /* Un nonce neuf par requête : c'est toute la raison pour laquelle la CSP a
     quitté next.config.ts, qui ne peut produire que des valeurs constantes. */
  const nonce = generateNonce()
  const csp = buildCsp(nonce)

  // Protection de la page /devis (sauf /devis/login)
  if (isDevisPath(pathname)) {
    if (!(await verifyDevisToken(request.cookies.get('devis_auth')?.value))) {
      const locale =
        locales.find(l => pathname.toLowerCase().startsWith(`/${l}/`)) ?? defaultLocale
      return withCsp(
        NextResponse.redirect(new URL(`/${locale}/devis/login`, request.url)),
        csp,
      )
    }
  }

  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (!pathnameHasLocale) {
    const locale = getLocale(request)
    return withCsp(
      NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url)),
      csp,
    )
  }

  /* Next.js relit la politique dans les en-têtes de la requête pour apposer
     lui-même le nonce aux scripts qu'il injecte : elle doit donc voyager à
     l'aller comme au retour. */
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('Content-Security-Policy', csp)
  requestHeaders.set('x-nonce', nonce)

  return withCsp(NextResponse.next({ request: { headers: requestHeaders } }), csp)
}

export const config = {
  matcher: ['/((?!_next|favicon\\.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico)|images|fonts|icons|api|sitemap\\.xml|robots\\.txt|llms\\.txt).*)']
}
