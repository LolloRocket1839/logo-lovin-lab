import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, TrendingUp, MapPin, Calendar, Users } from 'lucide-react';
import { getPostBySlug } from '@/data/blog/posts';
import { isPillarArticle } from '@/data/blog/contentClusters';
import { cn } from '@/lib/utils';

interface SeeAlsoBoxProps {
  slugs: string[];
  lang: 'it' | 'en';
  title?: string;
  variant?: 'default' | 'compact' | 'grid';
}

// Category icons
const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  students: BookOpen,
  investors: TrendingUp,
  sellers: MapPin,
  turisti: Calendar,
  societa: Users
};

export const SeeAlsoBox = ({ slugs, lang, title, variant = 'default' }: SeeAlsoBoxProps) => {
  const posts = slugs
    .map(slug => getPostBySlug(slug))
    .filter((post): post is NonNullable<typeof post> => post !== undefined);
  
  if (posts.length === 0) return null;

  const defaultTitle = lang === 'it' ? 'Leggi anche' : 'See also';
  const displayTitle = title || defaultTitle;

  if (variant === 'compact') {
    return (
      <div className="my-6 p-4 rounded-lg bg-muted/30 border border-border/50 not-prose">
        <p className="text-sm font-medium text-muted-foreground mb-2">
          {displayTitle}:
        </p>
        <ul className="space-y-1">
          {posts.map(post => {
            const translation = post.translations[lang];
            const isPillar = isPillarArticle(post.slug);
            return (
              <li key={post.slug}>
                <Link 
                  to={`/blog/${post.slug}`}
                  className={cn(
                    "text-sm hover:text-primary transition-colors inline-flex items-center gap-1",
                    isPillar ? "font-semibold text-primary" : "text-foreground"
                  )}
                >
                  <ArrowRight className="h-3 w-3" />
                  {translation.title}
                  {isPillar && <span className="text-xs text-primary ml-1">★</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  if (variant === 'grid') {
    return (
      <div className="my-8 not-prose">
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          {displayTitle}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {posts.map(post => {
            const translation = post.translations[lang];
            const isPillar = isPillarArticle(post.slug);
            const Icon = categoryIcons[post.category] || BookOpen;
            
            return (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className={cn(
                  "group p-4 rounded-lg border transition-all duration-300",
                  "hover:border-primary/50 hover:bg-primary/5",
                  isPillar 
                    ? "border-primary/30 bg-primary/5" 
                    : "border-border/50 bg-muted/20"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "p-2 rounded-md",
                    isPillar ? "bg-primary/20" : "bg-muted"
                  )}>
                    <Icon className={cn(
                      "h-4 w-4",
                      isPillar ? "text-primary" : "text-muted-foreground"
                    )} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      "font-medium leading-tight group-hover:text-primary transition-colors",
                      isPillar && "text-primary"
                    )}>
                      {translation.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {translation.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className="my-8 p-5 rounded-xl border-l-4 border-l-primary border border-border/50 bg-gradient-to-br from-primary/5 to-transparent not-prose">
      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
        <BookOpen className="h-4 w-4 text-primary" />
        {displayTitle}
      </h4>
      <ul className="space-y-2">
        {posts.map(post => {
          const translation = post.translations[lang];
          const isPillar = isPillarArticle(post.slug);
          const Icon = categoryIcons[post.category] || BookOpen;
          
          return (
            <li key={post.slug}>
              <Link 
                to={`/blog/${post.slug}`}
                className="group flex items-center gap-3 py-2 hover:bg-primary/5 rounded-lg px-2 -mx-2 transition-colors"
              >
                <Icon className={cn(
                  "h-4 w-4 flex-shrink-0",
                  isPillar ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                )} />
                <span className={cn(
                  "flex-1 group-hover:text-primary transition-colors",
                  isPillar ? "font-semibold text-primary" : "text-foreground"
                )}>
                  {translation.title}
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// Inline link component for use within markdown-rendered content
interface InlineSeeAlsoProps {
  slug: string;
  lang: 'it' | 'en';
  text?: string;
}

export const InlineSeeAlso = ({ slug, lang, text }: InlineSeeAlsoProps) => {
  const post = getPostBySlug(slug);
  if (!post) return null;
  
  const translation = post.translations[lang];
  const displayText = text || translation.title;
  const isPillar = isPillarArticle(slug);
  
  return (
    <Link 
      to={`/blog/${slug}`}
      className={cn(
        "inline-flex items-center gap-1 underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-colors",
        isPillar ? "font-semibold text-primary" : "text-primary hover:text-primary/80"
      )}
    >
      {displayText}
      {isPillar && <span className="text-xs">★</span>}
    </Link>
  );
};
