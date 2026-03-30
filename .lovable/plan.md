# Bounce Rate Reduction Plan — From 83% to Target ~65%

## Real Data (Last 7 Days)

- **171 visitors**, 83% bounce rate, 1.87 pages/visit
- **3.3s average session duration** — most users never scroll past the fold
- **72% desktop / 28% mobile**
- Top traffic: Direct (53%), Google (36%)
- Top countries: China (19%), Italy (16%), USA (16%), Switzerland (5%)

---

## Root Causes Identified

### Critical Bugs

1. **"infoinfoinfo(:" displayed as Info drawer title** (BottomNav.tsx line 130) — broken, unprofessional, erodes trust instantly
2. **MobileHeader CTA hardcoded in Italian** ("Investi", "Valutazione") — doesn't translate for EN visitors (16% US, 5% UK traffic)

### Structural Problems

3. **2i3T badge appears twice** — once in the Hero, again immediately below as TrustBadge section. Redundant visual weight, wastes above-the-fold space
4. **Hero logo fades to opacity 0 at 200px scroll** but occupies ~80px of prime vertical real estate before any content
5. **HowItWorks section is a dead end** — mobile users see the 25% stat card and have no CTA to act on
6. **StickyCTA + BottomNav stack on mobile** — two persistent bars = banner blindness and visual clutter
7. **Exit intent popup is seller-only** ("valutazione gratuita del tuo immobile") — irrelevant for the majority of visitors who arrive as investors or blog readers

### Missing Conversion Triggers

8. **No social proof in the hero** — no investor count, no testimonial snippet, nothing that says "others trust this"
9. **No WhatsApp quick-access** — primary contact channel requires navigating to Fondatori drawer, which most users never find
10. **No mid-page CTA** — between Hero and InvestorSection there are ~3 scroll-lengths of content with no action prompt

---

## The Plan: 10 Changes, 7 Files

### 1. Fix "infoinfoinfo(:" drawer title

**File:** `src/components/layout/BottomNav.tsx`
Replace hardcoded `infoinfoinfo(:` with `t("info(:")` or simply "Info(:".

### 2. Translate MobileHeader CTA

**File:** `src/components/layout/MobileHeader.tsx`
Replace hardcoded "Investi" / "Valutazione" with `t()` translation keys.

### 3. Remove duplicate 2i3T badge from Hero

**File:** `src/components/innovative/ImmersiveHero.tsx`
Remove the `<a>` block that renders the 2i3T badge (lines 108-130). The TrustBadge section immediately below already shows this. Reclaimed space lets the CTA and subheadline breathe.

### 4. Shrink Hero logo on mobile

**File:** `src/components/innovative/HeroLogo.tsx`
Reduce mobile logo from `w-20 h-20` to `w-14 h-14` and margin-bottom from `mb-6` to `mb-4`. Faster content visibility.

### 5. Add social proof micro-strip below Hero CTA

**File:** `src/components/innovative/ImmersiveHero.tsx`  
Below the "Start investing" button, add a single line: `"🟢 5 investors joined · Avg response: 5 min"` using the existing `useWaitlistCounter` hook. Small, credible, creates FOMO.

### 6. Add CTA after HowItWorks mobile

**File:** `src/components/sections/HowItWorks/HowItWorksMobile.tsx`
After the 25% stat card, add a "Parla con Lorenzo →" WhatsApp button. Users who understand the model are warm — give them an immediate action.

### 7. Remove StickyCTA on mobile, keep desktop

**File:** `src/components/StickyCTA.tsx`
The mobile StickyCTA (lines 61-99) duplicates BottomNav functionality and creates visual noise. Remove the mobile block entirely. Desktop version stays.

### 8. Make exit intent context-aware

**File:** `src/components/ExitIntentPopup.tsx`

- Default title/subtitle will shift from seller-only to a general "Before you go — leave your email for updates" framing
- Keep the email form simple (remove phone field — it's extra friction for a popup)
- This catches both investor and seller audiences

### 9. Add WhatsApp floating button (mobile only)

**New file:** `src/components/WhatsAppFAB.tsx`
A small green WhatsApp circle, bottom-right corner, above BottomNav. Appears after 400px scroll. One tap opens WhatsApp chat with Lorenzo. Uses existing `openQuickContact()`.

**File:** `src/pages/Index.tsx`
Import and render `WhatsAppFAB`.

### 10. Add inline CTA to TrustBadge section

**File:** `src/components/TrustBadge.tsx`
After the 2i3T card (which now only appears here, not in hero), add a small text CTA: "Want to learn more? →" linking to the investor section anchor. Converts passive scrollers who stop here.

---

## Technical Summary

```text
Files to CREATE:
  src/components/WhatsAppFAB.tsx

Files to MODIFY:
  src/components/layout/BottomNav.tsx          (fix title bug)
  src/components/layout/MobileHeader.tsx       (translate CTA)
  src/components/innovative/ImmersiveHero.tsx  (remove dup badge, add social proof)
  src/components/innovative/HeroLogo.tsx       (smaller mobile logo)
  src/components/sections/HowItWorks/HowItWorksMobile.tsx (add CTA)
  src/components/StickyCTA.tsx                 (remove mobile block)
  src/components/ExitIntentPopup.tsx           (generalize copy, remove phone)
  src/components/TrustBadge.tsx                (add inline CTA)
  src/pages/Index.tsx                          (add WhatsAppFAB)
```

No new dependencies. All changes use existing hooks, constants, and translation infrastructure.