import { Link } from "react-router-dom";
import { Navigation, Footer } from "@/components/layout";
import { InvestorWaitlistDialog } from "@/components/dialogs";
import { ContractBanner } from "@/components/blog/ContractBanner";

import { ScrollToTop } from "@/components/ScrollToTop";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { ResourceLibrary } from "@/components/investor/ResourceLibrary";
import { InvestorExitIntentPopup } from "@/components/investor/InvestorExitIntentPopup";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { 
  TrendingUp, 
  PieChart, 
  BarChart3, 
  ArrowRight, 
  MessageCircle, 
  Users,
  CheckCircle2,
  Building2,
  Shield,
  Clock
} from "lucide-react";
import { openWhatsApp, CONTACTS, MESSAGES } from "@/constants";
import { useWaitlistCounter } from "@/hooks/useWaitlistCounter";

const Investors = () => {
  const { t, i18n } = useTranslation();
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const { count } = useWaitlistCounter();
  const currentLang = (i18n.language.startsWith('en') ? 'en' : 'it') as 'it' | 'en';

  const handleLorenzoWhatsApp = () => {
    const message = MESSAGES.investor.whatsapp[currentLang]('Lorenzo');
    openWhatsApp(CONTACTS.lorenzo.phone, message);
  };


  const handleCallLorenzo = () => {
    window.location.href = `tel:${CONTACTS.lorenzo.phone}`;
  };

  const benefits = [
    {
      icon: TrendingUp,
      title: t('investor.benefit1Title'),
      description: t('investor.benefit1Desc')
    },
    {
      icon: BarChart3,
      title: t('investor.benefit2Title'),
      description: t('investor.benefit2Desc')
    },
    {
      icon: PieChart,
      title: t('investor.benefit3Title'),
      description: t('investor.benefit3Desc')
    }
  ];

  const metrics = [
    {
      value: "7-9%",
      label: t('investors.metricReturn'),
      icon: TrendingUp
    },
    {
      value: "95%",
      label: t('investors.metricOccupancy'),
      icon: Building2
    },
    {
      value: "100%",
      label: t('investors.metricManagement'),
      icon: Shield
    }
  ];

  const processSteps = [
    {
      icon: MessageCircle,
      title: t('investors.step1Title'),
      description: t('investors.step1Desc')
    },
    {
      icon: BarChart3,
      title: t('investors.step2Title'),
      description: t('investors.step2Desc')
    },
    {
      icon: CheckCircle2,
      title: t('investors.step3Title'),
      description: t('investors.step3Desc')
    },
    {
      icon: Clock,
      title: t('investors.step4Title'),
      description: t('investors.step4Desc')
    }
  ];

  // Investment schema for SEO
  const investmentSchema = {
    "@context": "https://schema.org",
    "@type": "InvestmentOrDeposit",
    "name": currentLang === 'it' 
      ? "Investimento Immobiliare Frazionato Torino" 
      : "Fractional Real Estate Investment Turin",
    "description": currentLang === 'it'
      ? "Investi in immobili studenteschi a Torino a partire da €100. Rendimento target 7-9% annuo con gestione completa."
      : "Invest in student housing in Turin starting from €100. Target yield 7-9% annually with full management.",
    "url": "https://junglerent.it/investitori",
    "provider": {
      "@type": "Organization",
      "name": "Jungle Rent S.r.l.",
      "url": "https://junglerent.it",
      "logo": "https://junglerent.it/jungle-rent-logo.svg"
    },
    "amount": {
      "@type": "MonetaryAmount",
      "minValue": 100,
      "currency": "EUR"
    },
    "interestRate": {
      "@type": "QuantitativeValue",
      "minValue": 7,
      "maxValue": 9,
      "unitCode": "P1"
    },
    "areaServed": {
      "@type": "City",
      "name": "Torino"
    },
    "termsOfService": "https://junglerent.it/termini-condizioni"
  };

  return (
    <main role="main" className="min-h-screen" id="main-content" tabIndex={-1}>
      {/* IMPORTANT: Dynamic canonical based on current language for IT/EN routes */}
      <Helmet>
        <title>{t('investors.metaTitle')}</title>
        <meta name="description" content={t('investors.metaDescription')} />
        <link rel="canonical" href={`https://junglerent.it/${currentLang === 'en' ? 'investors' : 'investitori'}`} />
        
        {/* Hreflang for multilingual SEO */}
        <link rel="alternate" hrefLang="it" href="https://junglerent.it/investitori" />
        <link rel="alternate" hrefLang="en" href="https://junglerent.it/investors" />
        <link rel="alternate" hrefLang="de-CH" href="https://junglerent.it/investitori" />
        <link rel="alternate" hrefLang="fr-CH" href="https://junglerent.it/investitori" />
        <link rel="alternate" hrefLang="it-CH" href="https://junglerent.it/investitori" />
        <link rel="alternate" hrefLang="x-default" href="https://junglerent.it/investitori" />
        
        {/* Geo Targeting */}
        <meta name="geo.region" content="IT-21" />
        <meta name="geo.placename" content="Torino" />
        <meta name="geo.position" content="45.0703;7.6869" />
        <meta name="ICBM" content="45.0703, 7.6869" />
        
        {/* Content Language */}
        <meta httpEquiv="content-language" content="it-IT, en-US" />
        
        {/* Investment Schema */}
        <script type="application/ld+json">
          {JSON.stringify(investmentSchema)}
        </script>
      </Helmet>
      
      
      <Navigation />
      

      {/* Hero Section */}
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        
        <div className="container px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight text-foreground">
              {t('investors.heroTitle')}
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed mb-12 max-w-2xl mx-auto">
              {t('investors.heroSubtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={handleLorenzoWhatsApp}
                size="lg"
                variant="premium"
                className="w-full sm:w-auto px-8 py-6 text-lg group shadow-xl"
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                {t('investor.talkToLorenzo')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                onClick={handleCallLorenzo}
                size="lg"
                variant="outline"
                className="w-full sm:w-auto px-8 py-6 text-lg"
              >
                {t('investor.bookCall')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-16 md:py-24 bg-background border-t border-border/20">
        <div className="container px-8">
          <p className="text-xs uppercase tracking-[0.15em] font-medium text-muted-foreground text-center mb-8">
            {t('investors.metricsLabel', 'Key Metrics')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <Card key={index} className="p-6 md:p-8 text-center rounded-xl border-border/20 bg-card">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-4xl font-bold text-foreground mb-2">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </Card>
              );
            })}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8">
            <Link to="/blog/student-housing-italia-savills-2025" className="hover:text-primary underline underline-offset-2 transition-colors">
              {t('investors.readSavillsAnalysis')} →
            </Link>
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-background border-t border-border/20">
        <div className="container px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs uppercase tracking-[0.15em] font-medium text-muted-foreground mb-4">
              {t('investors.benefitsLabel', 'Why Invest')}
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">
              {t('investors.benefitsTitle')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('investors.benefitsSubtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="p-6 md:p-8 rounded-xl border-border/20 hover:border-primary/30 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Zones Section - Link to market analysis with preview cards */}
      <section className="py-16 md:py-24 bg-muted/30 border-t border-border/20">
        <div className="container px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <p className="text-xs uppercase tracking-[0.15em] font-medium text-muted-foreground mb-4">
              {t('investors.zonesLabel', 'Market Analysis')}
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">
              {currentLang === 'it' ? 'Zone di investimento' : 'Investment zones'}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {currentLang === 'it' 
                ? 'Analisi di mercato 2025 per ogni quartiere di Torino: rendimenti, prezzi e progetti di riqualificazione.'
                : '2025 market analysis for every Turin neighborhood: yields, prices and urban renewal projects.'}
            </p>
          </div>
          
          {/* Zone preview cards for SEO internal linking */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
            <Link to="/investitori/zone/aurora">
              <Card className="p-5 hover:border-primary/50 transition-colors h-full">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Aurora</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {currentLang === 'it' ? '7-9% lordo • Riqualificazione in corso' : '7-9% gross • Urban renewal'}
                </p>
              </Card>
            </Link>
            <Link to="/investitori/zone/cenisia">
              <Card className="p-5 hover:border-primary/50 transition-colors h-full">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Cenisia</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {currentLang === 'it' ? '6-7% lordo • Vicino Politecnico' : '6-7% gross • Near Politecnico'}
                </p>
              </Card>
            </Link>
            <Link to="/investitori/zone/san-salvario">
              <Card className="p-5 hover:border-primary/50 transition-colors h-full">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">San Salvario</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {currentLang === 'it' ? '6-8% lordo • Alta domanda studenti' : '6-8% gross • High student demand'}
                </p>
              </Card>
            </Link>
          </div>

          <div className="text-center">
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg"
            >
              <Link to={currentLang === 'en' ? '/investors/zones' : '/investitori/zone'}>
                {currentLang === 'it' ? 'Esplora tutte le zone →' : 'Explore all zones →'}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Resource Library Section */}
      <ResourceLibrary />

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-background border-t border-border/20">
        <div className="container px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs uppercase tracking-[0.15em] font-medium text-muted-foreground mb-4">
              {t('investors.processLabel', 'How It Works')}
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">
              {t('investors.processTitle')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('investors.processSubtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <Card className="p-6 md:p-8 h-full rounded-xl border-border/20 bg-card">
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-background border-t border-border/20">
        <div className="container px-8">
          <Card className="max-w-4xl mx-auto p-8 md:p-12 rounded-xl border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">
                {t('investors.ctaTitle')}
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                {t('investors.ctaSubtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  onClick={handleLorenzoWhatsApp}
                  size="lg"
                  variant="premium"
                  className="w-full sm:w-auto px-8 py-6 text-lg group shadow-xl"
                >
                  <MessageCircle className="mr-2 w-5 h-5" />
                  {t('investor.talkToLorenzo')}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button 
                  onClick={handleCallLorenzo}
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto px-8 py-6 text-lg"
                >
                  {t('investor.bookCall')}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <InvestorWaitlistDialog open={waitlistOpen} onOpenChange={setWaitlistOpen} />
      <InvestorExitIntentPopup source="investors_page" />
      <Footer />
      <ScrollToTop />
    </main>
  );
};

export default Investors;
