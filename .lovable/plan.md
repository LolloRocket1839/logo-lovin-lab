# Editorial Quiet Luxury — Site-wide Refinement

Goal: bring the entire site to a more elegant, minimal, editorial feel without changing functionality, copy, or routes. Pure presentation work in `src/index.css`, `tailwind.config.ts`, and a small set of high-traffic UI components.

## Direction

Inspired by Aesop, Apartamento, RIMOWA, Muji editorial: serif display headlines, generous whitespace, hairline 1px borders instead of cards-on-cards, muted accents, motion that whispers (300ms fade-up only).

## Changes

### 1. Typography (foundation of "editorial")
- Add a refined serif display font alongside Inter:
  - Display: **Instrument Serif** (or Cormorant Garamond) — for h1/h2 and hero
  - Body: keep **Inter** but shift default weight 400 → 380 visual via `font-weight: 400` + `letter-spacing: -0.011em`
  - Mono: keep IBM Plex Mono (used sparingly for numbers/labels)
- Update `tailwind.config.ts`:
  - `font-display` → Instrument Serif stack
  - `font-sans` → Inter (unchanged)
  - New `font-serif` token = display
- Headings:
  - h1: serif, weight 400, tracking `-0.02em`, leading `1.05`
  - h2: serif, weight 400, tracking `-0.015em`
  - h3+: sans, weight 500, tracking `-0.01em`
  - Replace any `font-extrabold`/`font-black` on headings with `font-normal` serif
- Eyebrow labels: uppercase, mono, tracking `0.18em`, size `xs`, muted

### 2. Color & surfaces (calmer)
- Keep cream + jungle green palette (per memory).
- Soften:
  - `--card` becomes near-identical to `--background` (`44 60% 91%`) — no visible card surface; rely on hairline borders
  - `--border` lighten to `40 25% 80%` for true hairlines
  - `--muted-foreground` keep AA (0 0% 25%)
- Remove gradients on hero/sections where they add noise; keep one subtle vertical wash only for footer.
- Primary accent stays jungle green; use it more sparingly (links, primary CTA only).

### 3. Shadows & radii (less plastic)
- Reduce shadows globally:
  - `--shadow-card` → `0 1px 0 hsl(0 0% 0% / 0.04)` (hairline base)
  - `--shadow-card-hover` → `0 1px 2px hsl(0 0% 0% / 0.06)`
  - `--shadow-button` → none; rely on color contrast
- Border radius:
  - `--radius` 0.5rem → `0.375rem` (slightly tighter, more editorial)
  - Buttons keep `rounded-md`; cards `rounded-sm`; inputs `rounded-sm`

### 4. Motion (quieter)
- Keep only one motion primitive: 300ms `fade-in-up` on section reveal.
- Remove: `subtle-float`, `dino-blink`, hover lift translates on cards, scale on click for non-CTA elements.
- Keep `feel-good-click` only on primary CTAs.

### 5. Component refinements (presentation only)
- **`Card` (`src/components/ui/card.tsx`)**: switch from `border bg-card shadow-sm` to `border-b border-border/60 bg-transparent shadow-none` variant for editorial cards; keep current as `variant="solid"` if needed. Default becomes flat.
- **`Button` (shadcn)**: default variant loses heavy shadow; outline variant uses 1px hairline border.
- **`Navigation` / `MobileHeader`**: thinner top bar, serif wordmark optional, hairline bottom border instead of shadow.
- **`ImmersiveHero`**: serif h1, single CTA emphasis (Parla con Lorenzo), reduce secondary visual elements, more vertical breathing room (py increased on desktop).
- **`HowItWorks`, `InvestorSection`, `SellerSection`, `FAQSection`, `BlogHero`**: drop background tints, use `py-24 md:py-32`, hairline dividers between sections instead of color blocks.
- **`Footer` / `MobileFooter`**: lighter type, serif heading, more whitespace.
- **Badges (category, trust)**: outline only, no fill.

### 6. Spacing rhythm
- Establish vertical rhythm: section padding `py-20 md:py-28 lg:py-32`.
- Container max-width on long-form: `max-w-3xl` for editorial blocks, `max-w-6xl` for grids.

## Out of scope
- No copy changes, no routing changes, no JSON-LD/SEO files, no business logic.
- No new pages, no re-architecture of components — only style + small markup tweaks.
- Investor compliance copy untouched.

## Files to touch
- `src/index.css` (tokens, typography base, motion cleanup)
- `tailwind.config.ts` (font stacks, animation removal)
- `index.html` (add Instrument Serif preconnect + font link)
- `src/components/ui/card.tsx`, `src/components/ui/button.tsx` (variant defaults)
- `src/components/layout/Navigation.tsx`, `MobileHeader.tsx`, `Footer.tsx`, `MobileFooter.tsx`
- `src/components/innovative/ImmersiveHero.tsx`
- `src/components/sections/HowItWorks/*`, `InvestorSection/*`, `HomepageFAQ/*`
- `src/components/SellerSection.tsx`, `FAQSection.tsx`, `TrustBadge.tsx`, `AnnouncementBanner.tsx`
- `src/components/blog/BlogHero.tsx`

## Verification
- Visual QA at mobile (375), tablet (768), desktop (1280) on `/`, `/investitori`, `/blog`, a blog post, `/contratti-locazione`.
- Confirm Lighthouse LCP not regressed (serif font preloaded + `font-display: swap` + metrics-matched fallback).
- Check WCAG AA contrast on muted text and hairline borders against cream.

## Memory update (after build)
- Update `mem://design/minimalist-visual-standards` with the new editorial direction (serif display + hairlines + flat cards) so future work stays consistent.
