

# Move homepage JSON-LD structured data from client-side React to static index.html

## Problem
The `StructuredData` component injects 16 JSON-LD schemas via `useEffect` + `document.createElement`. Google and AI crawlers that don't execute JavaScript will never see this data. Moving it to `index.html` ensures it's available in the initial HTML response.

## Approach

### 1. Add all 16 JSON-LD `<script>` blocks to `index.html`
Insert them before `</head>`, containing the exact same schemas currently in `StructuredData.tsx`:
- Organization, LocalBusiness, Service (students), Service (investors)
- BuyAction, HowTo (sell), HowTo (invest), FAQPage
- BreadcrumbList, SoftwareApplication (valuation tool), SoftwareApplication (Props)
- WebSite, WebPage, VideoObject
- Dataset (study spaces, cheap eats, gyms)

All URLs already use the hardcoded `https://junglerent.it` base, so no dynamic values are needed.

### 2. Remove the `StructuredData` component
- Delete `src/components/StructuredData.tsx`
- Remove the import and `<StructuredData />` usage from `src/pages/Index.tsx`

### 3. No impact on other pages
`ArticleStructuredData.tsx` (blog) and `ToolStructuredData.tsx` (tools) use `react-helmet` which renders into `<head>` — these are page-specific and acceptable as client-side. Only the homepage global schemas need to be static since they're the same for every visitor.

## Technical notes
- The `dateModified` fields (currently `"2026-03-07"`) become truly static — update them manually when content changes
- `VideoObject.uploadDate` keeps the fixed ISO 8601 format: `"2025-12-01T00:00:00+01:00"`

