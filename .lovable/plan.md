

# Fix visual bug + sync AI search index with all blog articles

## Problems identified

1. **Visual bug**: `BottomNav.tsx` line 130 shows `"infoinfoinfo(:"` as the drawer title instead of a proper label (visible in screenshot).

2. **AI search broken for newer articles**: The `JUNGLE_RENT_INDEX` in `supabase/functions/perplexity-search/index.ts` is hardcoded with ~20 old articles. It's missing ~15 newer articles (contratti-locazione, codice-fiscale, conto-corrente, IMU 2026, quartieri-sicuri, cedolare-secca, etc.). When a user queries "Secure neighbourhood", no local match is found, Perplexity is called, and if it fails the user sees the error.

## Changes

### 1. Fix BottomNav drawer title (`src/components/layout/BottomNav.tsx`)
- Replace `"infoinfoinfo(:"` with the proper i18n key (likely `t("info.title")` or similar label like "Informazioni").

### 2. Add all missing articles to edge function index (`supabase/functions/perplexity-search/index.ts`)
Add entries for these missing slugs to `JUNGLE_RENT_INDEX`:
- `contratti-locazione-morosita-italia-2026`
- `codice-fiscale-studenti-stranieri-torino-2026`
- `conto-corrente-studenti-stranieri-italia-2026`
- `imu-2026-immobili-affitto-torino-investitori`
- `irpef-vs-cedolare-secca-2026-investitori`
- `quartieri-sicuri-studenti-internazionali-torino-2026`
- `vendere-immobile-investitori-torino`
- `contratto-studenti-affitto-breve-strategia`
- `comodato-cedolare-secca-aidc-2025`
- `guida-investitori-stranieri-comprare-casa-torino`
- `eventi-torino-maggio-2026`, `eventi-torino-aprile-2026`, `eventi-torino-marzo-2026`
- `torino-citta-campus-atenei-immobiliare-2026`
- `torino-citta-7-minuti-walkability`
- `cedolare-secca-2026-investitori`
- `sciopero-trasporti-italia-gennaio-2026`
- `props-gestione-immobiliare-semplificata`
- `palestre-torino-studenti-guida-completa`
- `emergenze-affitti-torino-diritti-inquilini`
- `valutazione-immobiliare-torino-guida-completa`
- `panettoni-pandori-torino-guida-2025`
- `viaggiare-sostenibile-torino-guida`
- `carnevale-ivrea-battaglia-arance-2026`

Each entry includes: slug, type, category, bilingual keywords/title/excerpt, url, and FAQ entries for key articles.

### 3. Lower local match threshold for better recall
Currently the threshold to use local content is `topScore >= 0.8` (line 601). Lower it to `0.5` so that partial matches (like "secure neighbourhood" → quartieri-sicuri) return local content instead of falling through to Perplexity.

## Files changed

| File | Action |
|------|--------|
| `src/components/layout/BottomNav.tsx` | Fix drawer title |
| `supabase/functions/perplexity-search/index.ts` | Add ~20 missing articles + FAQs to index, lower threshold |

