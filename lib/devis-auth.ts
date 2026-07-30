import { timingSafeEqual } from 'crypto'

/* Source unique du contrôle d'accès à l'espace devis : le middleware et la
   page elle-même s'appuient tous les deux sur ces deux fonctions. */

/* Le routage de Vercel est insensible à la casse : /fr/Devis atteint la même
   route que /fr/devis. La comparaison se fait donc sur une forme normalisée
   (minuscules, sans slash final), sans quoi le contrôle se contourne en
   changeant une seule majuscule dans l'URL.

   Le lookahead exclut la page de connexion, et seulement elle : /devis/loginX
   reste protégé. */
export function isDevisPath(pathname: string): boolean {
  const normalized = pathname.toLowerCase().replace(/\/+$/, '') || '/'
  return /^(\/[a-z]{2})?\/devis(?!\/login\b)(\/|$)/.test(normalized)
}

export function verifyDevisToken(token: string | undefined): boolean {
  const expected = process.env.DEVIS_TOKEN
  if (!token || !expected) return false
  try {
    const a = Buffer.from(token)
    const b = Buffer.from(expected)
    return a.length === b.length && timingSafeEqual(a, b)
  } catch {
    return false
  }
}
