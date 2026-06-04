# Constance Rebrand — Change Plan

Source of truth: `AIO - ConstanceBrand Guidelines (May).pptx`

---

## 1. Browser Tab & Meta

**File:** `index.html`

| Current | New |
|---|---|
| `<title>Flagship Matcha Teahouse Site</title>` | `<title>Constance — Tea Studio, San Francisco</title>` |
| `<meta name="theme-color" content="#faf9f7">` | `<meta name="theme-color" content="#FDF9F5">` |

---

## 2. Typography / Font Stack

**File:** `src/styles/fonts.css`

Remove Cormorant + Inter. Replace with the brand-mandated stack:

| Role | Current | New |
|---|---|---|
| Headings / Hero | Cormorant (serif) | **Nunito** — weights 400, 400i, 500, 700 |
| Body copy | Inter (sans-serif) | **Libre Franklin** — weights 300, 400 |
| Digital accent | *(none)* | **Space Mono** — weight 400 |

Google Fonts import URL:
```
https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,500;0,700;1,400&family=Libre+Franklin:wght@300;400&family=Space+Mono:wght@400&display=swap
```

CSS variable updates:
```css
--font-heading: 'Nunito', sans-serif;
--font-body:    'Libre Franklin', sans-serif;
--font-accent:  'Space Mono', monospace;
```

---

## 3. Color Palette

**File:** `src/styles/theme.css`

### 3a. Remove / Replace Old Variables

| Old variable | Old hex | Action |
|---|---|---|
| `--matcha-green` | `#7cb342` | Remove — replace usages with `--brand-stone` |
| `--matcha-dark` | `#558b2f` | Remove — replace usages with `--luxury-charcoal` |
| `--stone-warm-white` | `#faf9f7` | Update to Cream `#FDF9F5` |
| `--stone-grey` | `#f5f3f0` | Update to Harp `#F6F1E5` |
| `--luxury-charcoal` | `#1c1c1c` | Update to Ink Black `#000000` |
| `--luxury-moss` | `#4a5a4a` | Update to Warm Gray `#ADA195` |
| `--luxury-moss-hover` | `#5d6e5d` | Update to Charcoal `#666666` |
| `--luxury-line` | `rgba(28,28,28,0.12)` | Update to `rgba(0,0,0,0.10)` |
| `--background` | `#faf9f7` | Update to `#FDF9F5` |

### 3b. Add New Brand Variables

```css
--stone-romance:   #F1F1EF;   /* Romance — soft background alt */
--brand-stone:     #D9D1C5;   /* Stone — cards & accents (30%) */
--brand-gunsmoke:  #C3BBB3;   /* Gunsmoke — borders, dividers */
--brand-sea-mist:  #ABAEA1;   /* Sea Mist — subtle UI elements */
--brand-warm-gray: #ADA195;   /* Warm Gray — kicker labels */
--brand-cool-gray: #9FA0A0;   /* Cool Gray — secondary UI */
--brand-charcoal:  #666666;   /* Charcoal — secondary text */
```

### 3c. Color Usage Rules (from guidelines)

- **50% — Backgrounds:** Cream `#FDF9F5` as dominant. Harp `#F6F1E5` and Romance `#F1F1EF` as warm variants.
- **30% — Cards & Accents:** Stone `#D9D1C5`, Gunsmoke `#C3BBB3`, Sea Mist `#ABAEA1` for borders and dividers.
- **20% — Typography & Anchors:** Ink Black `#000000` for all headings and key visual elements.
- **Constraint:** Never use black as a large background surface area.

---

## 4. Particle & SVG Colors (visual components)

### `src/app/components/Chapter3.tsx`
- Line ~86: particle `fillStyle` `rgba(124, 179, 66, ...)` → `rgba(173, 161, 149, ...)` (Warm Gray)
- Comment on same line: update from "matcha green" to "warm stone"

### `src/app/components/Chapter4.tsx`
- SVG circles (`stroke="var(--matcha-green)"`) → `stroke="var(--brand-stone)"`
- SVG inner rects (`stroke="var(--matcha-dark)"`) → `stroke="var(--brand-gunsmoke)"`

### `src/app/components/LoadingScreen.tsx`
- Progress bar class `bg-[var(--matcha-green)]` → `bg-[var(--luxury-charcoal)]`

---

## 5. Global CSS Touch Highlight

**File:** `src/styles/index.css`

```css
/* Change from: */
-webkit-tap-highlight-color: rgba(124, 179, 66, 0.25);

/* To: */
-webkit-tap-highlight-color: rgba(0, 0, 0, 0.12);
```

---

## 6. Homepage Copy

**File:** `src/app/pages/HomePage.tsx` — `contentData` object

### Chapter 2 — The Source
> Anchors: iTi award-winning farms + Jeju Island sourcing

| | Text |
|---|---|
| **Headline** | The Source *(keep)* |
| **Current description** | "Straight from Uji, Japan, we work directly with heritage farmers to source single-cultivar tencha. Zero blends. Zero compromise. Just the pure expression of the soil." |
| **New description** | "Loose-leaf teas from multi-year International Taste Institute award-winning farms in Taiwan. Regenerative organic harvests from Jeju Island. Each origin is chosen for the cup it produces — nothing else." |

### Chapter 3 — Freshness / Stone Milling
> Anchors: First in SF Bay Area, Ishi Usu stone mills, milled fresh daily

| | Text |
|---|---|
| **Current headline** | "Freshness is the new standard." |
| **New headline** | "Milled fresh. Every morning." |
| **Current description** | "It is the shortest distance between a Japanese farm and your San Francisco cup. Freshness you can see. By milling in-house, we capture the farmer's intention and the true delicacy of the harvest. It is a moment of clarity you have to taste to believe." |
| **New description** | "The first tea studio in the San Francisco Bay Area to feature traditional Japanese Ishi Usu stone mills. Tencha ground on-site daily. The stones move slowly to prevent heat friction, preserving the leaf and its flavor. The result is matcha of remarkable sweetness and depth." |

### Chapter 4 — Extraction / Proprietary Technology
> Anchors: coffee-style brewing, temperature, pressure, flow rate, volume

| | Text |
|---|---|
| **Current headline** | "The Physics of Extraction" |
| **New headline** | "Precision in Every Pour" |
| **Current description** | "Traditional ceremony, engineered for precision. We utilize proprietary extraction technology that controls pressure, temperature, and flow to the decimal point." |
| **New description** | "We apply proprietary coffee-style brewing technology to tea — precisely controlling water temperature, pressure, flow rate, and volume. Each variable tuned to coax the most nuanced flavor from the leaf." |
| **sideNote description** | "High-mountain oolong, sourced directly from iTi award-winning farms in Taiwan." |

### Chapter 5 — Who We Are
> Shift: from "Engineered by Obsession" hype language → Constance as a promise of consistency

| | Text |
|---|---|
| **Current headline** | "Engineered by Obsession" |
| **New headline** | "A Promise of Consistency" |
| **Current subhead** | "Traditional ritual. Modern rhythm." |
| **New subhead** | "Seasonal. Intentional. Craft-forward." |
| **Current description** | "Technology handles the consistency; we handle the connection. We built this space for the community—an experience to slow down and taste the difference." |
| **New description** | "Constance means showing up the same way every day — freshly milled, carefully sourced, precisely brewed. We built this space for the community. Come slow down with us." |

### Chapter 6 — The Studio
| | Text |
|---|---|
| **Current signoff** | "Elevating your daily pour through the science of craft and the soul of the leaves." |
| **New signoff** | "Craft moves slowly here. Come find your ritual." |

---

## 7. Menu Page

**File:** `src/app/pages/MenuPage.tsx`

| Element | Current | New |
|---|---|---|
| Hero intro copy | "Stone-ground matcha, single-origin teas, and house-made pastries." | "Freshly milled matcha, single-origin teas from award-winning farms, and house-made pastries. Everything made with intention." |
| Placeholder hex colors | `f5f3f0 / 558b2f` | `FDF9F5 / ADA195` |

---

## 8. Career Page

**File:** `src/app/pages/CareerPage.tsx`

| Element | Current | New |
|---|---|---|
| All `--matcha-dark` color refs (×7) | `var(--matcha-dark)` | `var(--luxury-charcoal)` |
| All `--matcha-green` color refs (×1) | `var(--matcha-green)` | `var(--brand-stone)` |
| Contact email | `careers@tea.com` | `careers@constance.sf` |
| Placeholder hex colors | `f5f3f0 / 558b2f` | `FDF9F5 / ADA195` |

---

## 9. Voice & Tone Rules (apply to all future copy)

From brand guidelines — enforce in any new writing:

- **Use:** Active voice, present tense
- **Use:** Sophisticated / Intentional / Warm / Curated tone
- **Avoid:** Exclamation marks
- **Avoid:** Superlatives (best, amazing, incredible)
- **Avoid:** Hype language or promotional phrases
- Let craft speak for itself — educate without lecturing

**On-brand example:**
> "Our tencha arrives each season from Uji, stone-milled fresh every morning. The result is a matcha of remarkable sweetness and depth."

**Off-brand example to avoid:**
> "Try our amazing super-premium matcha! It's the BEST in California!"

---

## Summary Checklist

- [ ] `index.html` — title + theme-color
- [ ] `src/styles/fonts.css` — swap to Nunito / Libre Franklin / Space Mono
- [ ] `src/styles/theme.css` — full palette update, add brand vars, remove matcha vars
- [ ] `src/styles/index.css` — tap highlight color
- [ ] `src/app/components/Chapter3.tsx` — particle color
- [ ] `src/app/components/Chapter4.tsx` — SVG stroke colors
- [ ] `src/app/components/LoadingScreen.tsx` — progress bar color
- [ ] `src/app/pages/HomePage.tsx` — all 5 sections of contentData
- [ ] `src/app/pages/MenuPage.tsx` — intro copy + placeholder colors
- [ ] `src/app/pages/CareerPage.tsx` — remove matcha color refs, fix email + placeholders
