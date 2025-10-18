import { Hero } from "@/components/Hero";
import { TrustBadge } from "@/components/TrustBadge";
import { HowItWorks } from "@/components/HowItWorks";
import { Stats } from "@/components/Stats";
import { Benefits } from "@/components/Benefits";
import { InvestorSection } from "@/components/InvestorSection";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <TrustBadge />
      <HowItWorks />
      <Stats />
      <Benefits />
      <InvestorSection />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
