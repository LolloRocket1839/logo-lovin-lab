

# Add 3 new blog posts with tailored Jungle Rent CTAs

## Overview

Add 3 new bilingual blog articles and update the existing health insurance article. Each article gets a tailored CTA section in the markdown content itself (linking to `/contratti-locazione` or waitlist) plus the existing `BlogCTA` component which already renders based on category.

## Articles

### 1. NEW — `aule-studio-torino-notte-domenica-2026`
Night and Sunday study spaces guide. Category: `students`.
- EN + IT markdown files from the user's content
- Tailored CTA at bottom: "Cerchi casa vicino alla tua aula studio preferita? Jungle Rent aiuta studenti a trovare alloggi nelle zone universitarie di Torino."
- Internal links to `aule-studio-torino-guida-completa`, `dove-vivere-torino-studenti-politecnico`

### 2. REPLACE — `assicurazione-sanitaria-studenti-internazionali-italia-2026`
Already exists as post entry. Replace EN + IT markdown content with the user's expanded version.
- Update metadata (readTime: 15, date: 2026-03-25, expanded FAQs)
- Tailored CTA: "Hai risolto la sanità — ora risolvi l'alloggio. Jungle Rent offre contratti regolari con cedolare secca per studenti internazionali a Torino."
- Internal links to `codice-fiscale-studenti-stranieri-torino-2026`, `conto-corrente-studenti-stranieri-italia-2026`, `budget-mensile-studente-torino-2026`

### 3. NEW — `trovare-casa-torino-studente-fuorisede-2026`
Housing search guide for students. Category: `students`.
- EN + IT markdown files from the user's content
- Tailored CTA: "Non hai trovato la stanza giusta? Jungle Rent sta costruendo un'offerta di alloggi per studenti a Torino con contratti regolari e prezzi trasparenti. Entra in lista d'attesa."
- Additional CTA linking to `/contratti-locazione`: "Hai trovato casa ma ti serve un contratto? Il nostro servizio di redazione contratti parte da €89."
- Internal links to `dove-vivere-torino-studenti-politecnico`, `guida-affitto-italia-stranieri-2026`, `canone-concordato-torino-2026-guida-completa`

## CTA approach

Each markdown file will include a styled section at the bottom (before sources/FAQ) using a horizontal rule and bold header, with links to the waitlist page (`/studenti`) and to `/contratti-locazione`. The existing `BlogCTA` component (category-based) will also render as usual on the page.

## Files involved

| File | Action |
|------|--------|
| `src/data/blog/posts.ts` | Add 2 new entries, update 1 existing |
| `src/data/blog/content/en/aule-studio-torino-notte-domenica-2026.md` | New |
| `src/data/blog/content/it/aule-studio-torino-notte-domenica-2026.md` | New |
| `src/data/blog/content/en/assicurazione-sanitaria-studenti-internazionali-italia-2026.md` | Replace |
| `src/data/blog/content/it/assicurazione-sanitaria-studenti-internazionali-italia-2026.md` | Replace |
| `src/data/blog/content/en/trovare-casa-torino-studente-fuorisede-2026.md` | New |
| `src/data/blog/content/it/trovare-casa-torino-studente-fuorisede-2026.md` | New |
| `public/sitemap-blog.xml` | Add 2 new URLs |

