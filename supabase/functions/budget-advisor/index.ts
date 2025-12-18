import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BudgetRequest {
  selectedArea: string;
  housingType: string;
  totalBudget: number;
  breakdown: {
    affitto: number;
    bollette: number;
    trasporti: number;
    spesa: number;
    extra: number;
  };
  language: "it" | "en";
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { selectedArea, housingType, totalBudget, breakdown, language = "it" }: BudgetRequest = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Analyzing budget for:", { selectedArea, housingType, totalBudget, breakdown });

    const systemPrompt = language === "it" 
      ? `Sei un esperto consulente per studenti universitari che vivono a Torino. Conosci perfettamente:
- I quartieri di Torino e i loro costi medi
- I mercati rionali (Porta Palazzo, mercato di Via Nizza, etc.)
- Le mense EDISU e universitarie
- Gli abbonamenti GTT e i costi dei trasporti
- Le opportunità di risparmio per studenti

Analizza il budget fornito e dai consigli pratici e specifici per Torino. Sii conciso ma utile.
IMPORTANTE: Rispondi SOLO usando la funzione suggest_budget_tips, non aggiungere altro testo.`
      : `You are an expert advisor for university students living in Turin, Italy. You know perfectly:
- Turin neighborhoods and their average costs
- Local markets (Porta Palazzo, Via Nizza market, etc.)
- EDISU and university canteens
- GTT subscriptions and transport costs
- Money-saving opportunities for students

Analyze the provided budget and give practical, Turin-specific advice. Be concise but helpful.
IMPORTANT: Respond ONLY using the suggest_budget_tips function, don't add any other text.`;

    const userPrompt = language === "it"
      ? `Analizza questo budget mensile per uno studente a Torino:

Quartiere: ${selectedArea}
Tipo alloggio: ${housingType === "shared" ? "Stanza doppia" : housingType === "single" ? "Stanza singola" : "Monolocale"}
Budget totale: €${totalBudget}/mese

Dettaglio spese:
- Affitto: €${breakdown.affitto}
- Bollette + Internet: €${breakdown.bollette}
- Trasporti: €${breakdown.trasporti}
- Spesa alimentare: €${breakdown.spesa}
- Extra (uscite, hobby): €${breakdown.extra}

Genera:
1. Un breve sommario (max 40 parole) sulla sostenibilità del budget
2. 3-4 consigli specifici per Torino (mercati, mense, sconti studenti, etc.)
3. 1-2 quartieri alternativi con stima del risparmio mensile
4. Eventuali avvisi se qualche voce di spesa sembra troppo bassa o alta
5. 2-3 articoli correlati dal blog Jungle Rent (usa questi slug: san-salvario-guida-studenti, dove-mangiare-torino-studenti, mercati-storici-torino-chiusure, mobilita-sostenibile-torino-studenti, aule-studio-torino-guida-completa)`
      : `Analyze this monthly budget for a student in Turin:

Neighborhood: ${selectedArea}
Housing type: ${housingType === "shared" ? "Shared room" : housingType === "single" ? "Single room" : "Studio apartment"}
Total budget: €${totalBudget}/month

Expense breakdown:
- Rent: €${breakdown.affitto}
- Utilities + Internet: €${breakdown.bollette}
- Transport: €${breakdown.trasporti}
- Groceries: €${breakdown.spesa}
- Extras (going out, hobbies): €${breakdown.extra}

Generate:
1. A brief summary (max 40 words) about budget sustainability
2. 3-4 Turin-specific tips (markets, canteens, student discounts, etc.)
3. 1-2 alternative neighborhoods with estimated monthly savings
4. Any warnings if expenses seem too low or high
5. 2-3 related articles from Jungle Rent blog (use these slugs: san-salvario-guida-studenti, dove-mangiare-torino-studenti, mercati-storici-torino-chiusure, mobilita-sostenibile-torino-studenti, aule-studio-torino-guida-completa)`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "suggest_budget_tips",
              description: "Generate personalized budget advice for a student in Turin",
              parameters: {
                type: "object",
                properties: {
                  summary: {
                    type: "string",
                    description: "Brief summary about budget sustainability (max 40 words)"
                  },
                  tips: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        type: {
                          type: "string",
                          enum: ["savings", "alternative", "warning"],
                          description: "Type of tip: savings for money-saving tips, alternative for neighborhood alternatives, warning for budget concerns"
                        },
                        text: {
                          type: "string",
                          description: "The tip text, concise and actionable"
                        }
                      },
                      required: ["type", "text"],
                      additionalProperties: false
                    },
                    description: "Array of 4-6 tips including savings, alternatives, and warnings"
                  },
                  relatedArticles: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        slug: {
                          type: "string",
                          description: "Article slug from the available list"
                        },
                        title: {
                          type: "string",
                          description: "Article title to display"
                        }
                      },
                      required: ["slug", "title"],
                      additionalProperties: false
                    },
                    description: "2-3 related articles from Jungle Rent blog"
                  }
                },
                required: ["summary", "tips", "relatedArticles"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "suggest_budget_tips" } }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.error("Rate limit exceeded");
        return new Response(JSON.stringify({ error: "rate_limit", message: "Troppi tentativi. Riprova tra qualche minuto." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        console.error("Payment required");
        return new Response(JSON.stringify({ error: "payment_required", message: "Crediti AI esauriti." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log("AI response:", JSON.stringify(data, null, 2));

    // Extract the tool call arguments
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall || toolCall.function.name !== "suggest_budget_tips") {
      throw new Error("Invalid AI response format");
    }

    const advice = JSON.parse(toolCall.function.arguments);
    console.log("Parsed advice:", advice);

    return new Response(JSON.stringify(advice), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Budget advisor error:", error);
    return new Response(
      JSON.stringify({ 
        error: "internal_error", 
        message: error instanceof Error ? error.message : "Errore durante l'analisi del budget" 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
