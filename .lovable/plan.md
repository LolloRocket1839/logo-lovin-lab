

## Deep Analysis: What Jungle Rent Needs Right Now

### Your Numbers (Last 7 Days)
- **269 visitors**, 452 pageviews, **88% bounce rate**
- 1.68 pages/visit, ~42 sec avg session
- Traffic: 65% Direct, 30% Google, tiny bit from ChatGPT/Gemini
- Countries: China 78 (likely bots), **Italy 46**, US 40, Switzerland 8
- **1 lead total** in the database — conversion is near zero

The site looks professional but isn't converting. Here's what to fix, in priority order.

---

### Phase 1: Legal Compliance (URGENT)

**1. GDPR Cookie Banner**
You're collecting analytics events, tracking sessions, using scroll depth tracking — all in the EU, targeting Italian users. There is **no cookie consent banner anywhere**. This is a legal liability.

- Build a `CookieBanner` component that appears on first visit
- Only fire analytics/tracking hooks after consent is granted
- Store consent in localStorage
- Link to your existing `/privacy` page

---

### Phase 2: Conversion Fixes (Highest ROI)

**2. Exit Intent Popup on Homepage**
The homepage gets 64 of your 452 pageviews (14%) but has **no exit intent popup**. It only exists on `/vendi` and `/investitori`. The homepage is where most visitors bounce — capture them before they leave.

- Import the existing `ExitIntentPopup` into `Index.tsx`
- Use `source="homepage"` for tracking

**3. Reduce Bounce Rate with Scroll-Triggered CTA**
88% bounce rate means people see the hero and leave. Add a gentle "micro-commitment" prompt that appears after scrolling 40% — a small floating card asking one qualifying question ("Are you an investor or a seller?") that routes to the right funnel.

---

### Phase 3: Trust & Social Proof

**4. OG Image (still SVG)**
When someone shares your link on WhatsApp or LinkedIn, the preview looks broken. Create a proper 1200×630px branded image using your color palette and key value prop text.

**5. Block Bot Traffic from China**
78 of 269 visitors are from China — almost certainly bots inflating your metrics. Add bot detection (check user-agent patterns) to your analytics hook so you get clean data.

---

### Phase 4: Admin & Operations

**6. Admin Leads Dashboard**
You have 1 lead and no way to see it except raw SQL. The `/admin/leads` route doesn't exist in `AnimatedRoutes.tsx`. Build a simple authenticated page to view, filter, and export leads.

---

### Technical Summary

| Priority | Item | Effort | Impact |
|----------|------|--------|--------|
| 1 | GDPR Cookie Banner | Medium | Legal compliance |
| 2 | Homepage Exit Intent | Small | Lead capture |
| 3 | Scroll-triggered qualifier | Medium | Bounce rate |
| 4 | OG Image (PNG 1200×630) | Small | Social sharing |
| 5 | Bot filtering | Small | Clean analytics |
| 6 | Admin leads dashboard | Medium | Operations |

### Files to Create/Modify
- **New:** `src/components/CookieBanner.tsx` — consent UI + localStorage logic
- **New:** `src/hooks/useCookieConsent.ts` — consent state management
- **Edit:** `src/App.tsx` — add CookieBanner, gate analytics on consent
- **Edit:** `src/pages/Index.tsx` — add ExitIntentPopup
- **New:** `src/components/ScrollQualifier.tsx` — scroll-triggered engagement prompt
- **New:** `src/pages/admin/Leads.tsx` — admin dashboard
- **Edit:** `src/components/AnimatedRoutes.tsx` — add admin route
- **Edit:** `src/pages/Index.tsx` — update og:image meta tags

