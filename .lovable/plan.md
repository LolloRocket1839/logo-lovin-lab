# More MCP tools that fit Jungle Rent's MVP

Current server exposes 8 tools (contact_jungle_rent, get_neighborhoods, get_investor_zones, estimate_rent, estimate_property_value, contact_lorenzo, list_available_rooms, submit_investor_lead). Below are the ones that would actually pay off given what already lives in the codebase — no new pages, no new edge functions unless noted.

## Proposed new tools

1. **`submit_seller_lead`** — sale-side counterpart to `submit_investor_lead`. Validates against the existing seller form schema (address, rooms, sqm, condition, asking price, timeline, privacy_consent). Calls `insert_lead` RPC with `lead_type: "seller"`, source `mcp-seller:<origin>`, fires WhatsApp + `lead-notification` / `lead-confirmation` emails. Closes the loop for the "sell my Turin apartment" flow currently on `/vendi-casa-torino`.

2. **`submit_student_waitlist`** — waitlist counterpart for `/students`. Fields: name, email, target_month, budget_eur, preferred_zones[], room_type (single/double), privacy_consent. `insert_lead` with `lead_type: "student"`. No yield/price promises returned.

3. **`quick_offer_simulator`** — wraps the `/quick-offer` logic (30% discount, €130k budget cap, memory rule). Input: address/zone, sqm, rooms, condition, asking_price. Output: indicative Jungle Rent offer range + explicit disclaimer + WhatsApp deep-link. Pure calculation, no side effects.

4. **`search_blog`** — reads `src/data/blog/searchIndex.ts` (already built). Input: query, optional category (`students|investors|sellers|tourists|societa`), optional language. Returns `[{ slug, title, excerpt, url, category, language }]`. Lets Claude/ChatGPT cite Jungle Rent articles by URL instead of hallucinating.

5. **`get_contract_info`** — read-only reference tool describing the free contract-drafting service (48–72h, 2024 rules, ministerial templates). Returns service description + link to `/contratto-affitto-torino` + WhatsApp CTA. Prevents the LLM from inventing prices (memory: contract price is zero).

6. **`get_seller_radar_zones`** — exposes the 9 prioritized Turin neighborhoods + first-acquisition target (bilocale €45k–70k) as structured data so an assistant can answer "where does Jungle Rent buy?" accurately. Reads from existing seller-radar data files. Read-only.

## Deliberately NOT proposed

- **Live listings / inventory search** — no live inventory table yet; `list_available_rooms` already returns the manual-allocation message.
- **Public yield/return figures** — blocked by memory rule (`no-public-yield-figures`). Any tool returning Jungle Rent ROI numbers is off-limits.
- **Admin/seller-radar mutations** — `/admin/seller-radar` is internal; exposing scraper controls via MCP would leak ops surface.
- **Auth'd per-user tools** (my leads, my drafts) — would require the Supabase OAuth 2.1 path (issuer + consent route). Worth doing later, but a much bigger change than the current anonymous action tools. Flag only, not in this batch.

## Files to touch

- New: `src/lib/mcp/tools/submit-seller-lead.ts`, `submit-student-waitlist.ts`, `quick-offer-simulator.ts`, `search-blog.ts`, `get-contract-info.ts`, `get-seller-radar-zones.ts`
- Edit: `src/lib/mcp/index.ts` (register 6 tools, bump to 0.4.0, extend `instructions`)
- Regenerate: `.lovable/mcp/manifest.json` + `public/.well-known/mcp.json` via `app_mcp_server--extract_mcp_manifest`
- Redeploy: `supabase/functions/mcp` edge function

## Open questions before I build

- Want all 6, or a subset? My pick if you want to trim: **1, 3, 4, 5** (highest signal: closes seller loop, gives Claude the offer calculator, real blog citations, correct contract copy).
- For `submit_student_waitlist`: keep it, or skip since the student page is more content-hub than lead-gen today?
