# Fix: published site loads a blank page

## What is happening

The live site at junglerent.it returns the page shell (title, meta tags are correct) but the content area stays empty. Loading it in a browser shows a startup error: the app tries to use React before React has finished loading, so nothing renders.

Verified just now:
- junglerent.it and junglerent.lovable.app answer with HTTP 200, so hosting and DNS are fine.
- Loading junglerent.it in a real browser: page body empty, error `Cannot read properties of undefined (reading 'createContext')`.
- The same app running in the development preview renders correctly, so this is specific to how the published files are bundled.

## Cause

The published build splits code into shared bundles. Two of them reference each other in a loop: `vendor-react` starts by importing from `vendor-i18n`, while `vendor-i18n` imports React from `vendor-react`. Confirmed by reading the first lines of both published files. In a circular pair the browser evaluates one before the other is ready, so React is `undefined` at the moment the app calls `createContext`, and rendering stops before anything appears.

The loop comes from the manual bundle-splitting rules in `vite.config.ts`, combined with the aggressive tree-shaking setting there.

## The fix

In `vite.config.ts`:

1. Stop splitting the translation library into its own bundle — keep `i18next`, `react-i18next` and the language detector in the same bundle as React, so no cross-reference loop can form. (Alternatively: drop the custom splitting rules entirely and let the bundler decide; this is the safest option and costs little, since the same code is still cached.)
2. Remove `treeshake: { moduleSideEffects: false }`. This setting drops initialisation code that libraries rely on and makes ordering problems like this one much more likely.

No application code, copy, styling or backend logic changes.

## Verification before finishing

- Run a production build locally and confirm no bundle imports another bundle that imports it back.
- Serve the production build and load the homepage in a browser: content renders, no console errors.
- Check a second route (for example /vendi) renders too.

After approval and a publish, the live site will render again.
