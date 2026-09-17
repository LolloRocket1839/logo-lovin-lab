DROP POLICY IF EXISTS "Visitors can upload lead property photos" ON storage.objects;

CREATE POLICY "Visitors can upload lead property photos"
  ON storage.objects
  FOR INSERT
  TO anon
  WITH CHECK (
    bucket_id = 'property-photos'
    AND array_length(storage.foldername(name), 1) = 2
    AND (storage.foldername(name))[1] ~ '^lead-[0-9a-z-]{1,64}$'
    AND (storage.foldername(name))[2] ~ '^[a-z0-9_-]{1,32}$'
    AND lower(storage.extension(name)) IN ('jpg','jpeg','png','webp','heic','heif')
  );