

## Obiettivo
Il banner rosso in cima al sito attualmente apre un piccolo dialog (form email-only). L'utente vuole che porti invece alla **pagina completa investitori** `/investitori` (dove c'è hero, metriche, form, FAQ, ecc.).

## Modifica

**`src/components/AnnouncementBanner.tsx`**
- Rimuovere lo stato `dialogOpen` e il componente `QuickInvestorLeadDialog`
- Sostituire il `<div role="button" onClick>` con un `<Link to="/investitori">` di react-router (mantiene SPA navigation, no full reload)
- Mantenere lo stile rosso, il pallino animato, la X di chiusura
- Aggiungere tracking analytics `announcement_banner_click` con destination `/investitori` (evento già whitelist-friendly o usiamo `cta_click` esistente)
- Localizzazione: l'URL diventa `/investors` se lingua EN, `/investitori` se IT (coerente con `Investors.tsx` canonical)

## Cosa NON tocco
- Il dialog `QuickInvestorLeadDialog` resta, è usato in molti altri punti (BottomNav, StickyCTA, Navigation, MobileHeader, ecc.)
- Nessuna modifica i18n del testo del banner (resta `announcement.firstDeal`)
- Nessuna modifica DB / edge functions

## Risultato
Click sul banner rosso → naviga direttamente a `/investitori` (o `/investors` in EN), dove l'utente vede tutta la pagina investitori con hero, numeri, QuickContactBar, EmailFirstForm, FAQ, RequestInfoForm.

