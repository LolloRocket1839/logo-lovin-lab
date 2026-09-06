# Audit SEO/performance, copy uniforme in 7 lingue, pulizia palette

## Stato rilevato

- **SEO di base: tutto verde.** Scansione appena eseguita (robots, sitemap, title/description, favicon, social preview, pre-rendering): 9/9 controlli superati. Nessun intervento necessario sui fondamentali.
- **Lighthouse mobile, homepage live (junglerent.it):** Performance **33**, Accessibilita **88**, Best practices 100, SEO 100. LCP 7,8 s, FCP 6,1 s, TBT 2.000 ms, CLS 0,005 (ottimo).
- **Palette:** i token in `index.css` sono gia allineati al logo (verde #4D8E59 → primary 131 30% 36%, salvia #A2AC97 → secondary). Restano circa 40 colori fissi (`bg-white`, `text-white`, `bg-[#...]`) sparsi in 12 file.
- **Traduzioni:** le 7 lingue sono sincronizzate a livello di chiavi (1676/1676); il problema e di tono, non di copertura.

## 1. Performance (priorita dal report)

| Causa | Impatto misurato | Intervento |
|---|---|---|
| Google Fonts CSS bloccante | ~770 ms | Self-host Inter, Instrument Serif, IBM Plex Mono (woff2 in `public/fonts`), `@font-face` con `font-display: swap`, preload solo dei 2 file critici; rimozione di `<link>` a googleapis |
| `jungle-rent-logo.svg` da 159 KB (export Illustrator, cache 0) | 99 KB scaricati subito, precaricati con priorita alta | Ottimizzazione con SVGO (atteso < 15 KB), stesso nome file; `2i3t-logo-green.png` da 82 KB ridimensionato a 2x della resa reale (~10 KB, webp) |
| Chunk `vendor-pdf` (126 KB) e `vendor-charts` (112 KB) scaricati in homepage senza uso | ~200 KB JS inutili | Verifica della catena di import che li trascina nel bundle iniziale (sospetto: `ui/chart.tsx` o un tool importato staticamente) e passaggio a import dinamici; stessa verifica per `vendor-maps` |
| Scritta di sfondo "TORINO" letta come LCP | LCP artificiale su elemento decorativo | Rendering della `BrandWordmark` dopo il primo paint (mount ritardato con `requestIdleCallback`) cosi l'LCP torna sul titolo reale |
| Main thread 9,3 s / bootup 3,6 s | TBT 2.000 ms | Conseguenza dei punti sopra + `vendor-motion` caricato subito: `ScrollProgressRail` e `LiquidHomepageStory` passano a lazy come gia fatto per gli altri blocchi |
| Accessibilita 88 | 3 audit falliti | Contrasto insufficiente nel footer (testi/link in `Footer.tsx` con opacita troppo bassa); tap target < 24 px su un bottone della hero; `<ul>` con figli non `<li>` in una sezione homepage |

Verifica finale: nuovo Lighthouse mobile dopo il publish, obiettivo Performance ≥ 75, Accessibilita 100, CLS invariato.

## 2. Copy uniforme (homepage, Trust, nav, footer) in 7 lingue

Ambito: chiavi `hero`, `audienceDoors`, `sellerHomeEntry`, `liquidStory`/manifesto, `trustBadge`, `nav`, `footer`, `bottomNav`, `announcement` in `it, en, es, fr, de, sv, zh`.

Regole applicate (da memoria progetto):
- Sentence case rigoroso in tutte le lingue, Title Case dei sostantivi solo in tedesco.
- CTA primaria sempre "Parla con Lorenzo" e traduzioni fedeli; WhatsApp come contatto principale.
- Nessuna cifra o percentuale di rendimento, nessuna data di lancio, nessun nome oltre a Lorenzo Oni-Joseph.
- Registro: seconda persona diretta, frasi brevi, tono "quiet luxury" (niente esclamativi, niente superlativi da marketing).
- Trust (capitolo 06): citazione, ruolo e testo "incubata" con stessa lunghezza e stesso registro in tutte le lingue; verifica che la frase rimossa in italiano non sopravviva in altre lingue.

Metodo: tabella IT → 6 lingue per ogni chiave, revisione manuale, poi `node scripts/validate-translations.mjs` e `scripts/validate-sentence-case.js` a zero errori.

## 3. Pulizia colori fissi → token Shadcn

- Sostituzione dei ~40 usi di `bg-white`, `text-white`, `bg-black`, `bg-[#...]`, `text-[#...]` nei 12 file segnalati (tra cui `IPhoneNotesTemplate`, `InvestorZonePage`, `Footer`, `MobileFooter`, `ZoneCard`, `BlogCard`, `CheapEatsMap`, `sheet.tsx`, `drawer.tsx`) con `bg-background`, `bg-card`, `text-primary-foreground`, `bg-foreground/80` ecc.
- Eccezione mantenuta: il blu istituzionale `#003399` del banner UE (obbligo grafico).
- Aggiunta di due token mancanti per casi ricorrenti (overlay scuro su immagini, badge su foto) in `index.css` + `tailwind.config.ts`.
- Aggiornamento della memoria progetto sulla palette (il valore verde 150 45% 18% e superato dal verde logo 131 30% 36%).

## Dettagli tecnici

- Font: download woff2 una tantum in `public/fonts/`, `@font-face` in `index.css` (le fallback metriche gia presenti restano), `<link rel="preload" as="font">` per Inter 400 e Instrument Serif regular.
- SVG: `svgo --multipass` su `public/jungle-rent-logo.svg` e `src/assets/jungle-rent-logo-new.svg`, controllo visivo prima/dopo.
- Bundle: `bunx vite-bundle-visualizer` o `rollup --stats` per individuare l'import statico di `recharts`/`jspdf`; conversione in `lazy()`.
- BrandWordmark: `useEffect` + `requestIdleCallback` (fallback `setTimeout`) per montare la scritta dopo il primo frame; `aria-hidden` invariato.
- Accessibilita: contrasto footer portato a ≥ 4,5:1 sostituendo `text-foreground/45` con `text-muted-foreground`; bottone hero con `min-h-11 min-w-11`.
- Nessuna modifica a Seller Radar, edge functions, contenuti blog, meta tag (gia corretti).
- Le modifiche a font, logo e metadati raggiungono junglerent.it solo dopo il prossimo publish.
