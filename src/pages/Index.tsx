import { Suspense, lazy } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { MobileHeader } from "@/components/layout/MobileHeader";

const TrustBadge = lazy(() => import("@/components/TrustBadge").then(m => ({ default: m.TrustBadge })));
const WhatsAppFAB = lazy(() => import("@/components/WhatsAppFAB").then(m => ({ default: m.WhatsAppFAB })));

import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { MobileFooter } from "@/components/layout/MobileFooter";

// Innovative components - loaded immediately for impact

import { AnnouncementBanner } from "@/components/AnnouncementBanner";
import { BrandWordmark } from "@/components/immersive/BrandWordmark";
import { ScrollProgressRail } from "@/components/immersive/ScrollProgressRail";
import { ImmersiveAct } from "@/components/immersive/ImmersiveAct";
import { LiquidHomepageStory } from "@/components/immersive/LiquidHomepageStory";

// Lazy load below-the-fold components
const AudienceDoors = lazy(() => import("@/components/home/AudienceDoors").then(m => ({ default: m.AudienceDoors })));
const ClosingManifesto = lazy(() => import("@/components/home/ClosingManifesto").then(m => ({ default: m.ClosingManifesto })));

const Footer = lazy(() => import("@/components/layout/Footer").then(m => ({ default: m.Footer })));
const ScrollToTop = lazy(() => import("@/components/ScrollToTop").then(m => ({ default: m.ScrollToTop })));
const StickyCTA = lazy(() => import("@/components/StickyCTA").then(m => ({ default: m.StickyCTA })));
const BottomNav = lazy(() => import("@/components/layout/BottomNav").then(m => ({ default: m.BottomNav })));
const ExitIntentPopup = lazy(() => import("@/components/ExitIntentPopup").then(m => ({ default: m.ExitIntentPopup })));


const Index = () => {
  const { t, i18n } = useTranslation();
  const isItalian = i18n.language.startsWith('it');

  const title = isItalian
    ? "Jungle Rent — Affitti per studenti e investimenti immobiliari a Torino"
    : "Jungle Rent — Student rentals and real estate investment in Turin";

  const description = isItalian
    ? "Jungle Rent — affitti per studenti, investimenti immobiliari accessibili e gestione professionale a Torino. Start-up Innovativa incubata in 2i3T."
    : "Jungle Rent — student rentals, accessible real estate investment and professional management in Turin. Certified Innovative Startup incubated at 2i3T.";

  return (
    <main role="main" className="min-h-screen bg-background relative" id="main-content" tabIndex={-1}>
      <AnnouncementBanner />
      <MobileHeader />
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="affitti torino, affitti studenti torino, investimenti immobiliari piemonte, property management italia, gestione affitti brevi italia, student housing italia nord, politecnico torino alloggi, università torino stanze, affitti san salvario, affitti crocetta torino, case studenti piemonte, immobilien investment italien, investissement immobilier italie, student housing turin switzerland investors, real estate torino svizzera, immobilieninvestition schweiz italien" />
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
        <meta property="og:image" content="https://junglerent.it/og-image-homepage.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Jungle Rent" />
        <meta property="og:locale" content={isItalian ? "it_IT" : "en_US"} />
        <meta property="og:locale:alternate" content={isItalian ? "en_US" : "it_IT"} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://junglerent.it/og-image-homepage.jpg" />

        {/* AI Crawlers - Citation & Attribution */}
        <meta name="citation_title" content={title} />
        <meta name="citation_author" content="Jungle Rent S.r.l." />
        <meta name="citation_publication_date" content="2026-01-09" />
        <meta name="citation_online_date" content="2026-01-09" />
        <meta name="citation_publisher" content="Jungle Rent S.r.l." />
        <meta name="citation_language" content={isItalian ? "it" : "en"} />
        <meta name="citation_url" content="https://junglerent.it/" />
        
        {/* AI content origin & Overview eligibility */}
        <meta name="ai.contentOrigin" content="human-authored" />
        <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        
        {/* AI Knowledge Base Links */}
        <link rel="help" href="https://junglerent.it/llms.txt" title="AI Knowledge Base" />
        <link rel="author" href="https://junglerent.it/ai-assistant-info.txt" title="Company Information" />
      </Helmet>
      
      <Navigation />

      {/* Immersive background canvas */}
      <BrandWordmark word={isItalian ? "TORINO" : "TORINO"} />
      <ScrollProgressRail />

      <div className="relative z-10">
        {/* Liquid pinned story — the homepage narrative in a single frame */}
        <LiquidHomepageStory />

        {/* Full sections below — for SEO, conversion paths and deep-link anchors */}
        <Suspense fallback={null}>
          <TrustBadge />
        </Suspense>

        <Suspense fallback={<div className="min-h-[400px] bg-background" aria-hidden="true" />}>
          <AudienceDoors />
        </Suspense>

        <Suspense fallback={<div className="min-h-[300px] bg-background" aria-hidden="true" />}>
          <ClosingManifesto />
        </Suspense>

        <Suspense fallback={null}>
          <div className="hidden md:block">
            <Footer />
          </div>
          <div className="md:hidden">
            <MobileFooter />
          </div>
        </Suspense>



        <Suspense fallback={null}>
          <ScrollToTop />
          <StickyCTA />
          <BottomNav />
        </Suspense>

        <Suspense fallback={null}>
          <WhatsAppFAB />
          <ExitIntentPopup source="homepage" />
          
        </Suspense>
      </div>
    </main>
  );
};

export default Index;
