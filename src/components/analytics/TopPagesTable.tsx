import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LoadingSpinner } from "@/components/LoadingSpinner";

interface PageData {
  page: string;
  views: number;
  uniqueVisitors: number;
}

interface Props {
  timeRange: '7d' | '30d' | '90d';
}

export const TopPagesTable = ({ timeRange }: Props) => {
  const [data, setData] = useState<PageData[]>([]);
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

      const { data: pageViews } = await supabase
        .from('analytics_events')
        .select('page_url, session_id')
        .eq('event_type', 'page_view')
        .gte('created_at', startDate.toISOString());

      if (!pageViews) return;

      const pageMap = new Map<string, Set<string>>();
      
      pageViews.forEach(({ page_url, session_id }) => {
        const path = new URL(page_url).pathname;
        if (!pageMap.has(path)) {
          pageMap.set(path, new Set());
        }
        pageMap.get(path)!.add(session_id);
      });

      const tableData: PageData[] = Array.from(pageMap.entries())
        .map(([page, sessions]) => ({
          page: page === '/' ? 'Home' : page,
          views: pageViews.filter(pv => new URL(pv.page_url).pathname === page).length,
          uniqueVisitors: sessions.size,
        }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 10);

      setData(tableData);
    } catch (error) {
      console.error('Error loading top pages:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="h-[200px] flex items-center justify-center"><LoadingSpinner /></div>;
  }

  if (data.length === 0) {
    return <div className="h-[200px] flex items-center justify-center text-muted-foreground">Nessun dato disponibile</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Pagina</TableHead>
          <TableHead className="text-right">Views</TableHead>
          <TableHead className="text-right">Visitatori Unici</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{row.page}</TableCell>
            <TableCell className="text-right">{row.views.toLocaleString()}</TableCell>
            <TableCell className="text-right">{row.uniqueVisitors.toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
