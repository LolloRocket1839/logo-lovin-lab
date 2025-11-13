import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { LoadingSpinner } from "@/components/LoadingSpinner";

interface AbandonmentData {
  range: string;
  exits: number;
  color: string;
}

interface Props {
  timeRange: '7d' | '30d' | '90d';
}

export const AbandonmentHeatmap = ({ timeRange }: Props) => {
  const [data, setData] = useState<AbandonmentData[]>([]);
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

      const { data: exitEvents } = await supabase
        .from('analytics_events')
        .select('metadata')
        .in('event_type', ['page_exit_scroll', 'page_navigation_scroll'])
        .gte('created_at', startDate.toISOString());

      if (!exitEvents) return;

      // Categorize exits by scroll depth ranges
      const ranges = {
        '0-25%': 0,
        '25-50%': 0,
        '50-75%': 0,
        '75-100%': 0,
      };

      exitEvents.forEach(event => {
        const metadata = event.metadata as { max_scroll?: number } | null;
        const depth = metadata?.max_scroll || 0;
        if (depth < 25) ranges['0-25%']++;
        else if (depth < 50) ranges['25-50%']++;
        else if (depth < 75) ranges['50-75%']++;
        else ranges['75-100%']++;
      });

      const maxExits = Math.max(...Object.values(ranges));
      
      const chartData: AbandonmentData[] = Object.entries(ranges).map(([range, exits]) => {
        const intensity = maxExits > 0 ? exits / maxExits : 0;
        const hue = 0; // Red hue
        const saturation = 70;
        const lightness = 95 - (intensity * 45); // Darker = more exits
        
        return {
          range,
          exits,
          color: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
        };
      });

      setData(chartData);
    } catch (error) {
      console.error('Error loading abandonment data:', error);
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
          dataKey="range" 
          tick={{ fill: 'hsl(var(--muted-foreground))' }}
        />
        <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px'
          }}
          formatter={(value: number) => [value, 'Abbandoni']}
        />
        <Bar dataKey="exits" radius={[8, 8, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
