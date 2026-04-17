

## Piano: rimuovere riferimenti specifici a "SFP" dal copy pubblico

### Razionale
Menzionare uno strumento finanziario specifico (SFP, art. 2346 c.c.) sulla pagina pubblica avvicina il messaggio a "offerta al pubblico di prodotto finanziario specifico". Meglio restare a un livello descrittivo generico: "strumento di partecipazione economica", "modalità di partecipazione", "strumento finanziario dedicato". Il dettaglio tecnico (SFP, regolamento, art. 2346) resta nel **memorandum informativo** consegnato dopo la call di qualifica.

### Sostituzioni di copy

**Linguaggio da bandire sulla pagina pubblica:**
- "SFP" / "Strumenti Finanziari Partecipativi" / "Participating Financial Instruments"
- "art. 2346 c.c." / "art. 26 DL 179/2012"
- "regolamento SFP"
- "serie di SFP"

**Linguaggio sostitutivo:**
- "strumento di partecipazione economica dedicato"
- "modalità di partecipazione riservata"
- "strumento finanziario riservato a investitori qualificati"
- "documentazione contrattuale" (al posto di "regolamento SFP")
- "serie dedicata all'operazione" (al posto di "serie di SFP")

### File da aggiornare

**1. `src/i18n/locales/investor/it.json` + `en.json`** — namespace `landing.*`
- **Hero**: "Investi in Jungle Rent. Con esposizione alla singola operazione immobiliare." Subhead: "Jungle Rent è una startup innovativa torinese. Acquistiamo, ristrutturiamo e gestiamo appartamenti per studenti universitari. Apriamo a un numero limitato di investitori privati la partecipazione economica al portfolio tramite uno strumento dedicato. I dettagli tecnici dello strumento sono descritti nel memorandum informativo."
- **Founder letter** §2: "Apro la partecipazione a un piccolo gruppo di investitori privati. Lo facciamo con uno strumento dedicato che allinea gli incentivi: la struttura premia chi entra presto sul singolo deal. I dettagli giuridici sono nel memorandum."
- **Thesis "Cosa stai sottoscrivendo"**: rimuovo. Sostituisco con riquadro più sobrio: "Contratto con Jungle Rent S.r.l., esposizione economica alla singola operazione del portfolio. Forma giuridica e meccanica della distribuzione: nel memorandum."
- **How it works** step 5: "Firma dell'atto di sottoscrizione presso il notaio incaricato, contestualmente al versamento."
- **How it works** step 3: rimuovo "regolamento SFP" → "documentazione contrattuale completa"
- **FAQ**: rimuovo la domanda "Che cos'è uno Strumento Finanziario Partecipativo?". Sostituisco con: **"Quale strumento finanziario viene utilizzato?"** → "Uno strumento di partecipazione economica dedicato, riservato a investitori qualificati tramite collocamento privato. La forma giuridica precisa, i diritti patrimoniali, il meccanismo di distribuzione e il regolamento sono descritti integralmente nel memorandum informativo, consegnato dopo la call di qualifica."
- **FAQ "Investo nella società o in un singolo immobile?"**: riformulo senza menzione SFP — "Il contratto è con Jungle Rent S.r.l. L'esposizione economica è alla singola operazione: ogni serie dello strumento è collegata a uno specifico deal, e il tuo ritorno dipende dalla performance di quel deal."
- **FAQ "Come vengono distribuiti i profitti?"**: rimuovo "regolamento SFP" → "La documentazione contrattuale prevede uno split economico definito caso per caso, descritto nel memorandum."
- **FAQ "Posso vedere il business plan?"**: rimuovo "regolamento SFP" dall'elenco materiali → "memorandum informativo, documentazione contrattuale, business plan, modello finanziario, verbali societari"
- **FAQ "Cosa succede se non chiudete entro settembre 2026?"**: "Questa clausola è prevista nella documentazione contrattuale" (no "regolamento SFP")
- **Tax section**: ricado descrittivo — "Gli investimenti in startup innovative possono beneficiare della deduzione IRPEF al 65% (art. 29-bis DL 179/2012, regime de minimis Reg. UE 2831/2023). L'effettiva applicabilità dipende dallo strumento utilizzato e dal profilo dell'investitore." (rimuovo "investimenti in SFP di startup innovativa")
- **Risks** "Concentrazione su singola operazione": "La serie dello strumento che sottoscrivi è esposta al risultato di un solo immobile…"
- **Risks** "Illiquidità": rimuovo "Gli SFP sono trasferibili" → "Lo strumento è trasferibile in forma privata, ma trovare un compratore è una tua responsabilità."
- **Form checkbox 2**: "Comprendo che l'investimento in strumenti finanziari di startup innovativa comporta rischi inclusi la possibile perdita totale del capitale." (no "SFP")
- **Legal disclaimer footer** §2: "Lo strumento finanziario descritto non è disponibile per sottoscrizione online. L'eventuale sottoscrizione avviene esclusivamente tramite collocamento privato…" (no "Strumenti Finanziari Partecipativi")

**2. Versione EN** — stesse sostituzioni con: "dedicated financial instrument", "contractual documentation", "series dedicated to the operation". Rimuovo l'istruzione "Italian civil code art. 2346" dalla traduzione.

**3. `public/.well-known/llms.txt` + `public/llms-full.txt` + `public/ai-assistant-info.txt`**
- Sezione investor: rimuovo "SFP", "Participating Financial Instruments", "art. 2346". Sostituisco con: "Investment in Jungle Rent S.r.l. via a dedicated financial instrument reserved to qualified investors through private placement. Each series is linked to a specific property operation. Instrument details available in the information memorandum."

**4. Componenti homepage** (`InvestorSection` mobile + desktop): se contengono "SFP" → "strumento dedicato di partecipazione".

**5. Memory**
Aggiorno `mem://compliance/investment-messaging-eoi`:
- Aggiungo regola: **"Sulle pagine pubbliche (incluse `/investitori`, llms files, schema, homepage) non menzionare mai SFP / Strumenti Finanziari Partecipativi / art. 2346 / art. 26 DL 179/2012 / 'regolamento SFP'. Usare 'strumento dedicato di partecipazione economica' / 'documentazione contrattuale' / 'serie dedicata all'operazione'. Il dettaglio tecnico vive solo nel memorandum informativo consegnato dopo la call di qualifica."**

Aggiorno Core rule in `mem://index.md`:
"Investment Model: investment in Jungle Rent S.r.l. via dedicated financial instrument, each series linked to a specific property operation. **Never name the instrument (SFP/art. 2346) on public surfaces** — only in the post-qualification memorandum. Payouts every 2 months (bimestrale)."

### Cosa NON cambio
- Memorandum informativo (PDF inviato post-qualifica): lì SFP resta, è il documento tecnico
- Disclaimer legale generale (TUF art. 94/100 può restare, è normativa generale, non strumento specifico)
- Form, edge functions, schema DB

### File coinvolti
~7 file: 2 JSON i18n investor, 3 file public, 1-2 componenti homepage, 2 file memory. Nessuna migration.

