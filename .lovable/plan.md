# Piano: transizione del logo homepage verso l'alto a sinistra

## Obiettivo
Far diventare il grande logo centrale della hero uno small watermark fisso in alto a sinistra durante lo scroll della homepage, con transizione fluida legata allo scroll.

## Scope
- Solo homepage (`/` e `/en`) e `Navigation`.
- Non si toccano testi, scene, palette, form, `/vendi`, blog, DB, i18n.
- Si riusa lo stesso asset `jungle-rent-logo-new.svg`.

## File coinvolti
- `src/components/immersive/LiquidHomepageStory.tsx` — aggiunge overlay logo scroll-linked e placeholder.
- `src/components/layout/Navigation.tsx` — nasconde l'icona del header in homepage.
- `src/hooks/useViewportSize.ts` — nuovo hook per leggere larghezza/altezza viewport.

## Implementazione

### 1. Hook viewport
- Creare `useViewportSize` che restituisce `width` e `height` aggiornati al resize.
- Fallback iniziale per evitare errori SSR (anche se SPA, per robustezza).

### 2. Logo scroll-linked in LiquidHomepageStory
- Importare `jungle-rent-logo-new.svg`.
- Calcolare `heroSize` in base alla larghezza: 160px / 288px / 384px.
- Calcolare posizione iniziale centrata nella scena hero:
  - `top = height/2 - heroSize/2`
  - `left = width/2 - heroSize/2`
- Calcolare posizione finale nell'header (icona 28x28 all'interno di `h-14` con `px-5`):
  - `top = 14px`
  - `left = 20px`
  - dimensione finale = 28px
- Creare `progress = useTransform(p, [0, 0.22], [0, 1])`.
- Creare motion values per `top`, `left`, `width`, `height`, `opacity` mappate su `progress`.
- Rimuovere l'uso di `<HeroLogo />` dalla scena 1 e sostituirlo con un placeholder invisibile delle stesse dimensioni per preservare il layout del contenuto sottostante.
- Aggiungere un `<motion.img>` fixed, `z-50`, `pointer-events-none`, con `fetchPriority="high"`, che segue i motion values. Lasciare un `alt="Jungle Rent"` accessibile.

### 3. Header
- In `Navigation`, rilevare se `location.pathname` è `/` o `/en`.
- Se homepage, applicare `opacity-0` all'icona del header, mantenendo visibile il testo "Jungle Rent" e il link.
- Lasciare invariati menu, lingua e altre pagine: lì l'icona rimane visibile.

## Verifica
- `typecheck` e `vite build` passano.
- Playwright:
  - Screenshot homepage a scroll 0: logo grande centrato, header senza icona (solo testo).
  - Screenshot scroll ~15%: logo si sta riducendo e spostando in alto a sinistra.
  - Screenshot scroll >25%: logo piccolo fisso in alto a sinistra, scena 2 visibile.
  - Screenshot mobile 390x844: stessa cosa, nessun clipping, BottomNav visibile.
  - Navigazione su `/vendi` o `/blog`: icona header visibile normalmente.

## Rischi / Attenzioni
- Il logo fixed è dentro uno sticky container con `overflow-hidden`; è posizionato `fixed` rispetto al viewport, quindi non dovrebbe essere clippato. Verificare su Safari.
- L'icona header nascosta deve lasciare il link attivo tramite il testo; il logo overlay ha `pointer-events-none` per non bloccare il menu.
- Il placeholder nella scena 1 deve essere esattamente centrato e dimensionato per evitare salti percettibili durante il caricamento.
