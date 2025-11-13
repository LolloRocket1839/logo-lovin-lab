import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.79.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface WeeklyStats {
  pageViews: number;
  uniqueSessions: number;
  clicks: number;
  formSubmissions: number;
  avgScrollDepth: number;
  topPages: Array<{ page: string; views: number; uniqueVisitors: number; avgScroll: number }>;
  conversionRates: {
    students: { waitlist: number; search: number; combined: number };
    investors: number;
    sellers: number;
  };
  clickBreakdown: { [key: string]: number };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting weekly analytics report generation...");

    // Authenticate request
    const authHeader = req.headers.get('Authorization');
    const expectedSecret = Deno.env.get('WEEKLY_REPORT_SECRET');
    
    if (!authHeader || authHeader !== `Bearer ${expectedSecret}`) {
      console.error("Authentication failed");
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Calculate date ranges
    const today = new Date();
    const lastWeekStart = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const previousWeekStart = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000);

    console.log("Date ranges:", {
      lastWeekStart: lastWeekStart.toISOString(),
      previousWeekStart: previousWeekStart.toISOString()
    });

    // Fetch data for both weeks
    const lastWeekStats = await calculateWeekStats(supabase, lastWeekStart, today);
    const previousWeekStats = await calculateWeekStats(supabase, previousWeekStart, lastWeekStart);

    console.log("Stats calculated:", { lastWeekStats, previousWeekStats });

    // Calculate changes
    const changes = {
      pageViews: calculatePercentChange(lastWeekStats.pageViews, previousWeekStats.pageViews),
      uniqueSessions: calculatePercentChange(lastWeekStats.uniqueSessions, previousWeekStats.uniqueSessions),
      clicks: calculatePercentChange(lastWeekStats.clicks, previousWeekStats.clicks),
      formSubmissions: calculatePercentChange(lastWeekStats.formSubmissions, previousWeekStats.formSubmissions),
      avgScrollDepth: calculatePercentChange(lastWeekStats.avgScrollDepth, previousWeekStats.avgScrollDepth),
    };

    // Generate email HTML
    const emailHTML = generateAnalyticsEmailHTML(lastWeekStats, previousWeekStats, changes, lastWeekStart, today);

    // Send email via Formspree
    const formspreeResponse = await fetch("https://formspree.io/f/xeojbzow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: `📊 Analytics Weekly Report - ${formatDate(lastWeekStart)} - ${formatDate(today)}`,
        message: emailHTML,
        _replyto: "noreply@junglerent.com",
      }),
    });

    if (!formspreeResponse.ok) {
      const errorText = await formspreeResponse.text();
      console.error("Formspree error:", errorText);
      throw new Error(`Formspree failed: ${formspreeResponse.status}`);
    }

    console.log("Email sent successfully!");

    return new Response(
      JSON.stringify({ success: true, message: "Weekly analytics report sent" }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Error in weekly-analytics-report function:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function calculateWeekStats(
  supabase: any,
  startDate: Date,
  endDate: Date
): Promise<WeeklyStats> {
  const start = startDate.toISOString();
  const end = endDate.toISOString();

  // Fetch all events for the period
  const { data: events, error: eventsError } = await supabase
    .from('analytics_events')
    .select('*')
    .gte('created_at', start)
    .lte('created_at', end);

  if (eventsError) {
    console.error("Error fetching events:", eventsError);
    throw eventsError;
  }

  console.log(`Fetched ${events?.length || 0} events for period ${start} to ${end}`);

  // Calculate basic metrics
  const pageViewEvents = events?.filter((e: any) => e.event_type === 'page_view') || [];
  const clickEvents = events?.filter((e: any) => e.event_type === 'click') || [];
  const formSubmitEvents = events?.filter((e: any) => e.event_type === 'form_submit') || [];
  const scrollDepthEvents = events?.filter((e: any) => e.event_type === 'scroll_depth') || [];

  const pageViews = pageViewEvents.length;
  const uniqueSessions = new Set(events?.map((e: any) => e.session_id) || []).size;
  const clicks = clickEvents.length;
  const formSubmissions = formSubmitEvents.length;

  // Calculate average scroll depth
  const scrollDepths = scrollDepthEvents
    .map((e: any) => e.metadata?.depth)
    .filter((d: any) => typeof d === 'number');
  const avgScrollDepth = scrollDepths.length > 0
    ? scrollDepths.reduce((a: number, b: number) => a + b, 0) / scrollDepths.length
    : 0;

  // Calculate top pages
  const pageViewsByUrl: { [key: string]: { views: number; sessions: Set<string>; scrolls: number[] } } = {};
  
  pageViewEvents.forEach((e: any) => {
    const url = e.page_url || 'Unknown';
    if (!pageViewsByUrl[url]) {
      pageViewsByUrl[url] = { views: 0, sessions: new Set(), scrolls: [] };
    }
    pageViewsByUrl[url].views++;
    pageViewsByUrl[url].sessions.add(e.session_id);
  });

  scrollDepthEvents.forEach((e: any) => {
    const url = e.page_url || 'Unknown';
    if (pageViewsByUrl[url] && typeof e.metadata?.depth === 'number') {
      pageViewsByUrl[url].scrolls.push(e.metadata.depth);
    }
  });

  const topPages = Object.entries(pageViewsByUrl)
    .map(([page, data]) => ({
      page: page.replace('http://localhost:8080', '').replace('https://junglerent.com', '') || '/',
      views: data.views,
      uniqueVisitors: data.sessions.size,
      avgScroll: data.scrolls.length > 0
        ? data.scrolls.reduce((a, b) => a + b, 0) / data.scrolls.length
        : 0
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  // Calculate conversion rates
  const studentWaitlistSubmissions = formSubmitEvents.filter((e: any) => 
    e.metadata?.form === 'student_waitlist'
  ).length;
  const studentSearchSubmissions = formSubmitEvents.filter((e: any) => 
    e.metadata?.form === 'student_search'
  ).length;
  const investorSubmissions = formSubmitEvents.filter((e: any) => 
    e.metadata?.form === 'investor_waitlist'
  ).length;
  const sellerSubmissions = formSubmitEvents.filter((e: any) => 
    e.metadata?.form === 'seller_contact'
  ).length;

  const studentPageViews = pageViewEvents.filter((e: any) => 
    e.page_url?.includes('studenti') || e.page_url === '/' || e.page_url?.includes('localhost:8080/')
  ).length;
  const investorPageViews = pageViewEvents.filter((e: any) => 
    e.page_url?.includes('investor')
  ).length;
  const sellerPageViews = pageViewEvents.filter((e: any) => 
    e.page_url?.includes('seller') || e.page_url?.includes('proprietari')
  ).length;

  const conversionRates = {
    students: {
      waitlist: studentPageViews > 0 ? (studentWaitlistSubmissions / studentPageViews) * 100 : 0,
      search: studentPageViews > 0 ? (studentSearchSubmissions / studentPageViews) * 100 : 0,
      combined: studentPageViews > 0 ? ((studentWaitlistSubmissions + studentSearchSubmissions) / studentPageViews) * 100 : 0,
    },
    investors: investorPageViews > 0 ? (investorSubmissions / investorPageViews) * 100 : 0,
    sellers: sellerPageViews > 0 ? (sellerSubmissions / sellerPageViews) * 100 : 0,
  };

  // Calculate click breakdown
  const clickBreakdown: { [key: string]: number } = {};
  clickEvents.forEach((e: any) => {
    const element = e.metadata?.element || 'unknown';
    let category = 'Other';
    
    if (element.startsWith('hero_')) category = 'Hero Section';
    else if (element.startsWith('nav_')) category = 'Navigation';
    else if (element.startsWith('sticky_cta_')) category = 'Sticky CTA';
    else if (element.startsWith('blog_')) category = 'Blog';
    else if (element.startsWith('footer_')) category = 'Footer';
    
    clickBreakdown[category] = (clickBreakdown[category] || 0) + 1;
  });

  return {
    pageViews,
    uniqueSessions,
    clicks,
    formSubmissions,
    avgScrollDepth: Math.round(avgScrollDepth),
    topPages,
    conversionRates,
    clickBreakdown,
  };
}

function calculatePercentChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function formatChange(change: number): string {
  const arrow = change >= 0 ? '↑' : '↓';
  const color = change >= 0 ? '#10b981' : '#ef4444';
  const sign = change > 0 ? '+' : '';
  return `<span style="color: ${color}; font-weight: bold;">${arrow} ${sign}${change}%</span>`;
}

function generateAnalyticsEmailHTML(
  lastWeek: WeeklyStats,
  previousWeek: WeeklyStats,
  changes: any,
  startDate: Date,
  endDate: Date
): string {
  const maxClickCategory = Object.entries(lastWeek.clickBreakdown)
    .sort(([, a], [, b]) => b - a)[0];
  const highlight = maxClickCategory 
    ? `Most engaging: ${maxClickCategory[0]} (${maxClickCategory[1]} clicks)`
    : 'Keep building engagement!';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
      background-color: #f3f4f6;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      padding: 40px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: bold;
    }
    .header p {
      margin: 10px 0 0 0;
      font-size: 16px;
      opacity: 0.9;
    }
    .content {
      padding: 30px 20px;
    }
    .summary-box {
      background-color: #f9fafb;
      border-left: 4px solid #10b981;
      padding: 20px;
      margin-bottom: 30px;
      border-radius: 8px;
    }
    .summary-box h3 {
      margin: 0 0 10px 0;
      color: #111827;
      font-size: 18px;
    }
    .summary-box p {
      margin: 5px 0;
      color: #6b7280;
      font-size: 14px;
    }
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
      margin-bottom: 30px;
    }
    .metric-card {
      background-color: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    .metric-card .label {
      font-size: 12px;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
    }
    .metric-card .value {
      font-size: 32px;
      font-weight: bold;
      color: #111827;
      margin-bottom: 8px;
    }
    .metric-card .change {
      font-size: 14px;
    }
    .section {
      margin-bottom: 30px;
    }
    .section h2 {
      color: #111827;
      font-size: 20px;
      margin: 0 0 15px 0;
      padding-bottom: 10px;
      border-bottom: 2px solid #10b981;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    th {
      background-color: #f9fafb;
      color: #374151;
      font-weight: 600;
      text-align: left;
      padding: 12px;
      font-size: 13px;
      border-bottom: 2px solid #e5e7eb;
    }
    td {
      padding: 12px;
      border-bottom: 1px solid #f3f4f6;
      color: #6b7280;
      font-size: 14px;
    }
    tr:nth-child(even) {
      background-color: #f9fafb;
    }
    .conversion-card {
      background-color: #f9fafb;
      border-radius: 8px;
      padding: 15px;
      margin-bottom: 15px;
    }
    .conversion-card h4 {
      margin: 0 0 10px 0;
      color: #111827;
      font-size: 16px;
    }
    .conversion-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      font-size: 14px;
    }
    .conversion-label {
      color: #6b7280;
    }
    .conversion-value {
      font-weight: bold;
      color: #111827;
    }
    .click-bar {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
    }
    .click-label {
      width: 140px;
      font-size: 14px;
      color: #6b7280;
    }
    .click-progress {
      flex: 1;
      height: 24px;
      background-color: #e5e7eb;
      border-radius: 4px;
      overflow: hidden;
      margin: 0 10px;
    }
    .click-fill {
      height: 100%;
      background: linear-gradient(90deg, #10b981, #059669);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 8px;
      color: white;
      font-size: 12px;
      font-weight: bold;
    }
    .footer {
      background-color: #f9fafb;
      padding: 30px 20px;
      text-align: center;
      border-top: 1px solid #e5e7eb;
    }
    .footer p {
      margin: 5px 0;
      color: #6b7280;
      font-size: 14px;
    }
    .footer a {
      color: #10b981;
      text-decoration: none;
      font-weight: 600;
    }
    @media only screen and (max-width: 600px) {
      .metrics-grid {
        grid-template-columns: 1fr;
      }
      .metric-card .value {
        font-size: 28px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📊 Analytics Weekly Report</h1>
      <p>Jungle Rent Performance Analysis</p>
    </div>
    
    <div class="content">
      <div class="summary-box">
        <h3>📅 Periodo: ${formatDate(startDate)} - ${formatDate(endDate)}</h3>
        <p><strong>Total Events Tracked:</strong> ${lastWeek.pageViews + lastWeek.clicks + lastWeek.formSubmissions}</p>
        <p><strong>Highlight:</strong> ${highlight}</p>
      </div>

      <div class="section">
        <h2>📈 Overview Metriche Chiave</h2>
        <div class="metrics-grid">
          <div class="metric-card">
            <div class="label">📈 Page Views</div>
            <div class="value">${lastWeek.pageViews.toLocaleString()}</div>
            <div class="change">${formatChange(changes.pageViews)}</div>
          </div>
          
          <div class="metric-card">
            <div class="label">👥 Unique Sessions</div>
            <div class="value">${lastWeek.uniqueSessions.toLocaleString()}</div>
            <div class="change">${formatChange(changes.uniqueSessions)}</div>
          </div>
          
          <div class="metric-card">
            <div class="label">🖱️ Clicks</div>
            <div class="value">${lastWeek.clicks.toLocaleString()}</div>
            <div class="change">${formatChange(changes.clicks)}</div>
          </div>
          
          <div class="metric-card">
            <div class="label">📝 Form Submissions</div>
            <div class="value">${lastWeek.formSubmissions}</div>
            <div class="change">${formatChange(changes.formSubmissions)}</div>
          </div>
          
          <div class="metric-card">
            <div class="label">📊 Avg Scroll Depth</div>
            <div class="value">${lastWeek.avgScrollDepth}%</div>
            <div class="change">${formatChange(changes.avgScrollDepth)}</div>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>🏆 Top 5 Pages</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Page</th>
              <th>Views</th>
              <th>Visitors</th>
              <th>Avg Scroll</th>
            </tr>
          </thead>
          <tbody>
            ${lastWeek.topPages.map((page, index) => `
              <tr>
                <td>${index + 1}</td>
                <td>${page.page}</td>
                <td>${page.views}</td>
                <td>${page.uniqueVisitors}</td>
                <td>${Math.round(page.avgScroll)}%</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="section">
        <h2>🎯 Conversion Rates</h2>
        
        <div class="conversion-card">
          <h4>🎓 Students</h4>
          <div class="conversion-item">
            <span class="conversion-label">Student Waitlist:</span>
            <span class="conversion-value" style="color: ${lastWeek.conversionRates.students.waitlist >= 10 ? '#10b981' : lastWeek.conversionRates.students.waitlist >= 5 ? '#f59e0b' : '#6b7280'}">
              ${lastWeek.conversionRates.students.waitlist.toFixed(1)}%
            </span>
          </div>
          <div class="conversion-item">
            <span class="conversion-label">Student Search:</span>
            <span class="conversion-value" style="color: ${lastWeek.conversionRates.students.search >= 10 ? '#10b981' : lastWeek.conversionRates.students.search >= 5 ? '#f59e0b' : '#6b7280'}">
              ${lastWeek.conversionRates.students.search.toFixed(1)}%
            </span>
          </div>
          <div class="conversion-item">
            <span class="conversion-label">Combined:</span>
            <span class="conversion-value" style="color: ${lastWeek.conversionRates.students.combined >= 10 ? '#10b981' : lastWeek.conversionRates.students.combined >= 5 ? '#f59e0b' : '#6b7280'}">
              ${lastWeek.conversionRates.students.combined.toFixed(1)}%
            </span>
          </div>
        </div>

        <div class="conversion-card">
          <h4>💼 Investors</h4>
          <div class="conversion-item">
            <span class="conversion-label">Investor Waitlist:</span>
            <span class="conversion-value" style="color: ${lastWeek.conversionRates.investors >= 10 ? '#10b981' : lastWeek.conversionRates.investors >= 5 ? '#f59e0b' : '#6b7280'}">
              ${lastWeek.conversionRates.investors.toFixed(1)}%
            </span>
          </div>
        </div>

        <div class="conversion-card">
          <h4>🏢 Sellers</h4>
          <div class="conversion-item">
            <span class="conversion-label">Seller Contact:</span>
            <span class="conversion-value" style="color: ${lastWeek.conversionRates.sellers >= 10 ? '#10b981' : lastWeek.conversionRates.sellers >= 5 ? '#f59e0b' : '#6b7280'}">
              ${lastWeek.conversionRates.sellers.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>🖱️ Click Engagement</h2>
        ${Object.entries(lastWeek.clickBreakdown)
          .sort(([, a], [, b]) => b - a)
          .map(([category, count]) => {
            const maxClicks = Math.max(...Object.values(lastWeek.clickBreakdown));
            const percentage = (count / maxClicks) * 100;
            return `
              <div class="click-bar">
                <div class="click-label">${category}:</div>
                <div class="click-progress">
                  <div class="click-fill" style="width: ${percentage}%">
                    ${count}
                  </div>
                </div>
              </div>
            `;
          }).join('')}
      </div>

      <div class="section">
        <h2>📊 Week-over-Week Trends</h2>
        <table>
          <thead>
            <tr>
              <th>Metric</th>
              <th>This Week</th>
              <th>Last Week</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Page Views</td>
              <td>${lastWeek.pageViews.toLocaleString()}</td>
              <td>${previousWeek.pageViews.toLocaleString()}</td>
              <td>${formatChange(changes.pageViews)}</td>
            </tr>
            <tr>
              <td>Unique Sessions</td>
              <td>${lastWeek.uniqueSessions.toLocaleString()}</td>
              <td>${previousWeek.uniqueSessions.toLocaleString()}</td>
              <td>${formatChange(changes.uniqueSessions)}</td>
            </tr>
            <tr>
              <td>Avg Scroll Depth</td>
              <td>${lastWeek.avgScrollDepth}%</td>
              <td>${previousWeek.avgScrollDepth}%</td>
              <td>${formatChange(changes.avgScrollDepth)}</td>
            </tr>
            <tr>
              <td>Form Submissions</td>
              <td>${lastWeek.formSubmissions}</td>
              <td>${previousWeek.formSubmissions}</td>
              <td>${formatChange(changes.formSubmissions)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="footer">
      <p>🌿 <strong>Jungle Rent Analytics Dashboard</strong></p>
      <p>Report generato automaticamente ogni lunedì</p>
      <p><a href="https://junglerent.com/analytics-dashboard">Visualizza Dashboard Completa</a></p>
    </div>
  </div>
</body>
</html>
  `;
}
