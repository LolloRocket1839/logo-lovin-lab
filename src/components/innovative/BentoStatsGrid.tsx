import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import { 
  GraduationCap, 
  Building2, 
  TrendingUp, 
  Users,
  MapPin,
  Euro,
  Percent,
  Home
} from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface BentoStat {
  id: string;
  icon: React.ElementType;
  value: string;
  numericValue: number;
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
    numericValue: 90,
    suffix: "k+",
    labelKey: "investor.stats.students",
    size: "large",
    color: "from-blue-500/20 to-blue-600/10"
  },
  {
    id: "universities",
    icon: Building2,
    value: "7",
    numericValue: 7,
    suffix: "",
    labelKey: "investor.stats.universities",
    size: "medium",
    color: "from-primary/20 to-primary/10"
  },
  {
    id: "yield",
    icon: Percent,
    value: "7.6",
    numericValue: 7.6,
    suffix: "%*",
    labelKey: "investor.stats.yield",
    size: "medium",
    color: "from-green-500/20 to-green-600/10"
  },
  {
    id: "occupancy",
    icon: Home,
    value: "95",
    numericValue: 95,
    suffix: "%*",
    labelKey: "investor.stats.occupancy",
    size: "small",
    color: "from-amber-500/20 to-amber-600/10"
  },
  {
    id: "minInvestment",
    icon: Euro,
    value: "100",
    numericValue: 100,
    suffix: "€",
    labelKey: "investor.stats.minInvestment",
    size: "small",
    color: "from-purple-500/20 to-purple-600/10"
  },
  {
    id: "neighborhoods",
    icon: MapPin,
    value: "9",
    numericValue: 9,
    suffix: "",
    labelKey: "investor.stats.neighborhoods",
    size: "small",
    color: "from-rose-500/20 to-rose-600/10"
  }
];

// Counter hook for animated numbers
const useCounter = (end: number, duration: number = 2000, start: boolean = false) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!start) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(end * easeOut);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start]);
  
  return count;
};

interface BentoCardProps {
  stat: BentoStat;
  index: number;
  isInView: boolean;
}

const BentoCard = ({ stat, index, isInView }: BentoCardProps) => {
  const prefersReducedMotion = useReducedMotion();
  const count = useCounter(stat.numericValue, 2000, isInView);
  const Icon = stat.icon;
  
  // Format the count value
  const displayValue = stat.numericValue % 1 !== 0 
    ? count.toFixed(1) 
    : Math.round(count).toString();

  const sizeClasses = {
    small: "col-span-1 row-span-1",
    medium: "col-span-1 md:col-span-1 row-span-1 md:row-span-2",
    large: "col-span-2 row-span-1 md:row-span-2"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.5,
        delay: prefersReducedMotion ? 0 : index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      whileHover={prefersReducedMotion ? {} : { 
        y: -4,
        rotateX: 2,
        rotateY: -2,
        transition: { duration: 0.3 }
      }}
      className={`
        ${sizeClasses[stat.size]}
        relative rounded-3xl p-6 md:p-8
        bg-gradient-to-br ${stat.color}
        border border-border/50
        backdrop-blur-sm
        overflow-hidden
        group
        cursor-default
      `}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
    >
      {/* Background glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/10 to-transparent" />
      
      {/* Icon */}
      <div className="mb-4">
        <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-card/80 shadow-sm">
          <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary" strokeWidth={1.5} />
        </div>
      </div>

      {/* Value */}
      <div className="mb-2">
        <span className={`
          font-display font-extrabold tracking-tight
          ${stat.size === 'large' ? 'text-5xl md:text-7xl' : stat.size === 'medium' ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl'}
        `}>
          {stat.id === 'minInvestment' ? (
            <>{stat.suffix}{displayValue}</>
          ) : (
            <>{displayValue}{stat.suffix}</>
          )}
        </span>
      </div>

      {/* Label */}
      <p className="text-sm md:text-base text-muted-foreground font-medium">
        {stat.labelKey}
      </p>

      {/* Decorative corner */}
      <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-primary/5 blur-2xl" />
    </motion.div>
  );
};

export const BentoStatsGrid = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={containerRef}
      className="py-16 md:py-24 lg:py-32 px-4 md:px-8"
      aria-labelledby="stats-title"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            {t('investor.statsLabel', 'I numeri')}
          </motion.span>
          <motion.h2
            id="stats-title"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold"
          >
            {t('investor.statsTitle', 'Il mercato di Torino')}
          </motion.h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[minmax(140px,auto)]">
          {stats.map((stat, index) => (
            <BentoCard 
              key={stat.id} 
              stat={stat} 
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-xs text-muted-foreground mt-8"
        >
          * {t('investor.disclaimer', 'Valori stimati basati su analisi di mercato - Fonte: Savills Research 2025')}
        </motion.p>
      </div>
    </section>
  );
};
