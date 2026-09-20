# Correzione della transizione logo in homepage

## Obiettivo
Eliminare completamente la sovrapposizione tra logo, indice e titolo durante lo scroll, soprattutto su Safari mobile.

## Modifica
- Spostare il logo grande dentro lo spazio già riservato nella prima scena, invece di posizionarlo rispetto al viewport.
- Far dissolvere il logo grande sul posto, senza spostarlo e senza modificare la posizione del testo sottostante.
- Disattivare lo spostamento verticale della prima scena: indice, titolo e descrizione restano fermi mentre iniziano a dissolversi.
- Mantenere separato solo il marchio piccolo nell’header: apparirà in alto a sinistra dopo che il logo grande sarà completamente scomparso.
- Lasciare un breve intervallo senza nessun logo tra le due dissolvenze, evitando immagini sovrapposte.
- Conservare invariati testi, altre scene, header, navigazione e comportamento delle altre pagine.

## Dettagli tecnici
- Intervento limitato a `src/components/immersive/LiquidHomepageStory.tsx`.
- Rimuovere dal logo grande i calcoli `fixed` basati sull’altezza del viewport, che cambiano quando Safari mostra o nasconde le barre.
- Mantenere il portale esclusivamente per il piccolo watermark dell’header.
- Per la prima scena usare `translateY: 0`; le scene 02–05 mantengono il movimento attuale.
- Coordinare le opacità in sequenza: logo grande fuori, breve pausa, watermark piccolo dentro.

## Verifica
- Controllare fotogrammi progressivi dello scroll a 390×844 e 375×594.
- Confermare che logo, indice e titolo non si tocchino mai.
- Confermare che il testo non salga mentre il logo scompare.
- Verificare la comparsa del watermark piccolo e il comportamento normale dell’icona su `/vendi`.
- Eseguire typecheck e build.
