-- Fix search_path security warning
DROP FUNCTION IF EXISTS public.update_updated_at_column() CASCADE;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Recreate trigger
CREATE TRIGGER update_ai_test_results_updated_at
  BEFORE UPDATE ON ai_test_results
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();