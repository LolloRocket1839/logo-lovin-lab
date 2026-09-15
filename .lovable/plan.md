# Far conoscere il modello invest-to-rent

Obiettivo: portare più persone interessate a investire verso `/investitori`, su due fronti in parallelo — farsi trovare su Google e preparare una campagna a pagamento.

## Cosa dicono i dati di oggi

- Ultimi 30 giorni: circa 1.330 visitatori, 1.757 pagine viste.
- Le pagine più viste sono quasi tutte per studenti (quartieri sicuri, dove mangiare, budget mensile).
- L'unica pagina che porta già lettori-investitori è l'articolo sulla cedolare secca.
- Le persone escono quasi subito (rimbalzo medio 87%) e vedono 1,3 pagine a testa.
- Su Google, le ricerche tipo "investimenti immobiliari torino" sono poche (circa 20 al mese). La domanda locale esiste ma è piccola: la crescita arriverà da contenuti su fisco e rendimento degli affitti, non dalla parola "investire a Torino".

## Parte 1 — Farsi trovare su Google

Primo lavoro concreto, uno solo, da fare subito:

**Nuovo articolo: "Quanto rende davvero un bilocale affittato a studenti a Torino"**
- Spiega il conto completo: prezzo d'acquisto tipico nelle zone che seguiamo, canone studenti 9 mesi, affitto breve d'estate, spese, tasse.
- Usa solo i dati già presenti nel progetto (prezzi per zona, coefficienti, canoni) — nessun numero inventato e nessuna cifra di rendimento Jungle Rent, in linea con le regole di compliance: gli esempi restano di mercato, generali.
- Chiude con un invito a parlare con Lorenzo, non con una promessa di rendimento.
- Collegamenti interni da e verso l'articolo sulla cedolare secca, `/investitori` e `/investire-immobiliare-torino`.

Subito dopo, a supporto:
- Collegare le pagine investitori esistenti tra loro e dagli articoli fiscali, così chi arriva da Google trova il passo successivo.
- Controllare titoli e descrizioni delle pagine investitori perché descrivano il modello in modo comprensibile.

## Parte 2 — Pubblicità a pagamento

Si parte solo dopo aver concordato l'articolo sopra. Il percorso, nell'ordine:

1. Ricerca: cosa mostrano gli annunci dei concorrenti e come parlano le loro pagine.
2. Scelta del tipo di campagna, con un consiglio motivato.
3. Collegamento dell'account pubblicitario.
4. Creazione di testi e immagini dell'annuncio.
5. Misurazione dei contatti che arrivano dagli annunci.
6. Approvazione tua, con budget deciso da te: niente viene speso prima.

Nota importante: oggi il sito riceve visite ma pochissimi contatti da investitore. Prima di far partire gli annunci conviene che la pagina investitori converta meglio, altrimenti il budget si consuma senza risultati. Per questo la parte Google e il miglioramento della pagina vengono prima.

## Dettagli tecnici

- Nuovo articolo in `src/data/blog/content/it/` con versione inglese in `en/`, registrato nell'indice blog e nella categoria Investitori.
- Dati di calcolo presi da `src/data/turinZonePrices.ts` e `src/data/propertyCoefficients.ts`.
- Link interni via `src/data/linkableContent.ts` / `src/data/blog/inlineCTAs.ts`.
- Sitemap rigenerata con `scripts/generate-sitemap.ts`.
- Nessuna modifica al simulatore, al modello di lead o alle regole di compliance esistenti.

## Cosa NON è incluso

- Nessuna cifra o percentuale di rendimento Jungle Rent su pagine pubbliche.
- Nessuna campagna avviata o spesa senza la tua approvazione esplicita.
- Nessuna traduzione nelle altre 5 lingue in questa prima fase (italiano e inglese).
