ALTER TABLE public.seller_leads ALTER COLUMN email DROP NOT NULL;
ALTER TABLE public.seller_leads ADD CONSTRAINT seller_leads_contact_present CHECK (email IS NOT NULL OR phone IS NOT NULL);