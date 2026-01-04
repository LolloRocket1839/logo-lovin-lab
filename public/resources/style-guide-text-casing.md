# Guida di stile: Convenzioni di capitalizzazione testo

## Panoramica

Questo documento definisce le convenzioni di capitalizzazione per tutti i contenuti testuali del progetto Jungle Rent. **Tutte le lingue usano sentence case.**

---

## Regola generale: Sentence case (tutte le lingue)

### Cosa significa sentence case
Solo la **prima lettera della frase** è maiuscola, più i nomi propri.

### Esempi corretti ✅
```
Risorse correlate
Guida completa
Calcolatore budget
Aule studio
Strumenti studenti
Dove mangiare cheap
Related resources
Complete guide
Budget calculator
Study spaces
```

### Esempi errati ❌
```
Risorse Correlate
Guida Completa
Calcolatore Budget
Related Resources
Complete Guide
```

---

## Eccezioni - Sempre maiuscoli

- **Nomi propri di luoghi**: Turin, Torino, San Salvario, Porta Palazzo
- **Acronimi e sigle**: EDISU, GTT, WiFi, FAQ, PDF
- **Nomi di università**: Politecnico, UniTo
- **Nomi di brand**: Jungle Rent, Props

### Esempi con eccezioni ✅
```
Aule studio a Torino: guida completa
San Salvario: guida studenti
Stanze EDISU disponibili
Mobilità sostenibile Torino
Study spaces Turin: complete guide
```

---

## Validazione automatica

### Utilities disponibili

```typescript
import { 
  validateTextCasing, 
  toSentenceCase,
  warnIfInvalidCasing 
} from '@/lib/textCasing';

// Validare un singolo testo
const result = validateTextCasing('Related Resources', 'en');
// { isValid: false, expected: 'Related resources', issues: [...] }

// Convertire automaticamente
const text = toSentenceCase('Risorse Correlate'); // "Risorse correlate"

// Warning in development
warnIfInvalidCasing('Related Resources', 'en', 'MyComponent');
```

---

## Checklist per nuovi contenuti

- [ ] Verificato sentence case per tutti i testi
- [ ] Nomi propri (Turin, Torino, San Salvario, EDISU) sempre maiuscoli
- [ ] Acronimi sempre maiuscoli (GTT, WiFi, FAQ)
- [ ] Coerenza con contenuti esistenti nella stessa pagina

---

## Aree principali di applicazione

| Area | IT | EN |
|------|----|----|
| Titoli pagina | Sentence case | Sentence case |
| Titoli sezioni | Sentence case | Sentence case |
| Etichette navigazione | Sentence case | Sentence case |
| Intestazioni card | Sentence case | Sentence case |
| Breadcrumb | Sentence case | Sentence case |
| Pulsanti/CTA | Sentence case | Sentence case |
| Placeholder form | Minuscolo | Lowercase |
| Messaggi toast | Frase normale | Normal sentence |

---

## Riferimenti

- Utilities: `src/lib/textCasing.ts`
- Tests: `src/lib/textCasing.test.ts`

---

*Ultimo aggiornamento: Gennaio 2026*
