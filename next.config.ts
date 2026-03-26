import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        // Interdit au navigateur de deviner le type MIME
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        // Bloque le chargement de la page dans un iframe (clickjacking)
        { key: 'X-Frame-Options', value: 'DENY' },
        // Désactive la détection XSS du navigateur (obsolète mais inoffensif)
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        // Empêche les fuites de referrer vers des domaines externes
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        // Limite l'accès aux APIs sensibles du navigateur
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()',
        },
      ],
    },
  ],
}

export default nextConfig
