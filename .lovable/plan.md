

## Piano: Da "Founders" (plurale) a "Founder" (singolare)

Ora che c'è un solo fondatore (Lorenzo Oni-Joseph), bisogna aggiornare tutti i riferimenti plurali e rimuovere Andrea Niccolaini dall'intero codebase.

### Modifiche

**1. Traduzioni — tutti i file locale** (`it.json`, `en.json`, `de.json`, `fr.json`, `sv.json`, `zh.json`, `es.json`)
- `founders.title`: singolare ("Fondatore" / "Founder" / etc.)
- `about.foundersLabel`: singolare ("Fondatore" / "Founder" / etc.)
- `about.lorenzoRole`: rimuovere "Co-" → "Fondatore & CEO" / "Founder & CEO"
- FAQ `aboutA1`: rimuovere "e Andrea Niccolaini", riformulare come "fondata da Lorenzo Oni-Joseph"

**2. About.tsx**
- Schema JSON-LD: rimuovere Andrea dal array `founder`, cambiare Lorenzo da "Co-Founder & CEO" a "Founder & CEO"
- Meta tag `company.founders`: solo "Lorenzo Oni-Joseph"
- Card fondatori: rimuovere il div di Andrea, cambiare icona da `Users` a `User`, usare `founderLabel` invece di `foundersLabel`

**3. Schema (`src/lib/schema/index.ts`)**
- Cambiare `founder` array in oggetto singolo con nome "Lorenzo Oni-Joseph" e jobTitle "Founder & CEO"

**4. Edge function MCP (`supabase/functions/mcp-server/index.ts`)**
- Rimuovere Andrea dalla lista founders, tenere solo Lorenzo come "Founder & CEO"

### File da modificare (10 file)
1. `src/i18n/locales/it.json`
2. `src/i18n/locales/en.json`
3. `src/i18n/locales/de.json`
4. `src/i18n/locales/fr.json`
5. `src/i18n/locales/sv.json`
6. `src/i18n/locales/zh.json`
7. `src/i18n/locales/es.json`
8. `src/pages/About.tsx`
9. `src/lib/schema/index.ts`
10. `supabase/functions/mcp-server/index.ts`

