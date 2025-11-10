-- Drop the existing view
DROP VIEW IF EXISTS public.ab_test_results;

-- Recreate the view with SECURITY INVOKER to fix security linter issue
CREATE OR REPLACE VIEW public.ab_test_results 
WITH (security_invoker = true)
AS
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