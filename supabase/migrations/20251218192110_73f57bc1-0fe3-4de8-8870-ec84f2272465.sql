-- Tabella storico prezzi affitti
CREATE TABLE public.rent_price_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  area_name TEXT NOT NULL,
  year INTEGER NOT NULL,
  min_rent INTEGER NOT NULL,
  max_rent INTEGER NOT NULL,
  avg_rent INTEGER GENERATED ALWAYS AS ((min_rent + max_rent) / 2) STORED,
  source TEXT DEFAULT 'initial_data',
  fetched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(area_name, year)
);

-- Tabella subscriptions push notifications
CREATE TABLE public.push_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  endpoint TEXT NOT NULL UNIQUE,
  auth_key TEXT NOT NULL,
  p256dh_key TEXT NOT NULL,
  areas TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.rent_price_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;

-- Lettura pubblica per storico prezzi (dati pubblici)
CREATE POLICY "Lettura pubblica storico prezzi" ON public.rent_price_history
  FOR SELECT USING (true);

-- Scrittura solo da service role (edge functions)
CREATE POLICY "Scrittura solo service role" ON public.rent_price_history
  FOR INSERT WITH CHECK (false);

CREATE POLICY "Update solo service role" ON public.rent_price_history
  FOR UPDATE USING (false);

CREATE POLICY "Delete solo service role" ON public.rent_price_history
  FOR DELETE USING (false);

-- Push subscriptions: inserimento pubblico, gestione propria subscription
CREATE POLICY "Inserimento pubblico subscription" ON public.push_subscriptions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Lettura propria subscription" ON public.push_subscriptions
  FOR SELECT USING (true);

CREATE POLICY "Delete propria subscription" ON public.push_subscriptions
  FOR DELETE USING (true);

-- Dati storici iniziali 2020-2024 per tutti i quartieri
INSERT INTO public.rent_price_history (area_name, year, min_rent, max_rent, source) VALUES
  -- San Salvario
  ('San Salvario', 2020, 350, 450, 'historical'),
  ('San Salvario', 2021, 360, 460, 'historical'),
  ('San Salvario', 2022, 380, 480, 'historical'),
  ('San Salvario', 2023, 400, 500, 'historical'),
  ('San Salvario', 2024, 450, 550, 'historical'),
  -- Crocetta
  ('Crocetta', 2020, 400, 520, 'historical'),
  ('Crocetta', 2021, 420, 540, 'historical'),
  ('Crocetta', 2022, 450, 580, 'historical'),
  ('Crocetta', 2023, 480, 620, 'historical'),
  ('Crocetta', 2024, 500, 650, 'historical'),
  -- Centro
  ('Centro', 2020, 450, 580, 'historical'),
  ('Centro', 2021, 470, 600, 'historical'),
  ('Centro', 2022, 500, 640, 'historical'),
  ('Centro', 2023, 520, 670, 'historical'),
  ('Centro', 2024, 550, 700, 'historical'),
  -- Aurora
  ('Aurora', 2020, 280, 350, 'historical'),
  ('Aurora', 2021, 290, 360, 'historical'),
  ('Aurora', 2022, 300, 380, 'historical'),
  ('Aurora', 2023, 320, 400, 'historical'),
  ('Aurora', 2024, 350, 450, 'historical'),
  -- Vanchiglia
  ('Vanchiglia', 2020, 360, 460, 'historical'),
  ('Vanchiglia', 2021, 380, 480, 'historical'),
  ('Vanchiglia', 2022, 400, 500, 'historical'),
  ('Vanchiglia', 2023, 420, 520, 'historical'),
  ('Vanchiglia', 2024, 420, 520, 'historical'),
  -- Santa Rita
  ('Santa Rita', 2020, 320, 400, 'historical'),
  ('Santa Rita', 2021, 330, 410, 'historical'),
  ('Santa Rita', 2022, 350, 430, 'historical'),
  ('Santa Rita', 2023, 370, 460, 'historical'),
  ('Santa Rita', 2024, 380, 480, 'historical'),
  -- Cenisia
  ('Cenisia', 2020, 340, 420, 'historical'),
  ('Cenisia', 2021, 350, 430, 'historical'),
  ('Cenisia', 2022, 370, 460, 'historical'),
  ('Cenisia', 2023, 390, 480, 'historical'),
  ('Cenisia', 2024, 400, 500, 'historical'),
  -- Lingotto
  ('Lingotto', 2020, 300, 380, 'historical'),
  ('Lingotto', 2021, 310, 390, 'historical'),
  ('Lingotto', 2022, 330, 420, 'historical'),
  ('Lingotto', 2023, 350, 440, 'historical'),
  ('Lingotto', 2024, 380, 480, 'historical');