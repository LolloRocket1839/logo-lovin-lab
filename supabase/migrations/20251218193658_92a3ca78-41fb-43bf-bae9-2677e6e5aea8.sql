-- Create cache table for Perplexity responses
CREATE TABLE public.perplexity_cache (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  query_hash TEXT NOT NULL UNIQUE,
  query TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'it',
  response JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '7 days')
);

-- Create index for fast lookups
CREATE INDEX idx_perplexity_cache_query_hash ON public.perplexity_cache(query_hash);
CREATE INDEX idx_perplexity_cache_expires_at ON public.perplexity_cache(expires_at);

-- Enable RLS (public read for edge functions)
ALTER TABLE public.perplexity_cache ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read cache (edge functions need this)
CREATE POLICY "Cache is publicly readable" 
ON public.perplexity_cache 
FOR SELECT 
USING (true);

-- Policy: Edge functions can insert/update via service role
CREATE POLICY "Service role can manage cache" 
ON public.perplexity_cache 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Add comment
COMMENT ON TABLE public.perplexity_cache IS 'Cache for Perplexity API responses to reduce costs and improve speed';