

# Add "Codice Fiscale per Studenti Stranieri a Torino" blog article

## Changes

### 1. Create Italian markdown — `src/data/blog/content/it/codice-fiscale-studenti-stranieri-torino-2026.md`
Convert provided HTML to markdown. Sections: TL;DR, 4 methods (Universitaly, consulate, Agenzia delle Entrate, Questura), office table, online question, uses list, common mistakes, CTA, sources.

### 2. Create English markdown — `src/data/blog/content/en/codice-fiscale-studenti-stranieri-torino-2026.md`
Full English translation from provided HTML, same structure.

### 3. Register post in `src/data/blog/posts.ts`
Insert at position 0:
- `slug: "codice-fiscale-studenti-stranieri-torino-2026"`
- `category: "students"`, `date: "2026-03-14"`, `readTime: 9`
- `image: "/images/quartieri-studenti-torino.jpg"` (reuse)
- 6 FAQs per language from provided HTML
- SEO keywords from meta tags

### 4. Update `src/data/blog/contentClusters.ts`
- Add `'codice-fiscale-studenti-stranieri-torino-2026'` to University Life cluster satellites
- Add relationships:
  - ↔ `conto-corrente-studenti-stranieri-italia-2026` (high — codice fiscale needed for bank account)
  - ↔ `quartieri-sicuri-studenti-internazionali-torino-2026` (medium)

### 5. Update `src/data/linkableContent.ts`
Add keywords: "codice fiscale studenti stranieri", "Italian tax code students", "Agenzia delle Entrate Torino", "Form AA4/8".

### 6. Update `public/sitemap-images.xml`
Add entry for the new article URL.

## Files changed

| File | Action |
|------|--------|
| `src/data/blog/content/it/codice-fiscale-studenti-stranieri-torino-2026.md` | Create |
| `src/data/blog/content/en/codice-fiscale-studenti-stranieri-torino-2026.md` | Create |
| `src/data/blog/posts.ts` | Add post at top |
| `src/data/blog/contentClusters.ts` | Add to cluster + relationships |
| `src/data/linkableContent.ts` | Add keywords |
| `public/sitemap-images.xml` | Add entry |

