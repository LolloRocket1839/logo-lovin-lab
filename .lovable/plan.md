

# Implement agent discovery protocols from the research document

## Analysis: what's done vs what's actionable

The document describes 6 layers. Here's the current status:

| Layer | Status | Notes |
|-------|--------|-------|
| 1. llms.txt / llms-full.txt | ✅ Done | v3.8, 13 MCP tools documented |
| 2. Schema.org / JSON-LD | ✅ Done | StructuredData component exists |
| 3. Sitemaps | ✅ Done | 5 sitemaps in place |
| 3. RSS feed | ❌ Missing | Blog articles feed |
| 3. Semantic HTML | ✅ Done | Proper structure |
| 4. MCP server | ✅ Done | 13 tools |
| 4. OpenAPI spec | ❌ Not applicable | MCP replaces REST API for agents |
| 5A. A2A Agent Card | ❌ Missing | `/.well-known/agent-card.json` |
| 5B. MCP | ✅ Done | Fully operational |
| 5C. agents.json | ❌ Missing | `/.well-known/agents.json` |
| 6. NLWeb / ACP / AG-UI | ❌ Future | Not implementable now |

## What to implement now (3 items)

### 1. A2A Agent Card — `public/.well-known/agent-card.json`

Static JSON file following Google's A2A spec. Maps the 13 MCP tools as "skills" with structured descriptions. Includes Jungle Rent identity, endpoint URL, authentication (none), and supported protocols.

```text
/.well-known/agent-card.json
├── name, description, url, provider
├── capabilities: ["streaming", "pushNotifications": false]
├── defaultInputModes: ["application/json"]
├── skills: (13 entries mapped from MCP tools)
│   ├── search_articles
│   ├── get_neighborhoods
│   ├── property_valuation
│   ├── contact_jungle_rent
│   ├── get_study_spaces
│   ├── get_cheap_eats
│   ├── get_strike_info
│   ├── calculate_budget
│   └── ... (5 more)
└── authentication: { schemes: ["none"] }
```

### 2. agents.json — `public/.well-known/agents.json`

Describes multi-step workflows (flows) for AI agents. Key flows:
- **find-student-housing**: `get_neighborhoods` → `get_rent_prices` → `calculate_budget` → `contact_jungle_rent`
- **plan-turin-visit**: `get_events` → `get_cheap_eats` → `get_strike_info`
- **property-valuation**: `property_valuation` → `get_investment_data` → `contact_jungle_rent`
- **student-life**: `get_study_spaces` → `get_cheap_eats` → `calculate_budget`

### 3. Blog RSS feed — `public/rss.xml`

Static RSS 2.0 feed listing all 37 blog articles with title, link, description, pubDate, and category. Referenced from robots.txt and `<link rel="alternate">` in index.html.

### 4. Documentation updates

- **robots.txt**: Add references to agent-card.json, agents.json, and rss.xml
- **llms.txt** and **llms-full.txt**: Document A2A Agent Card and agents.json endpoints
- **ai-assistant-info.txt**: Add agent discovery protocol section

## Files changed

| File | Action |
|------|--------|
| `public/.well-known/agent-card.json` | Create |
| `public/.well-known/agents.json` | Create |
| `public/rss.xml` | Create |
| `public/robots.txt` | Update — add new file references |
| `public/llms.txt` | Update — document new protocols |
| `public/llms-full.txt` | Update — document new protocols |
| `public/ai-assistant-info.txt` | Update — document new protocols |
| `index.html` | Update — add `<link rel="alternate" type="application/rss+xml">` |

