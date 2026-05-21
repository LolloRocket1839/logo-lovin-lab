## Obiettivo
Rendere la lettura degli articoli più piacevole con un trattamento "Apple Newsroom": tipografia editoriale ampia, navigazione interna fluida e micro-esperienza immersiva. Applicato a tutti i post via `BlogPost.tsx` + `AnimatedBlogContent.tsx`.

## Cosa cambia (a livello utente)

**1. Leggibilità del testo**
- Colonna più stretta e centrata (~680px max) con padding generoso.
- Font display più grande per titolo e drop-cap sulla prima lettera del primo paragrafo.
- Body con `font-size` fluido (clamp 17→19px), `line-height` 1.75, `letter-spacing` editoriale.
- Spaziatura ariosa fra paragrafi, H2 con respiro extra sopra (mt-16) e hairline sottile.
- Blockquote stile Apple: senza barra laterale, corsivo grande, centrato.
- Immagini full-bleed opzionali con didascalia minimale.
- Code/tabelle con sfondo soft e bordo morbido.

**2. Navigazione interna**
- Reading progress bar in alto (1px, color primary, scroll-driven).
- TOC galleggiante a sinistra desktop (sostituisce il `FloatingTableOfContents` attuale): scroll-spy che evidenzia la sezione attiva, click → smooth scroll.
- Mobile: TOC dentro un Sheet con trigger a bordo schermo.
- Stima "X min rimanenti" che si aggiorna con lo scroll.

**3. Esperienza immersiva (sobria, no parallax pesanti)**
- Hero ridisegnato: titolo grande sopra l'immagine (no badge category sotto), meta-info in riga sottile, immagine sotto con angoli morbidi e leggero fade dai bordi.
- Fade-up dei paragrafi al primo viewport entry (300ms, intersection observer, una volta sola — rispetta `prefers-reduced-motion`).
- "Reading mode": pulsante che nasconde sidebar/CTA in linea e allarga ancora la colonna (toggle in header sticky minimale).
- Header sticky minimale che appare allo scroll-down: titolo abbreviato + progress + share.

## Scope tecnico

**File nuovi**
- `src/components/blog/ReadingProgressBar.tsx` — barra 1px scroll-driven.
- `src/components/blog/StickyArticleHeader.tsx` — header condensato con titolo + progress + share + reading-mode toggle.
- `src/components/blog/ArticleTOC.tsx` — TOC desktop sticky con scroll-spy (rimpiazza `FloatingTableOfContents` su desktop; mobile sheet riusa la stessa logica).
- `src/components/blog/ReadingModeProvider.tsx` — context per toggle reading mode.

**File modificati**
- `src/pages/BlogPost.tsx` — nuova struttura header, integra i componenti sopra, rimuove `ParallaxHeroImage` a favore di hero più "quiet".
- `src/components/blog/AnimatedBlogContent.tsx` — wrap paragrafi con fade-up observer, drop-cap sulla prima `<p>`, classi `prose` editoriali.
- `src/index.css` — utility `.prose-editorial` con tipografia Apple-like, drop-cap, blockquote, image full-bleed.

**File invariati**
- `IPhoneNotesTemplate` (note-style posts) resta com'è.
- `EmailGate`, `BlogCTA`, `RelatedPosts`, `ClusterSidebar` invariati.

## Vincoli e principi
- Solid soft backgrounds, 300ms fade-up, niente parallax/layout-shift (memory: design philosophy).
- Sentence case su tutti i nuovi testi UI (es. "Modalità lettura", "Indice").
- `prefers-reduced-motion` rispettato ovunque.
- Nessun cambio a SEO, structured data, lingua, gating, analytics.
- Nessun nuovo pacchetto: solo Tailwind + Intersection Observer + scroll listener.

## Cosa NON cambia
- Logica caricamento contenuto, auto-linking, contextual suggestions.
- Struttura `BlogCard` / `BlogGrid` / pagina `/blog`.
- Backend, schema, traduzioni esistenti (aggiungo solo 4-5 chiavi UI per IT/EN: "reading mode", "table of contents", "min remaining").

## Quick visual reference

```text
┌─────────────────────────────────────────┐
│ ▓▓▓▓▓▓▓▓░░░░░░░░░░░░░ progress 1px     │
├─────────────────────────────────────────┤
│ [sticky header on scroll: title · ●●●●] │
│                                         │
│   Category · 5 min · 20 nov 2026        │
│                                         │
│   Titolo grande in display font         │
│   che respira su tre righe              │
│                                         │
│   [— immagine hero soft —]              │
│                                         │
│ ┌──────┐  ┌──────────────────────────┐  │
│ │ TOC  │  │ D rop-cap sul primo      │  │
│ │ ●    │  │ paragrafo. Body 18px     │  │
│ │ ○    │  │ line-height 1.75 ampio.  │  │
│ │ ○    │  │                          │  │
│ └──────┘  └──────────────────────────┘  │
└─────────────────────────────────────────┘
```
