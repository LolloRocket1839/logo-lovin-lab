import { useTranslation } from "react-i18next";
import { MapPin, Train, TrendingUp, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AreaInfo } from "@/data/turinAreas";

interface AreaSuggestionCardProps {
  area: AreaInfo;
  onAddDetails: () => void;
  onDismiss: () => void;
}

export const AreaSuggestionCard = ({ area, onAddDetails, onDismiss }: AreaSuggestionCardProps) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language === "en" ? "en" : "it";

  return (
    <Card className="border-primary/30 bg-primary/5 animate-in slide-in-from-top-2 duration-300">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-full">
              <MapPin className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">{area.name}</h4>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {area.description[currentLang]}
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="h-6 w-6 p-0 shrink-0"
          >
            ×
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <Train className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">{area.transport}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">{area.avgRent}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Info className="h-3 w-3 text-muted-foreground shrink-0" />
          <div className="flex items-center gap-1 flex-wrap">
            <span className="text-muted-foreground">Polito:</span>
            <span className="font-medium">{area.distance.polito}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">UniTo:</span>
            <span className="font-medium">{area.distance.unito}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {area.characteristics.map((char) => (
            <Badge key={char} variant="secondary" className="text-xs px-2 py-0.5">
              {char}
            </Badge>
          ))}
        </div>

        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={onAddDetails}
          className="w-full h-8 text-xs"
        >
          {currentLang === "it" ? "Aggiungi info al form" : "Add info to form"}
        </Button>
      </CardContent>
    </Card>
  );
};
