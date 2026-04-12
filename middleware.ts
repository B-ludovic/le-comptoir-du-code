import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protège toutes les routes /[locale]/devis sauf /[locale]/devis/login
  if (/^\/[a-z]{2}\/devis(?!\/login)(\/.*)?$/.test(pathname)) {
    const token = request.cookies.get('devis_auth')?.value
    const validToken = process.env.DEVIS_TOKEN

    if (!token || !validToken || token !== validToken) {
      const locale = pathname.split('/')[1]
      return NextResponse.redirect(new URL(`/${locale}/devis/login`, request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/:locale/devis/:path*'],
}
