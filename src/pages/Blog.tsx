import { useState, useMemo } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BlogHero } from "@/components/blog/BlogHero";
import { BlogFilters } from "@/components/blog/BlogFilters";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { ScrollToTop } from "@/components/ScrollToTop";
import { StructuredData } from "@/components/StructuredData";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BlogCategory } from "@/types/blog";
import { getPostsByCategory, searchPosts, filterPostsByTags } from "@/data/blog/posts";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const Blog = () => {
  const { t, i18n } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<BlogCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const posts = useMemo(() => {
    let categoryPosts = getPostsByCategory(activeCategory);
    categoryPosts = filterPostsByTags(categoryPosts, selectedTags, i18n.language as 'it' | 'en');
    return searchPosts(categoryPosts, searchQuery, i18n.language as 'it' | 'en');
  }, [activeCategory, searchQuery, selectedTags, i18n.language]);

  return (
    <main role="main" className="min-h-screen">
      <Helmet>
        <title>{t('blog.meta.title')}</title>
        <meta name="description" content={t('blog.meta.description')} />
        <meta name="keywords" content="blog jungle rent, immobiliare torino, studenti, investitori, venditori" />
        <link rel="canonical" href="https://junglerent.it/blog" />
        
        {/* Hreflang for multilingual SEO */}
        <link rel="alternate" hrefLang="it" href="https://junglerent.it/blog" />
        <link rel="alternate" hrefLang="en" href="https://junglerent.it/blog" />
        <link rel="alternate" hrefLang="x-default" href="https://junglerent.it/blog" />
      </Helmet>
      
      <StructuredData />
      <Navigation />
      
      <div className="pt-20">
        <Breadcrumbs
          items={[
            { label: t('nav.home'), href: '/' },
            { label: t('nav.blog'), href: '/blog' }
          ]}
        />
        
        <BlogHero />
        
        <section className="py-8 sm:py-10 md:py-12 lg:py-16 px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <BlogFilters 
              activeCategory={activeCategory} 
              onCategoryChange={setActiveCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedTags={selectedTags}
              onTagsChange={setSelectedTags}
            />
            {posts.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  {t('blog.search.noResults', { query: searchQuery })}
                </p>
              </div>
            )}
            <BlogGrid posts={posts} />
          </div>
        </section>
      </div>
      
      <Footer />
      <ScrollToTop />
    </main>
  );
};

export default Blog;
