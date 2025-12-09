-- Add missing DELETE policies
CREATE POLICY "Block public delete on ab_test_events"
ON public.ab_test_events FOR DELETE
TO public USING (false);

CREATE POLICY "Block public delete on analytics_events"
ON public.analytics_events FOR DELETE
TO public USING (false);

CREATE POLICY "Block public delete on ai_test_results"
ON public.ai_test_results FOR DELETE
TO public USING (false);

-- Add missing UPDATE policies
CREATE POLICY "Block public update on ab_test_events"
ON public.ab_test_events FOR UPDATE
TO public USING (false);

CREATE POLICY "Block public update on analytics_events"
ON public.analytics_events FOR UPDATE
TO public USING (false);