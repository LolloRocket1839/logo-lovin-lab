

# Fix Video structured data: uploadDate format

## Problem
Google Search Console reports the `uploadDate` in the VideoObject schema is invalid — it's missing time and timezone (`"2025-12-01"` → needs ISO 8601 with timezone).

## Fix

**File:** `src/components/StructuredData.tsx`

Change `uploadDate` from `"2025-12-01"` to `"2025-12-01T00:00:00+01:00"` (CET/Rome timezone) in the `videoSchema` object. This satisfies both GSC requirements (valid datetime + timezone).

Single line change, no other files affected.

