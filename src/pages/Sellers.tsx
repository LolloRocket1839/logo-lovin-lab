import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { 
  Building2, Clock, Check, X, MapPin, FileText, 
  Handshake, Shield, ArrowRight, Phone, CalendarCheck,
  Home, Users, TrendingUp, Star, Calculator, MessageCircle,
  UserCheck, Zap, KeyRound
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation, Footer, MobileHeader, MobileFooter } from "@/components/layout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { QuickSellerLeadDialog } from "@/components/dialogs";
import { QuickOfferSimulator } from "@/components/tools/QuickOfferSimulator";
import { StyledText } from "@/components/StyledText";
import { CONTACTS, openWhatsApp } from "@/constants/contacts";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Sellers = () => {
  const { t, i18n } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const lang = i18n.language;

  // Timeline steps
  const timelineSteps = [
    { 
      icon: FileText, 
      title: t('seller.timelineValuation'), 
      time: t('seller.timelineValuationTime'),
      desc: t('sellersPage.timeline.step1Desc')
    },
    { 
      icon: Home, 
      title: t('seller.timelineInspection'), 
      time: t('seller.timelineInspectionTime'),
      desc: t('sellersPage.timeline.step2Desc')
    },
    { 
      icon: Handshake, 
      title: t('seller.timelineOffer'), 
      time: t('seller.timelineOfferTime'),
      desc: t('sellersPage.timeline.step3Desc')
    },
    { 
      icon: CalendarCheck, 
      title: t('seller.timelineClosing'), 
      time: t('seller.timelineClosingTime'),
      desc: t('sellersPage.timeline.step4Desc')
    },
  ];

  // Benefits
  const benefits = [
    { 
      icon: Building2, 
      title: t('seller.benefit1Title'), 
      desc: t('seller.benefit1Desc') 
    },
    { 
      icon: Clock, 
      title: t('seller.benefit2Title'), 
      desc: t('seller.benefit2Desc') 
    },
    { 
      icon: Shield, 
      title: t('seller.benefit3Title'), 
      desc: t('seller.benefit3Desc') 
    },
    { 
      icon: TrendingUp, 
      title: t('seller.benefit4Title'), 
      desc: t('seller.benefit4Desc') 
    },
  ];

  // Interest zones
  const zones = [
    "San Salvario", "Vanchiglia", "Crocetta", "Aurora", 
    "Santa Rita", "San Paolo", "Cenisia", "Lingotto",
    "Campidoglio", "Cit Turin", "Campus Einaudi"
  ];

  // Seller FAQs
  const sellerFaqs = [
    { question: t('faq.sellerQ1'), answer: t('faq.sellerA1') },
    { question: t('faq.sellerQ2'), answer: t('faq.sellerA2') },
    { question: t('faq.sellerQ3'), answer: t('faq.sellerA3') },
    { question: t('faq.sellerQ4'), answer: t('faq.sellerA4') },
    { question: t('faq.sellerQ5'), answer: t('faq.sellerA5') },
    { question: t('faq.sellerQ6'), answer: t('faq.sellerA6') },
    { question: t('faq.sellerQ7'), answer: t('faq.sellerA7') },
  ];

  const handleOpenDialog = () => setIsDialogOpen(true);

  return (
    <>
      <Helmet>
        <title>{t('sellersPage.meta.title', 'Vendi Casa a Torino Senza Commissioni | Jungle Rent Acquista Direttamente')}</title>
        <meta name="description" content={t('sellersPage.meta.description', 'Vendi il tuo immobile a Torino senza commissioni. Jungle Rent acquista direttamente in 60-90 giorni. Zero visite, valutazione gratuita, pagamento sicuro.')} />
        <link rel="canonical" href={`https://junglerent.it/${lang === 'it' ? 'vendi' : 'sell'}`} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="keywords" content={t('sellersPage.meta.keywords', 'vendere casa torino, vendi appartamento torino senza agenzia, compratore diretto torino, vendita immobile torino veloce, jungle rent acquista casa')} />
        <meta property="og:title" content={t('sellersPage.meta.title', 'Vendi Casa a Torino Senza Commissioni | Jungle Rent')} />
        <meta property="og:description" content={t('sellersPage.meta.description', 'Vendi il tuo immobile a Torino senza commissioni. Jungle Rent acquista direttamente in 60-90 giorni.')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://junglerent.it/${lang === 'it' ? 'vendi' : 'sell'}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('sellersPage.meta.title', 'Vendi Casa a Torino Senza Commissioni')} />
        <meta name="twitter:description" content={t('sellersPage.meta.description', 'Jungle Rent acquista direttamente. Zero commissioni, 60-90 giorni.')} />
        <link rel="alternate" hrefLang="it" href="https://junglerent.it/vendi" />
        <link rel="alternate" hrefLang="en" href="https://junglerent.it/sell" />
        <link rel="alternate" hrefLang="x-default" href="https://junglerent.it/vendi" />
        
        {/* Service Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": lang === 'it' ? "Acquisto Diretto Immobili Torino" : "Direct Property Purchase Turin",
            "description": lang === 'it' 
              ? "Jungle Rent acquista direttamente il tuo immobile a Torino senza commissioni. Valutazione gratuita, offerta in 48 ore, chiusura in 60-90 giorni."
              : "Jungle Rent directly purchases your property in Turin with no fees. Free valuation, offer in 48 hours, closing in 60-90 days.",
            "provider": {
              "@type": "Organization",
              "name": "Jungle Rent S.r.l.",
              "url": "https://junglerent.it",
              "logo": "https://junglerent.it/jungle-rent-logo.svg"
            },
            "areaServed": {
              "@type": "City",
              "name": "Turin",
              "containedIn": "Piedmont, Italy"
            },
            "serviceType": "Real Estate Acquisition",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "EUR",
              "description": lang === 'it' ? "Zero commissioni - Acquisto diretto" : "Zero fees - Direct purchase"
            }
          })}
        </script>

        {/* FAQPage Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": sellerFaqs.slice(0, 6).map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>

        {/* HowTo Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": lang === 'it' ? "Come vendere casa a Torino senza agenzia" : "How to sell your home in Turin without an agency",
            "description": lang === 'it' 
              ? "Guida passo-passo per vendere il tuo immobile a Torino direttamente a Jungle Rent senza commissioni."
              : "Step-by-step guide to sell your property in Turin directly to Jungle Rent with no fees.",
            "totalTime": "P90D",
            "step": [
              {
                "@type": "HowToStep",
                "position": 1,
                "name": lang === 'it' ? "Richiedi valutazione gratuita" : "Request free valuation",
                "text": lang === 'it' ? "Compila il form con i dati del tuo immobile. Riceverai una valutazione gratuita entro 24 ore." : "Fill out the form with your property details. You'll receive a free valuation within 24 hours."
              },
              {
                "@type": "HowToStep",
                "position": 2,
                "name": lang === 'it' ? "Sopralluogo tecnico" : "Technical inspection",
                "text": lang === 'it' ? "Un nostro esperto visiterà l'immobile per verificare lo stato e confermare la valutazione." : "Our expert will visit the property to verify the condition and confirm the valuation."
              },
              {
                "@type": "HowToStep",
                "position": 3,
                "name": lang === 'it' ? "Ricevi l'offerta" : "Receive the offer",
                "text": lang === 'it' ? "Entro 48 ore dal sopralluogo riceverai un'offerta scritta senza impegno." : "Within 48 hours of the inspection, you'll receive a written offer with no obligation."
              },
              {
                "@type": "HowToStep",
                "position": 4,
                "name": lang === 'it' ? "Chiusura rapida" : "Quick closing",
                "text": lang === 'it' ? "Se accetti, chiudiamo dal notaio in 60-90 giorni. Tu non paghi commissioni." : "If you accept, we close at the notary in 60-90 days. You pay no fees."
              }
            ]
          })}
        </script>
      </Helmet>

      <Navigation />
      <MobileHeader variant="seller" />
      
      {/* Seller-specific exit intent with dedicated tracking */}
      <ExitIntentPopup source="seller-vendi-page" trackingPrefix="seller" />

      <main role="main" id="main-content" className="min-h-screen bg-background pt-20 md:pt-24 overflow-x-hidden" tabIndex={-1}>
        <div className="container px-4 md:px-8 mx-auto">
          <Breadcrumbs 
            items={[
              { label: t('sellersPage.breadcrumb') }
            ]} 
          />
        </div>

        {/* Hero Section */}
        <section className="py-10 md:py-16 relative overflow-hidden">
          <div className="container px-4 md:px-8 mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Left: Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <Building2 className="w-4 h-4" />
                  {t('sellersPage.hero.badge')}
                </div>
                
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-extrabold mb-6 leading-tight text-foreground tracking-tight">
                  <span className="text-primary">{t('seller.heroHighlight')}</span> {t('seller.heroRest')}{' '}
                  <span className="text-foreground whitespace-nowrap">{t('seller.heroBracket')}</span>
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                  {t('sellersPage.hero.subtitle')}
                </p>

                {/* Key benefits inline */}
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-5 h-5 text-primary" />
                    <span>{t('seller.benefit1')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-5 h-5 text-primary" />
                    <span>{t('seller.benefit2')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-5 h-5 text-primary" />
                    <span>{t('seller.benefit3')}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    variant="premium"
                    onClick={handleOpenDialog}
                    className="text-base"
                  >
                    {t('seller.ctaButton')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => window.open('https://calendly.com/junglerent/vendere', '_blank')}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    {t('seller.scheduleCall')}
                  </Button>
                </div>
              </motion.div>

              {/* Right: Offer Simulator */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:sticky lg:top-24 lg:self-start"
              >
                <QuickOfferSimulator onContactClick={handleOpenDialog} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container px-4 md:px-8 mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                <StyledText>{t('seller.directBuyerTitle')}</StyledText>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('seller.directBuyerSubtitle')}
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid grid-cols-3">
                    {/* Header */}
                    <div className="p-4 bg-muted/50 font-medium text-muted-foreground"></div>
                    <div className="p-4 bg-muted/50 text-center font-semibold text-muted-foreground border-l border-border">
                      {t('seller.comparison.agency')}
                    </div>
                    <div className="p-4 bg-primary/10 text-center font-semibold text-primary border-l border-border">
                      Jungle Rent
                    </div>

                    {/* Role */}
                    <div className="p-4 border-t border-border text-muted-foreground">
                      {t('seller.comparison.roleLabel')}
                    </div>
                    <div className="p-4 border-t border-l border-border text-center text-muted-foreground">
                      {t('seller.comparison.roleAgency')}
                    </div>
                    <div className="p-4 border-t border-l border-border text-center font-medium text-foreground flex items-center justify-center gap-2">
                      <Building2 className="w-4 h-4 text-primary" />
                      {t('seller.comparison.roleJR')}
                    </div>

                    {/* Commissions */}
                    <div className="p-4 border-t border-border text-muted-foreground">
                      {t('seller.comparison.commissionsLabel')}
                    </div>
                    <div className="p-4 border-t border-l border-border text-center text-destructive flex items-center justify-center gap-1">
                      <X className="w-4 h-4" />
                      3-4%
                    </div>
                    <div className="p-4 border-t border-l border-border text-center text-primary font-bold flex items-center justify-center gap-1">
                      <Check className="w-4 h-4" />
                      {t('seller.comparison.commissionsJR')}
                    </div>

                    {/* Time */}
                    <div className="p-4 border-t border-border text-muted-foreground">
                      {t('seller.comparison.timeLabel')}
                    </div>
                    <div className="p-4 border-t border-l border-border text-center text-muted-foreground flex items-center justify-center gap-1">
                      <Clock className="w-4 h-4" />
                      6-12 {t('seller.comparison.months')}
                    </div>
                    <div className="p-4 border-t border-l border-border text-center text-primary font-medium flex items-center justify-center gap-1">
                      <Clock className="w-4 h-4" />
                      60-90 {t('seller.comparison.days')}
                    </div>

                    {/* Visits */}
                    <div className="p-4 border-t border-border text-muted-foreground">
                      {t('seller.comparison.visitsLabel')}
                    </div>
                    <div className="p-4 border-t border-l border-border text-center text-muted-foreground">
                      {t('seller.comparison.visitsAgency')}
                    </div>
                    <div className="p-4 border-t border-l border-border text-center text-primary font-medium">
                      {t('seller.comparison.visitsJR')}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Seller Scenarios Section */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-8 mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                {t('sellerScenarios.title')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('sellerScenarios.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
              {[
                { key: 'heir', icon: KeyRound, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10' },
                { key: 'urgent', icon: Zap, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-500/10' },
                { key: 'tired', icon: UserCheck, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500/10' },
              ].map((scenario) => (
                <motion.div
                  key={scenario.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-md transition-shadow border-border">
                    <CardContent className="p-6">
                      <div className={`w-10 h-10 rounded-full ${scenario.bg} flex items-center justify-center mb-4`}>
                        <scenario.icon className={`w-5 h-5 ${scenario.color}`} />
                      </div>
                      <h3 className="font-display font-bold text-lg mb-2 text-foreground">
                        {t(`sellerScenarios.${scenario.key}.title`)}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {t(`sellerScenarios.${scenario.key}.description`)}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <div className="text-center">
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  const msg = t('sellerScenarios.whatsappMessage');
                  openWhatsApp(CONTACTS.lorenzo.phone, msg);
                }}
                className="border-green-500/50 text-green-700 dark:text-green-400 hover:bg-green-500/10"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                {t('sellerScenarios.whatsappCta')}
              </Button>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-8 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                {t('sellersPage.timeline.title')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('sellersPage.timeline.subtitle')}
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

                {timelineSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative flex items-start gap-6 mb-8 ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Icon */}
                    <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg md:absolute md:left-1/2 md:-translate-x-1/2">
                      <step.icon className="w-5 h-5" />
                    </div>

                    {/* Content */}
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'} pl-2 md:pl-0`}>
                      <Card className="inline-block">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                              {step.time}
                            </span>
                          </div>
                          <h3 className="font-display font-bold text-lg mb-1">{step.title}</h3>
                          <p className="text-sm text-muted-foreground">{step.desc}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container px-4 md:px-8 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                {t('seller.advantagesTitle')}
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <benefit.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-display font-bold mb-2">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Interest Zones */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-8 mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                {t('seller.zonesTitle')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('seller.zonesText')}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto mb-8">
              {zones.map((zone, index) => (
                <motion.div
                  key={zone}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-default"
                >
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{zone}</span>
                </motion.div>
              ))}
            </div>

            <p className="text-center text-sm text-muted-foreground max-w-2xl mx-auto">
              {t('seller.idealProperty')}
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container px-4 md:px-8 mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                {t('faq.title')}
              </h2>
              <p className="text-muted-foreground">
                {t('sellersPage.faq.subtitle')}
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-2">
                {sellerFaqs.map((faq, index) => (
                  <AccordionItem
                    key={`seller-faq-${index}`}
                    value={`seller-faq-${index}`}
                    className="bg-background border rounded-lg px-4 md:px-6"
                  >
                    <AccordionTrigger className="text-left text-sm sm:text-base hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm sm:text-base">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-8 mx-auto">
            <Card className="max-w-3xl mx-auto bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-8 md:p-12 text-center">
                <Star className="w-12 h-12 text-primary mx-auto mb-6" />
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                  {t('sellersPage.finalCta.title')}
                </h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  {t('sellersPage.finalCta.subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    variant="premium"
                    onClick={handleOpenDialog}
                    className="text-base"
                  >
                    {t('seller.ctaButton')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => window.open('https://calendly.com/junglerent/vendere', '_blank')}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    {t('seller.scheduleCall')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
      <MobileFooter />

      <QuickSellerLeadDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        source="sellers_page" 
      />
      
      <ExitIntentPopup source="exit-intent-sellers" />
    </>
  );
};

export default Sellers;
