

## Piano: Sostituire il banner EU con la nuova versione

L'immagine caricata è un banner più pulito e leggibile: sfondo blu con loghi "Coesione 21-27 Piemonte", bandiera EU, stemma italiano e Regione Piemonte, con slogan "L'Europa investe sul Piemonte, il Piemonte investe su di te".

### Modifiche

**1. Sostituire l'asset**
- Copiare `user-uploads://4_1.jpg` → `src/assets/eu-funding-banner.png` (sovrascrive il file esistente)

**2. Aggiornare il testo disclaimer** in entrambi i footer
- Il testo attuale menziona "Coesione Europa" — aggiornare per coerenza con il nuovo banner che dice "Coesione Italia 21-27 Piemonte"
- Mantenere il testo obbligatorio sul FSE+ 2021-2027

**3. Nessuna modifica strutturale**
- Lo sfondo `bg-[#003399]` già presente si fonde perfettamente con il blu del nuovo banner
- Le dimensioni (`max-w-[280px]` desktop, `max-w-[220px]` mobile) restano appropriate

### File da modificare
1. `src/assets/eu-funding-banner.png` — sostituzione asset
2. `src/components/layout/Footer.tsx` — aggiornare alt text dell'immagine
3. `src/components/layout/MobileFooter.tsx` — aggiornare alt text dell'immagine

