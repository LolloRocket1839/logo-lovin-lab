
-- Fix ab_test_results VIEW: Enable RLS with security_invoker to respect underlying table policies
DROP VIEW IF EXISTS public.ab_test_results;

CREATE VIEW public.ab_test_results
WITH (security_invoker = true)
AS
SELECT 
  cta_type,
  variation,
  COUNT(*) FILTER (WHERE event_type = 'impression') as impressions,
  COUNT(*) FILTER (WHERE event_type = 'click') as clicks,
  ROUND(
    CASE 
      WHEN COUNT(*) FILTER (WHERE event_type = 'impression') > 0 
      THEN (COUNT(*) FILTER (WHERE event_type = 'click')::numeric / COUNT(*) FILTER (WHERE event_type = 'impression')::numeric) * 100 
      ELSE 0 
    END, 
    2
  ) as ctr_percentage
FROM public.ab_test_events
GROUP BY cta_type, variation;

-- Add SELECT policy to analytics_events to block public reads
CREATE POLICY "Block public read access to analytics events" 
ON public.analytics_events 
FOR SELECT 
USING (false);
