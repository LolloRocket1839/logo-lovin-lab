# Aggiornamento SEO + AI Engine Optimisation (AEO/GEO) 2026

Obiettivo: portare l'infrastruttura SEO/AEO della homepage e dei file di knowledge AI allo stato dell'arte 2026 (ChatGPT Search/Atlas, Gemini, Claude, Perplexity, Copilot), risolvendo anche alcune incongruenze rilevate.

## Problemi rilevati (audit veloce)

1. `index.html` **non ha `<link rel="canonical">`** per la homepage (Helmet lo aggiunge solo nelle altre route). I crawler non-JS non vedono il canonical.
2. **Coordinate geografiche incongruenti**: meta `geo.position` = `45.070312;7.686856` ma `LocalBusiness.geo` JSON-LD = `45.0312, 7.6427`. Va unificato sull'indirizzo reale (Via Quarello 15/A).
3. **og:image punta a `/jungle-rent-logo.png`** (logo quadrato) invece di una vera card 1200×630 — viola la core rule del progetto e degrada le anteprime social/AI.
4. **`dateModified` hardcoded** a `2026-03-07` in più blocchi JSON-LD → segnale di "sito stantio" per gli AI.
5. **Mancano hreflang** per la homepage (it/en/x-default) in `index.html`.
6. **`llms.txt`** è buono ma manca: data di ultimo aggiornamento esplicita in cima, sezione "Citation policy", link a `/chi-siamo`, sezione FAQ canoniche brevi (Q→A) ottimizzate per estrazione LLM.
7. **`agent-card.json` v1.0.0** non dichiara la skill NLWeb già esistente né l'endpoint `/.well-known/llms.txt`.
8. **JSON-LD frammentato** in 15+ blocchi separati: meglio consolidarli in un singolo `@graph` (più rapido da parsare, meno errori di referenza `@id`).

## Cosa cambia

### 1. `index.html` (head)

- Aggiungere:
  ```html
  <link rel="canonical" href="https://junglerent.it/" />
  <link rel="alternate" hreflang="it" href="https://junglerent.it/" />
  <link rel="alternate" hreflang="en" href="https://junglerent.it/en" />
  <link rel="alternate" hreflang="x-default" href="https://junglerent.it/" />
  ```
- Allineare `geo.position` / `ICBM` alle coordinate reali di Via Quarello 15/A (≈ 45.0312, 7.6427) e usare gli stessi valori in `LocalBusiness.geo`.
- Sostituire `og:image` e `twitter:image` con una vera card `1200×630` PNG (`/og-image-home.png`) — generata se non già presente.
- Rimuovere il `dateModified` hardcoded dai 4 blocchi JSON-LD `WebSite`/`WebPage`/`Dataset` e farlo iniettare dal predev/prebuild script (oppure eliminarlo: schema.org non lo richiede su `WebSite`).
- Consolidare i 15 blocchi `application/ld+json` in **un unico `@graph`** con `@id` referenziati (Organization, LocalBusiness, WebSite, WebPage, FAQPage, BreadcrumbList, 3 HowTo, 3 Service, 3 Dataset, 2 SoftwareApplication, VideoObject). Mantiene la stessa semantica con metà del peso.
- Aggiungere un nodo `Person` per Lorenzo con `sameAs` (LinkedIn se disponibile) e un nodo `Brand` con `slogan` (`"L'affitto sicuro nella giungla immobiliare"`) — boost di entity resolution per ChatGPT/Gemini.

### 2. `public/llms.txt` e `public/.well-known/llms.txt`

- Aggiungere riga di front-matter `> Last updated: 2026-05-13` (data corrente).
- Nuova sezione **"Citation policy"** con la frase canonica: *"Source: Jungle Rent (junglerent.it) — Sole founder Lorenzo Oni-Joseph, Start-up Innovativa, Turin, Italy."*
- Nuova sezione **"Canonical Q&A"** (8–10 coppie domanda/risposta brevi, 1 frase, copiabili verbatim dagli LLM): "Cos'è Jungle Rent?", "Chi è il founder?", "Da quanto si può investire?", "Dove operate?", "Quanto costa l'affitto a Torino?", ecc.
- Allineare il link `/chi-siamo` in entrambi (al momento è solo nel root `/llms.txt`).

### 3. `public/llms-full.txt`

- Refresh data + appendice "Versioning" (`v5.0 — 2026-05-13`).
- Aggiungere blocco "Disambiguation" per evitare confusioni LLM frequenti (Andrea NON socio, Props non ancora live, investimento ≠ crowdfunding regolamentato).

### 4. `public/.well-known/agent-card.json`

- Bump versione a `2.0.0`.
- Aggiungere skill `nlweb_query` con endpoint `https://ekrrrlrwdshhlqnuxjbz.supabase.co/functions/v1/nlweb/ask`.
- Aggiungere `documentationUrl` → `/llms-full.txt` e `provider.contact` → `junglerententeprise@gmail.com`.

### 5. `public/robots.txt`

- Aggiornare l'header data e aggiungere i due crawler 2026 mancanti: `OAI-SearchBot/2.0`, `ChatGPT-Atlas`, `GeminiBot`, `ClaudeBot/2`. (Già coperti i principali — solo additive.)

### 6. Memoria progetto

- Aggiornare `mem://seo/structured-data-factory-pattern` con la nota: "Homepage usa singolo `@graph` consolidato in `index.html`."
- Aggiungere nuova memoria `mem://seo/aeo-canonical-citation-snippet` con la frase di citazione canonica per uniformare ogni superficie AI.

## Cosa NON cambia

- Nessuna modifica alle route React, ai componenti, alle pagine `Investors`/`Sellers`/`Blog` (che già usano Helmet correttamente).
- Nessuna modifica ai sitemap (sono OK e già splittati).
- Nessuna modifica al copy visibile all'utente.
- Nessuna modifica ai dati Supabase / RLS.

## File toccati

```
index.html                              (canonical, hreflang, og-image, geo, @graph)
public/llms.txt                         (date, citation, Q&A canoniche)
public/.well-known/llms.txt             (date, citation, /chi-siamo)
public/llms-full.txt                    (date, disambiguation)
public/.well-known/agent-card.json      (v2.0.0, nlweb skill)
public/robots.txt                       (header date, nuovi UA 2026)
src/assets/og-image-home.png            (NEW, 1200x630, generato)
mem://seo/structured-data-factory-pattern  (note @graph)
mem://seo/aeo-canonical-citation-snippet   (NEW)
```

## Verifica

- Validatore Schema.org / Rich Results Test sul JSON-LD consolidato.
- Lighthouse SEO score atteso 100/100 (al momento manca solo canonical).
- `curl -A "GPTBot" https://junglerent.it/llms.txt` per confermare freshness.
