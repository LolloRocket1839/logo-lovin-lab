import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFeaturedPosts } from "@/data/blog/posts";
import { BlogCard } from "./BlogCard";

export const BlogSection = () => {
  const { t } = useTranslation();
  const featuredPosts = getFeaturedPosts(3);

  return (
    <section className="py-20 px-4 border-t border-border">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {t('blog.sectionLabel')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('blog.sectionTitle')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('blog.sectionSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="group">
            <Link to="/blog">
              {t('blog.viewAll')}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
