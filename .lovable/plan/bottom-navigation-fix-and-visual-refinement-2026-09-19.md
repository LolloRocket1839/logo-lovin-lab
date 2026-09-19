# Bottom navigation fix and visual refinement

## 1. Fix the mobile navigation architecture
- Move the page transition from around the route tree to around `Outlet` inside `RootLayout`.
- Keep `Navigation`, `Footer`, and `BottomNav` outside every animated ancestor.
- Make the page transition an opacity-only 200 ms fade, disabled by reduced-motion preferences.
- Reserve 64 px plus the device safe area beneath mobile page content.

## 2. Apply the visual system
- Consolidate cream, dark green, warm-black, light-green surfaces, typography, cards, spacing, and buttons in the shared styles.
- Refine the 56 px desktop/mobile header, three-column footer, and 64 px mobile bar.
- Remove nonessential movement from the touched public-facing elements.

## 3. Redesign the homepage
- Use the existing Turin sunset image as the full-height mobile hero with a dark-green overlay.
- Add the requested seller button and investor text link.
- Present the three audience entries as full-width mobile rows and three desktop cards, followed by the company badge line.

## 4. Polish `/vendi` without changing its content
- Keep all wording, sections, FAQs, form behavior, and tracking unchanged.
- Apply the shared typography, spacing, card, and button treatments and remove the existing entrance translation.

## 5. Verify
- Run typecheck and build.
- Test `/`, `/vendi`, and a long `/blog/:slug` page on a mobile viewport, confirming the fixed bar and bottom safe-area spacing.
