## Plan

Correggo lo stage immersivo perché ora sembra “non succedere nulla”: ogni scena è `overflow-y-auto`, quindi su mobile il gesto viene catturato dal layer interno invece di far avanzare lo scroll del contenitore pinned.

### Cosa cambio

1. **Rendo lo scroll realmente globale**
   - Tolgo `overflow-y-auto` dai singoli layer scena.
   - I layer restano fissi dentro il canvas pinned e non intercettano lo scroll come mini-pagine interne.

2. **Rendo il ritmo più immediato**
   - Riduzione altezza virtuale: da 100vh per scena a circa 55-60vh per scena.
   - Così basta poco scroll per vedere la scena successiva.

3. **Transizioni più fluide e leggere**
   - Rimuovo il blur animato, che su mobile può causare scatti.
   - Uso solo `opacity`, `y` e `scale`, compositati via GPU.
   - Finestra di transizione più corta, così non resta tutto “fermo” troppo a lungo.

4. **Proteggo layout e logo**
   - Non tocco il logo.
   - Non cambio contenuti, CTA, sezioni o business copy.
   - Intervengo solo su `PinnedSceneStage.tsx` e, se necessario, sul valore `vhPerScene` in `Index.tsx`.

### Risultato atteso

Scrollando, la pagina resta nello stesso viewport, ma le sezioni cambiano davvero e più velocemente, senza effetto scattoso o “non succede nulla”.

### File coinvolti

- `src/components/immersive/PinnedSceneStage.tsx`
- opzionale: `src/pages/Index.tsx` solo per passare un ritmo scroll più rapido