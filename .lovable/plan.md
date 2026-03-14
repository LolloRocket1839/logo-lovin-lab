

# Add "Conto Corrente per Studenti Stranieri in Italia 2026" blog article

## Changes

### 1. Create Italian markdown — `src/data/blog/content/it/conto-corrente-studenti-stranieri-italia-2026.md`
Convert provided HTML to markdown. Sections: TL;DR, requirements, bank comparison (Revolut, Intesa XME, Widiba, N26, UniCredit, Fineco), comparison table, 3-phase strategy, opening without permesso di soggiorno, CTA, FAQ, sources.

### 2. Create English markdown — `src/data/blog/content/en/conto-corrente-studenti-stranieri-italia-2026.md`
Full English translation, same structure.

### 3. Register post in `src/data/blog/posts.ts`
Insert at position 0:
- `slug: "conto-corrente-studenti-stranieri-italia-2026"`
- `category: "students"`, `date: "2026-03-14"`, `readTime: 9`
- `image` — reuse an existing student-related image (e.g. `/images/quartieri-studenti-torino.jpg` or similar)
- 5 FAQs per language from provided HTML
- SEO keywords from meta tags

### 4. Update `src/data/blog/contentClusters.ts`
- Add to Students "University Life" cluster satellites (practical guide for international students)
- Add relationships:
  - ↔ `quartieri-sicuri-studenti-internazionali-torino-2026` (high — same target audience)
  - ↔ `san-salvario-guida-studenti` (medium)

### 5. Update `src/data/linkableContent.ts`
Add keywords: "conto corrente studenti stranieri", "bank account international students Italy", "Revolut IBAN italiano", "aprire conto banca Torino studenti".

### 6. Update `public/sitemap-images.xml`
Add entry for the new article URL.

## Files changed

| File | Action |
|------|--------|
| `src/data/blog/content/it/conto-corrente-studenti-stranieri-italia-2026.md` | Create |
| `src/data/blog/content/en/conto-corrente-studenti-stranieri-italia-2026.md` | Create |
| `src/data/blog/posts.ts` | Add post at top |
| `src/data/blog/contentClusters.ts` | Add to cluster + relationships |
| `src/data/linkableContent.ts` | Add keywords |
| `public/sitemap-images.xml` | Add entry |

