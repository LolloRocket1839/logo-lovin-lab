## Goal

Trasformare la homepage in un'esperienza **pinned single-viewport**: la pagina non si allunga visivamente, lo scroll diventa il "telecomando" che fa entrare e uscire le scene (atti) nello stesso quadro. Niente scroll lungo, niente sezioni che scorrono via — gli elementi **vanno e vengono** sopra lo stesso canvas. Logo invariato.

## Comportamento

- Una "scena" alla volta occupa il viewport, ancorata (pinned).
- Lo scroll fisico avviene su uno spacer alto (es. 500vh), ma il contenuto **resta fermo** mentre dentro al frame le scene si dissolvono / traslano leggermente / si scambiano (cross-fade + soft Y/X 20–40px, blur 4→0).
- 5 atti: Hero · Come funziona · Investitori · Vendi · Footer.
- Il rail di progresso a destra mostra in che atto sei (già esistente, lo riusiamo).
- Su mobile: stesso pattern ma con altezze ridotte e transizioni più brevi; rispetta `prefers-reduced-motion` (fallback a fade istantaneo).

## Cosa NON cambia

- Logo, copy, palette, tipografia, A/B test, analytics, routing, dati.
- I componenti interni (`ImmersiveHero`, `HowItWorks`, `InvestorSection`, `SellerSection`, `Footer`) restano invariati internamente.

## Architettura tecnica

Nuovo componente `PinnedSceneStage`:

```text
<section style={height: 500vh}>           ← spacer che genera lo scroll
  <div className="sticky top-0 h-screen"> ← canvas pinned
    {scenes.map((Scene, i) => (
      <motion.div                          ← cross-fade + micro-translate
        style={{ opacity, y, filter:blur }}
      >
        <Scene />
      </motion.div>
    ))}
  </div>
</section>
```

- `useScroll({ target: spacerRef })` da framer-motion.
- Per ogni scena calcolo finestre di progress (es. scena 2 visibile 0.2–0.4) → `useTransform` su opacity (0→1→1→0), y (24→0→0→-24), blur (6→0→0→6).
- Transizione di 200–300ms equivalente in spazio scroll, easing `cubic-bezier(0.16,1,0.3,1)` (coerente con `ImmersiveAct` attuale).
- Le scene interne mantengono il proprio layout ma vengono renderizzate dentro un contenitore `h-screen overflow-y-auto` così se una scena è più alta del viewport puoi scrollare **internamente** senza rompere il pin (gesture nested gestita).

### File toccati

- **Nuovo**: `src/components/immersive/PinnedSceneStage.tsx` (orchestratore scene + scroll progress).
- **Nuovo**: `src/components/immersive/Scene.tsx` (wrapper motion per singola scena).
- **Modificato**: `src/pages/Index.tsx` — sostituisce la sequenza `ImmersiveAct` con `<PinnedSceneStage scenes={[...]} />`. `BrandWordmark` + `ScrollProgressRail` restano.
- **Rimossi dal flow** (non cancellati): wrapping `ImmersiveAct` numerato per Acts 2–4 (la numerazione "02/05" passa dentro al rail/eyebrow della scena attiva).

### Mobile / accessibilità

- `useReducedMotion` → disattiva blur/translate, lascia solo opacity istantanea.
- Touch: lo scroll del browser resta nativo (no hijack), solo l'effetto visivo è agganciato a `scrollYProgress`.
- Scene con contenuto > viewport: scroll interno con `overscroll-contain` per evitare conflitti.

## Out of scope

- Nessuna nuova libreria (resta `framer-motion`).
- Nessuna modifica a copy, logo, palette, schema, edge functions.
- Altre pagine non toccate.
