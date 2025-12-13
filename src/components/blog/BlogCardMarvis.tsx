import { BlogPost } from "@/types/blog";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface BlogCardMarvisProps {
  post: BlogPost;
  isNew: boolean;
}

export const BlogCardMarvis = ({ post, isNew }: BlogCardMarvisProps) => {
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language.startsWith('en') ? 'en' : 'it') as 'it' | 'en';
  const prefersReducedMotion = useReducedMotion();
  const translatedData = post.translations[currentLang];

  return (
    <Link to={`/blog/${post.slug}`} className="group">
      <article className="blog-card-marvis feel-good-click rounded-xl overflow-hidden h-full flex flex-col relative">
        {isNew && <div className="new-badge">Nuovo</div>}
        
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={post.image}
            alt={translatedData.title}
            className={`w-full h-full object-cover ${prefersReducedMotion ? '' : 'transition-transform duration-300 group-hover:scale-105'}`}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            width={400}
            height={225}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          />
        </div>
        
        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className={`category-badge ${post.category}`}>
              {t(`blog.categories.${post.category}`)}
            </span>
            <span className="text-xs text-muted-foreground">
              {post.readTime} min
            </span>
          </div>
          
          <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {translatedData.title}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
            {translatedData.excerpt}
          </p>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{new Date(post.date).toLocaleDateString(currentLang)}</span>
            <ArrowRight className={`w-4 h-4 ${prefersReducedMotion ? '' : 'transition-transform group-hover:translate-x-1'}`} />
          </div>
        </div>
      </article>
    </Link>
  );
};
