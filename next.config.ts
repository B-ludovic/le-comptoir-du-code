import type { NextConfig } from 'next'

/* La Content-Security-Policy n'est plus ici : elle a besoin d'un nonce neuf à
   chaque requête, que ce fichier ne peut pas produire. Elle est construite
   dans lib/csp.ts et posée par le middleware (proxy.ts).

   Les en-têtes ci-dessous sont constants et restent à ce niveau, ce qui leur
   permet de couvrir aussi les réponses que le matcher du middleware exclut :
   assets statiques, images, polices et routes d'API. */
const nextConfig: NextConfig = {
  /* « La même URL, en .md » : la convention que suivent les crawlers de moteurs
     génératifs pour récupérer la source d'une page. Le point ne pouvant pas
     figurer dans un nom de segment dynamique, la contrainte sur :slug l'exclut
     explicitement — sinon le paramètre avalerait le « .md » et rien ne
     correspondrait. */
  rewrites: async () => [
    {
      source: '/:locale(fr|en)/blog/:slug([a-z0-9-]+).md',
      destination: '/api/markdown/:locale/:slug',
    },
  ],
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        // HSTS : force HTTPS pendant 1 an, sous-domaines inclus, preload
        { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
        // Isole la fenêtre des popups cross-origin
        { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
        // Interdit au navigateur de deviner le type MIME
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        // Bloque le chargement de la page dans un iframe (clickjacking)
        { key: 'X-Frame-Options', value: 'DENY' },
        // Empêche les fuites de referrer vers des domaines externes
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        // Limite l'accès aux APIs sensibles du navigateur
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      ],
    },
  ],
}

export default nextConfig
