import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, GitCompare, ArrowRight, Star } from "lucide-react";
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
  investorZones,
  InvestorZone,
  formatPrice,
  getDemandLabel,
} from "@/data/investorZoneData";
import { ComparisonRow } from "./ComparisonRow";
import { useIsMobile } from "@/hooks/use-mobile";

interface ZoneComparisonToolProps {
  lang: "it" | "en";
  preselectedZones?: string[];
  embedded?: boolean;
  onZonesChange?: (zones: string[]) => void;
}

const MAX_ZONES = 3;

export const ZoneComparisonTool = ({
  lang,
  preselectedZones = [],
  embedded = false,
  onZonesChange,
}: ZoneComparisonToolProps) => {
  const isMobile = useIsMobile();
  const [selectedZoneIds, setSelectedZoneIds] = useState<string[]>(
    preselectedZones.slice(0, MAX_ZONES)
  );

  // Sync with parent when preselectedZones changes
  useEffect(() => {
    if (preselectedZones.length > 0) {
      setSelectedZoneIds(preselectedZones.slice(0, MAX_ZONES));
    }
  }, [preselectedZones]);

  // Notify parent of changes
  const updateZones = (newZones: string[]) => {
    setSelectedZoneIds(newZones);
    onZonesChange?.(newZones);
  };

  const selectedZones = useMemo(() => {
    return selectedZoneIds
      .map((id) => investorZones.find((z) => z.id === id))
      .filter((z): z is InvestorZone => z !== undefined);
  }, [selectedZoneIds]);

  const availableZones = useMemo(() => {
    return investorZones.filter((z) => !selectedZoneIds.includes(z.id));
  }, [selectedZoneIds]);

  const texts = {
    it: {
      title: "Confronta zone",
      addZone: "Aggiungi zona",
      removeZone: "Rimuovi",
      selectZone: "Seleziona quartiere...",
      maxZones: `Max ${MAX_ZONES} zone`,
      bestValue: "Migliore",
      viewZone: "Vedi dettagli",
      pricePerSqm: "Prezzo medio",
      vacancy: "Tasso sfitto",
      trend: "Trend 2024",
      demand: "Domanda",
      rentingTime: "Tempo affitto",
      renewal: "Riqualificazione",
      noRenewal: "Nessuna",
      noZonesSelected: "Seleziona almeno un quartiere per confrontare",
      perSqm: "/m²",
      perMonth: "/mese",
    },
    en: {
      title: "Compare zones",
      addZone: "Add zone",
      removeZone: "Remove",
      selectZone: "Select neighborhood...",
      maxZones: `Max ${MAX_ZONES} zones`,
      bestValue: "Best",
      viewZone: "View details",
      pricePerSqm: "Average price",
      vacancy: "Vacancy rate",
      trend: "2024 trend",
      demand: "Demand",
      rentingTime: "Renting time",
      renewal: "Urban renewal",
      noRenewal: "None",
      noZonesSelected: "Select at least one neighborhood to compare",
      perSqm: "/sqm",
      perMonth: "/month",
    },
  };

  const t = texts[lang];
  const zonesPath = lang === "en" ? "/investors/zones" : "/investitori/zone";

  const handleAddZone = (zoneId: string) => {
    if (selectedZoneIds.length < MAX_ZONES && !selectedZoneIds.includes(zoneId)) {
      updateZones([...selectedZoneIds, zoneId]);
    }
  };

  const handleRemoveZone = (zoneId: string) => {
    updateZones(selectedZoneIds.filter((id) => id !== zoneId));
  };

  // Calculate best values
  const bestValues = useMemo(() => {
    if (selectedZones.length < 2) return {};

    const lowestPrice = Math.min(...selectedZones.map((z) => z.pricePerSqm.avg));
    const lowestVacancy = Math.min(...selectedZones.map((z) => z.vacancyRate.min));
    const highestTrend = Math.max(...selectedZones.map((z) => z.variation2024));
    const demandOrder: Record<string, number> = {
      very_high: 4,
      high: 3,
      medium: 2,
      low: 1,
    };
    const highestDemand = Math.max(
      ...selectedZones.map((z) => demandOrder[z.demand] || 0)
    );

    return {
      price: selectedZones.find((z) => z.pricePerSqm.avg === lowestPrice)?.id,
      vacancy: selectedZones.find((z) => z.vacancyRate.min === lowestVacancy)?.id,
      trend: selectedZones.find((z) => z.variation2024 === highestTrend)?.id,
      demand: selectedZones.find((z) => demandOrder[z.demand] === highestDemand)?.id,
    };
  }, [selectedZones]);

  // Metrics to display
  const metrics = [
    {
      key: "price",
      label: t.pricePerSqm,
      getValue: (z: InvestorZone) => `€${formatPrice(z.pricePerSqm.avg)}${t.perSqm}`,
    },
    {
      key: "vacancy",
      label: t.vacancy,
      getValue: (z: InvestorZone) => `${z.vacancyRate.min}-${z.vacancyRate.max}%`,
    },
    {
      key: "trend",
      label: t.trend,
      getValue: (z: InvestorZone) => `+${z.variation2024}%`,
    },
    {
      key: "demand",
      label: t.demand,
      getValue: (z: InvestorZone) => getDemandLabel(z.demand, lang),
    },
    {
      key: "rentingTime",
      label: t.rentingTime,
      getValue: (z: InvestorZone) => z.rentingTime[lang],
    },
    {
      key: "renewal",
      label: t.renewal,
      getValue: (z: InvestorZone) =>
        z.urbanRenewal.active && z.urbanRenewal.projects.length > 0
          ? z.urbanRenewal.projects[0].name
          : t.noRenewal,
    },
  ];

  return (
    <div className={embedded ? "" : "p-4 md:p-6"}>
      {!embedded && (
        <div className="flex items-center gap-2 mb-6">
          <GitCompare className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t.title}</h2>
        </div>
      )}

      {/* Zone selectors */}
      <div className="flex flex-wrap gap-3 mb-6">
        <AnimatePresence mode="popLayout">
          {selectedZoneIds.map((zoneId, idx) => {
            const zone = investorZones.find((z) => z.id === zoneId);
            if (!zone) return null;
            return (
              <motion.div
                key={zoneId}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2"
              >
                <span className="text-sm font-medium text-foreground">{zone.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-muted-foreground hover:text-destructive"
                  onClick={() => handleRemoveZone(zoneId)}
                  aria-label={`${t.removeZone} ${zone.name}`}
                >
                  <X className="w-4 h-4" />
                </Button>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {selectedZoneIds.length < MAX_ZONES && (
          <Select onValueChange={handleAddZone}>
            <SelectTrigger className="w-48 h-10">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                <span>{t.addZone}</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              {availableZones.map((zone) => (
                <SelectItem key={zone.id} value={zone.id}>
                  {zone.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {selectedZoneIds.length >= MAX_ZONES && (
          <Badge variant="secondary" className="h-10 flex items-center">
            {t.maxZones}
          </Badge>
        )}
      </div>

      {/* Comparison Table */}
      {selectedZones.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">{t.noZonesSelected}</p>
      ) : (() => {
        const mobileLabelCol = selectedZones.length === 3 ? 80 : 96;
        const desktopLabelCol = 160;
        const gridTemplate = `${isMobile ? mobileLabelCol : desktopLabelCol}px repeat(${selectedZones.length}, minmax(0, 1fr))`;
        // Only force horizontal scroll on mobile when 3 zones are selected
        const needsHScroll = isMobile && selectedZones.length === 3;
        return (
        <div className={needsHScroll ? "overflow-x-auto -mx-4" : ""}>
          <div className={needsHScroll ? "min-w-[520px] px-4" : ""}>
            {/* Table header */}
            <div
              className="grid gap-2 md:gap-4 mb-4 sticky top-0 bg-background z-10 pb-2 border-b border-border"
              style={{ gridTemplateColumns: gridTemplate }}
            >
              <div className="text-sm font-medium text-muted-foreground"></div>
              {selectedZones.map((zone) => (
                <div key={zone.id} className="text-center min-w-0">
                  <p className="font-semibold text-foreground text-sm md:text-base truncate">{zone.name}</p>
                  <Badge variant="outline" className="mt-1 text-xs">
                    {zone.zone}
                  </Badge>
                </div>
              ))}
            </div>

            {/* Metric rows */}
            <div className="space-y-1">
              {metrics.map((metric) => (
                <ComparisonRow
                  key={metric.key}
                  label={metric.label}
                  zones={selectedZones}
                  getValue={metric.getValue}
                  bestZoneId={bestValues[metric.key as keyof typeof bestValues]}
                  bestLabel={t.bestValue}
                  gridTemplate={gridTemplate}
                />
              ))}
            </div>

            {/* View zone links */}
            <div
              className="grid gap-2 md:gap-4 mt-6 pt-4 border-t border-border"
              style={{ gridTemplateColumns: gridTemplate }}
            >
              <div></div>
              {selectedZones.map((zone) => (
                <div key={zone.id} className="text-center min-w-0">
                  <Button asChild variant="outline" size="sm" className="gap-1 w-full">
                    <Link to={`${zonesPath}/${zone.slug}`}>
                      <span className="truncate">{t.viewZone}</span>
                      <ArrowRight className="w-3 h-3 flex-shrink-0" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
        );
      })()}
    </div>
  );
};
