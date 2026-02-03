import { memo } from "react";
import { BlogPost } from "@/types/blog";
import { Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useBlogLanguage } from "@/hooks/useBlogLanguage";
import { isNewPost, formatDate } from "@/lib/blog";
import { OptimizedImage } from "@/components/OptimizedImage";
import astronautCover from "@/assets/jungle-control-astronaut-cover.png";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCardComponent = ({ post }: BlogCardProps) => {
  const { t } = useTranslation();
  const { trackClick } = useAnalytics();
  const currentLang = useBlogLanguage();
  const prefersReducedMotion = useReducedMotion();
  const translatedData = post.translations[currentLang];

  // Check if this is a Jungle Control series post
  const isJungleControlSeries = translatedData.tags?.some(tag => 
    tag.toLowerCase().includes('jungle control')
  );

  return (
    <article className="blog-card-marvis feel-good-click group h-full flex flex-col rounded-xl overflow-hidden relative border border-border/20 hover:border-primary/30 transition-all">
      {isNewPost(post.date) && <div className="new-badge">Nuovo</div>}
      
      <Link 
        to={`/blog/${post.slug}`} 
        className="block overflow-hidden"
        onClick={() => trackClick('blog_card_image', { slug: post.slug, category: post.category })}
      >
        <div className="aspect-video relative overflow-hidden">
          {isJungleControlSeries ? (
            // Cinematic Interstellar-style astronaut cover
            <div className="w-full h-full relative overflow-hidden">
              <OptimizedImage
                src={astronautCover}
                alt="Astronaut floating in space with Earth - Jungle Control Series"
                className={`w-full h-full ${prefersReducedMotion ? '' : 'transition-transform duration-500 group-hover:scale-105'}`}
                blurPlaceholder
              />
              
              {/* Series badge overlay */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 z-10">
                <span className="text-white text-xs font-medium tracking-wider uppercase">
                  🚀 Jungle Control
                </span>
              </div>
            </div>
          ) : (
            <OptimizedImage
              src={post.image}
              alt={translatedData.title}
              className={`w-full h-full ${prefersReducedMotion ? '' : 'transition-transform duration-300 group-hover:scale-105'}`}
              blurPlaceholder
            />
          )}
          <span className={`absolute top-4 left-4 category-badge ${post.category}`}>
            {t(`blog.categories.${post.category}`)}
          </span>
        </div>
      </Link>

      <div className="flex flex-col flex-1 p-4 sm:p-5 md:p-6">
        <div className="flex items-center gap-3 sm:gap-4 text-xs text-muted-foreground/80 mb-3">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 opacity-60" strokeWidth={1.5} />
            {formatDate(post.date, currentLang)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 opacity-60" strokeWidth={1.5} />
            {post.readTime} min
          </span>
        </div>

        <Link to={`/blog/${post.slug}`}>
          <h3 className="text-lg sm:text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {translatedData.title}
          </h3>
        </Link>

        <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">
          {translatedData.excerpt}
        </p>

        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center text-primary font-medium hover:underline"
          onClick={() => trackClick('blog_card_read_more', { slug: post.slug, category: post.category })}
        >
          {t('blog.readMore')}
          <span className="ml-1">→</span>
        </Link>
      </div>
    </article>
  );
};

export const BlogCard = memo(BlogCardComponent);
