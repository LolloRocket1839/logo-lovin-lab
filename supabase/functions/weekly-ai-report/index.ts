import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WeekStats {
  totalTests: number;
  chatgptCitations: number;
  claudeCitations: number;
  perplexityCitations: number;
  chatgptRate: number;
  claudeRate: number;
  perplexityRate: number;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting weekly AI report generation...");
    
    // Verify secret for authentication
    const authHeader = req.headers.get("authorization");
    const expectedSecret = Deno.env.get("WEEKLY_REPORT_SECRET");
    
    if (!expectedSecret) {
      console.error("WEEKLY_REPORT_SECRET not configured");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Check authorization header (format: "Bearer SECRET")
    const providedSecret = authHeader?.replace("Bearer ", "");
    
    if (providedSecret !== expectedSecret) {
      console.error("Invalid or missing secret");
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    console.log("Authentication successful");
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Calculate date ranges
    const today = new Date();
    const lastWeekStart = new Date(today);
    lastWeekStart.setDate(today.getDate() - 7);
    const lastWeekEnd = today;
    
    const previousWeekStart = new Date(today);
    previousWeekStart.setDate(today.getDate() - 14);
    const previousWeekEnd = new Date(today);
    previousWeekEnd.setDate(today.getDate() - 7);

    console.log("Date ranges calculated:", {
      lastWeek: { start: lastWeekStart, end: lastWeekEnd },
      previousWeek: { start: previousWeekStart, end: previousWeekEnd }
    });

    // Query last week's data
    const { data: lastWeekData, error: lastWeekError } = await supabase
      .from('ai_test_results')
      .select('*')
      .gte('test_date', lastWeekStart.toISOString().split('T')[0])
      .lte('test_date', lastWeekEnd.toISOString().split('T')[0]);

    if (lastWeekError) {
      console.error("Error fetching last week data:", lastWeekError);
      throw lastWeekError;
    }

    // Query previous week's data
    const { data: previousWeekData, error: previousWeekError } = await supabase
      .from('ai_test_results')
      .select('*')
      .gte('test_date', previousWeekStart.toISOString().split('T')[0])
      .lt('test_date', previousWeekEnd.toISOString().split('T')[0]);

    if (previousWeekError) {
      console.error("Error fetching previous week data:", previousWeekError);
      throw previousWeekError;
    }

    console.log("Data fetched:", {
      lastWeekTests: lastWeekData?.length || 0,
      previousWeekTests: previousWeekData?.length || 0
    });

    // Calculate statistics
    const lastWeekStats = calculateStats(lastWeekData || []);
    const previousWeekStats = calculateStats(previousWeekData || []);

    // Calculate week-over-week changes
    const chatgptChange = lastWeekStats.chatgptRate - previousWeekStats.chatgptRate;
    const claudeChange = lastWeekStats.claudeRate - previousWeekStats.claudeRate;
    const perplexityChange = lastWeekStats.perplexityRate - previousWeekStats.perplexityRate;

    console.log("Statistics calculated:", {
      lastWeek: lastWeekStats,
      previousWeek: previousWeekStats,
      changes: { chatgptChange, claudeChange, perplexityChange }
    });

    // Generate HTML email
    const emailHTML = generateEmailHTML(
      lastWeekStats,
      previousWeekStats,
      { chatgptChange, claudeChange, perplexityChange },
      lastWeekStart,
      lastWeekEnd
    );

    // Send via Formspree
    const formspreeEndpoint = "https://formspree.io/f/xeojbzow";
    
    console.log("Sending email via Formspree...");
    
    const formspreeResponse = await fetch(formspreeEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: `📊 AI Testing Weekly Report - ${new Date().toLocaleDateString('it-IT')}`,
        message: emailHTML,
        _replyto: "noreply@junglerent.com",
      }),
    });

    if (!formspreeResponse.ok) {
      const errorText = await formspreeResponse.text();
      console.error("Formspree error:", errorText);
      throw new Error(`Formspree error: ${formspreeResponse.statusText}`);
    }

    console.log("Email sent successfully!");

    return new Response(
      JSON.stringify({ 
        success: true, 
        lastWeekStats,
        previousWeekStats,
        changes: { chatgptChange, claudeChange, perplexityChange }
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );

  } catch (error) {
    console.error("Error in weekly-ai-report:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});

function calculateStats(data: any[]): WeekStats {
  const totalTests = data.length;
  
  if (totalTests === 0) {
    return {
      totalTests: 0,
      chatgptCitations: 0,
      claudeCitations: 0,
      perplexityCitations: 0,
      chatgptRate: 0,
      claudeRate: 0,
      perplexityRate: 0,
    };
  }

  const chatgptCitations = data.filter(d => d.chatgpt_cited).length;
  const claudeCitations = data.filter(d => d.claude_cited).length;
  const perplexityCitations = data.filter(d => d.perplexity_cited).length;

  return {
    totalTests,
    chatgptCitations,
    claudeCitations,
    perplexityCitations,
    chatgptRate: (chatgptCitations / totalTests) * 100,
    claudeRate: (claudeCitations / totalTests) * 100,
    perplexityRate: (perplexityCitations / totalTests) * 100,
  };
}

function generateEmailHTML(
  lastWeek: WeekStats,
  previousWeek: WeekStats,
  changes: { chatgptChange: number; claudeChange: number; perplexityChange: number },
  startDate: Date,
  endDate: Date
): string {
  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : '';
    const color = change >= 0 ? '#10b981' : '#ef4444';
    return `<span style="color: ${color}; font-weight: bold;">${sign}${change.toFixed(1)}%</span>`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .header h1 { margin: 0; font-size: 24px; }
        .header p { margin: 10px 0 0 0; opacity: 0.9; font-size: 14px; }
        .content { background: #f9fafb; padding: 30px; }
        .stat-card { background: white; border-radius: 8px; padding: 20px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .stat-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #e5e7eb; }
        .stat-row:last-child { margin-bottom: 0; padding-bottom: 0; border-bottom: none; }
        .platform { font-weight: bold; font-size: 16px; }
        .platform-details { font-size: 12px; color: #6b7280; margin-top: 4px; }
        .rate { font-size: 24px; font-weight: bold; color: #10b981; }
        .change { font-size: 14px; margin-top: 4px; }
        .footer { background: #374151; color: #9ca3af; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
        .footer p { margin: 5px 0; }
        h2 { margin-top: 0; color: #1f2937; font-size: 18px; }
        .summary { background: #dbeafe; border-left: 4px solid #3b82f6; padding: 15px; margin-bottom: 20px; border-radius: 4px; font-size: 14px; }
        .summary strong { color: #1e40af; }
        table { width: 100%; border-collapse: collapse; }
        th { padding: 10px; text-align: left; background: #f3f4f6; font-weight: 600; font-size: 14px; }
        td { padding: 10px; font-size: 14px; }
        tr:nth-child(even) { background: #f9fafb; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📊 AI Testing Weekly Report</h1>
          <p>Jungle Rent Citation Analysis</p>
        </div>
        
        <div class="content">
          <div class="summary">
            <strong>📅 Periodo:</strong> ${formatDate(startDate)} - ${formatDate(endDate)}<br>
            <strong>🧪 Test eseguiti:</strong> ${lastWeek.totalTests} (settimana precedente: ${previousWeek.totalTests})
          </div>

          <div class="stat-card">
            <h2>Citation Rate per Piattaforma</h2>
            
            <div class="stat-row">
              <div>
                <div class="platform">💬 ChatGPT</div>
                <div class="platform-details">
                  ${lastWeek.chatgptCitations} citazioni su ${lastWeek.totalTests} test
                </div>
              </div>
              <div style="text-align: right;">
                <div class="rate">${lastWeek.chatgptRate.toFixed(1)}%</div>
                <div class="change">${formatChange(changes.chatgptChange)}</div>
              </div>
            </div>

            <div class="stat-row">
              <div>
                <div class="platform">🧠 Claude</div>
                <div class="platform-details">
                  ${lastWeek.claudeCitations} citazioni su ${lastWeek.totalTests} test
                </div>
              </div>
              <div style="text-align: right;">
                <div class="rate">${lastWeek.claudeRate.toFixed(1)}%</div>
                <div class="change">${formatChange(changes.claudeChange)}</div>
              </div>
            </div>

            <div class="stat-row">
              <div>
                <div class="platform">🔍 Perplexity</div>
                <div class="platform-details">
                  ${lastWeek.perplexityCitations} citazioni su ${lastWeek.totalTests} test
                </div>
              </div>
              <div style="text-align: right;">
                <div class="rate">${lastWeek.perplexityRate.toFixed(1)}%</div>
                <div class="change">${formatChange(changes.perplexityChange)}</div>
              </div>
            </div>
          </div>

          <div class="stat-card">
            <h2>Confronto Settimana Precedente</h2>
            <table>
              <thead>
                <tr>
                  <th>Piattaforma</th>
                  <th style="text-align: center;">Questa Settimana</th>
                  <th style="text-align: center;">Settimana Precedente</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ChatGPT</td>
                  <td style="text-align: center;">${lastWeek.chatgptRate.toFixed(1)}%</td>
                  <td style="text-align: center;">${previousWeek.chatgptRate.toFixed(1)}%</td>
                </tr>
                <tr>
                  <td>Claude</td>
                  <td style="text-align: center;">${lastWeek.claudeRate.toFixed(1)}%</td>
                  <td style="text-align: center;">${previousWeek.claudeRate.toFixed(1)}%</td>
                </tr>
                <tr>
                  <td>Perplexity</td>
                  <td style="text-align: center;">${lastWeek.perplexityRate.toFixed(1)}%</td>
                  <td style="text-align: center;">${previousWeek.perplexityRate.toFixed(1)}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="footer">
          <p>🌿 Jungle Rent - AI Testing Dashboard</p>
          <p>Questo è un report automatico generato dal sistema di testing AI.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
