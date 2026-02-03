import { Crown, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { isPillarArticle } from '@/data/blog/contentClusters';
import { cn } from '@/lib/utils';

interface PillarBadgeProps {
  slug: string;
  lang: 'it' | 'en';
  className?: string;
}

export const PillarBadge = ({ slug, lang, className }: PillarBadgeProps) => {
  if (!isPillarArticle(slug)) return null;
  
  const label = lang === 'it' ? 'Guida completa' : 'Complete guide';
  
  return (
    <Badge 
      variant="outline"
      className={cn(
        "bg-gradient-to-r from-amber-500/10 to-yellow-500/10",
        "border-amber-500/30 text-amber-700 dark:text-amber-400",
        "font-semibold uppercase tracking-wider text-[10px]",
        "flex items-center gap-1",
        className
      )}
    >
      <Crown className="h-3 w-3" />
      {label}
    </Badge>
  );
};

interface ClusterIndicatorProps {
  totalArticles: number;
  lang: 'it' | 'en';
  className?: string;
}

export const ClusterIndicator = ({ totalArticles, lang, className }: ClusterIndicatorProps) => {
  if (totalArticles <= 1) return null;
  
  const label = lang === 'it' 
    ? `Parte di una serie di ${totalArticles} articoli`
    : `Part of a ${totalArticles}-article series`;
  
  return (
    <div className={cn(
      "flex items-center gap-2 text-xs text-muted-foreground",
      className
    )}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: Math.min(totalArticles, 5) }).map((_, i) => (
          <Star 
            key={i} 
            className="h-3 w-3 fill-primary/60 text-primary/60" 
          />
        ))}
        {totalArticles > 5 && (
          <span className="text-primary ml-1">+{totalArticles - 5}</span>
        )}
      </div>
      <span>{label}</span>
    </div>
  );
};
