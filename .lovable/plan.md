## Obiettivo
Rendere la nuova landing `/affitti-lingotto-ospedali-torino` realmente raggiungibile da chi cerca casa in zona Lingotto/Ospedali, sia dal sito sia dai motori di ricerca.

## Cosa cambia

### 1. Entry points interni (visibilità immediata)
- **Card prominente su `/zone/nizza-millefonti-ospedali`**: banner "Cerchi casa qui? Lista d'attesa affitti" sopra la fold, link diretto alla landing.
- **Sezione su `/studenti`**: card dedicata "Affitti vicino Molinette / CTO / Politecnico Sede Lingotto" nel blocco zone, accanto a San Salvario/Cittadella.
- **Footer**: nuova voce sotto "Affitti / Studenti" → "Affitti Lingotto e Ospedali".
- **Homepage** (`Index.tsx`): inserire un riferimento nella sezione studenti/affitti esistente, senza nuovi blocchi (rispetta "limit details, make every detail perfect").
- **Cross-link da `/affitto-stanza-torino`** (NeighborhoodsIndex): card zona Nizza/Lingotto che punta alla landing invece che solo al NeighborhoodPage.

### 2. Discoverability per chi cerca su Google
- **Submit manuale a Google Search Console**: usare la edge function `submit-sitemap` già esistente per forzare il re-crawl della sitemap aggiornata.
- **Verifica metadata**: controllare che la landing abbia title <60 char con keyword primaria ("Affitti Lingotto Torino vicino Molinette"), meta description <160 char con CTA, canonical corretto, OG image 1200x630.
- **Breadcrumb JSON-LD esteso**: aggiungere `RealEstateAgent` / `Service` schema con `areaServed` = Lingotto/Nizza Millefonti per rinforzare il segnale locale.
- **Aggiunta a `llms.txt` e `llms-full.txt`**: così Perplexity/ChatGPT/Claude la citano quando uno chiede "dove trovare casa vicino Molinette Torino".

### 3. Rinforzo auto-linking dai blog
- Verificare che gli articoli rilevanti (es. guide San Salvario, vita studentesca, Politecnico) abbiano i trigger esatti nel testo. Se mancano, aggiungere 1-2 menzioni naturali per attivare l'auto-link.
- Aggiungere trigger aggiuntivi in `linkableContent.ts`: "vivere vicino molinette", "alloggio specializzandi", "casa cto torino", "affitto politecnico lingotto".

### 4. Canali diretti (traffico immediato, non SEO)
- **WhatsApp link condivisibile**: generare URL `/affitti-lingotto-ospedali-torino?utm=wa-direct` da inoltrare nei gruppi Telegram/WhatsApp di studenti Polito/UniTo e specializzandi Molinette.
- **Annuncio nel CookieBanner / AnnouncementBanner** (opzionale, 7 giorni): "Nuovo: lista d'attesa affitti Lingotto/Ospedali" con CTA alla landing. Disattivabile.

## Cosa NON cambia
- Nessuna modifica al backend, RLS, tabelle leads, edge functions.
- Nessuna modifica alla logica di `useLeadCapture` (la landing usa già `leadType: student` + source `nizza-millefonti-tenant-*` che triggera il WhatsApp prioritario).
- Nessun nuovo design system o palette.

## File toccati (stimato)
- `src/pages/zone/NizzaMillefontiOspedali.tsx` (banner)
- `src/pages/Students.tsx` (card zona)
- `src/components/layout/Footer.tsx` (voce menu)
- `src/components/layout/MobileFooter.tsx`
- `src/pages/Index.tsx` (1 link contestuale)
- `src/pages/NeighborhoodsIndex.tsx` (card aggiornata)
- `src/pages/landings/AffittiLingottoOspedali.tsx` (verifica meta + schema)
- `src/data/linkableContent.ts` (trigger extra)
- `public/llms.txt`, `public/llms-full.txt`
- Eventuale chiamata `submit-sitemap` per Google

## Tempistica realistica per "essere trovati"
- **Entry points interni**: immediato dopo deploy.
- **Indicizzazione Google base**: 3-14 giorni dopo submit sitemap.
- **Posizionamento competitivo** ("affitti Lingotto Torino"): 1-3 mesi, dipende da backlink e traffico organico.
- **Citazioni AI (ChatGPT, Perplexity)**: 1-4 settimane dopo aggiornamento `llms.txt` + indicizzazione.

Per traffico immediato, la leva vera nel breve è canali diretti (WhatsApp/Telegram) + entry points interni. La SEO arriva dopo.