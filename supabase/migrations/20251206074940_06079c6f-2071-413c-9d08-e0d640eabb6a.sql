-- Add explicit RLS policies to protect investor personal data
-- Note: INSERT policy already exists for public form submissions
-- Admins access data through Supabase dashboard with service role

-- Block all public SELECT access (defense-in-depth)
CREATE POLICY "Block public read access to investor data" 
ON public.investor_interest 
FOR SELECT 
USING (false);

-- Block all public UPDATE access
CREATE POLICY "Block public update access to investor data" 
ON public.investor_interest 
FOR UPDATE 
USING (false);

-- Block all public DELETE access  
CREATE POLICY "Block public delete access to investor data"
ON public.investor_interest 
FOR DELETE 
USING (false);

-- Add comment explaining security approach
COMMENT ON TABLE public.investor_interest IS 'Contains sensitive investor PII. Public can INSERT only (for form). All reads/updates/deletes blocked - admins use Supabase dashboard with service role.';