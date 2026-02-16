import { Helmet } from 'react-helmet';
import { BlogPost } from '@/types/blog';

interface ArticleStructuredDataProps {
  post: BlogPost;
  language: 'it' | 'en';
  url: string;
}

const ArticleStructuredData = ({ post, language, url }: ArticleStructuredDataProps) => {
  const translation = post.translations[language];
  
  // Parse date for ISO format
  const publishedDate = new Date(post.date).toISOString();
  // Use current date as modified date if not specified
  const modifiedDate = new Date().toISOString().split('T')[0] + 'T00:00:00.000Z';
  
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": translation.seo.title,
    "description": translation.seo.description,
    "image": post.image.startsWith('http') 
      ? post.image 
      : `https://junglerent.it${post.image}`,
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": "https://junglerent.it/chi-siamo"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Jungle Rent",
      "logo": {
        "@type": "ImageObject",
        "url": "https://junglerent.it/jungle-rent-logo.svg"
      }
    },
    "datePublished": publishedDate,
    "dateModified": modifiedDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "articleSection": getCategoryLabel(post.category, language),
    "keywords": translation.seo.keywords.join(', '),
    "inLanguage": language === 'it' ? 'it-IT' : 'en-US',
    "wordCount": estimateWordCount(post.readTime),
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["article h1", "article h2", ".blog-content p:first-of-type"]
    }
  };

  // Add breadcrumb for better SEO
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://junglerent.it"
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
        "name": translation.title,
        "item": url
      }
    ]
  };

  return (
    <Helmet>
      {/* Article Schema */}
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>
      
      {/* Breadcrumb Schema */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      
      {/* AI-specific meta tags for AEO */}
      <meta name="article:published_time" content={publishedDate} />
      <meta name="article:modified_time" content={modifiedDate} />
      <meta name="article:author" content={post.author} />
      <meta name="article:section" content={getCategoryLabel(post.category, language)} />
      <meta name="article:tag" content={translation.tags.join(', ')} />
      
      {/* Citation meta for AI attribution */}
      <meta name="citation_title" content={translation.seo.title} />
      <meta name="citation_author" content={post.author} />
      <meta name="citation_publication_date" content={post.date} />
      <meta name="citation_publisher" content="Jungle Rent" />
      <meta name="citation_language" content={language} />
    </Helmet>
  );
};

// Helper function to get category label
function getCategoryLabel(category: string, language: 'it' | 'en'): string {
  const labels: Record<string, Record<string, string>> = {
    students: { it: 'Studenti', en: 'Students' },
    investors: { it: 'Investitori', en: 'Investors' },
    sellers: { it: 'Venditori', en: 'Sellers' },
    turisti: { it: 'Turisti', en: 'Tourists' },
    societa: { it: 'Società', en: 'Company' }
  };
  return labels[category]?.[language] || category;
}

// Estimate word count from read time (assuming 200 words per minute)
function estimateWordCount(readTime: number): number {
  return readTime * 200;
}

export default ArticleStructuredData;
