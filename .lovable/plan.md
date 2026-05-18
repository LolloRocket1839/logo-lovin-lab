# Far convertire davvero gli investitori

**Diagnosi**: l'infrastruttura email funziona già (DB + `lead-notification` a `ADMIN_NOTIFICATION_EMAIL` + conferma al lead via dominio `notify.junglerent.it`). Non serve Gmail. I problemi reali sono due:

1. **Tu vieni avvisato solo via email** → reazione lenta → il lead si raffredda.
2. **Dopo il submit il lead viene "parcheggiato"** in una thank-you page → nessuna conversazione immediata.

Il piano risolve entrambi senza toccare i contenuti delle pagine.

---

## 1. Notifica WhatsApp istantanea a Lorenzo (oltre all'email)

Quando arriva un lead investitore, oltre all'email parte un messaggio WhatsApp al numero di Lorenzo con: tipo lead, email, ticket, country, fonte, link mailto e link WhatsApp pre-compilato per ricontattare il lead in un tap.

**Come**: nuova edge function `notify-investor-whatsapp` chiamata in parallelo a `send-transactional-email` dentro `useLeadCapture.ts` quando `leadType === "investor"`.

**Provider WhatsApp** — due opzioni, scegli tu:
- **CallMeBot** (gratis, 2 min di setup): mandi un messaggio "I allow callmebot to send me messages" al loro numero, ricevi una API key. Zero costi, zero account. Limite ~rate-limited ma ampiamente sufficiente per i volumi attuali. **Consigliato per partire.**
- **Twilio WhatsApp Business API**: serio, scalabile, ma richiede account Twilio + numero approvato + ~$0.005/msg. Sostituibile in futuro senza toccare il resto del codice.

Le credenziali (numero + API key) vanno nei secrets backend; mai nel frontend.

## 2. Allineare l'exit-intent investitore alla pipeline unificata

`InvestorExitIntentPopup.tsx` oggi chiama **solo Formspree** → bypassa DB e email transazionali → quei lead non triggherano notifica admin né conferma al lead. Lo faccio passare per `useLeadCapture()` come gli altri form. Zero impatto visivo.

## 3. Handoff immediato lead → Lorenzo dopo il submit

Oggi: submit → toast → chiusura dialog → thank-you page. Il lead esce dal funnel.

Nuovo flusso (dentro `QuickInvestorLeadDialog` e `InvestorExitIntentPopup`, senza cambiare i contenuti delle pagine):
dopo submit OK il dialog **non si chiude subito**, mostra uno step "fatto, ora parla con Lorenzo" con:
- bottone primario WhatsApp pre-compilato (`wa.me/<numero>?text=Ciao Lorenzo, ho appena lasciato la mia email per investire...`)
- bottone secondario "Prenota call 15 min" (link Cal.com / Calendly da incollare — dimmelo o lo lascio placeholder)
- micro-testo: "Lorenzo risponde di persona, entro poche ore"

Risultato: ogni form compilato ha la possibilità di diventare una conversazione attiva nello stesso secondo.

## 4. Mini-rafforzamenti di conversione (no contenuti nuovi)

Solo elementi che riducono attrito:
- Nel `QuickInvestorLeadDialog`: aggiungere sopra al campo email un singolo line di micro-social-proof dinamico ("Lorenzo ha già parlato con N investitori questo mese" — N letto dalla edge function `get-investor-interest-count` che esiste già).
- Sotto al pulsante submit: una riga "Risposta entro 24h · WhatsApp diretto · Nessun impegno".
- Sul bottone CTA: cambiare il testo da "Invia" a "Parla con Lorenzo" per coerenza con la Core rule del progetto.

Nessun popup nuovo, nessuna sezione nuova.

---

## Dettagli tecnici (per riferimento)

**File toccati**:
- `supabase/functions/notify-investor-whatsapp/index.ts` *(nuovo)* — input validation con Zod (email, source, leadType="investor", optional name/ticket/country), CORS, chiama CallMeBot/Twilio, logga su `email_send_log` con `template_name="whatsapp-admin-alert"` per tracking unificato.
- `src/hooks/useLeadCapture.ts` — se `leadType === "investor"`, fire-and-forget invoke a `notify-investor-whatsapp`.
- `src/components/investor/InvestorExitIntentPopup.tsx` — rimpiazza chiamata diretta Formspree con `useLeadCapture()`.
- `src/components/dialogs/QuickInvestorLeadDialog.tsx` + `InvestorExitIntentPopup.tsx` — nuovo step post-submit "WhatsApp + book a call" prima della chiusura, micro-social-proof in cima.
- Secrets nuovi: `WHATSAPP_NOTIFY_NUMBER` (numero Lorenzo formato E.164) e `CALLMEBOT_API_KEY` (oppure `TWILIO_*` se scegli Twilio).

**Niente migrations**, niente cambi RLS, niente cambi al copy SEO delle pagine.

---

## Cosa mi serve da te per partire

1. **Provider WhatsApp**: CallMeBot (gratis, parto subito) o Twilio (devi creare account)?
2. **Numero WhatsApp di Lorenzo** in formato `+39...` (lo metto nei secrets, non in codice).
3. **Link per "Book a call 15 min"** (Cal.com / Calendly / altro). Se non ce l'hai ancora, lascio fuori il bottone e usiamo solo WhatsApp.
