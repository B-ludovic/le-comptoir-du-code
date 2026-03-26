import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'fr'];
const defaultLocale = 'fr';

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) 
        return NextResponse.next()

    const locale = defaultLocale
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
}

export const config = {
    matcher: [
        '/((?!_next|favicon.ico|images|fonts).*)',
    ],
}