# Compliance cleanup delle superfici pubbliche

## Obiettivo
Rimuovere o correggere esclusivamente le affermazioni indicate, usando la visura del 23/04/2026 come fonte di verità. Non saranno modificati `/vendi`, rotte, form, database o articoli Markdown del blog.

## Interventi
- Ripulire `index.html`: meta, JSON-LD, commento informativo e blocco `noscript`; eliminare claim su soglia minima, payout, Props, prezzi contratti, certificazioni/assicurazioni, affitti brevi, accuratezza, partnership e rapporto parent con 2I3T.
- Correggere dati societari: REA `TO-1355899`, CAP `10135`, data di verifica `2026-09-18`; mantenere 2I3T soltanto come incubatore/memberOf.
- Allineare i dati strutturati venditori al percorso già dichiarato: range indicativo entro 48 ore dal contatto, una visita, proposta scritta, rogito 60–90 giorni.
- Rimuovere i claim contestati dai file pubblici per motori e agenti, dal tool aziendale MCP, dalle FAQ, dal footer, dall’avviso e dalle traduzioni in sette lingue.
- Rimuovere prezzi e domanda sul pagamento dalla pagina contratti, senza aggiungere prezzi o claim sostitutivi nello schema.
- Se il banner non conserva un messaggio verificabile, non renderizzarlo.
- Lasciare invariati gli articoli Markdown; produrre l’elenco separato di quelli che contengono le stringhe richieste.

## Verifica
- Eseguire typecheck, build e validazione SEO.
- Eseguire una ricerca finale full-text delle stringhe richieste sull’intero repository, distinguendo gli articoli Markdown esclusi.
- Fornire un riepilogo file per file delle rimozioni e correzioni.
