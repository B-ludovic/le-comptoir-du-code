import type { NextConfig } from 'next'

const CSP = [
  "default-src 'self'",
  // Next.js a besoin de unsafe-inline pour l'hydratation côté client
  // React dev mode a besoin de unsafe-eval (jamais utilisé en production)
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''}`,
  // Styles inline + Google Fonts (utilisés dans l'aperçu devis)
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  // Polices Google Fonts
  "font-src 'self' https://fonts.gstatic.com",
  // Images locales + data URI (portraits, logos)
  "img-src 'self' data: https:",
  // Requêtes API uniquement vers le même domaine
  "connect-src 'self'",
  // iframe srcDoc du devis (blob: pour le rendu interne)
  "frame-src 'self' blob:",
  // Formulaires uniquement vers le même domaine
  "form-action 'self'",
  // Empêche l'injection de balise <base>
  "base-uri 'self'",
  // Aucun plugin (Flash, etc.)
  "object-src 'none'",
  // Empêche l'intégration de ce site dans un iframe externe
  "frame-ancestors 'none'",
].join('; ')

const nextConfig: NextConfig = {
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'Content-Security-Policy', value: CSP },
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
