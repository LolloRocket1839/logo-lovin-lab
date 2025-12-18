import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const TURIN_AREAS = [
  'San Salvario', 'Crocetta', 'Centro', 'Aurora', 
  'Vanchiglia', 'Santa Rita', 'Cenisia', 'Lingotto'
];

interface PriceData {
  area: string;
  minRent: number;
  maxRent: number;
  source: string;
}

interface PushSubscription {
  endpoint: string;
  areas: string[];
}

async function fetchRentPricesFromPerplexity(perplexityKey: string): Promise<PriceData[]> {
  const currentYear = new Date().getFullYear();
  
  const query = `Prezzi affitto stanza singola studenti universitari Torino ${currentYear} per quartiere.
  Fornisci per ogni quartiere (San Salvario, Crocetta, Centro, Aurora, Vanchiglia, Santa Rita, Cenisia, Lingotto):
  - Prezzo minimo stanza singola
  - Prezzo massimo stanza singola
  
  Rispondi SOLO in formato JSON array senza altro testo:
  [{"area": "nome", "minRent": numero, "maxRent": numero}]`;

  console.log('Fetching rent prices from Perplexity...');
  
  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${perplexityKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'sonar',
      messages: [
        { 
          role: 'system', 
          content: 'Sei un esperto del mercato immobiliare di Torino. Rispondi SOLO con JSON valido senza markdown o altro testo.' 
        },
        { role: 'user', content: query }
      ],
      search_domain_filter: ['immobiliare.it', 'idealista.it', 'casa.it'],
      search_recency_filter: 'year',
    }),
  });

  if (!response.ok) {
    throw new Error(`Perplexity API error: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || '';
  
  console.log('Perplexity response:', content);
  
  // Extract JSON from response
  const jsonMatch = content.match(/\[[\s\S]*?\]/);
  if (!jsonMatch) {
    throw new Error('Could not parse JSON from Perplexity response');
  }
  
  const prices: PriceData[] = JSON.parse(jsonMatch[0]);
  const source = data.citations?.join(', ') || 'perplexity';
  
  return prices.map(p => ({ ...p, source }));
}

async function sendPushNotifications(
  supabase: any,
  changedAreas: { area: string; oldAvg: number; newAvg: number; deltaPercent: number }[]
) {
  if (changedAreas.length === 0) return;
  
  console.log('Sending push notifications for areas:', changedAreas.map(a => a.area));
  
  // Get all subscriptions
  const { data: subscriptions, error } = await supabase
    .from('push_subscriptions')
    .select('endpoint, areas');
  
  if (error || !subscriptions?.length) {
    console.log('No push subscriptions found');
    return;
  }
  
  for (const sub of subscriptions as PushSubscription[]) {
    // Filter changed areas that user is subscribed to
    const relevantChanges = changedAreas.filter(
      change => sub.areas.length === 0 || sub.areas.includes(change.area)
    );
    
    if (relevantChanges.length === 0) continue;
    
    const topChange = relevantChanges[0];
    const direction = topChange.deltaPercent > 0 ? '📈' : '📉';
    const message = `${direction} Affitti ${topChange.area}: ${topChange.deltaPercent > 0 ? '+' : ''}${topChange.deltaPercent.toFixed(1)}% (€${topChange.newAvg}/mese)`;
    
    // Note: In production, you'd use web-push library here
    // For now, we log the notification that would be sent
    console.log(`Would send to ${sub.endpoint}: ${message}`);
  }
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const perplexityKey = Deno.env.get('PERPLEXITY_API_KEY');
    if (!perplexityKey) {
      throw new Error('PERPLEXITY_API_KEY not configured');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const currentYear = new Date().getFullYear();
    
    // Fetch current prices from Perplexity
    console.log(`Fetching rent prices for year ${currentYear}...`);
    const newPrices = await fetchRentPricesFromPerplexity(perplexityKey);
    
    // Get previous year's data for comparison
    const { data: previousData } = await supabase
      .from('rent_price_history')
      .select('*')
      .eq('year', currentYear - 1);
    
    const previousByArea = new Map(
      previousData?.map((d: { area_name: string }) => [d.area_name, d]) || []
    );
    
    const changedAreas: { area: string; oldAvg: number; newAvg: number; deltaPercent: number }[] = [];
    
    for (const price of newPrices) {
      // Validate data
      if (!TURIN_AREAS.includes(price.area)) {
        console.warn(`Unknown area: ${price.area}, skipping`);
        continue;
      }
      
      if (price.minRent < 100 || price.maxRent > 2000) {
        console.warn(`Invalid rent values for ${price.area}: ${price.minRent}-${price.maxRent}, skipping`);
        continue;
      }
      
      const newAvg = Math.round((price.minRent + price.maxRent) / 2);
      const previous = previousByArea.get(price.area) as { avg_rent: number } | undefined;
      
      if (previous) {
        const oldAvg = previous.avg_rent;
        const deltaPercent = ((newAvg - oldAvg) / oldAvg) * 100;
        
        // Track significant changes (>5%)
        if (Math.abs(deltaPercent) > 5) {
          changedAreas.push({ area: price.area, oldAvg, newAvg, deltaPercent });
        }
      }
      
      // Upsert new data
      const { error: upsertError } = await supabase
        .from('rent_price_history')
        .upsert({
          area_name: price.area,
          year: currentYear,
          min_rent: price.minRent,
          max_rent: price.maxRent,
          source: price.source,
          fetched_at: new Date().toISOString()
        }, { onConflict: 'area_name,year' });
      
      if (upsertError) {
        console.error(`Error upserting ${price.area}:`, upsertError);
      }
    }
    
    console.log(`Updated prices for ${newPrices.length} areas`);
    
    // Send push notifications for significant changes
    await sendPushNotifications(supabase, changedAreas);
    
    return new Response(JSON.stringify({
      success: true,
      year: currentYear,
      areasUpdated: newPrices.length,
      significantChanges: changedAreas.length,
      changes: changedAreas
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Error updating rent prices:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});