-- 1. Extend leads with CRM fields
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'nuovo',
  ADD COLUMN IF NOT EXISTS priority text NOT NULL DEFAULT 'medium',
  ADD COLUMN IF NOT EXISTS assigned_to text,
  ADD COLUMN IF NOT EXISTS last_contact_at timestamptz,
  ADD COLUMN IF NOT EXISTS next_followup_at timestamptz,
  ADD COLUMN IF NOT EXISTS internal_notes text;

ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS leads_status_check;
ALTER TABLE public.leads ADD CONSTRAINT leads_status_check
  CHECK (status IN ('nuovo','contattato','qualificato','proposta','vinto','perso','nurturing'));

ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS leads_priority_check;
ALTER TABLE public.leads ADD CONSTRAINT leads_priority_check
  CHECK (priority IN ('low','medium','high'));

CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_next_followup_at ON public.leads(next_followup_at);

-- 2. Lead interactions (timeline)
CREATE TABLE IF NOT EXISTS public.lead_interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  lead_table text NOT NULL DEFAULT 'leads',
  kind text NOT NULL,
  direction text NOT NULL DEFAULT 'outbound',
  content text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_by text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT lead_interactions_kind_check CHECK (kind IN ('note','call','whatsapp','email','meeting','status_change','followup')),
  CONSTRAINT lead_interactions_direction_check CHECK (direction IN ('inbound','outbound','system'))
);

CREATE INDEX IF NOT EXISTS idx_lead_interactions_lead_id ON public.lead_interactions(lead_id, created_at DESC);

ALTER TABLE public.lead_interactions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Block public select on lead_interactions" ON public.lead_interactions;
CREATE POLICY "Block public select on lead_interactions" ON public.lead_interactions FOR SELECT USING (false);
DROP POLICY IF EXISTS "Block public insert on lead_interactions" ON public.lead_interactions;
CREATE POLICY "Block public insert on lead_interactions" ON public.lead_interactions FOR INSERT WITH CHECK (false);
DROP POLICY IF EXISTS "Block public update on lead_interactions" ON public.lead_interactions;
CREATE POLICY "Block public update on lead_interactions" ON public.lead_interactions FOR UPDATE USING (false);
DROP POLICY IF EXISTS "Block public delete on lead_interactions" ON public.lead_interactions;
CREATE POLICY "Block public delete on lead_interactions" ON public.lead_interactions FOR DELETE USING (false);
DROP POLICY IF EXISTS "Service role can manage lead_interactions" ON public.lead_interactions;
CREATE POLICY "Service role can manage lead_interactions" ON public.lead_interactions FOR ALL TO service_role USING (true) WITH CHECK (true);