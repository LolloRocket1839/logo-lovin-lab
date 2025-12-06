-- Drop the permissive INSERT policy
DROP POLICY IF EXISTS "Anyone can insert investor interest" ON public.investor_interest;

-- Create a restrictive INSERT policy that blocks all public inserts
-- Only service role (edge functions) can insert
CREATE POLICY "Block public insert access to investor interest" 
ON public.investor_interest 
FOR INSERT 
WITH CHECK (false);