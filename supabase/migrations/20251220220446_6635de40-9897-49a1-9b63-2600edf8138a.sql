-- =====================================================
-- SECURITY FIX: Add blocking policies for perplexity_cache
-- Currently only has service_role policy, needs to block public
-- =====================================================

-- Add RESTRICTIVE policies to block public access to perplexity_cache
CREATE POLICY "Block public select on perplexity_cache"
ON public.perplexity_cache
AS RESTRICTIVE
FOR SELECT
TO public
USING (false);

CREATE POLICY "Block public insert on perplexity_cache"
ON public.perplexity_cache
AS RESTRICTIVE
FOR INSERT
TO public
WITH CHECK (false);

CREATE POLICY "Block public update on perplexity_cache"
ON public.perplexity_cache
AS RESTRICTIVE
FOR UPDATE
TO public
USING (false);

CREATE POLICY "Block public delete on perplexity_cache"
ON public.perplexity_cache
AS RESTRICTIVE
FOR DELETE
TO public
USING (false);