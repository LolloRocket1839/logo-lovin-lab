import { memo } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Crown, ChevronRight, X } from "lucide-react";
import { useBlogLanguage } from "@/hooks/useBlogLanguage";
import { getClusterForArticle, isPillarArticle } from "@/data/blog/contentClusters";
import { getPostBySlug } from "@/data/blog/posts";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ClusterSidebarProps {
  currentSlug: string;
  isOpen: boolean;
  onClose: () => void;
}

const ClusterSidebarComponent = ({ currentSlug, isOpen, onClose }: ClusterSidebarProps) => {
  const currentLang = useBlogLanguage();
  
  const cluster = getClusterForArticle(currentSlug);
  
  if (!cluster) return null;
  
  // Build ordered list: pillar first, then satellites
  const allSlugs = [cluster.pillar, ...cluster.satellites];
  
  const articles = allSlugs
    .map(slug => {
      const post = getPostBySlug(slug);
      if (!post) return null;
      return {
        slug,
        post,
        isPillar: slug === cluster.pillar,
        isCurrent: slug === currentSlug
      };
    })
    .filter(Boolean);

  const sectionTitle = currentLang === 'it' ? 'In questa serie' : 'In this series';
  const articlesCount = currentLang === 'it' 
    ? `${articles.length} articoli`
    : `${articles.length} articles`;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 right-0 h-full w-80 bg-card border-l border-border z-50 transition-transform duration-300 lg:sticky lg:top-24 lg:h-fit lg:max-h-[calc(100vh-8rem)] lg:rounded-xl lg:border lg:z-0",
          isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border lg:border-b-0">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <div>
              <h3 className="font-semibold text-sm">{sectionTitle}</h3>
              <p className="text-xs text-muted-foreground">{articlesCount}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Articles List */}
        <ScrollArea className="h-[calc(100%-4rem)] lg:h-auto lg:max-h-[400px]">
          <nav className="p-2">
            <ul className="space-y-1">
              {articles.map((item) => {
                if (!item) return null;
                const { slug, post, isPillar, isCurrent } = item;
                const translation = post.translations[currentLang];
                
                return (
                  <li key={slug}>
                    <Link
                      to={`/blog/${slug}`}
                      onClick={onClose}
                      className={cn(
                        "flex items-start gap-2 p-3 rounded-lg text-sm transition-colors group",
                        isCurrent 
                          ? "bg-primary/10 text-primary font-medium" 
                          : "hover:bg-muted/50 text-foreground/80 hover:text-foreground"
                      )}
                    >
                      {/* Indicator */}
                      <div className="mt-0.5 flex-shrink-0">
                        {isPillar ? (
                          <Crown className={cn(
                            "h-4 w-4",
                            isCurrent ? "text-primary" : "text-primary/70"
                          )} />
                        ) : (
                          <ChevronRight className={cn(
                            "h-4 w-4 transition-transform",
                            isCurrent ? "text-primary" : "text-muted-foreground",
                            !isCurrent && "group-hover:translate-x-0.5"
                          )} />
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <span className={cn(
                          "line-clamp-2 leading-snug",
                          isPillar && "font-medium"
                        )}>
                          {translation.title}
                        </span>
                        {isPillar && (
                          <span className="inline-block mt-1 text-[10px] uppercase tracking-wider text-primary font-semibold">
                            {currentLang === 'it' ? 'Guida completa' : 'Complete guide'}
                          </span>
                        )}
                      </div>
                      
                      {/* Current indicator */}
                      {isCurrent && (
                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </ScrollArea>
      </aside>
    </>
  );
};

export const ClusterSidebar = memo(ClusterSidebarComponent);

// Floating trigger button for mobile
interface ClusterSidebarTriggerProps {
  currentSlug: string;
  onClick: () => void;
}

export const ClusterSidebarTrigger = memo(({ currentSlug, onClick }: ClusterSidebarTriggerProps) => {
  const currentLang = useBlogLanguage();
  const cluster = getClusterForArticle(currentSlug);
  
  if (!cluster) return null;
  
  const articleCount = 1 + cluster.satellites.length;
  
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className="fixed bottom-20 right-4 z-30 lg:hidden shadow-lg bg-card border-primary/20 hover:border-primary/50"
    >
      <BookOpen className="h-4 w-4 mr-2" />
      <span>{currentLang === 'it' ? 'Serie' : 'Series'}</span>
      <span className="ml-1.5 px-1.5 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
        {articleCount}
      </span>
    </Button>
  );
});

ClusterSidebarTrigger.displayName = 'ClusterSidebarTrigger';
