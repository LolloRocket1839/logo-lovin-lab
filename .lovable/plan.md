

# Piano: Migliorare Performance Sito (globale, non solo /investitori)

Le ottimizzazioni precedenti hanno già toccato la pagina Investors. Ora intervengo sui colli di bottiglia **trasversali** che rallentano tutto il sito (homepage, navigazione, scroll, prima visita).

## Problemi identificati

1. **Analytics troppo aggressivi** — Ogni `page_view` e ogni milestone di scroll fa una `supabase.functions.invoke('track-analytics')` + `crypto.subtle.digest()` SHA-256. Su SPA con molte navigazioni → decine di chiamate edge bloccanti per UI.
2. **Listener `scroll` multipli e ridondanti** — `Navigation`, `StickyCTA`, `useScrollDepth`, `HeroLogo` (framer `useScroll`) ascoltano tutti lo stesso evento scroll separatamente.
3. **i18n carica 7 lingue in eager** (`it/en/es/fr/de/zh/sv` importati sincroni in `src/i18n/index.ts`) → il main bundle include translations che il 99% degli utenti non userà mai.
4. **`backdrop-blur-xl` rimasti** in mobile menu Navigation, LanguageSwitcher dropdown e altri overlay sticky → blur GPU costoso.
5. **HeroLogo con framer-motion `useSpring` su scroll** → calcoli fisici ad ogni frame anche fuori viewport.
6. **Preload broken** in `index.html`: `<link rel="preload" href="/src/assets/jungle-rent-logo-new.svg">` punta al path di sviluppo, ignorato in produzione (Vite rinomina con hash) → warning + richiesta sprecata.
7. **Axe-core** in dev viene caricato dinamicamente: ok, già gated da `import.meta.env.DEV`.
8. **i18n debug** già `false`: ok.

## Interventi

### A. Sciogliere il carico analytics (impatto alto)
- **Batching**: accodare gli eventi in memoria e flush ogni 5s o su `pagehide` con `navigator.sendBeacon` invece di una invocazione edge per evento.
- **Hash sessione**: calcolare il SHA-256 **una sola volta** e cachare in memoria invece di rigenerarlo ad ogni evento.
- **Skip iniziale**: non sparare `scroll_depth: 0` al mount (è ridondante con `page_view`).
- **`useScrollDepth`**: rimuovere il listener scroll dedicato e leggere lo scroll da uno **scroll manager singleton** condiviso (vedi B).

### B. Scroll manager unificato
- Creare `src/hooks/useGlobalScroll.ts`: un singolo `addEventListener('scroll')` con `requestAnimationFrame`, esposto come hook con subscriber pattern.
- Migrare `Navigation`, `StickyCTA`, `useScrollDepth` a usarlo. Risparmio: da 4 listener + 4 rAF a 1.

### C. i18n lazy-loaded per lingua
- Sostituire gli import sincroni dei 7 JSON con `i18next-http-backend` o dynamic `import()` per lingua attiva.
- Solo `it` (default) caricato eagerly; `en/es/fr/de/zh/sv` lazy on `languageChanged`.
- Stima: -300/500 KB gzipped dal main chunk.

### D. Rimozione blur residui
- `Navigation.tsx` mobile menu: `bg-background/95 backdrop-blur-xl` → `bg-background`.
- `LanguageSwitcher.tsx` trigger e dropdown: rimuovere `backdrop-blur-*`, alzare opacità del bg.
- Mantenere blur solo su overlay momentanei (Dialog, ExitIntent, CookieBanner).

### E. HeroLogo: gating più aggressivo
- Smontare/disattivare le `useTransform` quando lo scroll supera 300px (logo già fade-out): smettere di calcolare spring su tutto il resto della pagina.
- Alternativa: sostituire framer-motion con CSS `transform` controllato da una variabile `--scroll-y` aggiornata via rAF dal scroll manager (B).

### F. Fix preload index.html
- Rimuovere `<link rel="preload" href="/src/assets/jungle-rent-logo-new.svg" as="image">` (path dev non valido in produzione).
- Sostituire con preload sull'asset PNG già pubblico se serve LCP, oppure accettare che il logo venga caricato dal bundle.

### G. Micro-fix
- `AnnouncementBanner`: `animate-pulse` → opzionale, costo trascurabile, lo lascio.
- `QueryClient` già configurato bene (staleTime 5min).
- Verificare che `vendor-pdf`, `vendor-maps`, `vendor-charts` non siano importati nella homepage (controllo con sourcemap visualizer in dry-run).

## Cosa NON tocco
- Logica business, form, RLS, edge functions backend.
- Animazioni framer-motion già gated da `useReducedMotion`.
- Routing e SEO (Helmet, JSON-LD, sitemap).

## Risultato atteso
- **TTI/LCP homepage**: -20/30% su mobile (meno JS, meno blur, meno listener).
- **Scroll FPS**: stabile a 60fps anche su Android low-end (un solo listener vs quattro).
- **Bundle iniziale**: -300KB+ gzip (i18n lazy).
- **Network**: -60% chiamate `track-analytics` (batching).

