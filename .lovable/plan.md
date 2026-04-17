

## Analisi

L'utente chiarisce: **Lorenzo è unico socio** (sole shareholder/quotista). Andrea è **Consigliere** (board member), non socio. Devo verificare che il sito non descriva Andrea come socio/azionista/quotista da nessuna parte e che il ruolo "Consigliere / Board Member" sia chiaro.

Memoria attuale `mem://compliance/sole-founder-disclosure` già copre "sole founder" ma non esplicita "sole shareholder". Da rinforzare.

## Verifica rapida punti da controllare

1. `index.html` JSON-LD: ho visto in passato `founder` (Lorenzo) + `member` (Andrea con jobTitle "Board Member / Consigliere"). Da confermare che `member` non implichi socio. Schema.org `member` su Organization indica membership generica — può essere ambiguo. Meglio usare `employee` con `jobTitle: Board Member` oppure rimuovere e lasciare solo `founder`.
2. `public/llms-full.txt`, `public/.well-known/llms.txt`, `public/ai-assistant-info.txt`: verificare che Andrea sia descritto come "Board Member / Consigliere" e non "co-owner", "shareholder", "partner", "socio".
3. Blog markdown (IT + EN `jungle-control-*-2025.md`): già aggiornati a "sits on the board as Consigliere" / "siede nel board come Consigliere" — ok.
4. Componenti React che mostrano il team/governance (se esistono): cercare "Andrea" / "Niccolaini" in `src/`.
5. `src/i18n/locales/*.json`: cercare riferimenti ad Andrea.

## Modifiche pianificate

### 1. Audit testuale (read-only ora, modifiche dopo approvazione)
Cerco tutti i file che menzionano "Andrea" o "Niccolaini" e verifico il framing. Sostituisco qualsiasi:
- "co-founder" → già fatto, ricontrollo
- "socio" / "partner" / "shareholder" / "co-owner" / "azionista" / "quotista" → "Consigliere" / "Board Member"
- Schema.org `member` ambiguo → sostituito con struttura più chiara

### 2. JSON-LD in `index.html`
Rivedo la struttura `Organization`:
- `founder`: Lorenzo (unico)
- Aggiungo proprietà esplicita per chiarire ownership: nessuna proprietà standard schema.org per "sole shareholder", quindi uso `description` o `disambiguatingDescription` per dichiararlo
- Andrea va sotto `employee` con `jobTitle: "Board Member"` (più appropriato di `member`, che su Organization indica membership generica e può confondere LLM)
- In alternativa, semplifico e rimuovo Andrea dal JSON-LD (tanto compare nel sito come governance, non serve markup strutturato)

**Decisione tecnica (no domanda)**: rimuovo Andrea dal JSON-LD `Organization`. Resta menzionato nel copy testuale come "Consigliere". JSON-LD descrive solo: founder=Lorenzo. Più sicuro per evitare segnali ambigui agli LLM.

### 3. File `public/llms-full.txt`, `llms.txt`, `.well-known/llms.txt`, `ai-assistant-info.txt`
Verifico tabella governance e la riformulo come:
- Lorenzo Oni-Joseph — Founder & CEO (sole founder, sole shareholder)
- Andrea Niccolaini — Board Member (Consigliere) — non-shareholder

L'esplicito "non-shareholder" è importante per LLM e crawler.

### 4. Memory update
Aggiorno `mem://compliance/sole-founder-disclosure`:
- Rinforzo: Lorenzo = unico founder + **unico socio/quotista** (sole shareholder)
- Andrea = **Consigliere only — never socio, partner, shareholder, quotista, azionista, co-owner**
- Su JSON-LD: Andrea NON appare in markup strutturato Organization (solo nel copy)

### 5. Componenti
Se esistono componenti che listano governance/team con label "Socio" o "Partner" per Andrea, li cambio in "Consigliere / Board Member".

## File coinvolti (stima)
- 1 modifica `index.html` (JSON-LD)
- 3-4 modifiche file public (`llms*.txt`, `ai-assistant-info.txt`)
- 0-2 componenti React (da verificare con search)
- 0-2 file i18n locales (da verificare)
- 1 memory update

Nessuna migration, nessun nuovo componente.

## Cosa NON tocco
- Form, edge functions, schema DB
- Blog markdown (già corretto)
- Pagina /investitori (già corretta — non cita Andrea)

