import { BlogPost } from "@/types/blog";
import { useTranslation } from "react-i18next";
import { BlogCard } from "./BlogCard";
import { Sparkles } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface RelatedPostsProps {
  posts: BlogPost[];
  currentTags?: string[];
}

export const RelatedPosts = ({ posts, currentTags = [] }: RelatedPostsProps) => {
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language.startsWith('en') ? 'en' : 'it') as 'it' | 'en';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  if (posts.length === 0) return null;

  // Calculate shared tags for each related post
  const postsWithSharedTags = posts.map(post => {
    const postTags = post.translations?.[currentLang]?.tags || post.translations?.it?.tags || [];
    const sharedTags = currentTags.filter(tag => 
      postTags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
    );
    return { post, sharedTags };
  });

  return (
    <section className="py-16 border-t border-border bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center gap-3 mb-8">
          <Sparkles className="h-6 w-6 text-primary" aria-hidden="true" />
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">
            {t('blog.relatedPosts', 'Articoli correlati')}
          </h2>
        </div>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          {currentLang === 'it' 
            ? 'Scopri altri contenuti selezionati per te in base agli argomenti di questo articolo.'
            : 'Discover more content selected for you based on this article\'s topics.'}
        </p>
        <motion.div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3 }}
        >
          {postsWithSharedTags.map(({ post, sharedTags }, index) => (
            <motion.div 
              key={post.slug} 
              className="relative"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                delay: prefersReducedMotion ? 0 : index * 0.1, 
                duration: 0.4,
                ease: "easeOut"
              }}
            >
              <BlogCard post={post} />
              {sharedTags.length > 0 && (
                <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-full shadow-md">
                  {sharedTags.length} {currentLang === 'it' ? 'tag in comune' : 'shared tags'}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
