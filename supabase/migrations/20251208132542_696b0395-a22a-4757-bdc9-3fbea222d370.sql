-- Drop existing RESTRICTIVE policies on investor_interest
DROP POLICY IF EXISTS "Block public insert access to investor interest" ON public.investor_interest;
DROP POLICY IF EXISTS "Block public read access to investor data" ON public.investor_interest;
DROP POLICY IF EXISTS "Block public update access to investor data" ON public.investor_interest;
DROP POLICY IF EXISTS "Block public delete access to investor data" ON public.investor_interest;

-- Create explicit PERMISSIVE policies that deny all public access
-- These are clearer and follow Supabase best practices

-- No public SELECT - only service role can read
CREATE POLICY "No public read access" 
ON public.investor_interest 
FOR SELECT 
TO public
USING (false);

-- No public INSERT - only service role (edge function) can insert
CREATE POLICY "No public insert access" 
ON public.investor_interest 
FOR INSERT 
TO public
WITH CHECK (false);

-- No public UPDATE - only service role can update
CREATE POLICY "No public update access" 
ON public.investor_interest 
FOR UPDATE 
TO public
USING (false);

-- No public DELETE - only service role can delete
CREATE POLICY "No public delete access" 
ON public.investor_interest 
FOR DELETE 
TO public
USING (false);