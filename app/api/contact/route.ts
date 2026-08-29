import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { z } from 'zod'
import { clientIp, sameOrigin } from '@/lib/http'
import { createRateLimiter } from '@/lib/rate-limit'

// Rate limiting : 3 requêtes max par IP sur 15 minutes
const rateLimit = createRateLimiter(3, 15 * 60 * 1000)

/* Le palier arrive en deux exemplaires. La clé est la valeur stable, celle qui
   survit à une réécriture des libellés. Le libellé, lui, est l'instantané de
   ce que le visiteur avait réellement sous les yeux — et c'est ce qui compte
   pour la conversation qui suivra, puisque la page associative affiche ses
   propres tarifs. Le serveur n'a donc aucune grille de prix à connaître. */
const schema = z.object({
  // Pas de retour à la ligne : cette valeur finit dans l'en-tête Subject.
  from_name: z.string().trim().min(2).max(100).regex(/^[^\r\n]+$/),
  reply_to: z.email().max(200),
  budget: z.enum(['cadrage', 'presence', 'boutique', 'outils']),
  // Ce libellé finit dans le corps du mail : borné, sans retour à la ligne.
  budget_label: z.string().trim().min(1).max(200).regex(/^[^\r\n]+$/),
  message: z.string().trim().min(10).max(5000),
})

const transporter = nodemailer.createTransport({
  host: 'smtp.mail.me.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.ICLOUD_SMTP_USER,
    pass: process.env.ICLOUD_SMTP_PASSWORD,
  },
})

export async function POST(req: NextRequest) {
  // Avant tout comptage : une vague de CSRF ne doit pas remplir le limiteur.
  if (!sameOrigin(req)) {
    return NextResponse.json({ error: 'FORBIDDEN_ORIGIN' }, { status: 403 })
  }

  if (!rateLimit.consume(clientIp(req))) {
    return NextResponse.json({ error: 'RATE_LIMITED' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'INVALID_PAYLOAD' }, { status: 400 })
  }

  const result = schema.safeParse(body)

  if (!result.success) {
    return NextResponse.json({ error: 'INVALID_PAYLOAD' }, { status: 400 })
  }

  const { from_name, reply_to, budget, budget_label, message } = result.data

  try {
    await transporter.sendMail({
      from: `"L'Échoppe du Code" <contact@lechoppeducode.com>`,
      to: 'contact@lechoppeducode.com',
      replyTo: reply_to,
      subject: `Nouveau brief — ${from_name}`,
      text: `Nom : ${from_name}\nEmail : ${reply_to}\nBudget : ${budget_label} (${budget})\n\n${message}`,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'TRANSPORT_FAILED' }, { status: 500 })
  }
}
