
-- 1. Fix seller_leads: the "Service role can manage" policy was applied to {public} role
DROP POLICY IF EXISTS "Service role can manage seller_leads" ON public.seller_leads;
CREATE POLICY "Service role can manage seller_leads"
  ON public.seller_leads
  AS PERMISSIVE
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 2. auto_blog_topics: explicit deny for anon/authenticated
CREATE POLICY "Block anon access auto_blog_topics"
  ON public.auto_blog_topics
  FOR ALL
  TO anon
  USING (false)
  WITH CHECK (false);

CREATE POLICY "Block authenticated access auto_blog_topics"
  ON public.auto_blog_topics
  FOR ALL
  TO authenticated
  USING (false)
  WITH CHECK (false);

-- 3. storage.objects: restrict property-photos
DROP POLICY IF EXISTS "Allow public uploads to property-photos" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read from property-photos" ON storage.objects;

CREATE POLICY "Authenticated users can upload property photos"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'property-photos');

CREATE POLICY "Public can read property photos by direct path"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'property-photos');

-- 4. Lock down SECURITY DEFINER queue helpers and fix search_path
REVOKE EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.delete_email(text, bigint) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) FROM PUBLIC, anon, authenticated;

ALTER FUNCTION public.enqueue_email(text, jsonb) SET search_path = public, pgmq;
ALTER FUNCTION public.read_email_batch(text, integer, integer) SET search_path = public, pgmq;
ALTER FUNCTION public.delete_email(text, bigint) SET search_path = public, pgmq;
ALTER FUNCTION public.move_to_dlq(text, text, bigint, jsonb) SET search_path = public, pgmq;
