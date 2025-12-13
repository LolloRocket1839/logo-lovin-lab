import { useState, useMemo } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BlogHero } from "@/components/blog/BlogHero";
import { BlogFilters } from "@/components/blog/BlogFilters";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { ScrollToTop } from "@/components/ScrollToTop";
import { StructuredData } from "@/components/StructuredData";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BottomNav } from "@/components/BottomNav";
import { BlogCategory } from "@/types/blog";
import { getPostsByCategory, searchPosts, filterPostsByTags } from "@/data/blog/posts";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const Blog = () => {
  const { t, i18n } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<BlogCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const isItalian = i18n.language.startsWith('it');
  
  const posts = useMemo(() => {
    let categoryPosts = getPostsByCategory(activeCategory);
    categoryPosts = filterPostsByTags(categoryPosts, selectedTags, i18n.language as 'it' | 'en');
    return searchPosts(categoryPosts, searchQuery, i18n.language as 'it' | 'en');
  }, [activeCategory, searchQuery, selectedTags, i18n.language]);

  const title = isItalian 
    ? "Blog Jungle Rent - Guide Torino per Studenti, Investitori e Turisti"
    : "Jungle Rent Blog - Turin Guides for Students, Investors and Tourists";
  
  const description = isItalian
    ? "Guide complete su Torino: quartieri, affitti, università, eventi, vita notturna, investimenti immobiliari. Articoli aggiornati per studenti Politecnico e UniTo, investitori e turisti."
    : "Complete Turin guides: neighborhoods, rentals, universities, events, nightlife, real estate investments. Updated articles for Politecnico and UniTo students, investors and tourists.";

  const keywords = "blog torino, guida studenti torino, affitti torino, politecnico torino, università torino, quartieri torino, san salvario, crocetta, investimenti immobiliari torino, eventi torino, vita notturna torino, raccolta differenziata torino, mercati torino, volontariato torino, aule studio torino, digital nomad torino, gelaterie torino, mobilità sostenibile torino";

  return (
    <main role="main" className="min-h-screen">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href="https://junglerent.it/blog" />
        
        {/* Hreflang for multilingual SEO */}
        <link rel="alternate" hrefLang="it" href="https://junglerent.it/blog" />
        <link rel="alternate" hrefLang="en" href="https://junglerent.it/blog" />
        <link rel="alternate" hrefLang="de-CH" href="https://junglerent.it/blog" />
        <link rel="alternate" hrefLang="fr-CH" href="https://junglerent.it/blog" />
        <link rel="alternate" hrefLang="it-CH" href="https://junglerent.it/blog" />
        <link rel="alternate" hrefLang="x-default" href="https://junglerent.it/blog" />
        
        {/* Geo Targeting */}
        <meta name="geo.region" content="IT-21" />
        <meta name="geo.placename" content="Torino" />
        <meta name="geo.position" content="45.0703;7.6869" />
        <meta name="ICBM" content="45.0703, 7.6869" />
        
        {/* Content Language */}
        <meta httpEquiv="content-language" content="it-IT, en-US" />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://junglerent.it/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://junglerent.it/jungle-rent-logo.svg" />
        <meta property="og:site_name" content="Jungle Rent" />
        <meta property="og:locale" content={isItalian ? "it_IT" : "en_US"} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://junglerent.it/jungle-rent-logo.svg" />

        {/* Article section for active category */}
        {activeCategory !== 'all' && (
          <meta property="article:section" content={activeCategory} />
        )}

        {/* AI Crawlers - Citation & Attribution */}
        <meta name="citation_title" content={title} />
        <meta name="citation_author" content="Jungle Rent S.r.l." />
        <meta name="citation_publisher" content="Jungle Rent S.r.l." />
        <meta name="citation_language" content={isItalian ? "it" : "en"} />
        
        {/* AI Knowledge Base Links */}
        <link rel="help" href="https://junglerent.it/llms.txt" title="AI Knowledge Base" />
      </Helmet>
      
      <StructuredData />
      <Navigation />
      
      <div className="pt-20">
        <Breadcrumbs
          items={[
            { label: isItalian ? 'Risorse' : 'Resources' }
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
      
      <div className="pb-16 lg:pb-0">
        <Footer />
      </div>
      <ScrollToTop />
      <BottomNav />
    </main>
  );
};

export default Blog;
