import { Hero } from "@/components/Hero";
import { TrustBadge } from "@/components/TrustBadge";
import { HowItWorks } from "@/components/HowItWorks";
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
    <main role="main" className="min-h-screen">
      <StructuredData />
      <ScrollProgressBar />
      <Hero />
      <TrustBadge />
      <HowItWorks />
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
