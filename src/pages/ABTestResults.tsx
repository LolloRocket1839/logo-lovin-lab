import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet";
import { TrendingUp, Users, MousePointer, CalendarIcon, AlertCircle, CheckCircle2 } from "lucide-react";
import { format, subDays, startOfDay, endOfDay } from "date-fns";
import { cn } from "@/lib/utils";
import type { DateRange } from "react-day-picker";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ABTestResult {
  cta_type: string;
  variation: string;
  impressions: number;
  clicks: number;
  ctr_percentage: number;
}

interface StatisticalSignificance {
  isSignificant: boolean;
  pValue: number;
  confidenceLevel: number;
  sampleSizeAdequate: boolean;
}

const ABTestResults = () => {
  const [results, setResults] = useState<ABTestResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  useEffect(() => {
    fetchResults();
  }, [dateRange]);

  const fetchResults = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('ab_test_events')
        .select('cta_type, variation, event_type');

      // Apply date range filter if set
      if (dateRange?.from) {
        query = query.gte('created_at', startOfDay(dateRange.from).toISOString());
      }
      if (dateRange?.to) {
        query = query.lte('created_at', endOfDay(dateRange.to).toISOString());
      }

      const { data, error } = await query;

      if (error) throw error;

      // Aggregate results by cta_type and variation
      const aggregated = (data || []).reduce((acc, event) => {
        const key = `${event.cta_type}_${event.variation}`;
        if (!acc[key]) {
          acc[key] = {
            cta_type: event.cta_type,
            variation: event.variation,
            impressions: 0,
            clicks: 0,
            ctr_percentage: 0,
          };
        }
        
        if (event.event_type === 'impression') {
          acc[key].impressions++;
        } else if (event.event_type === 'click') {
          acc[key].clicks++;
        }
        
        return acc;
      }, {} as Record<string, ABTestResult>);

      // Calculate CTR percentages
      const resultsArray = Object.values(aggregated).map((result) => ({
        ...result,
        ctr_percentage: result.impressions > 0 
          ? parseFloat(((result.clicks / result.impressions) * 100).toFixed(2))
          : 0,
      }));

      setResults(resultsArray);
    } catch (error) {
      console.error('Error fetching A/B test results:', error);
    } finally {
      setLoading(false);
    }
  };

  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.cta_type]) {
      acc[result.cta_type] = [];
    }
    acc[result.cta_type].push(result);
    return acc;
  }, {} as Record<string, ABTestResult[]>);

  const getWinner = (variations: ABTestResult[]) => {
    if (variations.length < 2) return null;
    return variations.reduce((prev, current) => 
      current.ctr_percentage > prev.ctr_percentage ? current : prev
    );
  };

  const calculateStatisticalSignificance = (
    variationA: ABTestResult,
    variationB: ABTestResult
  ): StatisticalSignificance => {
    const n1 = variationA.impressions;
    const n2 = variationB.impressions;
    const x1 = variationA.clicks;
    const x2 = variationB.clicks;

    // Check if sample sizes are adequate (at least 100 impressions per variation)
    const sampleSizeAdequate = n1 >= 100 && n2 >= 100;

    if (n1 === 0 || n2 === 0) {
      return {
        isSignificant: false,
        pValue: 1,
        confidenceLevel: 0,
        sampleSizeAdequate: false,
      };
    }

    // Calculate proportions
    const p1 = x1 / n1;
    const p2 = x2 / n2;

    // Pooled proportion
    const pPool = (x1 + x2) / (n1 + n2);

    // Standard error
    const se = Math.sqrt(pPool * (1 - pPool) * (1 / n1 + 1 / n2));

    if (se === 0) {
      return {
        isSignificant: false,
        pValue: 1,
        confidenceLevel: 0,
        sampleSizeAdequate,
      };
    }

    // Z-score
    const z = Math.abs((p1 - p2) / se);

    // Calculate p-value (two-tailed test)
    const pValue = 2 * (1 - normalCDF(z));

    // Significant if p-value < 0.05 (95% confidence)
    const isSignificant = pValue < 0.05 && sampleSizeAdequate;
    const confidenceLevel = (1 - pValue) * 100;

    return {
      isSignificant,
      pValue,
      confidenceLevel: Math.min(confidenceLevel, 99.9),
      sampleSizeAdequate,
    };
  };

  // Approximate normal CDF using error function approximation
  const normalCDF = (x: number): number => {
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989423 * Math.exp(-x * x / 2);
    const prob =
      d *
      t *
      (0.3193815 +
        t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return x > 0 ? 1 - prob : prob;
  };

  const formatCTAType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>A/B Test Results - Jungle Rent</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">A/B Test Results</h1>
                <p className="text-muted-foreground">
                  Compare CTA performance across different variations
                </p>
              </div>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full sm:w-[300px] justify-start text-left font-normal",
                      !dateRange && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                    disabled={(date) => date > new Date()}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading results...</p>
            </div>
          ) : results.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  No A/B test data available yet. Data will appear as users interact with CTAs.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedResults).map(([ctaType, variations]) => {
                const winner = getWinner(variations);
                const significance =
                  variations.length === 2
                    ? calculateStatisticalSignificance(variations[0], variations[1])
                    : null;
                
                return (
                  <Card key={ctaType}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {formatCTAType(ctaType)} CTA
                          </CardTitle>
                          <CardDescription>
                            Comparing variations A and B
                          </CardDescription>
                        </div>
                        
                        {significance && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div>
                                  {significance.isSignificant ? (
                                    <Badge variant="default" className="gap-1">
                                      <CheckCircle2 className="w-3 h-3" />
                                      Significant
                                    </Badge>
                                  ) : (
                                    <Badge variant="secondary" className="gap-1">
                                      <AlertCircle className="w-3 h-3" />
                                      {significance.sampleSizeAdequate
                                        ? "Not Significant"
                                        : "Need More Data"}
                                    </Badge>
                                  )}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent side="left" className="max-w-xs">
                                <div className="space-y-1 text-sm">
                                  <p className="font-semibold">Statistical Analysis</p>
                                  <p>
                                    Confidence: {significance.confidenceLevel.toFixed(1)}%
                                  </p>
                                  <p>P-value: {significance.pValue.toFixed(4)}</p>
                                  {!significance.sampleSizeAdequate && (
                                    <p className="text-muted-foreground">
                                      At least 100 impressions per variation needed for
                                      reliable results
                                    </p>
                                  )}
                                  {significance.isSignificant ? (
                                    <p className="text-muted-foreground">
                                      The difference is statistically significant (p &lt;
                                      0.05)
                                    </p>
                                  ) : significance.sampleSizeAdequate ? (
                                    <p className="text-muted-foreground">
                                      The difference may be due to random chance
                                    </p>
                                  ) : null}
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        {variations.map((result) => {
                          const isWinner = winner?.variation === result.variation;
                          
                          return (
                            <div
                              key={result.variation}
                              className={`p-6 rounded-lg border-2 ${
                                isWinner 
                                  ? 'border-primary bg-primary/5' 
                                  : 'border-border'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-semibold">
                                  Variation {result.variation}
                                </h3>
                                {isWinner && (
                                  <span className="px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full">
                                    Winner
                                  </span>
                                )}
                              </div>
                              
                              <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 rounded-lg bg-muted">
                                    <Users className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Impressions</p>
                                    <p className="text-2xl font-bold">{result.impressions}</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                  <div className="p-2 rounded-lg bg-muted">
                                    <MousePointer className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Clicks</p>
                                    <p className="text-2xl font-bold">{result.clicks}</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                  <div className="p-2 rounded-lg bg-muted">
                                    <TrendingUp className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">CTR</p>
                                    <p className="text-2xl font-bold">{result.ctr_percentage}%</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </main>
  );
};

export default ABTestResults;
