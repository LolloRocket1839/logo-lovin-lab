import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/LoadingSpinner";

interface EventData {
  type: string;
  page: string;
  timestamp: string;
}

interface Props {
  timeRange: '7d' | '30d' | '90d';
}

export const RecentEventsTable = ({ timeRange }: Props) => {
  const [data, setData] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [timeRange]);

  const loadData = async () => {
    setLoading(true);
    try {
      const { data: events } = await supabase
        .from('analytics_events')
        .select('event_type, page_url, created_at')
        .order('created_at', { ascending: false })
        .limit(20);

      if (!events) return;

      const tableData: EventData[] = events.map(event => ({
        type: event.event_type,
        page: new URL(event.page_url).pathname || '/',
        timestamp: new Date(event.created_at).toLocaleString('it-IT', {
          day: '2-digit',
          month: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }),
      }));

      setData(tableData);
    } catch (error) {
      console.error('Error loading recent events:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEventBadgeVariant = (type: string) => {
    if (type === 'form_submit') return 'default';
    if (type === 'click') return 'secondary';
    if (type === 'page_view') return 'outline';
    return 'outline';
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
          <TableHead>Tipo Evento</TableHead>
          <TableHead>Pagina</TableHead>
          <TableHead className="text-right">Data</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            <TableCell>
              <Badge variant={getEventBadgeVariant(row.type)}>
                {row.type.replace(/_/g, ' ')}
              </Badge>
            </TableCell>
            <TableCell className="font-mono text-sm">{row.page}</TableCell>
            <TableCell className="text-right text-xs text-muted-foreground">{row.timestamp}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
