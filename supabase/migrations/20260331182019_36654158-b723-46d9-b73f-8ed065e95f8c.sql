
-- Allow public UPDATE on auto_blog_posts (dev mode - no auth)
CREATE POLICY "Public can update auto_blog_posts"
ON public.auto_blog_posts FOR UPDATE TO public
USING (true) WITH CHECK (true);

-- Allow public DELETE on auto_blog_posts (dev mode - no auth)
CREATE POLICY "Public can delete auto_blog_posts"
ON public.auto_blog_posts FOR DELETE TO public
USING (true);

-- Allow public SELECT on auto_blog_topics (for admin dashboard)
DROP POLICY IF EXISTS "Block public access auto_blog_topics" ON public.auto_blog_topics;
CREATE POLICY "Public can read auto_blog_topics"
ON public.auto_blog_topics FOR SELECT TO public
USING (true);
