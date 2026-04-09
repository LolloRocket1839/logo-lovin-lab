

## Piano: Sezione Banner EU con sfondo blu

Il banner EU ha già uno sfondo blu nell'immagine, ma attualmente è inserito sulla background chiara/crema del footer, creando un contrasto poco elegante. L'idea è avvolgere la sezione del banner EU in un contenitore con sfondo blu scuro che si fonda con il banner stesso.

### Modifiche

**1. `src/components/layout/Footer.tsx`** (linee 299-311)
- Avvolgere la sezione del banner EU in un div con sfondo blu scuro (`bg-[#003399]` o simile, matching il blu del banner Coesione Europa)
- Testo disclaimer in bianco/chiaro
- Padding e border-radius per un aspetto pulito
- Rimuovere `opacity-90` dall'immagine, renderla piena

**2. `src/components/layout/MobileFooter.tsx`** (linee 120-132)
- Stessa modifica: sfondo blu scuro per la sezione banner
- Testo in bianco
- Adattamento dimensioni per mobile

### Risultato visivo
La sezione del banner EU avrà uno sfondo blu scuro che si fonde naturalmente con il banner stesso, dandogli l'aspetto ufficiale/istituzionale che piaceva prima.

