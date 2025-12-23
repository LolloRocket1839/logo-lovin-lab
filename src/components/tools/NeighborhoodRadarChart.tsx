import { useMemo, useState, memo } from "react";
import { motion } from "framer-motion";
import { Radar, Target, Plus, X, MapPin } from "lucide-react";
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Radar as RechartsRadar,
  Legend,
  Tooltip
} from "recharts";

interface NeighborhoodData {
  name: string;
  rent: number;
  distancePolito: number; // in minutes
  distanceUnito: number;
  transport: number; // 1-10 score
  nightlife: number; // 1-10 score
  safety: number; // 1-10 score
  services: number; // 1-10 score
}

interface NeighborhoodRadarChartProps {
  selectedArea: string;
  housingType: "shared" | "single" | "studio";
  language: "it" | "en";
  onAreaChange?: (area: string) => void;
}

// Neighborhood data with scores
const neighborhoodScores: Record<string, Omit<NeighborhoodData, "name">> = {
  "San Salvario": {
    rent: 500,
    distancePolito: 15,
    distanceUnito: 10,
    transport: 9,
    nightlife: 9,
    safety: 7,
    services: 8
  },
  "Crocetta": {
    rent: 575,
    distancePolito: 20,
    distanceUnito: 15,
    transport: 8,
    nightlife: 4,
    safety: 9,
    services: 8
  },
  "Centro": {
    rent: 625,
    distancePolito: 25,
    distanceUnito: 5,
    transport: 10,
    nightlife: 7,
    safety: 8,
    services: 10
  },
  "Vanchiglia": {
    rent: 500,
    distancePolito: 10,
    distanceUnito: 15,
    transport: 7,
    nightlife: 8,
    safety: 7,
    services: 7
  },
  "Aurora": {
    rent: 400,
    distancePolito: 15,
    distanceUnito: 20,
    transport: 8,
    nightlife: 5,
    safety: 5,
    services: 6
  },
  "Lingotto": {
    rent: 450,
    distancePolito: 30,
    distanceUnito: 20,
    transport: 9,
    nightlife: 4,
    safety: 8,
    services: 7
  },
  "San Paolo": {
    rent: 450,
    distancePolito: 25,
    distanceUnito: 25,
    transport: 7,
    nightlife: 3,
    safety: 9,
    services: 7
  },
  "Politecnico": {
    rent: 550,
    distancePolito: 5,
    distanceUnito: 20,
    transport: 6,
    nightlife: 5,
    safety: 8,
    services: 6
  }
};

const housingMultipliers = {
  shared: 0.7,
  single: 1,
  studio: 1.4
};

const CHART_COLORS = [
  "hsl(var(--primary))",
  "hsl(142, 76%, 36%)", // emerald
  "hsl(38, 92%, 50%)", // amber
];

const NeighborhoodRadarChartComponent = ({
  selectedArea,
  housingType,
  language,
  onAreaChange
}: NeighborhoodRadarChartProps) => {
  const [comparisonAreas, setComparisonAreas] = useState<string[]>([]);
  
  const allAreas = Object.keys(neighborhoodScores);
  const availableAreas = allAreas.filter(
    area => area !== selectedArea && !comparisonAreas.includes(area)
  );

  const addComparisonArea = (area: string) => {
    if (comparisonAreas.length < 2 && !comparisonAreas.includes(area)) {
      setComparisonAreas([...comparisonAreas, area]);
    }
  };

  const removeComparisonArea = (area: string) => {
    setComparisonAreas(comparisonAreas.filter(a => a !== area));
  };

  // Convert data to radar chart format with normalized scores (0-100)
  const radarData = useMemo(() => {
    const areas = [selectedArea, ...comparisonAreas];
    const multiplier = housingMultipliers[housingType];
    
    // Get max values for normalization
    const maxRent = Math.max(...Object.values(neighborhoodScores).map(s => s.rent * housingMultipliers.studio));
    const maxDistance = 30; // max commute in minutes
    
    const metrics = [
      { 
        metric: language === "it" ? "Prezzo" : "Price", 
        fullMark: 100,
        ...Object.fromEntries(areas.map(area => {
          const score = neighborhoodScores[area];
          // Invert: lower rent = higher score
          const normalizedRent = Math.round((1 - (score.rent * multiplier) / maxRent) * 100);
          return [area, Math.max(10, normalizedRent)];
        }))
      },
      { 
        metric: language === "it" ? "Polito" : "Polito dist.", 
        fullMark: 100,
        ...Object.fromEntries(areas.map(area => {
          const score = neighborhoodScores[area];
          // Invert: shorter distance = higher score
          return [area, Math.round((1 - score.distancePolito / maxDistance) * 100)];
        }))
      },
      { 
        metric: language === "it" ? "UniTo" : "UniTo dist.", 
        fullMark: 100,
        ...Object.fromEntries(areas.map(area => {
          const score = neighborhoodScores[area];
          return [area, Math.round((1 - score.distanceUnito / maxDistance) * 100)];
        }))
      },
      { 
        metric: language === "it" ? "Trasporti" : "Transport", 
        fullMark: 100,
        ...Object.fromEntries(areas.map(area => {
          const score = neighborhoodScores[area];
          return [area, score.transport * 10];
        }))
      },
      { 
        metric: language === "it" ? "Vita notturna" : "Nightlife", 
        fullMark: 100,
        ...Object.fromEntries(areas.map(area => {
          const score = neighborhoodScores[area];
          return [area, score.nightlife * 10];
        }))
      },
      { 
        metric: language === "it" ? "Sicurezza" : "Safety", 
        fullMark: 100,
        ...Object.fromEntries(areas.map(area => {
          const score = neighborhoodScores[area];
          return [area, score.safety * 10];
        }))
      },
      { 
        metric: language === "it" ? "Servizi" : "Services", 
        fullMark: 100,
        ...Object.fromEntries(areas.map(area => {
          const score = neighborhoodScores[area];
          return [area, score.services * 10];
        }))
      }
    ];
    
    return metrics;
  }, [selectedArea, comparisonAreas, housingType, language]);

  // Generate comparison summary
  const comparisonSummary = useMemo(() => {
    if (comparisonAreas.length === 0) return null;
    
    const multiplier = housingMultipliers[housingType];
    const selectedRent = Math.round(neighborhoodScores[selectedArea].rent * multiplier);
    
    return comparisonAreas.map(area => {
      const areaRent = Math.round(neighborhoodScores[area].rent * multiplier);
      const diff = selectedRent - areaRent;
      return {
        area,
        rent: areaRent,
        difference: diff,
        savings: diff > 0 ? diff * 12 : 0
      };
    });
  }, [selectedArea, comparisonAreas, housingType]);

  const areas = [selectedArea, ...comparisonAreas];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Target className="w-5 h-5 text-primary" />
          {language === "it" ? "Confronto quartieri" : "Neighborhood Comparison"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Area selection */}
        <div className="mb-4">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="default" className="gap-1 py-1.5">
              <MapPin className="w-3 h-3" />
              {selectedArea}
            </Badge>
            {comparisonAreas.map((area, index) => (
              <Badge 
                key={area} 
                variant="secondary" 
                className="gap-1 py-1.5 cursor-pointer hover:bg-destructive/20"
                onClick={() => removeComparisonArea(area)}
                style={{ 
                  borderColor: CHART_COLORS[index + 1],
                  borderWidth: 2
                }}
              >
                {area}
                <X className="w-3 h-3" />
              </Badge>
            ))}
          </div>
          
          {comparisonAreas.length < 2 && (
            <div className="flex items-center gap-2">
              <Select onValueChange={addComparisonArea}>
                <SelectTrigger className="w-[200px] h-9">
                  <SelectValue placeholder={
                    language === "it" ? "Aggiungi quartiere..." : "Add neighborhood..."
                  } />
                </SelectTrigger>
                <SelectContent>
                  {availableAreas.map(area => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-xs text-muted-foreground">
                {language === "it" 
                  ? `(max ${2 - comparisonAreas.length} ${2 - comparisonAreas.length === 1 ? 'altro' : 'altri'})`
                  : `(max ${2 - comparisonAreas.length} more)`}
              </span>
            </div>
          )}
        </div>

        {/* Radar Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
              <PolarGrid strokeDasharray="3 3" />
              <PolarAngleAxis 
                dataKey="metric" 
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                tick={{ fontSize: 10 }}
                axisLine={false}
              />
              {areas.map((area, index) => (
                <RechartsRadar
                  key={area}
                  name={area}
                  dataKey={area}
                  stroke={CHART_COLORS[index]}
                  fill={CHART_COLORS[index]}
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
              ))}
              <Legend 
                wrapperStyle={{ fontSize: 12, paddingTop: 10 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Comparison summary */}
        {comparisonSummary && comparisonSummary.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 space-y-2"
          >
            {comparisonSummary.map((item, index) => (
              <div 
                key={item.area}
                className="flex items-center justify-between p-3 rounded-lg bg-accent/50"
              >
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: CHART_COLORS[index + 1] }}
                  />
                  <span className="font-medium text-sm">{item.area}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium">€{item.rent}/mese</span>
                  {item.difference !== 0 && (
                    <span className={`text-xs ml-2 ${
                      item.difference > 0 ? "text-emerald-500" : "text-amber-500"
                    }`}>
                      ({item.difference > 0 ? "-" : "+"}€{Math.abs(item.difference)})
                    </span>
                  )}
                </div>
              </div>
            ))}
            
            {comparisonSummary.some(s => s.savings > 0) && (
              <p className="text-xs text-muted-foreground text-center pt-2">
                💡 {language === "it" 
                  ? `Scegliendo il quartiere più economico risparmi fino a €${Math.max(...comparisonSummary.map(s => s.savings))}/anno`
                  : `Choosing the cheapest neighborhood saves up to €${Math.max(...comparisonSummary.map(s => s.savings))}/year`}
              </p>
            )}
          </motion.div>
        )}

        {/* Quick action */}
        {comparisonAreas.length > 0 && onAreaChange && (
          <div className="mt-4 pt-3 border-t border-border/50">
            <p className="text-xs text-muted-foreground mb-2">
              {language === "it" ? "Vuoi cambiare quartiere?" : "Want to switch neighborhood?"}
            </p>
            <div className="flex flex-wrap gap-2">
              {comparisonAreas.map(area => (
                <Button
                  key={area}
                  variant="outline"
                  size="sm"
                  onClick={() => onAreaChange(area)}
                  className="text-xs"
                >
                  {language === "it" ? `Usa ${area}` : `Use ${area}`}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const NeighborhoodRadarChart = memo(NeighborhoodRadarChartComponent);
