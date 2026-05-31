
-- Gmail integration: dedup table for processed inbox messages + log of sent messages

CREATE TABLE public.gmail_processed_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id TEXT NOT NULL UNIQUE,
  thread_id TEXT,
  from_email TEXT,
  from_name TEXT,
  subject TEXT,
  snippet TEXT,
  classification TEXT NOT NULL DEFAULT 'other',
  confidence NUMERIC,
  lead_id UUID,
  auto_replied BOOLEAN NOT NULL DEFAULT false,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  processed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_gmail_processed_classification ON public.gmail_processed_messages(classification);
CREATE INDEX idx_gmail_processed_processed_at ON public.gmail_processed_messages(processed_at DESC);

GRANT SELECT ON public.gmail_processed_messages TO authenticated;
GRANT ALL ON public.gmail_processed_messages TO service_role;

ALTER TABLE public.gmail_processed_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Block public select gmail_processed_messages"
  ON public.gmail_processed_messages FOR SELECT TO authenticated USING (false);
CREATE POLICY "Service role can manage gmail_processed_messages"
  ON public.gmail_processed_messages FOR ALL TO service_role USING (true) WITH CHECK (true);


CREATE TABLE public.gmail_sent_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id TEXT,
  thread_id TEXT,
  to_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  body_excerpt TEXT,
  sent_by UUID,
  sent_by_email TEXT,
  linked_listing_id UUID,
  linked_lead_id UUID,
  in_reply_to TEXT,
  template_key TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_gmail_sent_to_email ON public.gmail_sent_messages(to_email);
CREATE INDEX idx_gmail_sent_sent_at ON public.gmail_sent_messages(sent_at DESC);

GRANT SELECT ON public.gmail_sent_messages TO authenticated;
GRANT ALL ON public.gmail_sent_messages TO service_role;

ALTER TABLE public.gmail_sent_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Block public select gmail_sent_messages"
  ON public.gmail_sent_messages FOR SELECT TO authenticated USING (false);
CREATE POLICY "Service role can manage gmail_sent_messages"
  ON public.gmail_sent_messages FOR ALL TO service_role USING (true) WITH CHECK (true);


-- Singleton config row for Gmail integration
CREATE TABLE public.gmail_settings (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  auto_reply_enabled BOOLEAN NOT NULL DEFAULT false,
  auto_reply_categories JSONB NOT NULL DEFAULT '[]'::jsonb,
  signature TEXT NOT NULL DEFAULT 'Lorenzo Oni-Joseph
Founder, Jungle Rent
WhatsApp: +39 331 905 3037
https://junglerent.it',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO public.gmail_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

GRANT SELECT ON public.gmail_settings TO authenticated;
GRANT ALL ON public.gmail_settings TO service_role;

ALTER TABLE public.gmail_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Block public select gmail_settings"
  ON public.gmail_settings FOR SELECT TO authenticated USING (false);
CREATE POLICY "Service role can manage gmail_settings"
  ON public.gmail_settings FOR ALL TO service_role USING (true) WITH CHECK (true);
