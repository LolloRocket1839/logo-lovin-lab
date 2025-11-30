import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { TrustBadge } from "@/components/TrustBadge";
import { StudentSection } from "@/components/StudentSection";
import { InvestorSection } from "@/components/InvestorSection";
import { SellerSection } from "@/components/SellerSection";
import { TouristSection } from "@/components/TouristSection";
import { BlogSection } from "@/components/blog/BlogSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { StickyCTA } from "@/components/StickyCTA";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t, i18n } = useTranslation();
  const isItalian = i18n.language.startsWith('it');

  const title = isItalian 
    ? "Jungle Rent - Affitti Smart e Investimenti Immobiliari a Torino"
    : "Jungle Rent - Smart Rentals and Real Estate Investment in Turin";
  
  const description = isItalian
    ? "Il tuo rifugio nella giungla immobiliare. Affitti per studenti, gestione immobili e investimenti a Torino. Servizi professionali per studenti, investitori e proprietari."
    : "Your shelter in the real estate jungle. Student rentals, property management and investments in Turin. Professional services for students, investors and property owners.";

  return (
    <main role="main" className="min-h-screen gradient-jungle-vertical" id="main-content" tabIndex={-1}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="affitti torino, studenti torino, investimenti immobiliari, property management, politecnico torino, università torino, san salvario, crocetta, affitti studenti, rental management turin" />
        <link rel="canonical" href="https://junglerent.it/" />
        
        {/* Hreflang for multilingual SEO */}
        <link rel="alternate" hrefLang="it" href="https://junglerent.it/" />
        <link rel="alternate" hrefLang="en" href="https://junglerent.it/" />
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
      </Helmet>
      
      <StructuredData />
      <Navigation />
      <ScrollProgressBar />
      <div id="hero">
        <Hero />
      </div>
      <TrustBadge />
      <div className="-mt-16">
        <InvestorSection />
      </div>
      <div className="-mt-12">
        <StudentSection />
      </div>
      <div className="-mt-12">
        <SellerSection />
      </div>
      <div className="-mt-12">
        <TouristSection />
      </div>
      <div className="-mt-12">
        <BlogSection />
      </div>
      <FAQSection />
      <Footer />
      <ScrollToTop />
      <StickyCTA />
    </main>
  );
};

export default Index;
