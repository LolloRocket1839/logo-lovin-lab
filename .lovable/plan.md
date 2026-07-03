## Diagnosi — indicizzazione junglerent.it

Ho interrogato Google Search Console. Le buone notizie prima:

- Le pagine principali sono **indicizzate** (`/`, `/investitori`, `/blog`, `/studenti` → verdict `PASS`, `Submitted and indexed`).
- Le 4 sitemap sono lette senza errori. Il campo "indexed: 0" nella risposta API è un artefatto noto di GSC (deprecato), non un problema reale.

Il problema serio è nei **canonical**:

| URL | Google canonical | User (dichiarato dalla pagina) canonical |
| --- | --- | --- |
| `/investitori` | `/investitori` ✅ | **`/investors`** ❌ |
| `/studenti` | `/studenti` ✅ | **`/students`** ❌ |

Le pagine IT dichiarano un canonical EN (e viceversa). Oggi Google sovrascrive e sceglie il canonical giusto da solo, ma il segnale è contraddittorio: dilata i tempi di indicizzazione delle traduzioni, rischia di far cadere una delle due versioni dall'indice e sporca gli hreflang.

**Causa tecnica:** in `Investors.tsx`, `Students.tsx` e `InvestorZonesIndex.tsx` il canonical viene calcolato da `i18n.language` (stato del client), non dal path reale. Quando Googlebot atterra su `/investitori` ma i18n resolve a EN (o viceversa), la pagina emette il canonical dell'altra lingua.

## Fix proposto

Derivare il canonical dal **pathname reale** invece che dalla lingua i18n. Cambiamento minimale, solo tre file, nessun impatto su UI o traduzioni.

### File

1. **`src/pages/Investors.tsx`** — sostituire

   ```ts
   const isEn = i18n.language.startsWith("en");
   const canonical = isEn
     ? "https://junglerent.it/investors"
     : "https://junglerent.it/investitori";
   ```

   con una derivazione basata su `useLocation().pathname` (`/investors` → EN, altrimenti IT).

2. **`src/pages/Students.tsx`** — stessa logica: canonical (e blocco alternate/hreflang se presente) basato su `pathname` invece di `currentLang`.

3. **`src/pages/InvestorZonesIndex.tsx`** — riga 182: canonical basato su `pathname` invece di `lang` (`/investors/zones` vs `/investitori/zone`).

In tutti e tre i file, `useTranslation()` resta per i testi; solo il calcolo del canonical cambia. Gli `hreflang` alternate rimangono invariati (puntano già ai due URL corretti).

### Verifica

- `tsgo` per assicurare che i tipi siano ok.
- Nessuna modifica di comportamento visibile.
- Dopo deploy, richiedere in GSC una nuova "Ispezione URL → Richiedi indicizzazione" per `/investitori`, `/studenti`, `/investors`, `/students`, `/investitori/zone`, `/investors/zones`. La prossima ispezione dovrà mostrare `userCanonical` coincidente con `googleCanonical`.

## Non incluso (posso farlo in un secondo passaggio se vuoi)

- Audit di altre pagine con la stessa pattern (`Sellers`, landing SEO, blog post): confermato che alcune usano già pathname corretto, ma vale la pena una scansione mirata.
- Rimozione o consolidamento di `sitemap-index.xml` vs `sitemap.xml` (oggi hai entrambe registrate in GSC — non è un errore ma è ridondante).
- Nessun `Sitemap:` in `robots.txt`: si può aggiungere se vuoi accelerare il discovery dei sitemap secondari (blog, tools, images).
