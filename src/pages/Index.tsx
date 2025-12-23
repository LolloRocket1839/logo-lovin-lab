import { Suspense, lazy } from "react";
import { Navigation } from "@/components/Navigation";
import { MobileHeader } from "@/components/MobileHeader";
import { TrustBadge } from "@/components/TrustBadge";
import { StructuredData } from "@/components/StructuredData";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

// Innovative components - loaded immediately for impact
import { ImmersiveHero } from "@/components/innovative/ImmersiveHero";

// Lazy load below-the-fold components
const HowItWorks = lazy(() => import("@/components/HowItWorks").then(m => ({ default: m.HowItWorks })));

const InvestorSection = lazy(() => import("@/components/InvestorSection").then(m => ({ default: m.InvestorSection })));
const SellerSection = lazy(() => import("@/components/SellerSection").then(m => ({ default: m.SellerSection })));
const BlogBanner = lazy(() => import("@/components/blog/BlogBanner").then(m => ({ default: m.BlogBanner })));
const HomepageFAQ = lazy(() => import("@/components/HomepageFAQ"));
const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));
const ScrollToTop = lazy(() => import("@/components/ScrollToTop").then(m => ({ default: m.ScrollToTop })));
const StickyCTA = lazy(() => import("@/components/StickyCTA").then(m => ({ default: m.StickyCTA })));
const BottomNav = lazy(() => import("@/components/BottomNav").then(m => ({ default: m.BottomNav })));

const Index = () => {
  const { t, i18n } = useTranslation();
  const isItalian = i18n.language.startsWith('it');

  const title = isItalian 
    ? "Jungle Rent - Affitti Smart e Investimenti Immobiliari a Torino"
    : "Jungle Rent - Smart Rentals and Real Estate Investment in Turin";
  
  const description = isItalian
    ? "Investimenti immobiliari nel mercato universitario di Torino. Rendimenti sopra mercato, gestione professionale completa. 90.000+ studenti, 7 università."
    : "Real estate investments in Turin's university market. Above-market returns, full professional management. 90,000+ students, 7 universities.";

  return (
    <main role="main" className="min-h-screen bg-background relative" id="main-content" tabIndex={-1}>
      <MobileHeader />
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="affitti torino, affitti studenti torino, investimenti immobiliari piemonte, property management italia, gestione affitti brevi italia, student housing italia nord, politecnico torino alloggi, università torino stanze, affitti san salvario, affitti crocetta torino, case studenti piemonte, rendita immobiliare torino, immobilien investment italien, investissement immobilier italie, student housing turin switzerland investors, real estate torino svizzera, immobilieninvestition schweiz italien" />
        <link rel="canonical" href="https://junglerent.it/" />
        
        {/* Geo Targeting */}
        <meta name="geo.region" content="IT-21" />
        <meta name="geo.placename" content="Torino" />
        <meta name="geo.position" content="45.0703;7.6869" />
        <meta name="ICBM" content="45.0703, 7.6869" />
        
        {/* Content Language */}
        <meta httpEquiv="content-language" content="it-IT, en-US" />
        
        {/* Hreflang for multilingual SEO */}
        <link rel="alternate" hrefLang="it" href="https://junglerent.it/" />
        <link rel="alternate" hrefLang="en" href="https://junglerent.it/" />
        <link rel="alternate" hrefLang="de-CH" href="https://junglerent.it/" />
        <link rel="alternate" hrefLang="fr-CH" href="https://junglerent.it/" />
        <link rel="alternate" hrefLang="it-CH" href="https://junglerent.it/" />
        <link rel="alternate" hrefLang="x-default" href="https://junglerent.it/" />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://junglerent.it/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://junglerent.it/jungle-rent-logo.svg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Jungle Rent" />
        <meta property="og:locale" content={isItalian ? "it_IT" : "en_US"} />
        <meta property="og:locale:alternate" content={isItalian ? "en_US" : "it_IT"} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://junglerent.it/jungle-rent-logo.svg" />

        {/* AI Crawlers - Citation & Attribution */}
        <meta name="citation_title" content={title} />
        <meta name="citation_author" content="Jungle Rent S.r.l." />
        <meta name="citation_publication_date" content="2025-12-09" />
        <meta name="citation_online_date" content="2025-12-09" />
        <meta name="citation_publisher" content="Jungle Rent S.r.l." />
        <meta name="citation_language" content={isItalian ? "it" : "en"} />
        
        {/* AI Knowledge Base Links */}
        <link rel="help" href="https://junglerent.it/llms.txt" title="AI Knowledge Base" />
        <link rel="author" href="https://junglerent.it/ai-assistant-info.txt" title="Company Information" />
      </Helmet>
      
      <StructuredData />
      <Navigation />
      
      {/* Immersive Hero */}
      <div id="hero">
        <ImmersiveHero />
      </div>
      
      <div className="hidden md:block">
        <TrustBadge />
      </div>

      <Suspense fallback={<div className="min-h-[200px]" />}>
        
        {/* How It Works Section - hidden on mobile */}
        <div className="hidden md:block">
          <HowItWorks />
        </div>
        
        {/* Investor Section - hidden on mobile */}
        <div className="hidden md:block">
          <InvestorSection />
        </div>
        
        <SellerSection />
        
        {/* FAQ Section - hidden on mobile */}
        <div className="hidden md:block">
          <HomepageFAQ />
        </div>
        
        {/* Blog banner - hidden on mobile */}
        <div className="hidden md:block">
          <BlogBanner />
        </div>
        
        <div className="pb-16 lg:pb-0">
          <Footer />
        </div>
        <ScrollToTop />
        <StickyCTA />
        <BottomNav />
      </Suspense>
    </main>
  );
};

export default Index;
