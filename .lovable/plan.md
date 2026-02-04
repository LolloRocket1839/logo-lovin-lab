

# Piano: aggiungere pagine zone investitori alla sitemap XML

## Obiettivo

Aggiungere le 12 pagine quartiere per investitori (+ pagina indice) alla sitemap XML per garantire l'indicizzazione SEO corretta.

---

## Pagine da aggiungere

### Pagina indice

| URL IT | URL EN | Priorita |
|--------|--------|----------|
| `/investitori/zone` | `/investors/zones` | 0.85 |

### Pagine singole quartieri (12)

| Quartiere | Slug | URL IT | URL EN |
|-----------|------|--------|--------|
| Cenisia | cenisia | `/investitori/zone/cenisia` | `/investors/zones/cenisia` |
| Aurora | aurora | `/investitori/zone/aurora` | `/investors/zones/aurora` |
| San Salvario | san-salvario | `/investitori/zone/san-salvario` | `/investors/zones/san-salvario` |
| Vanchiglia | vanchiglia | `/investitori/zone/vanchiglia` | `/investors/zones/vanchiglia` |
| Lingotto | lingotto | `/investitori/zone/lingotto` | `/investors/zones/lingotto` |
| Barriera di Milano | barriera-di-milano | `/investitori/zone/barriera-di-milano` | `/investors/zones/barriera-di-milano` |
| Crocetta | crocetta | `/investitori/zone/crocetta` | `/investors/zones/crocetta` |
| Borgo Vittoria | borgo-vittoria | `/investitori/zone/borgo-vittoria` | `/investors/zones/borgo-vittoria` |
| San Donato | san-donato | `/investitori/zone/san-donato` | `/investors/zones/san-donato` |
| Parella | parella | `/investitori/zone/parella` | `/investors/zones/parella` |
| Santa Rita | santa-rita | `/investitori/zone/santa-rita` | `/investors/zones/santa-rita` |
| Cit Turin | cit-turin | `/investitori/zone/cit-turin` | `/investors/zones/cit-turin` |
| Campidoglio | campidoglio | `/investitori/zone/campidoglio` | `/investors/zones/campidoglio` |

---

## Struttura XML per ogni entry

Ogni pagina zona investitori includera:
- `loc`: URL principale in italiano
- `lastmod`: 2026-02-04 (data odierna)
- `changefreq`: monthly (dati di mercato aggiornati periodicamente)
- `priority`: 0.8 (alta priorita per traffico investitori)
- `xhtml:link` hreflang: IT, EN, x-default
- `image:image`: immagine del quartiere con caption SEO

---

## Posizione nel sitemap

Le nuove entry verranno inserite dopo la sezione "Investors Page" (riga 73) e prima di "Sell Property Page" (riga 78), creando una nuova sezione:

```xml
<!-- ========== INVESTOR ZONE PAGES (Market Analysis) ========== -->
```

---

## File da modificare

| File | Modifica |
|------|----------|
| `public/sitemap.xml` | Aggiungere 13 nuove entry (1 indice + 12 zone) |

---

## Esempio entry XML

```xml
<!-- Investor Zones Index -->
<url>
  <loc>https://junglerent.it/investitori/zone</loc>
  <lastmod>2026-02-04</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.85</priority>
  <xhtml:link rel="alternate" hreflang="it" href="https://junglerent.it/investitori/zone" />
  <xhtml:link rel="alternate" hreflang="en" href="https://junglerent.it/investors/zones" />
  <xhtml:link rel="alternate" hreflang="x-default" href="https://junglerent.it/investitori/zone" />
</url>

<!-- Investor Zone: San Salvario -->
<url>
  <loc>https://junglerent.it/investitori/zone/san-salvario</loc>
  <lastmod>2026-02-04</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
  <xhtml:link rel="alternate" hreflang="it" href="https://junglerent.it/investitori/zone/san-salvario" />
  <xhtml:link rel="alternate" hreflang="en" href="https://junglerent.it/investors/zones/san-salvario" />
  <xhtml:link rel="alternate" hreflang="x-default" href="https://junglerent.it/investitori/zone/san-salvario" />
  <image:image>
    <image:loc>https://junglerent.it/images/san-salvario-night.jpeg</image:loc>
    <image:title>Investire a San Salvario Torino</image:title>
    <image:caption>Rendimento 5.8-6.5%, sfitto 2-4%. Il quartiere studentesco piu richiesto di Torino.</image:caption>
  </image:image>
</url>
```

---

## Risultato atteso

- 13 nuove URL indicizzate per Google
- Hreflang corretto IT/EN per ogni pagina
- Immagini con alt text SEO-friendly
- Priorita alta (0.8-0.85) per traffico investitori

