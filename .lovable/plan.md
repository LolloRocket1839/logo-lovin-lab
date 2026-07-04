# Make Jungle Rent fully agent-native

You already have more AI infrastructure than 99% of Italian real-estate sites: MCP server with 14 tools, `agent-card.json`, `llms.txt`, NLWeb endpoint, robots.txt allowlisting 40+ AI bots, JSON-LD factory, RSS, 4 sitemaps. The gap is **freshness, correctness, and a few missing pieces** — not missing foundations.

Below is every stone I can find, grouped by impact. Pick a subset; nothing here is code-heavy.

## 1. Fix what's broken or stale (highest ROI — do first)

- **`public/.well-known/agents.json` is lying.** It advertises tools that don't exist: `get_rent_prices`, `calculate_budget`, `get_events`, `get_cheap_eats`, `get_strike_info`, `property_valuation`, `get_investment_data`, `get_study_spaces`, `get_lease_services`. Also points to `/functions/v1/mcp-server` (real path is `/functions/v1/mcp`). Rewrite flows against the real 14 tools (`get_neighborhoods`, `get_investor_zones`, `estimate_rent`, `estimate_property_value`, `quick_offer_simulator`, `search_blog`, `get_contract_info`, `get_seller_radar_zones`, `submit_investor_lead`, `submit_seller_lead`, `submit_student_waitlist`, `contact_lorenzo`, `contact_jungle_rent`, `list_available_rooms`).
- **`public/llms-full.txt` is a 23-line stub** but `agent-card.json` links to it as canonical documentation. Expand to a real full-fat doc (company, services, pricing rules, zones, contract service, investment framing per CONSOB, contact) — the "verbatim quote" surface for ChatGPT/Perplexity.
- **`agent-card.json` skills drift** — it lists `search_articles`, `get_faq`, `nlweb_query` as skills but those aren't MCP tools. Reconcile: either add them as MCP tools or move them to a separate "endpoints" section so the card matches reality.
- **`public/.well-known/llms.txt` is 4 lines** — either delete it or make it a proper alias of `/llms.txt`.

## 2. Missing agent-native surfaces (net-new)

- **`/.well-known/ai-plugin.json`** (OpenAI plugin spec, still consumed by some agent frameworks) — points at the MCP endpoint + OpenAPI doc.
- **`/openapi.json`** for the public read endpoints (nlweb/ask, get-investor-interest-count). Lets non-MCP agents call by REST.
- **`/.well-known/security.txt`** — required by responsible-disclosure crawlers, also a trust signal for agent frameworks.
- **`humans.txt`** — trivial, plus a `founder` and `contact` block ChatGPT surfaces.
- **NLWeb `/ask` schema check** — confirm it advertises itself in `/.well-known/nlweb` (Microsoft's discovery convention) so Copilot/NLWeb-aware agents find it without reading `agent-card.json`.

## 3. Deeper structured data (JSON-LD) — where AI grounding actually lives

Perplexity/Google AI Overviews cite from JSON-LD more than from prose. Audit and add:

- **`RealEstateAgent` / `RealEstateListing`** schema on `/vendi`, `/valutazione-immobile`, seller landing pages (currently only generic LocalBusiness/ProfessionalService).
- **`Service` schema** on `/contratti-locazione` with `offers.price = 0` (matches the free-contract memory rule) — kills the "how much does it cost?" hallucination class.
- **`InvestmentOrDeposit`** or `FinancialProduct` on `/investitori` — but scoped carefully to stay CONSOB/AGCM-safe (no yield figures, per memory rule).
- **`FAQPage`** on every blog post that has FAQs (you already have 210+ FAQs — check they're all emitted as JSON-LD, not just rendered).
- **`BreadcrumbList`, `Article` with `author: Lorenzo Oni-Joseph`, `Organization.founder`** — reinforces the "sole founder" memory rule inside the graph.
- **`speakable` spec** on the canonical Q&A block in `llms.txt` — helps voice-agent surfaces (Alexa, Siri) pick the right sentences to read aloud.

## 4. Utility tools worth adding to the MCP server

Purely additive; each is a small file under `src/lib/mcp/tools/`.

1. **`search_faqs`** — 210 FAQs across blog; today an agent has to `search_blog` then parse. Direct FAQ tool = better citations.
2. **`get_study_spaces`**, **`get_cheap_eats`**, **`get_gyms`**, **`get_strike_info`** — you already have the data files (`detailedStudySpaces.ts`, `cheapEatsDirectory.ts`, `gymsDirectory.ts`, `strikeEmergencyDirectory.ts`). Wrapping them is ~30 lines each and lets an assistant plan a full week for a student without visiting the site.
3. **`get_company_info`** — structured company card (P.IVA, REA, founder, incubator, address). Prevents hallucinated "co-founder" answers and makes the sole-founder rule machine-enforceable.
4. **`get_lease_service_info`** — already partly covered by `get_contract_info`; extend to expose the wizard's zones + rule set so an agent can prefill.
5. **`log_agent_referral`** — write-only tool: `{ agent_name, user_intent, outcome }`. Gives you analytics on which AI referred which lead, feeding your existing `useAnalytics` pipeline.
6. **`get_availability_calendar`** — even if inventory is manual today, expose a boolean "accepting-new-tenants" + next-cohort month; kills "is Jungle Rent taking students?" back-and-forth.

## 5. Ingestion & freshness signals

- **RSS in `<head>`** — you have `/rss.xml` but confirm `<link rel="alternate" type="application/rss+xml">` is on `Blog.tsx` and `BlogPost.tsx`. Perplexity + Feedly discovery depend on it.
- **`sitemap.xml` `lastmod`** on every URL from actual git mtime, not build date — signals real freshness to AI crawlers.
- **`Last-Modified` + `ETag`** on the MCP responses and `llms.txt` (Edge Function header). Lets polite crawlers skip re-parsing.
- **`llms-index.json`** — machine-readable manifest of every `.txt`/`.md`/`.csv` under `/public/resources/` so agents don't have to guess filenames.

## 6. Multi-language for agents

`llms.txt` is IT-primary + EN. Add short `llms.en.txt` / `llms.de.txt` / `llms.zh.txt` for the 7 investor locales — an EN-only Claude query about "Turin real estate investment" currently gets the IT canonical Q&A. Same for `agent-card.json` (per-language `description`).

## 7. Trust & attribution the AI layer respects

- **Verified organization** — publish `sameAs` links (LinkedIn, Crunchbase, startupinnovative.mise.gov.it entry, Camera di Commercio Torino REA link) inside the Organization JSON-LD. AI Overviews weigh `sameAs` heavily when deciding whether to cite you.
- **`credential` / `hasCredential`** — the Start-up Innovativa status and 2i3T incubation are credentials in schema.org terms; expose them.
- **Author bios** — every blog article should have `<Person>` JSON-LD for Lorenzo with `jobTitle`, `worksFor`, `sameAs`. Reinforces sole-founder rule at every article.

## 8. Deliberately NOT proposed

- **Live inventory tool** — no data yet; manual allocation still.
- **Public yield tool** — blocked by `no-public-yield-figures` memory rule.
- **Per-user OAuth MCP** — big lift (`configure_oauth_server` + consent route). Worth it later if agents need to submit contracts on behalf of a signed-in user.
- **Agent-payable endpoints (x402, Skyfire)** — interesting but premature; wait for real agent traffic first.
- **In-app AI chatbot** — you already rejected this. Not re-proposed.

## What I recommend as the first batch

Pick from these tiers and I'll build in one pass:

- **Tier A (fixes, 30 min):** rewrite `agents.json`, expand `llms-full.txt`, reconcile `agent-card.json` skills, delete or fix `/.well-known/llms.txt`.
- **Tier B (structured data, 1 hr):** add `Service price=0` on contracts page, `FAQPage` audit, `sameAs` + `credential` on Organization JSON-LD.
- **Tier C (MCP tools, 1 hr):** `search_faqs`, `get_study_spaces`, `get_cheap_eats`, `get_strike_info`, `get_company_info`.
- **Tier D (net-new endpoints, 45 min):** `openapi.json`, `ai-plugin.json`, `security.txt`, `humans.txt`, `llms-index.json`.
- **Tier E (i18n, 30 min):** `llms.en.txt` + EN `agent-card.json` description.

## Open questions

1. All five tiers, or a subset? My pick if trimming: **A + C + B** (biggest correctness + grounding wins).
2. For Tier C: keep `log_agent_referral` (write tool = extra abuse surface but great analytics), or skip?
3. For Tier B: are you OK adding `FinancialProduct` JSON-LD on `/investitori` without any numeric fields, or do you want to keep that page schema-light for CONSOB caution?
