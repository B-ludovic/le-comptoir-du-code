import { llmsFull } from '@/lib/llms'

export const dynamic = 'force-static'

/* Pendant intégral de llms.txt : l'index plus le texte de tous les articles.
   Sert les moteurs génératifs qui préfèrent une source unique et propre à
   quinze pages HTML à nettoyer. */
export function GET() {
  return new Response(llmsFull(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
