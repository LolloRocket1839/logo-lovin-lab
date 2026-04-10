export interface AITestQuery {
  id: string;
  category: string;
  query: string;
  language: "it" | "en";
  priority: "high" | "medium" | "low";
}

export interface AIEngineResult {
  cited: boolean;
  context: string;
  position?: number;
}

export interface TestResult {
  queryId: string;
  date: string;
  chatgpt: AIEngineResult;
  claude: AIEngineResult;
  notes: string;
}

// Database row type matching Supabase schema
export interface AITestDbRow {
  id: string;
  query_id: string;
  test_date: string;
  chatgpt_cited: boolean | null;
  chatgpt_context: string | null;
  chatgpt_position: number | null;
  claude_cited: boolean | null;
  claude_context: string | null;
  claude_position: number | null;
  notes: string | null;
  tester_name: string | null;
  created_at: string | null;
  updated_at: string | null;
}
