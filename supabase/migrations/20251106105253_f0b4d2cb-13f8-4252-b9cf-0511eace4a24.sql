-- Create table for AI test results
CREATE TABLE ai_test_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Query info
  query_id TEXT NOT NULL,
  test_date DATE NOT NULL,
  
  -- ChatGPT results
  chatgpt_cited BOOLEAN DEFAULT FALSE,
  chatgpt_context TEXT,
  chatgpt_position INTEGER,
  
  -- Claude results
  claude_cited BOOLEAN DEFAULT FALSE,
  claude_context TEXT,
  claude_position INTEGER,
  
  -- Perplexity results
  perplexity_cited BOOLEAN DEFAULT FALSE,
  perplexity_context TEXT,
  perplexity_position INTEGER,
  
  -- Additional notes
  notes TEXT,
  
  -- Metadata
  tester_name TEXT,
  
  CONSTRAINT unique_test_per_query_date UNIQUE(query_id, test_date)
);

-- Create indexes for performance
CREATE INDEX idx_ai_test_query_id ON ai_test_results(query_id);
CREATE INDEX idx_ai_test_date ON ai_test_results(test_date DESC);
CREATE INDEX idx_ai_test_created ON ai_test_results(created_at DESC);

-- Enable Row Level Security
ALTER TABLE ai_test_results ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Everyone can read test results (public data)
CREATE POLICY "Anyone can read test results"
  ON ai_test_results FOR SELECT
  USING (true);

-- RLS Policy: Everyone can insert test results
CREATE POLICY "Anyone can insert test results"
  ON ai_test_results FOR INSERT
  WITH CHECK (true);

-- RLS Policy: Everyone can update test results
CREATE POLICY "Anyone can update test results"
  ON ai_test_results FOR UPDATE
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_ai_test_results_updated_at
  BEFORE UPDATE ON ai_test_results
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();