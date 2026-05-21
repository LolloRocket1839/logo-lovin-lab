## Obiettivo

Rimuovere ogni riferimento a **yield/rendimenti percentuali specifici riferiti agli immobili Jungle Rent** sulle superfici pubbliche, conformemente alla regola core "Mai cifre o percentuali pubblicamente: solo nel memorandum post-qualifica". I rendimenti sono indicativi e non garantiti.

## Violazioni trovate (superfici pubbliche)

### Critiche — riferite a Jungle Rent come promessa di rendimento

1. **CTA homepage `investors.startInvestingB`** in tutte e 7 le lingue:
   - `it.json:505` "Vedi rendimenti reali (8–12% annuo)"
   - mirror in `en.json`, `es.json`, `fr.json`, `de.json`, `sv.json`, `zh.json`
2. **Business plan / about (`about.businessPlan.opportunity.body`)** — `it.json:781` e `en.json:781`:
   - "Yield lordi sull'affitto studentesco **superiori al 10%** nelle zone più efficienti"
   - (verificare anche es/fr/de/sv/zh se la chiave esiste — ricordo che il sottoalbero `investor.landing.*` è oggi assente in quelle lingue, ma `about.businessPlan` potrebbe esserci)
3. **`about.businessPlan.opportunity.body` (dual-season)** — `it.json:785` / `en.json:785`:
   - "aumenta il **yield netto** rispetto al solo studentesco" — non c'è numero, ma il termine "yield" può essere addolcito ("rendimento atteso", "ricavo").
4. **Prompt content generation** `public/resources/content-generation-prompt.md:10`:
   - "rendimenti netti **8–12% annui**" → questo prompt alimenta l'AI che scrive i blog: il numero si propaga.
5. **`src/constants/contacts.ts:73`** — template WhatsApp menziona "ROI previsto e rendimenti" come argomento di chiamata: ok parlarne in privato, ma il testo del template appare anche come stringa pubblica? Verifico.

### Non critiche (NON da toccare, contesto diverso)

- `±5-12%` nei disclaimer del **valutatore immobiliare** → margine di errore valutazione, non yield.
- `propertyCoefficients.ts` (+12%, -10%) → coefficienti di adeguamento prezzo immobile, non yield.
- "12,6% della domanda coperta" → student housing demand, non rendimento.
- `TerminiCondizioni.tsx:156` → contiene già il disclaimer "stime e non garantiti", lo lasciamo.
- Blog editoriale `rendimento-student-housing-torino-2026.md` → analisi di mercato Torino generale, citata con fonti (Wikicasa, Idealista, OMI). **Borderline**: non promette rendimenti Jungle Rent, parla del mercato. Propongo di lasciarlo (è contenuto educativo SEO con fonti), ma posso aggiungere un box di disclaimer "questi sono dati di mercato, non rendimenti Jungle Rent" se preferisci.

## Fix proposti

### Fix 1 — CTA `investors.startInvestingB` (7 lingue)

Riformulazione neutra, allineata alla policy:
| Lingua | Da | A |
|---|---|---|
| IT | "Vedi rendimenti reali (8–12% annuo)" | "Vedi come funziona l'investimento" |
| EN | "See real returns (8–12% annual)" | "See how the investment works" |
| ES | "Ver rendimientos reales (8–12% anual)" | "Ver cómo funciona la inversión" |
| FR | "Voir les rendements réels (8–12% par an)" | "Voir comment fonctionne l'investissement" |
| DE | "Reale Renditen ansehen (8–12% jährlich)" | "So funktioniert die Investition" |
| SV | "Se verkliga avkastningar (8–12% årligen)" | "Se hur investeringen fungerar" |
| ZH | "查看真实收益（年化8–12%）" | "了解投资如何运作" |

### Fix 2 — `about.businessPlan.opportunity.body` (IT + EN, e altre lingue se la chiave esiste)

| Da | A |
|---|---|
| "Yield lordi sull'affitto studentesco superiori al 10% nelle zone più efficienti, stabilizzati dalla domanda inelastica." | "L'affitto studentesco nelle zone target genera ricavi stabilizzati dalla domanda inelastica. Le proiezioni economiche puntuali sono nel memorandum informativo." |
| (EN) "Gross student-rental yields above 10% in the most efficient areas…" | "Student-rental income in target areas is stabilized by inelastic demand. Exact economic projections are shared in the information memorandum." |

### Fix 3 — `about.businessPlan` dual-season body

| Da | A |
|---|---|
| "…aumenta il yield netto rispetto al solo studentesco." | "…ottimizza l'occupancy e il ricavo complessivo rispetto al solo studentesco." |
| (EN) "…increases net yield versus a student-only strategy." | "…optimizes occupancy and overall income versus a student-only strategy." |

### Fix 4 — `public/resources/content-generation-prompt.md`

| Da | A |
|---|---|
| "…li gestiamo per investitori privati con rendimenti netti 8–12% annui." | "…li gestiamo per investitori privati. Le proiezioni di rendimento sono comunicate caso per caso nel memorandum informativo." |

Riga 43 ("scroll 8–12%") parla di scroll depth metrics interne → la lascio (non è una promessa di rendimento).

### Fix 5 — `src/constants/contacts.ts:73`

Verifico se il template è user-facing. Se sì, sostituisco "ROI previsto e rendimenti" con "Come funziona il modello di investimento". Se è solo un commento interno al codice → lo lascio.

## Memoria

Aggiungo una memoria progetto **`mem://compliance/no-public-yield-figures`** con la regola:
> Mai yield/rendimenti percentuali specifici riferiti a immobili Jungle Rent su superfici pubbliche (sito, CTA, copy, prompt AI). Sono ammessi: yield di mercato Torino in contenuti editoriali blog **se citate fonti terze** (OMI, Idealista, Wikicasa) e contestualizzati come dati di mercato. Le proiezioni Jungle Rent vivono solo nel memorandum informativo post-qualifica.

E aggiorno l'indice memoria.

## File toccati

- `src/i18n/locales/{it,en,es,fr,de,sv,zh}.json` (CTA + business plan dove esiste)
- `public/resources/content-generation-prompt.md`
- `src/constants/contacts.ts` (condizionale, da verificare in build)
- `mem://compliance/no-public-yield-figures` (nuova)
- `mem://index.md` (aggiornato)

## Fuori scope

- Articoli blog su rendimenti di mercato Torino (con fonti): non toccati. Posso fare un secondo giro se vuoi un disclaimer in cima.
- Disclaimer e termini condizioni: già conformi.

Confermi e procedo? Vuoi che includa anche un sweep sul blog editoriale?
