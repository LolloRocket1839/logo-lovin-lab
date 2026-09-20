DROP POLICY IF EXISTS "tmp cleanup delete test photos" ON storage.objects;
DELETE FROM public.seller_leads WHERE name = 'Test Claude' AND property_address = 'Via Nizza 100';