
# Piano: rimozione info competitor e studentati

## Obiettivo
Eliminare dall'articolo `dove-vivere-torino-studenti-politecnico` (IT e EN) le sezioni che menzionano competitor e studentati, come richiesto dagli screenshot.

---

## Contenuto da rimuovere

### 1. Sezione "Residenze universitarie e studentati" (righe 152-167 IT / 152-167 EN)
Menzioni specifiche di:
- Collegio Trinitatis
- Camplus Regio Parco
- Campus Sanpaolo
- Lista vantaggi/svantaggi degli studentati

### 2. Sezione "Canali per la ricerca privata" (righe 169-184 IT / 169-184 EN)
Menzioni specifiche di competitor:
- TurinHouse.it
- Uniplaces.com
- HousingAnywhere.com
- Immobiliare.it (sezione studenti)
- Gruppi Facebook specifici
- Agenzie immobiliari

---

## Nuova struttura della sezione

La sezione "Come trovare casa vicino al Politecnico" sara sostituita con una versione semplificata che rimanda direttamente a Jungle Rent senza menzionare competitor:

**Struttura proposta:**
1. Introduzione generale sulla ricerca casa
2. Consigli pratici per evitare truffe (mantenere)
3. CTA verso Jungle Rent come soluzione sicura

---

## File da modificare

| File | Azione |
|------|--------|
| `src/data/blog/content/it/dove-vivere-torino-studenti-politecnico.md` | Rimuovere righe 152-184, riscrivere sezione |
| `src/data/blog/content/en/dove-vivere-torino-studenti-politecnico.md` | Rimuovere righe 152-184, riscrivere sezione |

---

## Dettagli tecnici

### Testo da eliminare (IT)
```markdown
### Residenze universitarie e studentati
[...tutto il blocco fino a...]
Alcune agenzie si specializzano in affitti per studenti. Verifica sempre commissioni e servizi inclusi.
```

### Nuovo testo (IT)
```markdown
Trovare la stanza giusta a Torino richiede attenzione e pazienza. Ecco i consigli fondamentali per una ricerca sicura.
```

La sezione "Consigli pratici per evitare truffe" rimane invariata, seguita dalla sezione Mobilita gia esistente.
