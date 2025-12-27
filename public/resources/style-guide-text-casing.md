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

## Implementazione nel codice

### Pattern consigliato per contenuti bilingui

```tsx
const content = {
  it: {
    title: 'Risorse Correlate',        // Title Case
    subtitle: 'Guida Completa',        // Title Case
  },
  en: {
    title: 'Related resources',        // sentence case
    subtitle: 'Complete guide',        // sentence case
  },
};
```

### Checklist per nuovi contenuti

- [ ] Verificato Title Case per testo italiano
- [ ] Verificato sentence case per testo inglese
- [ ] Nomi propri (Turin, San Salvario, EDISU) sempre maiuscoli
- [ ] Acronimi sempre maiuscoli (GTT, WiFi, FAQ)
- [ ] Coerenza con contenuti esistenti nella stessa pagina

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

- File già aggiornati con queste convenzioni:
  - `src/pages/CheapEatsDirectory.tsx`
  - `src/pages/tools/BudgetCalculator.tsx`
  - `src/pages/StudySpacesDirectory.tsx`
  - `src/pages/PropertyValuation.tsx`

---

*Ultimo aggiornamento: Dicembre 2025*
