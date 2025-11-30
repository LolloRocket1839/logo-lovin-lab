-- Create investor_interest table for storing investor form submissions
CREATE TABLE public.investor_interest (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  country text NOT NULL,
  investor_type text NOT NULL,
  investment_amount_range text NOT NULL,
  investment_timeline text NOT NULL,
  heard_about text,
  investment_experience text,
  accredited_investor text NOT NULL,
  areas_of_interest text[] NOT NULL,
  additional_comments text,
  consents_to_data_processing boolean DEFAULT false,
  consents_to_fadp boolean DEFAULT false,
  consents_to_contact boolean DEFAULT false,
  understands_no_commitment boolean DEFAULT false
);

-- Enable Row Level Security
ALTER TABLE public.investor_interest ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public form)
CREATE POLICY "Anyone can insert investor interest" 
ON public.investor_interest 
FOR INSERT 
WITH CHECK (true);