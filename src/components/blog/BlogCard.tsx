import { BlogPost } from "@/types/blog";
import { Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAnalytics } from "@/hooks/useAnalytics";

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard = ({ post }: BlogCardProps) => {
  const { t, i18n } = useTranslation();
  const { trackClick } = useAnalytics();
  const currentLang = (i18n.language.startsWith('en') ? 'en' : 'it') as 'it' | 'en';
  const translatedData = post.translations[currentLang];

  // Helper to check if post is new (< 7 days)
  const isNew = (dateString: string) => {
    const postDate = new Date(dateString);
    const daysSince = (Date.now() - postDate.getTime()) / (1000 * 60 * 60 * 24);
    return daysSince <= 7;
  };

  return (
    <article className="blog-card-marvis feel-good-click group h-full flex flex-col rounded-lg overflow-hidden relative">
      {isNew(post.date) && <div className="new-badge">Nuovo</div>}
      
      <Link 
        to={`/blog/${post.slug}`} 
        className="block overflow-hidden"
        onClick={() => trackClick('blog_card_image', { slug: post.slug, category: post.category })}
      >
        <div className="aspect-video relative overflow-hidden">
          <img
            src={post.image}
            alt={translatedData.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <span className={`absolute top-4 left-4 category-badge ${post.category}`}>
            {t(`blog.categories.${post.category}`)}
          </span>
        </div>
      </Link>

      <div className="flex flex-col flex-1 p-4 sm:p-5 md:p-6">
        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(post.date).toLocaleDateString('it-IT', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
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
