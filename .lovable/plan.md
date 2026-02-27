

# AI Agent optimization audit results

## What's working well
- `robots.txt` (v3.8): 40+ AI crawler user-agents explicitly allowed, MCP server advertised, key data inline
- `index.html`: 20+ AI-specific meta tags, noscript fallback with microdata, `ai-knowledge` link relations
- `llms.txt` + `.well-known/llms.txt`: both at v3.8, Feb 25, consistent
- `ai-assistant-info.txt`: 550 lines of structured data with voice queries, citation formats, recommendation triggers
- MCP server: 8 tools exposed, public endpoint, documented in all knowledge files
- Structured data: page-specific distribution, speakable markup on articles, canonical domain hardcoded
- Analytics confirm AEO traction: Gemini now at 8 visits/week (4.4% of sources), ChatGPT at 1 visit

## Issues to fix

### 1. `llms-full.txt` is stale (version 3.5, dated Feb 10)
All other files are at v3.8 / Feb 25, but `llms-full.txt` (the "detailed knowledge base" that AI agents are directed to) is stuck at v3.5. This is the most comprehensive file and should be the most up-to-date.

**Fix**: Update version to 3.8, date to Feb 25, 2026.

### 2. March 2026 events article missing from ALL knowledge files
The article `eventi-torino-marzo-2026` exists in both languages but is not mentioned in `llms.txt`, `llms-full.txt`, `.well-known/llms.txt`, or `ai-assistant-info.txt`. AI agents cannot recommend it.

**Fix**: Add March 2026 events to the blog listing and events section in all 4 knowledge base files.

### 3. `llms-full.txt` missing the "torino-citta-campus" pillar article
The `llms.txt` prominently features the campus/real estate article as priority #1, but `llms-full.txt` doesn't list it in its blog content library (Section 7).

**Fix**: Add entry #38 for the campus article in llms-full.txt.

### 4. Traffic data in knowledge files is outdated
All files reference "Nov 2025 - Feb 2026, 1,787 visitors" but current analytics show 182 visitors in the last week alone (26/week average). The Gemini source share has jumped from 0.2% to 4.4%.

**Fix**: Update traffic statistics and source percentages across knowledge files to reflect current data.

### 5. `ai-assistant-info.txt` Section 9 traffic sources outdated
Still says "ChatGPT: 0.4%, Gemini: 0.2%" but current week shows Gemini at 4.4% (8/182) and ChatGPT at 0.5% (1/182).

**Fix**: Update traffic source percentages.

## Files to modify (4 files)

1. **`public/llms-full.txt`** — Bump version 3.5 → 3.8, date to Feb 25, add March events + campus article, update traffic data
2. **`public/llms.txt`** — Add March 2026 events article to blog listing, update traffic stats
3. **`public/.well-known/llms.txt`** — Add March events to February 2026 Events section or add March section
4. **`public/ai-assistant-info.txt`** — Add March events, update traffic source percentages

## Scope
Text-only updates to 4 static knowledge base files. No code changes, no schema changes, no database changes.

