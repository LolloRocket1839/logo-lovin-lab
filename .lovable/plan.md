

## Piano: Sostituire il banner EU con la versione ad alta risoluzione

L'utente ha caricato una versione PNG più nitida e ad alta risoluzione del banner EU. Questa sostituirà il file attuale (`eu-funding-banner.png`) che era stato convertito dal JPG a bassa risoluzione.

### Modifiche

**1. Sostituire l'asset**
- Copiare `user-uploads://1_1.png` → `src/assets/eu-funding-banner.png` (sovrascrive il file esistente)

**2. Nessuna modifica ai componenti**
- `Footer.tsx` e `MobileFooter.tsx` già importano `eu-funding-banner.png` con le dimensioni corrette (`max-w-[280px]` e `max-w-[220px]`) e `imageRendering: 'auto'`

