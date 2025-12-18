import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { 
  GraduationCap, 
  Building2, 
  MapPin,
  Euro,
  Percent,
  Home
} from "lucide-react";

interface BentoStat {
  id: string;
  icon: React.ElementType;
  value: string;
  suffix: string;
  labelKey: string;
  size: "small" | "medium" | "large";
  color: string;
}

const stats: BentoStat[] = [
  {
    id: "students",
    icon: GraduationCap,
    value: "90",
    suffix: "k+",
    labelKey: "investor.stats.students",
    size: "large",
    color: "from-blue-500/20 to-blue-600/10"
  },
  {
    id: "universities",
    icon: Building2,
    value: "7",
    suffix: "",
    labelKey: "investor.stats.universities",
    size: "medium",
    color: "from-primary/20 to-primary/10"
  },
  {
    id: "yield",
    icon: Percent,
    value: "7.6",
    suffix: "%*",
    labelKey: "investor.stats.yield",
    size: "medium",
    color: "from-green-500/20 to-green-600/10"
  },
  {
    id: "occupancy",
    icon: Home,
    value: "95",
    suffix: "%*",
    labelKey: "investor.stats.occupancy",
    size: "small",
    color: "from-amber-500/20 to-amber-600/10"
  },
  {
    id: "minInvestment",
    icon: Euro,
    value: "100",
    suffix: "€",
    labelKey: "investor.stats.minInvestment",
    size: "small",
    color: "from-purple-500/20 to-purple-600/10"
  },
  {
    id: "neighborhoods",
    icon: MapPin,
    value: "9",
    suffix: "",
    labelKey: "investor.stats.neighborhoods",
    size: "small",
    color: "from-rose-500/20 to-rose-600/10"
  }
];

interface BentoCardProps {
  stat: BentoStat;
}

const BentoCard = ({ stat }: BentoCardProps) => {
  const Icon = stat.icon;

  const sizeClasses = {
    small: "col-span-1 row-span-1",
    medium: "col-span-1 md:col-span-1 row-span-1 md:row-span-2",
    large: "col-span-2 row-span-1 md:row-span-2"
  };

  return (
    <div
      className={`
        ${sizeClasses[stat.size]}
        relative rounded-3xl p-6 md:p-8
        bg-gradient-to-br ${stat.color}
        border border-border/50
        backdrop-blur-sm
        overflow-hidden
        group
        cursor-default
        hover:shadow-md transition-shadow duration-200
      `}
    >
      {/* Background glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/10 to-transparent" />
      
      {/* Icon */}
      <div className="mb-4">
        <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-card/80 shadow-sm">
          <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary" strokeWidth={1.5} />
        </div>
      </div>

      {/* Value - static */}
      <div className="mb-2">
        <span className={`
          font-display font-extrabold tracking-tight
          ${stat.size === 'large' ? 'text-5xl md:text-7xl' : stat.size === 'medium' ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl'}
        `}>
          {stat.id === 'minInvestment' ? (
            <>{stat.suffix}{stat.value}</>
          ) : (
            <>{stat.value}{stat.suffix}</>
          )}
        </span>
      </div>

      {/* Label */}
      <p className="text-sm md:text-base text-muted-foreground font-medium">
        {stat.labelKey}
      </p>

      {/* Decorative corner */}
      <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-primary/5 blur-2xl" />
    </div>
  );
};

export const BentoStatsGrid = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={containerRef}
      className="py-16 md:py-24 lg:py-32 px-4 md:px-8"
      aria-labelledby="stats-title"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {t('investor.statsLabel', 'I numeri')}
          </span>
          <h2
            id="stats-title"
            className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold"
          >
            {t('investor.statsTitle', 'Il mercato di Torino')}
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[minmax(140px,auto)]">
          {stats.map((stat) => (
            <BentoCard 
              key={stat.id} 
              stat={stat} 
            />
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          * {t('investor.disclaimer', 'Valori stimati basati su analisi di mercato - Fonte: Savills Research 2025')}
        </p>
      </div>
    </section>
  );
};
