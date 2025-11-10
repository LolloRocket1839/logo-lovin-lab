-- Create table for A/B test events
CREATE TABLE IF NOT EXISTS public.ab_test_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  cta_type TEXT NOT NULL CHECK (cta_type IN ('students', 'investors', 'sellers')),
  variation TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('impression', 'click')),
  session_id TEXT NOT NULL,
  user_agent TEXT,
  page_url TEXT
);

-- Enable Row Level Security
ALTER TABLE public.ab_test_events ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert events (for tracking)
CREATE POLICY "Anyone can insert ab test events"
ON public.ab_test_events
FOR INSERT
WITH CHECK (true);

-- Create policy to allow anyone to read events (for analytics)
CREATE POLICY "Anyone can read ab test events"
ON public.ab_test_events
FOR SELECT
USING (true);

-- Create indexes for better query performance
CREATE INDEX idx_ab_test_events_cta_type ON public.ab_test_events(cta_type);
CREATE INDEX idx_ab_test_events_variation ON public.ab_test_events(variation);
CREATE INDEX idx_ab_test_events_created_at ON public.ab_test_events(created_at);
CREATE INDEX idx_ab_test_events_session_id ON public.ab_test_events(session_id);

-- Create a view for easy analytics
CREATE OR REPLACE VIEW public.ab_test_results AS
SELECT 
  cta_type,
  variation,
  COUNT(*) FILTER (WHERE event_type = 'impression') as impressions,
  COUNT(*) FILTER (WHERE event_type = 'click') as clicks,
  CASE 
    WHEN COUNT(*) FILTER (WHERE event_type = 'impression') > 0 
    THEN ROUND((COUNT(*) FILTER (WHERE event_type = 'click')::numeric / COUNT(*) FILTER (WHERE event_type = 'impression')::numeric * 100), 2)
    ELSE 0
  END as ctr_percentage
FROM public.ab_test_events
GROUP BY cta_type, variation
ORDER BY cta_type, variation;