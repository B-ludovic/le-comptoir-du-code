import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { z } from 'zod'

// Rate limiting : 3 requêtes max par IP sur 15 minutes
const rateLimit = new Map<string, { count: number; reset: number }>()
const LIMIT = 3
const WINDOW_MS = 15 * 60 * 1000

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimit.get(ip)

  if (!entry || now > entry.reset) {
    rateLimit.set(ip, { count: 1, reset: now + WINDOW_MS })
    return true
  }

  if (entry.count >= LIMIT) return false

  entry.count++
  return true
}

const schema = z.object({
  from_name: z.string().min(1).max(100),
  reply_to: z.email().max(200),
  budget: z.string().max(200).optional(),
  message: z.string().min(10).max(5000),
})

const transporter = nodemailer.createTransport({
  host: 'smtp.improvmx.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.IMPROVMX_SMTP_USER,
    pass: process.env.IMPROVMX_SMTP_PASSWORD,
  },
})

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Trop de tentatives. Réessayez dans 15 minutes.' },
      { status: 429 }
    )
  }

  const body = await req.json()
  const result = schema.safeParse(body)

  if (!result.success) {
    return NextResponse.json({ error: 'Données invalides' }, { status: 400 })
  }

  const { from_name, reply_to, budget, message } = result.data

  try {
    await transporter.sendMail({
      from: `"Le Comptoir du Code" <contact@lecomptoirducode.fr>`,
      to: 'contact@lecomptoirducode.fr',
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
