

## Piano: Fix errori di build + tradurre tutte le chiavi mancanti in EN, DE, ES, FR, SV, ZH

### Problema 1: Errore di build (TS1136)
I file `en.json`, `sv.json`, `zh.json` hanno un errore di parsing alla riga 317 (`aboutA1`). Probabilmente c'è un carattere invisibile residuo dall'editing precedente (quando è stata rimossa la doppia virgola). Riscrivere le righe `aboutA1` in questi 3 file per eliminare eventuali caratteri nascosti.

### Problema 2: Testo italiano rimasto in EN
In `en.json` ci sono intere sezioni non tradotte:
- **`contacts`** (righe 202-214): "Indirizzo", "Nome", "Invia", "Grazie!", "Seguici sui social", "Parla con il nostro team", "Contatti"
- **`exitIntentDialog`** (righe 301-314): "Email non valida", "Inserisci un'email valida", "Telefono (opzionale)", "Invio...", "Ricevi una valutazione gratuita...", "Stai andando via?", ecc.

### Problema 3: Testo non tradotto in DE
In `de.json`:
- **`contacts`** (righe 200-214): tutto in italiano
- **`investorWaitlistDialog`** (righe 786-840+): tutto in inglese
- **`sellerContactDialog`** (righe 1295-1354): tutto in inglese

### Problema 4: Stesso problema in ES, FR, SV, ZH
- **`contacts`**: in italiano in ES (e probabilmente anche FR, SV, ZH)
- **`exitIntentDialog`**: in italiano in SV e ZH
- **`investorWaitlistDialog`** e **`sellerContactDialog`**: probabilmente in inglese anche in ES, FR, SV, ZH

### Azioni

1. **Fix build**: riscrivere la riga `aboutA1` in en.json, sv.json, zh.json eliminando caratteri nascosti
2. **Tradurre `contacts`** in tutte e 6 le lingue (EN, DE, ES, FR, SV, ZH)
3. **Tradurre `exitIntentDialog`** in tutte e 6 le lingue
4. **Tradurre `investorWaitlistDialog`** in DE, ES, FR, SV, ZH
5. **Tradurre `sellerContactDialog`** in DE, ES, FR, SV, ZH

### File coinvolti
- `src/i18n/locales/en.json`
- `src/i18n/locales/de.json`
- `src/i18n/locales/es.json`
- `src/i18n/locales/fr.json`
- `src/i18n/locales/sv.json`
- `src/i18n/locales/zh.json`

