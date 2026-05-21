import { useParams, Navigate } from "react-router-dom";
import { Navigation, Footer } from "@/components/layout";
import { ScrollToTop } from "@/components/ScrollToTop";
import ArticleStructuredData from "@/components/blog/ArticleStructuredData";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BlogCTA } from "@/components/blog/BlogCTA";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { ShareButton } from "@/components/blog/ShareButton";
import { ContractBanner } from "@/components/blog/ContractBanner";
import { ContractSidebarCard } from "@/components/blog/ContractSidebarCard";
import { AnimatedBlogContent } from "@/components/blog/AnimatedBlogContent";
import { InlineContextualCTA } from "@/components/blog/InlineContextualCTA";
import { hasInlineCTA } from "@/data/blog/inlineCTAs";
import { ParallaxHeroImage } from "@/components/blog/ParallaxHeroImage";
import { IPhoneNotesTemplate } from "@/components/blog/IPhoneNotesTemplate";
import { FloatingTableOfContents } from "@/components/blog/FloatingTableOfContents";
import { EmailGate } from "@/components/blog/EmailGate";
import { ClusterSidebar, ClusterSidebarTrigger } from "@/components/blog/ClusterSidebar";
import { ReadingProgressBar } from "@/components/blog/ReadingProgressBar";
import { StickyArticleHeader } from "@/components/blog/StickyArticleHeader";
import { ReadingModeProvider, useReadingMode } from "@/components/blog/ReadingModeProvider";
import { getPostBySlug, getRelatedPosts } from "@/data/blog/posts";
import { getClusterForArticle } from "@/data/blog/contentClusters";
import { useAutoBlogPost, autoBlogPostToBlogPost } from "@/hooks/useAutoBlogPosts";
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
  
  // Try static posts first, then dynamic
  const staticPost = slug ? getPostBySlug(slug) : null;
  const { data: autoPostData } = useAutoBlogPost(staticPost ? "" : (slug || ""));
  const autoPost = autoPostData ? autoBlogPostToBlogPost(autoPostData) : null;
  const post = staticPost || autoPost;
  const isAutoPost = !staticPost && !!autoPost;
  
  const translatedData = post?.translations[currentLang];
  const currentTags = translatedData?.tags || [];
  const relatedPosts = post ? getRelatedPosts(post.slug, post.category, currentTags, currentLang) : [];

  useEffect(() => {
    const loadContent = async () => {
      if (!post?.content) {
        setContent("## Contenuto non disponibile");
        return;
      }

      // Auto-generated posts: content comes from DB
      if (post.content.startsWith("__auto__")) {
        if (autoPostData) {
          const dbContent = currentLang === 'it' ? autoPostData.content_it : autoPostData.content_en;
          setContent(dbContent);
        }
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
          setContent("## Contenuto non disponibile");
        }
      }
    };

    loadContent();
  }, [post?.content, currentLang, autoPostData]);

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
  const canonicalUrl = `https://junglerent.it/blog/${post.slug}`;

  return (
    <main role="main" className="min-h-screen">
      <Helmet>
        <title>{translatedData.seo.title}</title>
        <meta name="description" content={translatedData.seo.description} />
        <meta name="keywords" content={translatedData.seo.keywords.join(', ')} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Hreflang for multilingual SEO */}
        <link rel="alternate" hrefLang="it" href={canonicalUrl} />
        <link rel="alternate" hrefLang="en" href={canonicalUrl} />
        <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={translatedData.seo.title} />
        <meta property="og:description" content={translatedData.seo.description} />
        <meta property="og:image" content={absoluteImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={canonicalUrl} />
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

        {/* AI Knowledge Base Links */}
        <link rel="help" href="https://junglerent.it/llms.txt" title="AI Knowledge Base" />
      </Helmet>
      
      {/* Page-specific structured data: Article + Breadcrumb + FAQ */}
      <ArticleStructuredData 
        post={post} 
        language={currentLang} 
        url={canonicalUrl} 
      />
      
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
        <div className="max-w-7xl mx-auto lg:flex lg:gap-8 lg:px-8">
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

                {/* Animated Content with Auto-Linking — optionally gated */}
                {post.gated ? (
                  <EmailGate slug={post.slug} lang={currentLang}>
                    <AnimatedBlogContent content={content} slug={post.slug} lang={currentLang} />
                    <FloatingTableOfContents content={content} />
                  </EmailGate>
                ) : (
                  <>
                    <AnimatedBlogContent content={content} slug={post.slug} lang={currentLang} />
                    <FloatingTableOfContents content={content} />
                  </>
                )}

                {/* Inline contextual CTA for top 5 most-viewed articles */}
                {hasInlineCTA(post.slug) && (
                  <InlineContextualCTA slug={post.slug} lang={currentLang} />
                )}

                {/* Contract Banner for investor/seller articles */}
                {(post.category === 'investors' || post.category === 'sellers') && (
                  <ContractBanner />
                )}

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
            <div className="hidden lg:block lg:w-80 lg:flex-shrink-0 py-12 space-y-6">
              <ClusterSidebar 
                currentSlug={slug} 
                isOpen={true} 
                onClose={() => {}} 
              />
              {(post.category === 'investors' || post.category === 'sellers') && (
                <ContractSidebarCard />
              )}
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
