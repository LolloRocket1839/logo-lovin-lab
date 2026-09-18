# Roadmap

## Fatto
- Pagina /vendi in italiano: nuovi campi su `seller_leads`, modulo con foto, email a Lorenzo + conferma, articolo sulla casa ereditata, meta e collegamenti interni
- Articolo invest-to-rent (it/en), collegamenti interni investitori, meta investitori 7 lingue
- Ricerca concorrenti annunci immobiliari (Concrete, Walliance, Recrowd)
- Pulizia compliance completa: rimozioni/correzioni, verifiche e riepilogo file per file

## Semplificazione architettura (piano approvato 18/09/2026)
- [ ] Fase A — layout unico RootLayout, nav desktop 4 voci, BottomNav mobile riscritta (Home/Vendi/Investi/Blog), rimozione duplicati e componenti morti
- [ ] Fase B — homepage come router leggero (3 porte + badge)
- [ ] Fase C — rimozione codice analytics/AB/consenso; tabelle analytics_events e ab_test_events NON droppate, solo commento "deprecated 2026-09-18, drop after 2026-12-31"; drop della view ab_test_results
- [ ] Fase D — rimozione superfici morte, contratti statici, funzioni edge e tabelle inutilizzate, cron live disattivati
- [ ] Fase E — semplicità: niente popup/sticky/parallax, homepage e investitori ridotti, blog post minimale, sistema visivo unico, pulizia dipendenze npm

## In attesa
- Parte 2 campagna a pagamento: budget e approvazione dell'utente
