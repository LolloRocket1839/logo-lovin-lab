

## Piano: Generare un prompt riutilizzabile per scrivere contenuti basato sui dati

L'utente vuole un **prompt** (non codice) che possa usare per istruire un'AI a scrivere nuovi articoli del blog basandosi su ciò che funziona meglio sul sito Jungle Rent.

### Cosa farò

Analizzerò i dati che già conosco dalle sessioni precedenti:
- Top articoli per pageview e scroll depth (Savills 35%, tajarin 34%, San Salvario 28%, eventi marzo 30%)
- Articoli che NON funzionano (nightlife 8% scroll, cioccolaterie 12%, eventi gennaio 17%)
- Standard di stile già documentati in `mem://content/blog-natural-language-rewrite-standard`
- Checklist qualità in `public/resources/blog-quality-checklist.md`
- CTA contestuali tailored già definite in `inlineCTAs.ts`

### Output: 1 prompt strutturato

Creerò un prompt master in italiano (la lingua del founder) che include:

1. **Contesto** — chi è Jungle Rent, founder, audience (studenti / investitori / venditori / turisti / società)
2. **Pattern vincenti dai dati** — cosa hanno in comune gli articoli con scroll >25%:
   - Numeri specifici nel titolo (anno, prezzo, percentuale)
   - Apertura con dato concreto, non introduzione
   - Riferimenti a quartieri reali di Torino
   - FAQ in fondo (5+ domande)
   - Bilingue IT/EN parallelo
3. **Pattern perdenti da evitare** — articoli generici "guida a X" senza angolo specifico, intro vaghe, mancanza di dati locali
4. **Regole di stile** — frasi <25 parole, no em-dash, voce attiva, no frasi AI ("è importante notare", "esploreremo")
5. **Struttura output JSON** — compatibile con la edge function `auto-publish-blog` esistente (slug, title_it/en, content_it/en, faqs_it/en, keywords, tags)
6. **CTA tailored** — istruzione di scegliere variant `whatsapp` / `waitlist` / `investor` in base al topic
7. **Checklist auto-validazione** — l'AI deve verificare il proprio output contro i criteri prima di restituirlo

### Dove salvarlo

`public/resources/content-generation-prompt.md` — accanto alla checklist esistente, così è scaricabile e può essere copiato in qualsiasi tool AI (ChatGPT, Claude, o riusato nella edge function `auto-publish-blog` aggiornando il `userPrompt`).

### Opzionale (dopo approvazione)

Se vuoi posso anche aggiornare la edge function `auto-publish-blog/index.ts` per usare questo nuovo prompt più sofisticato al posto di quello attuale, così gli articoli auto-generati seguiranno questi pattern vincenti.

**File creato:** 1 file markdown (~3-4KB)
**File modificati:** 0 (a meno che tu non voglia anche aggiornare la edge function)

