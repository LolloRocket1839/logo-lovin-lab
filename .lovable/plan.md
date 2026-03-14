

# Add 6 new SEO articles from research dossier

The PDF contains research data for 6 new articles. All 6 are new content not yet in the blog.

## The 6 articles

| # | Slug | Category | Topic |
|---|------|----------|-------|
| 1 | `san-salvario-sicurezza-dati-reali-2026` | students | San Salvario safety: real crime data, red zones, nightlife, rents |
| 2 | `torino-notte-guida-sicurezza-studenti` | students | Turin nightlife safety: movida zones, night transport, zones to avoid, emergency contacts |
| 3 | `canone-concordato-torino-2026-guida-completa` | investors | Canone concordato: 4 areas, sub-bands, calculation steps, bollinatura, tax benefits |
| 4 | `rendimento-student-housing-torino-2026` | investors | Real yields: buy/rent prices by zone, gross-to-net calculation, vacancy, city comparison |
| 5 | `assicurazione-sanitaria-studenti-internazionali-italia-2026` | students | Health insurance: SSN €700/year, TEAM card, ASL offices, hospitals, university services |
| 6 | `budget-mensile-studente-torino-2026` | students | Monthly budget: rent, food, transport (Piemove), utilities, SIM plans, two scenarios |

## Changes per file

### 1. Create 12 markdown files (IT + EN for each article)
- `src/data/blog/content/it/<slug>.md` — Convert PDF research into natural-language markdown (sentences under 25 words, active voice, no em dashes). Include all data tables, section anchors, related articles links, and sources.
- `src/data/blog/content/en/<slug>.md` — Full English translation, same structure.

### 2. Register 6 posts in `src/data/blog/posts.ts`
Insert at top of array. Each with:
- Bilingual title, excerpt, SEO metadata, tags
- 6-8 FAQs per language drawn from the PDF data
- SEO keywords from the research
- `readTime` based on content length (~12-18 min each)
- Appropriate images from existing `/images/` assets

### 3. Update `src/data/blog/contentClusters.ts`
- Add articles 1, 2, 5, 6 to the Students "University Life" cluster satellites
- Add articles 3, 4 to the Investors "Property Investment" cluster satellites
- Add bidirectional relationships between related articles (e.g., canone concordato ↔ IMU, san-salvario-sicurezza ↔ quartieri-sicuri, budget ↔ conto-corrente)

### 4. Update `src/data/linkableContent.ts`
Add keyword entries for all 6 new slugs with appropriate trigger keywords.

### 5. Update AI search index (`supabase/functions/perplexity-search/index.ts`)
Add all 6 new articles to `JUNGLE_RENT_INDEX` with bilingual keywords and FAQs.

### 6. Cross-link existing related articles
Add "Articoli correlati" links in existing articles that reference these new topics (e.g., san-salvario-guida-studenti, quartieri-sicuri, IMU, cedolare-secca).

## Files changed

| File | Action |
|------|--------|
| `src/data/blog/content/it/san-salvario-sicurezza-dati-reali-2026.md` | Create |
| `src/data/blog/content/en/san-salvario-sicurezza-dati-reali-2026.md` | Create |
| `src/data/blog/content/it/torino-notte-guida-sicurezza-studenti.md` | Create |
| `src/data/blog/content/en/torino-notte-guida-sicurezza-studenti.md` | Create |
| `src/data/blog/content/it/canone-concordato-torino-2026-guida-completa.md` | Create |
| `src/data/blog/content/en/canone-concordato-torino-2026-guida-completa.md` | Create |
| `src/data/blog/content/it/rendimento-student-housing-torino-2026.md` | Create |
| `src/data/blog/content/en/rendimento-student-housing-torino-2026.md` | Create |
| `src/data/blog/content/it/assicurazione-sanitaria-studenti-internazionali-italia-2026.md` | Create |
| `src/data/blog/content/en/assicurazione-sanitaria-studenti-internazionali-italia-2026.md` | Create |
| `src/data/blog/content/it/budget-mensile-studente-torino-2026.md` | Create |
| `src/data/blog/content/en/budget-mensile-studente-torino-2026.md` | Create |
| `src/data/blog/posts.ts` | Add 6 post entries at top |
| `src/data/blog/contentClusters.ts` | Add to clusters + relationships |
| `src/data/linkableContent.ts` | Add 6 keyword entries |
| `supabase/functions/perplexity-search/index.ts` | Add 6 articles to index |

Due to file size limits, implementation will be split across multiple messages (2-3 articles per message).

