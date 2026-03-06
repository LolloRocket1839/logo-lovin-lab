

# Fix blog post desktop centering

The `lg:flex` container (line 169) has no max-width or auto-margin, so on wide screens the content hugs the left edge instead of centering.

## Change

In `src/pages/BlogPost.tsx`, line 169:

**Before:**
```tsx
<div className="lg:flex lg:gap-8 lg:px-8">
```

**After:**
```tsx
<div className="max-w-7xl mx-auto lg:flex lg:gap-8 lg:px-8">
```

This constrains the flex container to ~1280px and centers it horizontally, matching the rest of the site layout.

## Files changed

| File | Change |
|------|--------|
| `src/pages/BlogPost.tsx` | Add `max-w-7xl mx-auto` to the flex wrapper |

