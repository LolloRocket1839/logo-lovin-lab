import { memo } from "react";
import { BlogPost } from "@/types/blog";
import { useTranslation } from "react-i18next";
import { BlogCard } from "./BlogCard";
import { Layers } from "lucide-react";

interface RelatedPostsProps {
  posts: BlogPost[];
  currentTags?: string[];
}

const RelatedPostsComponent = ({ posts, currentTags = [] }: RelatedPostsProps) => {
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language.startsWith('en') ? 'en' : 'it') as 'it' | 'en';

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
    <section className="py-16 md:py-24 border-t border-border/20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Layers className="h-5 w-5 text-primary" aria-hidden="true" />
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
            {t('blog.relatedPosts', 'Articoli correlati')}
          </h2>
        </div>
        <p className="text-muted-foreground mb-12 max-w-2xl">
          {currentLang === 'it' 
            ? 'Scopri altri contenuti selezionati per te in base agli argomenti di questo articolo.'
            : 'Discover more content selected for you based on this article\'s topics.'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {postsWithSharedTags.map(({ post, sharedTags }) => (
            <div key={post.slug} className="relative">
              <BlogCard post={post} />
              {sharedTags.length > 0 && (
                <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-full shadow-md">
                  {sharedTags.length} {currentLang === 'it' ? 'tag in comune' : 'shared tags'}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const RelatedPosts = memo(RelatedPostsComponent);
