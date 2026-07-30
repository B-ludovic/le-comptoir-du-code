import { NextRequest, NextResponse } from 'next/server'
import { isDevisPath, verifyDevisToken } from '@/lib/devis-auth'

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
  if (isDevisPath(pathname)) {
    if (!verifyDevisToken(request.cookies.get('devis_auth')?.value)) {
      const locale =
        locales.find(l => pathname.toLowerCase().startsWith(`/${l}/`)) ?? defaultLocale
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
