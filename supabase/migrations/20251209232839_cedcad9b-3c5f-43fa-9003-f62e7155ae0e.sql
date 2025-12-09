-- Drop existing view
DROP VIEW IF EXISTS public.ab_test_results;

-- Recreate view with security_invoker to respect underlying table RLS
CREATE VIEW public.ab_test_results
WITH (security_invoker = true)
AS
SELECT 
  cta_type,
  variation,
  COUNT(*) FILTER (WHERE event_type = 'impression') AS impressions,
  COUNT(*) FILTER (WHERE event_type = 'click') AS clicks,
  ROUND(
    (COUNT(*) FILTER (WHERE event_type = 'click')::numeric / 
     NULLIF(COUNT(*) FILTER (WHERE event_type = 'impression'), 0)) * 100, 
    2
  ) AS ctr_percentage
FROM public.ab_test_events
GROUP BY cta_type, variation;

-- Enable RLS on the view
ALTER VIEW public.ab_test_results SET (security_invoker = true);

-- Grant usage to authenticated users only (service role can still access)
REVOKE ALL ON public.ab_test_results FROM anon;
REVOKE ALL ON public.ab_test_results FROM public;
GRANT SELECT ON public.ab_test_results TO authenticated;