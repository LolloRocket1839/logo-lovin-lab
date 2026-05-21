## Obiettivo

1. Eseguire un audit completo delle traduzioni in tutte le lingue del progetto.
2. Creare una **skill** (`i18n-translation-check`) che permetta a qualsiasi futura sessione di rieseguire lo stesso controllo in un comando.

## Stato attuale rilevato

- Locali principali: `src/i18n/locales/{it,en,es,fr,de,sv,zh}.json` (7 lingue, IT reference).
- Locali investor: `src/i18n/locales/investor/{it,en,es,fr,de,sv,zh,pt}.json` (8 lingue, include **pt** che manca nel set principale).
- Script esistente `scripts/validate-translations.js`:
  - **rotto** (`require` in scope ESM perché `package.json` ha `"type":"module"`),
  - **non controlla** la cartella `investor/`,
  - **non controlla** stringhe vuote o uguali a IT (= non tradotte),
  - **non gestisce** il bundle `pt` di investor.

## Cosa farò

### Step 1 — Fix + estensione del check (script unico)

Sostituire `scripts/validate-translations.js` con `scripts/validate-translations.mjs` (ESM nativo, compatibile col `package.json`) che per **ogni bundle** (`main` e `investor`):

- estrae le chiavi flatten con dot-notation;
- confronta ogni lingua vs IT e segnala **chiavi mancanti** e **chiavi extra**;
- segnala **valori vuoti**;
- segnala **valori identici alla stringa IT** (probabile traduzione mancata) — esclusioni: brand `Jungle Rent`, `Lorenzo`, `WhatsApp`, numeri, URL;
- ritorna **exit code 1** se trova mismatch (utile in CI / GitHub Actions).

Aggiornare `package.json` script:
```json
"validate:translations": "node scripts/validate-translations.mjs"
```

Il vecchio `.js` viene rimosso (workflow `.github/workflows/test.yml` resta valido se chiama lo script npm).

### Step 2 — Eseguire l'audit e riportare i risultati

Lancio `node scripts/validate-translations.mjs` e riporto in chat un riassunto: per ogni lingua e bundle, numero di chiavi mancanti / extra / vuote / sospette, con esempi.

### Step 3 — Creare la skill `i18n-translation-check`

Struttura:
```text
.agents/skills/i18n-translation-check/
├── SKILL.md
└── scripts/
    └── check.mjs   (copia dello script, autonomo)
```

`SKILL.md` (frontmatter + body conciso):
- **name**: `i18n-translation-check`
- **description**: "Audit traduzioni i18n del progetto Jungle Rent: confronta IT (reference) contro EN/ES/FR/DE/SV/ZH (e PT per investor), in entrambi i bundle `locales/` e `locales/investor/`. Trigger quando l'utente chiede di 'controllare traduzioni', 'sync locales', 'verificare lingue', aggiunge una nuova lingua, o modifica `it.json`."
- Procedura: 1) lanciare `node scripts/validate-translations.mjs`, 2) interpretare exit code, 3) per fix, partire sempre da IT come reference e mantenere le 8 lingue investor / 7 lingue main allineate, 4) `pt` esiste solo nel bundle investor (non aggiungerlo al main).
- Sezione "Falsi positivi noti": brand names, numeri, URL.

Poi `skills--apply_draft .agents/skills/i18n-translation-check` per attivarla.

## File toccati

- `scripts/validate-translations.mjs` (nuovo)
- `scripts/validate-translations.js` (eliminato)
- `package.json` (script npm aggiornato)
- `.agents/skills/i18n-translation-check/SKILL.md` (nuovo)
- `.agents/skills/i18n-translation-check/scripts/check.mjs` (nuovo)

## Fuori scope

- Non traduco automaticamente le chiavi mancanti in questa iterazione: prima ti mostro il report, poi decidiamo se compilarle (manualmente o via AI) in un secondo giro.
- Non tocco le memorie di progetto (la regola "IT primary, EN fallback, 7 locales" resta valida, aggiorneremo solo se confermi che `pt` deve estendersi anche al main).

Confermi e procedo?
