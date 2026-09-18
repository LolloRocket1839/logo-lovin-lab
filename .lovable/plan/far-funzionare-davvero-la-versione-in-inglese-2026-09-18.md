# Far funzionare davvero la versione in inglese

Oggi il sito ha due problemi legati all'inglese:

1. **Alcuni indirizzi in inglese non esistono e danno "pagina non trovata".** Molte pagine hanno la gemella inglese (per esempio `/about`, `/investors`, `/students`), ma altre no: blog, FAQ, privacy, Fair Rent Pledge e le pagine dedicate a vendita e investimenti esistono solo con l'indirizzo italiano. Chi arriva con un indirizzo inglese plausibile, o prova ad aggiungere `/en`, trova un errore.
2. **Anche quando l'indirizzo inglese funziona, i testi restano in italiano.** La lingua oggi dipende solo dal browser di chi visita o dalla bandierina in alto, mai dall'indirizzo. Quindi un link inglese condiviso a un'altra persona può aprirsi in italiano.

## Cosa cambia per chi visita

- Qualsiasi pagina del sito diventa raggiungibile anche con il prefisso `/en` davanti (esempio: `junglerent.it/en/vendi`), e si apre in inglese.
- Le pagine inglesi già esistenti (`/about`, `/investors`, `/students`, `/sell`, ...) si aprono direttamente in inglese, senza dover toccare la bandierina.
- Aggiungiamo la gemella inglese mancante per: blog e articoli, FAQ, privacy, Fair Rent Pledge e le quattro pagine tematiche su vendita e investimento.
- Se qualcuno arriva su un indirizzo inglese che comunque non esiste, invece dell'errore secco lo portiamo sulla pagina italiana corrispondente, e solo se proprio non esiste mostriamo la pagina di errore, con un link chiaro alla home.
- Cambiando lingua dalla bandierina, l'indirizzo nella barra si aggiorna di conseguenza, così il link condiviso mantiene la lingua.

## Dettagli tecnici

- `src/components/AnimatedRoutes.tsx`: avvolgere l'albero delle rotte in modo che accetti sia `/*` sia `/en/*`; aggiungere gli alias inglesi mancanti (`/blog`, `/blog/:slug` sotto `/en`, `/faq`, `/privacy`, `/fair-rent-pledge`, `/sell-without-agency-turin`, `/sell-house-fast-turin`, `/buy-rented-property-turin`, `/property-investment-turin`).
- Nuovo hook/componente `useUrlLanguage` montato dentro il router: se il percorso inizia con `/en` o corrisponde a un alias inglese noto, chiama `i18n.changeLanguage('en')` prima del primo render utile; per i percorsi italiani non forza nulla (resta il rilevamento attuale da localStorage/browser), così non cambia il comportamento per chi già usa il sito.
- `src/components/LanguageSwitcher.tsx`: al cambio lingua, oltre a `changeLanguage`, fare `navigate` verso l'equivalente con/senza prefisso `/en` usando una mappa alias centralizzata.
- Nuova mappa alias in `src/constants/` (it ↔ en) usata da rotte, switcher e tag `hreflang`.
- Aggiungere nel `<head>` di ogni pagina i tag `canonical` + `hreflang` it/en/x-default, oggi presenti solo nella sitemap, riusando il componente SEO esistente.
- Aggiornare `scripts/generate-sitemap.ts` e rigenerare le sitemap con i nuovi indirizzi inglesi.
- Nessuna modifica a form, lead, database o tracking.

## Verifica

- Prova automatica in anteprima su una decina di indirizzi inglesi (inclusi `/en/vendi`, `/en/blog`, `/about`, `/investors/zones/lingotto`): devono aprirsi, essere in inglese e non dare errore.
- Controllo che le pagine italiane si aprano ancora in italiano come oggi.
- Typecheck, build e validazione traduzioni/sitemap.
