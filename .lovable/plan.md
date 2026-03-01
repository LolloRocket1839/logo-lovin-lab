

# Add 3 new MCP tools: get_study_spaces, get_cheap_eats, get_strike_info

## What changes

**File: `supabase/functions/mcp-server/index.ts`** — Add 3 tools + embedded data before the HTTP transport section (line 590).

### Tool 10: `get_study_spaces`
- Embed a compact version of the 58 study spaces from `src/data/studySpaces.ts` (name, category, address, capacity, hours, features, link)
- Input: `category` (optional, filter by bar/edisu/politecnico/etc.), `wifi_only` (boolean), `query` (free text search on name/address/features)
- Returns matching spaces grouped by category with count

### Tool 11: `get_cheap_eats`
- Embed a compact version of the 20 cheap eats from `src/data/cheapEatsDirectory.ts` (name, category, address, district, typicalDish, avgMealPrice, priceRange, vegetarian, wifi, hours summary, coordinates)
- Input: `category` (optional), `price_range` (optional: €3-5, €5-8, €8-12), `vegetarian` (boolean), `district` (optional), `query` (free text)
- Returns matching restaurants with count

### Tool 12: `get_strike_info`
- Embed strike calendar data (Jan + Feb/Mar 2026), emergency contacts (GTT Torino, Trenitalia, Italo), alternative services (FlixBus, BlaBlaCar), refund procedures, and passenger rights
- Input: `month` (optional: january/february/march), `severity` (optional: national/regional/local), `city` (optional, for emergency contacts), `upcoming_only` (boolean)
- Returns strikes, emergency contacts, alternatives, refund procedures, and passenger rights

### Knowledge base updates
- **`public/llms.txt`**, **`public/llms-full.txt`**, **`public/ai-assistant-info.txt`** — Update tool count from 9 to 12 and add brief descriptions of the 3 new tools

### Data strategy
All data is embedded directly in the edge function (same pattern as existing tools). The study spaces array is ~58 items, cheap eats ~20 items, strike data ~25 events — all compact enough to inline.

