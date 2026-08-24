import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { z } from 'zod'
import { clientIp, sameOrigin } from '@/lib/http'
import { createRateLimiter } from '@/lib/rate-limit'

// Rate limiting : 3 envois max par IP sur 60 minutes.
// Le questionnaire est long : on ne s'attend pas à des envois répétés.
const rateLimit = createRateLimiter(3, 60 * 60 * 1000)

/* Les réponses arrivent en paires libellé/valeur : le formulaire est la
   seule source de vérité sur l'ordre et l'intitulé des questions, l'API
   se contente de les mettre en forme. */
const schema = z.object({
  // Pas de retour à la ligne : cette valeur finit dans l'en-tête Subject.
  company: z.string().min(1).max(200).regex(/^[^\r\n]+$/),
  contact_email: z.email().max(200),
  answers: z
    .array(
      z.object({
        section: z.string().max(120),
        label: z.string().max(300),
        value: z.string().max(3000),
      })
    )
    .min(1)
    .max(60),
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
      { error: 'Trop de tentatives. Réessayez plus tard.' },
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

  const { company, contact_email, answers } = result.data

  let currentSection = ''
  const lines: string[] = []
  for (const a of answers) {
    if (a.section !== currentSection) {
      currentSection = a.section
      lines.push('', `── ${currentSection} ──`, '')
    }
    lines.push(`${a.label}`, `   ${a.value || '—'}`, '')
  }

  try {
    await transporter.sendMail({
      from: `"L'Échoppe du Code" <contact@lechoppeducode.com>`,
      to: 'contact@lechoppeducode.com',
      replyTo: contact_email,
      subject: `Questionnaire de cadrage — ${company}`,
      text: `Questionnaire de pré-qualification\n${company} — ${contact_email}\n${lines.join('\n')}`,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Erreur envoi' }, { status: 500 })
  }
}
