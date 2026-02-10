

# MCP Server per Jungle Rent

Creare un MCP (Model Context Protocol) server come edge function per esporre i dati di Jungle Rent ad agenti AI esterni.

## Cosa fa

Il server MCP permette ad agenti AI (come Claude, ChatGPT con plugins, o qualsiasi client MCP-compatibile) di interrogare programmaticamente i dati Jungle Rent: articoli del blog, quartieri, FAQ, servizi e informazioni aziendali.

## Tools esposti dal server

Il server esporra questi "tools" MCP:

1. **search_articles** - Cerca tra gli articoli del blog per keyword, categoria o lingua
2. **get_neighborhoods** - Restituisce info sui quartieri di Torino (affitti, sicurezza, trasporti, vita notturna)
3. **get_company_info** - Restituisce informazioni aziendali strutturate (contatti, servizi, founders)
4. **get_faq** - Cerca nelle FAQ per argomento
5. **get_events** - Restituisce eventi correnti a Torino
6. **get_rent_prices** - Restituisce prezzi medi affitto per zona

## Dettagli tecnici

### Struttura file

- `supabase/functions/mcp-server/index.ts` - Edge function con Hono + mcp-lite

### Dipendenze

- `mcp-lite` (npm:mcp-lite@^0.10.0) - Libreria leggera per MCP servers
- `hono` - Web framework per il routing (gia disponibile in Deno)

### Configurazione

- Aggiunta entry `[functions.mcp-server]` in `supabase/config.toml` con `verify_jwt = false` (il server deve essere pubblico per gli agenti AI)

### Implementazione

L'edge function usera `McpServer` e `StreamableHttpTransport` di mcp-lite per gestire le richieste MCP over HTTP. I dati saranno embedded direttamente nella function (come gia fatto in `perplexity-search`), includendo:

- Indice degli articoli blog (~30 articoli con titoli IT/EN, excerpt, categorie, keyword)
- Dati quartieri (6 quartieri principali con affitti, rating, coordinate)
- FAQ principali (~20 domande/risposte bilingue)
- Info aziendali statiche (P.IVA, contatti, founders, servizi)
- Prezzi affitto per zona da `turinZonePrices`

### Endpoint

Il server sara raggiungibile a:
`https://ekrrrlrwdshhlqnuxjbz.supabase.co/functions/v1/mcp-server`

### Aggiornamenti al sito

- Aggiunta del link al MCP server nei file `llms.txt`, `llms-full.txt` e `ai-assistant-info.txt` nella sezione dedicata ai file AI
- Aggiunta di un commento nel `robots.txt` con l'URL del server MCP

