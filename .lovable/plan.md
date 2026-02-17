

# Funnel venditori: dare valore per convertire

## Il problema

Oggi il sito chiede un'email al venditore senza dare nulla in cambio. Il venditore target (erede, anziano, chi ha fretta) non ha motivo per lasciare i propri dati. Manca uno scambio di valore chiaro: "tu mi dai la tua email, io ti do qualcosa di utile subito".

## La soluzione: "Scopri quanto offriamo per il tuo immobile"

Il concetto chiave e trasformare il tool di valutazione esistente in un simulatore di offerta Jungle Rent. Non "quanto vale la tua casa" (generico), ma "quanto ti offriremmo noi" (specifico e azionabile). Questo crea urgenza e curiosita.

---

## Interventi previsti

### 1. Simulatore di offerta rapida (nuovo componente)

Un componente semplice e veloce, diverso dal PropertyValuator completo, pensato per chi ha fretta. L'utente seleziona:
- Zona (dropdown con le 9 zone target)
- Metratura approssimativa (slider 30-150 mq)
- Stato (da ristrutturare / abitabile / ristrutturato)

In 3 click riceve: "Per un trilocale di 70mq in San Salvario, la nostra offerta indicativa sarebbe 65.000-75.000 euro. Vuoi ricevere un'offerta concreta?"

Il risultato e visibile SOLO dopo che l'utente inserisce l'email. Questo e il "gate": il valore (la stima) in cambio del lead.

Posizionamento: above-the-fold nella pagina `/vendi`, sostituisce la posizione attuale del SavingsCalculator nella colonna destra dell'hero.

### 2. Sezione "storie" che parlano ai venditori target

Tre scenari brevi, non testimonianze inventate, ma situazioni reali che il venditore target riconosce:

- **L'erede**: "Hai ereditato un appartamento a Torino ma vivi altrove? Gestire un immobile da lontano costa tempo, tasse e stress. Noi acquistiamo in 60-90 giorni, senza visite infinite."
- **Chi ha fretta**: "Devi vendere velocemente per un trasferimento, una separazione o necessita economica? Le agenzie impiegano 6-12 mesi. Noi facciamo un'offerta scritta in 48 ore."
- **Il proprietario stanco**: "Il tuo appartamento e sfitto da mesi? Noi acquistiamo anche immobili da ristrutturare nelle zone universitarie."

Posizionamento: nuova sezione nella pagina `/vendi`, dopo la comparison table e prima della timeline.

### 3. CTA post-valutazione nel PropertyValuator

Quando un utente completa la valutazione nel tool `/valutazione-immobile`, mostrare un banner:

"Il tuo immobile vale circa X euro. Vuoi ricevere un'offerta concreta da Jungle Rent? Acquistiamo direttamente in 60-90 giorni, senza commissioni."

Il click apre il QuickSellerLeadDialog con il valore stimato gia pre-compilato nel messaggio.

### 4. WhatsApp come CTA alternativo

Per i venditori target (anziani, eredi), WhatsApp e piu naturale di un form email. Aggiungere un bottone "Scrivici su WhatsApp" come alternativa al form, sia nella pagina `/vendi` che nel post-valutazione.

### 5. Lead form migliorato (step 2 opzionale)

Dopo l'invio dell'email, mostrare uno step 2 NON obbligatorio:
- Indirizzo o zona dell'immobile (testo libero)
- "Perche vuoi vendere?" (select: eredita / trasferimento / necessita / altro)

Questo qualifica il lead senza bloccare la conversione. Chi ha fretta salta e va al Calendly. Chi vuole puo dare dettagli.

---

## Dettagli tecnici

### File da creare
- `src/components/tools/QuickOfferSimulator.tsx` — simulatore offerta rapida con gate email (usa i dati di `turinZonePrices.ts` per calcolare range offerta nelle 9 zone target, applica un discount del 10-15% rispetto al valore OMI per simulare un'offerta realistica di acquisto diretto)

### File da modificare
- `src/pages/Sellers.tsx` — integrare QuickOfferSimulator nell'hero (al posto o accanto al SavingsCalculator), aggiungere sezione scenari venditori, aggiungere CTA WhatsApp
- `src/components/dialogs/QuickSellerLeadDialog.tsx` — aggiungere step 2 opzionale (indirizzo + motivazione vendita), accettare prop opzionale `estimatedValue` per pre-compilare il contesto
- `src/components/tools/PropertyValuator.tsx` — aggiungere banner CTA post-valutazione che apre QuickSellerLeadDialog con valore stimato
- `src/i18n/locales/it.json` — chiavi traduzione per scenari, simulatore offerta, CTA WhatsApp, step 2 form
- `src/i18n/locales/en.json` — stesse chiavi in inglese

### Sequenza di implementazione
1. QuickOfferSimulator (componente standalone con gate email)
2. Integrazione nell'hero della pagina venditori
3. Sezione scenari venditori
4. CTA WhatsApp
5. Step 2 opzionale nel lead dialog
6. CTA post-valutazione nel PropertyValuator
