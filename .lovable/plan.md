## Nuovo articolo blog: "Real life Monopoly"

Aggiunge un articolo a tesi macro sul passaggio generazionale immobiliare italiano (2.720 mld €) come contesto per il modello Jungle Rent. Nessuna cifra di rendimento Jungle Rent — solo dati di mercato con fonti terze, quindi pienamente conforme alla policy "No Public Yield Figures".

### Categoria e posizionamento

- **Category:** `investors` (tesi macro + bridge al modello JR; rilevante anche per seller ma il taglio è investor-thesis)
- **Slug IT:** `real-life-monopoly-passaggio-generazionale-immobiliare-2026`
- **Data:** `2026-05-21`
- **Autore:** Jungle Rent Team
- **Read time:** ~7 min
- **Tags IT:** Investitori, Mercato, Passaggio generazionale, Torino, Immobiliare
- **Image:** riuso `/images/mortgage-investment.jpg` (già usato per articoli investor)

### File da creare

1. `src/data/blog/content/it/real-life-monopoly-passaggio-generazionale-immobiliare-2026.md`
   - Corpo dell'articolo come fornito dall'utente, leggermente ristrutturato in heading H2/H3 con anchor (es. `{#dato}`, `{#problema}`, `{#tesi-jr}`) per coerenza con gli altri post.
   - Sezione fonti in fondo già presente.
   - Rimossa la frase finale "Aggiungi articolo" (testo di istruzione, non contenuto).

2. `src/data/blog/content/en/real-life-monopoly-passaggio-generazionale-immobiliare-2026.md`
   - Traduzione fedele in inglese, stesso slug, stesso schema heading.

3. Voce in `src/data/blog/posts.ts` con `translations.it` e `translations.en`, includendo SEO meta, excerpt, tags e 5 FAQ:
   - "Quanto vale il patrimonio immobiliare in transizione generazionale in Italia?"
   - "Quale percentuale del patrimonio immobiliare italiano è vuota o sottoutilizzata?"
   - "Cosa succede agli immobili ereditati in Italia?"
   - "Perché Torino è strategica in questo scenario?"
   - "Come Jungle Rent si inserisce in questo trend?"

### SEO (IT)

- **Title:** "Real life Monopoly: 2.720 miliardi di immobili in transizione | Jungle Rent" (<60 char target)
- **Description:** "Metà delle case italiane è in mano agli over 70: 2.720 miliardi di patrimonio sta per cambiare mano. Perché conta, e come si rimette a reddito un appartamento sottoutilizzato a Torino." (<160)
- **Keywords:** passaggio generazionale immobiliare, eredità immobiliare Italia 2026, case vuote Italia, patrimonio immobiliare anziani, ridistribuzione immobiliare, student housing Torino

### SEO (EN)

- **Title:** "Real life Monopoly: €2.72T of Italian property in transition"
- **Description:** "Half of Italian homes are owned by people in their 70s: €2.72 trillion of property is about to change hands. Why it matters, and how an underused Turin flat returns to use."

### Compliance check

- Nessuna cifra/% di rendimento Jungle Rent menzionata ✓
- Dati di mercato con fonti citate (Il Sole 24 Ore, UBS, IRES Piemonte) ✓
- Linguaggio "gestione attiva di un asset reale", "non speculazione sulla rivendita" ✓
- Lorenzo come unico founder/socio non viene contraddetto (l'articolo non nomina founder) ✓
- Sentence case, H1 unico (titolo) ✓

### Out of scope

- Niente traduzione in es/fr/de/sv/zh (i contenuti blog vivono solo in IT/EN come gli altri post)
- Niente nuova immagine generata (riuso asset esistente)
- Niente modifica a `contentClusters.ts` o `searchIndex.ts` salvo che non risultino necessari (verifico durante l'implementazione e li aggiorno se servono per non rompere search/cluster)
- Niente inline-CTA personalizzato in `inlineCTAs.ts` per ora (può seguire in un secondo round)
