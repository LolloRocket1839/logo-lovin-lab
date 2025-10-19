import { Hero } from "@/components/Hero";
import { TrustBadge } from "@/components/TrustBadge";
import { HowItWorks } from "@/components/HowItWorks";
import { Benefits } from "@/components/Benefits";
import { StudentSection } from "@/components/StudentSection";
import { InvestorSection } from "@/components/InvestorSection";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <TrustBadge />
      <HowItWorks />
      <Benefits />
      <StudentSection />
      <InvestorSection />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
