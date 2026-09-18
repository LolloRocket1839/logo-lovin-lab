import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ZoneMetricCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  variant?: 'default' | 'highlight' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ZoneMetricCard = ({ 
  icon: Icon, 
  value, 
  label, 
  variant = 'default',
  size = 'md',
  className
}: ZoneMetricCardProps) => {
  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4 md:p-6',
    lg: 'p-6 md:p-8'
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const valueSizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl md:text-3xl',
    lg: 'text-3xl md:text-4xl'
  };

  const variantClasses = {
    default: 'border-border/20 bg-card',
    highlight: 'border-primary/30 bg-primary/5',
    warning: 'border-amber-500/30 bg-amber-500/5'
  };

  const iconBgClasses = {
    default: 'bg-primary/10',
    highlight: 'bg-primary/20',
    warning: 'bg-amber-500/20'
  };

  const iconColorClasses = {
    default: 'text-primary',
    highlight: 'text-primary',
    warning: 'text-amber-600'
  };

  return (
    <Card className={cn(
      sizeClasses[size],
      variantClasses[variant],
      'text-center rounded-xl transition-all hover:shadow-md',
      className
    )}>
      <div className={cn(
        'w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3',
        iconBgClasses[variant]
      )}>
        <Icon className={cn(iconSizeClasses[size], iconColorClasses[variant])} strokeWidth={1.5} />
      </div>
      <div className={cn(valueSizeClasses[size], 'font-bold text-foreground mb-1')}>
        {value}
      </div>
      <p className="text-xs md:text-sm text-muted-foreground">
        {label}
      </p>
    </Card>
  );
};
