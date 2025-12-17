import { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDown, ChevronDown, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import jungleRentLogo from "@/assets/jungle-rent-logo-new.svg";
import { QuickInvestorLeadDialog } from "@/components/QuickInvestorLeadDialog";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useReducedMotion } from "@/hooks/useReducedMotion";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [investDialogOpen, setInvestDialogOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  
  // Smooth spring animations
  const smoothY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const smoothY2 = useSpring(y2, { stiffness: 80, damping: 25 });
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

  // Text reveal animation
  const [textRevealed, setTextRevealed] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setTextRevealed(true), 300);
    return () => clearTimeout(timer);
  }, []);

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

  // Split headline into words for staggered animation
  const headline = t('hero.mainHeadline');
  const words = headline.split(' ');

  // Mini FAQ items
  const miniFaqs = [
    { key: 'whatBuy', question: t('hero.miniFaq.whatBuy'), answer: t('hero.miniFaq.whatBuyAnswer') },
    { key: 'howEarn', question: t('hero.miniFaq.howEarn'), answer: t('hero.miniFaq.howEarnAnswer') },
    { key: 'whoManages', question: t('hero.miniFaq.whoManages'), answer: t('hero.miniFaq.whoManagesAnswer') },
  ];

  return (
    <header 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      role="banner"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 gradient-jungle-hero" />
      
      {/* Floating decorative elements */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            style={{ y: smoothY2 }}
            className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
          />
          <motion.div
            style={{ y: smoothY1 }}
            className="absolute bottom-40 right-10 w-96 h-96 rounded-full bg-primary/3 blur-3xl"
          />
          <motion.div
            style={{ y: smoothY2 }}
            className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-primary/8 blur-2xl"
          />
        </>
      )}

      {/* Main content */}
      <motion.div
        style={prefersReducedMotion ? {} : { opacity: smoothOpacity, scale: smoothScale }}
        className="container relative z-10 px-4 sm:px-6 md:px-8 py-12"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Breathing logo */}
          <motion.div
            className="mb-8 md:mb-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.img
              src={jungleRentLogo}
              alt={t('hero.logoAlt')}
              width="160"
              height="160"
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mx-auto rounded-full cursor-pointer"
              animate={prefersReducedMotion ? {} : {
                scale: [1, 1.03, 1],
                opacity: [0.9, 1, 0.9],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              onClick={() => {
                trackClick('hero_logo');
              }}
              loading="eager"
            />
          </motion.div>

          {/* Staggered headline reveal */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-extrabold mb-4 md:mb-6 leading-tight text-foreground tracking-tight">
            <span className="sr-only">{headline}</span>
            <span aria-hidden="true" className="flex flex-wrap justify-center gap-x-2 md:gap-x-3">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30, rotateX: -45 }}
                  animate={textRevealed ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: prefersReducedMotion ? 0 : i * 0.08,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className={word.toLowerCase().includes('investimenti') || word.toLowerCase().includes('investment') || word.toLowerCase().includes('investi') || word.toLowerCase().includes('invest')
                    ? 'text-primary' 
                    : ''
                  }
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Subheadline with fade */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={textRevealed ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: prefersReducedMotion ? 0 : 0.6 }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 font-light leading-relaxed max-w-2xl mx-auto"
          >
            {t('hero.mainSubheadline')}
          </motion.p>

          {/* Minimum investment badge with explanation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={textRevealed ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : 0.8 }}
            className="flex flex-col items-center mb-6"
          >
            <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-2">
              <span className="text-sm md:text-base font-semibold text-primary">
                {t('investor.minInvestment', 'Investi da €100')}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
              {t('hero.badgeExplanation')}
            </p>
          </motion.div>

          {/* Simplified 2 CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={textRevealed ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : 1 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-8"
          >
            <Button
              size="lg"
              variant="premium"
              onClick={handleInvestClick}
              className="text-base md:text-lg px-8 py-6 group"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t('hero.discoverOpportunity')}
                <motion.span
                  animate={prefersReducedMotion ? {} : { x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleLorenzoClick}
              className="text-base md:text-lg px-8 py-6"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              {t('hero.talkToLorenzo')}
            </Button>
          </motion.div>

          {/* Mini FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={textRevealed ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : 1.2 }}
            className="max-w-xl mx-auto mb-16"
          >
            <Accordion type="single" collapsible className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/30">
              {miniFaqs.map((faq) => (
                <AccordionItem key={faq.key} value={faq.key} className="border-border/30">
                  <AccordionTrigger className="px-4 py-3 text-sm font-medium text-foreground hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-3 text-sm text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToContent}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        aria-label="Scroll to content"
      >
        <span className="text-xs uppercase tracking-widest font-light">{t('hero.discover')}</span>
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.button>

      <QuickInvestorLeadDialog open={investDialogOpen} onOpenChange={setInvestDialogOpen} />
    </header>
  );
};
