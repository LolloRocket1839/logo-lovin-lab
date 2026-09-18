DO $$
BEGIN
  PERFORM cron.unschedule(jobname) FROM cron.job WHERE jobname IN ('student-nurture-cron','seller-nurture-cron','gmail-inbox-parser','gsc-index-monitor','verify-gsc');
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

DROP VIEW IF EXISTS public.ab_test_results;

DROP TABLE IF EXISTS public.contract_drafts CASCADE;
DROP TABLE IF EXISTS public.investor_interest CASCADE;
DROP TABLE IF EXISTS public.push_subscriptions CASCADE;
DROP TABLE IF EXISTS public.ai_test_results CASCADE;
DROP TABLE IF EXISTS public.gsc_index_snapshots CASCADE;
DROP TABLE IF EXISTS public.gmail_processed_messages CASCADE;
DROP TABLE IF EXISTS public.gmail_sent_messages CASCADE;
DROP TABLE IF EXISTS public.gmail_settings CASCADE;
DROP TABLE IF EXISTS public.lead_interactions CASCADE;
DROP TABLE IF EXISTS public.outreach_templates CASCADE;

COMMENT ON TABLE public.analytics_events IS 'deprecated 2026-09-18, drop after 2026-12-31';
COMMENT ON TABLE public.ab_test_events IS 'deprecated 2026-09-18, drop after 2026-12-31';