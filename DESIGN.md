# YatraNexus Design System

Source of truth: `src/styles.css` + Google Fonts in `src/routes/__root.tsx`

---

## 1. Brand overview

| Pillar | Direction |
|--------|-----------|
| Mood | Warm, premium travel — trustworthy, human, India-first |
| Palette | Deep navy/purple + warm orange on cream |
| Feel | Soft rounded UI, light pages, gradient accents, real photography |
| Stack | TanStack Start + Tailwind v4 + shadcn/ui + Lucide icons |

---

## 2. Colors

### Core brand (use these first)

| Token | Hex / value | Role |
|-------|-------------|------|
| `--brand-navy` / `--brand-purple` / `--brand-navy-deep` | `#2D235F` | Primary brand, headings, logo “Yatra”, secondary CTAs |
| `--brand-navy-soft` | `#3F3870` | Softer navy for secondary text / UI |
| `--brand-orange` | `#D86417` | Accent, primary CTAs, logo “Nexus”, focus ring |
| `--brand-orange-glow` | `#E57828` | Hover / glow states |
| `--brand-orange-soft` | `#FEF4EC` | Soft orange surfaces / chips |
| `--brand-cream` | `oklch(0.985 0.012 75)` ≈ `#FDF9F3` | Page background |
| `--brand-sand` | `oklch(0.975 0.015 85)` ≈ `#FAF6EF` | Sand / secondary surface |

### Semantic UI tokens

| Token | Approx / value | Use |
|-------|----------------|-----|
| `--background` | cream | Page bg |
| `--foreground` | deep purple-gray | Body text |
| `--primary` | `#2D235F` | Primary buttons / links |
| `--accent` | `#D86417` | Accent actions |
| `--muted-foreground` | mid purple-gray | Supporting copy |
| `--card` | `#FFFFFF` | Cards / panels |
| `--border` / `--input` | warm light gray | Borders, inputs |
| `--ring` | `#D86417` | Focus rings |
| `--destructive` | warm red oklch | Errors / delete |

### Brand gradients

```css
/* Primary brand (logo text, accents) */
--gradient-brand: linear-gradient(135deg, #2D235F 0%, #D86417 100%);

/* Trust / ribbon */
--gradient-trust: linear-gradient(90deg, #2D235F 0%, #241C4D 50%, #D86417 100%);

/* Sunset */
--gradient-sunset: linear-gradient(120deg, #2D235F, #D86417);

/* Page wash */
--brand-page-bg: linear-gradient(180deg, cream → slightly lighter cream);
```

### Marketing CTA ribbon (service / About / Contact)

```css
linear-gradient(90deg, #6322D2 0%, #A3186F 42%, #EA580C 100%);
```

CTA button on ribbon: **white** background, text `#EA580C`.

### Feature icon tones (why-cards)

| Tone | Gradient |
|------|----------|
| Purple | `#6366F1` → `#8B5CF6` |
| Pink | `#EC4899` → `#A855F7` |
| Orange | `#F97316` → `#EF4444` |
| Blue | `#3B82F6` → `#6366F1` |
| Green | `#22C55E` → `#16A34A` |

### Utility

| Use | Color |
|-----|--------|
| WhatsApp FAB / chat | Bright green (`#25D366` family) |
| White | `#FFFFFF` |
| Dark mode | Defined in `.dark` but **site UI is light-first** |

---

## 3. Typography

### Font families

| Role | Font | CSS variable | Weights loaded |
|------|------|--------------|----------------|
| **Body / UI** | **Epilogue** | `--font-sans` | 400, 500, 600, 700 |
| **Headings / display** | **Urbanist** | `--font-display` | 500, 600, 700, 800, 900 |

Loaded from Google Fonts in `__root.tsx`:

```
Urbanist: 500–900
Epilogue: 400–700
```

### Usage rules

| Element | Font | Notes |
|---------|------|--------|
| `body` | Epilogue | Antialiased |
| `h1–h4` | Urbanist | `letter-spacing: -0.02em` |
| Section titles | Urbanist, bold/extrabold | Often `clamp()` sizes |
| Buttons / labels | Epilogue, 600 | |
| Gradient headline accents | Urbanist + `.text-brand-gradient` | Navy → orange clip |

### Typical scale (public site)

| Level | Approx size |
|-------|-------------|
| Hero H1 | `text-3xl` → `md:text-5xl` (Urbanist bold) |
| Section H2 | ~`1.5rem`–`2rem` |
| Body | `0.875rem`–`1rem`, line-height ~1.55–1.7 |
| Small / meta | `0.75rem`–`0.8125rem` |

---

## 4. UI style & layout

### Visual language

1. **Light premium travel** — cream page wash, white cards, navy type, orange CTAs
2. **Rounded, soft** — base `--radius: 1rem` (16px); pills `9999px` for CTAs
3. **Photography-led heroes** — full-bleed or light hero with destination imagery
4. **One job per section** — heading + short lead + content grid
5. **Icons** — Lucide, stroke ~1.5–1.75; often in colored circular / rounded tiles
6. **Motion** — light hover lift, soft shadows; intentional, not noisy

### Radius scale

| Token | Value |
|-------|--------|
| `--radius` | `1rem` (16px) |
| sm / md / lg / xl / 2xl / 3xl | derived ±4–12px |
| Pills / primary CTAs | `border-radius: 9999px` |
| CTA ribbons (desktop) | often `9999px` (stadium) |

### Shadows

```css
--shadow-soft: soft navy-tinted elevation
--shadow-card: card lift
--shadow-glow: orange glow on CTA hover
```

### Layout

| Pattern | Spec |
|---------|------|
| Content width | `max-w-7xl` (~80rem) |
| Page padding | `px-4` / `sm:px-6` / `lg:px-8` |
| Section helpers | `.page-hero`, `.page-section`, `.page-narrow` |
| Grids | 1 → 2 → 3/4 cols by breakpoint |

### Components (public site)

| Pattern | Style |
|---------|--------|
| **Primary CTA** | Orange pill (`.btn-brand-cta`) — white text |
| **Secondary CTA** | Outline / white on gradient |
| **Service pages** | Light hero + trust bar + why-cards + plan cards + gradient CTA ribbon |
| **Cards** | White, soft border, large radius, light shadow; hover slight lift |
| **Forms** | Rounded inputs, orange focus ring |
| **Header** | White/cream, logo left, hamburger mobile |
| **Footer** | Light, logo + link columns + legal |
| **FAB** | Green WhatsApp + optional back-to-top |

### Component libraries

- **Site UI:** `src/components/site/`
- **Primitives:** `src/components/ui/` (shadcn)
- **Service premium:** `src/components/site/service-premium/`

---

## 5. Do / Don’t

### Do

- Navy `#2D235F` + orange `#D86417` on cream
- Urbanist for headlines, Epilogue for body
- Soft rounded corners and pill CTAs
- Brand gradient for logo wordmark accents and key headlines

### Don’t

- Default Inter / Roboto / system-only look
- Flat purple-on-white AI cliché themes unrelated to brand
- Overuse cards in heroes
- Hardcode random purples except CTA ribbon / icon tone accents

---

## 6. Quick copy-paste tokens

```css
:root {
  --brand-navy: #2d235f;
  --brand-orange: #d86417;
  --brand-orange-glow: #e57828;
  --brand-orange-soft: #fef4ec;
  --brand-navy-soft: #3f3870;
  --font-sans: "Epilogue", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Urbanist", ui-sans-serif, system-ui, sans-serif;
  --radius: 1rem;
  --gradient-brand: linear-gradient(135deg, #2d235f 0%, #d86417 100%);
}
```

```html
<!-- Fonts -->
<link
  href="https://fonts.googleapis.com/css2?family=Urbanist:wght@500;600;700;800;900&family=Epilogue:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

---

## 7. File map

| File | What it defines |
|------|-----------------|
| `src/styles.css` | All CSS variables, components, page styles |
| `src/routes/__root.tsx` | Font loading |
| `src/components/ui/*` | shadcn primitives |
| `src/components/site/*` | Marketing / travel UI |
| `src/assets/yatranexus-logo.png` | Brand mark |
