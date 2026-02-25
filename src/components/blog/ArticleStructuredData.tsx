import { Helmet } from 'react-helmet';
import { BlogPost } from '@/types/blog';

const CANONICAL_DOMAIN = 'junglerent.it';
const BASE_URL = `https://${CANONICAL_DOMAIN}`;

/**
 * Deployment guard: validates all URLs in structured data point to the canonical domain.
 */
function assertCanonicalDomain(schema: Record<string, unknown>, label: string) {
  if (import.meta.env.PROD) return;
  const json = JSON.stringify(schema);
  const urlMatches = json.match(/https?:\/\/[^"\\]+/g) || [];
  for (const url of urlMatches) {
    if (url.includes('schema.org')) continue;
    if (!url.includes(CANONICAL_DOMAIN)) {
      console.warn(
        `[SEO Guard] Non-canonical URL in ${label}: "${url}" — expected domain "${CANONICAL_DOMAIN}"`
      );
    }
  }
}

interface ArticleStructuredDataProps {
  post: BlogPost;
  language: 'it' | 'en';
  url: string;
}

const ArticleStructuredData = ({ post, language, url }: ArticleStructuredDataProps) => {
  const translation = post.translations[language];
  
  const publishedDate = new Date(post.date).toISOString();
  // Use published date as modified date (stable, doesn't change on every render)
  const modifiedDate = publishedDate;
  
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": translation.seo.title,
    "description": translation.seo.description,
    "image": post.image.startsWith('http') 
      ? post.image 
      : `${BASE_URL}${post.image}`,
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": `${BASE_URL}/chi-siamo`
    },
    "publisher": {
      "@type": "Organization",
      "name": "Jungle Rent",
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/jungle-rent-logo.svg`
      }
    },
    "datePublished": publishedDate,
    "dateModified": modifiedDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "isPartOf": {
      "@type": "CollectionPage",
      "@id": `${BASE_URL}/blog`,
      "name": "Jungle Rent Blog"
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

  assertCanonicalDomain(articleSchema as Record<string, unknown>, `Article: ${post.slug}`);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": BASE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${BASE_URL}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": translation.title,
        "item": url
      }
    ]
  };

  assertCanonicalDomain(breadcrumbSchema as Record<string, unknown>, `Breadcrumb: ${post.slug}`);

  // FAQ schema from post translations
  const faqSchema = translation.faqs && translation.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": translation.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

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

      {/* FAQ Schema (if available) */}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
      
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

function estimateWordCount(readTime: number): number {
  return readTime * 200;
}

export default ArticleStructuredData;
