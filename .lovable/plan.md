

# Remove Admin Dashboard

## Changes

1. **Delete** `src/pages/AdminAutoBlog.tsx`
2. **Update `AnimatedRoutes.tsx`** — remove the lazy import for `AdminAutoBlog` and the `/admin/content-engine` route
3. **Database migration** — remove the insecure public UPDATE/DELETE policies on `auto_blog_posts` and public SELECT on `auto_blog_topics` that were added for the dashboard

The auto-publish edge function and cron job continue running autonomously.

