

## Make the Jungle Rent logo fill more space on the phone home screen icon

### Problem
The current home screen icon on iOS shows too much cream/beige background around the Jungle Rent logo, making the logo appear small. This is because:
1. There is no `apple-touch-icon` configured -- iOS falls back to a screenshot or the favicon
2. There is no PWA `manifest.json` with properly sized icons
3. The SVG logo has a transparent background with the foliage shape not filling the full canvas

### Solution

**1. Generate a new apple-touch-icon PNG (192x192 and 512x512)**

Use the AI image generation API (via an edge function) to create a proper app icon where:
- The forest green (#4D8E59) jungle foliage fills nearly the entire square (with minimal padding ~5%)
- The white house sits centered inside
- Background is the forest green color (not cream)
- Rounded corners are handled by iOS automatically, so the image should be a full square

Alternatively (and more reliably), create an SVG-based icon that:
- Has a solid forest green (#4D8E59) background filling the entire square
- Places the existing logo centered and scaled to ~90% of the icon area
- Gets converted to PNG at the needed sizes

**2. Add a `manifest.json` for PWA**

Create `public/manifest.json` with:
- App name: "Jungle Rent"
- Short name: "Jungle Rent"
- Icons at 192x192 and 512x512
- Theme color: #4D8E59
- Background color: #4D8E59
- Display: standalone

**3. Update `index.html`**

Add the following tags to `<head>`:
- `<link rel="manifest" href="/manifest.json">`
- `<link rel="apple-touch-icon" href="/apple-touch-icon.png">`
- Update `theme-color` meta to #4D8E59

**4. Create the icon image**

Since we can't programmatically convert SVG to PNG in the browser build, the best approach is to create a simple SVG icon file that works as both the apple-touch-icon source and the manifest icon. We will:

- Create a new SVG file (`public/app-icon.svg`) with a solid green square background and the logo scaled up to fill ~90% of the space
- Reference it in the manifest (modern browsers support SVG icons)
- For the apple-touch-icon (which requires PNG), we will use the edge function with the AI image generation API to generate a proper 512x512 PNG icon matching the brand specs: forest green organic foliage frame with white house, filling the entire square with minimal padding

### Technical details

Files to create:
- `public/manifest.json` -- PWA manifest
- `public/app-icon.svg` -- SVG icon with green background filling full square

Files to modify:
- `index.html` -- add manifest link, apple-touch-icon link

The key change is ensuring the logo artwork fills at least 85-90% of the icon area instead of the current ~60%, with a solid brand-color background instead of cream/transparent.

