## Perché il preview iMessage mostra il vecchio "Risparmia il 25%" invece del logo

### Diagnosi

Il sito è un'app **client-side React + Vite**. I tag Open Graph per-articolo (immagine, titolo, descrizione) sono iniettati via `react-helmet-async` dentro `BlogPost.tsx` (linee 119–127). Funziona così:

- **Googlebot** esegue JS → vede correttamente l'OG per-articolo (`/images/mortgage-investment.jpg`).
- **iMessage, WhatsApp, LinkedIn, Slack, Facebook, Telegram** non eseguono JS. Leggono solo lo `<head>` statico di `index.html`, che oggi contiene:
  - `og:image` = `https://junglerent.it/og-image-homepage.jpg` (banner "Risparmia il 25%")
  - `og:image:alt` = `"Jungle Rent - Risparmia fino al 25% sull'affitto a Torino"`
  - `<title>` da fallback con lo stesso claim

Risultato: qualunque articolo (incluso "Real life Monopoly") condiviso su iMessage mostra **sempre** quella card promozionale. Il logo non è "non mostrato" — semplicemente il preview usa l'immagine sbagliata, e quell'immagine non ha un logo prominente.

### Cosa si può fare

Tre livelli di soluzione, dal più rapido al più completo:

#### Opzione A — Aggiornare l'OG image statica del sito (rapido, 1 azione)

Sostituire `public/og-image-homepage.jpg` con un'immagine 1200×630 brandizzata correttamente:
- Logo Jungle Rent ben visibile (in alto a sinistra o centrato)
- Sfondo verde Jungle Rent (palette esistente)
- Claim breve: "Jungle Rent · Student housing Torino" (no "Risparmia il 25%" — outdated e non rispetta la voce attuale)
- Aggiornare anche `og:image:alt` di conseguenza
- Risultato: **ogni** condivisione (homepage, blog, qualunque pagina) mostrerà la stessa card brandizzata con logo finché un crawler non-JS non esegue JS. Limite: non è personalizzata per articolo.

Posso generarla via `imagegen` con il logo, oppure compongo una versione che usa l'asset logo esistente. Da chiarire: testo/tagline preferito.

#### Opzione B — Aggiungere prerendering per le rotte chiave (medio)

Aggiungere un build-step (`vite-plugin-prerender` o `react-snap`) che renderizza staticamente le rotte `/blog/*` al build time. Così Helmet "cuoce" i meta tag corretti nell'HTML statico, e iMessage/WhatsApp vedono per ogni articolo:
- Titolo articolo
- Descrizione articolo
- Immagine articolo

Più lavoro (config + verifica per ~60 post + CI), ma è la soluzione "vera" per OG-per-articolo.

#### Opzione C — Edge function per OG (avanzato)

Cloudflare Worker / edge function che intercetta richieste con user-agent crawler e serve HTML con i meta tag corretti. Più complesso, richiede infrastruttura aggiuntiva.

### Raccomandazione

**Opzione A subito** (15 minuti, risolve la percezione "non si vede il logo"), poi **Opzione B** in un secondo round se vuoi preview per-articolo accurati su tutti i social.

### Domande prima di procedere

1. **Confermi Opzione A** (nuova OG image brandizzata) come passo immediato?
2. Quale tagline preferisci sulla card? Opzioni:
   - "Student housing Torino" (neutro)
   - "Acquistiamo, ristrutturiamo, mettiamo a reddito" (positioning)
   - "Real-life PropTech · Torino" (claim)
   - Solo logo, senza testo
3. Vuoi che pianifichi anche l'**Opzione B** (prerendering per i blog post) nello stesso plan, o la teniamo per dopo?
