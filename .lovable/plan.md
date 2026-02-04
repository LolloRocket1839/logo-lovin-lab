

# Piano: miglioramento layout Budget Calculator mobile

## Problemi identificati dagli screenshot

| Screenshot | Problema |
|------------|----------|
| 1 | Grande spazio vuoto tra i tab Semplice/Avanzato e la card Quartiere |
| 2 | Etichette del grafico a torta sovrapposte e difficili da leggere su mobile |
| 3 | Spaziatura verticale eccessiva tra le sezioni |

---

## Modifiche proposte

### 1. Header piu compatto su mobile

Ridurre il padding della sezione header da `py-8 md:py-12` a `py-4 md:py-12` e lo spazio tra elementi:

```text
Attuale:
- py-8 per header section
- mb-6 per title block
- mb-6 per collapsible presets

Nuovo:
- py-4 md:py-8 per header section
- mb-4 per title block
- mb-4 per collapsible presets
```

### 2. Grafico a torta ottimizzato per mobile

Sostituire le label inline (che si sovrappongono) con una legenda sotto il grafico:

```text
Attuale:
- Labels sulla torta: "Affitto 55%", "Spesa 22%"
- Sovrapposizione su schermi piccoli

Nuovo:
- Torta senza label inline
- Legenda compatta sotto il grafico
- Grid 2 colonne per gli elementi legenda
```

### 3. Card totale budget sticky su mobile

Rendere la card con il totale budget sticky in alto su mobile per dare feedback immediato mentre l'utente modifica i parametri:

```text
Nuovo comportamento mobile:
- Card totale: position sticky, top sotto header
- Background opaco per leggibilita
- Compatta (solo totale, no lista breakdown)
```

### 4. Spaziatura ridotta

| Elemento | Attuale | Nuovo |
|----------|---------|-------|
| Section padding | py-8 md:py-10 | py-4 md:py-10 |
| Card spacing | space-y-6 | space-y-4 md:space-y-6 |
| CardHeader padding | pb-4 | pb-2 md:pb-4 |
| CardContent padding | p-6 | p-4 md:p-6 |

### 5. Nascondere elementi secondari su mobile

Usare `hidden md:block` per:
- Collapsible presets (profili predefiniti)
- Related tools card
- 12-month projection chart

---

## File da modificare

| File | Modifiche |
|------|-----------|
| `src/pages/tools/BudgetCalculator.tsx` | Header compatto, spacing ridotto, sticky total, chart legend, elementi nascosti su mobile |

---

## Dettaglio tecnico

### Grafico a torta con legenda (invece di label inline)

```tsx
// Rimuovere label dalla Pie
<Pie
  data={budgetBreakdown}
  label={false}  // Disabilita label inline
  labelLine={false}
/>

// Aggiungere legenda compatta sotto
<div className="grid grid-cols-2 gap-1 mt-2 text-xs">
  {budgetBreakdown.map((item, i) => (
    <div className="flex items-center gap-1">
      <div className="w-2 h-2 rounded-full" style={{ bg: CHART_COLORS[i] }} />
      <span>{item.name}: {Math.round(item.value / totalBudget * 100)}%</span>
    </div>
  ))}
</div>
```

### Card totale sticky su mobile

```tsx
<Card className="lg:relative sticky top-16 z-10 border-primary/20 bg-background/95 backdrop-blur-sm">
  {/* Versione compatta su mobile, completa su desktop */}
  <CardContent className="pt-4 md:pt-6">
    <div className="text-center">
      <p className="text-sm text-muted-foreground hidden md:block">
        Budget mensile per vivere a {selectedArea}
      </p>
      <div className="text-3xl md:text-5xl font-bold text-primary">
        €{totalBudget}
      </div>
      <span className="text-xs md:text-sm text-muted-foreground">/mese</span>
    </div>
    
    {/* Breakdown list nascosto su mobile */}
    <div className="hidden md:block mt-4 space-y-1.5">
      {/* lista breakdown */}
    </div>
  </CardContent>
</Card>
```

### Riorganizzazione layout mobile

Su mobile, posizionare la card totale sticky prima degli input, cosi l'utente vede sempre il risultato mentre modifica i parametri.

---

## Risultato atteso

- Header 40% piu compatto su mobile
- Grafico leggibile senza sovrapposizioni
- Totale budget sempre visibile durante lo scroll
- Meno scroll verticale complessivo
- Esperienza piu fluida e professionale

