# Piano: semplificazione del sito per i prossimi 90 giorni

## Obiettivo e perimetro

Ridurre il sito a tre funzioni: credibilità aziendale, conversione proprietari su `/vendi`, raccolta email investitori. Le pagine studenti restano online ma fuori dalla navigazione principale.

Vincoli applicati:
- non modificare `src/pages/Sellers.tsx`, `src/components/vendi/VendiLeadForm.tsx`, `leads`, `seller_leads`, Property Radar, auto-blog, blog, funzione `mcp` o traduzioni;
- ogni fase termina con typecheck, build e smoke test di `/`, `/vendi`, `/investitori`, `/blog`, `/blog/:slug`, `/chi-siamo` su desktop e mobile;
- poiché `/vendi` non può essere toccata ma oggi include il proprio layout, `RootLayout` la tratterà temporaneamente come eccezione: tutte le altre pagine useranno il layout unico, mentre `/vendi` manterrà il guscio attuale. Eliminare anche questa eccezione richiederebbe un successivo intervento esplicitamente autorizzato sulla pagina.

## Stato verificato che influenza il piano

- I componenti di layout sono importati direttamente da 38 pagine/template; `BottomNav` è ancora usato da molte pagine vive.
- `LogoModal` è ancora importato da `Footer`; sarà rimosso insieme a quel comportamento, non cancellato isolatamente.
- Cinque file in `src/components/investor/` sono vivi nelle pagine delle zone e devono essere spostati prima di eliminare la cartella.
- `useAnalytics` è ancora chiamato anche da `VendiLeadForm`; per non toccarlo, il file diventerà uno shim no-op temporaneo anziché essere cancellato.
- `RentPriceHistory` usa ancora le notifiche push; i controlli push vanno rimossi dal componente prima di cancellare service worker e tabella.
- `generate-contract`, `budget-advisor`, `get-investor-interest-count`, `notify-investor-whatsapp`, Gmail/GSC e altre funzioni hanno chiamanti vivi elencati sotto.
- Il manifest MCP pubblico punta alla funzione da mantenere `mcp`; solo `public/llms.txt` contiene ancora due riferimenti legacy a `mcp-server`.
- Nel backend live esistono tutte le tabelle candidate. Al controllo attuale: `analytics_events` ha 42.726 righe, `ab_test_events` 11.563, `gmail_settings` 1 e `outreach_templates` 1; le altre candidate hanno zero righe. La view `ab_test_results` dipende da `ab_test_events`.
- Cron live confermati: `student-nurture-cron` giornaliero, `seller-nurture-cron` giornaliero e `gmail-inbox-parser` ogni 10 minuti. `process-email-queue` è documentato come configurato fuori dalle migrazioni e va mantenuto perché il dispatcher email lo usa.

## Ordine di esecuzione

### Fase A — Layout unico e rimozione dei duplicati

1. Creare `src/components/layout/RootLayout.tsx` con `Navigation`, `Footer`, `ScrollToTopOnNavigation` e `<Outlet />`; fino alla fase C include anche `CookieBanner`.
2. Rendere `Navigation.tsx` unico per desktop/mobile, con sole voci `Vendi casa · Investitori · Blog · Chi siamo`; rendere `Footer.tsx` unico e togliere Studenti, Contratti e Connect. Le rotte restano vive.
3. Annidare le rotte vive sotto `RootLayout` in `src/components/AnimatedRoutes.tsx`; mantenere `/vendi` fuori dal guscio condiviso per rispettare il divieto di modifica.
4. Rimuovere gli import/render dei vecchi layout da tutte le pagine vive eccetto `Sellers.tsx`. Le pagine amministrative mantenute possono usare lo stesso guscio o una route senza chrome, ma non importare duplicati.
5. Spostare i cinque componenti zone vivi in `src/components/zones/` e aggiornare `InvestorZonePage.tsx` e `InvestorZonesIndex.tsx`, poi eliminare la cartella legacy.
6. Eliminare componenti morti e coppie desktop/mobile già orfane. `StickyCTA`, `WhatsAppFAB` ed `ExitIntentPopup` sono ancora usati dalla homepage: rimuovere prima i render da `Index.tsx`; non toccano il flusso `/vendi`.

**File nuovi/spostati**
- nuovo `src/components/layout/RootLayout.tsx`
- spostati in `src/components/zones/`: `ZoneMap.tsx`, `ZoneCard.tsx`, `ZoneMetricCard.tsx`, `ZoneComparisonTool.tsx`, `InvestorZonesMap.tsx`

**File modificati principali**
- `src/components/AnimatedRoutes.tsx`
- `src/components/layout/Navigation.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/layout/index.ts`
- tutte le pagine/template oggi risultate con import di layout, tranne `src/pages/Sellers.tsx`: `About.tsx`, `Auth.tsx`, `Blog.tsx`, `BlogPost.tsx`, `CheapEatsDirectory.tsx`, `ContrattiLocazione.tsx`, `FAQ.tsx`, `GymsDirectory.tsx`, `Index.tsx`, `InvestorZonePage.tsx`, `InvestorZonesIndex.tsx`, `Investors.tsx`, `NeighborhoodPage.tsx`, `NeighborhoodsIndex.tsx`, `Privacy.tsx`, `PropertyValuation.tsx`, `StrikeEmergencyDirectory.tsx`, `StudentServicesDirectory.tsx`, `StudentTools.tsx`, `Students.tsx`, `StudySpacesDirectory.tsx`, `TerminiCondizioni.tsx`, `ThankYou.tsx`, `admin/Leads.tsx`, `admin/SellerRadar.tsx`, `landings/AffittiLingottoOspedali.tsx`, `tools/BudgetCalculator.tsx`, `tools/ExamSessionPlanner.tsx`, `tools/GradeCalculator.tsx`, `vendi/LingottoNizzaMillefonti.tsx`, `zone/NizzaMillefontiOspedali.tsx`, e `src/components/landings/SeoLandingTemplate.tsx`.

**Eliminazioni esatte — Fase A**
- `src/components/layout/MobileHeader.tsx`
- `src/components/layout/MobileFooter.tsx`
- `src/components/layout/BottomNav.tsx`
- `src/components/StickyCTA.tsx`
- `src/components/WhatsAppFAB.tsx`
- `src/components/ExitIntentPopup.tsx`
- `src/components/investor/InvestorExitIntentPopup.tsx`
- `src/components/ScrollQualifier.tsx`
- `src/components/QuizPositionAB.tsx`
- `src/components/InvestorQuiz.tsx`
- `src/components/LogoModal.tsx`
- `src/components/sections/HomepageFAQ/HomepageFAQDesktop.tsx`
- `src/components/sections/HomepageFAQ/HomepageFAQMobile.tsx`
- `src/components/sections/HomepageFAQ/index.tsx`
- `src/components/sections/HowItWorks/HowItWorksDesktop.tsx`
- `src/components/sections/HowItWorks/HowItWorksMobile.tsx`
- `src/components/sections/HowItWorks/index.tsx`
- `src/components/sections/InvestorSection/InvestorSectionDesktop.tsx`
- `src/components/sections/InvestorSection/InvestorSectionMobile.tsx`
- `src/components/sections/InvestorSection/index.tsx`
- `src/components/sections/index.ts`
- `src/components/innovative/ImmersiveHero.tsx`
- `src/components/innovative/HowItWorksDrawer.tsx`
- dopo gli spostamenti, tutti i file originali sotto `src/components/investor/`: `ComparisonRow.tsx`, `InvestorExitIntentPopup.tsx`, `InvestorInfographic.tsx`, `InvestorMetricCard.tsx`, `InvestorZonesMap.tsx`, `PartnerLogos.tsx`, `ResourceLibrary.tsx`, `YieldCalculator.tsx`, `ZoneCard.tsx`, `ZoneComparisonTool.tsx`, `ZoneMap.tsx`, `ZoneMetricCard.tsx`
- `src/components/investitori/RisksSection.tsx`
- `src/components/investitori/TaxSection.tsx`

**Ancora importati prima della fase e quindi da scollegare prima di eliminare**
- `MobileHeader`, `MobileFooter`, `BottomNav`: numerose pagine vive elencate sopra.
- `StickyCTA`, `WhatsAppFAB`, `ExitIntentPopup`: `src/pages/Index.tsx`; esiste inoltre un diverso `InvestorStickyCTA.tsx`, che resta.
- `LogoModal`: `src/components/layout/Footer.tsx`.
- componenti zone: `InvestorZonePage.tsx` e `InvestorZonesIndex.tsx`; vengono spostati, non rimossi funzionalmente.
- `HeroLogo.tsx` resta fino alla fase B perché è importato da `LiquidHomepageStory`.

### Fase B — Homepage come router leggero

1. Riscrivere solo la presentazione di `src/pages/Index.tsx`: una frase, tre porte nell’ordine Vendi casa, Investitori, Studenti, badge verificabili start-up innovativa e 2I3T. Un CTA per porta.
2. Eliminare la narrativa scroll, popup/sticky già rimossi in A e ogni dipendenza non più usata. Nessuna modifica alle tre pagine di destinazione o alle traduzioni.
3. Conservare SEO/head esistente solo dove accurato; un solo `<h1>`.

**Eliminazioni esatte — Fase B**
- `src/components/TrustBadge.tsx`
- `src/components/VideoSection.tsx`
- `src/components/home/AudienceDoors.tsx`
- `src/components/home/ClosingManifesto.tsx`
- `src/components/home/SceneReveal.tsx`
- `src/components/home/SellerHomeEntry.tsx`
- `src/components/immersive/BrandWordmark.tsx`
- `src/components/immersive/ImmersiveAct.tsx`
- `src/components/immersive/LiquidHomepageStory.tsx`
- `src/components/immersive/PinnedSceneStage.tsx`
- `src/components/immersive/ScrollProgressRail.tsx`
- `src/components/innovative/HeroLogo.tsx`

**Ancora importati prima della fase**
- `LiquidHomepageStory`, `BrandWordmark`, `ScrollProgressRail`, `TrustBadge`, `AudienceDoors`, `SellerHomeEntry`: `src/pages/Index.tsx`.
- `HeroLogo`: `LiquidHomepageStory.tsx`.
- `SceneReveal`: `TrustBadge`, `ClosingManifesto`, `AudienceDoors`; l’intera catena viene eliminata insieme.
- `ImmersiveAct` è un import inutilizzato di `Index.tsx`; `PinnedSceneStage` è interno alla vecchia esperienza.

### Fase C — Analytics, A/B test e consenso

1. Rimuovere page-view, scroll e A/B tracking da `App.tsx`, blog CTA e altri chiamanti. Rendere deterministico il copy oggi scelto tramite variante A/B, senza cambiare traduzioni.
2. Mantenere `src/hooks/useAnalytics.ts` come shim no-op compatibile perché `/vendi` e il suo form non possono essere modificati; nessuna rete, cookie o storage. Rimuovere `usePageViewTracking` dallo stesso file. In un passaggio successivo autorizzato su `/vendi`, lo shim potrà essere eliminato.
3. Conservare `useUTMTracking.ts` esclusivamente per leggere i parametri URL e salvarli in `sessionStorage`; mantenere `getUTMParams`/formattazione usati dai form.
4. Rimuovere banner/consenso e il DNS prefetch Google Analytics da `index.html`; ricerca finale per `google-analytics`, `googletagmanager`, `gtag(`.
5. Migrazione `supabase/migrations/20260918170000_remove_internal_analytics.sql`: prima `DROP VIEW public.ab_test_results`, poi drop di `ab_test_events` e `analytics_events`. La perdita di 54.289 righe è intenzionale e irreversibile; esportarle prima solo se richiesto in fase esecutiva.
6. Eliminare le funzioni di tracking e ripulire i relativi blocchi da `supabase/config.toml`.

**File modificati principali**
- `src/App.tsx`, `src/hooks/index.ts`, `src/hooks/useAnalytics.ts`, `src/hooks/useUTMTracking.ts`
- tutti i chiamanti trovati di `useAnalytics` e `useABTest`, esclusi `Sellers.tsx` e `VendiLeadForm.tsx` grazie allo shim
- `src/components/blog/BlogCTA.tsx`, `src/components/blog/InlineContextualCTA.tsx`, `index.html`, `src/components/AnimatedRoutes.tsx`, `supabase/config.toml`

**Eliminazioni esatte — Fase C**
- `src/components/CookieBanner.tsx`
- `src/hooks/useCookieConsent.ts`
- `src/hooks/useScrollDepth.ts`
- `src/hooks/useScrollDepthTrigger.ts`
- `src/hooks/useABTest.ts`
- `src/pages/AnalyticsDashboard.tsx`
- `src/pages/ABTestResults.tsx`
- `src/components/analytics/AbandonmentHeatmap.tsx`
- `src/components/analytics/ConversionByScrollChart.tsx`
- `src/components/analytics/EngagementComparisonChart.tsx`
- `src/components/analytics/RecentEventsTable.tsx`
- `src/components/analytics/ScrollDepthChart.tsx`
- `src/components/analytics/TopPagesTable.tsx`
- `supabase/functions/track-analytics/index.ts`
- `supabase/functions/track-ab-test/index.ts`

### Fase D — Superfici morte, contratti, email e database

1. Rimuovere route/import delle pagine morte; ripulire `routeAliases`, robots, sitemap generator e link footer. Tenere `/admin/leads` e `/admin/seller-radar`.
2. Trasformare `ContrattiLocazione.tsx` in landing statica con il solo `ContractRequestDialog`; eliminare wizard, bozze e calcoli. Il dialog oggi invia a Formspree e promette 24h: allinearlo al testo richiesto “scrivi a Lorenzo, ti rispondiamo entro 48 ore” senza cambiare il flusso.
3. Rimuovere i controlli push da `RentPriceHistory.tsx`, lasciando intatti grafico e tabella `rent_price_history`.
4. Prima di eliminare funzioni, scollegare i chiamanti vivi:
   - `AIBudgetAdvisor.tsx` da `budget-advisor`;
   - `PreviewStep.tsx` viene eliminato con `generate-contract`;
   - `SocialProofMini.tsx` da `get-investor-interest-count` e poi rimuovere quel blocco da `Investors.tsx`;
   - `useLeadCapture.ts` e i tool MCP `contact-lorenzo`, `submit-investor-lead`, `submit-seller-lead`, `submit-student-waitlist` da `notify-investor-whatsapp`, preservando l’inserimento lead e le email necessarie;
   - `send-transactional-email/index.ts` non deve più interrogare `investor_interest` prima del drop.
5. Disattivare prima i cron live job 6, 7 e 9 nella migrazione `supabase/migrations/20260918171000_retire_dead_surfaces.sql`; poi eliminare funzioni e tabelle. Nella stessa migrazione: drop della view già gestita in C se presente e drop delle dodici tabelle candidate con `IF EXISTS`.
6. Email: mantenere `send-transactional-email`, `notify-new-lead`, `notify-vendi-lead`, `handle-email-unsubscribe`, `process-email-queue`. Non fondere le due notify in questa fase: la fusione toccherebbe `VendiLeadForm`, vietato. Togliere i quattro nurture e `seller-confirmation` dal registry. Fondere la gestione bounce/complaint in `handle-email-unsubscribe` solo dopo avere riallineato il webhook esterno.
7. Allineare `public/.well-known/mcp.json`, `public/.well-known/ai-plugin.json`, `public/openapi.json`, `public/llms*.txt` alla sola funzione `mcp`; rimuovere da OpenAPI le route `nlweb` e contatore investitori.

**Eliminazioni esatte — Fase D (frontend/supporto)**
- `src/pages/AITesting.tsx`
- `src/pages/ContentAudit.tsx`
- `src/pages/SitemapDebug.tsx`
- `src/pages/Connect.tsx`
- `src/pages/McpRedirect.tsx`
- `src/pages/admin/Inbox.tsx`
- `src/pages/admin/Seo.tsx`
- `src/lib/pushNotifications.ts`
- `public/sw.js`
- `src/data/aiTestingQueries.ts`
- `src/types/aiTesting.ts`
- `src/types/push-notifications.d.ts`
- `src/components/contracts/ContractWizard.tsx`
- `src/components/contracts/DraftList.tsx`
- `src/components/contracts/steps/ContractTypeStep.tsx`
- `src/components/contracts/steps/FeatureChecklistStep.tsx`
- `src/components/contracts/steps/PartiesStep.tsx`
- `src/components/contracts/steps/PreviewStep.tsx`
- `src/components/contracts/steps/PropertyDetailsStep.tsx`
- `src/components/contracts/steps/RentCalculationStep.tsx`
- `src/hooks/useContractDrafts.ts`
- `src/lib/contract-rules.ts`
- `src/components/investitori/SocialProofMini.tsx`

`src/components/contracts/ContractsFAQ.tsx` può restare solo se la landing statica lo usa; altrimenti va eliminato nello stesso passaggio. Questa decisione non cambia il form né il database.

**Eliminazioni esatte — Fase D (funzioni)**
- `supabase/functions/gmail-admin/index.ts`
- `supabase/functions/gmail-inbox-parser/index.ts`
- `supabase/functions/gsc-index-monitor/index.ts`
- `supabase/functions/verify-gsc/index.ts`
- `supabase/functions/check-url-status/index.ts`
- `supabase/functions/nlweb/index.ts`
- `supabase/functions/mcp-server/index.ts`
- `supabase/functions/budget-advisor/index.ts`
- `supabase/functions/generate-contract/index.ts`
- `supabase/functions/get-investor-interest-count/index.ts`
- `supabase/functions/notify-investor-whatsapp/index.ts`
- `supabase/functions/preview-transactional-email/index.ts`
- `supabase/functions/preview-transactional-email/deno.json`
- `supabase/functions/student-nurture-cron/index.ts`
- `supabase/functions/seller-nurture-cron/index.ts`
- `supabase/functions/handle-email-suppression/index.ts`
- `supabase/functions/handle-email-suppression/deno.json`

**Eliminazioni esatte — Fase D (template email)**
- `supabase/functions/_shared/transactional-email-templates/student-nurture-day2.tsx`
- `supabase/functions/_shared/transactional-email-templates/student-nurture-day10.tsx`
- `supabase/functions/_shared/transactional-email-templates/seller-nurture-lingotto-day2.tsx`
- `supabase/functions/_shared/transactional-email-templates/seller-nurture-lingotto-day7.tsx`
- `supabase/functions/_shared/transactional-email-templates/seller-confirmation.tsx`

**Tabelle eliminate dalla migrazione Fase D**
- `contract_drafts`, `investor_interest`, `push_subscriptions`, `ai_test_results`, `gsc_index_snapshots`, `gmail_processed_messages`, `gmail_sent_messages`, `gmail_settings`, `lead_interactions`, `outreach_templates`
- `analytics_events` e `ab_test_events` sono già eliminate in Fase C, con `ab_test_results` prima della tabella.

## Invocazioni esterne non determinabili dal repository

Prima del deploy della Fase D serve una verifica/cutover esplicito; assenza di log recenti non prova assenza di chiamanti esterni:
- `mcp-server`, `nlweb`: endpoint pubblici/agent legacy; il repository non identifica tutti i client esterni.
- `gmail-inbox-parser`, `seller-nurture-cron`, `student-nurture-cron`: i cron sono live ma non sono dichiarati nelle migrazioni correnti.
- `gsc-index-monitor`: possibile cron esterno non verificabile; `verify-gsc` ha anche chiamata manuale dalla pagina admin.
- `check-url-status`, `generate-contract`, `budget-advisor`, `get-investor-interest-count`, `notify-investor-whatsapp`: hanno chiamanti interni oggi; eventuali chiamanti esterni restano non verificabili.
- `preview-transactional-email`: indicato nel codice come invocato da un servizio esterno Lovable.
- `handle-email-suppression`: webhook bounce/complaint esterno; non eliminarlo prima di spostare e testare il webhook su `handle-email-unsubscribe`.
- `process-email-queue`: pianificazione fuori repository; resta perché necessaria alla coda email.

Se uno di questi endpoint esterni non può essere riallineato, la relativa eliminazione viene bloccata e segnalata, senza compromettere le altre parti della fase.

## Verifica e rischi per fase

Dopo ogni fase:
1. `typecheck`, `build`, `validate:seo` quando cambiano route/meta/sitemap.
2. Smoke test desktop/mobile delle sei route obbligatorie, inclusi cambio lingua e apertura di un articolo reale.
3. Test submit non distruttivo o mock per email investitori; in A/C verificare che `/vendi` continui a caricare, allegare foto e preparare il submit senza modifiche al form.
4. Ricerca full-text per import orfani, funzioni eliminate, service worker, GA e tabelle droppate.

Rischi principali:
- **Layout:** doppio header/footer se una pagina mantiene import locali; mitigazione con inventario e smoke test per route.
- **`/vendi`:** eccezione necessaria per il vincolo “non toccare”; nessun refactor del suo codice.
- **Lead investitori:** `investor_interest` è vuota, ma i form attuali scrivono soprattutto in `leads`; testare RPC, conferma email e UTM prima del drop.
- **Email:** eliminare il dispatcher o il webhook troppo presto interrompe invii/soppressioni; mantenere `process-email-queue` e fare cutover prima della cancellazione.
- **Database:** Fase C cancella dati analytics non vuoti; migrazioni in ordine view → tabelle e cron → funzioni/tabelle dipendenti.
- **MCP:** i tool protetti restano operativi; rimuovere solo il server legacy e le sue citazioni, senza modificare la funzione `mcp` o il suo manifest valido.
