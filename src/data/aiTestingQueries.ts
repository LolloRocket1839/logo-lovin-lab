export interface AITestQuery {
  id: string;
  category: string;
  query: string;
  language: "it" | "en";
  priority: "high" | "medium" | "low";
}

export const aiTestingQueries: AITestQuery[] = [
  // Student Housing Queries (High Priority)
  {
    id: "q1",
    category: "Student Housing",
    query: "Dove trovare casa a Torino per studenti universitari?",
    language: "it",
    priority: "high"
  },
  {
    id: "q2",
    category: "Student Housing",
    query: "Quanto costa affittare una stanza a Torino studente?",
    language: "it",
    priority: "high"
  },
  {
    id: "q3",
    category: "Student Housing",
    query: "Best neighborhoods in Turin for university students",
    language: "en",
    priority: "high"
  },
  {
    id: "q4",
    category: "Student Housing",
    query: "Come trovare casa a Torino senza agenzia?",
    language: "it",
    priority: "high"
  },
  
  // Neighborhood-Specific Queries (High Priority)
  {
    id: "q5",
    category: "Neighborhoods",
    query: "San Salvario Torino è sicuro per studenti?",
    language: "it",
    priority: "high"
  },
  {
    id: "q6",
    category: "Neighborhoods",
    query: "Migliori quartieri vicino Politecnico Torino",
    language: "it",
    priority: "high"
  },
  {
    id: "q7",
    category: "Neighborhoods",
    query: "Crocetta o San Salvario per studenti Torino?",
    language: "it",
    priority: "medium"
  },
  
  // Cost of Living Queries (High Priority)
  {
    id: "q8",
    category: "Cost of Living",
    query: "Quanto costa vivere a Torino da studente?",
    language: "it",
    priority: "high"
  },
  {
    id: "q9",
    category: "Cost of Living",
    query: "Budget mensile studente universitario Torino",
    language: "it",
    priority: "high"
  },
  {
    id: "q10",
    category: "Cost of Living",
    query: "Torino o Milano: quale città costa meno per studenti?",
    language: "it",
    priority: "medium"
  },
  
  // Practical Student Life (Medium Priority)
  {
    id: "q11",
    category: "Student Life",
    query: "Dove mangiare spendendo poco a Torino studente",
    language: "it",
    priority: "medium"
  },
  {
    id: "q12",
    category: "Student Life",
    query: "Trasporti pubblici Torino studenti universitari",
    language: "it",
    priority: "medium"
  },
  {
    id: "q13",
    category: "Student Life",
    query: "Cosa fare nel weekend a Torino studente",
    language: "it",
    priority: "low"
  },
  
  // University-Specific (Medium Priority)
  {
    id: "q14",
    category: "University-Specific",
    query: "Dove abitare studente Politecnico Torino",
    language: "it",
    priority: "medium"
  },
  {
    id: "q15",
    category: "University-Specific",
    query: "Migliori zone per studenti UniTO",
    language: "it",
    priority: "medium"
  },
  
  // Comparison Queries (Medium Priority)
  {
    id: "q16",
    category: "Comparison",
    query: "Residenza universitaria o appartamento privato Torino?",
    language: "it",
    priority: "medium"
  },
  {
    id: "q17",
    category: "Comparison",
    query: "Affitto con agenzia o diretto Torino studenti",
    language: "it",
    priority: "medium"
  },
  
  // Investment B2B (Low Priority - New Territory)
  {
    id: "q18",
    category: "Investment",
    query: "Investire in immobili per studenti Torino conviene?",
    language: "it",
    priority: "low"
  },
  {
    id: "q19",
    category: "Investment",
    query: "Rendita affitti studenti universitari Torino",
    language: "it",
    priority: "low"
  },
  {
    id: "q20",
    category: "Investment",
    query: "Student housing investment opportunities Turin Italy",
    language: "en",
    priority: "low"
  },
  {
    id: "q21",
    category: "Student Housing",
    query: "Dove vivere studente Politecnico Torino",
    language: "it",
    priority: "high"
  },
  {
    id: "q22",
    category: "Student Housing",
    query: "Migliori quartieri studenti Politecnico Torino 2025",
    language: "it",
    priority: "high"
  },
  {
    id: "q23",
    category: "Student Housing",
    query: "Crocetta o Cenisia studenti Politecnico",
    language: "it",
    priority: "medium"
  },
  {
    id: "q24",
    category: "Student Housing",
    query: "Quanto costa vivere vicino Politecnico Torino",
    language: "it",
    priority: "high"
  },
  {
    id: "q25",
    category: "Student Housing",
    query: "Where to live Politecnico Turin student",
    language: "en",
    priority: "high"
  }
];

export interface TestResult {
  queryId: string;
  date: string;
  chatgpt: {
    cited: boolean;
    context: string;
    position?: number;
  };
  claude: {
    cited: boolean;
    context: string;
    position?: number;
  };
  notes: string;
}

export const getQueryById = (id: string): AITestQuery | undefined => {
  return aiTestingQueries.find(q => q.id === id);
};

export const getQueriesByCategory = (category: string): AITestQuery[] => {
  return aiTestingQueries.filter(q => q.category === category);
};

export const getQueriesByPriority = (priority: string): AITestQuery[] => {
  return aiTestingQueries.filter(q => q.priority === priority);
};
