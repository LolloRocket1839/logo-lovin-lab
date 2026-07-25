## Cambio nel capitolo "Fiducia" (homepage)

In `src/components/TrustBadge.tsx`:

1. Rimuovere la lista testuale di credenziali in fondo alla sezione ("START-UP INNOVATIVA · INCUBATA IN 2i3T · UNIVERSITÀ DI TORINO · REGISTRO IMPRESE DI TORINO" — e la versione EN equivalente), inclusa la costante `credentials` e il blocco `<ul>`.
2. Al suo posto inserire il logo 2i3T (`src/assets/2i3t-logo-green.png`, già usato in ThankYou) come link cliccabile a **https://www.2i3t.it/** (`target="_blank"`, `rel="noopener noreferrer"`).
3. Styling minimale coerente con la scena: altezza ~40–48px, opacità leggera, con micro-etichetta accessibile ("Incubata in 2i3T" / "Incubated at 2i3T") come `aria-label` e piccola label testuale opzionale sopra/sotto (es. "Incubata in" · logo) per mantenere il contesto senza reintrodurre la lista.

Nessun altro file toccato.