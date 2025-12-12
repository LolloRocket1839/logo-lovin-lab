import { useParams, Navigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { StructuredData } from "@/components/StructuredData";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BlogCTA } from "@/components/blog/BlogCTA";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { ShareButton } from "@/components/blog/ShareButton";
import { getPostBySlug, getRelatedPosts } from "@/data/blog/posts";
import { Calendar, Clock, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useState, useEffect } from "react";
import type { Components } from "react-markdown";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const [content, setContent] = useState<string>("");
  const currentLang = (i18n.language.startsWith('en') ? 'en' : 'it') as 'it' | 'en';
  
  if (!slug) return <Navigate to="/blog" replace />;
  
  const post = getPostBySlug(slug);
  
  if (!post) return <Navigate to="/blog" replace />;
  
  const translatedData = post.translations[currentLang];
  const currentTags = translatedData?.tags || [];
  const relatedPosts = getRelatedPosts(post.slug, post.category, currentTags, currentLang);

  useEffect(() => {
    const loadContent = async () => {
      if (post.content) {
        try {
          const contentModule = await import(`@/data/blog/content/${currentLang}/${post.content}.md?raw`);
          setContent(contentModule.default);
        } catch (error) {
          console.error("Error loading blog content:", error);
          // Fallback to Italian if translation not available
          try {
            const fallbackModule = await import(`@/data/blog/content/it/${post.content}.md?raw`);
            setContent(fallbackModule.default);
          } catch (fallbackError) {
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
          }
        }
      } else {
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
      }
    };

    loadContent();
  }, [post.content, currentLang]);

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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'students':
        return 'bg-primary/10 text-primary';
      case 'investors':
        return 'bg-secondary/10 text-secondary-foreground';
      case 'sellers':
        return 'bg-accent/10 text-accent-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  // Custom components for ReactMarkdown to handle IDs
  const markdownComponents: Components = {
    h2: ({ children, ...props }) => {
      const text = String(children);
      const match = text.match(/^(.*?)\s*\{#([^}]+)\}$/);
      if (match) {
        const [, title, id] = match;
        return <h2 id={id} {...props}>{title}</h2>;
      }
      return <h2 {...props}>{children}</h2>;
    },
    h3: ({ children, ...props }) => {
      const text = String(children);
      const match = text.match(/^(.*?)\s*\{#([^}]+)\}$/);
      if (match) {
        const [, title, id] = match;
        return <h3 id={id} {...props}>{title}</h3>;
      }
      return <h3 {...props}>{children}</h3>;
    },
    a: ({ href, children, ...props }) => {
      // Handle internal anchor links
      if (href?.startsWith('#')) {
        return (
          <a
            href={href}
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById(href.slice(1));
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Update URL hash without jumping
                window.history.pushState(null, '', href);
              }
            }}
            {...props}
          >
            {children}
          </a>
        );
      }
      return <a href={href} {...props}>{children}</a>;
    },
  };

  // Helper function to get absolute image URL
  const getAbsoluteImageUrl = (imageUrl: string) => {
    if (imageUrl.startsWith('http')) return imageUrl;
    return `https://junglerent.it${imageUrl}`;
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
            { label: translatedData.title }
          ]}
        />
        
        <article className="py-8 sm:py-10 md:py-12 px-3 sm:px-4 md:px-6">
          <div className="container mx-auto max-w-4xl">
            {/* Header */}
            <header className="mb-6 sm:mb-8">
              <Badge className={`mb-3 sm:mb-4 ${getCategoryColor(post.category)}`}>
                {t(`blog.categories.${post.category}`)}
              </Badge>
              
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
                {translatedData.title}
              </h1>
              
              <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString('it-IT', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime} min di lettura
                </span>
                <span>{post.author}</span>
              </div>

              <ShareButton 
                title={translatedData.title}
                excerpt={translatedData.excerpt}
                url={window.location.href}
              />
            </header>

            {/* Featured Image */}
            <div className="aspect-video rounded-lg overflow-hidden mb-12">
              <img
                src={post.image}
                alt={translatedData.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="prose prose-sm sm:prose-base md:prose-lg lg:prose-xl prose-slate dark:prose-invert max-w-none blog-content-wrapper mb-12 prose-headings:scroll-mt-20 prose-a:text-primary prose-strong:font-bold prose-table:overflow-x-auto prose-pre:overflow-x-auto overflow-x-hidden">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={markdownComponents}
              >
                {content}
              </ReactMarkdown>
            </div>

            {/* CTA */}
            <BlogCTA type={post.category} />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-6 sm:pt-8 border-t border-border">
              {translatedData.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        </article>

        {/* Related Posts */}
        <RelatedPosts posts={relatedPosts} currentTags={currentTags} />
      </div>
      
      <Footer />
      <ScrollToTop />
    </main>
  );
};

export default BlogPost;
