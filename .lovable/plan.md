

## Piano: Banner EU più elegante

Dalla screenshot si vede che il testo disclaimer è fuori dal contenitore blu, creando un effetto poco curato. L'obiettivo è rendere la sezione più integrata e raffinata.

### Modifiche

**Entrambi i footer** (`Footer.tsx` e `MobileFooter.tsx`):

1. **Includere il disclaimer dentro il contenitore blu** — il testo "Realizzato con il finanziamento..." resta dentro il `bg-[#003399]` con colore `text-white/60` più sottile
2. **Rimuovere `border-t`** dal wrapper esterno — il banner blu fa già da separatore visivo
3. **Allargare il banner** — `max-w-[320px]` desktop, `max-w-[260px]` mobile per più respiro
4. **Aggiungere padding maggiore** e `rounded-xl` per un aspetto più morbido e moderno
5. **Ridurre il testo disclaimer** a `text-[9px]` con `tracking-wide` per un look più istituzionale e discreto

### Risultato
Una sezione EU compatta, tutta su sfondo blu, con aspetto pulito e istituzionale — come un badge di certificazione, non un blocco separato.

### File da modificare
1. `src/components/layout/Footer.tsx` (linee 299-313)
2. `src/components/layout/MobileFooter.tsx` (linee 120-134)

