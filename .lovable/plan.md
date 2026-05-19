# Canale WhatsApp per alert critici GSC

## Obiettivo
Quando `gsc-index-monitor` rileva alert di severità **critical** (errori sitemap, nuovi errori su sitemap esistenti), spedire — oltre all'email — un messaggio WhatsApp di alert al numero admin. I `warn` (warning aumentati, calo URL >5%) restano solo email per evitare rumore.

## Componenti

| Componente | Modifica |
|---|---|
| `supabase/functions/gsc-index-monitor/index.ts` | Aggiungere funzione `sendWhatsAppAlert(alerts, curr)` che invia messaggio CallMeBot se ci sono alert `critical`. Chiamata dopo `sendAlertEmail`, fire-and-forget, errori loggati ma non bloccanti. Risultato esposto nel JSON di risposta come `whatsappSent`. |
| Secrets riutilizzati | `WHATSAPP_NOTIFY_NUMBER` + `CALLMEBOT_API_KEY` (gli stessi già usati da `notify-investor-whatsapp` — nessun nuovo secret). Se mancanti: skip silenzioso con `console.warn`, nessun errore. |
| `src/pages/admin/Seo.tsx` | Mostrare badge "📱 WhatsApp inviato" nel banner di risultato snapshot quando `whatsappSent === true`. |

## Formato messaggio WhatsApp
```
🚨 GSC Alert — junglerent.it
{N} errori critici rilevati

• {alert.message}
• {alert.message}

Totali: {errors} err / {warnings} warn / {submitted} URL
🔗 https://search.google.com/search-console
```
Max 3 alert nel messaggio (gli altri sono nell'email completa). Tronca a 1000 char.

## Dettagli tecnici
- Nessuna nuova tabella, nessuna migration.
- CallMeBot URL: `https://api.callmebot.com/whatsapp.php?phone=...&text=...&apikey=...` (GET).
- Logging: insert in `email_send_log` con `template_name = 'whatsapp-gsc-alert'` per tracciare send.
- Solo `severity === 'critical'` triggera WhatsApp. `warn` → solo email.

## Caveat CallMeBot
La APIKEY CallMeBot al momento **non è ancora arrivata** (Bot 2 in attesa). Il codice è pronto: appena salvi `CALLMEBOT_API_KEY` nei secrets, gli alert WhatsApp partono al prossimo snapshot. Senza secret = skip silenzioso, email continuano a funzionare.

Se CallMeBot continua a non rispondere, possiamo sostituire questa funzione con Telegram in 5 minuti (stesso punto di chiamata, cambia solo la `sendWhatsAppAlert`).
