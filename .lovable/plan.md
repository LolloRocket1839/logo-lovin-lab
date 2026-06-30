## Piano: Scurire il colore del pulsante WhatsApp fluttuante

### Obiettivo
Rendere il verde del pulsante WhatsApp fluttuante (FAB) visibilmente più scuro, come richiesto.

### File coinvolto
- `src/components/WhatsAppFAB.tsx`

### Modifica
- Cambiare il colore base da `hsl(142_70%_49%)` (verde brillante WhatsApp) a `hsl(142_70%_42%)` (verde più scuro e sobrio).
- Aggiornare il colore hover da `hsl(142_70%_44%)` a `hsl(142_70%_36%)` per coerenza.
- Il testo rimane bianco per mantenere il contrasto.

### Nota
La modifica è limitata esclusivamente allo stile visivo del FAB, nessuna funzionalità cambia.