

# Update March 2026 events article with complete event listings

## What's missing

The uploaded document contains ~25 events not in the current article:

**Concerts (15 missing):** Jethro Tull, Yann Tiersen, Giorgia, Achille Lauro, Angelina Mango, Olly, Claver Gold, Umberto Tozzi, André Rieu, Luchè, Tom Meighan, Gigi d'Alessio, Patagarri, Bandabardò, Note da Sogno

**Festivals (6 missing):** Seeyousound Film Festival, Festival dell'Oriente, Just The Woman I Am, Festival della Felicità, Piantala, Deejay Village

**Exhibitions (7 missing):** Vermeer at Palazzo Madama, Zanabazar at MAO, Electric Dreams + Laure Prouvost at OGR, Edward Weston at CAMERA, Hokusai at Galleria Salamon, Leonardo mostra impossibile

**Markets & Food (4 missing):** Salone del Vino, Fiera del Disco e Fumetto, Gran Balon details, Mercato Sabaudo Women's Day, Capodanno Cinese

**Nature (2 missing):** Cherry blossoms at Venaria Reale (evening openings), Castello del Valentino free guided tours

**Theatre:** Trappola per Topi (Agatha Christie)

## Changes

### 1. Rewrite IT markdown — `src/data/blog/content/it/eventi-torino-marzo-2026.md`
Expand from ~286 lines to ~500+ lines. Keep existing well-written sections (Shiota, Futurismo, Gentileschi, Mika, Renato Zero, Subsonica, Rocky, Amadeus). Add all missing events organized by category matching the uploaded document structure: Concerts table + spotlights, Festivals, Exhibitions (including Vermeer, free first Sunday, Women's Day museum deals), Markets & Food, Nature & Outdoor (cherry blossoms, Valentino castle tours), Theatre. Update the conclusion and related articles. Add new sources.

### 2. Rewrite EN markdown — `src/data/blog/content/en/eventi-torino-marzo-2026.md`
Full English translation of the expanded article, same structure.

### 3. Update post entry in `posts.ts`
- Update `date` to `"2026-03-09"` (refresh date)
- Update `readTime` to ~30 (longer article)
- Update excerpt/SEO to mention Vermeer, Seeyousound, Giorgia, cherry blossoms
- Add new FAQs covering Vermeer, Seeyousound, Festival dell'Oriente, cherry blossoms, Giorgia, free museums
- Add new SEO keywords: "vermeer torino", "seeyousound 2026", "festival oriente torino", "ciliegi venaria", "giorgia torino"

### 4. Update sitemaps
- Update `lastmod` for the March article entry in `sitemap-blog.xml` to `2026-03-09`

## Technical notes
- Follows existing natural language style (short sentences, active voice, no em dashes)
- All new event data comes directly from the uploaded document with dates, prices, venues, and contacts
- Renato Zero venue corrected: uploaded doc says Inalpi Arena (current article says Teatro Regio) — will use Inalpi Arena per the uploaded source
- Subsonica venue corrected: uploaded doc says OGR Sala Fucine (current article says Inalpi Arena) — will use OGR per the uploaded source

