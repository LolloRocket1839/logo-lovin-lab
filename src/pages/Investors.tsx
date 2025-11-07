import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InvestorWaitlistDialog } from "@/components/InvestorWaitlistDialog";
import { ResourceLibrary } from "@/components/investor/ResourceLibrary";
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
import { openWhatsApp, CONTACTS, MESSAGES } from "@/lib/contacts";
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

  const handleAndreaWhatsApp = () => {
    const message = MESSAGES.investor.whatsapp[currentLang]('Andrea');
    openWhatsApp(CONTACTS.andrea.phone, message);
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

  return (
    <main role="main" className="min-h-screen" id="main-content" tabIndex={-1}>
      <Helmet>
        <title>{t('investors.metaTitle')}</title>
        <meta name="description" content={t('investors.metaDescription')} />
        <link rel="canonical" href="https://junglerent.it/investitori" />
        
        {/* Hreflang for multilingual SEO */}
        <link rel="alternate" hrefLang="it" href="https://junglerent.it/investitori" />
        <link rel="alternate" hrefLang="en" href="https://junglerent.it/investors" />
        <link rel="alternate" hrefLang="x-default" href="https://junglerent.it/investitori" />
      </Helmet>
      
      <StructuredData />
      <Navigation />
      <ScrollProgressBar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        
        <div className="container px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
              <Users className="w-4 h-4 mr-2" />
              {count}+ {t('investor.activeInvestors')}
            </Badge>
            
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
                onClick={handleAndreaWhatsApp}
                size="lg"
                variant="premium"
                className="w-full sm:w-auto px-8 py-6 text-lg group shadow-xl"
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                {t('investor.talkToAndrea')}
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
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <Card key={index} className="p-6 text-center border-border/50 bg-background/50 backdrop-blur-sm">
                  <Icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <div className="text-4xl font-bold text-foreground mb-2">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
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
                <Card key={index} className="p-6 border-border/50 hover:border-primary/50 transition-colors">
                  <Icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Resource Library Section */}
      <ResourceLibrary />

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
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
                  <Card className="p-6 h-full border-border/50 bg-background/50 backdrop-blur-sm">
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <Icon className="w-8 h-8 text-primary mb-4" />
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
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-8">
          <Card className="max-w-4xl mx-auto p-8 md:p-12 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
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
                  onClick={handleAndreaWhatsApp}
                  size="lg"
                  variant="premium"
                  className="w-full sm:w-auto px-8 py-6 text-lg group shadow-xl"
                >
                  <MessageCircle className="mr-2 w-5 h-5" />
                  {t('investor.talkToAndrea')}
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
      <Footer />
      <ScrollToTop />
    </main>
  );
};

export default Investors;
