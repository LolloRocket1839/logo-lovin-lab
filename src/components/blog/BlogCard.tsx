import { BlogPost } from "@/types/blog";
import { Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard = ({ post }: BlogCardProps) => {
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language.startsWith('en') ? 'en' : 'it') as 'it' | 'en';
  const translatedData = post.translations[currentLang];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'students':
        return 'bg-primary/10 text-primary hover:bg-primary/20';
      case 'investors':
        return 'bg-secondary/10 text-secondary-foreground hover:bg-secondary/20';
      case 'sellers':
        return 'bg-accent/10 text-accent-foreground hover:bg-accent/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <article className="group h-full flex flex-col bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
      <Link to={`/blog/${post.slug}`} className="block overflow-hidden">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={post.image}
            alt={translatedData.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <Badge className={`absolute top-4 left-4 ${getCategoryColor(post.category)}`}>
            {t(`blog.categories.${post.category}`)}
          </Badge>
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
        >
          {t('blog.readMore')}
          <span className="ml-1">→</span>
        </Link>
      </div>
    </article>
  );
};
