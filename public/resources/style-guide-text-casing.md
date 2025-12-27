# Guida di stile: Convenzioni di capitalizzazione testo

## Panoramica

Questo documento definisce le convenzioni di capitalizzazione per tutti i contenuti testuali del progetto Jungle Rent, garantendo coerenza tra le versioni italiana e inglese.

---

## 🇮🇹 Italiano: Title Case

### Regola generale
In italiano si usa il **Title Case** (Iniziali Maiuscole) per:
- Titoli di sezioni
- Intestazioni di card
- Etichette di navigazione
- Titoli di pagine

### Esempi corretti ✅
```
Risorse Correlate
Guida Completa
Calcolatore Budget
Aule Studio
Strumenti Studenti
Dove Mangiare Cheap
```

### Esempi errati ❌
```
risorse correlate
guida completa
calcolatore budget
```

### Eccezioni
- **Articoli e preposizioni** restano minuscoli se non sono la prima parola:
  - ✅ "Guida per Studenti"
  - ✅ "Dove Mangiare a Torino"
- **Nomi propri** mantengono sempre la maiuscola:
  - ✅ "Guida San Salvario"
  - ✅ "Aule EDISU"

---

## 🇬🇧 English: Sentence case

### Regola generale
In inglese si usa il **sentence case** (Solo prima lettera maiuscola) per:
- Titoli di sezioni
- Intestazioni di card
- Etichette di navigazione
- Titoli di pagine

### Esempi corretti ✅
```
Related resources
Complete guide
Budget calculator
Study spaces
Student tools
Cheap eats directory
```

### Esempi errati ❌
```
Related Resources
Complete Guide
Budget Calculator
Study Spaces
```

### Eccezioni - Sempre maiuscoli
- **Nomi propri di luoghi**: Turin, San Salvario, Porta Palazzo
- **Acronimi e sigle**: EDISU, GTT, WiFi
- **Nomi di università**: Politecnico, UniTo
- **Nomi di brand**: Jungle Rent

### Esempi con eccezioni ✅
```
Study spaces Turin: Complete guide
San Salvario: Student guide
EDISU study rooms
Sustainable mobility Turin
```

---

## Validazione automatica

### Utilities disponibili

Il progetto include utilities per validare automaticamente il text casing:

```typescript
import { 
  validateTextCasing, 
  toTitleCase, 
  toSentenceCase,
  warnIfInvalidCasing 
} from '@/lib/textCasing';

// Validare un singolo testo
const result = validateTextCasing('Related Resources', 'en');
// { isValid: false, expected: 'Related resources', issues: [...] }

// Convertire automaticamente
const itText = toTitleCase('risorse correlate');  // "Risorse Correlate"
const enText = toSentenceCase('Related Resources'); // "Related resources"

// Warning in development
warnIfInvalidCasing('Related Resources', 'en', 'MyComponent');
// Console warning: [TextCasing] (MyComponent) English text should use sentence case...
```

### Test runner

Per verificare che le utilities funzionino correttamente:

```typescript
import { runTextCasingTests } from '@/lib/textCasing.test';

// In console del browser (solo dev):
runTextCasingTests();
```

### Uso nei componenti

```tsx
import { warnIfInvalidCasing } from '@/lib/textCasing';

const MyComponent = () => {
  const content = {
    it: { title: 'Risorse Correlate' },
    en: { title: 'Related resources' },
  };
  
  // Warning automatico in development se casing errato
  if (import.meta.env.DEV) {
    warnIfInvalidCasing(content.en.title, 'en', 'MyComponent.title');
  }
  
  return <h2>{lang === 'it' ? content.it.title : content.en.title}</h2>;
};
```

---

## Checklist per nuovi contenuti

- [ ] Verificato Title Case per testo italiano
- [ ] Verificato sentence case per testo inglese
- [ ] Nomi propri (Turin, San Salvario, EDISU) sempre maiuscoli
- [ ] Acronimi sempre maiuscoli (GTT, WiFi, FAQ)
- [ ] Coerenza con contenuti esistenti nella stessa pagina
- [ ] Eseguito `warnIfInvalidCasing()` durante lo sviluppo

---

## Aree principali di applicazione

| Area | IT | EN |
|------|----|----|
| Titoli pagina | Title Case | Sentence case |
| Titoli sezioni | Title Case | Sentence case |
| Etichette navigazione | Title Case | Sentence case |
| Intestazioni card | Title Case | Sentence case |
| Breadcrumb | Title Case | Sentence case |
| Pulsanti/CTA | Title Case | Sentence case |
| Placeholder form | Minuscolo | Lowercase |
| Messaggi toast | Frase normale | Normal sentence |

---

## Riferimenti

- Utilities: `src/lib/textCasing.ts`
- Tests: `src/lib/textCasing.test.ts`
- File già aggiornati con queste convenzioni:
  - `src/pages/CheapEatsDirectory.tsx`
  - `src/pages/tools/BudgetCalculator.tsx`
  - `src/pages/StudySpacesDirectory.tsx`
  - `src/pages/PropertyValuation.tsx`

---

*Ultimo aggiornamento: Dicembre 2025*

## Aree principali di applicazione

| Area | IT | EN |
|------|----|----|
| Titoli pagina | Title Case | Sentence case |
| Titoli sezioni | Title Case | Sentence case |
| Etichette navigazione | Title Case | Sentence case |
| Intestazioni card | Title Case | Sentence case |
| Breadcrumb | Title Case | Sentence case |
| Pulsanti/CTA | Title Case | Sentence case |
| Placeholder form | Minuscolo | Lowercase |
| Messaggi toast | Frase normale | Normal sentence |

---

## Riferimenti

- File già aggiornati con queste convenzioni:
  - `src/pages/CheapEatsDirectory.tsx`
  - `src/pages/tools/BudgetCalculator.tsx`
  - `src/pages/StudySpacesDirectory.tsx`
  - `src/pages/PropertyValuation.tsx`

---

*Ultimo aggiornamento: Dicembre 2025*
