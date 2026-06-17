# Piano: rendere l'intera homepage elegante come la prima parte

## Problema
La prima parte della homepage (`LiquidHomepageStory`) è raffinata: scroll "liquido" con scene pinnate, tipografia display enorme, una sola parola ambientale ("TORINO"), accenti italici primari, ritmo costante. Tutto ciò che viene dopo (`TrustBadge`, `AudienceDoors`, `ClosingManifesto`, footer) è disomogeneo: card classiche, spaziature diverse, scale tipografiche diverse, accenti grafici diversi. Il risultato è che la pagina "si rompe" dopo la prima sezione.

## Obiettivo
Far sì che TUTTA la homepage si legga come un unico oggetto editoriale, con lo stesso DNA della storia liquida: stessa griglia, stessa tipografia, stessa palette di accenti, stesso ritmo di entrata.

## Approccio — "Editorial chapters" dopo la storia liquida

Trasformare le tre sezioni post-hero in **tre capitoli editoriali numerati** (06 · 07 · 08), continuando la numerazione delle scene (01–05) della storia liquida. Stessa griglia `container max-w-6xl`, stesso `font-display tracking-tighter`, stessi accenti `italic text-primary`, stesso `SceneIndex` come marcatore.

```text
[01–05]  Liquid pinned story         (esistente, invariato)
   ↓
[06]     Capitolo: Fiducia           (ex TrustBadge)
[07]     Capitolo: Per chi sei       (ex AudienceDoors)
[08]     Capitolo: Manifesto         (ex ClosingManifesto)
   ↓
         Footer
```

Ogni capitolo:
- Apre con un `ChapterIndex` ("06 · Fiducia") allineato a sinistra, mono, uppercase, muted.
- Headline in `font-display`, scala 4xl→6xl, con una parola in `italic text-primary`.
- Sotto-contenuto (badge, doors, manifesto) ridisegnato come elementi sobri su sfondo `bg-background`, separatori `border-border/40`, niente card colorate, niente ombre pesanti.
- Spaziatura verticale unificata: `py-32 md:py-40`.
- Fade-up unico all'ingresso (300ms, easing standard), niente animazioni in competizione con la storia liquida.

### Capitolo 06 — Fiducia (TrustBadge)
Da griglia di loghi/card a **una riga editoriale**: numero capitolo + headline ("Start-up Innovativa, incubata in 2i3T") + sotto una riga di credenziali separate da `·` in `text-muted-foreground` (anno costituzione, registro imprese, 2i3T, CCIAA). Niente box, solo testo allineato.

### Capitolo 07 — Per chi sei (AudienceDoors)
Da tre card a **tre righe orizzontali** (Investitori / Venditori / Studenti). Per ogni riga: numero piccolo (`I · II · III`), titolo display, una frase, freccia link `→`. Border-top sottile, hover che sposta il titolo di 4px a destra. Niente sfondi colorati, niente icone — solo tipografia.

### Capitolo 08 — Manifesto (ClosingManifesto)
Headline editoriale full-bleed in stile scena 05, una frase per riga, accenti `italic text-primary`, CTA `Parla con Lorenzo` identico per stile al bottone della scena 05 (stesso componente di fatto). Chiude la pagina come un epilogo.

## Componenti nuovi / modificati
- `src/components/home/ChapterIndex.tsx` *(nuovo)* — gemello di `SceneIndex` della liquid story, riutilizzabile fuori dal pinned scroll. Mostra `"06 · Fiducia"` in mono uppercase muted.
- `src/components/home/ChapterShell.tsx` *(nuovo)* — wrapper `<section>` standard: `container max-w-6xl`, padding verticale unificato, fade-up unico via `framer-motion` con `useReducedMotion`.
- `src/components/TrustBadge.tsx` *(riscritto)* — versione editoriale descritta sopra. Si mantiene il nome del file per non rompere import.
- `src/components/home/AudienceDoors.tsx` *(riscritto)* — tre righe tipografiche al posto delle card; stessi link/destinazioni di oggi.
- `src/components/home/ClosingManifesto.tsx` *(riscritto)* — manifesto editoriale + CTA WhatsApp identico alla scena 05.
- `src/pages/Index.tsx` — nessun cambio strutturale; le tre sezioni restano nello stesso ordine, ma ora condividono shell e linguaggio.

## Vincoli rispettati
- **Quiet luxury**: solo sfondi solidi `bg-background`, niente gradient, niente shadow pesanti, fade-up 300ms.
- **Copy**: sentence case, mai cifre/percentuali di rendimento, "Parla con Lorenzo" come CTA primaria.
- **Founder**: nessun nome oltre Lorenzo.
- **Sole H1**: rimane nella scena 01 della liquid story; i capitoli usano `h2`.
- **Mobile**: stessa griglia, padding ridotto (`py-24`), tipografia che scala come nella liquid story.

## Cosa NON cambia
- Logica di routing, link, traduzioni esistenti, analytics.
- `LiquidHomepageStory`, `Navigation`, `MobileHeader`, `Footer`, `BottomNav`, `WhatsAppFAB`, `ExitIntentPopup`, `ScrollQualifier`.
- SEO/meta/JSON-LD della pagina.

## Verifica
- `browser--view_preview /` a desktop e mobile per controllare ritmo unico dalla scena 01 fino al footer.
- `rg "Andrea|Niccolaini"` per confermare zero menzioni nei file toccati.
- Controllo che esista un solo `<h1>` nella pagina.
