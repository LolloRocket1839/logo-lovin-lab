import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { LoadingSpinner } from "@/components/LoadingSpinner";

interface ScrollDepthData {
  page: string;
  avgDepth: number;
  sessions: number;
}

interface Props {
  timeRange: '7d' | '30d' | '90d';
}

export const ScrollDepthChart = ({ timeRange }: Props) => {
  const [data, setData] = useState<ScrollDepthData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [timeRange]);

  const loadData = async () => {
    setLoading(true);
    try {
      const daysAgo = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - daysAgo);

      const { data: scrollEvents } = await supabase
        .from('analytics_events')
        .select('metadata, page_url, session_id')
        .eq('event_type', 'page_navigation_scroll')
        .gte('created_at', startDate.toISOString());

      if (!scrollEvents) return;

      // Group by page
      const pageMap = new Map<string, { depths: number[], sessions: Set<string> }>();
      
      scrollEvents.forEach(event => {
        const page = new URL(event.page_url).pathname;
        const metadata = event.metadata as { max_scroll?: number } | null;
        const depth = metadata?.max_scroll || 0;
        
        if (!pageMap.has(page)) {
          pageMap.set(page, { depths: [], sessions: new Set() });
        }
        
        const pageData = pageMap.get(page)!;
        pageData.depths.push(depth);
        pageData.sessions.add(event.session_id);
      });

      // Calculate averages
      const chartData: ScrollDepthData[] = Array.from(pageMap.entries())
        .map(([page, { depths, sessions }]) => ({
          page: page === '/' ? 'Home' : page.replace(/^\//, '').replace(/-/g, ' '),
          avgDepth: Math.round(depths.reduce((a, b) => a + b, 0) / depths.length),
          sessions: sessions.size,
        }))
        .sort((a, b) => b.sessions - a.sessions)
        .slice(0, 8);

      setData(chartData);
    } catch (error) {
      console.error('Error loading scroll depth data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="h-[300px] flex items-center justify-center"><LoadingSpinner /></div>;
  }

  if (data.length === 0) {
    return <div className="h-[300px] flex items-center justify-center text-muted-foreground">Nessun dato disponibile</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
        <XAxis 
          dataKey="page" 
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px'
          }}
          formatter={(value: number, name: string) => [
            name === 'avgDepth' ? `${value}%` : value,
            name === 'avgDepth' ? 'Scroll Medio' : 'Sessioni'
          ]}
        />
        <Legend />
        <Bar dataKey="avgDepth" fill="hsl(var(--primary))" name="Scroll Medio %" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
