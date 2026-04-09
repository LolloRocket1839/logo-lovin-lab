

## Plan: Add EU Co-Funding Banner to Footers

The uploaded image is the official EU/Regione Piemonte co-funding compliance banner. It should replace the current single Regione Piemonte logo in both the desktop and mobile footers with this proper multi-logo banner.

### What Changes

**1. Copy the uploaded image into the project**
- Copy `user-uploads://4.jpg` → `src/assets/eu-funding-banner.jpg`

**2. Update `src/components/layout/Footer.tsx` (desktop)**
- Lines 299-312: Replace the current Regione Piemonte logo + text block with the new banner image
- The banner already contains all required logos and text, so the separate text paragraph can be simplified or kept as an accessible fallback beneath

**3. Update `src/components/layout/MobileFooter.tsx` (mobile)**
- Lines 120-133: Same replacement — swap the Regione Piemonte logo for the full EU funding banner
- Slightly smaller sizing for mobile (e.g. `w-full max-w-xs`)

### Visual Result
Both footers will show the official blue EU co-funding banner (Coesione Europa 21-27, EU flag, Regione Piemonte logos) instead of just the Regione Piemonte logo alone. The compliance text line is retained below for accessibility/SEO.

