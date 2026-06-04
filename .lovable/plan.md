## Obiettivo

Rifare la parte scroll immersiva della homepage: non deve più sembrare una pagina lunga che scende, né una serie di blocchi che appaiono/scompaiono male. Deve diventare una scena pinned, fluida, armoniosa, con elementi che entrano nel frame, restano, poi escono mentre si scrolla — più vicino al feeling Marvis.

## Cosa cambio

1. **Smetto di infilare sezioni intere dentro lo stage**
   - Il problema principale è che ora `PinnedSceneStage` contiene componenti pensati come sezioni pagina normali (`Hero`, `HowItWorks`, `InvestorSection`, `SellerSection`, `Footer`).
   - Questi componenti hanno padding, altezze, animazioni interne, sticky, lazy fallback e layout verticali: dentro una scena pinned diventano pesanti e poco fluidi.
   - Creo invece scene leggere, costruite apposta per il frame immersivo.

2. **Creo una vera coreografia scroll-driven**
   - Un solo viewport sticky.
   - Scroll virtuale corto, non una pagina lunghissima.
   - Ogni scena ha elementi separati: titolo, testo, metrica, CTA, pannello/oggetto visivo.
   - Ogni elemento entra/esce con traiettorie diverse ma coordinate: dal basso, dai lati, leggero scale, fade pulito.
   - Uso una molla (`useSpring`) sul progresso per togliere la sensazione scattosa.

3. **Effetto “liquid Marvis”, ma coerente Jungle Rent**
   - Tipografia grande e protagonista.
   - Background pieno e pulito.
   - Parole/metriche grandi che attraversano il frame.
   - Layer grafici morbidi ma leggeri, senza blur costosi.
   - Movimento continuo: non “fade di sezioni”, ma composizione che si trasforma.

4. **Niente logo toccato**
   - Non cambio il logo.
   - Non cambio `HeroLogo`.
   - Non sostituisco brand, colori o identità.

5. **Tolgo le cause di scatto**
   - Niente `backdrop-blur` nelle parti animate.
   - Niente `filter: blur()`.
   - Niente layer interni scrollabili.
   - Inactive scenes con `pointer-events: none`.
   - Solo `transform` + `opacity`, che il browser gestisce meglio.

6. **Dopo lo stage, il resto della pagina torna normale solo se serve**
   - Lo stage copre la narrazione principale.
   - CTA/FAB/nav restano funzionanti.
   - Il footer/contatti non devono entrare come se fossero una sezione gigante che scorre dentro il frame: vanno trattati come ultimo momento pulito o lasciati fuori dallo stage.

## File previsti

- `src/components/immersive/PinnedSceneStage.tsx`
  - Da semplice crossfade a motore di scene scroll-smooth.

- Nuovo componente, ad esempio:
  - `src/components/immersive/LiquidHomepageStory.tsx`
  - Contiene le scene leggere e coreografate per la homepage.

- `src/pages/Index.tsx`
  - Sostituisco l’attuale lista di sezioni dentro `PinnedSceneStage` con il nuovo story component.
  - Non cambio logo, CTA principali o messaggi business.

## Risultato atteso

Scrollando, la homepage resta visivamente nello stesso frame. Gli elementi entrano, si sovrappongono con senso, escono, e la scena successiva prende forma in modo liquido. Non più “pagina lunga”, non più blocchi rigidi, non più scroll pesante.