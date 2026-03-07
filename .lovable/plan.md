

# Add "Foreign investor's guide to buying property in Turin" blog article

## What changes

### 1. Create Italian markdown — `src/data/blog/content/it/guida-investitori-stranieri-comprare-casa-torino.md`
Rewrite the provided English content into natural Italian following blog standards (sentences under 25 words, active voice, no em dashes, engaging hooks). Structure: intro, foreigners can buy?, steps 1-6 (codice fiscale, bank account, property search, offer, compromesso, rogito), remote buying (procura), transfer taxes tables, annual taxes (IMU/TARI/IRPEF/cedolare secca), complete cost breakdown with tables, property management, why Turin, post-purchase checklist, CTA. Internal links to related articles (cedolare secca, investire real assets, valutazione immobiliare, mutui investitori).

### 2. Create English markdown — `src/data/blog/content/en/guida-investitori-stranieri-comprare-casa-torino.md`
Clean up the provided English content to match blog standards (sentence case headings, natural language rewrite, remove em dashes, add internal links). Same structure as Italian.

### 3. Register post in `src/data/blog/posts.ts`
Insert at position 0 (most recent) with:
- `slug: "guida-investitori-stranieri-comprare-casa-torino"`
- `category: "investors"`
- `date: "2026-03-07"`
- `readTime: 18`
- `image: "/images/mortgage-investment.jpg"`
- `content: "guida-investitori-stranieri-comprare-casa-torino"`
- 10 FAQs per language covering: can foreigners buy, codice fiscale, transfer taxes, cedolare secca 10%, prima casa, notaio costs, mortgage non-residents, property management, why Turin, remote purchase
- SEO keywords: "buy property turin foreigner", "comprare casa torino straniero", "codice fiscale", "cedolare secca", "transfer taxes italy", "foreign investor italy real estate"

### 4. Update content clusters — `src/data/blog/contentClusters.ts`
- Add `'guida-investitori-stranieri-comprare-casa-torino'` to Investors cluster satellites
- Add relationships:
  - `{ from: 'guida-investitori-stranieri-comprare-casa-torino', to: 'investire-real-assets-torino-2025', relevance: 'high', bidirectional: true }`
  - `{ from: 'guida-investitori-stranieri-comprare-casa-torino', to: 'cedolare-secca-2026-investitori', relevance: 'high', bidirectional: true }`
  - `{ from: 'guida-investitori-stranieri-comprare-casa-torino', to: 'mutui-investitori-immobiliari-guida-completa', relevance: 'high', bidirectional: true }`

### 5. Update linkable content — `src/data/linkableContent.ts`
Add enhanced keywords entry for `'guida-investitori-stranieri-comprare-casa-torino'` with triggers like "buy property italy", "foreign investor", "codice fiscale", "comprare casa straniero", "notaio", "rogito".

## Files changed

| File | Action |
|------|--------|
| `src/data/blog/content/it/guida-investitori-stranieri-comprare-casa-torino.md` | Create |
| `src/data/blog/content/en/guida-investitori-stranieri-comprare-casa-torino.md` | Create |
| `src/data/blog/posts.ts` | Add post entry at top |
| `src/data/blog/contentClusters.ts` | Add to investors cluster + relationships |
| `src/data/linkableContent.ts` | Add enhanced keywords |

