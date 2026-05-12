
# Piano: refresh sito in stile "Minimal Swiss Precision"

Applico la direzione selezionata (griglia 12-col, bordi 1px forest green, tipografia bold tighter con accenti italic, mono per dati) come **layer estetico globale**, senza toccare logica, form, RLS, edge functions.

## Principi visivi

- **Cornice strutturale**: contenitori principali con `border border-primary/20`, divisori interni `border-r / border-t` invece di card flottanti con shadow.
- **Tipografia**:
  - Display headings: `font-bold tracking-tighter leading-[0.9]`, scala fino a `text-7xl/8xl` desktop.
  - Parole-chiave (es. "student housing") in `italic font-normal` per contrasto.
  - Dati numerici/metriche in `font-mono` (IBM Plex Mono via Google Fonts), tabular-nums.
  - Eyebrow/label: `text-xs uppercase tracking-widest`.
- **Palette**: invariata (cream `--background`, forest `--primary`). Accento urgenza in rosso desaturato `#D14343` invece dell'attuale rosso saturo.
- **Motion**: solo fade-up 300ms già esistente. Niente parallax, niente blur.

## Interventi mirati

### 1. Token e tipografia globali
- `tailwind.config.ts`: aggiungere `fontFamily.mono` → `['IBM Plex Mono', ...]`; preservare Inter come sans.
- `index.html`: preload IBM Plex Mono insieme a Inter (subset light).
- `src/index.css`: nuove utility:
  - `.swiss-frame` → border + divide forest green a opacità 20%.
  - `.metric-mono` → font-mono, tabular-nums, tracking-tighter.
  - `.eyebrow` → uppercase, tracking-widest, text-xs.

### 2. Hero homepage (`ImmersiveHero.tsx`)
- Riprogettare in layout 12-col con cornice bordata:
  - Col 8: H1 multi-riga `Investi in / student housing (italic) / a Torino`, subhead breve.
  - Col 4: due metriche mono (Target yield, Asset gestiti) impilate + CTA "Parla con Lorenzo" a piena larghezza in fondo, dark verde.
- Sotto-hero: barra 4 colonne con Occupancy / Turnover / Market / Strategy (tutto in stile Swiss).
- Mobile: stack verticale, stessa logica, paddings 8.

### 3. AnnouncementBanner
- Riformulare come thin strip top: cream bg, bordo bottom forest, punto rosso `animate-pulse`, label "Solo X slot disponibili" uppercase tracking-widest. Più discreto rispetto all'attuale fascia rossa piena.

### 4. Sezioni below-the-fold (HowItWorks, InvestorSection, SellerSection, FAQ)
- Wrappare ogni sezione in un container con `border-y border-primary/15` e titolo eyebrow allineato a sinistra.
- Cards/passaggi: rimuovere shadow, usare bordi 1px e divisori interni.
- Numeri grandi (rendimenti, ticket, %) → `metric-mono`.

### 5. Pagina /investitori
- Adattare HeroSection: stessa griglia 8/4, metriche in mono, italic su parola chiave.
- TrustStripe / SocialProofMini: layout a 4-up con bordi verticali, niente background card.
- FAQ accordion: bordi top/bottom 1px, niente rounded card; chevron + numero progressivo mono.

### 6. Navigation & layout chrome
- Navigation desktop: rimuovere shadow, mantenere border-b 1px primary/15; brand wordmark in tracking-tighter.
- BottomNav mobile: bordo top 1px, icone più piccole, label mono.
- Footer: già minimale → uniformare bordi e tipografia eyebrow.

### 7. Cosa NON tocco
- Logica business, form, validazione, RLS, edge functions.
- Routing, SEO (Helmet, JSON-LD), hreflang.
- i18n strings (cambio solo layout, non testi).
- Performance optimizations già fatte (memoization, lazy load, scroll manager, analytics batching).

## File principali coinvolti

```
tailwind.config.ts                          # fontFamily.mono
src/index.css                               # utility .swiss-frame, .metric-mono, .eyebrow
index.html                                  # preload IBM Plex Mono
src/components/innovative/ImmersiveHero.tsx # hero homepage
src/components/AnnouncementBanner.tsx       # banner urgenza
src/components/layout/Navigation.tsx        # chrome top
src/components/layout/BottomNav.tsx         # chrome mobile
src/components/sections/HowItWorks/*        # griglia step
src/components/sections/InvestorSection/*   # cards metriche
src/components/SellerSection.tsx
src/components/investitori/HeroSection.tsx
src/components/investitori/TrustStripe.tsx
src/components/investitori/SocialProofMini.tsx
src/components/investitori/FAQSection.tsx
```

## Risultato atteso

Sito visivamente più rigoroso e premium: griglie a vista, tipografia espressiva con accenti italic, dati in mono. Stessa palette, stessa copy, stessa funzionalità. Implementazione progressiva (homepage + hero investors prima, poi sezioni interne) così possiamo valutare in corso d'opera.
