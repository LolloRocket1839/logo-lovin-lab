

## Piano: Correggere i 3 problemi dell'audit + sincronizzare le traduzioni

### Parte 1: Fix audit edge functions

**1. `supabase/config.toml`** — rimuovere la voce orfana `[functions.submit-investor-interest]` (righe 6-7) e aggiungere:
```toml
[functions.admin-leads]
verify_jwt = false

[functions.check-url-status]
verify_jwt = false
```

**2. `src/pages/AITesting.tsx`** — rimuovere la funzione `sendTestReport` (righe 165-188) e il bottone "Invia Report Settimanale" (righe 219-222) che chiama la edge function inesistente `weekly-ai-report`.

**3. `src/types/aiTesting.ts`** — rimuovere i 3 campi `perplexity_*` residui dall'interfaccia `AITestDbRow` (righe 34-36). Creare anche una migration per droppare le colonne `perplexity_cited`, `perplexity_context`, `perplexity_position` dalla tabella `ai_test_results`.

### Parte 2: Sincronizzazione traduzioni

L'analisi mostra disallineamenti significativi tra i file di traduzione:

| Lingua | Chiavi mancanti vs IT | Chiavi extra vs IT |
|--------|----------------------|-------------------|
| EN | 37 mancanti | 196 extra |
| DE | 270 mancanti | 67 extra |
| ES | 270 mancanti | 67 extra |
| FR | 268 mancanti | 39 extra |
| SV | 235 mancanti | 70 extra |
| ZH | 235 mancanti | 70 extra |

**Strategia:**
1. **IT è il riferimento** — tutte le chiavi presenti in IT devono esistere in tutte le lingue
2. **EN ha chiavi extra legittime** (dialoghi, CTA, accessibility) che mancano da IT → aggiungerle a IT e poi a tutte le altre lingue
3. Usare uno script Python per:
   - Unire tutte le chiavi (unione IT ∪ EN come master set)
   - Per ogni lingua mancante, generare la traduzione copiando la chiave EN come fallback (i18next usa già il fallback, ma avere le chiavi esplicite evita warning e permette traduzioni future)
   - Rimuovere chiavi extra che non esistono nel master set
4. Tradurre effettivamente le chiavi mancanti nelle rispettive lingue (DE, FR, ES, SV, ZH)

### Dettagli tecnici

- Migration SQL: `ALTER TABLE ai_test_results DROP COLUMN perplexity_cited, DROP COLUMN perplexity_context, DROP COLUMN perplexity_position;`
- Lo script di sync traduzioni processerà tutti e 7 i file locale + i file nella sottocartella `investor/`
- Le chiavi extra in EN (waitlistDialog, sellerContactDialog, investorWaitlistDialog, ecc.) verranno aggiunte a IT con testo italiano e poi propagate

### File coinvolti: ~12 file

