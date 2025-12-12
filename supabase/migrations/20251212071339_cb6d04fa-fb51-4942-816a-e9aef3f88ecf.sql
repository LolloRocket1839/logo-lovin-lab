-- Drop existing permissive INSERT policies
DROP POLICY IF EXISTS "Anyone can insert analytics events" ON public.analytics_events;
DROP POLICY IF EXISTS "Anyone can insert ab test events" ON public.ab_test_events;

-- Create restrictive INSERT policies that block public access
-- Data can only be inserted via edge functions using service role
CREATE POLICY "Block public insert on analytics_events" 
ON public.analytics_events 
FOR INSERT 
WITH CHECK (false);

CREATE POLICY "Block public insert on ab_test_events" 
ON public.ab_test_events 
FOR INSERT 
WITH CHECK (false);