import { Star } from "lucide-react";
import { InvestorZone } from "@/data/investorZoneData";
import { cn } from "@/lib/utils";

interface ComparisonRowProps {
  label: string;
  zones: InvestorZone[];
  getValue: (zone: InvestorZone) => string;
  bestZoneId?: string;
  bestLabel: string;
}

export const ComparisonRow = ({
  label,
  zones,
  getValue,
  bestZoneId,
  bestLabel,
}: ComparisonRowProps) => {
  return (
    <div
      className="grid gap-4 py-3 border-b border-border/50 hover:bg-muted/30 transition-colors"
      style={{
        gridTemplateColumns: `160px repeat(${zones.length}, 1fr)`,
      }}
    >
      <div className="text-sm font-medium text-muted-foreground flex items-center">
        {label}
      </div>
      {zones.map((zone) => {
        const isBest = bestZoneId === zone.id && zones.length > 1;
        return (
          <div
            key={zone.id}
            className={cn(
              "text-center flex flex-col items-center justify-center",
              isBest && "relative"
            )}
          >
            <span
              className={cn(
                "text-sm font-medium",
                isBest ? "text-primary font-semibold" : "text-foreground"
              )}
            >
              {getValue(zone)}
            </span>
            {isBest && (
              <span className="flex items-center gap-1 text-xs text-primary mt-0.5">
                <Star className="w-3 h-3 fill-primary" />
                {bestLabel}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
