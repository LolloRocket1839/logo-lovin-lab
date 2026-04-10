

## Piano: Rimuovere Perplexity e pulire il codebase

### Cosa viene rimosso

**Componenti frontend:**
- `src/components/AISearchBox.tsx` — eliminare il file
- `src/assets/perplexity-logo.svg` — eliminare il file

**Edge functions (eliminare + undeploy):**
- `supabase/functions/perplexity-search/` — ricerca AI
- `supabase/functions/cleanup-perplexity-cache/` — pulizia cache
- `supabase/functions/rent-prices-update/` — aggiornamento prezzi via Perplexity

**Config (rimuovere blocchi):**
- `supabase/config.toml` — rimuovere le 3 sezioni `[functions.perplexity-search]`, `[functions.cleanup-perplexity-cache]`, `[functions.rent-prices-update]`

**Database (migration):**
- Eliminare tabella `perplexity_cache`

**Traduzioni — rimuovere blocco `aiSearch` da tutti e 7 i locale:**
- `it.json`, `en.json`, `de.json`, `fr.json`, `sv.json`, `zh.json`, `es.json`

### Cosa viene aggiornato (pulizia riferimenti)

**`src/pages/Blog.tsx`:**
- Rimuovere import `AISearchBox`, `aiSearchRef`, `handleTryAISearch`
- Rimuovere la sezione che renderizza `<AISearchBox />`
- Rimuovere il pulsante "Prova la ricerca AI" nel fallback zero-results

**`src/components/FAQSection.tsx`:**
- Rimuovere import e rendering di `<AISearchBox />`

**`src/components/InfoDrawerContent.tsx`:**
- Rimuovere il lazy import e la sezione `<Suspense>` con `<AISearchBox />`

**`src/data/aiTestingQueries.ts`:**
- Rimuovere il campo `perplexity` dall'interfaccia `TestResult`

**`src/types/aiTesting.ts`:**
- Rimuovere `perplexity` da `TestResult` e i campi `perplexity_*` da `DBTestResult`

**`src/pages/AITesting.tsx`:**
- Rimuovere tutte le reference a Perplexity nel form/export

**`src/data/investorZoneData.ts`:**
- Aggiornare il commento source (rimuovere "Perplexity research")

### Cosa NON viene toccato
- Il connector Perplexity e il secret `PERPLEXITY_API_KEY` restano (non causano problemi, possono essere disconnessi manualmente dal pannello Connectors)
- `src/integrations/supabase/types.ts` — si aggiorna automaticamente dopo la migration

### File da modificare/eliminare: ~18 file

