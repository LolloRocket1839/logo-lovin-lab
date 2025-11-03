import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BlogHero } from "@/components/blog/BlogHero";
import { BlogFilters } from "@/components/blog/BlogFilters";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { ScrollToTop } from "@/components/ScrollToTop";
import { StructuredData } from "@/components/StructuredData";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BlogCategory } from "@/types/blog";
import { getPostsByCategory } from "@/data/blog/posts";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const Blog = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<BlogCategory>('all');
  const posts = getPostsByCategory(activeCategory);

  return (
    <main role="main" className="min-h-screen">
      <Helmet>
        <title>{t('blog.meta.title')}</title>
        <meta name="description" content={t('blog.meta.description')} />
        <meta name="keywords" content="blog jungle rent, immobiliare torino, studenti, investitori, venditori" />
        <link rel="canonical" href="https://junglerent.it/blog" />
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
        
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <BlogFilters 
              activeCategory={activeCategory} 
              onCategoryChange={setActiveCategory} 
            />
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
