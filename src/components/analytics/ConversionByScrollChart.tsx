import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { LoadingSpinner } from "@/components/LoadingSpinner";

interface ConversionData {
  depth: string;
  conversionRate: number;
  conversions: number;
  sessions: number;
}

interface Props {
  timeRange: '7d' | '30d' | '90d';
}

export const ConversionByScrollChart = ({ timeRange }: Props) => {
  const [data, setData] = useState<ConversionData[]>([]);
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

      // Get scroll depth by session
      const { data: scrollEvents } = await supabase
        .from('analytics_events')
        .select('session_id, metadata')
        .eq('event_type', 'scroll_depth')
        .gte('created_at', startDate.toISOString());

      // Get conversions by session
      const { data: conversionEvents } = await supabase
        .from('analytics_events')
        .select('session_id')
        .eq('event_type', 'form_submit')
        .gte('created_at', startDate.toISOString());

      if (!scrollEvents || !conversionEvents) return;

      const convertedSessions = new Set(conversionEvents.map(e => e.session_id));

      // Group sessions by max scroll depth
      const depthGroups: Record<string, { sessions: Set<string>, conversions: number }> = {
        '0-25%': { sessions: new Set(), conversions: 0 },
        '25-50%': { sessions: new Set(), conversions: 0 },
        '50-75%': { sessions: new Set(), conversions: 0 },
        '75-100%': { sessions: new Set(), conversions: 0 },
      };

      // Track max depth per session
      const sessionMaxDepth = new Map<string, number>();
      scrollEvents.forEach(event => {
        const metadata = event.metadata as { depth?: string } | null;
        const depth = parseInt(metadata?.depth || '0');
        const current = sessionMaxDepth.get(event.session_id) || 0;
        if (depth > current) {
          sessionMaxDepth.set(event.session_id, depth);
        }
      });

      // Categorize sessions
      sessionMaxDepth.forEach((depth, sessionId) => {
        let group: string;
        if (depth < 25) group = '0-25%';
        else if (depth < 50) group = '25-50%';
        else if (depth < 75) group = '50-75%';
        else group = '75-100%';

        depthGroups[group].sessions.add(sessionId);
        if (convertedSessions.has(sessionId)) {
          depthGroups[group].conversions++;
        }
      });

      const chartData: ConversionData[] = Object.entries(depthGroups).map(([depth, { sessions, conversions }]) => ({
        depth,
        conversionRate: sessions.size > 0 ? Math.round((conversions / sessions.size) * 100) : 0,
        conversions,
        sessions: sessions.size,
      }));

      setData(chartData);
    } catch (error) {
      console.error('Error loading conversion data:', error);
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
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
        <XAxis 
          dataKey="depth" 
          tick={{ fill: 'hsl(var(--muted-foreground))' }}
        />
        <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px'
          }}
          formatter={(value: number, name: string) => [
            name === 'conversionRate' ? `${value}%` : value,
            name === 'conversionRate' ? 'Tasso Conversione' : name === 'conversions' ? 'Conversioni' : 'Sessioni'
          ]}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="conversionRate" 
          stroke="hsl(var(--primary))" 
          strokeWidth={2}
          dot={{ fill: 'hsl(var(--primary))' }}
          name="Tasso Conversione %"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
