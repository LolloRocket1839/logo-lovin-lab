

# Fix overlapping Table of Contents on desktop

## Problem
The `FloatingTableOfContents` component uses `fixed left-6 xl:block` positioning. At `xl` (1280px), the centered article content starts close to the left edge, causing the TOC text to overlap the article body.

## Fix
In `src/components/blog/FloatingTableOfContents.tsx` (line 99):

Change the visibility breakpoint and left offset so the TOC only appears when there is enough space:

```
// Before
"fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden xl:block max-w-[200px]"

// After  
"fixed left-4 top-1/2 -translate-y-1/2 z-30 hidden 2xl:block max-w-[180px]"
```

This raises the breakpoint to `2xl` (1536px), ensuring the TOC only shows when the viewport is wide enough to have clear space beside the centered content.

## Files changed

| File | Change |
|------|--------|
| `src/components/blog/FloatingTableOfContents.tsx` | Change `xl:block` to `2xl:block`, reduce `max-w` |

