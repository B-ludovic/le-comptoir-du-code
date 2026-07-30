import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { z } from 'zod'
import { clientIp, sameOrigin } from '@/lib/http'
import { createRateLimiter } from '@/lib/rate-limit'

// Rate limiting : 3 requêtes max par IP sur 15 minutes
const rateLimit = createRateLimiter(3, 15 * 60 * 1000)

const schema = z.object({
  // Pas de retour à la ligne : cette valeur finit dans l'en-tête Subject.
  from_name: z.string().min(1).max(100).regex(/^[^\r\n]+$/),
  reply_to: z.email().max(200),
  budget: z.string().max(200).optional(),
  message: z.string().min(10).max(5000),
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
    return NextResponse.json({ error: 'Origine non autorisée' }, { status: 403 })
  }

  if (!rateLimit.consume(clientIp(req))) {
    return NextResponse.json(
      { error: 'Trop de tentatives. Réessayez dans 15 minutes.' },
      { status: 429 }
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Données invalides' }, { status: 400 })
  }

  const result = schema.safeParse(body)

  if (!result.success) {
    return NextResponse.json({ error: 'Données invalides' }, { status: 400 })
  }

  const { from_name, reply_to, budget, message } = result.data

  try {
    await transporter.sendMail({
      from: `"L'Echoppe du Code" <contact@lechoppeducode.com>`,
      to: 'contact@lechoppeducode.com',
      replyTo: reply_to,
      subject: `Nouveau brief — ${from_name}`,
      text: `Nom : ${from_name}\nEmail : ${reply_to}\nBudget : ${budget || '—'}\n\n${message}`,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Erreur envoi' }, { status: 500 })
  }
}
