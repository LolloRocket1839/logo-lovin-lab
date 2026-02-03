import { memo } from "react";
import { Link } from "react-router-dom";
import { Crown, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useBlogLanguage } from "@/hooks/useBlogLanguage";
import { contentClusters } from "@/data/blog/contentClusters";
import { getPostBySlug } from "@/data/blog/posts";
import { OptimizedImage } from "@/components/OptimizedImage";
import { PillarBadge } from "./PillarBadge";

const PillarArticlesSectionComponent = () => {
  const { t } = useTranslation();
  const currentLang = useBlogLanguage();
  
  // Get all pillar articles with their blog post data
  const pillarArticles = contentClusters
    .map(cluster => {
      const post = getPostBySlug(cluster.pillar);
      if (!post) return null;
      return {
        ...cluster,
        post
      };
    })
    .filter(Boolean);

  const sectionTitle = currentLang === 'it' ? 'Guide complete' : 'Complete guides';
  const sectionSubtitle = currentLang === 'it' 
    ? 'Le nostre guide approfondite per ogni esigenza'
    : 'Our in-depth guides for every need';

  return (
    <section className="py-8 md:py-12">
      <div className="flex items-center gap-3 mb-2">
        <Crown className="h-6 w-6 text-primary" />
        <h2 className="text-2xl md:text-3xl font-bold">{sectionTitle}</h2>
      </div>
      <p className="text-muted-foreground mb-6">{sectionSubtitle}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {pillarArticles.map((item) => {
          if (!item) return null;
          const { post, pillar } = item;
          const translation = post.translations[currentLang];
          
          return (
            <Link
              key={pillar}
              to={`/blog/${pillar}`}
              className="group relative flex flex-col rounded-xl overflow-hidden border-2 border-primary/20 hover:border-primary/50 bg-gradient-to-br from-primary/5 to-accent/5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              {/* Image */}
              <div className="aspect-[16/9] relative overflow-hidden">
                <OptimizedImage
                  src={post.image}
                  alt={translation.title}
                  className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                  blurPlaceholder
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                
                {/* Badge positioned on image */}
                <div className="absolute top-3 left-3">
                  <PillarBadge slug={pillar} lang={currentLang} />
                </div>
                
                {/* Category badge */}
                <span className={`absolute top-3 right-3 category-badge ${post.category}`}>
                  {t(`blog.categories.${post.category}`)}
                </span>
              </div>
              
              {/* Content */}
              <div className="flex flex-col flex-1 p-4">
                <h3 className="font-bold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {translation.title}
                </h3>
                
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-1">
                  {translation.excerpt}
                </p>
                
                <div className="flex items-center text-sm font-medium text-primary">
                  <span>{currentLang === 'it' ? 'Leggi la guida' : 'Read guide'}</span>
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export const PillarArticlesSection = memo(PillarArticlesSectionComponent);
