ALTER TABLE public.seller_leads
  ADD COLUMN IF NOT EXISTS name text,
  ADD COLUMN IF NOT EXISTS situation text,
  ADD COLUMN IF NOT EXISTS tenant_status text,
  ADD COLUMN IF NOT EXISTS tenant_lease_end date,
  ADD COLUMN IF NOT EXISTS floor text,
  ADD COLUMN IF NOT EXISTS has_elevator boolean,
  ADD COLUMN IF NOT EXISTS asking_price integer,
  ADD COLUMN IF NOT EXISTS message text,
  ADD COLUMN IF NOT EXISTS privacy_consent boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS consent_at timestamptz;

ALTER TABLE public.seller_leads
  DROP CONSTRAINT IF EXISTS seller_leads_situation_check;
ALTER TABLE public.seller_leads
  ADD CONSTRAINT seller_leads_situation_check
  CHECK (situation IS NULL OR situation IN ('eredita','inquilino','da_ristrutturare','nessuna','altro'));

ALTER TABLE public.seller_leads
  DROP CONSTRAINT IF EXISTS seller_leads_tenant_status_check;
ALTER TABLE public.seller_leads
  ADD CONSTRAINT seller_leads_tenant_status_check
  CHECK (tenant_status IS NULL OR tenant_status IN ('libero','inquilino_scadenza','inquilino_indeterminato'));

GRANT INSERT ON public.seller_leads TO anon, authenticated;
GRANT ALL ON public.seller_leads TO service_role;

DROP POLICY IF EXISTS "Allow public insert on seller_leads" ON public.seller_leads;
CREATE POLICY "Allow public insert on seller_leads"
  ON public.seller_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (source IS DISTINCT FROM 'vendi' OR privacy_consent = true);