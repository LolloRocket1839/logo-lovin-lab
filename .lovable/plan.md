## Obiettivo
Attivare le notifiche WhatsApp istantanee a Lorenzo quando arriva un nuovo lead investitore, usando CallMeBot (gratis, nessun account).

## Stato attuale
- Edge function `supabase/functions/notify-investor-whatsapp/index.ts` — già creata e deployata
- `src/hooks/useLeadCapture.ts` — già la invoca in parallelo a `send-transactional-email` quando `leadType === "investor"`
- `QuickInvestorLeadDialog` e `InvestorExitIntentPopup` — già aggiornati col post-submit "Talk to Lorenzo"
- Mancano solo 2 secrets per chiudere il cerchio

## Passi

### 1. Setup CallMeBot (lato Lorenzo, 2 minuti)
- Salvare in rubrica `+34 644 51 95 23`
- Inviare via WhatsApp: `I allow callmebot to send me messages`
- Attendere risposta con `APIKEY` numerica

### 2. Salvare i secrets in Lovable Cloud
- `WHATSAPP_NOTIFY_NUMBER` → numero E.164 di Lorenzo (es. `+393331234567`)
- `CALLMEBOT_API_KEY` → la APIKEY ricevuta da CallMeBot

### 3. Verifica end-to-end
- Test della edge function con `supabase--curl_edge_functions` passando un payload fittizio
- Controllo log via `supabase--edge_function_logs` per confermare HTTP 200 da CallMeBot
- Submit di prova dal form `QuickInvestorLeadDialog` in preview per validare il flusso completo (DB insert + email admin + WhatsApp)

## Dettagli tecnici
- La function legge `WHATSAPP_NOTIFY_NUMBER` e `CALLMEBOT_API_KEY` da `Deno.env`
- Chiama `https://api.callmebot.com/whatsapp.php?phone=<num>&text=<urlencoded>&apikey=<key>`
- Il messaggio include: email lead, nome, ticket size, source, UTM
- Se i secrets mancano la function logga warning e ritorna 200 (non blocca il flusso lead)

## Fallback / evoluzione futura
- Se in futuro vuoi anche scrivere automaticamente ai lead (non solo a Lorenzo), si passa a Twilio WhatsApp Business via connettore Lovable — nessuna riscrittura, basta sostituire la chiamata HTTP dentro la stessa edge function
