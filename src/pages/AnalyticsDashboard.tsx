import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollDepthChart } from "@/components/analytics/ScrollDepthChart";
import { AbandonmentHeatmap } from "@/components/analytics/AbandonmentHeatmap";
import { ConversionByScrollChart } from "@/components/analytics/ConversionByScrollChart";
import { EngagementComparisonChart } from "@/components/analytics/EngagementComparisonChart";
import { TopPagesTable } from "@/components/analytics/TopPagesTable";
import { RecentEventsTable } from "@/components/analytics/RecentEventsTable";
import { Navigation, Footer } from "@/components/layout";
import { BarChart3, Users, MousePointer, ScrollText } from "lucide-react";
import { LoadingSpinner } from "@/components/LoadingSpinner";

interface AnalyticsStats {
  totalPageViews: number;
  totalClicks: number;
  totalFormSubmissions: number;
  uniqueSessions: number;
  avgScrollDepth: number;
}

export default function AnalyticsDashboard() {
  const { t } = useTranslation();
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');

  useEffect(() => {
    loadStats();
  }, [timeRange]);

  const loadStats = async () => {
    setLoading(true);
    try {
      const daysAgo = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - daysAgo);

      // Get total page views
      const { count: pageViews } = await supabase
        .from('analytics_events')
        .select('*', { count: 'exact', head: true })
        .eq('event_type', 'page_view')
        .gte('created_at', startDate.toISOString());

      // Get total clicks
      const { count: clicks } = await supabase
        .from('analytics_events')
        .select('*', { count: 'exact', head: true })
        .eq('event_type', 'click')
        .gte('created_at', startDate.toISOString());

      // Get total form submissions
      const { count: formSubmissions } = await supabase
        .from('analytics_events')
        .select('*', { count: 'exact', head: true })
        .eq('event_type', 'form_submit')
        .gte('created_at', startDate.toISOString());

      // Get unique sessions
      const { data: sessionsData } = await supabase
        .from('analytics_events')
        .select('session_id')
        .gte('created_at', startDate.toISOString());
      
      const uniqueSessions = new Set(sessionsData?.map(s => s.session_id)).size;

      // Get average scroll depth
      const { data: scrollData } = await supabase
        .from('analytics_events')
        .select('metadata')
        .eq('event_type', 'scroll_depth')
        .gte('created_at', startDate.toISOString());

      const scrollDepths = scrollData
        ?.map(d => {
          const metadata = d.metadata as { depth?: string } | null;
          return metadata?.depth ? parseInt(metadata.depth) : 0;
        })
        .filter(d => !isNaN(d) && d > 0) || [];
      
      const avgScrollDepth = scrollDepths.length > 0
        ? Math.round(scrollDepths.reduce((a, b) => a + b, 0) / scrollDepths.length)
        : 0;

      setStats({
        totalPageViews: pageViews || 0,
        totalClicks: clicks || 0,
        totalFormSubmissions: formSubmissions || 0,
        uniqueSessions,
        avgScrollDepth,
      });
    } catch (error) {
      console.error('Error loading analytics stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Analisi completa del comportamento utenti</p>
        </div>

        {/* Time Range Selector */}
        <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as typeof timeRange)} className="mb-8">
          <TabsList>
            <TabsTrigger value="7d">Ultimi 7 giorni</TabsTrigger>
            <TabsTrigger value="30d">Ultimi 30 giorni</TabsTrigger>
            <TabsTrigger value="90d">Ultimi 90 giorni</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Visualizzazioni</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalPageViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Page views totali</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sessioni Uniche</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.uniqueSessions.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Visitatori unici</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Click</CardTitle>
              <MousePointer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalClicks.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Click su CTA</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversioni</CardTitle>
              <ScrollText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalFormSubmissions.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Form inviati</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scroll Depth</CardTitle>
              <ScrollText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.avgScrollDepth}%</div>
              <p className="text-xs text-muted-foreground">Media scroll</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Scroll Depth per Pagina</CardTitle>
              <CardDescription>Profondità media di scroll per ogni pagina</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollDepthChart timeRange={timeRange} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Heatmap Abbandoni</CardTitle>
              <CardDescription>Punti di abbandono per percentuale di scroll</CardDescription>
            </CardHeader>
            <CardContent>
              <AbandonmentHeatmap timeRange={timeRange} />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Conversione per Scroll Depth</CardTitle>
              <CardDescription>Tasso di conversione basato su scroll depth</CardDescription>
            </CardHeader>
            <CardContent>
              <ConversionByScrollChart timeRange={timeRange} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Engagement per Sezione</CardTitle>
              <CardDescription>Confronto engagement tra diverse sezioni</CardDescription>
            </CardHeader>
            <CardContent>
              <EngagementComparisonChart timeRange={timeRange} />
            </CardContent>
          </Card>
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Pagine Più Visitate</CardTitle>
              <CardDescription>Top 10 pagine per visualizzazioni</CardDescription>
            </CardHeader>
            <CardContent>
              <TopPagesTable timeRange={timeRange} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Eventi Recenti</CardTitle>
              <CardDescription>Ultimi 20 eventi registrati</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentEventsTable timeRange={timeRange} />
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
