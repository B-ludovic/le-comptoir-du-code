/* Comptage en mémoire, partagé par les trois routes pour éviter que trois
   copies du même code ne divergent.

   Limite structurelle, à garder en tête : sur Vercel chaque instance de lambda
   a sa propre mémoire et démarre à froid avec un compteur vide. Ce module ne
   freine donc qu'un abus séquentiel depuis une même instance ; la vraie
   protection est la règle de rate limiting Cloudflare, en amont. Le jour où
   ce comptage doit devenir fiable, c'est ce fichier — et lui seul — qui passe
   sur un stockage partagé (Vercel KV / Upstash). */

type Entry = { count: number; reset: number }

export function createRateLimiter(limit: number, windowMs: number) {
  const hits = new Map<string, Entry>()

  /* Sans purge, les clés d'IP jamais revues s'accumulent jusqu'au recyclage de
     l'instance. On ne balaie qu'au-delà d'un seuil : le coût reste nul en
     trafic normal. */
  function sweep(now: number): void {
    if (hits.size < 5_000) return
    for (const [key, entry] of hits) {
      if (now > entry.reset) hits.delete(key)
    }
  }

  return {
    /** Compte une requête. Renvoie false si le quota est dépassé. */
    consume(key: string): boolean {
      const now = Date.now()
      sweep(now)

      const entry = hits.get(key)
      if (!entry || now > entry.reset) {
        hits.set(key, { count: 1, reset: now + windowMs })
        return true
      }
      if (entry.count >= limit) return false

      entry.count++
      return true
    },

    /** Quota déjà atteint ? Ne consomme rien. */
    exceeded(key: string): boolean {
      const entry = hits.get(key)
      if (!entry || Date.now() > entry.reset) return false
      return entry.count >= limit
    },

    /** Compte une tentative ratée (authentification). */
    fail(key: string): void {
      const now = Date.now()
      sweep(now)

      const entry = hits.get(key)
      if (entry && now <= entry.reset) entry.count++
      else hits.set(key, { count: 1, reset: now + windowMs })
    },

    /** Efface le compteur (tentative réussie). */
    reset(key: string): void {
      hits.delete(key)
    },
  }
}
