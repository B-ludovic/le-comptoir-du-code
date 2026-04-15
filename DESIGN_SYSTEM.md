# Design System — L'Echoppe du Code

> Charte graphique complète. Référence unique pour toute décision visuelle sur le site, le blog, et les documents PDF.

---

## 1. Philosophie

**Warm dark artisanal.** L'esthétique d'un atelier de nuit : fond brun-noir, lumière cuivrée, matières sobres. Zéro dépendance CSS externe, zéro template, zéro arrondi agressif. Chaque pixel est intentionnel.

Trois règles non négociables :
- `border-radius: 2px` partout — jamais rond, jamais carré
- Le cuivre/ambre est la seule couleur d'accent — tout le reste est neutre
- Pas de couleurs vives, pas d'ombres portées agressives

---

## 2. Couleurs

### Palette principale

| Rôle | Variable CSS | Hex | Usage |
|------|-------------|-----|-------|
| Fond principal | `--bg-main` | `#1A1714` | Background body, pages |
| Fond carte | `--bg-card` | `#242019` | Cards, sections encadrées |
| Fond carte hover | `--bg-card-hover` | `#2A251E` | État hover des cards |
| Lueur de fond | `--bg-glow` | `rgba(200, 120, 40, 0.08)` | Gradient radial haut-droite |
| Texte principal | `--text-main` | `#F0EBE3` | Corps de texte, titres |
| Texte secondaire | `--text-muted` | `#ADA49C` | Labels, nav links, meta |
| Accent principal | `--accent-primary` | `#E8C4A0` | CTA, liens actifs, icônes accent |
| Accent hover | `--accent-hover` | `#C9A882` | État hover des éléments accent |

### Bordures

| Variable | Valeur | Usage |
|----------|--------|-------|
| `--border-subtle` | `1px solid rgba(232, 196, 160, 0.1)` | Séparateurs, cards, header scrollé |
| `--border-active` | `1px solid var(--accent-primary)` | Éléments actifs, focus |

### Couleurs utilitaires (hors variables)

| Usage | Valeur |
|-------|--------|
| Header/Footer scrollé (bg) | `rgba(26, 23, 20, 0.95)` |
| Overlay menu mobile | `rgba(26, 23, 20, 0.4)` |
| Suppression / erreur | `rgba(240, 100, 100, 0.6)` |
| Logo mark border | `rgba(232, 196, 160, 0.2)` |

---

## 3. Typographie

### Polices

| Rôle | Famille | Variable | Graisses |
|------|---------|----------|---------|
| Titres & display | Cormorant Garamond | `--font-heading` | 400, 600, 400 italic |
| Corps & UI | DM Sans | `--font-body` | 400, 500 |
| Monospace (logo mark) | JetBrains Mono | — | 700 |

### Échelle typographique

| Élément | Taille | Graisse | Espacement | Transform |
|---------|--------|---------|------------|-----------|
| Section title (h2) | 3.5–4.5rem | 600 | — | — |
| Eyebrow (label) | 0.7rem | 500 | `letter-spacing: 4px` | uppercase |
| Logo top | 0.68rem | 400 | `letter-spacing: 3.5px` | uppercase |
| Logo bottom | 1.5rem | 600 | `letter-spacing: 0.5px` | — |
| Nav links | 0.85rem | 500 | `letter-spacing: 1.5px` | uppercase |
| Body | 1rem | 400 | — | — |
| Small / meta | 0.7–0.85rem | 400–500 | variable | — |

---

## 4. Espacements & Layout

| Variable | Valeur desktop | Valeur mobile (≤768px) | Valeur small (≤480px) |
|----------|---------------|----------------------|----------------------|
| `--section-padding` | `8rem 2rem` | `5rem 1.25rem` | `4rem 1rem` |
| `--container-max` | `1200px` | — | — |
| `--card-radius` | `2px` | `2px` | `2px` |
| `.container` padding | `0 2rem` | `0 1.25rem` | `0 1rem` |

Sections : `min-height: 100dvh`, `scroll-margin-top: 100px`

---

## 5. Effets visuels

### Fond de page (globals.css)

```css
/* Lueur ambre radiale — haut droite */
body::before {
  background: radial-gradient(ellipse 80% 50% at 80% 0%, var(--bg-glow) 0%, transparent 70%);
  position: fixed; inset: 0; z-index: 0; pointer-events: none;
}

/* Texture noise SVG — overlay global */
body::after {
  background-image: url("data:image/svg+xml,...fractalNoise...");
  background-size: 180px 180px;
  opacity: 0.025;
  position: fixed; inset: 0; z-index: 0; pointer-events: none;
}
```

### Glassmorphism

- Header scrollé + Footer : `backdrop-filter: blur(8px)` + `background: rgba(26, 23, 20, 0.95)`
- Overlay menu mobile : `backdrop-filter: blur(4px)` + `background: rgba(26, 23, 20, 0.4)`

---

## 6. Animations

### Border glow tournant (logo mark & médaillon)

```css
@property --glow-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

/* conic-gradient arc lumineux qui tourne en 4s */
background: conic-gradient(
  from var(--glow-angle),
  transparent 0deg, transparent 60deg,
  rgba(232, 196, 160, 0.9) 90deg,
  transparent 120deg, transparent 360deg
);
animation: borderGlow 4s linear infinite;

@keyframes borderGlow {
  to { --glow-angle: 360deg; }
}
```

Technique mask : `mask-composite: exclude` pour ne garder que le contour.

### Vibration médaillon (mobile uniquement)

```css
@keyframes medallionVibrate {
  0%, 88%, 100% { transform: translateX(0) rotate(0deg); }
  89%  { transform: translateX(-3px) rotate(-3deg); }
  90%  { transform: translateX(3px)  rotate(3deg); }
  91%  { transform: translateX(-2px) rotate(-2deg); }
  92%  { transform: translateX(2px)  rotate(2deg); }
  93%  { transform: translateX(0)    rotate(0deg); }
}
/* 3s ease-in-out infinite, délai 2s */
```

### Transitions standard

| Variable | Valeur |
|----------|--------|
| `--transition-base` | `0.3s ease` |
| Nav underline | `width 0.3s ease` |
| Accordion FAQ | `grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1)` |
| Fade-in contenu accordion | `opacity 0.3s ease 0.1s` |

---

## 7. Composants récurrents

### Eyebrow (label de section)

```
font-size: 0.7rem | font-weight: 500 | letter-spacing: 4px
text-transform: uppercase | color: --accent-primary
```

### Bouton CTA principal

```
background: transparent | border: 1px solid --accent-primary
color: --accent-primary | border-radius: 2px
hover → background: --accent-primary | color: --bg-main
transition: 0.3s ease
```

### Cards

```
background: rgba(255, 255, 255, 0.02)
border: 1px solid rgba(232, 196, 160, 0.05)
border-radius: 2px
```

### Nav links

```
font-size: 0.85rem | font-weight: 500 | letter-spacing: 1.5px
text-transform: uppercase | color: --text-muted
hover → color: --accent-primary + underline animé (width 0 → 100%)
```

### Tooltip

```
background: rgba(26, 23, 20, 0.95) | border: --border-subtle
font-size: 0.65rem | letter-spacing: 1.5px | uppercase
border-radius: 2px | opacity 0 → 1 au hover (0.2s ease)
```

---

## 8. Palette PDF (Devis)

| Rôle | Hex |
|------|-----|
| Fond document | `#FDFAF7` (crème chaud) |
| Texte principal | `#1A1714` |
| Accent cuivre | `#C8A478` |
| Texte secondaire | `#8A7D72` |
| Texte corps tableau | `#5A5350` |
| Texte muted | `#6A6460` |
| Fond table header | `#F0E8DC` |
| Fond blocs conditions | `#F5EFE6` |
| Accent texte brun | `#8A5A2A` |

Polices PDF : Cormorant Garamond + DM Sans (même stack que le site, chargées via Google Fonts dans l'iframe).

---

## 9. Identité Blog

### Couvertures d'articles

- Style illustration / dessin (encre et aquarelle sur papier crème)
- Palette : fond crème `#FDFAF7`, accents cuivre `#C8A478`, détails charbon `#1A1714`
- **Tampon rouge "REALITY CHECK"** — bas droite, taille discrète, bold condensed uppercase
- Format : 16:9

### Prompt type pour génération d'image

```
Editorial illustration, ink and watercolor style on warm cream paper texture.
[Sujet de l'article]. Warm amber and charcoal color palette, aged paper feel,
subtle grain. Small discreet red rubber stamp in the bottom-right corner
reading "REALITY CHECK" in bold condensed uppercase. 16:9 composition.
```

---

## 10. Breakpoints

| Nom | Valeur | Usage |
|-----|--------|-------|
| Mobile | `≤ 480px` | Small adjustments |
| Tablet | `≤ 768px` | Navigation hamburger, layout stack |
| Desktop | `≥ 1024px` | Layout desktop |
| Wide | `≥ 1200px` | Container max |
