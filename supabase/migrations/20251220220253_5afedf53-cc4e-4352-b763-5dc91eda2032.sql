-- =====================================================
-- SECURITY FIX: Add proper PERMISSIVE policies for service_role access
-- This ensures tables are properly secured with explicit authorization
-- =====================================================

-- 1. Fix ab_test_results view - Add RLS policies
-- Note: This is a VIEW, so we need to check if it needs policies
-- Views don't support RLS directly, they inherit from base tables

-- 2. Fix ab_test_events - Add PERMISSIVE policy for service_role
CREATE POLICY "Service role can manage ab_test_events"
ON public.ab_test_events
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- 3. Fix analytics_events - Add PERMISSIVE policy for service_role  
CREATE POLICY "Service role can manage analytics_events"
ON public.analytics_events
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- 4. Fix ai_test_results - Add PERMISSIVE policy for service_role
CREATE POLICY "Service role can manage ai_test_results"
ON public.ai_test_results
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- 5. Fix investor_interest - Add PERMISSIVE policy for service_role
CREATE POLICY "Service role can manage investor_interest"
ON public.investor_interest
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- 6. Fix push_subscriptions - Add PERMISSIVE policy for service_role
CREATE POLICY "Service role can manage push_subscriptions"
ON public.push_subscriptions
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- 7. Fix perplexity_cache - Add PERMISSIVE policy for service_role (already has one but ensure it's complete)
-- Drop existing if needed and recreate properly
DROP POLICY IF EXISTS "Service role can manage cache" ON public.perplexity_cache;
CREATE POLICY "Service role can manage perplexity_cache"
ON public.perplexity_cache
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- 8. Ensure rent_price_history has proper service_role access
CREATE POLICY "Service role can manage rent_price_history"
ON public.rent_price_history
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);