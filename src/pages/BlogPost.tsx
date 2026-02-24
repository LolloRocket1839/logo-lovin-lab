import { useParams, Navigate } from "react-router-dom";
import { Navigation, Footer } from "@/components/layout";
import { ScrollToTop } from "@/components/ScrollToTop";
import { StructuredData } from "@/components/StructuredData";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BlogCTA } from "@/components/blog/BlogCTA";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { ShareButton } from "@/components/blog/ShareButton";
import { AnimatedBlogContent } from "@/components/blog/AnimatedBlogContent";
import { ParallaxHeroImage } from "@/components/blog/ParallaxHeroImage";
import { IPhoneNotesTemplate } from "@/components/blog/IPhoneNotesTemplate";
import { FloatingTableOfContents } from "@/components/blog/FloatingTableOfContents";
import { ClusterSidebar, ClusterSidebarTrigger } from "@/components/blog/ClusterSidebar";
import { getPostBySlug, getRelatedPosts } from "@/data/blog/posts";
import { getClusterForArticle } from "@/data/blog/contentClusters";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { useBlogLanguage, type BlogLanguage } from "@/hooks/useBlogLanguage";
import { BlogLanguageToggle } from "@/components/blog/BlogLanguageToggle";
import { getCategoryColor, getAbsoluteImageUrl, formatDate } from "@/lib/blog";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const [content, setContent] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const globalLang = useBlogLanguage();
  const [langOverride, setLangOverride] = useState<BlogLanguage | null>(null);
  const currentLang = langOverride ?? globalLang;
  
  const post = slug ? getPostBySlug(slug) : null;
  const translatedData = post?.translations[currentLang];
  const currentTags = translatedData?.tags || [];
  const relatedPosts = post ? getRelatedPosts(post.slug, post.category, currentTags, currentLang) : [];

  useEffect(() => {
    const loadContent = async () => {
      if (!post?.content) {
        setContent(`
## Introduzione

Questo è un articolo di esempio. Il contenuto reale verrà caricato a breve.

### Punti Chiave

- **Informazioni verificate**: Tutti i dati sono aggiornati al 2025
- **Consigli pratici**: Suggerimenti applicabili immediatamente
- **Risorse utili**: Link e strumenti per approfondire

## Sezione Principale

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## Conclusioni

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        `);
        return;
      }
      
      try {
        const contentModule = await import(`@/data/blog/content/${currentLang}/${post.content}.md?raw`);
        setContent(contentModule.default);
      } catch (error) {
        console.error("Error loading blog content:", error);
        try {
          const fallbackModule = await import(`@/data/blog/content/it/${post.content}.md?raw`);
          setContent(fallbackModule.default);
        } catch (fallbackError) {
          setContent(`
## Introduzione

Questo è un articolo di esempio. Il contenuto reale verrà caricato a breve.
          `);
        }
      }
    };

    loadContent();
  }, [post?.content, currentLang]);

  // Guard clauses after hooks
  if (!slug) return <Navigate to="/blog" replace />;
  if (!post || !translatedData) return <Navigate to="/blog" replace />;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: translatedData.title,
          text: translatedData.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  const absoluteImageUrl = getAbsoluteImageUrl(post.image);

  // Structured Data Schemas
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": translatedData.title,
    "description": translatedData.excerpt,
    "image": absoluteImageUrl,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Jungle Rent",
      "logo": {
        "@type": "ImageObject",
        "url": "https://junglerent.it/jungle-rent-logo.svg"
      }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://junglerent.it/blog/${post.slug}`
    },
    "keywords": translatedData.seo.keywords.join(", "),
    "articleSection": post.category,
    "inLanguage": currentLang
  };

  const categoryName = t(`blog.categories.${post.category}`);
  
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://junglerent.it/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://junglerent.it/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": categoryName,
        "item": `https://junglerent.it/blog?category=${post.category}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": translatedData.title,
        "item": `https://junglerent.it/blog/${post.slug}`
      }
    ]
  };

  // FAQPage schema - dynamically generated from post.translations[lang].faqs
  const faqSchema = translatedData.faqs && translatedData.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": translatedData.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <main role="main" className="min-h-screen">
      <Helmet>
        <title>{translatedData.seo.title}</title>
        <meta name="description" content={translatedData.seo.description} />
        <meta name="keywords" content={translatedData.seo.keywords.join(', ')} />
        <link rel="canonical" href={`https://junglerent.it/blog/${post.slug}`} />
        
        {/* Hreflang for multilingual SEO */}
        <link rel="alternate" hrefLang="it" href={`https://junglerent.it/blog/${post.slug}`} />
        <link rel="alternate" hrefLang="en" href={`https://junglerent.it/blog/${post.slug}`} />
        <link rel="alternate" hrefLang="x-default" href={`https://junglerent.it/blog/${post.slug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={translatedData.seo.title} />
        <meta property="og:description" content={translatedData.seo.description} />
        <meta property="og:image" content={absoluteImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={`https://junglerent.it/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Jungle Rent" />
        <meta property="og:locale" content={currentLang === 'it' ? "it_IT" : "en_US"} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:modified_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        <meta property="article:section" content={post.category} />
        {translatedData.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@junglerent" />
        <meta name="twitter:title" content={translatedData.seo.title} />
        <meta name="twitter:description" content={translatedData.seo.description} />
        <meta name="twitter:image" content={absoluteImageUrl} />
        <meta name="twitter:image:alt" content={translatedData.title} />

        {/* AI Crawlers - Citation & Attribution for Articles */}
        <meta name="citation_title" content={translatedData.seo.title} />
        <meta name="citation_author" content={post.author} />
        <meta name="citation_publication_date" content={post.date} />
        <meta name="citation_online_date" content={post.date} />
        <meta name="citation_publisher" content="Jungle Rent S.r.l." />
        <meta name="citation_language" content={currentLang} />
        <meta name="citation_keywords" content={translatedData.seo.keywords.join('; ')} />
        <meta name="citation_abstract" content={translatedData.excerpt} />
        <meta name="citation_fulltext_html_url" content={`https://junglerent.it/blog/${post.slug}`} />
        
        {/* AI Knowledge Base Links */}
        <link rel="help" href="https://junglerent.it/llms.txt" title="AI Knowledge Base" />

        {/* Structured Data - Article Schema */}
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
        
        {/* Structured Data - Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        
        {/* Structured Data - FAQ Schema */}
        {faqSchema && (
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        )}
      </Helmet>
      
      <StructuredData />
      <Navigation />
      
      
      <div className="pt-20">
        <Breadcrumbs
          items={[
            { label: t('nav.blog'), href: '/blog' },
            { label: t(`blog.categories.${post.category}`), href: `/blog?category=${post.category}` },
            { label: translatedData.title }
          ]}
        />
        
        {/* Main layout with optional sidebar */}
        <div className="lg:flex lg:gap-8 lg:px-8">
          {/* Main article content */}
          <article className="py-12 md:py-16 px-4 md:px-0 flex-1 lg:max-w-4xl">
            <div className="container mx-auto lg:mx-0">
            {/* iPhone Notes Template for special posts */}
            {post.noteStyle ? (
              <>
                <IPhoneNotesTemplate 
                  content={content} 
                  title={translatedData.title}
                  date={post.date}
                />
                
                {/* Share and Tags below the phone */}
                <div className="max-w-2xl mx-auto mt-8 space-y-6">
                  <ShareButton 
                    title={translatedData.title}
                    excerpt={translatedData.excerpt}
                    url={window.location.href}
                  />
                  
                  <div className="flex flex-wrap gap-2 pt-6 border-t border-border/20">
                    {translatedData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* CTA */}
                <BlogCTA type={post.category} />
              </>
            ) : (
              <>
                {/* Header */}
                <header className="mb-6 sm:mb-8">
                  <Badge className={`mb-3 sm:mb-4 ${getCategoryColor(post.category)}`}>
                    {t(`blog.categories.${post.category}`)}
                  </Badge>
                  
                  <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
                    {translatedData.title}
                  </h1>
                  
                  <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {formatDate(post.date, currentLang)}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {post.readTime} min di lettura
                    </span>
                    <span>{post.author}</span>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    <ShareButton 
                      title={translatedData.title}
                      excerpt={translatedData.excerpt}
                      url={window.location.href}
                    />
                    <BlogLanguageToggle currentLang={currentLang} onToggle={setLangOverride} />
                  </div>
                </header>

                {/* Featured Image with Parallax */}
                <ParallaxHeroImage src={post.image} alt={translatedData.title} />

                {/* Animated Content with Auto-Linking */}
                <AnimatedBlogContent content={content} slug={post.slug} lang={currentLang} />

                {/* Floating Table of Contents (Desktop) */}
                <FloatingTableOfContents content={content} />

                {/* CTA */}
                <BlogCTA type={post.category} />

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-8 border-t border-border/20">
                  {translatedData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </>
            )}
          </div>
        </article>
          
          {/* Cluster Sidebar - Desktop */}
          {getClusterForArticle(slug) && (
            <div className="hidden lg:block lg:w-80 lg:flex-shrink-0 py-12">
              <ClusterSidebar 
                currentSlug={slug} 
                isOpen={true} 
                onClose={() => {}} 
              />
            </div>
          )}
        </div>

        {/* Related Posts */}
        <RelatedPosts posts={relatedPosts} currentTags={currentTags} />
        
        {/* Mobile Sidebar Trigger & Sidebar */}
        <ClusterSidebarTrigger 
          currentSlug={slug} 
          onClick={() => setSidebarOpen(true)} 
        />
        <ClusterSidebar 
          currentSlug={slug} 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
      </div>
      
      <Footer />
      <ScrollToTop />
    </main>
  );
};

export default BlogPost;
