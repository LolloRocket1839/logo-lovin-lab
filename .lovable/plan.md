

# Piano: integrazione foto Torino nel progetto

## Obiettivo
Ottimizzare e integrare 8 nuove foto di Torino nel progetto per migliorare la qualità visiva delle pagine quartieri e degli articoli del blog.

---

## Foto e destinazione

| File originale | Nome ottimizzato | Utilizzo principale |
|----------------|------------------|---------------------|
| IMG_0455.jpeg | `mole-tramonto-torino.webp` | Homepage hero alternativo, articoli turistici |
| IMG_0453.jpeg | `mole-inverno-torino.webp` | Articoli stagionali (gennaio, febbraio) |
| IMG_0452.jpeg | `cappuccini-notte-torino.webp` | Articoli vita notturna, eventi serali |
| IMG_0446.jpeg | `viale-alberato-torino.webp` | Pagina Cenisia o Cit Turin |
| IMG_0458.jpeg | `strada-alpi-torino.webp` | Articoli mobilita, vista panoramica |
| IMG_0434.jpeg | `tramonto-po-torino.webp` | Pagina Vanchiglia, articoli turistici |
| IMG_0433.jpeg | `ponte-vittorio-torino.webp` | Centro storico, articoli turistici |
| IMG_0424.jpeg | `arco-valentino-torino.webp` | Pagina Crocetta, zona Valentino |

---

## Passaggi implementazione

### 1. Copia e ottimizzazione immagini
Copiare le 8 foto nella cartella `public/images/` con nomi descrittivi per SEO. Le immagini verranno automaticamente ottimizzate dallo script esistente (`scripts/optimize-images.js`) che converte in WebP e riduce le dimensioni.

### 2. Aggiornamento pagine quartieri
Sostituire le immagini placeholder con le nuove foto:

| Quartiere | Immagine attuale | Nuova immagine |
|-----------|------------------|----------------|
| Cenisia | `portici-torino.jpg` | `viale-alberato-torino.webp` |
| Vanchiglia | `quadrilatero-notte-torino.jpg` | `tramonto-po-torino.webp` |
| Crocetta | `politecnico-torino.avif` | `arco-valentino-torino.webp` (opzionale) |

### 3. Utilizzo negli articoli blog
Le foto con la Mole Antonelliana e il Monte dei Cappuccini sono perfette per:
- Articoli eventi Torino (gennaio, febbraio, marzo 2026)
- Articoli vita notturna
- Articoli turistici stagionali

### 4. Aggiornamento sitemap immagini
Aggiungere le nuove immagini a `public/sitemap-images.xml` per indicizzazione Google Images.

---

## File da modificare

| File | Azione |
|------|--------|
| `public/images/` | Aggiungere 8 nuove immagini |
| `src/data/neighborhoods.ts` | Aggiornare campo `image` per Cenisia e Vanchiglia |
| `public/sitemap-images.xml` | Aggiungere entries per le nuove immagini |

---

## Note tecniche

- Le immagini originali sono in formato JPEG con risoluzione alta
- Lo script di ottimizzazione convertira in WebP con qualita 80% e max 1920px
- I nomi file seguono la convenzione esistente: `soggetto-citta.webp`
- Le foto notturne (tramonto, Cappuccini) hanno buona esposizione e non richiedono editing

