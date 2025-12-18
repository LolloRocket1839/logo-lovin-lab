import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Turin-focused domains for grounded search
const TURIN_DOMAINS = [
  'junglerent.it',
  'comune.torino.it',
  'immobiliare.it',
  'idealista.it',
  'edisu.piemonte.it',
  'polito.it',
  'unito.it',
  'studenti.it',
  'universitaly.it',
];

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, language = 'en' } = await req.json();

    if (!query || typeof query !== 'string' || query.trim().length < 3) {
      console.error('Invalid query:', query);
      return new Response(
        JSON.stringify({ error: 'Query must be at least 3 characters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const PERPLEXITY_API_KEY = Deno.env.get('PERPLEXITY_API_KEY');
    if (!PERPLEXITY_API_KEY) {
      console.error('PERPLEXITY_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const systemPrompt = language === 'it' 
      ? `Sei l'assistente AI di Jungle Rent, specializzato in affitti studenteschi e investimenti immobiliari a Torino.
         
         ISTRUZIONI:
         - Rispondi sempre in italiano
         - Fornisci informazioni accurate e aggiornate su Torino
         - Concentrati su: mercato immobiliare, zone universitarie, prezzi affitti, investimenti
         - Se non sei sicuro, dillo chiaramente
         - Mantieni le risposte concise ma complete (max 200 parole)
         - Cita sempre le fonti quando possibile`
      : `You are Jungle Rent's AI assistant, specializing in student housing and real estate investments in Turin, Italy.
         
         INSTRUCTIONS:
         - Always respond in English
         - Provide accurate, up-to-date information about Turin
         - Focus on: real estate market, university areas, rent prices, investments
         - If unsure, clearly state so
         - Keep responses concise but complete (max 200 words)
         - Always cite sources when possible`;

    console.log('Calling Perplexity API with query:', query.substring(0, 100));

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'sonar',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query }
        ],
        search_domain_filter: TURIN_DOMAINS,
        temperature: 0.2,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Perplexity API error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'rate_limit', message: 'Too many requests. Please wait a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: 'api_error', message: 'Failed to get AI response' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('Perplexity response received successfully');

    const answer = data.choices?.[0]?.message?.content || '';
    const citations = data.citations || [];

    return new Response(
      JSON.stringify({
        answer,
        citations,
        query,
        language,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in perplexity-search:', error);
    return new Response(
      JSON.stringify({ error: 'server_error', message: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
