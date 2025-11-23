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
  const { t } = useTranslation();

  return (
    <main role="main" className="min-h-screen gradient-jungle-vertical" id="main-content" tabIndex={-1}>
      <Helmet>
        <link rel="canonical" href="https://junglerent.it/" />
        
        {/* Hreflang for multilingual SEO */}
        <link rel="alternate" hrefLang="it" href="https://junglerent.it/" />
        <link rel="alternate" hrefLang="en" href="https://junglerent.it/" />
        <link rel="alternate" hrefLang="x-default" href="https://junglerent.it/" />
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
