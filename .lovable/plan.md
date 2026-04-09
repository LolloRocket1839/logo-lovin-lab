

## Piano: Risolvere i problemi evidenziati negli screenshot

Dagli screenshot e dal feedback ("super tight", "not a fan of the emojis", "the whatsapp green is pretty intense"), ci sono 4 problemi da risolvere:

### Problemi identificati

1. **BottomNav ha 5 voci -- troppo stretto**: "Founders" e "Info" sono separati, ma dovrebbero essere unificati (come da architettura prevista: 4 voci)
2. **WhatsApp banner verde troppo aggressivo**: La variante B (barra verde full-width) si sovrappone al BottomNav ed e visivamente pesante
3. **ExitIntentPopup + ScrollQualifier si sovrappongono**: IMG_1632 mostra entrambi visibili contemporaneamente
4. **Emoji/icona Gift nel popup**: L'icona regalo e il badge "OFFERTA ESCLUSIVA" sono troppo promozionali

### Modifiche

**1. BottomNav.tsx -- Ridurre a 4 voci**
- Rimuovere il tab "Founders" (5o elemento)
- Spostare i contatti fondatore dentro il drawer Info (gia esistente come InfoDrawerContent)
- Risultato: Investi | Vendi | Studenti | Info

**2. WhatsAppFAB.tsx -- Tono meno aggressivo**
- Variante B: sostituire la barra verde full-width con un bottone pill piu discreto (sfondo `bg-foreground` scuro invece di `#25D366`, testo bianco, posizionato sopra il BottomNav)
- Variante A: cambiare il cerchio verde in un design piu neutro (sfondo scuro con icona WhatsApp)

**3. ScrollQualifier.tsx -- Evitare sovrapposizione con ExitIntent**
- Aggiungere check: se ExitIntentPopup e gia visibile (verificare `sessionStorage` key `exitIntentShown`), non mostrare il ScrollQualifier
- Quando ExitIntent si apre, nascondere automaticamente il ScrollQualifier

**4. ExitIntentPopup.tsx -- Rimuovere tono promozionale**
- Sostituire icona `Gift` con qualcosa di piu sobrio (es. `Mail` o rimuovere del tutto)
- Rimuovere badge "OFFERTA ESCLUSIVA" -- usare un testo piu diretto
- Mantenere la funzionalita invariata

### File da modificare
1. `src/components/layout/BottomNav.tsx` -- ridurre a 4 voci, merge founders in info
2. `src/components/WhatsAppFAB.tsx` -- design meno aggressivo
3. `src/components/ScrollQualifier.tsx` -- check anti-sovrapposizione
4. `src/components/ExitIntentPopup.tsx` -- rimuovere emoji e tono promozionale

