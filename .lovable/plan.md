

# Make Contracts Free

## Changes

### 1. `src/pages/ContrattiLocazione.tsx`
- Set all plan prices to `0` and update display from `€89/€109/€149` to **"Gratuito" / "Free"**
- Remove "/ fisso" / "/ fixed" suffix next to price
- Update hero subtitle: remove "Prezzo fisso, nessuna sorpresa" → replace with "Gratuito per tutti i nostri clienti" / "Free for all our clients"
- Update footer note: remove "Pagamento dopo consegna" → "Servizio gratuito" / "Free service"
- Update structured data (ld+json): set `price: "0"` in Offer schemas, update `estimatedCost` in HowTo to `"0"`
- Update SEO meta description: remove "Da €89" → "Gratuito" / "Free"

### 2. `src/components/blog/ContractBanner.tsx`
- Remove "Da €89" / "From €89" from the banner text

### 3. `src/components/blog/ContractSidebarCard.tsx`
- Update any price references to "Free" / "Gratuito"

### 4. `supabase/functions/mcp-server/index.ts`
- Update `get_lease_services` tool: change plan prices from 89/109/149 to 0 and update description text

### 5. Any other files referencing €89/€109/€149
- Scan and update remaining price references across locale files and components

