'use client'

import { useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import type { DevisData } from './DevisForm'
import styles from './Devis.module.css'

type Props = { data: DevisData }

/* Le document est assemblé par concaténation de chaînes : toute valeur venant
   du formulaire doit passer par ici avant d'entrer dans le template. Les
   libellés du dictionnaire T en sont exemptés, eux contiennent des <br> voulus.

   Aujourd'hui l'état ne provient que de la saisie locale, donc le risque tient
   surtout au rendu — une raison sociale contenant « & » ou « < » casserait le
   PDF envoyé au client. Le jour où le devis sera prérempli depuis le
   questionnaire, ces mêmes valeurs viendront d'un tiers non authentifié. */
function esc(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function fmt(val: string, locale: 'fr' | 'en'): string {
  const n = parseFloat(val)
  if (!val || isNaN(n)) return '—'
  const lang = locale === 'en' ? 'en-GB' : 'fr-FR'
  return new Intl.NumberFormat(lang, { style: 'currency', currency: 'EUR' }).format(n)
}

const T = {
  fr: {
    docType: 'Proposition Commerciale',
    docNo: 'N°',
    issuedOn: (date: string) => `Émis le ${date} — Valable 30 jours`,
    provider: 'Prestataire',
    client: 'Client',
    projectScope: 'Objet de la prestation',
    thService: 'Prestation',
    thDescription: 'Détail',
    thTimeline: 'Délai',
    thAmount: 'Montant',
    maintOfferedName: 'Maintenance & sécurité — Année 1 offerte',
    maintOfferedDesc: (rate: string) => `Dès la livraison : mises à jour de sécurité + correction de bugs bloquants. Puis engagement 1 an à ${rate}.`,
    maintOfferedType: 'Offert',
    maintOfferedDelay: '12 mois',
    maintOfferedAmount: 'Offert',
    maintPaidName: 'Maintenance & sécurité — Engagement 1 an',
    maintPaidDesc: 'Dès la livraison : mises à jour de sécurité + correction de bugs bloquants. Engagement 1 an, facturation mensuelle.',
    maintPaidType: 'Mensuel',
    maintPaidDelay: '12 mois',
    deployName: 'Mise en ligne & déploiement',
    deployDesc: 'Configuration Vercel, nom de domaine, SSL',
    deployType: 'Inclus',
    infraName: 'Infrastructure & services tiers',
    infraDesc: 'Hébergement front-end, back-end, base de données — facturés directement au client par les prestataires (Vercel, Render, Supabase, etc.)',
    infraType: 'Client',
    standardHT: 'Tarif standard HT',
    mecenasDiscount: 'Mécénat de compétences (−50 %)',
    imputationLabel: 'Imputation cadrage (−50 %)',
    baseHT: 'Base HT',
    subtotal: 'Sous-total HT',
    tva: 'TVA (20 %)',
    total: 'Total TTC',
    deposit: 'Acompte à la signature (30 %)',
    paymentTitle: 'Modalités de paiement',
    paymentText: `Acompte de 30 % à la commande (facture d'acompte fournie).<br>Solde de 70 % à la mise en ligne.<br>Règlement par virement bancaire uniquement.<br>Délai de paiement : 15 jours à compter de la facture.`,
    startTitle: 'Démarrage du projet',
    startText: `Le projet démarre à réception du devis officiel<br>signé (émis par Jump Green) et du paiement<br>de l'acompte de 30 %.`,
    schedules: {
      dev: {
        rate: 0.3,
        label: 'Développement',
        imputationNote: '',
        terms: 'Conditions générales de vente et de prestation : www.lechoppeducode.com/fr/conditions-generales',
        deposit: 'Acompte à la signature (30 %)',
        paymentText: `Acompte de 30 % à la commande (facture d'acompte fournie).<br>Solde de 70 % à la mise en ligne.<br>Règlement par virement bancaire uniquement.<br>Délai de paiement : 15 jours à compter de la facture.`,
        startText: `Le projet démarre à réception du devis officiel<br>signé (émis par Jump Green) et du paiement<br>de l'acompte de 30 %.`,
      },
      cadrage_full: {
        rate: 1,
        label: 'Cadrage',
        imputationNote: "50 % du montant du cadrage s'imputent sur le prix d'un développement signé dans les trois mois suivant la remise du dossier (article 4 bis des conditions générales de prestation de services).",
        terms: 'Conditions générales de la prestation de cadrage : www.lechoppeducode.com/fr/conditions-cadrage',
        deposit: 'Règlement intégral à la commande',
        paymentText: `Règlement intégral à la commande.<br>Règlement par virement bancaire uniquement.<br>Aucune date d'atelier n'est réservée<br>avant réception du paiement.`,
        startText: `L'atelier est planifié à réception du devis<br>officiel signé (émis par Jump Green), du<br>paiement et du questionnaire complété.`,
      },
      cadrage_split: {
        rate: 0.5,
        label: 'Cadrage & Conception',
        imputationNote: "50 % du montant du cadrage s'imputent sur le prix d'un développement signé dans les trois mois suivant la remise du dossier (article 4 bis des conditions générales de prestation de services).",
        terms: 'Conditions générales de la prestation de cadrage : www.lechoppeducode.com/fr/conditions-cadrage',
        deposit: 'Acompte à la signature (50 %)',
        paymentText: `Acompte de 50 % à la commande (facture d'acompte fournie).<br>Solde de 50 % à la remise du dossier.<br>Règlement par virement bancaire uniquement.<br>Délai de paiement : 15 jours à compter de la facture.`,
        startText: `L'atelier est planifié à réception du devis<br>officiel signé (émis par Jump Green), de<br>l'acompte et du questionnaire complété.`,
      },
    },
    validityTitle: 'Validité',
    validityText: `Cette proposition est valable 30 jours<br>à compter de sa date d'émission.<br>Passé ce délai, les tarifs peuvent être révisés.`,
    disclaimerTitle: null,
    disclaimerText: `Cette proposition commerciale est émise à titre indicatif. En cas d'accord, un devis officiel sera établi et transmis par Jump Green, société de portage salarial (SIRET 97761078100014 — RCS de Bobigny). Les droits de propriété intellectuelle sont transférés au client à réception du paiement intégral. Les présentes conditions sont soumises au droit français.`,
    mecenaBadge: "L'Échoppe Solidaire — Mécénat de compétences LGBTQI+ & Associations",
    htmlLang: 'fr',
  },
  en: {
    docType: 'Commercial Proposal',
    docNo: 'No.',
    issuedOn: (date: string) => `Issued on ${date} — Valid for 30 days`,
    provider: 'Service Provider',
    client: 'Client',
    projectScope: 'Project scope',
    thService: 'Service',
    thDescription: 'Description',
    thTimeline: 'Timeline',
    thAmount: 'Amount',
    maintOfferedName: 'Maintenance & Security — Year 1 Included',
    maintOfferedDesc: (rate: string) => `From delivery: security updates + critical bug fixes. Then 1-year commitment at ${rate}.`,
    maintOfferedType: 'Included',
    maintOfferedDelay: '12 months',
    maintOfferedAmount: 'Included',
    maintPaidName: 'Maintenance & Security — 1-Year Commitment',
    maintPaidDesc: 'From delivery: security updates + critical bug fixes. 1-year commitment, monthly billing.',
    maintPaidType: 'Monthly',
    maintPaidDelay: '12 months',
    deployName: 'Deployment & Go-live',
    deployDesc: 'Vercel configuration, domain name, SSL',
    deployType: 'Included',
    infraName: 'Infrastructure & Third-party Services',
    infraDesc: 'Front-end, back-end, database hosting — billed directly to the client by service providers (Vercel, Render, Supabase, etc.)',
    infraType: 'Client',
    standardHT: 'Standard rate (excl. VAT)',
    mecenasDiscount: 'Skills sponsorship (−50%)',
    imputationLabel: 'Scoping set-off (−50%)',
    baseHT: 'Taxable base (excl. VAT)',
    subtotal: 'Subtotal (excl. VAT)',
    tva: 'VAT (20%)',
    total: 'Total (incl. VAT)',
    deposit: 'Deposit upon signing (30%)',
    paymentTitle: 'Payment Terms',
    paymentText: `30% deposit upon order (deposit invoice provided).<br>Balance of 70% upon go-live.<br>Bank transfer only.<br>Payment due within 15 days of invoice.`,
    startTitle: 'Project commencement',
    startText: `The project starts upon receipt of the signed<br>official quote (issued by Jump Green) and the<br>30% deposit payment.`,
    schedules: {
      dev: {
        rate: 0.3,
        label: 'Development',
        imputationNote: '',
        terms: 'General terms of sale and service: www.lechoppeducode.com/en/conditions-generales',
        deposit: 'Deposit upon signing (30%)',
        paymentText: `30% deposit upon order (deposit invoice provided).<br>Balance of 70% upon go-live.<br>Bank transfer only.<br>Payment due within 15 days of invoice.`,
        startText: `The project starts upon receipt of the signed<br>official quote (issued by Jump Green) and the<br>30% deposit payment.`,
      },
      cadrage_full: {
        rate: 1,
        label: 'Scoping',
        imputationNote: '50% of the scoping fee is set off against the price of development services signed within three months of the report being delivered (Article 4 bis of the general terms and conditions of service).',
        terms: 'General terms for scoping services: www.lechoppeducode.com/en/conditions-cadrage',
        deposit: 'Payment in full upon order',
        paymentText: `Payment in full upon order.<br>Bank transfer only.<br>No workshop date is reserved<br>before payment is received.`,
        startText: `The workshop is scheduled upon receipt of the<br>signed official quote (issued by Jump Green),<br>payment, and the completed questionnaire.`,
      },
      cadrage_split: {
        rate: 0.5,
        label: 'Scoping & Product Design',
        imputationNote: '50% of the scoping fee is set off against the price of development services signed within three months of the report being delivered (Article 4 bis of the general terms and conditions of service).',
        terms: 'General terms for scoping services: www.lechoppeducode.com/en/conditions-cadrage',
        deposit: 'Deposit upon signing (50%)',
        paymentText: `50% deposit upon order (deposit invoice provided).<br>Balance of 50% upon delivery of the report.<br>Bank transfer only.<br>Payment due within 15 days of invoice.`,
        startText: `The workshop is scheduled upon receipt of the<br>signed official quote (issued by Jump Green),<br>the deposit, and the completed questionnaire.`,
      },
    },
    validityTitle: 'Validity',
    validityText: `This proposal is valid for 30 days<br>from its issuance date.<br>After this period, rates may be revised.`,
    disclaimerTitle: 'Disclaimer',
    disclaimerText: `This proposal is provided for informational purposes. If agreed, an official quote will be issued and sent by Jump Green, a portage salarial company (SIRET 97761078100014 — RCS de Bobigny). Intellectual property rights are transferred to the client upon receipt of full payment. These terms are governed by French law.`,
    mecenaBadge: "L'Échoppe Solidaire — Skills Sponsorship LGBTQI+ & Associations",
    htmlLang: 'en',
  },
}

function calcTotals(data: DevisData) {
  const isAsso = data.client_type === 'association'
  const locale = data.devis_locale ?? 'fr'
  const prestation = data.prestation_type ?? 'dev'
  const fullHt = data.services.reduce((sum, s) => sum + (parseFloat(s.amount) || 0), 0)
  const ht = isAsso ? fullHt * 0.5 : fullHt
  const remise = isAsso ? fullHt * 0.5 : 0
  const imputation =
    prestation === 'dev'
      ? Math.min((parseFloat(data.cadrage_paid) || 0) * 0.5, ht)
      : 0
  const baseHt = ht - imputation
  const tva = baseHt * 0.20
  const ttc = baseHt + tva
  // Le taux d'acompte dépend du contrat : CGV développement ou CGP cadrage.
  const rate = T[locale].schedules[prestation].rate
  const acompte = ttc * rate
  return {
    full_ht: fmt(String(fullHt), locale),
    remise: fmt(String(remise), locale),
    total_ht: fmt(String(ht), locale),
    imputation: fmt(String(imputation), locale),
    base_ht: fmt(String(baseHt), locale),
    hasImputation: imputation > 0,
    tva_amount: fmt(String(tva), locale),
    acompte_amount: fmt(String(acompte), locale),
    total_ttc: fmt(String(ttc), locale),
    isAsso,
  }
}

export default function DevisPreview({ data }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const router = useRouter()
  const params = useParams()
  const totals = calcTotals(data)
  const locale = data.devis_locale ?? 'fr'
  const t = T[locale]
  const schedule = t.schedules[data.prestation_type ?? 'dev']

  const isAsso = data.client_type === 'association'

  const serviceRows = data.services
    .filter(s => s.name.trim() !== '')
    .map(s => {
      const priceCell = isAsso
        ? `<span class="price-original">${fmt(s.amount, locale)}</span><span class="price-asso">${fmt(String(parseFloat(s.amount) * 0.5), locale)}</span>`
        : fmt(s.amount, locale)
      return `
        <tr>
          <td class="desc">
            ${esc(s.name)}
            <span class="desc-sub">${esc(s.description || '')}</span>
          </td>
          <td>${esc(s.type || '—')}</td>
          <td class="right">${esc(s.delay || '—')}</td>
          <td class="right">${priceCell}</td>
        </tr>`
    })
    .join('')

  const html = `<!DOCTYPE html>
<html lang="${t.htmlLang}">
<head>
<meta charset="UTF-8">
<!-- Un document srcDoc ne voit pas les styles de sa page parente, mais il en
     partage l'origine : ce chemin absolu résout donc vers notre propre domaine
     et charge les mêmes polices auto-hébergées que le site. -->
<link rel="stylesheet" href="/fonts.css">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  @page { size: A4 portrait; margin: 0; }
  body {
    background: #FDFAF7; color: #1A1714;
    font-family: 'DM Sans', sans-serif; font-size: 9px; line-height: 1.5;
    width: 210mm; min-height: 297mm; padding: 10mm 12mm 8mm 12mm;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4mm; padding-bottom: 4mm; border-bottom: 1px solid rgba(184,148,112,0.3); }
  .logo { display: flex; align-items: center; gap: 8px; }
  .logo-mark { width: 38px; height: 38px; border: 1.5px solid #C8A478; border-radius: 2px; display: flex; align-items: center; justify-content: center; font-family: 'DM Sans', monospace; font-size: 14px; font-weight: 700; color: #C8A478; }
  .logo-label-top { font-family: 'Cormorant Garamond', serif; font-size: 7px; color: #8A7D72; letter-spacing: 3px; text-transform: uppercase; display: block; }
  .logo-label-bottom { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 600; color: #1A1714; display: block; line-height: 1; }
  .doc-meta { text-align: right; }
  .doc-type { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 600; color: #C8A478; display: block; letter-spacing: 1px; }
  .doc-number { font-size: 8px; color: #8A7D72; letter-spacing: 2px; text-transform: uppercase; display: block; margin-top: 2px; }
  .doc-date { font-size: 8px; color: #8A7D72; display: block; margin-top: 1px; }
  .parties { display: flex; justify-content: space-between; gap: 10mm; margin-bottom: 5mm; }
  .party { flex: 1; }
  .party-label { font-size: 7px; font-weight: 500; letter-spacing: 2.5px; text-transform: uppercase; color: #C8A478; margin-bottom: 2mm; padding-bottom: 2mm; border-bottom: 1px solid rgba(184,148,112,0.25); }
  .party-name { font-family: 'Cormorant Garamond', serif; font-size: 14px; font-weight: 600; color: #1A1714; display: block; margin-bottom: 1mm; }
  .party-detail { font-size: 8.5px; color: #6A6460; display: block; line-height: 1.7; }
  .objet { background: #F5EFE6; border: 1px solid rgba(184,148,112,0.25); border-radius: 2px; padding: 3mm 4mm; margin-bottom: 4mm; }
  .objet-label { font-size: 7px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; color: #8A7D72; margin-bottom: 1mm; }
  .objet-value { font-family: 'Cormorant Garamond', serif; font-size: 13px; font-style: italic; color: #1A1714; }
  .table-wrap { margin-bottom: 4mm; }
  table { width: 100%; border-collapse: collapse; }
  thead tr { background: #F0E8DC; border-bottom: 1px solid rgba(184,148,112,0.4); }
  thead th { font-size: 7px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; color: #8A5A2A; padding: 2mm 3mm; text-align: left; }
  thead th:last-child, thead th:nth-child(3), thead th:nth-child(4) { text-align: right; }
  tbody tr { border-bottom: 1px solid rgba(26,23,20,0.06); }
  tbody tr:last-child { border-bottom: none; }
  tbody td { padding: 2mm 3mm; font-size: 8.5px; color: #5A5350; vertical-align: top; }
  td.desc { color: #1A1714; font-size: 8.5px; }
  td.desc .desc-sub { font-size: 7.5px; color: #8A7D72; margin-top: 0.5mm; display: block; }
  td.right { text-align: right; }
  .totaux { display: flex; justify-content: flex-end; margin-bottom: 4mm; }
  .totaux-block { width: 60mm; }
  .totaux-line { display: flex; justify-content: space-between; padding: 1.5mm 0; font-size: 8.5px; color: #6A6460; border-bottom: 1px solid rgba(26,23,20,0.06); }
  .totaux-line.tva { border-bottom: none; }
  .totaux-line.total { border-top: 1px solid rgba(184,148,112,0.4); border-bottom: none; margin-top: 1mm; padding-top: 2mm; font-size: 11px; font-weight: 500; color: #1A1714; }
  .totaux-line.total .amount { font-family: 'Cormorant Garamond', serif; font-size: 16px; font-weight: 600; color: #C8A478; }
  .totaux-line.acompte { color: #8A5A2A; }
  .conditions { display: flex; gap: 5mm; margin-bottom: 4mm; }
  .condition-block { flex: 1; background: #F5EFE6; border: 1px solid rgba(184,148,112,0.2); border-radius: 2px; padding: 2.5mm 3.5mm; }
  .condition-title { font-size: 7px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; color: #8A5A2A; margin-bottom: 2mm; }
  .condition-text { font-size: 8px; color: #6A6460; line-height: 1.7; }
  .mentions { padding: 3mm 0; border-top: 1px solid rgba(184,148,112,0.15); margin-bottom: 4mm; }
  .mentions-title { font-size: 7px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; color: #8A7D72; margin-bottom: 1.5mm; }
  .mentions p { font-size: 7px; color: #8A7D72; line-height: 1.6; }
  .mentions p.terms-ref { margin-top: 1.5mm; color: #8A5A2A; }
  .footer { border-top: 1px solid rgba(184,148,112,0.15); padding-top: 3mm; text-align: center; }
  .footer-left { font-size: 7px; color: #8A7D72; letter-spacing: 0.5px; display: block; margin-bottom: 1mm; }
  .footer-right { font-size: 7px; color: #8A7D72; }
  .footer-site { color: #C8A478; font-size: 7px; }
  .price-original { text-decoration: line-through; opacity: 0.4; margin-right: 4px; }
  .price-asso { color: #C8A478; }
  .totaux-line.remise { color: #8A5A2A; }
  .mecena-badge { display: inline-block; font-size: 7px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; color: #C8A478; border: 1px solid rgba(200,164,120,0.4); border-radius: 2px; padding: 0.5mm 2mm; margin-bottom: 3mm; }
</style>
</head>
<body>
  <div class="header">
    <div class="logo">
      <div class="logo-mark">E/C</div>
      <div>
        <span class="logo-label-top">L'ECHOPPE</span>
        <span class="logo-label-bottom">du Code</span>
      </div>
    </div>
    <div class="doc-meta">
      <span class="doc-type">${t.docType} — ${schedule.label}</span>
      <span class="doc-number">${t.docNo} ${esc(data.devis_number || '—')}</span>
      <span class="doc-date">${t.issuedOn(esc(data.devis_date || '—'))}</span>
    </div>
  </div>

  <div class="parties">
    <div class="party">
      <div class="party-label">${t.provider}</div>
      <span class="party-name">L'Échoppe du Code</span>
      <span class="party-detail">Ludovic BATAILLE (Entrepreneur-salarié)</span>
      <span class="party-detail">Hébergé par : Jump Green</span>
      <span class="party-detail">7 Place de l'Hôtel de Ville, 93600 Aulnay-sous-Bois</span>
      <span class="party-detail">SIRET : 97761078100014</span>
      <span class="party-detail">N° TVA : FR10977610781</span>
      <span class="party-detail">contact@lechoppeducode.com</span>
    </div>
    <div class="party">
      <div class="party-label">${t.client}</div>
      <span class="party-name">${esc(data.client_company || '—')}</span>
      <span class="party-detail">${esc(data.client_name || '')}</span>
      <span class="party-detail">${esc(data.client_email || '')}</span>
      <span class="party-detail">${esc(data.client_address || '')}</span>
    </div>
  </div>

  <div class="objet">
    <div class="objet-label">${t.projectScope}</div>
    <div class="objet-value">${esc(data.project_description || '—')}</div>
  </div>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th style="width:45%">${t.thService}</th>
          <th style="width:25%">${t.thDescription}</th>
          <th style="width:15%">${t.thTimeline}</th>
          <th style="width:15%">${t.thAmount}</th>
        </tr>
      </thead>
      <tbody>
        ${serviceRows}
        ${data.maintenance_option === 'offered' ? `
        <tr>
          <td class="desc">
            ${t.maintOfferedName}
            <span class="desc-sub">${t.maintOfferedDesc(esc(data.maintenance_rate))}</span>
          </td>
          <td>${t.maintOfferedType}</td>
          <td class="right">${t.maintOfferedDelay}</td>
          <td class="right">${t.maintOfferedAmount}</td>
        </tr>` : ''}
        ${data.maintenance_option === 'paid' ? `
        <tr>
          <td class="desc">
            ${t.maintPaidName}
            <span class="desc-sub">${t.maintPaidDesc}</span>
          </td>
          <td>${t.maintPaidType}</td>
          <td class="right">${t.maintPaidDelay}</td>
          <td class="right">${esc(data.maintenance_rate)}</td>
        </tr>` : ''}
        <tr>
          <td class="desc">
            ${t.deployName}
            <span class="desc-sub">${t.deployDesc}</span>
          </td>
          <td>${t.deployType}</td>
          <td class="right">—</td>
          <td class="right">—</td>
        </tr>
        <tr>
          <td class="desc">
            ${t.infraName}
            <span class="desc-sub">${t.infraDesc}</span>
          </td>
          <td>${t.infraType}</td>
          <td class="right">—</td>
          <td class="right">${esc(data.infra_rate || '~50–100 € HT/mois')}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="totaux">
    <div class="totaux-block">
      ${totals.isAsso ? `<div class="totaux-line"><span>${t.standardHT}</span><span>${totals.full_ht}</span></div>` : ''}
      ${totals.isAsso ? `<div class="totaux-line remise"><span>${t.mecenasDiscount}</span><span>−${totals.remise}</span></div>` : ''}
      <div class="totaux-line"><span>${t.subtotal}</span><span>${totals.total_ht}</span></div>
      ${totals.hasImputation ? `<div class="totaux-line remise"><span>${t.imputationLabel}</span><span>−${totals.imputation}</span></div>` : ''}
      ${totals.hasImputation ? `<div class="totaux-line"><span>${t.baseHT}</span><span>${totals.base_ht}</span></div>` : ''}
      <div class="totaux-line tva"><span>${t.tva}</span><span>${totals.tva_amount}</span></div>
      <div class="totaux-line total"><span>${t.total}</span><span class="amount">${totals.total_ttc}</span></div>
      <div class="totaux-line acompte"><span>${schedule.deposit}</span><span>${totals.acompte_amount}</span></div>
    </div>
  </div>

  <div class="conditions">
    <div class="condition-block">
      <div class="condition-title">${t.paymentTitle}</div>
      <div class="condition-text">${schedule.paymentText}</div>
    </div>
    <div class="condition-block">
      <div class="condition-title">${t.startTitle}</div>
      <div class="condition-text">${schedule.startText}</div>
    </div>
    <div class="condition-block">
      <div class="condition-title">${t.validityTitle}</div>
      <div class="condition-text">${t.validityText}</div>
    </div>
  </div>

  <div class="mentions">
    ${totals.isAsso ? `<span class="mecena-badge">${t.mecenaBadge}</span>` : ''}
    ${t.disclaimerTitle ? `<div class="mentions-title">${t.disclaimerTitle}</div>` : ''}
    <p>${t.disclaimerText}</p>
    ${schedule.imputationNote ? `<p class="terms-ref">${schedule.imputationNote}</p>` : ''}
    <p class="terms-ref">${schedule.terms}</p>
  </div>

  <div class="footer">
    <span class="footer-left">L'Échoppe du Code — Hébergé par Jump Green au capital de 18 501 € — SIRET 97761078100014 — RCS de Bobigny — TVA FR10977610781</span>
    <div class="footer-right">
      <span class="footer-site">lechoppeducode.com</span> — contact@lechoppeducode.com
    </div>
  </div>
</body>
</html>`

  function handlePrint() {
    const iframe = iframeRef.current
    if (!iframe?.contentWindow) return
    iframe.contentWindow.print()
  }

  async function handleLogout() {
    await fetch('/api/devis-logout', { method: 'POST' })
    const uiLocale = params.locale === 'en' ? 'en' : 'fr'
    router.push(`/${uiLocale}/devis/login`)
    router.refresh()
  }

  return (
    <div className={styles.previewPanel}>
      <div className={styles.previewHeader}>
        <h2 className={styles.panelTitle}>Aperçu</h2>
        <div className={styles.previewActions}>
          <button type="button" className={styles.logoutBtn} onClick={handleLogout}>
            Quitter
          </button>
          <button type="button" className={styles.printBtn} onClick={handlePrint}>
            Imprimer / PDF
          </button>
        </div>
      </div>
      <div className={styles.iframeWrapper}>
        {/* Sans allow-scripts, un script qui se glisserait dans le document ne
            s'exécute pas — ce qui vaut plus que l'échappement lui-même, car
            cette garantie ne dépend d'aucune interpolation oubliée.
            allow-same-origin permet au parent d'atteindre contentWindow, et
            allow-modals d'ouvrir la boîte d'impression. Vérifié : print()
            fonctionne et la feuille de polices se charge. */}
        <iframe
          ref={iframeRef}
          srcDoc={html}
          sandbox="allow-same-origin allow-modals"
          className={styles.iframe}
          title="Aperçu de la proposition commerciale"
        />
      </div>
    </div>
  )
}
