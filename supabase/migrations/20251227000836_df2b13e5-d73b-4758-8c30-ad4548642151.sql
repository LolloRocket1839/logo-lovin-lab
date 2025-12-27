-- Create storage bucket for property photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('property-photos', 'property-photos', true);

-- Policy for public uploads (anonymous users can upload)
CREATE POLICY "Allow public uploads to property-photos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'property-photos');

-- Policy for public read access
CREATE POLICY "Allow public read from property-photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'property-photos');

-- Create seller_leads table for comprehensive lead data
CREATE TABLE public.seller_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  phone TEXT,
  property_address TEXT,
  property_zone TEXT,
  property_sqm INTEGER,
  property_condition TEXT,
  has_cellar BOOLEAN DEFAULT false,
  has_terrace BOOLEAN DEFAULT false,
  num_rooms INTEGER,
  num_bathrooms INTEGER,
  estimated_value INTEGER,
  photos JSONB DEFAULT '[]'::jsonb,
  source TEXT DEFAULT 'property-valuator',
  utm_data JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  status TEXT DEFAULT 'new'
);

-- Enable RLS
ALTER TABLE public.seller_leads ENABLE ROW LEVEL SECURITY;

-- Allow public insert (anyone can submit a lead)
CREATE POLICY "Allow public insert on seller_leads"
ON public.seller_leads FOR INSERT
WITH CHECK (true);

-- Block public read/update/delete
CREATE POLICY "Block public select on seller_leads"
ON public.seller_leads FOR SELECT
USING (false);

CREATE POLICY "Block public update on seller_leads"
ON public.seller_leads FOR UPDATE
USING (false);

CREATE POLICY "Block public delete on seller_leads"
ON public.seller_leads FOR DELETE
USING (false);

-- Service role can manage all
CREATE POLICY "Service role can manage seller_leads"
ON public.seller_leads FOR ALL
USING (true)
WITH CHECK (true);