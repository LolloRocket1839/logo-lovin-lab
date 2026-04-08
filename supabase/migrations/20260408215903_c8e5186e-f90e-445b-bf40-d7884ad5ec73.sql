
-- Create leads table for unified lead tracking
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  source TEXT NOT NULL DEFAULT 'unknown',
  lead_type TEXT NOT NULL DEFAULT 'general',
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Block all public access
CREATE POLICY "Block public select on leads" ON public.leads FOR SELECT USING (false);
CREATE POLICY "Block public insert on leads" ON public.leads FOR INSERT WITH CHECK (false);
CREATE POLICY "Block public update on leads" ON public.leads FOR UPDATE USING (false);
CREATE POLICY "Block public delete on leads" ON public.leads FOR DELETE USING (false);

-- Service role full access
CREATE POLICY "Service role can manage leads" ON public.leads FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Security definer function for anonymous lead insertion
CREATE OR REPLACE FUNCTION public.insert_lead(
  _email TEXT,
  _name TEXT DEFAULT NULL,
  _phone TEXT DEFAULT NULL,
  _source TEXT DEFAULT 'unknown',
  _lead_type TEXT DEFAULT 'general',
  _utm_source TEXT DEFAULT NULL,
  _utm_medium TEXT DEFAULT NULL,
  _utm_campaign TEXT DEFAULT NULL,
  _metadata JSONB DEFAULT '{}'::jsonb
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _id UUID;
BEGIN
  -- Validate email format
  IF _email IS NULL OR _email !~ '^[^\s@]+@[^\s@]+\.[^\s@]+$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;

  -- Validate lead_type
  IF _lead_type NOT IN ('investor', 'seller', 'student', 'general') THEN
    RAISE EXCEPTION 'Invalid lead type';
  END IF;

  INSERT INTO public.leads (email, name, phone, source, lead_type, utm_source, utm_medium, utm_campaign, metadata)
  VALUES (LOWER(TRIM(_email)), TRIM(_name), TRIM(_phone), _source, _lead_type, _utm_source, _utm_medium, _utm_campaign, _metadata)
  RETURNING id INTO _id;

  RETURN _id;
END;
$$;
