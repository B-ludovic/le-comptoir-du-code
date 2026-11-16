# Design System — L'Échoppe du Code

> Charte graphique complète (base claire, novembre 2026). Référence unique pour toute décision visuelle sur le site, le blog, et les documents PDF.

---

## 1. Philosophie

**Base claire, artisanale.** Fond beige chaud, accent terracotta, matières sobres (refonte de novembre 2026 ; l'ancienne charte « warm dark » brun-noir et cuivre est abandonnée). Le site doit rassurer un client qui ne lit pas de code : peu d'effets, beaucoup de lisibilité. Zéro dépendance CSS externe, zéro template, zéro arrondi agressif.

Trois règles non négociables :
- `border-radius: 2px` partout — jamais rond, jamais carré
- Le terracotta est la seule couleur d'accent — tout le reste est neutre
- Pas de couleurs vives, pas d'ombres portées agressives

Un seul endroit sombre : la face « architecture » du composant Interface → Architecture (Méthodologie), et la pastille du logo. Le sombre y signifie « plan technique ».

---

## 2. Couleurs

### Palette principale

Tous les textes passent le seuil WCAG AA (4,5 : 1) sur `--bg-main`, `--bg-card` et `--bg-alt`.

| Rôle | Variable CSS | Valeur | Contraste sur `--bg-main` |
|------|-------------|-----|-------|
| Fond principal | `--bg-main` | `#F6F0E6` | — |
| Fond carte | `--bg-card` | `#FBF7F1` | — |
| Fond carte hover | `--bg-card-hover` | `#F2EADF` | — |
| Fond section alternée | `--bg-alt` | `#EFE6D8` | — |
| Lueur de fond | `--bg-glow` | `rgba(217, 119, 79, 0.1)` | — |
| Texte principal | `--text-main` | `#2A211B` | 13,9 : 1 |
| Texte secondaire | `--text-muted` | `#6B5D52` | 5,6 : 1 |
| Accent (liens, CTA, numéros) | `--accent-primary` | `#A44A28` | 5,2 : 1 |
| Accent hover | `--accent-hover` | `#94401F` | 6,2 : 1 |
| Terracotta clair | `--accent-soft` | `#D9774F` | décoratif, jamais pour du texte |
| Texte sur accent | `--on-accent` | `#FBF7F1` | 5,5 : 1 sur l'accent |
| Erreur | `--error` | `#A8322A` | — |
| Fond blueprint | `--blueprint-bg` | `#2A211B` | — |
| Trait blueprint | `--blueprint-line` | `#E8C4A0` | 9,6 : 1 sur le blueprint |

Un terracotta plus vif, type `#B4532F`, tombe à 4,4 : 1 et échoue pour le texte courant.

### Transparences

Les transparences passent par des triplets, jamais par une couleur écrite en dur :

| Variable | Valeur | Usage |
|----------|--------|-------|
| `--tint-rgb` | `164, 74, 40` | `rgba(var(--tint-rgb), 0.12)` : filets et fonds teintés d'accent |
| `--ink-rgb` | `42, 33, 27` | ombres légères, filets neutres |
| `--bg-rgb` | `246, 240, 230` | header et footer translucides |
| `--glow-rgb` | `217, 119, 79` | lueurs |

### Bordures

| Variable | Valeur | Usage |
|----------|--------|-------|
| `--border-subtle` | `1px solid rgba(var(--ink-rgb), 0.12)` | Séparateurs, cards, header scrollé |
| `--border-active` | `1px solid var(--accent-primary)` | Éléments actifs, focus |

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

- Header scrollé + Footer : `backdrop-filter: blur(8px)` + `background: rgba(var(--bg-rgb), 0.95)`
- Overlay menu mobile : `backdrop-filter: blur(4px)` + `background: rgba(var(--bg-rgb), 0.4)`

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
  rgba(var(--tint-rgb), 0.9) 90deg,
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

### Apparitions au défilement

Une seule animation au défilement sur tout le site : opacité 0 → 1 et montée de 16 px, 600 ms, `var(--ease-out)` = `cubic-bezier(0.22, 1, 0.36, 1)`, jouée une fois. Un élément porte `data-reveal` ; `components/Reveal/RevealController.tsx` (un seul IntersectionObserver) pose `data-visible`. L'état caché n'existe que sous `html.reveal-armed` : sans JavaScript ou en mouvement réduit, tout reste visible. Cascade : `style={{ '--i': n }}`, 80 ms d'écart, quatre éléments au plus.

Interdits : parallaxe, texte animé lettre par lettre, compteurs qui défilent, carrousels automatiques.

### Deux exceptions interactives

- **Objet WebGL du hero** (`components/Sections/Hero/HeroObject.tsx`) : galet terracotta en raymarching, sans bibliothèque. Réagit à la souris, quadrillage beige au survol. Densité de pixels plafonnée à 1,5, pause hors écran, repli CSS si WebGL manque.
- **Carte Interface → Architecture** (`components/Sections/Method/InterfaceBlueprint.tsx`) : une ligne terracotta balaie la carte en 500 ms et la face blueprint remplace la face interface ; les annotations se tracent ensuite. Déclencheur : survol (souris), bouton (tactile, clavier).

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
background: --accent-primary | border: 1px solid --accent-primary
color: --on-accent | border-radius: 2px | min-height: 48px
hover → background et border: --accent-hover
transition: 0.3s ease
```

### Bouton secondaire

```
background: transparent | border: 1px solid --accent-primary
color: --accent-primary | border-radius: 2px
hover → background: --accent-primary | color: --on-accent
```

### Cards

```
background: var(--bg-card)
border: var(--border-subtle)
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
background: rgba(var(--bg-rgb), 0.95) | border: --border-subtle
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
