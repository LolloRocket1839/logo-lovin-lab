import { useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Calendar, Clock } from "lucide-react";
import ArticleStructuredData from "@/components/blog/ArticleStructuredData";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { ShareButton } from "@/components/blog/ShareButton";
import { BlogContent } from "@/components/blog/BlogContent";
import { BlogEndCTA } from "@/components/blog/BlogEndCTA";
import { BlogLanguageToggle } from "@/components/blog/BlogLanguageToggle";
import { Badge } from "@/components/ui/badge";
import { getPostBySlug, getRelatedPosts } from "@/data/blog/posts";
import { useAutoBlogPost, autoBlogPostToBlogPost } from "@/hooks/useAutoBlogPosts";
import { useBlogLanguage, type BlogLanguage } from "@/hooks/useBlogLanguage";
import { getCategoryColor, getAbsoluteImageUrl, formatDate } from "@/lib/blog";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const [content, setContent] = useState<string>("");
  const globalLang = useBlogLanguage();
  const [langOverride, setLangOverride] = useState<BlogLanguage | null>(null);
  const currentLang = langOverride ?? globalLang;

  const staticPost = slug ? getPostBySlug(slug) : null;
  const { data: autoPostData } = useAutoBlogPost(staticPost ? "" : slug || "");
  const autoPost = autoPostData ? autoBlogPostToBlogPost(autoPostData) : null;
  const post = staticPost || autoPost;

  const translatedData = post?.translations[currentLang];
  const currentTags = translatedData?.tags || [];
  const relatedPosts = post ? getRelatedPosts(post.slug, post.category, currentTags, currentLang).slice(0, 3) : [];

  useEffect(() => {
    const loadContent = async () => {
      if (!post?.content) {
        setContent("## Contenuto non disponibile");
        return;
      }
      if (post.content.startsWith("__auto__")) {
        if (autoPostData) {
          setContent(currentLang === "it" ? autoPostData.content_it : autoPostData.content_en);
        }
        return;
      }
      try {
        const mod = await import(`@/data/blog/content/${currentLang}/${post.content}.md?raw`);
        setContent(mod.default);
      } catch {
        try {
          const fallback = await import(`@/data/blog/content/it/${post.content}.md?raw`);
          setContent(fallback.default);
        } catch {
          setContent("## Contenuto non disponibile");
        }
      }
    };
    loadContent();
  }, [post?.content, currentLang, autoPostData]);

  if (!slug) return <Navigate to="/blog" replace />;
  if (!post || !translatedData) return <Navigate to="/blog" replace />;

  const absoluteImageUrl = getAbsoluteImageUrl(post.image);
  const canonicalUrl = `https://junglerent.it/blog/${post.slug}`;

  return (
    <main role="main">
      <Helmet>
        <title>{translatedData.seo.title}</title>
        <meta name="description" content={translatedData.seo.description} />
        <meta name="keywords" content={translatedData.seo.keywords.join(", ")} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={translatedData.seo.title} />
        <meta property="og:description" content={translatedData.seo.description} />
        <meta property="og:image" content={absoluteImageUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <ArticleStructuredData post={post} language={currentLang} url={canonicalUrl} />

      <article className="container mx-auto max-w-[720px] px-4 py-16 md:py-24">
        <Badge className={`mb-4 ${getCategoryColor(post.category)}`}>
          {t(`blog.categories.${post.category}`)}
        </Badge>

        <h1 className="font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
          {translatedData.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            {formatDate(post.date, currentLang)}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {post.readTime} min
          </span>
          <span>{post.author}</span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <ShareButton
            title={translatedData.title}
            excerpt={translatedData.excerpt}
            url={typeof window !== "undefined" ? window.location.href : canonicalUrl}
          />
          <BlogLanguageToggle currentLang={currentLang} onToggle={setLangOverride} />
        </div>

        <img
          src={post.image}
          alt={translatedData.title}
          className="mt-8 w-full rounded-lg object-cover"
          loading="lazy"
        />

        <div className="mt-10">
          <BlogContent content={content} />
        </div>

        <BlogEndCTA category={post.category} />

        <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-8">
          {translatedData.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary">
              #{tag}
            </Badge>
          ))}
        </div>
      </article>

      <RelatedPosts posts={relatedPosts} currentTags={currentTags} />
    </main>
  );
};

export default BlogPost;
