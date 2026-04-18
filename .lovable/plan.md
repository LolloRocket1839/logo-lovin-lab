

## Analisi richiesta

L'utente chiede perché ci sono così tanti visitatori dalla Cina. Questa è una domanda di analisi/diagnostica, non una richiesta di build. Devo:

1. Verificare cosa dicono effettivamente i dati analytics
2. Capire se è traffico bot/scraper non filtrato
3. Proporre azioni concrete

## Plan

### Step 1 — Indagine dati
Eseguo query in parallelo su:
- `analytics_events` aggregato per paese/timezone/lingua (se tracciato) — ma guardando `useAnalytics.ts` vedo che NON tracciamo geo né lingua, solo user_agent anonimizzato (browser/OS/device) e referrer hostname
- `analytics_events` aggregato per `referrer` e `user_agent` ultimi 7 giorni
- `analytics_events` per `session_id` distinct count + eventi per sessione (per capire se sono burst da pochi session_id = scraper)
- Edge function logs di `track-analytics` per vedere quanti vengono filtrati come bot vs passano

In parallelo controllo `analytics--read_project_analytics` per vedere se Lovable espone dati geo lato edge/CDN.

### Step 2 — Diagnosi probabile
Ipotesi (da confermare con dati):
1. **Bot/scraper cinesi** non filtrati (Bytespider, Baidu, Sogou, Yandex variants, GPTBot-like) — il filtro UA esiste sia client che server, ma molti scraper cinesi usano UA generici "Mozilla/5.0" senza identificarsi
2. **AI crawler** (DeepSeek, Qwen, Doubao/ByteDance) che indicizzano il sito multilingua (abbiamo `zh.json` → versione cinese pubblica → attira crawler cinesi)
3. **Click farm / referral spam** mirati al dominio `.live` o `.online`
4. **Traffico legittimo studenti cinesi** interessati a Torino (improbabile come volume dominante)

### Step 3 — Report all'utente
Presento:
- Numeri reali (sessioni, eventi, top user_agent, top referrer)
- Diagnosi più probabile
- 3 azioni concrete (estendere blacklist UA, filtrare per Accept-Language=zh+timezone Asia/*, considerare se rimuovere `zh` locale dal sitemap se non strategico)

### Step 4 — Decisione utente
Chiedo se vuole che proceda con:
- **A**: Solo report + raccomandazioni (nessun codice cambiato)
- **B**: Estendere blacklist bot in `track-analytics` edge function + client `useAnalytics`
- **C**: Rivedere strategia locale `zh` (es. nascondere da hreflang/sitemap finché non serve davvero)

## Esecuzione

Questa è una richiesta di **analisi/Q&A**, non di build. Procedo con read-only queries in default mode appena approvato per dare la risposta. Nessun file modificato finché non c'è una decisione strategica.

