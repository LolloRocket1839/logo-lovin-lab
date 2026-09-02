# Piano: aumentare i lead venditori inbound

## Obiettivo
Aumentare il volume di venditori privati che contattano Jungle Rent spontaneamente dal sito, senza cambiare il modello di business (acquisto diretto, zero commissioni, 60-90 gg).

## Stato attuale (verificato)
- Esiste la pagina `/vendi` con simulatore di offerta e form email.
- Esiste `QuickSellerLeadDialog` per catturare email venditori.
- Esiste `ExitIntentPopup` generico, ma senza lead magnet specifico venditori.
- I lead vengono salvati su DB + Formspree e attivano notifica WhatsApp solo per sorgenti specifiche.
- Il simulatore richiede l'email **prima** di mostrare il risultato: questo è un punto di attrito.

## Modifiche proposte

### 1. Ridurre l'attrito nel simulatore di offerta
- Mostrare subito la stima dell'intervallo di offerta dopo aver scelto zona, mq e stato.
- Inserire la richiesta email solo per "salvare il report / ricevere l'offerta scritta".
- Aggiungere un secondo CTA WhatsApp diretto per chi vuole parlare subito.

### 2. Lead magnet venditore: "Guida gratuita: vendere senza agenzia a Torino"
- Creare una mini-guida PDF (oppure una pagina/email sequence) richiedendo email.
- Aggiungere un banner nella pagina venditori e nella homepage.
- Collegare l'invio alla stessa pipeline di `useLeadCapture` con `leadType: "seller"`.

### 3. CTA sticky e più punti di ingresso
- Aggiungere una barra sticky in fondo alla pagina `/vendi` (mobile e desktop) con "Ricevi la tua offerta".
- Inserire un card/banner per venditori in homepage e nel footer.
- Aggiungere CTX contestuali negli articoli del blog rivolti a proprietari/affitti.

### 4. Prova sociale nella pagina venditori
- Aggiungere una riga di trust: "Offerte inviate negli ultimi 30 giorni", "Tempo medio di chiusura", "Zero commissioni".
- Inserire una testimonianza placeholder-safe (o lasciare spazio per inserirla quando disponibile).

### 5. Follow-up per simulatore abbandonato
- Se l'utente interagisce col simulatore ma non lascia email, salvare localmente i dati.
- Mostrare un modal leggero al prossimo ritorno: "Hai iniziato una valutazione. Vuoi completarla?".

### 6. Tracciamento conversioni
- Aggiungere eventi analytics per ogni step: `simulator_started`, `simulator_completed`, `simulator_email_saved`, `seller_dialog_opened`, `seller_guide_downloaded`.
- Così si capisce dove si perdono gli utenti.

## Cosa NON cambiamo
- Non tocchiamo il Seller Radar outbound (admin/scraper): l'utente ha scelto inbound.
- Non aggiungiamo costi pubblicitari o integrazioni esterne a pagamento.
- Non modifichiamo il modello di offerta o i criteri di qualificazione.

## Deliverables
1. `QuickOfferSimulator.tsx` rivisto con offerta visibile prima dell'email.
2. Nuovo componente `SellerLeadMagnet` + banner in homepage/footer.
3. Nuovo componente `SellerStickyCta`.
4. Nuova sezione social proof in `Sellers.tsx`.
5. Aggiornamento traduzioni per le nuove stringhe IT/EN/ES/FR/DE/SV/ZH.
6. Eventi analytics per il funnel venditore.

## Success metric
- Aumentare il tasso di conversione `visitatori pagina vendi → lead venditore` entro 2-4 settimane dalla pubblicazione.
