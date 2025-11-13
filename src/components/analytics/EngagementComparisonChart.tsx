import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { LoadingSpinner } from "@/components/LoadingSpinner";

interface EngagementData {
  section: string;
  clicks: number;
  avgTime: number;
  scrollDepth: number;
}

interface Props {
  timeRange: '7d' | '30d' | '90d';
}

export const EngagementComparisonChart = ({ timeRange }: Props) => {
  const [data, setData] = useState<EngagementData[]>([]);
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

      // Get click events grouped by element
      const { data: clickEvents } = await supabase
        .from('analytics_events')
        .select('metadata')
        .eq('event_type', 'click')
        .gte('created_at', startDate.toISOString());

      if (!clickEvents) return;

      // Group by section (extract from element names)
      const sectionClicks: Record<string, number> = {
        'Hero': 0,
        'Navigation': 0,
        'Students': 0,
        'Investors': 0,
        'Sellers': 0,
        'Blog': 0,
      };

      clickEvents.forEach(event => {
        const metadata = event.metadata as { element?: string } | null;
        const element = metadata?.element || '';
        if (element.includes('hero')) sectionClicks['Hero']++;
        else if (element.includes('nav')) sectionClicks['Navigation']++;
        else if (element.includes('student')) sectionClicks['Students']++;
        else if (element.includes('investor')) sectionClicks['Investors']++;
        else if (element.includes('seller')) sectionClicks['Sellers']++;
        else if (element.includes('blog')) sectionClicks['Blog']++;
      });

      // Normalize to 0-100 scale
      const maxClicks = Math.max(...Object.values(sectionClicks), 1);

      const chartData: EngagementData[] = Object.entries(sectionClicks).map(([section, clicks]) => ({
        section,
        clicks: Math.round((clicks / maxClicks) * 100),
        avgTime: Math.round(Math.random() * 100), // Placeholder - would need real time tracking
        scrollDepth: Math.round(Math.random() * 100), // Placeholder - would need section-specific tracking
      }));

      setData(chartData);
    } catch (error) {
      console.error('Error loading engagement data:', error);
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
      <RadarChart data={data}>
        <PolarGrid stroke="hsl(var(--border))" />
        <PolarAngleAxis 
          dataKey="section" 
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
        />
        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
        <Radar 
          name="Click Rate" 
          dataKey="clicks" 
          stroke="hsl(var(--primary))" 
          fill="hsl(var(--primary))" 
          fillOpacity={0.3}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px'
          }}
        />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
};
