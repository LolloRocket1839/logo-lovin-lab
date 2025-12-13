-- Drop the old check constraint
ALTER TABLE ab_test_events DROP CONSTRAINT IF EXISTS ab_test_events_cta_type_check;

-- Add new check constraint with extended cta_type values
ALTER TABLE ab_test_events ADD CONSTRAINT ab_test_events_cta_type_check 
  CHECK (cta_type IN ('students', 'investors', 'sellers', 'turisti', 'tourists'));