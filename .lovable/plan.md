
## What you actually want

You already have an MCP server at `https://ekrrrlrwdshhlqnuxjbz.supabase.co/functions/v1/mcp`. Today it exposes 3 read-only info tools (`get_neighborhoods`, `get_investor_zones`, `contact_jungle_rent`).

You want to add **action tools** so when someone talks to Claude/ChatGPT/Cursor and connects your MCP, the assistant can *do things*: notify Lorenzo, estimate a rent, submit a lead. No chat UI on junglerent.it — the assistants are the UI.

## New tools to add

All live in `src/lib/mcp/tools/` and register in `src/lib/mcp/index.ts`. The Vite plugin re-bundles into `supabase/functions/mcp/index.ts` on build; then deploy.

### 1. `contact_lorenzo` (write / notify)
- **Input:** `name`, `email`, `message`, `topic` (investor/student/seller/tourist/general), optional `phone`.
- **What it does:** writes a lead via `insert_lead` RPC (same pipeline your website forms use) AND fires the existing `notify-investor-whatsapp` edge function so Lorenzo gets a WhatsApp ping immediately. Also triggers the existing `lead-notification` + `lead-confirmation` transactional emails.
- **Why it's safe:** reuses your existing validated RPC + suppression + rate limiting. Marks `source: "mcp-<topic>"` so you can track MCP-originated leads in the admin dashboard.
- **Annotations:** `readOnlyHint: false`, `destructiveHint: false`.

### 2. `estimate_rent` (read / calculate)
- **Input:** `neighborhood` (slug), `size_sqm` (number), `rooms` (number), optional `type` (student-room / whole-apartment / short-term).
- **What it does:** pure calculation using your existing `src/data/turinZonePrices.ts` + `src/data/propertyCoefficients.ts`. Returns `{ estimated_monthly_rent_eur, price_per_sqm, comparable_range, confidence, methodology_note }`.
- **Why:** this is the "rent price on average" tool you mentioned. Zero side effects, safe for any assistant to call freely.

### 3. `estimate_property_value` (read / calculate)
- **Input:** `neighborhood`, `size_sqm`, `condition` (new/good/to-renovate), `floor`, `has_elevator`.
- **What it does:** wraps the same math your `/vendi-casa-torino` `PropertyValuation` page uses. Returns a valuation range in EUR + a "Talk to Lorenzo" CTA link with a pre-filled WhatsApp deep-link.
- **Why:** lets Claude/ChatGPT answer "what's my Turin apartment worth?" using *your* pricing model, and hand the user back to Lorenzo.

### 4. `search_blog` (read)
- **Input:** `query` (string), optional `category` (students/investors/sellers/tourists/società), optional `limit` (default 5).
- **What it does:** searches the existing `src/data/blog/searchIndex.ts`. Returns `[{ slug, title, excerpt, url, category, language }]`.
- **Why:** turns your blog (110+ articles) into a knowledge base any MCP-connected assistant can cite when answering Turin-housing questions.

### 5. `list_available_rooms` (read, stub-ready)
- **Input:** optional `neighborhood`, `max_price_eur`, `move_in_after` (date).
- **What it does:** placeholder that today returns "no live listings yet — contact Lorenzo" plus the WhatsApp deep-link. Wire to real inventory when you have it. Keeps the tool surface stable for MCP clients.

## What stays the same

- Existing 3 tools untouched.
- `contact_jungle_rent` remains for "just tell me how to reach you" (returns channels, no side effects). The new `contact_lorenzo` is the *acting* version that actually creates a lead.
- No chat UI, no `useChat`, no new pages, no new edge functions.

## Files to change

```text
src/lib/mcp/tools/contact-lorenzo.ts          NEW
src/lib/mcp/tools/estimate-rent.ts            NEW
src/lib/mcp/tools/estimate-property-value.ts  NEW
src/lib/mcp/tools/search-blog.ts              NEW
src/lib/mcp/tools/list-available-rooms.ts     NEW
src/lib/mcp/index.ts                          EDIT (register 5 new tools)
.lovable/mcp/manifest.json                    REGEN via extractor
supabase/functions/mcp/index.ts               AUTO-regen by Vite plugin, then deploy
public/.well-known/mcp.json                   REGEN (published manifest)
```

Then: `deploy_edge_functions(["mcp"])` and the live server exposes 8 tools total.

## How you'll test it

1. In Claude Desktop → Settings → Developer → add MCP server URL `https://ekrrrlrwdshhlqnuxjbz.supabase.co/functions/v1/mcp`.
2. Ask Claude: *"Use jungle-rent-mcp to estimate rent for a 2-room 60 m² in San Salvario, then send Lorenzo a message that I'm interested."*
3. Claude calls `estimate_rent` → shows number → calls `contact_lorenzo` → you get the WhatsApp ping + email.

Same flow works from ChatGPT (custom MCP), Cursor, Codex, etc.

## Open question before I build

**`contact_lorenzo` — should it require the caller to supply the user's real email/name (i.e. the assistant asks them first), or should it accept anonymous "just ping Lorenzo with this message + a callback preference"?** The first is cleaner CRM data; the second is lower-friction for someone chatting with Claude.

If no preference, I'll default to: `email` required, `name` optional, and reject sends without a valid email (matches how your website forms behave today).
