

## Possibili cause del calo di performance

Non ho ancora dati di profiling, ma analizzando le modifiche recenti alla pagina `/investitori` e i pattern noti del progetto, ecco le cause **più probabili** del rallentamento percepito:

### 1. `backdrop-blur` su contenuti animati (causa più comune)
La pagina Investors usa probabilmente `backdrop-blur` su card/sezioni sopra elementi animati (gradient, motion divs). Ogni frame il browser deve ri-campionare e sfocare tutti i pixel sottostanti → frame drop.

### 2. Animazioni framer-motion non ottimizzate
- `PageTransition` applica fade+translate ad ogni cambio rotta (compreso il click sul banner rosso → `/investitori`).
- Possibili `motion.div` con `whileInView` o transizioni continue nelle sezioni della pagina Investors (Hero, Metrics, FAQ).

### 3. Bundle pagina Investors pesante
La rotta `/investitori` è lazy-loaded ma la pagina importa molti componenti (Hero, QuickContactBar, EmailFirstForm, FAQ, RequestInfoForm, LegalDisclaimerFooter, ecc.). Primo render dopo il click dal banner = parsing/eval di un chunk grosso.

### 4. Pulse animation del banner sempre attiva
Il pallino `animate-pulse` nel banner gira 24/7 in cima a ogni pagina. Trascurabile da solo, ma somma con altri layer animati.

### 5. Re-render globali da `AuthProvider` / `usePageViewTracking`
Hook globali in `App.tsx` (page view, scroll depth, UTM) si rieseguono ad ogni navigazione SPA.

## Cosa propongo di fare

**Diagnosi prima, fix dopo.** In default mode eseguo questi step:

1. **Leggere `src/pages/Investors.tsx`** e tutti i sotto-componenti (Hero, Metrics, ecc.) per identificare:
   - usi di `backdrop-blur`
   - `motion.*` con animazioni continue o `whileInView` non gated da `useReducedMotion`
   - import sincroni pesanti che potrebbero essere lazy

2. **Eseguire profiling browser** (`browser--performance_profile` + `start_profiling` / `stop_profiling`) sulla pagina `/investitori` per misurare:
   - Long tasks > 50ms
   - Layout/paint counts
   - Top funzioni per self-time

3. **Controllare network** per chunk size e richieste duplicate dopo navigazione.

4. **Applicare fix mirati** in base a cosa trovo, scegliendo tra:
   - Sostituire `backdrop-blur` con `text-shadow` o background solido (pattern già noto nel progetto)
   - Rimuovere/semplificare animazioni ridondanti
   - Memoizzare componenti pesanti (`React.memo`)
   - Lazy-load sezioni below-the-fold della pagina Investors
   - Disabilitare `animate-pulse` del banner se identificato come costoso

## Cosa NON faccio
- Non tocco logica di business, form, DB, RLS
- Non rimuovo funzionalità (solo ottimizzazioni rendering)
- Non upgrado l'istanza Lovable Cloud (è un problema frontend, non backend)

