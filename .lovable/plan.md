

# Add two new investor blog articles

## Article 1: "Contratto studenti + affitto breve estivo"
Dual-season rental strategy guide: student contracts (cedolare secca 10%) during academic year + short-term tourist rentals (21%) in summer. Covers legal basis (L. 431/1998, D.L. 50/2017), CIN requirements, SCIA, safety regulations, Turin tourist tax rates, and a complete operational checklist. Category: investors. ~15 min read.

## Article 2: "Comodato e cedolare secca: il caso AIDC 2025"
Technical legal analysis of why comodatari cannot use cedolare secca on long-term leases (only ≤30 days per D.L. 50/2017), plus the 2025 AIDC Norma 233 doctrinal challenge. Category: investors (societá subcategory fits but investors is the correct match). ~12 min read.

## Changes per article (×2)

### 1. Create IT markdown
Rewrite PDF content into natural Italian blog style (sentences <25 words, active voice, no em dashes, sentence case headings). Add internal links to cedolare secca, investire real assets, guida investitori stranieri articles.

### 2. Create EN markdown
Full English translation, same structure and internal links.

### 3. Register in `posts.ts`
Insert at positions 0-1 (most recent). 10 FAQs per language each.

**Article 1:**
- `slug: "contratto-studenti-affitto-breve-strategia"`
- `category: "investors"`, `date: "2026-03-07"`, `readTime: 15`
- `image: "/images/quartieri-studenti-torino.jpg"`
- SEO keywords: "contratto studenti torino", "affitto breve estivo", "cedolare secca 10% 21%", "CIN affitti brevi", "strategia doppia stagione"

**Article 2:**
- `slug: "comodato-cedolare-secca-aidc-2025"`
- `category: "investors"`, `date: "2026-03-07"`, `readTime: 12`
- `image: "/images/mortgage-investment.jpg"` (reuse)
- SEO keywords: "comodato cedolare secca", "AIDC norma 233", "società semplice cedolare secca", "diritto reale godimento", "locazioni brevi comodatario"

### 4. Update `contentClusters.ts`
Add both slugs to Investors cluster satellites. Add relationships:
- Both → `cedolare-secca-2026-investitori` (high, bidirectional)
- Article 1 → `guida-investitori-stranieri-comprare-casa-torino` (high, bidirectional)
- Article 1 → Article 2 (high, bidirectional)

### 5. Update `linkableContent.ts`
Add enhanced keyword entries for both slugs.

## Files changed

| File | Action |
|------|--------|
| `src/data/blog/content/it/contratto-studenti-affitto-breve-strategia.md` | Create |
| `src/data/blog/content/en/contratto-studenti-affitto-breve-strategia.md` | Create |
| `src/data/blog/content/it/comodato-cedolare-secca-aidc-2025.md` | Create |
| `src/data/blog/content/en/comodato-cedolare-secca-aidc-2025.md` | Create |
| `src/data/blog/posts.ts` | Add 2 post entries at top |
| `src/data/blog/contentClusters.ts` | Add to investors cluster + relationships |
| `src/data/linkableContent.ts` | Add enhanced keywords for both |

