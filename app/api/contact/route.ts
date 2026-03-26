import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { z } from 'zod'

const schema = z.object({
  from_name: z.string().min(1).max(100),
  reply_to: z.string().email().max(200),
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
