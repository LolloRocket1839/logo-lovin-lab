import { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import jungleRentLogo from "@/assets/jungle-rent-logo-new.svg";
import { QuickInvestorLeadDialog } from "@/components/QuickInvestorLeadDialog";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useReducedMotion } from "@/hooks/useReducedMotion";

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

  const scrollToContent = () => {
    const investorSection = document.getElementById('investor-section');
    investorSection?.scrollIntoView({ behavior: 'smooth' });
  };

  // Split headline into words for staggered animation
  const headline = t('hero.mainHeadline');
  const words = headline.split(' ');

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
            className="mb-12 md:mb-16"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.img
              src={jungleRentLogo}
              alt={t('hero.logoAlt')}
              width="160"
              height="160"
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto rounded-full cursor-pointer"
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-extrabold mb-6 md:mb-8 leading-tight text-foreground tracking-tight">
            <span className="sr-only">{headline}</span>
            <span aria-hidden="true" className="flex flex-wrap justify-center gap-x-3 md:gap-x-4">
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
                  className={word.toLowerCase().includes('investimenti') || word.toLowerCase().includes('investment') 
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
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-10 md:mb-14 font-light leading-relaxed max-w-3xl mx-auto"
          >
            {t('hero.mainSubheadline')}
          </motion.p>

          {/* Minimum investment badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={textRevealed ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : 0.8 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <span className="text-sm md:text-base font-medium text-primary">
                {t('investor.minInvestment', 'Investi da €100')}
              </span>
            </div>
          </motion.div>

          {/* CTA Button with magnetic effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={textRevealed ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : 1 }}
            className="flex justify-center mb-24"
          >
            <Button
              size="lg"
              variant="premium"
              onClick={handleInvestClick}
              className="text-lg md:text-xl px-10 py-7 group magnetic-button"
            >
              <span className="relative z-10 flex items-center gap-3">
                {t('hero.invest')}
                <motion.span
                  animate={prefersReducedMotion ? {} : { x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </Button>
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
        <span className="text-xs uppercase tracking-widest font-light">Scopri</span>
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
