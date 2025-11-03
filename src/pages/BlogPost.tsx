import { useParams, Navigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { StructuredData } from "@/components/StructuredData";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BlogCTA } from "@/components/blog/BlogCTA";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { getPostBySlug, getRelatedPosts } from "@/data/blog/posts";
import { Calendar, Clock, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  
  if (!slug) return <Navigate to="/blog" replace />;
  
  const post = getPostBySlug(slug);
  
  if (!post) return <Navigate to="/blog" replace />;
  
  const relatedPosts = getRelatedPosts(post.slug, post.category);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
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

  // Sample content for demonstration - in production, load from markdown files
  const articleContent = `
## Introduzione

Questo è un articolo di esempio che dimostra il sistema di blog di Jungle Rent. Il contenuto reale verrà caricato da file Markdown.

### Punti Chiave

- **Informazioni verificate**: Tutti i dati sono aggiornati al 2026
- **Consigli pratici**: Suggerimenti applicabili immediatamente
- **Risorse utili**: Link e strumenti per approfondire

## Sezione Principale

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

### Sottosezione

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

## Conclusioni

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
  `;

  return (
    <main role="main" className="min-h-screen">
      <Helmet>
        <title>{post.seo.title}</title>
        <meta name="description" content={post.seo.description} />
        <meta name="keywords" content={post.seo.keywords.join(', ')} />
        <link rel="canonical" href={`https://junglerent.it/blog/${post.slug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={post.seo.title} />
        <meta property="og:description" content={post.seo.description} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.seo.title} />
        <meta name="twitter:description" content={post.seo.description} />
        <meta name="twitter:image" content={post.image} />
      </Helmet>
      
      <StructuredData />
      <Navigation />
      
      <div className="pt-20">
        <Breadcrumbs
          items={[
            { label: t('nav.home'), href: '/' },
            { label: t('nav.blog'), href: '/blog' },
            { label: post.title, href: `/blog/${post.slug}` }
          ]}
        />
        
        <article className="py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            {/* Header */}
            <header className="mb-8">
              <Badge className={`mb-4 ${getCategoryColor(post.category)}`}>
                {t(`blog.categories.${post.category}`)}
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
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

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-2" />
                  {t('blog.share')}
                </Button>
              </div>
            </header>

            {/* Featured Image */}
            <div className="aspect-video rounded-lg overflow-hidden mb-12">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {articleContent}
              </ReactMarkdown>
            </div>

            {/* CTA */}
            <BlogCTA type={post.category} />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-8 border-t border-border">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        </article>

        {/* Related Posts */}
        <RelatedPosts posts={relatedPosts} />
      </div>
      
      <Footer />
      <ScrollToTop />
    </main>
  );
};

export default BlogPost;
