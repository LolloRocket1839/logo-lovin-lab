

# Improve blog search across all resources

## Problem
The current `searchPosts()` function uses simple `string.includes()` on title, excerpt, and tags. It doesn't handle accents, partial words, typos, keyword matching, FAQ content, or SEO keywords. Meanwhile, `searchIndex.ts` has a much more sophisticated engine (accent normalization, keyword extraction, scoring) but is only used by the AI search box — not by the main blog filter.

## Solution
Unify search by leveraging the existing `searchIndex.ts` scoring engine for the blog filter, and enhance the filter UX with instant results highlighting, debounced input, and a "no results" state that suggests the AI search.

### Changes

**1. Upgrade `searchPosts()` in `src/data/blog/posts.ts`**
- Replace simple `includes()` with accent-normalized matching
- Search across title, excerpt, tags, SEO keywords, and FAQ questions
- Score results and sort by relevance when a query is active
- Support multi-word queries (all words must match somewhere)

**2. Add search debounce in `src/pages/Blog.tsx`**
- Debounce search input by 300ms to avoid filtering on every keystroke
- Use `useDeferredValue` or a simple timeout

**3. Improve "no results" state in `src/pages/Blog.tsx`**
- When search returns 0 results, show a prompt to try the AI search box
- Add a button that scrolls to AISearchBox and pre-fills the query

**4. Add result count indicator in `src/components/blog/BlogFilters.tsx`**
- Show "{n} articles found" below the search bar when a query or filter is active

## Files changed

| File | Action |
|------|--------|
| `src/data/blog/posts.ts` | Rewrite `searchPosts()` with normalized multi-field scoring |
| `src/pages/Blog.tsx` | Add debounce, improve no-results UX with AI search suggestion |
| `src/components/blog/BlogFilters.tsx` | Add result count display |

