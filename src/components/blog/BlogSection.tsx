import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blog/posts";
import { BlogCardMarvis } from "./BlogCardMarvis";

export const BlogSection = () => {
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language.startsWith('en') ? 'en' : 'it') as 'it' | 'en';
  
  // Sort posts by date (most recent first)
  const sortedPosts = [...blogPosts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  const featuredPost = sortedPosts[0];
  const secondaryPosts = sortedPosts.slice(1, 4);
  
  // Helper to check if post is new (< 7 days)
  const isNew = (dateString: string) => {
    const postDate = new Date(dateString);
    const daysSince = (Date.now() - postDate.getTime()) / (1000 * 60 * 60 * 24);
    return daysSince <= 7;
  };

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 gradient-jungle-blog pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {t('blog.sectionLabel')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Guide Complete su Torino
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Scopri la città attraverso le nostre guide autentiche
          </p>
        </div>

        {/* Featured Hero Post */}
        {featuredPost && (
          <Link to={`/blog/${featuredPost.slug}`}>
            <div className="blog-card-marvis feel-good-click mb-12 rounded-2xl overflow-hidden bg-cream/50 backdrop-blur-sm relative group">
              {isNew(featuredPost.date) && (
                <div className="new-badge">Nuovo</div>
              )}
              
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative h-64 md:h-full">
                  <img 
                    src={featuredPost.image}
                    alt={featuredPost.translations[currentLang].title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="eager"
                  />
                </div>
                
                {/* Content */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`category-badge ${featuredPost.category}`}>
                      {t(`blog.categories.${featuredPost.category}`)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {featuredPost.readTime} min
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {featuredPost.translations[currentLang].title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {featuredPost.translations[currentLang].excerpt}
                  </p>
                  
                  <Button variant="premium" className="feel-good-click w-fit">
                    Leggi la Guida
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Grid Secondary Posts */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {secondaryPosts.map(post => (
            <BlogCardMarvis key={post.slug} post={post} isNew={isNew(post.date)} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button asChild size="lg" className="group feel-good-click" variant="premium">
            <Link to="/blog">
              Esplora Tutte le Guide
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
