-- Fix push_subscriptions RLS policies - remove overly permissive policies
DROP POLICY IF EXISTS "Lettura propria subscription" ON public.push_subscriptions;
DROP POLICY IF EXISTS "Delete propria subscription" ON public.push_subscriptions;
DROP POLICY IF EXISTS "Inserimento pubblico subscription" ON public.push_subscriptions;

-- Create restrictive policies - only service role can access (for edge functions)
-- No public access at all - edge functions use service role key
CREATE POLICY "Service role only - select" 
ON public.push_subscriptions 
FOR SELECT 
USING (false);

CREATE POLICY "Service role only - insert" 
ON public.push_subscriptions 
FOR INSERT 
WITH CHECK (false);

CREATE POLICY "Service role only - delete" 
ON public.push_subscriptions 
FOR DELETE 
USING (false);