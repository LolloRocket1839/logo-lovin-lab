
## Piano: Calcolatore di Rendimento Interattivo

### Cosa fa
Un calcolatore interattivo dove l'investitore inserisce l'importo di investimento e vede in tempo reale: rendimento lordo annuo, rendimento netto (dopo cedolare secca 21%), guadagno bimestrale, e confronto con alternative (conto deposito, BTP). Tutto bilingue IT/EN.

### Componente nuovo
**`src/components/investor/YieldCalculator.tsx`**
- Slider per importo investimento (€100 – €100.000, default €10.000)
- Input numerico sincronizzato con lo slider
- Rendimento lordo target: 8.34% (come da metriche esistenti)
- Calcoli mostrati in cards animate:
  - **Rendimento lordo annuo** (importo × 8.34%)
  - **Rendimento netto annuo** (dopo cedolare secca 21%)
  - **Payout bimestrale** (netto ÷ 6)
  - **Confronto**: conto deposito (3%), BTP (3.5%)
- Barra di confronto visuale (quanto guadagni in più vs alternative)
- Disclaimer obbligatorio: "Stime basate su dati di mercato. I rendimenti passati non garantiscono risultati futuri."
- CTA "Parla con Lorenzo" in fondo
- Bilingue IT/EN tramite `useTranslation`

### Posizione nella pagina
**`src/pages/Investors.tsx`** — Inserito tra la sezione Benefits e la sezione Zones (dopo riga 283), come nuova sezione con titolo "Calcola il tuo rendimento" / "Calculate your yield".

### Stile
Coerente con il design esistente: Card con bordo `border-primary/20`, bg gradient leggero, slider Radix già disponibile, badges emerald per i risultati positivi. Animazioni con framer-motion per i numeri che cambiano.

### File da modificare
1. **Creare** `src/components/investor/YieldCalculator.tsx` — componente calcolatore
2. **Modificare** `src/pages/Investors.tsx` — importare e inserire `<YieldCalculator />` tra Benefits e Zones
