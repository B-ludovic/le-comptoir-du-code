/* Source unique du contrôle d'accès à l'espace devis : le middleware, la page
   et les routes d'API s'appuient tous sur ce fichier.

   Le cookie ne contient plus un secret d'environnement recopié tel quel, mais
   un jeton signé qui porte sa propre date de péremption. Trois conséquences :
   le serveur refuse un jeton périmé au lieu de s'en remettre au maxAge que le
   navigateur est libre d'ignorer, un cookie exfiltré cesse de fonctionner tout
   seul, et faire tourner DEVIS_SECRET révoque instantanément toutes les
   sessions en cours.

   Web Crypto plutôt que node:crypto : le middleware tourne dans l'Edge Runtime,
   où seul crypto.subtle est garanti. */

const enc = new TextEncoder()

export const TOKEN_TTL_SECONDS = 8 * 60 * 60

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

/* importKey est loin d'être gratuit : on garde la clé dérivée pour la durée de
   vie de l'instance. */
let cachedKey: Promise<CryptoKey> | null = null

function hmacKey(): Promise<CryptoKey> {
  const secret = process.env.DEVIS_SECRET
  if (!secret) throw new Error('DEVIS_SECRET absent de la configuration')
  cachedKey ??= crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  )
  return cachedKey
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

/* Le tampon est alloué explicitement : crypto.subtle attend une vue adossée à
   un ArrayBuffer, que TypeScript distingue du ArrayBufferLike générique. */
function fromBase64Url(value: string) {
  try {
    const binary = atob(value.replace(/-/g, '+').replace(/_/g, '/'))
    const bytes = new Uint8Array(new ArrayBuffer(binary.length))
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
    return bytes
  } catch {
    return null
  }
}

/* Format : v1.<expiration unix>.<aléa>.<signature>
   Le préfixe de version permet de faire évoluer le format plus tard sans qu'un
   ancien jeton passe par erreur. L'aléa rend deux sessions distinguables, ce
   qu'une liste de révocation exploitera si le besoin s'en fait sentir. */
export async function issueDevisToken(): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS
  const jti = toBase64Url(crypto.getRandomValues(new Uint8Array(9)))
  const payload = `v1.${exp}.${jti}`
  const signature = await crypto.subtle.sign('HMAC', await hmacKey(), enc.encode(payload))
  return `${payload}.${toBase64Url(new Uint8Array(signature))}`
}

export async function verifyDevisToken(token: string | undefined): Promise<boolean> {
  if (!token) return false

  const parts = token.split('.')
  if (parts.length !== 4 || parts[0] !== 'v1') return false

  const [version, exp, jti, signature] = parts
  const signatureBytes = fromBase64Url(signature)
  if (!signatureBytes) return false

  try {
    // La signature d'abord : tant qu'elle n'est pas validée, l'expiration
    // inscrite dans le jeton n'est qu'une affirmation de l'appelant.
    const signed = await crypto.subtle.verify(
      'HMAC',
      await hmacKey(),
      signatureBytes,
      enc.encode(`${version}.${exp}.${jti}`),
    )
    if (!signed) return false
  } catch {
    return false
  }

  const expiresAt = Number(exp)
  return Number.isSafeInteger(expiresAt) && expiresAt > Math.floor(Date.now() / 1000)
}
