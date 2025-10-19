import { Hero } from "@/components/Hero";
import { TrustBadge } from "@/components/TrustBadge";
import { HowItWorks } from "@/components/HowItWorks";
import { Benefits } from "@/components/Benefits";
import { StudentSection } from "@/components/StudentSection";
import { InvestorSection } from "@/components/InvestorSection";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";

const Index = () => {
  return (
    <div className="min-h-screen">
      <StructuredData />
      <Hero />
      <TrustBadge />
      <HowItWorks />
      <Benefits />
      <StudentSection />
      <InvestorSection />
      <Footer />
    </div>
  );
};

export default Index;
