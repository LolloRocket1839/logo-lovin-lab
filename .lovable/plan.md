# Transizione logo homepage: fade-out → watermark fade-in

## Obiettivo
Modificare l'animazione del logo in homepage in modo che, durante lo scroll:
1. il logo grande centrato svanisca (opacità 1 → 0) entro ~il 12% dello stage;
2. per un breve tratto rimanga invisibile mentre "si sposta";
3. un logo piccolo (28px) riappaia in alto a sinistra (opacità 0 → 1) tra ~12% e 22% e resti visibile per le scene successive.

## Cosa cambia
- In `src/components/immersive/LiquidHomepageStory.tsx`: sostituire l'unico `motion.img` con due elementi nel portale body-level:
  - `HeroMark`: centrato, dimensione `heroSize`, opacità `1 → 0` tra `p=0` e `p=0.12`.
  - `HeaderMark`: fixed `top:14px left:20px`, `28×28`, opacità `0 → 1` tra `p=0.12` e `p=0.22` (poi costante).
- Rimuovere le `useTransform` continue di `logoTop`, `logoLeft`, `logoSize`, `logoOpacity` per un solo elemento.
- Mantenere il portale su `document.body` con `z-[60] pointer-events-none`.
- `Navigation.tsx`: lasciare l'icona header `opacity-0` su `/` e `/en`.

## Cosa NON cambia
- Layout, testi, scene, palette, animazioni delle scene, BottomNav.
- `HeroLogo.tsx`, `/vendi`, blog, DB, i18n.

## Verifica
- `bunx tsc --noEmit`
- `bun run build`
- Smoke test 6 rotte (`/`, `/en`, `/vendi`, `/investitori`, `/chi-siamo`, `/blog`)
- Playwright desktop (1280×900) e mobile (390×844): screenshot a scroll 0, 100, 300, 650; confermare che il logo grande svanisca, ci sia un momento senza logo, e il piccolo riappaia in alto a sinistra; confermare icona header normale su `/vendi`.
