-- Drop the existing view
DROP VIEW IF EXISTS public.ab_test_results;

-- Recreate the view with SECURITY INVOKER explicitly enabled
-- This ensures the view respects RLS policies of the underlying ab_test_events table
CREATE VIEW public.ab_test_results 
WITH (security_invoker = true) AS
SELECT 
    cta_type,
    variation,
    count(*) FILTER (WHERE event_type = 'impression') AS impressions,
    count(*) FILTER (WHERE event_type = 'click') AS clicks,
    CASE
        WHEN count(*) FILTER (WHERE event_type = 'impression') > 0 
        THEN round(
            count(*) FILTER (WHERE event_type = 'click')::numeric / 
            count(*) FILTER (WHERE event_type = 'impression')::numeric * 100, 2
        )
        ELSE 0::numeric
    END AS ctr_percentage
FROM public.ab_test_events
GROUP BY cta_type, variation
ORDER BY cta_type, variation;