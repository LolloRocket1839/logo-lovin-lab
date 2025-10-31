import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { TrustBadge } from "@/components/TrustBadge";
import { Benefits } from "@/components/Benefits";
import { StudentSection } from "@/components/StudentSection";
import { InvestorSection } from "@/components/InvestorSection";
import { SellerSection } from "@/components/SellerSection";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { StickyCTA } from "@/components/StickyCTA";

const Index = () => {
  return (
    <main role="main" className="min-h-screen" id="main-content" tabIndex={-1}>
      <StructuredData />
      <Navigation />
      <ScrollProgressBar />
      <div id="hero">
        <Hero />
      </div>
      <TrustBadge />
      <Benefits />
      <StudentSection />
      <InvestorSection />
      <SellerSection />
      <Footer />
      <ScrollToTop />
      <StickyCTA />
    </main>
  );
};

export default Index;
