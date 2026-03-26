# 🧰 Le Comptoir du Code

Portfolio freelance de développement web. Une page. Pas de framework CSS tiers, pas de template.
---

## ⚙️ Stack

- **Next.js 16** — App Router, Turbopack
- **TypeScript** — strict mode
- **CSS Modules** — zéro dépendance de style externe
- **ImprovMX + Nodemailer** — formulaire de contact via SMTP
- **Lucide React + React Icons** — icônes

---

## ✨ Fonctionnalités

- 🌍 Site bilingue FR / EN avec détection automatique de la langue (`accept-language`)
- 📐 6 sections : Méthode, Solutions, Réalisations, Le Codeur, Contact
- 📬 Formulaire de contact avec pré-sélection du budget et envoi SMTP
- 📄 Pages légales : Mentions Légales, Politique de Confidentialité, Gestion des Cookies, CGP de Services
- 🎨 Design system complet : variables CSS, typographie Cormorant Garamond + DM Sans, palette warm dark
- 📱 Responsive mobile

---

## 🚀 Installation

```bash
git clone git@github.com:B-ludovic/le-comptoir-du-code.git
cd le-comptoir-du-code
npm install
```

Créer un fichier `.env` à la racine :

```env
IMPROVMX_SMTP_USER=contact@lecomptoirducode.fr
IMPROVMX_SMTP_PASSWORD=votre_mot_de_passe_improvmx
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
├── [locale]/               # Routing i18n (fr / en)
│   ├── page.tsx            # Page principale
│   ├── mentions-legales/
│   ├── politique-de-confidentialite/
│   ├── gestion-des-cookies/
│   └── conditions-generales/
├── api/contact/route.ts    # Envoi email via ImprovMX
├── dictionaries/           # Traductions fr.json / en.json
└── styles/                 # Variables CSS + globals

components/
├── Header/
├── Footer/
├── Legal/
└── Sections/
    ├── Method/
    ├── Solutions/
    ├── Portfolio/
    ├── About/
    └── Contact/
```

---

## 🌐 Déploiement

Prévu sur [Vercel](https://vercel.com/). Les variables d'environnement sont à renseigner dans les settings du projet Vercel.

---

*✍🏽 Ludovic BATAILLE — [lecomptoirducode.fr](https://lecomptoirducode.fr)*
