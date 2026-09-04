# Chiusura lavori: fiducia, footer mobile, /vendi e controllo finale

## 1. Rimuovere la frase "società vera con un percorso vero"

Nel capitolo 06 Fiducia (`TrustBadge.tsx`) il titolo oggi è "Una società **vera**, con un percorso vero" (EN: "A **real** company, with a real track record") in tutte e 7 le lingue.

- Sostituire con un titolo sobrio, senza "vera/real" né "track record": IT "Una società, una persona, un impegno preso davanti a te" (EN "One company, one person, one promise made to you"), con l'enfasi in corsivo su "impegno" / "promise".
- Aggiornare le chiavi `trustBadge.headlinePre`, `headlineEmphasis`, `headlinePost` in it, en, es, fr, de, sv, zh.
- Controllo globale: cercare in tutto il sito (testi, traduzioni, llms.txt, JSON-LD) altre occorrenze di "track record" / "società vera" e rimuoverle.

## 2. Banner venditore nel footer mobile

- `Footer.tsx` (desktop) ha già il link "Per i proprietari" → `/vendi` (`/sell` in EN).
- `MobileFooter.tsx` non ha nessun link venditori: aggiungere una voce "Vendi casa a Torino" → `/vendi` / `/sell`, coerente con lo stile delle altre voci, tradotta nelle 7 lingue.

## 3. Barra di navigazione in basso su /vendi

- `Sellers.tsx` oggi non mostra la `BottomNav` (solo homepage, blog, FAQ e alcune pagine quartiere la mostrano).
- Aggiungerla su `/vendi` (caricamento lazy come in `Index.tsx`) e alzare la barra sticky venditore quanto basta per non sovrapporsi (già a 128px dal basso su mobile: verificare con screenshot che sticky CTA, WhatsApp e BottomNav non si coprano).

## 4. Controllo completo

- Simulatore: risultato immediato, ripresa bozza, invio email, messaggio WhatsApp, reset.
- Pagina `/vendi`: prova sociale, barra sticky (appare dopo l'hero, chiudibile), dialog offerta rapida.
- Homepage: sezione "Vendi casa" con confronto Agenzia vs Jungle Rent e CTA verso `/vendi`.
- Verifica visiva mobile (375px) e desktop con screenshot su `/`, `/vendi`, `/sell`, e capitolo Fiducia.
- `bun scripts/validate-translations.mjs` a zero errori, build pulita, nessun errore in console.
- Rigenerare la sitemap solo se cambiano URL (non previsto).

## Dettagli tecnici

- File toccati: `src/components/TrustBadge.tsx` (solo se serve), `src/i18n/locales/{it,en,es,fr,de,sv,zh}.json`, `src/components/layout/MobileFooter.tsx`, `src/pages/Sellers.tsx`, eventualmente `src/components/sellers/SellerStickyCta.tsx` per gli offset.
- Nessuna modifica a Seller Radar/outbound, nessuna integrazione a pagamento, nessuna cifra di rendimento su superfici pubbliche.
