import { useRef, useCallback, useEffect, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { Navigation, Footer } from "@/components/layout";
import { ScrollToTop } from "@/components/ScrollToTop";
import { HeroSection } from "@/components/investitori/HeroSection";
import { QuickContactBar } from "@/components/investitori/QuickContactBar";
import { SocialProofMini } from "@/components/investitori/SocialProofMini";
import { TrustStripe } from "@/components/investitori/TrustStripe";
import { InvestorStickyCTA } from "@/components/investitori/InvestorStickyCTA";
import { useAnalytics } from "@/hooks/useAnalytics";

// Lazy-load below-the-fold sections to reduce initial bundle of /investitori
const EmailFirstForm = lazy(() =>
  import("@/components/investitori/EmailFirstForm").then((m) => ({ default: m.EmailFirstForm }))
);
const FounderLetterSection = lazy(() =>
  import("@/components/investitori/FounderLetterSection").then((m) => ({ default: m.FounderLetterSection }))
);
const ThesisSection = lazy(() =>
  import("@/components/investitori/ThesisSection").then((m) => ({ default: m.ThesisSection }))
);
const StartupInnovativaSection = lazy(() =>
  import("@/components/investitori/StartupInnovativaSection").then((m) => ({ default: m.StartupInnovativaSection }))
);
const HowItWorksSection = lazy(() =>
  import("@/components/investitori/HowItWorksSection").then((m) => ({ default: m.HowItWorksSection }))
);
const FAQSection = lazy(() =>
  import("@/components/investitori/FAQSection").then((m) => ({ default: m.FAQSection }))
);
const RequestInfoForm = lazy(() =>
  import("@/components/investitori/RequestInfoForm").then((m) => ({ default: m.RequestInfoForm }))
);
const LegalDisclaimerFooter = lazy(() =>
  import("@/components/investitori/LegalDisclaimerFooter").then((m) => ({ default: m.LegalDisclaimerFooter }))
);

const SectionFallback = () => <div className="min-h-[200px]" aria-hidden="true" />;

const Investors = () => {
  const { t } = useTranslation();
  const { trackEvent } = useAnalytics();
  const location = useLocation();
  const formRef = useRef<HTMLElement>(null);
  // Derive canonical from the actual URL path (not i18n language) so crawlers
  // always see a self-referential canonical for the URL they fetched.
  const isEnPath = location.pathname.startsWith("/investors");
  const canonical = isEnPath
    ? "https://junglerent.it/investors"
    : "https://junglerent.it/investitori";

  const scrollToForm = useCallback(() => {
    trackEvent("investor_hero_cta_click", { target: "request_info_form" });
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [trackEvent]);

  // Page view (one-shot)
  useEffect(() => {
    trackEvent("investor_page_view", { path: "/investitori" });
  }, [trackEvent]);

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

      <main className="pb-20 md:pb-0">
        <HeroSection onCtaClick={scrollToForm} />
        <SocialProofMini />
        <TrustStripe />
        <Suspense fallback={<SectionFallback />}>
          <EmailFirstForm onRequestFullForm={scrollToForm} />
          <FounderLetterSection />
          <ThesisSection />
          <StartupInnovativaSection />
          <HowItWorksSection />
          <FAQSection />
          <RequestInfoForm ref={formRef} />
          <LegalDisclaimerFooter />
        </Suspense>
      </main>

      <Footer />
      <ScrollToTop />

      <InvestorStickyCTA formRef={formRef} />
    </div>
  );
};

export default Investors;
