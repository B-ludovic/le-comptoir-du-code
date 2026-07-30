/* Identification de l'appelant et filtrage d'origine, partagés par les trois
   routes d'API. Aucune des deux fonctions ne doit faire confiance à un en-tête
   que le client peut écrire lui-même. */

const ALLOWED_HOSTS = new Set(['lechoppeducode.com', 'www.lechoppeducode.com'])

/* X-Forwarded-For est une liste à laquelle chaque proxy ajoute : son premier
   élément est la valeur la plus ancienne, donc celle que le client a pu poser
   lui-même. L'utiliser comme clé de comptage laisse l'attaquant choisir son
   propre compteur.

   cf-connecting-ip est réécrit par Cloudflare à chaque requête. On ne s'y fie
   que si cf-ray atteste que la requête est bien passée par Cloudflare ; sinon
   on retombe sur x-real-ip, posé par Vercel à partir de la connexion réelle. */
export function clientIp(req: Request): string {
  if (req.headers.get('cf-ray')) {
    const cf = req.headers.get('cf-connecting-ip')?.trim()
    if (cf) return cf
  }
  return req.headers.get('x-real-ip')?.trim() || 'unknown'
}

/* Défense CSRF : req.json() ne vérifie pas le Content-Type, donc un formulaire
   hostile en enctype="text/plain" peut poster du JSON valide depuis n'importe
   quel site. On exige que l'origine corresponde au domaine servi.

   Un navigateur envoie toujours Origin sur un POST, y compris same-origin :
   son absence signale un client qui n'a rien à faire ici. */
export function sameOrigin(req: Request): boolean {
  const origin = req.headers.get('origin')
  if (!origin) return false

  let originHost: string
  try {
    originHost = new URL(origin).host
  } catch {
    return false
  }

  if (ALLOWED_HOSTS.has(originHost)) return true

  // Prévisualisations Vercel et développement local : l'origine doit
  // correspondre à l'hôte effectivement servi.
  const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host')
  return !!host && originHost === host
}
