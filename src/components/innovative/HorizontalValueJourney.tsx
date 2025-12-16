import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Euro, Key, ClipboardCheck, TrendingUp, Check } from "lucide-react";

// Import generated images
import investImage from "@/assets/journey-step-invest.png";
import acquireImage from "@/assets/journey-step-acquire.png";
import manageImage from "@/assets/journey-step-manage.png";
import earnImage from "@/assets/journey-step-earn.png";
import jungleRentLogo from "@/assets/jungle-rent-logo.svg";

// Step icons mapping
const stepIcons = [Euro, Key, ClipboardCheck, TrendingUp];

interface JourneyStep {
  id: string;
  image: string;
  titleKey: string;
  descriptionKey: string;
  color: string;
  accentColor: string;
}

const steps: JourneyStep[] = [
  {
    id: "invest",
    image: investImage,
    titleKey: "infographic.steps.invest.title",
    descriptionKey: "infographic.steps.invest.detail",
    color: "from-emerald-500/20 to-emerald-500/5",
    accentColor: "bg-emerald-500"
  },
  {
    id: "acquire",
    image: acquireImage,
    titleKey: "infographic.steps.acquire.title",
    descriptionKey: "infographic.steps.acquire.detail",
    color: "from-sky-500/20 to-sky-500/5",
    accentColor: "bg-sky-500"
  },
  {
    id: "manage",
    image: manageImage,
    titleKey: "infographic.steps.manage.title",
    descriptionKey: "infographic.steps.manage.detail",
    color: "from-amber-500/20 to-amber-500/5",
    accentColor: "bg-amber-500"
  },
  {
    id: "earn",
    image: earnImage,
    titleKey: "infographic.steps.earn.title",
    descriptionKey: "infographic.steps.earn.detail",
    color: "from-violet-500/20 to-violet-500/5",
    accentColor: "bg-violet-500"
  }
];

export const HorizontalValueJourney = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [activeStep, setActiveStep] = useState(0);
  const [isInViewport, setIsInViewport] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform vertical scroll to horizontal movement
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  const smoothX = useSpring(x, { stiffness: 50, damping: 20 });

  // Progress bar
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Update active step based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      const stepIndex = Math.min(Math.floor(value * 4), 3);
      setActiveStep(stepIndex);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  // Track if section is in viewport for keyboard navigation
  useEffect(() => {
    if (!containerRef.current || isMobile) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => setIsInViewport(entry.isIntersecting),
      { threshold: 0.1 }
    );
    
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isMobile]);

  // Handle click on step indicator to jump to that step
  const handleStepClick = useCallback((stepIndex: number) => {
    if (!containerRef.current) return;
    
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetScroll = containerTop + (stepIndex / 3) * containerHeight;
    
    window.scrollTo({
      top: targetScroll,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  }, [prefersReducedMotion]);

  // Keyboard navigation for desktop
  useEffect(() => {
    if (isMobile || !isInViewport) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'Enter':
          e.preventDefault();
          if (activeStep < 3) {
            handleStepClick(activeStep + 1);
          }
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          if (activeStep > 0) {
            handleStepClick(activeStep - 1);
          }
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeStep, isMobile, isInViewport, handleStepClick]);

  // Wheel/trackpad scroll snapping - one gesture = one step
  useEffect(() => {
    if (isMobile || !isInViewport) return;
    
    const container = containerRef.current;
    if (!container) return;
    
    let isScrolling = false;
    let scrollTimeout: ReturnType<typeof setTimeout>;
    
    const handleWheel = (e: WheelEvent) => {
      // Allow normal scroll at boundaries to exit section
      if (activeStep === 0 && e.deltaY < 0) return;
      if (activeStep === 3 && e.deltaY > 0) return;
      
      e.preventDefault();
      
      if (isScrolling) return;
      
      isScrolling = true;
      
      // Always move exactly 1 step, regardless of scroll intensity
      if (e.deltaY > 0 && activeStep < 3) {
        handleStepClick(activeStep + 1);
      } else if (e.deltaY < 0 && activeStep > 0) {
        handleStepClick(activeStep - 1);
      }
      
      // Cooldown to prevent multi-trigger from single gesture
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 800);
    };
    
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
      clearTimeout(scrollTimeout);
    };
  }, [activeStep, isMobile, isInViewport, handleStepClick]);

  // Mobile fallback - vertical layout with images
  if (isMobile) {
    return (
      <section className="py-16 px-4 gradient-jungle-section" id="value-journey">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-display font-extrabold text-center mb-12">
            {t('infographic.title', 'Come funziona')}
          </h2>
          
          <div className="relative">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                {/* Animated connecting line */}
                {index < steps.length - 1 && (
                  <motion.div 
                    className="absolute left-1/2 -translate-x-1/2 top-full w-px h-8 overflow-hidden z-0"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className={`w-full h-full ${step.accentColor}`}
                      initial={{ y: "-100%" }}
                      whileInView={{ y: "0%" }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      viewport={{ once: true }}
                    />
                  </motion.div>
                )}
                
                <motion.div 
                  className="mb-12 last:mb-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Card with image */}
                  <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${step.color} border border-border/50 shadow-lg`}>
                    {/* Step number badge */}
                    <div className={`absolute top-4 left-4 w-10 h-10 rounded-full ${step.accentColor} text-white flex items-center justify-center font-bold text-lg z-10`}>
                      {index + 1}
                    </div>
                    
                    {/* Image */}
                    <div className="aspect-square relative overflow-hidden">
                      <img 
                        src={step.image} 
                        alt={t(step.titleKey)}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                      {/* Logo Jungle Rent */}
                      <img 
                        src={jungleRentLogo} 
                        alt="Jungle Rent" 
                        className="absolute bottom-4 right-4 w-10 h-10 object-contain mix-blend-multiply"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 -mt-24 relative z-10">
                      <h3 className="text-xl font-bold mb-2">
                        {t(step.titleKey)}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {t(step.descriptionKey)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={containerRef}
      className="relative h-[400vh]"
      id="value-journey"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-muted z-50">
          <motion.div 
            className="h-full bg-primary"
            style={{ width: progressWidth }}
          />
        </div>

        {/* Section title */}
        <div className="pt-24 pb-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            {t('infographic.badge', 'Il nostro modello')}
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold">
            {t('infographic.title', 'Come funziona')}
          </h2>
        </div>

        {/* Horizontal scrolling container */}
        <div className="flex-1 flex items-center">
          <motion.div
            style={prefersReducedMotion ? {} : { x: smoothX }}
            className="flex gap-0"
          >
            {steps.map((step, index) => {
              const isActive = index === activeStep;
              
              return (
                <motion.div
                  key={step.id}
                  className="w-screen flex-shrink-0 px-8 md:px-16 lg:px-24"
                >
                  <div className={`
                    max-w-5xl mx-auto h-[60vh] rounded-3xl overflow-hidden
                    bg-gradient-to-br ${step.color}
                    border border-border/50
                    flex items-center
                    transition-all duration-500
                    ${isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-60'}
                  `}>
                    {/* Image side */}
                    <div className="w-1/2 h-full relative overflow-hidden">
                      <motion.img
                        src={step.image}
                        alt={t(step.titleKey)}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: isActive ? 1 : 1.1 }}
                        transition={{ duration: 0.7 }}
                      />
                      {/* Step number overlay */}
                      <div className="absolute top-8 left-8">
                        <div className={`w-16 h-16 rounded-full ${step.accentColor} text-white flex items-center justify-center font-bold text-2xl shadow-lg`}>
                          {index + 1}
                        </div>
                      </div>
                      {/* Logo Jungle Rent */}
                      <img 
                        src={jungleRentLogo} 
                        alt="Jungle Rent" 
                        className="absolute bottom-6 right-6 w-12 h-12 object-contain mix-blend-multiply"
                      />
                    </div>
                    
                    {/* Content side */}
                    <div className="w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                      {/* Title */}
                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl md:text-4xl lg:text-5xl font-display font-extrabold mb-6"
                      >
                        {t(step.titleKey)}
                      </motion.h3>

                      {/* Description */}
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg md:text-xl text-muted-foreground leading-relaxed"
                      >
                        {t(step.descriptionKey)}
                      </motion.p>
                    </div>

                    {/* Arrow to next */}
                    {index < steps.length - 1 && (
                      <motion.div
                        className="absolute right-12 top-1/2 -translate-y-1/2 text-muted-foreground/30"
                        animate={prefersReducedMotion ? {} : { x: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <span className="text-6xl font-light">→</span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Interactive Step Indicators with Numbers & Titles */}
        <div className="pb-8 px-8">
          <div className="max-w-4xl mx-auto">
            {/* Connected steps visualization */}
            <div className="flex items-center justify-between relative">
              {/* Progress line background */}
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted-foreground/20" />
              
              {/* Progress line filled */}
              <motion.div 
                className="absolute top-5 left-0 h-0.5 bg-primary origin-left"
                style={{ width: progressWidth }}
              />
              
              {steps.map((step, index) => {
                const Icon = stepIcons[index];
                const isActive = index === activeStep;
                const isCompleted = index < activeStep;
                const isFuture = index > activeStep;
                
                return (
                  <button
                    key={step.id}
                    onClick={() => handleStepClick(index)}
                    className="relative z-10 flex flex-col items-center gap-2 group cursor-pointer transition-transform duration-200 hover:scale-105"
                    aria-label={`${t(step.titleKey)} - Step ${index + 1}`}
                  >
                    {/* Step circle with number/icon */}
                    <motion.div
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                        transition-all duration-300 shadow-md
                        ${isActive 
                          ? `${step.accentColor} text-white ring-4 ring-offset-2 ring-offset-background` 
                          : isCompleted 
                            ? `${step.accentColor} text-white` 
                            : 'bg-muted text-muted-foreground'
                        }
                        ${isActive ? 'ring-primary/30' : ''}
                      `}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </motion.div>
                    
                    {/* Step title - always visible */}
                    <motion.div
                      className={`
                        flex flex-col items-center gap-1
                        transition-all duration-300
                        ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}
                      `}
                    >
                      <span className={`
                        text-xs font-semibold uppercase tracking-wide
                        ${isActive ? 'text-foreground' : 'text-muted-foreground'}
                      `}>
                        {t(step.titleKey)}
                      </span>
                      
                      {/* Icon indicator */}
                      <Icon className={`
                        w-4 h-4 transition-colors
                        ${isActive ? 'text-primary' : 'text-muted-foreground/50'}
                      `} />
                    </motion.div>
                    
                    {/* Active indicator pill */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
