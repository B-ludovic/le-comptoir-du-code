# 🛖 L'Échoppe du Code

Portfolio freelance de développement web. Bilingue FR/EN, sans framework CSS tiers, sans template.

---

## ⚙️ Stack

- **Next.js 16.2.3** — App Router, Turbopack
- **TypeScript** — strict mode
- **CSS Modules** — zéro dépendance de style externe
- **next-mdx-remote + remark-gfm** — blog MDX
- **gray-matter** — parsing des frontmatters MDX
- **iCloud SMTP + Nodemailer** — formulaire de contact via SMTP
- **Lucide React + React Icons** — icônes

---

## ✨ Fonctionnalités

- Site bilingue FR / EN avec détection automatique de la langue (`accept-language`)
- 7 sections : Méthode, Solutions, Réalisations, Le Codeur, Contact
- Carousel multi-images avec lightbox modale sur chaque projet du portfolio
- Blog MDX ("Le Carnet") : articles en FR et EN, slugs bilingues localisés, tables GFM, SEO par article
- Formulaire de contact avec pré-sélection du budget et envoi SMTP
- Pages légales : Mentions Légales, Politique de Confidentialité, Gestion des Cookies, CGV
- Générateur de devis PDF (accès protégé par mot de passe) — option tarification associative −50 %
- L'Échoppe Solidaire : page dédiée aux associations LGBTQI+, tarification mécénat de compétences, FAQ accordéon natif
- Design system complet : variables CSS, typographie Cormorant Garamond + DM Sans, palette warm dark
- Schema.org JSON-LD (ProfessionalService), sitemap dynamique, llms.txt
- Responsive mobile

---

## 🚀 Installation

```bash
git clone git@github.com:B-ludovic/le-comptoir-du-code.git
cd le-comptoir-du-code
npm install
```

Créer un fichier `.env` à la racine :

```env
ICLOUD_SMTP_USER=votre_apple_id@icloud.com
ICLOUD_SMTP_PASSWORD=votre_mot_de_passe_application_icloud
DEVIS_PASSWORD=votre_mot_de_passe_devis
DEVIS_TOKEN=votre_token_devis
```

Lancer le serveur de développement :

```bash
npm run dev
```

Le site tourne sur [http://localhost:3000](http://localhost:3000).

---

## 🗂️ Structure

```
app/
├── [locale]/
│   ├── page.tsx                        # Page principale
│   ├── layout.tsx                      # Métadonnées, Schema.org, sitemap
│   ├── blog/
│   │   ├── page.tsx                    # Listing des articles
│   │   └── [slug]/page.tsx             # Article MDX (slugs bilingues)
│   ├── echoppe-solidaire/              # Tarification associative LGBTQI+
│   ├── devis/                          # Générateur de devis (protégé)
│   ├── mentions-legales/
│   ├── politique-de-confidentialite/
│   ├── gestion-des-cookies/
│   └── conditions-generales/
├── api/
│   ├── contact/route.ts                # Envoi email via iCloud SMTP
│   └── devis-auth/route.ts
├── dictionaries/                       # Traductions fr.json / en.json
├── sitemap.ts                          # Sitemap dynamique (home + blog + légales + solidaire)
└── styles/                             # Variables CSS + globals

components/
├── Header/                             # Médaillon animé → L'Échoppe Solidaire
├── Footer/
├── Legal/
├── ScrollToHash/                       # Scroll vers ancre depuis pages externes
├── Devis/                              # Générateur de devis PDF
└── Sections/
    ├── Method/
    ├── Solutions/
    ├── Portfolio/
    │   ├── Portfolio.tsx
    │   ├── ProjectCarousel.tsx         # Carousel + lightbox modale
    │   └── ProjectCarousel.module.css
    ├── About/
    └── Contact/

content/
└── blog/
    ├── fr/                             # Articles MDX en français (slug FR)
    └── en/                             # Articles MDX en anglais (slug EN localisé)

lib/
└── blog.ts                             # Lecture et parsing des articles MDX

public/
├── images/                             # Captures d'écran projets
├── robots.txt
└── llms.txt                            # Index pour crawlers IA
```

---

## 🌐 Déploiement

Déployé sur [Vercel](https://vercel.com/) — [lechoppeducode.com](https://lechoppeducode.com).
Les variables d'environnement sont à renseigner dans les settings du projet Vercel.

---

*Ludovic BATAILLE ❤️ — [lechoppeducode.com](https://lechoppeducode.com)*
