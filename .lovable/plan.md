

## Obiettivo
Rimuovere `RisksSection` e `TaxSection` dalla pagina `/investitori`.

## Modifiche

**`src/pages/Investors.tsx`**
- Rimuovere import di `TaxSection` e `RisksSection`
- Rimuovere `<TaxSection />` e `<RisksSection />` dal JSX

I file componente `RisksSection.tsx` e `TaxSection.tsx` restano nel filesystem (non eliminati) così sono pronti se vuoi reintegrarli. Se preferisci cancellarli del tutto, dimmelo.

## Cosa NON tocco
- `LegalDisclaimerFooter` resta (copre il disclaimer legale minimo per compliance EOI)
- Nessuna modifica i18n, DB, edge functions, analytics

