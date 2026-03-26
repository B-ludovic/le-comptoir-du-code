import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

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
  const { from_name, reply_to, budget, message } = await req.json()

  if (!from_name || !reply_to || !message) {
    return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
  }

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
