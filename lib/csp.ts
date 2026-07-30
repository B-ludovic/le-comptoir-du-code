/* Construction de la Content-Security-Policy.

   Elle vit ici et non dans next.config.ts parce qu'elle a besoin d'un nonce
   différent à chaque requête, ce qu'un fichier de configuration statique ne
   peut pas produire. Les autres en-têtes de sécurité (HSTS, nosniff,
   X-Frame-Options…) restent dans next.config.ts : ils sont constants et
   doivent couvrir aussi les réponses que le middleware ne voit pas.

   Pourquoi un nonce : 'unsafe-inline' autorise n'importe quel script inline,
   y compris celui qu'un attaquant aurait réussi à injecter — la directive ne
   protégeait donc de rien. Avec un nonce, seul un script portant le jeton du
   jour s'exécute, et ce jeton change à chaque chargement de page.

   'strict-dynamic' est indispensable et non décoratif : il autorise les
   scripts chargés *par* un script déjà approuvé. Sans lui, le chargeur de
   Next.js passerait mais aucun des morceaux qu'il va chercher ensuite. */

export function buildCsp(nonce: string | null): string {
  const isDev = process.env.NODE_ENV === 'development'

  /* En développement, le rechargement à chaud injecte ses propres scripts et
     a besoin d'eval : on garde la politique permissive d'origine plutôt que
     de rendre `npm run dev` inutilisable. La production, elle, est stricte. */
  const scriptSrc = isDev
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
    : `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`

  return [
    "default-src 'self'",
    scriptSrc,
    // Les CSS Modules et l'aperçu de devis reposent sur des styles inline ;
    // un nonce y serait impraticable, et l'injection de style seule ne permet
    // pas l'exécution de code.
    "style-src 'self' 'unsafe-inline'",
    // Polices auto-hébergées uniquement (public/fonts.css)
    "font-src 'self'",
    // Images locales + data URI (portraits, logos)
    "img-src 'self' data: https:",
    // Requêtes API uniquement vers le même domaine
    "connect-src 'self'",
    // iframe srcDoc du devis
    "frame-src 'self' blob:",
    // Formulaires uniquement vers le même domaine
    "form-action 'self'",
    // Empêche l'injection de balise <base>
    "base-uri 'self'",
    // Aucun plugin (Flash, etc.)
    "object-src 'none'",
    // Empêche l'intégration de ce site dans un iframe externe
    "frame-ancestors 'none'",
    // Rattrape une éventuelle ressource référencée en http://
    'upgrade-insecure-requests',
  ].join('; ')
}

export function generateNonce(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16))
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary)
}
