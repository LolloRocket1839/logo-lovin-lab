# Aggiornare nome e link gruppo Facebook venditori

## Obiettivo
Riflettere sul sito il nuovo nome e link del gruppo Facebook "VENDI CASA - Torino Jungle", e aggiungere una descrizione della community sia come bozza per Facebook che come contenuto sulla pagina venditori.

## Modifiche proposte

### 1. Aggiornare il link del gruppo
Sostituire `FACEBOOK_SELLER_GROUP_URL` in `src/constants/social.ts` con `https://www.facebook.com/share/g/1FG1DUd3m9/?mibextid=wwXIfr`.

### 2. Aggiornare i testi dei link esistenti
Nei componenti che già puntano al gruppo (`src/pages/Sellers.tsx`, `src/components/home/SellerHomeEntry.tsx`, `src/components/layout/Footer.tsx`, `src/components/layout/MobileFooter.tsx`) sostituire le etichette generiche "Facebook" / "Community venditori" con il nome del gruppo tradotto, ad esempio:
- IT: "VENDI CASA - Torino Jungle"
- EN: "VENDI CASA - Turin Jungle"
- ES/FR/DE/SV/ZH: trasposizioni coerenti con il nome proprio mantenuto.

### 3. Aggiungere una sezione community nella pagina `/vendi`
Inserire un blocco testuale sopra il footer (o sotto i CTA hero) con:
- Titolo: "Unisciti a VENDI CASA - Torino Jungle"
- Descrizione: 2-3 righe che spieghino lo scopo del gruppo (proprietari che vendono o affittano a Torino, scambio di domande, annunci, zero spam, nessuna promessa di prezzo).
- CTA secondario: link al gruppo tracciato con `seller_community_click`.

### 4. Creare bozza descrizione per Facebook
Salvare in `public/resources/facebook-seller-group-description.md` una descrizione pronta da copia-incollare nella scheda del gruppo Facebook, rispettando il tono del sito e le linee guida: niente cifre, niente promesse di prezzo, niente commissioni esagerate.

### 5. Traduzioni
Aggiungere le nuove chiavi i18n per la sezione community (`sellersPage.community.title`, `sellersPage.community.description`, `sellersPage.community.cta`) nelle 7 lingue principali: IT, EN, ES, FR, DE, SV, ZH.

### 6. Verifica
Eseguire typecheck, build e screenshot mobile/desktop di `/vendi` per confermare che link, etichette e nuova sezione siano visibili e funzionanti.

## Cosa NON cambiamo
- Non modifichiamo il simulatore di offerta.
- Non pubblichiamo automaticamente post o descrizioni su Facebook.
- Non cambiamo il modello di acquisizione o la strategia inbound.
