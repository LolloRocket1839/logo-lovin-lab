-- Drop all permissive policies that expose testing data
DROP POLICY IF EXISTS "Anyone can read test results" ON public.ai_test_results;
DROP POLICY IF EXISTS "Anyone can insert test results" ON public.ai_test_results;
DROP POLICY IF EXISTS "Anyone can update test results" ON public.ai_test_results;

-- Create restrictive policies that block all public access
-- Only service role (backend/edge functions) can access this data
CREATE POLICY "Block public read access to ai test results" 
ON public.ai_test_results 
FOR SELECT 
USING (false);

CREATE POLICY "Block public insert access to ai test results" 
ON public.ai_test_results 
FOR INSERT 
WITH CHECK (false);

CREATE POLICY "Block public update access to ai test results" 
ON public.ai_test_results 
FOR UPDATE 
USING (false);