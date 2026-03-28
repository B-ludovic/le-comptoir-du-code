'use client'

import { useRef } from 'react'
import type { DevisData } from './DevisForm'
import styles from './Devis.module.css'

type Props = { data: DevisData }

function fmt(val: string): string {
  const n = parseFloat(val)
  if (!val || isNaN(n)) return '—'
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n)
}

function calcTotals(data: DevisData) {
  const s1 = parseFloat(data.service_1_amount) || 0
  const s2 = parseFloat(data.service_2_amount) || 0
  const ht = s1 + s2
  const acompte = ht * 0.3
  return {
    total_ht: fmt(String(ht)),
    acompte_amount: fmt(String(acompte)),
    total_ttc: fmt(String(ht)),
  }
}

export default function DevisPreview({ data }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const totals = calcTotals(data)

  const hasService2 = data.service_2_name.trim() !== ''

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@400;500&display=swap');
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
  .totaux-line.total { border-top: 1px solid rgba(184,148,112,0.4); border-bottom: none; margin-top: 1mm; padding-top: 2mm; font-size: 11px; font-weight: 500; color: #1A1714; }
  .totaux-line.total .amount { font-family: 'Cormorant Garamond', serif; font-size: 16px; font-weight: 600; color: #C8A478; }
  .totaux-line.acompte { color: #8A5A2A; }
  .conditions { display: flex; gap: 5mm; margin-bottom: 4mm; }
  .condition-block { flex: 1; background: #F5EFE6; border: 1px solid rgba(184,148,112,0.2); border-radius: 2px; padding: 2.5mm 3.5mm; }
  .condition-title { font-size: 7px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; color: #8A5A2A; margin-bottom: 2mm; }
  .condition-text { font-size: 8px; color: #6A6460; line-height: 1.7; }
  .signature-section { display: flex; gap: 5mm; margin-bottom: 5mm; }
  .signature-block { flex: 1; border: 1px solid rgba(184,148,112,0.25); border-radius: 2px; padding: 2.5mm 3.5mm; min-height: 22mm; }
  .signature-title { font-size: 7px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; color: #8A7D72; margin-bottom: 2mm; padding-bottom: 2mm; border-bottom: 1px solid rgba(184,148,112,0.15); }
  .signature-mention { font-size: 7.5px; color: #8A7D72; font-style: italic; margin-bottom: 6mm; }
  .signature-line { border-bottom: 1px solid rgba(184,148,112,0.3); margin-top: 8mm; }
  .signature-label { font-size: 7px; color: #8A7D72; margin-top: 1mm; text-align: center; }
  .mentions { padding: 3mm 0; border-top: 1px solid rgba(184,148,112,0.15); margin-bottom: 4mm; }
  .mentions p { font-size: 7px; color: #8A7D72; line-height: 1.6; }
  .footer { border-top: 1px solid rgba(184,148,112,0.15); padding-top: 3mm; display: flex; justify-content: space-between; align-items: center; }
  .footer-left { font-size: 7px; color: #8A7D72; letter-spacing: 1px; }
  .footer-right { font-size: 7px; color: #8A7D72; text-align: right; }
  .footer-site { color: #C8A478; font-size: 7px; }
</style>
</head>
<body>
  <div class="header">
    <div class="logo">
      <div class="logo-mark">C/C</div>
      <div>
        <span class="logo-label-top">LE COMPTOIR</span>
        <span class="logo-label-bottom">du Code</span>
      </div>
    </div>
    <div class="doc-meta">
      <span class="doc-type">Devis</span>
      <span class="doc-number">N° ${data.devis_number || '—'}</span>
      <span class="doc-date">Émis le ${data.devis_date || '—'} — Valable 30 jours</span>
    </div>
  </div>

  <div class="parties">
    <div class="party">
      <div class="party-label">Prestataire</div>
      <span class="party-name">Le Comptoir du Code</span>
      <span class="party-detail">Ludovic BATAILLE</span>
      <span class="party-detail">Auto-entrepreneur${data.siret ? ` — SIRET : ${data.siret}` : ''}</span>
      <span class="party-detail">contact@lecomptoirducode.fr</span>
      <span class="party-detail">lecomptoirducode.fr</span>
    </div>
    <div class="party">
      <div class="party-label">Client</div>
      <span class="party-name">${data.client_company || '—'}</span>
      <span class="party-detail">${data.client_name || ''}</span>
      <span class="party-detail">${data.client_email || ''}</span>
      <span class="party-detail">${data.client_address || ''}</span>
    </div>
  </div>

  <div class="objet">
    <div class="objet-label">Objet de la prestation</div>
    <div class="objet-value">${data.project_description || '—'}</div>
  </div>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th style="width:45%">Prestation</th>
          <th style="width:25%">Détail</th>
          <th style="width:15%">Délai</th>
          <th style="width:15%">Montant</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="desc">
            ${data.service_1_name || '—'}
            <span class="desc-sub">${data.service_1_description || ''}</span>
          </td>
          <td>${data.service_1_type || '—'}</td>
          <td class="right">${data.service_1_delay || '—'}</td>
          <td class="right">${fmt(data.service_1_amount)}</td>
        </tr>
        ${hasService2 ? `
        <tr>
          <td class="desc">
            ${data.service_2_name}
            <span class="desc-sub">${data.service_2_description || ''}</span>
          </td>
          <td>${data.service_2_type || '—'}</td>
          <td class="right">${data.service_2_delay || '—'}</td>
          <td class="right">${fmt(data.service_2_amount)}</td>
        </tr>` : ''}
        ${data.maintenance_option === 'offered' ? `
        <tr>
          <td class="desc">
            Maintenance &amp; sécurité — Année 1 offerte
            <span class="desc-sub">Dès la livraison : mises à jour de sécurité + correction de bugs bloquants. Puis engagement 1 an à ${data.maintenance_rate}.</span>
          </td>
          <td>Offert</td>
          <td class="right">12 mois</td>
          <td class="right">Offert</td>
        </tr>` : ''}
        ${data.maintenance_option === 'paid' ? `
        <tr>
          <td class="desc">
            Maintenance &amp; sécurité — Engagement 1 an
            <span class="desc-sub">Dès la livraison : mises à jour de sécurité + correction de bugs bloquants. Engagement 1 an, facturation mensuelle.</span>
          </td>
          <td>Mensuel</td>
          <td class="right">12 mois</td>
          <td class="right">${data.maintenance_rate}</td>
        </tr>` : ''}
        <tr>
          <td class="desc">
            Mise en ligne &amp; déploiement
            <span class="desc-sub">Configuration Vercel, nom de domaine, SSL</span>
          </td>
          <td>Inclus</td>
          <td class="right">—</td>
          <td class="right">—</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="totaux">
    <div class="totaux-block">
      <div class="totaux-line"><span>Sous-total HT</span><span>${totals.total_ht}</span></div>
      <div class="totaux-line"><span>TVA</span><span>Non applicable</span></div>
      <div class="totaux-line acompte"><span>Acompte à la signature (30 %)</span><span>${totals.acompte_amount}</span></div>
      <div class="totaux-line total"><span>Total TTC</span><span class="amount">${totals.total_ttc}</span></div>
    </div>
  </div>

  <div class="conditions">
    <div class="condition-block">
      <div class="condition-title">Modalités de paiement</div>
      <div class="condition-text">
        Acompte de 30 % (${totals.acompte_amount}) à la signature — solde à la livraison.<br>
        Règlement par virement bancaire uniquement.<br>
        Délai de paiement : 15 jours à compter de la facture.
      </div>
    </div>
    <div class="condition-block">
      <div class="condition-title">Démarrage du projet</div>
      <div class="condition-text">
        Le projet démarre à réception du devis signé<br>
        portant la mention "Bon pour accord" et du<br>
        paiement de l'acompte de 30 %.
      </div>
    </div>
    <div class="condition-block">
      <div class="condition-title">Validité</div>
      <div class="condition-text">
        Ce devis est valable 30 jours à compter<br>
        de sa date d'émission.<br>
        Passé ce délai, les tarifs peuvent être révisés.
      </div>
    </div>
  </div>

  <div class="signature-section">
    <div class="signature-block">
      <div class="signature-title">Signature du prestataire</div>
      <div class="signature-mention">Le Comptoir du Code — Ludovic BATAILLE</div>
      <div class="signature-line"></div>
      <div class="signature-label">Signature</div>
    </div>
    <div class="signature-block">
      <div class="signature-title">Bon pour accord — Signature du client</div>
      <div class="signature-mention">Précédée de la mention manuscrite "Bon pour accord"</div>
      <div class="signature-line"></div>
      <div class="signature-label">Date &amp; Signature</div>
    </div>
  </div>

  <div class="mentions">
    <p>TVA non applicable en vertu de l'article 293 B du CGI. — En cas de retard de paiement : pénalités égales à 3× le taux d'intérêt légal en vigueur + indemnité forfaitaire de recouvrement de 40 €. — Les droits de propriété intellectuelle sont transférés au client à réception du paiement intégral. — Les présentes conditions sont soumises au droit français. Tout litige sera soumis au tribunal compétent du siège social du prestataire.</p>
  </div>

  <div class="footer">
    <div class="footer-left">Le Comptoir du Code — Ludovic BATAILLE — Auto-entrepreneur</div>
    <div class="footer-right">
      <span class="footer-site">lecomptoirducode.fr</span><br>
      contact@lecomptoirducode.fr
    </div>
  </div>
</body>
</html>`

  function handlePrint() {
    const iframe = iframeRef.current
    if (!iframe?.contentWindow) return
    iframe.contentWindow.print()
  }

  return (
    <div className={styles.previewPanel}>
      <div className={styles.previewHeader}>
        <h2 className={styles.panelTitle}>Aperçu</h2>
        <button className={styles.printBtn} onClick={handlePrint}>
          Imprimer / PDF
        </button>
      </div>
      <div className={styles.iframeWrapper}>
        <iframe
          ref={iframeRef}
          srcDoc={html}
          className={styles.iframe}
          title="Aperçu du devis"
        />
      </div>
    </div>
  )
}
