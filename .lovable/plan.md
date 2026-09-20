# Consenso privacy uniforme su tutti i moduli

## Situazione attuale
Tutti e tre i moduli hanno già una casella di consenso obbligatoria, ma con testi diversi:

- Vendi: "Acconsento al trattamento dei dati da parte di Jungle Rent S.r.l. per ricontattarmi in merito alla valutazione." + link Informativa privacy
- Investitori: "Ho letto e accetto l'informativa privacy (GDPR)." (senza link)
- Studenti: "Acconsento al trattamento dei miei dati secondo la privacy policy" + link

Anche i messaggi di errore sono diversi ("Serve il consenso per poterti ricontattare", "Devi accettare l'informativa privacy", "Consent is required").

## Cosa faccio
Un solo testo di consenso e un solo messaggio di errore, identici sui tre moduli, in italiano e inglese, sempre con link cliccabile all'informativa privacy.

Testo unico:
- IT: "Acconsento al trattamento dei miei dati personali da parte di Jungle Rent S.r.l. per essere ricontattato. Informativa privacy"
- EN: "I consent to Jungle Rent S.r.l. processing my personal data to contact me back. Privacy notice"

Errore unico:
- IT: "Devi accettare l'informativa privacy per continuare"
- EN: "You must accept the privacy notice to continue"

Allineo anche l'aspetto: casella allineata in alto, testo piccolo grigio, link sottolineato, errore in rosso sotto la casella.

## Cosa NON cambia
- Nessun campo aggiunto o rimosso, nessuna seconda casella.
- La dichiarazione aggiuntiva "iniziativa propria" del modulo investitori resta com'è.
- Nessuna modifica a layout delle pagine, invio, salvataggio dati o email.

## Dettagli tecnici
- Nuove chiavi condivise `common.consent.label` / `common.consent.error` in `src/i18n/locales/it.json` e `en.json`; il link privacy reso con `Trans`/segmento separato verso `/privacy`.
- Aggiorno i punti di consumo: `src/components/vendi/VendiLeadForm.tsx` (testo inline + errore), `src/components/investitori/RequestInfoForm.tsx` (label privacy + messaggio in `src/lib/validation/investorLead.ts`), `src/pages/Students.tsx` (testo inline + errore).
- `src/components/dialogs/InvestorWaitlistDialog.tsx` allineato alle stesse chiavi se ancora in uso.
- Verifica: `bunx tsc --noEmit`, `bun run build`, controllo visivo di `/vendi`, `/investitori`, `/studenti` in IT ed EN con invio bloccato senza spunta.
