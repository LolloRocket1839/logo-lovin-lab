import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import jungleRentLogo from "@/assets/jungle-rent-logo-new.svg";
import { QuickInvestorLeadDialog } from "@/components/QuickInvestorLeadDialog";
import { useAnalytics } from "@/hooks/useAnalytics";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { openWhatsApp, CONTACTS, MESSAGES } from "@/lib/contacts";

export const ImmersiveHero = () => {
  const { t } = useTranslation();
  const { trackClick } = useAnalytics();
  const [investDialogOpen, setInvestDialogOpen] = useState(false);

  const handleInvestClick = () => {
    trackClick('immersive_hero_invest');
    setInvestDialogOpen(true);
  };

  const handleLorenzoClick = () => {
    trackClick('immersive_hero_lorenzo');
    const lang = (document.documentElement.lang || 'it') as 'it' | 'en';
    const validLang = lang === 'en' ? 'en' : 'it';
    const message = MESSAGES.investor.whatsapp[validLang](CONTACTS.lorenzo.name);
    openWhatsApp(CONTACTS.lorenzo.phone, message);
  };

  const scrollToContent = () => {
    const investorSection = document.getElementById('investor-section');
    investorSection?.scrollIntoView({ behavior: 'smooth' });
  };

  // Headline
  const headline = t('hero.mainHeadline');

  // Mini FAQ items
  const miniFaqs = [
    { key: 'whatBuy', question: t('hero.miniFaq.whatBuy'), answer: t('hero.miniFaq.whatBuyAnswer') },
    { key: 'howEarn', question: t('hero.miniFaq.howEarn'), answer: t('hero.miniFaq.howEarnAnswer') },
    { key: 'whoManages', question: t('hero.miniFaq.whoManages'), answer: t('hero.miniFaq.whoManagesAnswer') },
  ];

  return (
    <header 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      role="banner"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 gradient-jungle-hero" />

      {/* Main content */}
      <div className="container relative z-10 px-4 sm:px-6 md:px-8 py-12">
        <div className="max-w-5xl mx-auto text-center">
          {/* Logo - static, large, centered */}
          <div className="mb-8 md:mb-10">
            <img
              src={jungleRentLogo}
              alt={t('hero.logoAlt')}
              width="160"
              height="160"
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mx-auto rounded-full cursor-pointer"
              onClick={() => {
                trackClick('hero_logo');
              }}
              loading="eager"
            />
          </div>

          {/* Headline - static */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-extrabold mb-4 md:mb-6 leading-tight text-foreground tracking-tight">
            {headline.split(' ').map((word, i) => (
              <span
                key={i}
                className={
                  word.toLowerCase().includes('investimenti') || 
                  word.toLowerCase().includes('investment') || 
                  word.toLowerCase().includes('investi') || 
                  word.toLowerCase().includes('invest')
                    ? 'text-primary' 
                    : ''
                }
              >
                {word}{' '}
              </span>
            ))}
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 font-light leading-relaxed max-w-2xl mx-auto">
            {t('hero.mainSubheadline')}
          </p>

          {/* Minimum investment badge with explanation */}
          <div className="flex flex-col items-center mb-4 md:mb-6">
            <div className="inline-flex items-center px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-2">
              <span className="text-sm md:text-base font-semibold text-primary">
                {t('investor.minInvestment', 'Investi da €100')}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md px-4">
              {t('hero.badgeExplanation')}
            </p>
          </div>

          {/* Mini Visual Flow Schema */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 mb-4 md:mb-6 px-2 flex-wrap">
            {[
              { icon: '€100', label: t('hero.flowStep1', 'Investi') },
              { icon: '📋', label: t('hero.flowStep2', 'Quote') },
              { icon: '🏠', label: t('hero.flowStep3', 'Affitti') },
              { icon: '💰', label: t('hero.flowStep4', 'Rendite') },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                <div className="flex flex-col items-center">
                  <span className="text-lg sm:text-xl md:text-2xl">{step.icon}</span>
                  <span className="text-[10px] sm:text-xs text-muted-foreground font-medium">{step.label}</span>
                </div>
                {i < 3 && (
                  <span className="text-primary text-base sm:text-lg md:text-xl">→</span>
                )}
              </div>
            ))}
          </div>

          {/* Simplified 2 CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4 md:mb-8">
            <Button
              size="lg"
              variant="premium"
              onClick={handleInvestClick}
              className="text-sm md:text-lg px-6 py-5 md:px-8 md:py-6 group"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t('hero.discoverOpportunity')}
                <span>→</span>
              </span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleLorenzoClick}
              className="text-sm md:text-lg px-6 py-5 md:px-8 md:py-6"
            >
              <MessageCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              {t('hero.talkToLorenzo')}
            </Button>
          </div>

          {/* Mini FAQ Accordion */}
          <div className="max-w-xl mx-auto mb-8 md:mb-16 px-2">
            <Accordion type="single" collapsible className="bg-card/30 backdrop-blur-sm rounded-lg md:rounded-xl border border-border/30">
              {miniFaqs.map((faq) => (
                <AccordionItem key={faq.key} value={faq.key} className="border-border/30">
                  <AccordionTrigger className="px-3 py-2.5 md:px-4 md:py-3 text-xs sm:text-sm font-medium text-foreground hover:no-underline text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-3 pb-2.5 md:px-4 md:pb-3 text-xs sm:text-sm text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>

      {/* Scroll indicator - static */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Scroll to content"
      >
        <span className="text-xs uppercase tracking-widest font-light">{t('hero.discover')}</span>
        <span className="text-xl">↓</span>
      </button>

      <QuickInvestorLeadDialog open={investDialogOpen} onOpenChange={setInvestDialogOpen} />
    </header>
  );
};
