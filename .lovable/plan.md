## Obiettivo

Sostituire l'immagine OG attuale (card verde con scritta "Jungle Rent") con un'immagine che mostra il **logo reale** di Jungle Rent (lo stesso usato sul sito), in modo che WhatsApp/iMessage/LinkedIn mostrino il logo quando si condivide un link.

## Cosa cambia

1. **Generare nuova `public/og-image-homepage.jpg` (1200×630)** partendo dal logo reale del sito (`src/assets/jungle-rent-logo.png`):
   - Sfondo: cream/avorio chiaro (stesso del sito) per far risaltare il logo verde
   - Logo Jungle Rent centrato, dimensione generosa (~50% larghezza)
   - Nessun testo aggiuntivo — solo il logo, pulito, "quiet luxury"
   - Format JPG 1200×630 (richiesto da WhatsApp/Facebook/iMessage)

2. **Nessuna modifica al codice** — `index.html` già punta a `/og-image-homepage.jpg`, basta sovrascrivere il file.

## Note importanti

- WhatsApp/iMessage **cachano le anteprime** per giorni. Per testare subito serve aggiungere `?v=3` all'URL condiviso, oppure usare il [WhatsApp Link Preview Debugger](https://developers.facebook.com/tools/debug/) per forzare il refresh dopo il deploy.
- Le anteprime per-articolo del blog restano un problema separato (Opzione B - prerendering) — non incluso qui.

## Domanda

Vuoi **solo il logo** su sfondo cream pulito, oppure preferisci logo + piccolo tagline "Student housing · Torino" sotto?
