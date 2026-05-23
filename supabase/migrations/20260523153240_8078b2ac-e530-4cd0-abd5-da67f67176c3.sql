
-- property_listings: public listing metadata, NO seller contact info
CREATE TABLE public.property_listings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  portal text NOT NULL,
  external_id text NOT NULL,
  url text NOT NULL,
  title text,
  zone text,
  price_eur integer,
  sqm integer,
  rooms integer,
  floor text,
  condition text,
  is_private_seller boolean NOT NULL DEFAULT false,
  thumbnail_url text,
  description_excerpt text,
  first_seen_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  price_history jsonb NOT NULL DEFAULT '[]'::jsonb,
  status text NOT NULL DEFAULT 'active',
  lead_score integer NOT NULL DEFAULT 0,
  contacted_at timestamptz,
  contact_notes text,
  converted_lead_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT property_listings_portal_check CHECK (portal IN ('immobiliare','idealista','subito')),
  CONSTRAINT property_listings_status_check CHECK (status IN ('active','sold','expired','hidden')),
  CONSTRAINT property_listings_portal_external_uniq UNIQUE (portal, external_id)
);

CREATE INDEX idx_property_listings_status ON public.property_listings(status);
CREATE INDEX idx_property_listings_score ON public.property_listings(lead_score DESC);
CREATE INDEX idx_property_listings_zone ON public.property_listings(zone);
CREATE INDEX idx_property_listings_first_seen ON public.property_listings(first_seen_at DESC);

ALTER TABLE public.property_listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Block public select property_listings" ON public.property_listings FOR SELECT USING (false);
CREATE POLICY "Block public insert property_listings" ON public.property_listings FOR INSERT WITH CHECK (false);
CREATE POLICY "Block public update property_listings" ON public.property_listings FOR UPDATE USING (false);
CREATE POLICY "Block public delete property_listings" ON public.property_listings FOR DELETE USING (false);
CREATE POLICY "Service role can manage property_listings" ON public.property_listings FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE TRIGGER trg_property_listings_updated
BEFORE UPDATE ON public.property_listings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- radar_fetch_log: audit of each cron run
CREATE TABLE public.radar_fetch_log (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  portal text NOT NULL,
  zone text,
  url text,
  listings_found integer NOT NULL DEFAULT 0,
  listings_new integer NOT NULL DEFAULT 0,
  listings_updated integer NOT NULL DEFAULT 0,
  errors jsonb NOT NULL DEFAULT '[]'::jsonb,
  duration_ms integer,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_radar_fetch_log_created ON public.radar_fetch_log(created_at DESC);

ALTER TABLE public.radar_fetch_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Block public select radar_fetch_log" ON public.radar_fetch_log FOR SELECT USING (false);
CREATE POLICY "Block public insert radar_fetch_log" ON public.radar_fetch_log FOR INSERT WITH CHECK (false);
CREATE POLICY "Service role can manage radar_fetch_log" ON public.radar_fetch_log FOR ALL TO service_role USING (true) WITH CHECK (true);

-- outreach_templates
CREATE TABLE public.outreach_templates (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  language text NOT NULL DEFAULT 'it',
  channel text NOT NULL DEFAULT 'portal_message',
  body text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.outreach_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Block public select outreach_templates" ON public.outreach_templates FOR SELECT USING (false);
CREATE POLICY "Block public write outreach_templates" ON public.outreach_templates FOR ALL USING (false) WITH CHECK (false);
CREATE POLICY "Service role can manage outreach_templates" ON public.outreach_templates FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE TRIGGER trg_outreach_templates_updated
BEFORE UPDATE ON public.outreach_templates
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.outreach_templates (name, language, channel, body) VALUES
('Lingotto privato - default IT', 'it', 'portal_message',
'Buongiorno, ho visto il suo annuncio per l''appartamento in {{zone}}.
Sono Lorenzo, acquisto direttamente case in zona Lingotto / Nizza Millefonti per metterle a reddito con studenti universitari.
Non sono un''agenzia: zero commissioni, rogito in 60-90 giorni.
Se le interessa una valutazione senza impegno, mi scrive su WhatsApp?
+39 379 139 8291 - junglerent.it
Grazie, Lorenzo Oni-Joseph');
