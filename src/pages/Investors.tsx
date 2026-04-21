import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { Navigation, Footer } from "@/components/layout";
import { ScrollToTop } from "@/components/ScrollToTop";
import { HeroSection } from "@/components/investitori/HeroSection";
import { QuickContactBar } from "@/components/investitori/QuickContactBar";
import { SocialProofMini } from "@/components/investitori/SocialProofMini";
import { EmailFirstForm } from "@/components/investitori/EmailFirstForm";
import { TrustStripe } from "@/components/investitori/TrustStripe";
import { FounderLetterSection } from "@/components/investitori/FounderLetterSection";
import { ThesisSection } from "@/components/investitori/ThesisSection";
import { StartupInnovativaSection } from "@/components/investitori/StartupInnovativaSection";
import { HowItWorksSection } from "@/components/investitori/HowItWorksSection";
import { FAQSection } from "@/components/investitori/FAQSection";
import { RequestInfoForm } from "@/components/investitori/RequestInfoForm";
import { LegalDisclaimerFooter } from "@/components/investitori/LegalDisclaimerFooter";

const Investors = () => {
  const { t, i18n } = useTranslation();
  const formRef = useRef<HTMLElement>(null);
  const isEn = i18n.language.startsWith("en");
  const canonical = isEn
    ? "https://junglerent.it/investors"
    : "https://junglerent.it/investitori";

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{t("investor.landing.meta.title")}</title>
        <meta name="description" content={t("investor.landing.meta.description")} />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="it" href="https://junglerent.it/investitori" />
        <link rel="alternate" hrefLang="en" href="https://junglerent.it/investors" />
        <link rel="alternate" hrefLang="x-default" href="https://junglerent.it/investitori" />
        <meta property="og:title" content={t("investor.landing.meta.title")} />
        <meta property="og:description" content={t("investor.landing.meta.description")} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <Navigation />
      <QuickContactBar onEmailClick={scrollToForm} />

      <main>
        <HeroSection onCtaClick={scrollToForm} />
        <SocialProofMini />
        <TrustStripe />
        <EmailFirstForm onRequestFullForm={scrollToForm} />
        <FounderLetterSection />
        <ThesisSection />
        <StartupInnovativaSection />
        <HowItWorksSection />
        <FAQSection />
        <RequestInfoForm ref={formRef} />
        <LegalDisclaimerFooter />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Investors;
