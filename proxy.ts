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

/* La redirection vers /fr ou /en dépend de l'en-tête Accept-Language : la même
   URL ne renvoie donc pas tout le monde au même endroit. Sans `Vary`, un cache
   partagé — CDN, proxy d'entreprise, navigateur — sert au visiteur suivant la
   langue du précédent, et un moteur indexe la première version qu'il a vue en
   croyant que c'est la seule. L'en-tête dit : cette réponse dépend de cet
   en-tête-là, ne la réutilise pas pour une requête différente. */
function withLanguageVary(response: NextResponse): NextResponse {
  response.headers.set('Vary', 'Accept-Language')
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
    /* 307 et non 308 : la destination dépend de la langue du visiteur, donc la
       redirection ne peut pas être permanente. Un 308 serait mis en cache par
       le navigateur et enfermerait ensuite l'utilisateur dans la langue de sa
       première visite, y compris après avoir cliqué sur FR/EN. */
    return withLanguageVary(
      withCsp(
        NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url), 307),
        csp,
      ),
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

/* Les fichiers servis depuis public/ doivent sortir du champ du middleware :
   ils n'ont pas de préfixe de langue, donc la redirection de locale les
   enverrait vers /fr/… où ils n'existent pas. Le symptôme est trompeur — le
   navigateur annonce un format vidéo non géré, alors qu'il a simplement reçu
   une redirection puis un 404. D'où les deux garde-fous : le dossier et
   l'extension, comme c'est déjà le cas pour les images. */
export const config = {
  matcher: ['/((?!_next|favicon\\.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|mp4|webm|woff2)|images|videos|fonts|icons|api|sitemap\\.xml|robots\\.txt|llms\\.txt|llms-full\\.txt).*)']
}
