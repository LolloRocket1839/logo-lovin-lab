-- Drop the public SELECT policy that exposes user tracking data
DROP POLICY IF EXISTS "Anyone can read ab test events" ON public.ab_test_events;

-- Create a restrictive policy that blocks all public reads
-- Only service role (backend/edge functions) can read this data
CREATE POLICY "Block public read access to ab test events" 
ON public.ab_test_events 
FOR SELECT 
USING (false);