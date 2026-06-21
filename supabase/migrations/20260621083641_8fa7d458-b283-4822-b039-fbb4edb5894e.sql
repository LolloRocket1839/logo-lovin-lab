
-- Explicit anon blocks on gmail tables
CREATE POLICY "Block anon select" ON public.gmail_processed_messages FOR SELECT TO anon USING (false);
CREATE POLICY "Block anon select" ON public.gmail_sent_messages FOR SELECT TO anon USING (false);
CREATE POLICY "Block anon select" ON public.gmail_settings FOR SELECT TO anon USING (false);

-- Owner-only update/delete on property-photos bucket
CREATE POLICY "Owners can update their property photos"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'property-photos' AND owner = auth.uid())
WITH CHECK (bucket_id = 'property-photos' AND owner = auth.uid());

CREATE POLICY "Owners can delete their property photos"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'property-photos' AND owner = auth.uid());
