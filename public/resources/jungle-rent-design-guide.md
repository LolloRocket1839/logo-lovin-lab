# 🎨 Jungle Rent Design System Guide

> Guida di riferimento per mantenere coerenza visiva in tutto il progetto Jungle Rent.

---

## Brand Identity

- **Concept**: Proptech premium per investitori immobiliari e studenti a Torino
- **Feel**: Caldo, accogliente, professionale ma accessibile
- **Inspiration**: Apple-style minimal, "feel-good" micro-interactions

---

## Color Palette (HSL)

Tutti i colori sono definiti in `src/index.css` come CSS custom properties. **Mai usare colori hardcoded nei componenti.**

### Light Mode

| Token | Valore HSL | Descrizione |
|-------|------------|-------------|
| `--primary` | `150 45% 18%` | Forest green - CTA, links, accents |
| `--primary-foreground` | `0 0% 100%` | Testo su primary |
| `--background` | `44 65% 90%` | Warm cream - sfondo pagina |
| `--foreground` | `0 0% 9%` | Near black - testo principale |
| `--card` | `42 60% 92%` | Sfondo cards |
| `--muted` | `40 55% 88%` | Sfondi sottili |
| `--muted-foreground` | `0 0% 25%` | Testo secondario |
| `--border` | `40 50% 83%` | Bordi |
| `--destructive` | `0 84.2% 60.2%` | Errori, azioni distruttive |

### Dark Mode

| Token | Valore HSL | Descrizione |
|-------|------------|-------------|
| `--primary` | `145 35% 65%` | Sage green più chiaro |
| `--background` | `150 40% 8%` | Deep forest |
| `--foreground` | `45 20% 97%` | Warm white |
| `--card` | `150 35% 12%` | Card scure |
| `--muted` | `145 20% 20%` | Sfondi sottili |

### Utilizzo in Tailwind

```tsx
// ✅ Corretto - usa semantic tokens
<div className="bg-background text-foreground">
<button className="bg-primary text-primary-foreground">

// ❌ Sbagliato - colori hardcoded
<div className="bg-white text-black">
<button className="bg-green-700 text-white">
```

---

## Typography

### Font Family

```css
font-sans: ['Inter', 'system-ui', 'sans-serif']
font-display: ['Inter', 'system-ui', 'sans-serif']
font-mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace']
```

### Headings

- **Classes**: `font-display font-extrabold`
- **Letter spacing**: `-0.03em` (tight)
- **Usa sempre tag semantici**: H1 > H2 > H3 > H4

```tsx
<h1 className="font-display font-extrabold text-4xl">Titolo Principale</h1>
<h2 className="font-display font-bold text-2xl">Sottotitolo</h2>
```

### Body Text

- **Weight**: 400 (normal)
- **Letter spacing**: `-0.01em`
- **Line height**: Default o `leading-relaxed` per testi lunghi

---

## Gradients

Definiti in `index.css` come CSS custom properties:

| Gradient | Utilizzo |
|----------|----------|
| `--gradient-jungle-vertical` | Transizioni full page |
| `--gradient-jungle-hero` | Hero sections |
| `--gradient-jungle-section` | Divisori tra sezioni |
| `--gradient-jungle-blog` | Pagine blog |
| `--gradient-jungle-footer` | Area footer |

### Utilizzo

```tsx
// Via classe utility
<div className="gradient-jungle-hero">

// Via CSS inline
<div style={{ background: 'var(--gradient-jungle-hero)' }}>
```

---

## Shadows (Apple-style minimal)

```css
--shadow-minimal: 0 1px 3px hsla(0, 0%, 0%, 0.08);
--shadow-card: 0 2px 8px hsla(0, 0%, 0%, 0.08);
--shadow-card-hover: 0 4px 16px hsla(0, 0%, 0%, 0.12);
--shadow-button: 0 2px 8px hsla(150, 45%, 18%, 0.2);
--shadow-button-hover: 0 4px 12px hsla(150, 45%, 18%, 0.3);
```

---

## Interactions & Animations

### Feel-Good Clicks (Marvis-style)

```css
.feel-good-click {
  transition: all 0.2s ease-out;
  /* On hover */
  hover:shadow-lg hover:-translate-y-0.5
  /* On click */
  active:scale-[0.97]
}
```

### Blog Cards

```css
.blog-card-marvis {
  transition: all 0.3s ease-out;
  hover:scale-[1.02] hover:shadow-2xl
  border: border-border/50
}
```

### Link Underline Animation

```tsx
<a className="link-elegant">Link con underline animato</a>
```

### Transition Standard

```css
--transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

### Reduced Motion

**Sempre rispettare** `prefers-reduced-motion`:

```tsx
import { useReducedMotion } from "@/hooks/useReducedMotion";

const prefersReducedMotion = useReducedMotion();

// Disabilita animazioni se l'utente le preferisce ridotte
```

---

## Component Patterns

### Buttons

Usa shadcn `Button` con varianti:

```tsx
import { Button } from "@/components/ui/button";

<Button variant="default">Primary CTA</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
```

### Cards

```tsx
<div className="bg-card rounded-lg shadow-card border border-border/50 p-6">
  <h3 className="text-card-foreground">Card Title</h3>
</div>
```

### Container & Spacing

```tsx
// Container centrato con padding
<div className="container mx-auto px-4 md:px-6">

// Spacing generoso tra sezioni
<section className="py-16 md:py-24">
```

### Icons

Usa **Lucide React** con sizing consistente:

```tsx
import { ArrowRight, Check, X } from "lucide-react";

<ArrowRight className="w-4 h-4" />  // Small
<ArrowRight className="w-5 h-5" />  // Default
<ArrowRight className="w-6 h-6" />  // Large
```

---

## Category Badges

```tsx
// Investors
<span className="category-badge investors">Investitori</span>

// Students
<span className="category-badge students">Studenti</span>

// Turisti
<span className="category-badge turisti">Turisti</span>

// Sellers
<span className="category-badge sellers">Venditori</span>

// Società
<span className="category-badge societa">Società</span>
```

---

## Accessibility Checklist

### Contrast

- WCAG AA minimum: **4.5:1** per testo normale
- WCAG AA minimum: **3:1** per testo grande (18px+ bold, 24px+ normal)

### Focus Indicators

```css
*:focus-visible {
  outline: 2px solid hsl(var(--primary));
  outline-offset: 2px;
  border-radius: 2px;
}
```

### Keyboard Navigation

- Tutti gli elementi interattivi devono essere raggiungibili con Tab
- Skip-to-content link per keyboard users
- Ordine di focus logico

### Screen Readers

- Usa tag semantici (`<main>`, `<nav>`, `<article>`, `<section>`)
- Alt text descrittivo per immagini
- ARIA labels dove necessario

---

## Responsive Breakpoints

```typescript
screens: {
  'xs': '375px',   // Small phones
  'sm': '640px',   // Large phones
  'md': '768px',   // Tablets
  'lg': '1024px',  // Laptops
  'xl': '1280px',  // Desktops
  '2xl': '1400px', // Large screens
}
```

### Mobile-First Approach

```tsx
// ✅ Mobile-first
<div className="text-sm md:text-base lg:text-lg">

// ✅ Hide on mobile, show on desktop
<div className="hidden md:block">

// ✅ Show on mobile, hide on desktop
<div className="block md:hidden">
```

---

## Do's ✅

- ✅ Usa design tokens da `index.css`
- ✅ Rispetta light/dark mode
- ✅ Animazioni sottili e purposeful
- ✅ Mobile-first responsive design
- ✅ Semantic HTML
- ✅ Accessibilità sempre

## Don'ts ❌

- ❌ Colori hardcoded (`text-white`, `bg-black`, `bg-green-500`)
- ❌ Animazioni pesanti senza reduced-motion fallback
- ❌ Purple gradients o "generic AI aesthetics"
- ❌ Font diversi da Inter
- ❌ Shadows troppo aggressive
- ❌ Breakpoints custom non definiti

---

## File di Riferimento

- **Design Tokens**: `src/index.css`
- **Tailwind Config**: `tailwind.config.ts`
- **UI Components**: `src/components/ui/`
- **Hooks**: `src/hooks/useReducedMotion.ts`

---

*Ultimo aggiornamento: Gennaio 2026*
