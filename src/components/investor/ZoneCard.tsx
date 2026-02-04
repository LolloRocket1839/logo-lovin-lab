import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Building2, 
  Percent, 
  MapPin,
  ArrowRight,
  Hammer
} from "lucide-react";
import { 
  InvestorZone, 
  getTrendLabel, 
  getTrendIcon, 
  formatPrice, 
  formatYield 
} from "@/data/investorZoneData";
import { cn } from "@/lib/utils";

interface ZoneCardProps {
  zone: InvestorZone;
  lang: 'it' | 'en';
  className?: string;
}

export const ZoneCard = ({ zone, lang, className }: ZoneCardProps) => {
  const trendLabel = getTrendLabel(zone.trend202526, lang);
  const trendIcon = getTrendIcon(zone.trend202526);
  
  const isHighGrowth = zone.trend202526 === 'strong_growth' || zone.trend202526 === 'max_growth';
  const hasRenewal = zone.urbanRenewal.active;

  const linkPath = lang === 'en' 
    ? `/investors/zones/${zone.slug}` 
    : `/investitori/zone/${zone.slug}`;

  return (
    <Link to={linkPath}>
      <Card className={cn(
        'group overflow-hidden rounded-xl border-border/20 hover:border-primary/30 transition-all duration-300 hover:shadow-lg',
        className
      )}>
        {/* Image */}
        <div className="relative h-40 overflow-hidden">
          <img 
            src={zone.image} 
            alt={zone.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Badges overlay */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {isHighGrowth && (
              <Badge className="bg-primary/90 text-primary-foreground text-xs">
                {trendIcon} {trendLabel}
              </Badge>
            )}
            {hasRenewal && (
              <Badge variant="secondary" className="bg-amber-500/90 text-white text-xs">
                <Hammer className="w-3 h-3 mr-1" />
                {lang === 'it' ? 'Riqualificazione' : 'Renewal'}
              </Badge>
            )}
          </div>

          {/* Zone category */}
          <div className="absolute bottom-3 left-3">
            <span className="text-xs font-medium text-white/80 uppercase tracking-wider">
              {zone.zone}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-5">
          {/* Name and location */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {zone.name}
              </h3>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <MapPin className="w-3 h-3" />
                Torino
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>

          {/* Key metrics grid */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center p-2 rounded-lg bg-muted/50">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Building2 className="w-3 h-3 text-muted-foreground" />
              </div>
              <div className="text-sm font-bold text-foreground">
                €{formatPrice(zone.pricePerSqm.avg)}
              </div>
              <div className="text-[10px] text-muted-foreground">/m²</div>
            </div>
            
            <div className="text-center p-2 rounded-lg bg-muted/50">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Percent className="w-3 h-3 text-muted-foreground" />
              </div>
              <div className="text-sm font-bold text-primary">
                {formatYield(zone.grossYield.min, zone.grossYield.max)}
              </div>
              <div className="text-[10px] text-muted-foreground">
                {lang === 'it' ? 'Lordo' : 'Gross'}
              </div>
            </div>
            
            <div className="text-center p-2 rounded-lg bg-muted/50">
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingUp className="w-3 h-3 text-muted-foreground" />
              </div>
              <div className={cn(
                'text-sm font-bold',
                zone.variation2024 >= 5 ? 'text-emerald-600' : 'text-foreground'
              )}>
                +{zone.variation2024}%
              </div>
              <div className="text-[10px] text-muted-foreground">2024</div>
            </div>
          </div>

          {/* Target tenants */}
          <div className="flex flex-wrap gap-1">
            {zone.targetTenant[lang].slice(0, 2).map((tenant, idx) => (
              <Badge key={idx} variant="outline" className="text-[10px] px-2 py-0.5">
                {tenant}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </Link>
  );
};
