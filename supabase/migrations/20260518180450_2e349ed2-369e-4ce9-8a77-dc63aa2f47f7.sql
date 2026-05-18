CREATE TABLE public.gsc_index_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  captured_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  site_url TEXT NOT NULL DEFAULT 'https://junglerent.it/',
  sitemaps JSONB NOT NULL DEFAULT '[]'::jsonb,
  totals JSONB NOT NULL DEFAULT '{}'::jsonb,
  alerts JSONB NOT NULL DEFAULT '[]'::jsonb,
  alert_sent BOOLEAN NOT NULL DEFAULT false,
  raw_response JSONB
);

ALTER TABLE public.gsc_index_snapshots ENABLE ROW LEVEL SECURITY;

-- Deny-all: only service-role (admin edge functions) can read/write.
CREATE POLICY "deny_select_anon_authenticated"
  ON public.gsc_index_snapshots
  FOR SELECT
  TO anon, authenticated
  USING (false);

CREATE POLICY "deny_insert_anon_authenticated"
  ON public.gsc_index_snapshots
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

CREATE INDEX idx_gsc_snapshots_captured_at
  ON public.gsc_index_snapshots (captured_at DESC);
