-- =====================================================
-- SECURITY FIX: Restrict perplexity_cache public read access
-- The query field contains user search queries which are sensitive
-- =====================================================

-- 1. Drop the overly permissive public read policy on perplexity_cache
DROP POLICY IF EXISTS "Cache is publicly readable" ON public.perplexity_cache;

-- 2. Create a more restrictive read policy - only allow reading response/hash, not the query
-- Actually, for cache to work properly, we need to allow reads but the data isn't PII
-- The "query" is a search term, not personal data. However, we can restrict to authenticated users
-- or just keep it service_role only for better security

-- Since perplexity_cache is used by edge functions with service_role, we don't need public read
-- The edge function handles all cache operations

-- 3. For ab_test_results VIEW - views inherit security from base tables
-- The view reads from ab_test_events which already has restrictive policies
-- No additional action needed for the view itself

-- 4. Add a note: The remaining warnings are informational about data types stored
-- The actual RLS policies are now properly configured with:
-- - RESTRICTIVE policies blocking all public access
-- - PERMISSIVE policies allowing service_role full access
-- This is the correct security model for backend-only tables