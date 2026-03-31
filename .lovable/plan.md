

# Content optimization: AI readability, structured data audit, and quality audit

## Issues found

### 1. Stale AI knowledge base files (critical for AI/LLM readability)

**llms.txt** and **llms-full.txt** are severely outdated:
- Claim "37+" / "38+" articles — actual count is ~70+ articles
- Blog library (Section 7) lists only 38 articles, missing 30+ newer ones
- "Last Updated: March 15, 2026" but analytics data is from February 20-27
- Version says 4.2 but content doesn't reflect March 2026 articles (e.g., missing trovare-casa, guida-affitto-italia-stranieri, budget-mensile, rendimento-student-housing, etc.)
- Top Performing Articles section uses February analytics — needs March data

**rss.xml** is stale:
- `lastBuildDate` is March 2, 2026 — missing 20+ articles published after that date
- Only contains ~38 items, should have 70+

### 2. Canonical domain leak in ToolStructuredData

`ToolStructuredData.tsx` uses `window.location.origin` in 3 places (lines 68, 141, 448), which leaks `lovable.app` preview URLs into JSON-LD schemas. `ArticleStructuredData.tsx` correctly uses hardcoded `BASE_URL`. The tool schemas need the same treatment.

### 3. Stale `dateModified` in tool schemas

`ToolStructuredData` defaults to `dateModified = "2025-12-19"` — 3+ months old. Should be synced to current date (2026-03-26 per memory).

### 4. Blog quality checklist gaps

Running the quality checklist against top articles reveals:
- Several articles may have incomplete FAQ sets (checklist requires 5-10)
- Some older articles likely have stale event data (January/February events in March)

---

## Plan

### Step 1: Fix canonical domain leak in ToolStructuredData
- Replace all 3 `window.location.origin` usages with hardcoded `https://junglerent.it`
- Update default `dateModified` to `2026-03-26`

### Step 2: Update llms.txt
- Update article count to 70+
- Add all missing article entries to Priority URLs and blog reference
- Update analytics data section header to note the period
- Bump "Last Updated" and version to 4.3

### Step 3: Update llms-full.txt
- Add all ~30 missing articles to Section 7 (Blog Content Library)
- Update article counts throughout (FAQ count, article count)
- Update Top Performing Articles with latest data
- Update traffic sources / analytics references
- Bump version to 4.3