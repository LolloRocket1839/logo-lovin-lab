

# Add May 2026 events blog article

## What changes

### 1. Create Italian markdown — `src/data/blog/content/it/eventi-torino-maggio-2026.md`
Convert the user-provided HTML content into markdown following the established natural language style (sentences under 25 words, active voice, no em dashes). Sections: grandi eventi (Jazz Festival, Salone del Libro, Onde), mostre (MonumenTO, GAM, MAO, OGR), concerti (TWICE, Rockin'1000, Mario Biondi, Sarah Toscano), teatro (Aladin, Lupin, Caveman, Cicchella, Teatro Regio), risorse utili, articoli correlati, fonti.

### 2. Create English markdown — `src/data/blog/content/en/eventi-torino-maggio-2026.md`
Full English translation, same structure.

### 3. Register post in `src/data/blog/posts.ts`
Insert at position 0 (most recent) with:
- `slug: "eventi-torino-maggio-2026"`
- `category: "turisti"`
- `date: "2026-03-06"`
- `readTime: 10`
- `image: "/images/torino-primavera-marzo.jpg"`
- `content: "eventi-torino-maggio-2026"`
- 10 FAQs per language covering Salone del Libro, Jazz Festival, TWICE, Rockin'1000, MonumenTO, OGR, teatro, transport
- SEO keywords: "eventi torino maggio 2026", "salone del libro 2026", "concerti torino maggio", "mostre torino maggio", etc.

### 4. Update content clusters — `src/data/blog/contentClusters.ts`
- Add `'eventi-torino-maggio-2026'` to Turin Experience satellites (after aprile)
- Add temporal chain: `{ from: 'eventi-torino-aprile-2026', to: 'eventi-torino-maggio-2026', relevance: 'high', bidirectional: true }`

### 5. Update April article related articles
Add May link at top of "Articoli correlati" in both IT and EN April markdown files.

### 6. Update linkable content — `src/data/linkableContent.ts`
Add keywords entry for `'eventi-torino-maggio-2026'`.

## Files changed

| File | Action |
|------|--------|
| `src/data/blog/content/it/eventi-torino-maggio-2026.md` | Create |
| `src/data/blog/content/en/eventi-torino-maggio-2026.md` | Create |
| `src/data/blog/posts.ts` | Add post entry at top |
| `src/data/blog/contentClusters.ts` | Add to cluster + relationship |
| `src/data/linkableContent.ts` | Add enhanced keywords |
| `src/data/blog/content/it/eventi-torino-aprile-2026.md` | Add May link |
| `src/data/blog/content/en/eventi-torino-aprile-2026.md` | Add May link |

