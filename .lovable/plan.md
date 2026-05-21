## Obiettivo

Riscrivere l'articolo "Real life Monopoly" (IT + EN) togliendo i due tic che lo fanno suonare AI:

1. **Trattini lunghi (—)** — 9 in ciascun file. Sostituiti con virgole, due punti, parentesi o frasi separate.
2. **Costruzioni "Non X, ma Y" e doppie negazioni** — pattern tipico dei modelli linguistici. Riformulati in positivo dove possibile.

## File toccati

- `src/data/blog/content/it/real-life-monopoly-passaggio-generazionale-immobiliare-2026.md`
- `src/data/blog/content/en/real-life-monopoly-passaggio-generazionale-immobiliare-2026.md`

## Esempi di riscrittura (IT)

| Prima | Dopo |
|---|---|
| "è già cominciata — e cosa significa" | "è già cominciata, e cosa significa" |
| "Non case qualsiasi: in larga parte abitazioni grandi" | "Sono in larga parte abitazioni grandi" |
| "Non è un dato isolato" | "Il dato trova conferma altrove" |
| "fermi — non abitati, non affettati, non manutenuti" | "fermi: vuoti, sfitti, lasciati senza manutenzione" |
| "non sempre trovano chi sappia rimetterle in funzione" | "raramente trovano chi sa rimetterle in funzione" |
| "Qui si inserisce il nostro modello, e non per caso" | "Qui si inserisce il nostro modello, con una ragione precisa" |
| "Non è speculazione sulla rivendita. È gestione attiva" | "È gestione attiva di un asset reale, non un'operazione di rivendita" |
| "lo slogan — *Real life Monopoly* — non è solo un'immagine" | "lo slogan *Real life Monopoly* descrive esattamente questo" |
| "Non per cavalcare un'onda speculativa, ma per fare un lavoro" | "L'obiettivo non è cavalcare un'onda speculativa: è fare un lavoro" → meglio: "L'obiettivo è fare un lavoro che il mercato lascia scoperto" |
| "non significano 2.720 miliardi di opportunità" | "valgono molto meno in termini di opportunità reali" |

Stesso trattamento su EN (em-dashes → virgole/due punti; "It's not X, it's Y" → frasi affermative dirette).

## Cosa NON cambia

- Dati, fonti, citazioni (Sole 24 Ore, UBS, Piketty, 40.000 studenti, €480/mese).
- Struttura sezioni e ancore (`{#intro}`, `{#dato}`, ecc.).
- Tagline "Real life Monopoly" e firma finale Jungle Rent S.r.l.
- Conformità: zero cifre/percentuali di rendimento Jungle Rent, già a posto.

Procedo a riscrivere entrambi i file in build mode.
