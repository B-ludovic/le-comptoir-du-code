import { NextRequest, NextResponse } from 'next/server'
import { timingSafeEqual } from 'crypto'

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

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Protection de la page /devis (sauf /devis/login)
  const isDevisPath = /^\/[a-z]{2}\/devis(?!\/login)/.test(pathname) || pathname === '/devis'
  if (isDevisPath) {
    const token = request.cookies.get('devis_auth')?.value
    const expected = process.env.DEVIS_TOKEN
    const valid = token && expected && (() => {
      try {
        const a = Buffer.from(token)
        const b = Buffer.from(expected)
        return a.length === b.length && timingSafeEqual(a, b)
      } catch { return false }
    })()
    if (!valid) {
      const locale = locales.find(l => pathname.startsWith(`/${l}/`)) ?? defaultLocale
      return NextResponse.redirect(new URL(`/${locale}/devis/login`, request.url))
    }
  }

  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  const locale = getLocale(request)
  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
}

export const config = {
  matcher: ['/((?!_next|favicon\\.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico)|images|fonts|icons|api|sitemap\\.xml|robots\\.txt|llms\\.txt).*)']
}
