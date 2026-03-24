

# Replace April 2026 events article with DOCX content

## What changed
The uploaded DOCX contains a significantly expanded version of the April 2026 events guide. New sections not in the current article:
- **EXPOSED Torino Photo Festival** (18 exhibitions, 9 Apr – 2 Jun)
- **Biennale Tecnologia** (15–19 Apr, Politecnico di Torino)
- **Lovers Film Festival** (16–21 Apr, 41st edition)
- **Detailed concert table** with exact dates, venues, ticket sources
- **Theatre table** with full April performing arts schedule
- **Blah Blah club listings** (11 shows with prices)
- **Easter in Turin** section (5–6 April)
- **Markets & food** (Balon, Gran Balon, 25 Aprile)
- **Museum contacts table** with phones and websites
- **Essential contacts & links table**
- Updated Messer Tulipano details (130,000 tulips, ticket prices, SOLOFIORI exhibition)
- Updated cherry blossoms with ticket prices (€6/€8/€10)

## Plan

### 1. Replace EN markdown
**File:** `src/data/blog/content/en/eventi-torino-aprile-2026.md`

Rewrite entirely from the DOCX content, converting to the site's markdown format with GFM tables, internal links to existing blog posts, and the same section structure as the DOCX (Concerts, Festivals, Exhibitions, Theatre, Nature, Easter, Markets, Contacts).

### 2. Replace IT markdown
**File:** `src/data/blog/content/it/eventi-torino-aprile-2026.md`

Full Italian translation of the new expanded content, same structure.

### 3. Update blog post metadata
**File:** `src/data/blog/posts.ts`

- Update `date` to `2026-03-25` (compiled date from DOCX)
- Add new SEO keywords: `exposed torino photo festival`, `biennale tecnologia`, `lovers film festival`, `blah blah torino`
- Update FAQs to include new events (EXPOSED, Biennale Tecnologia, Lovers FF)
- Keep existing FAQs that are still relevant, replace/expand others

### 4. Update linkable content keywords
**File:** `src/data/linkableContent.ts`

Add new trigger keywords for auto-linking: `exposed photo festival`, `biennale tecnologia`, `lovers film festival`.

### Files involved

| File | Action |
|------|--------|
| `src/data/blog/content/en/eventi-torino-aprile-2026.md` | Replace with expanded DOCX content |
| `src/data/blog/content/it/eventi-torino-aprile-2026.md` | Replace with Italian translation |
| `src/data/blog/posts.ts` | Update date, keywords, FAQs |
| `src/data/linkableContent.ts` | Add new auto-link keywords |

