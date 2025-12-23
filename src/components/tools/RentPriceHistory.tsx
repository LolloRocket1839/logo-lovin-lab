import { useState, useEffect, useMemo, memo } from "react";
import { useTranslation } from "react-i18next";
import { 
  TrendingUp, 
  TrendingDown, 
  Bell, 
  BellOff,
  RefreshCw,
  Info,
  ExternalLink
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { 
  requestPushPermission, 
  subscribeToPush, 
  unsubscribeFromPush,
  isPushSupported,
  isSubscribed as checkIsSubscribed
} from "@/lib/pushNotifications";

interface RentPriceData {
  area_name: string;
  year: number;
  min_rent: number;
  max_rent: number;
  avg_rent: number;
  source: string;
}

interface RentPriceHistoryProps {
  selectedArea?: string;
  onAreaChange?: (area: string) => void;
}

const AREAS = [
  'San Salvario', 'Crocetta', 'Centro', 'Aurora', 
  'Vanchiglia', 'Santa Rita', 'Cenisia', 'Lingotto'
];

const RentPriceHistoryComponent = ({ selectedArea, onAreaChange }: RentPriceHistoryProps) => {
  const { i18n } = useTranslation();
  const currentLang = (i18n.language?.startsWith('it') ? 'it' : 'en') as 'it' | 'en';
  
  const [data, setData] = useState<RentPriceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [area, setArea] = useState(selectedArea || 'San Salvario');
  const [pushEnabled, setPushEnabled] = useState(false);
  const [pushLoading, setPushLoading] = useState(false);

  // Fetch historical data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data: priceData, error } = await supabase
        .from('rent_price_history')
        .select('*')
        .order('year', { ascending: true });
      
      if (error) {
        console.error('Error fetching rent history:', error);
        toast.error(currentLang === 'it' ? 'Errore caricamento dati' : 'Error loading data');
      } else {
        setData(priceData || []);
      }
      setLoading(false);
    };
    
    fetchData();
  }, [currentLang]);

  // Check push subscription status
  useEffect(() => {
    const checkPush = async () => {
      if (isPushSupported()) {
        const subscribed = await checkIsSubscribed();
        setPushEnabled(subscribed);
      }
    };
    checkPush();
  }, []);

  // Handle area change
  const handleAreaChange = (newArea: string) => {
    setArea(newArea);
    onAreaChange?.(newArea);
  };

  // Chart data for selected area
  const chartData = useMemo(() => {
    return data
      .filter(d => d.area_name === area)
      .map(d => ({
        year: d.year.toString(),
        min: d.min_rent,
        max: d.max_rent,
        avg: d.avg_rent
      }));
  }, [data, area]);

  // Latest year data for comparison table
  const latestYear = useMemo(() => {
    const years = [...new Set(data.map(d => d.year))];
    return Math.max(...years);
  }, [data]);

  const previousYear = latestYear - 1;

  // Comparison data
  const comparisonData = useMemo(() => {
    return AREAS.map(areaName => {
      const latest = data.find(d => d.area_name === areaName && d.year === latestYear);
      const previous = data.find(d => d.area_name === areaName && d.year === previousYear);
      
      const deltaPercent = latest && previous 
        ? ((latest.avg_rent - previous.avg_rent) / previous.avg_rent) * 100 
        : 0;
      
      return {
        area: areaName,
        latestAvg: latest?.avg_rent || 0,
        previousAvg: previous?.avg_rent || 0,
        deltaPercent: deltaPercent
      };
    }).sort((a, b) => a.latestAvg - b.latestAvg);
  }, [data, latestYear, previousYear]);

  // Selected area stats
  const areaStats = useMemo(() => {
    const areaData = comparisonData.find(d => d.area === area);
    if (!areaData) return null;

    const allYears = data.filter(d => d.area_name === area);
    const avgGrowth = allYears.length > 1 
      ? ((allYears[allYears.length - 1].avg_rent - allYears[0].avg_rent) / allYears[0].avg_rent / (allYears.length - 1)) * 100
      : 0;

    return {
      ...areaData,
      avgYearlyGrowth: avgGrowth
    };
  }, [data, area, comparisonData]);

  // Cheapest area
  const cheapestArea = useMemo(() => {
    return comparisonData[0];
  }, [comparisonData]);

  // Toggle push notifications
  const togglePushNotifications = async () => {
    setPushLoading(true);
    
    try {
      if (pushEnabled) {
        await unsubscribeFromPush();
        setPushEnabled(false);
        toast.success(currentLang === 'it' ? 'Notifiche disattivate' : 'Notifications disabled');
      } else {
        const permission = await requestPushPermission();
        if (permission) {
          await subscribeToPush([area]);
          setPushEnabled(true);
          toast.success(currentLang === 'it' 
            ? 'Riceverai notifiche quando i prezzi cambiano' 
            : 'You will receive notifications when prices change'
          );
        } else {
          toast.error(currentLang === 'it' 
            ? 'Permesso notifiche negato' 
            : 'Notification permission denied'
          );
        }
      }
    } catch (error) {
      console.error('Push notification error:', error);
      toast.error(currentLang === 'it' ? 'Errore gestione notifiche' : 'Notification error');
    }
    
    setPushLoading(false);
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-muted-foreground" />
          <p className="mt-2 text-muted-foreground">
            {currentLang === 'it' ? 'Caricamento dati...' : 'Loading data...'}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="w-5 h-5 text-primary" />
            {currentLang === 'it' ? 'Storico Prezzi Affitti' : 'Rent Price History'}
          </CardTitle>
          
          <div className="flex items-center gap-2">
            <Select value={area} onValueChange={handleAreaChange}>
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {AREAS.map(a => (
                  <SelectItem key={a} value={a}>{a}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {isPushSupported() && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={pushEnabled ? "default" : "outline"}
                    size="icon"
                    onClick={togglePushNotifications}
                    disabled={pushLoading}
                  >
                    {pushLoading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : pushEnabled ? (
                      <Bell className="w-4 h-4" />
                    ) : (
                      <BellOff className="w-4 h-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {currentLang === 'it' 
                    ? (pushEnabled ? 'Disattiva notifiche' : 'Attiva notifiche prezzi')
                    : (pushEnabled ? 'Disable notifications' : 'Enable price alerts')
                  }
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Chart */}
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis 
                tickFormatter={(v) => `€${v}`} 
                tick={{ fontSize: 12 }}
                domain={['auto', 'auto']}
              />
              <RechartsTooltip 
                formatter={(value: number, name: string) => [
                  `€${value}`,
                  name === 'avg' ? (currentLang === 'it' ? 'Media' : 'Average') :
                  name === 'min' ? 'Min' : 'Max'
                ]}
              />
              <Legend 
                formatter={(value) => 
                  value === 'avg' ? (currentLang === 'it' ? 'Media' : 'Average') :
                  value === 'min' ? 'Min' : 'Max'
                }
              />
              <Line 
                type="monotone" 
                dataKey="avg" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))", r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="min" 
                stroke="hsl(var(--chart-2))" 
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="max" 
                stroke="hsl(var(--chart-3))" 
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Stats cards */}
        {areaStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">
                {currentLang === 'it' ? `Variazione ${previousYear}→${latestYear}` : `Change ${previousYear}→${latestYear}`}
              </p>
              <div className="flex items-center justify-center gap-1">
                {areaStats.deltaPercent > 0 ? (
                  <TrendingUp className="w-4 h-4 text-destructive" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-green-500" />
                )}
                <span className={`font-semibold ${areaStats.deltaPercent > 0 ? 'text-destructive' : 'text-green-500'}`}>
                  {areaStats.deltaPercent > 0 ? '+' : ''}{areaStats.deltaPercent.toFixed(1)}%
                </span>
              </div>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">
                {currentLang === 'it' ? 'Media ultimi 5 anni' : 'Avg. yearly growth'}
              </p>
              <p className="font-semibold">+{areaStats.avgYearlyGrowth.toFixed(1)}%{currentLang === 'it' ? '/anno' : '/year'}</p>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">
                {currentLang === 'it' ? 'Prezzo medio' : 'Average price'}
              </p>
              <p className="font-semibold">€{areaStats.latestAvg}{currentLang === 'it' ? '/mese' : '/mo'}</p>
            </div>
            
            <div className="bg-primary/10 rounded-lg p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">
                {currentLang === 'it' ? 'Più economico' : 'Cheapest'}
              </p>
              <p className="font-semibold text-primary">{cheapestArea?.area}</p>
              <p className="text-xs text-muted-foreground">€{cheapestArea?.latestAvg}</p>
            </div>
          </div>
        )}

        {/* Comparison table */}
        <div>
          <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
            {currentLang === 'it' ? 'Confronta quartieri' : 'Compare neighborhoods'}
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-3.5 h-3.5 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                {currentLang === 'it' 
                  ? 'Prezzi medi stanza singola per studenti. Dati aggiornati annualmente.'
                  : 'Average single room prices for students. Data updated annually.'
                }
              </TooltipContent>
            </Tooltip>
          </h4>
          
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{currentLang === 'it' ? 'Quartiere' : 'Neighborhood'}</TableHead>
                  <TableHead className="text-right">{latestYear}</TableHead>
                  <TableHead className="text-right">{previousYear}</TableHead>
                  <TableHead className="text-right">Δ%</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonData.map((row) => (
                  <TableRow 
                    key={row.area}
                    className={row.area === area ? 'bg-primary/5' : ''}
                    onClick={() => handleAreaChange(row.area)}
                    style={{ cursor: 'pointer' }}
                  >
                    <TableCell className="font-medium">{row.area}</TableCell>
                    <TableCell className="text-right">€{row.latestAvg}</TableCell>
                    <TableCell className="text-right text-muted-foreground">€{row.previousAvg}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={row.deltaPercent > 5 ? "destructive" : row.deltaPercent < -5 ? "default" : "secondary"}>
                        {row.deltaPercent > 0 ? '+' : ''}{row.deltaPercent.toFixed(1)}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Source info */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
          <span className="flex items-center gap-1">
            <Info className="w-3 h-3" />
            {currentLang === 'it' 
              ? 'Fonte: Perplexity AI + Immobiliare.it, Idealista'
              : 'Source: Perplexity AI + Immobiliare.it, Idealista'
            }
          </span>
          <span>
            {currentLang === 'it' ? 'Ultimo aggiornamento:' : 'Last update:'} {currentLang === 'it' ? 'Gennaio' : 'January'} {latestYear}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export const RentPriceHistory = memo(RentPriceHistoryComponent);
