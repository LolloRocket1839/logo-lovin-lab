## Cosa costruiamo

Un **"Fair Rent Pledge"**: un badge riutilizzabile visibile su ogni pagina (footer) che linka a una pagina pubblica `/fair-rent-pledge` dove sono elencati impegni concreti e misurabili sulla missione di affitto sostenibile di Jungle Rent. Nessun "verified by" fasullo — è un impegno auto-firmato da Lorenzo, credibile perché ancora a fatti già presenti sul sito (contratti regolari, EU FSE+, Startup Innovativa, canoni allineati OMI).

Stile visivo coerente con il badge Startup Innovativa esistente (pill verde, tooltip, colori dal design system) — non un elemento "bolted on".

## Contenuti della pagina `/fair-rent-pledge`

Titolo: **"Fair Rent Pledge — il nostro impegno per un affitto sostenibile"**

Struttura a 6 impegni verificabili:

1. **Canoni allineati al mercato reale, non gonfiati** — riferimento a OMI Agenzia Entrate e ai prezzi zona pubblicati sul sito.
2. **Solo contratti regolari e registrati** — 4+4, 3+2 concordato, transitori studenti secondo Legge 431/1998; nessun nero, nessun "in bianco parziale".
3. **Trasparenza totale sui costi** — nessuna commissione occulta a inquilino/venditore, servizio contratti gratuito.
4. **Zero speculazione sul disagio abitativo** — target studenti e famiglie del bilocale €45-70k, non luxury flip.
5. **Riqualificazione, non estrazione** — proprietà acquistate → ristrutturate → rimesse a reddito con standard reali (classe energetica dichiarata, arredi nuovi).
6. **Accountability pubblica** — contatto diretto con Lorenzo (WhatsApp/email), pledge modificabile pubblicamente, versionato.

Ogni impegno: titolo + 2-3 righe + link alla prova (pagina/documento pertinente già esistente sul sito).

Chiusura: firma di Lorenzo Oni-Joseph (Amministratore Unico) + data ultimo aggiornamento + rimando a EU FSE+ e Startup Innovativa.

Sentence case rigoroso, IT + EN, JSON-LD `Organization` con `ethicsPolicy` che punta alla pagina.

## Il badge nel footer

Componente `FairRentPledgeBadge` — pill stile "Leaf" verde (icona `Leaf` di lucide), tooltip breve, linka alla pagina. Va accanto al badge Startup Innovativa nel Footer desktop e MobileFooter, così sono i due sigilli affiancati (governance + missione).

```text
┌──────────────────────────────────────────┐
│  [🛡 Startup Innovativa]  [🌱 Fair Rent  │
│                              Pledge]      │
└──────────────────────────────────────────┘
```

## File coinvolti

- **Nuovo** `src/pages/FairRentPledge.tsx` — pagina con Helmet SEO, hero, 6 blocchi impegno, firma, JSON-LD.
- **Nuovo** `src/components/FairRentPledgeBadge.tsx` — analogo a `StartupInnovativaBadge.tsx`, tooltip incluso.
- **Modifica** `src/components/AnimatedRoutes.tsx` — route `/fair-rent-pledge` (+ alias EN `/fair-rent-pledge` uguale, lingua dal LanguageSwitcher globale).
- **Modifica** `src/components/layout/Footer.tsx` e `MobileFooter.tsx` — inserimento badge accanto a Startup Innovativa.
- **Modifica** `src/i18n/locales/*/common.json` (o file dei footer i18n rilevante) — chiavi `fairRentPledge.badge`, `fairRentPledge.tooltip`, contenuti pagina in IT + EN. Chiavi mirror negli altri 5 locali con fallback IT dove servono.
- **Modifica** `scripts/generate-sitemap.ts` + rigenerazione `public/sitemap.xml` — includere la nuova URL così Google e i crawler AI la trovano.

## Fuori scopo (per non gonfiare)

- Nessuna certificazione terza (B-Corp, ISO, ecc.) — non ne abbiamo, non le inventiamo.
- Nessun ridisegno del footer.
- Nessun cambio ai contratti/pricing effettivi — è documentazione della postura già esistente.
