-- Create analytics_events table for privacy-friendly tracking
CREATE TABLE public.analytics_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  page_url TEXT NOT NULL,
  page_title TEXT,
  referrer TEXT,
  user_agent TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX idx_analytics_events_session_id ON public.analytics_events(session_id);
CREATE INDEX idx_analytics_events_event_type ON public.analytics_events(event_type);
CREATE INDEX idx_analytics_events_created_at ON public.analytics_events(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert analytics events (privacy-friendly)
CREATE POLICY "Anyone can insert analytics events"
ON public.analytics_events
FOR INSERT
WITH CHECK (true);

-- No SELECT policy - analytics data is write-only for privacy