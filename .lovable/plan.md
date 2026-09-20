# Ripristino dello scroll immersivo della home

## Obiettivo
Riportare la home al movimento fluido e inerziale del riferimento, mantenendo il copy attuale, le sette scene e il fix della barra mobile.

## Interventi
1. Reinstallare `lenis` alla versione `^1.3.16` presente nel commit di riferimento.
2. Aggiungere un controller di smooth scroll attivo esclusivamente su `/` e `/en`, con arresto e distruzione completa quando si lascia la home o si preferisce movimento ridotto.
3. Collegare l’avanzamento delle sette scene al valore di scroll smussato, ripristinando spring, dissolvenza, deriva verticale, `will-change` e pinning del comportamento originale senza ripristinare testi superati.
4. Riallineare `SceneReveal` e gli altri componenti immersivi ai tempi e all’easing originali, lasciando invariato il resto del sito.
5. Mantenere `Navigation`, `Footer` e `BottomNav` fuori da Lenis e dalla transizione della pagina; verificare che nessun antenato della barra abbia `transform` e che il suo z-index resti sopra la scena.
6. Cercare i claim vietati (`€100`, `payout`, `posti limitati`, `limited spots`) e non pubblicare se ricompaiono.

## Verifica
- Typecheck e build.
- Browser a 1280×800 e 390×844, con scroll a impulsi tipo rotella e sequenze ravvicinate tipo trackpad.
- Confermare sette scene, stage sticky, avanzamento progressivo, scroll nativo sulle pagine interne e BottomNav fissa su mobile.
- Pubblicare il progetto dopo il superamento dei controlli.

## Nota tecnica
Nel commit indicato `lenis` è dichiarato come dipendenza, ma non compare un’inizializzazione nel codice tracciato. Verranno quindi ripristinati fedelmente i parametri di progressione originali (`useSpring`, range scena, translate verticale e `will-change`) e aggiunta l’inizializzazione Lenis limitata alla home richiesta.
