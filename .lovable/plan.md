

# Performance + Autonomous Content Engine

## Overview

Two initiatives: (1) frontend performance tuning for returning visitors, and (2) an autonomous content posting system that generates and publishes articles on a schedule without manual intervention.

---

## Part 1: Performance for Returning Visitors

### 1A. Service Worker for instant repeat loads
Create a service worker (`public/sw.js`) that caches static assets (JS chunks, CSS, images, fonts) on first visit. Returning visitors load the shell instantly from cache. Register it in `index.html`.

### 1B. Route prefetching on hover/visibility
Add `onMouseEnter` / `onTouchStart` prefetching to navigation links and blog cards — when a user hovers a link, dynamically import that route's chunk so the click feels instant. Create a `usePrefetch` hook.

### 1C. Image optimization with native lazy loading
Add `loading="lazy"` and `decoding="async"` to all below-fold images. Add explicit `width`/`height` to prevent CLS. Audit `ParallaxHeroImage`, blog card images, and directory listing images.

### 1D. Stale-while-revalidate for API data
Add `staleTime: 5 * 60 * 1000` to React Query defaults so repeated navigations reuse cached data instantly while refreshing in background.

---

## Part 2: Autonomous Content Engine

### Architecture

```text
┌─────────────┐    pg_cron     ┌──────────────────┐
│  Scheduler   │──────────────▶│ auto-publish-blog │
│  (weekly)    │               │  Edge Function    │
└─────────────┘               └────────┬─────────┘
                                       │
                              ┌────────▼─────────┐
                              │  Lovable AI       │
                              │  (Gemini 2.5 Pro) │
                              └────────┬─────────┘
                                       │
                              ┌────────▼─────────┐
                              │ auto_blog_posts   │
                              │  (DB table)       │
                              └──────────────────┘
```

### 2A. Database table: `auto_blog_posts`
New table to store AI-generated articles separately from the hardcoded `blogPosts` array:
- `id`, `slug`, `category`, `title_it`, `title_en`, `excerpt_it`, `excerpt_en`, `content_it`, `content_en`, `seo_title_it`, `seo_title_en`, `seo_desc_it`, `seo_desc_en`, `keywords` (jsonb), `tags` (jsonb), `image`, `read_time`, `status` (draft/published/archived), `published_at`, `created_at`
- RLS: public SELECT for `status = 'published'`, service_role ALL

### 2B. Edge function: `auto-publish-blog`
Scheduled weekly via pg_cron. It:
1. Picks the next topic from a **topic queue** (seeded with relevant themes: "eventi torino giugno 2026", "migliori aperitivi studenti torino", "nuove linee metro torino aggiornamento", etc.)
2. Calls Lovable AI (Gemini 2.5 Pro) with a structured prompt that produces a complete bilingual article (IT + EN) with SEO metadata, 5+ FAQs, and internal links to existing content
3. Saves the result to `auto_blog_posts` with `status = 'published'`
4. Updates `llms.txt` article count (or a counter in the DB)

### 2C. Topic queue table: `auto_blog_topics`
- `id`, `topic_it`, `topic_en`, `category`, `priority`, `status` (pending/used/skipped), `target_keywords` (jsonb), `created_at`, `used_at`
- Pre-seeded with 20+ evergreen and seasonal topics
- New topics can be added manually or via another AI call

### 2D. Frontend integration
Modify the Blog page and `getPostBySlug` to merge static `blogPosts[]` with dynamic `auto_blog_posts` from the database. The `BlogPost` page already loads markdown content — for auto posts, the content comes from the DB `content_it`/`content_en` columns instead of local `.md` files.

### 2E. Schedule setup
Use pg_cron + pg_net to invoke the edge function weekly (e.g., every Monday at 9:00 CET). The function generates one article per invocation.

---

## Files to create/modify

| File | Action |
|------|--------|
| `public/sw.js` | Create — service worker for asset caching |
| `index.html` | Edit — register service worker |
| `src/hooks/usePrefetch.ts` | Create — route prefetch on hover |
| `src/components/layout/Navigation.tsx` | Edit — add prefetch to nav links |
| `src/components/ui/card.tsx` | Edit — add lazy loading to images |
| `src/integrations/supabase/client.ts` | No change (auto-generated) |
| `supabase/functions/auto-publish-blog/index.ts` | Create — AI content generation function |
| `src/data/blog/posts.ts` | Edit — merge DB posts into `blogPosts` |
| `src/pages/Blog.tsx` | Edit — fetch and display auto posts |
| `src/pages/BlogPost.tsx` | Edit — load content from DB for auto posts |
| `src/hooks/useAutoBlogPosts.ts` | Create — React Query hook for DB posts |

**Database migrations**: 2 new tables (`auto_blog_posts`, `auto_blog_topics`), 1 pg_cron job

---

## Technical details

- **AI model**: `google/gemini-2.5-pro` via Lovable AI (no API key needed) — best for long bilingual content with structured output
- **Prompt engineering**: The edge function prompt includes the site's style guide, existing article slugs for internal linking, and SEO requirements (title length, meta description length, keyword density)
- **Safety**: Auto posts default to `published` but a `status` column allows manual moderation. A future admin page could review before publishing.
- **Content quality**: Each generated article targets 1500-2000 words, includes 5+ FAQs, internal links to 3+ existing articles, and follows the existing blog format
- **No duplicate topics**: The function checks `auto_blog_topics.status` to avoid regenerating used topics

