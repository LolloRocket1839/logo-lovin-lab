

## Fix: Banner EU Sgranato nel Footer

### Problema
L'immagine `eu-funding-banner.jpg` è solo 562×103px e 15KB. Su display Retina (2x/3x) viene renderizzata a dimensioni maggiori della risoluzione nativa, causando l'effetto sgranato. Inoltre il formato JPEG aggiunge artefatti di compressione ai loghi/testo.

### Soluzione

**1. Convertire JPG → PNG** per eliminare artefatti JPEG su testo/loghi
- Convertire `src/assets/eu-funding-banner.jpg` → `src/assets/eu-funding-banner.png`
- PNG preserva meglio testo e bordi netti

**2. Ridurre la dimensione di visualizzazione** per adattarla alla risoluzione nativa
- Desktop (`Footer.tsx`): cambiare `max-w-md` → `max-w-[280px]` (circa metà della risoluzione nativa = nitido su 2x Retina)
- Mobile (`MobileFooter.tsx`): cambiare `max-w-xs` → `max-w-[220px]`

**3. Aggiungere rendering optimization**
- Aggiungere `style={{ imageRendering: 'auto' }}` per miglior rendering browser

### File da modificare
- `src/assets/eu-funding-banner.png` (nuovo, convertito da JPG)
- `src/components/layout/Footer.tsx` — import + sizing
- `src/components/layout/MobileFooter.tsx` — import + sizing

