import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Euro, Key, ClipboardCheck, TrendingUp, Check, CheckCircle2 } from "lucide-react";
import { SlideWithOverlays, OverlayConfig } from "./SlideWithOverlays";
import { StepIllustration } from "./StepIllustration";

// PDF slide images (kept for mobile)
import slideInvest from "@/assets/journey-step-invest.jpg";
import slideAcquire from "@/assets/journey-step-acquire.jpg";
import slideManage from "@/assets/journey-step-manage.jpg";
import slideEarn from "@/assets/journey-step-earn.jpg";

// Step icons mapping
const stepIcons = [Euro, Key, ClipboardCheck, TrendingUp];

// Color values for overlays (hex)
const stepColors = {
  invest: "#10b981",   // emerald
  acquire: "#0ea5e9",  // sky
  manage: "#f59e0b",   // amber
  earn: "#8b5cf6"      // violet
};

// Overlay configurations for each step (mobile only now)
const stepOverlays: Record<string, OverlayConfig[]> = {
  invest: [
    { id: 'inv-1', type: 'highlight', position: { x: '15%', y: '30%', width: '25%', height: '20%' }, delay: 0 },
    { id: 'inv-2', type: 'arrow', position: { x: '42%', y: '38%' }, delay: 600, arrowDirection: 'right' },
    { id: 'inv-3', type: 'highlight', position: { x: '55%', y: '30%', width: '30%', height: '25%' }, delay: 1200 },
    { id: 'inv-4', type: 'callout', position: { x: '20%', y: '55%' }, delay: 1800, content: 'slideOverlays.invest.minInvestment' },
    { id: 'inv-5', type: 'caption', position: { x: '10%', y: '80%', width: '80%' }, delay: 2400, content: 'slideOverlays.invest.caption' },
  ],
  acquire: [
    { id: 'acq-1', type: 'highlight', position: { x: '10%', y: '25%', width: '20%', height: '18%' }, delay: 0 },
    { id: 'acq-2', type: 'highlight', position: { x: '10%', y: '50%', width: '20%', height: '18%' }, delay: 500 },
    { id: 'acq-3', type: 'arrow', position: { x: '32%', y: '40%' }, delay: 1000, arrowDirection: 'right' },
    { id: 'acq-4', type: 'highlight', position: { x: '55%', y: '35%', width: '30%', height: '30%' }, delay: 1500 },
    { id: 'acq-5', type: 'callout', position: { x: '60%', y: '70%' }, delay: 2000, content: 'slideOverlays.acquire.university' },
    { id: 'acq-6', type: 'caption', position: { x: '10%', y: '85%', width: '80%' }, delay: 2500, content: 'slideOverlays.acquire.caption' },
  ],
  manage: [
    { id: 'man-1', type: 'highlight', position: { x: '20%', y: '25%', width: '25%', height: '20%' }, delay: 0 },
    { id: 'man-2', type: 'callout', position: { x: '22%', y: '48%' }, delay: 500, content: 'slideOverlays.manage.students' },
    { id: 'man-3', type: 'highlight', position: { x: '55%', y: '25%', width: '25%', height: '20%' }, delay: 1000 },
    { id: 'man-4', type: 'callout', position: { x: '57%', y: '48%' }, delay: 1500, content: 'slideOverlays.manage.tourists' },
    { id: 'man-5', type: 'arrow', position: { x: '47%', y: '32%', width: '40px', height: '40px' }, delay: 2000, arrowDirection: 'down' },
    { id: 'man-6', type: 'caption', position: { x: '15%', y: '80%', width: '70%' }, delay: 2500, content: 'slideOverlays.manage.caption' },
  ],
  earn: [
    { id: 'ear-1', type: 'highlight', position: { x: '15%', y: '30%', width: '30%', height: '25%' }, delay: 0 },
    { id: 'ear-2', type: 'arrow', position: { x: '47%', y: '40%' }, delay: 600, arrowDirection: 'right' },
    { id: 'ear-3', type: 'highlight', position: { x: '55%', y: '30%', width: '30%', height: '25%' }, delay: 1200 },
    { id: 'ear-4', type: 'callout', position: { x: '60%', y: '58%' }, delay: 1800, content: 'slideOverlays.earn.quarterly' },
    { id: 'ear-5', type: 'callout', position: { x: '20%', y: '60%' }, delay: 2200, content: 'slideOverlays.earn.dashboard' },
    { id: 'ear-6', type: 'caption', position: { x: '10%', y: '82%', width: '80%' }, delay: 2800, content: 'slideOverlays.earn.caption' },
  ],
};

interface JourneyStep {
  id: "invest" | "acquire" | "manage" | "earn";
  titleKey: string;
  descriptionKey: string;
  detailKey: string;
  keyPointsKey: string;
  color: string;
  accentColor: string;
  bgGradient: string;
  slideImage: string;
}

const steps: JourneyStep[] = [
  {
    id: "invest",
    titleKey: "infographic.steps.invest.title",
    descriptionKey: "infographic.steps.invest.description",
    detailKey: "infographic.steps.invest.detail",
    keyPointsKey: "infographic.steps.invest.keyPoints",
    color: "from-emerald-500/20 to-emerald-500/5",
    accentColor: "bg-emerald-500",
    bgGradient: "from-emerald-500/10 via-transparent to-transparent",
    slideImage: slideInvest
  },
  {
    id: "acquire",
    titleKey: "infographic.steps.acquire.title",
    descriptionKey: "infographic.steps.acquire.description",
    detailKey: "infographic.steps.acquire.detail",
    keyPointsKey: "infographic.steps.acquire.keyPoints",
    color: "from-sky-500/20 to-sky-500/5",
    accentColor: "bg-sky-500",
    bgGradient: "from-sky-500/10 via-transparent to-transparent",
    slideImage: slideAcquire
  },
  {
    id: "manage",
    titleKey: "infographic.steps.manage.title",
    descriptionKey: "infographic.steps.manage.description",
    detailKey: "infographic.steps.manage.detail",
    keyPointsKey: "infographic.steps.manage.keyPoints",
    color: "from-amber-500/20 to-amber-500/5",
    accentColor: "bg-amber-500",
    bgGradient: "from-amber-500/10 via-transparent to-transparent",
    slideImage: slideManage
  },
  {
    id: "earn",
    titleKey: "infographic.steps.earn.title",
    descriptionKey: "infographic.steps.earn.description",
    detailKey: "infographic.steps.earn.detail",
    keyPointsKey: "infographic.steps.earn.keyPoints",
    color: "from-violet-500/20 to-violet-500/5",
    accentColor: "bg-violet-500",
    bgGradient: "from-violet-500/10 via-transparent to-transparent",
    slideImage: slideEarn
  }
];

export const HorizontalValueJourney = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [activeStep, setActiveStep] = useState(0);
  const [isInViewport, setIsInViewport] = useState(false);
  const [showScrollBlockedFeedback, setShowScrollBlockedFeedback] = useState(false);

  // Persist wheel-gesture lock across re-renders/effect re-runs
  const wheelLockRef = useRef(false);
  const wheelTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

    const handleWheel = (e: WheelEvent) => {
      // Allow normal scroll at boundaries to exit section
      if (activeStep === 0 && e.deltaY < 0) return;
      if (activeStep === 3 && e.deltaY > 0) return;

      e.preventDefault();

      // IMPORTANT: use refs so the lock doesn't reset when activeStep updates
      if (wheelLockRef.current) {
        // Show visual feedback that scroll is blocked
        setShowScrollBlockedFeedback(true);
        setTimeout(() => setShowScrollBlockedFeedback(false), 300);
        return;
      }
      wheelLockRef.current = true;

      // Always move exactly 1 step, regardless of scroll intensity
      if (e.deltaY > 0 && activeStep < 3) {
        handleStepClick(activeStep + 1);
      } else if (e.deltaY < 0 && activeStep > 0) {
        handleStepClick(activeStep - 1);
      }

      // Cooldown to prevent multi-trigger from single gesture
      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
      wheelTimeoutRef.current = setTimeout(() => {
        wheelLockRef.current = false;
        wheelTimeoutRef.current = null;
      }, 800);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
        wheelTimeoutRef.current = null;
      }
      wheelLockRef.current = false;
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
                  {/* Card with PDF slide and overlays */}
                  <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${step.color} border border-border/50 shadow-lg`}>
                    {/* Step number badge */}
                    <div className={`absolute top-4 left-4 w-10 h-10 rounded-full ${step.accentColor} text-white flex items-center justify-center font-bold text-lg z-20`}>
                      {index + 1}
                    </div>
                    
                    {/* PDF Slide with Animated Overlays */}
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <SlideWithOverlays
                        slideImage={step.slideImage}
                        overlays={stepOverlays[step.id] || []}
                        isActive={true}
                        stepColor={stepColors[step.id as keyof typeof stepColors]}
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 relative z-10">
                      <h3 className="text-xl font-bold mb-2">
                        {t(step.titleKey)}
                      </h3>
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
      className="relative h-[400vh] bg-accent/30"
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
              const keyPoints = t(step.keyPointsKey, { returnObjects: true }) as string[];
              
              return (
                <motion.div
                  key={step.id}
                  className="w-screen flex-shrink-0 px-8 md:px-12 lg:px-16"
                >
                  <div className={`
                    max-w-6xl mx-auto h-[60vh] rounded-3xl overflow-hidden
                    bg-gradient-to-br ${step.color}
                    border border-border/50 shadow-lg
                    transition-all duration-500
                    ${isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-60'}
                  `}>
                    {/* Two-column layout */}
                    <div className="grid grid-cols-2 h-full">
                      {/* Left: Illustration */}
                      <div className={`relative flex items-center justify-center bg-gradient-to-br ${step.bgGradient}`}>
                        {/* Step number badge */}
                        <div className="absolute top-6 left-6 z-20">
                          <div className={`w-12 h-12 rounded-full ${step.accentColor} text-white flex items-center justify-center font-bold text-xl shadow-lg`}>
                            {index + 1}
                          </div>
                        </div>
                        
                        <StepIllustration step={step.id} isActive={isActive} />
                      </div>
                      
                      {/* Right: Content */}
                      <div className="flex flex-col justify-center p-8 lg:p-12 space-y-6">
                        {/* Badge */}
                        <motion.span
                          initial={{ opacity: 0, y: 10 }}
                          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className={`inline-block self-start px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide text-white ${step.accentColor}`}
                        >
                          {t(step.descriptionKey)}
                        </motion.span>
                        
                        {/* Title */}
                        <motion.h3
                          initial={{ opacity: 0, y: 10 }}
                          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                          className="text-3xl lg:text-4xl font-display font-extrabold text-foreground"
                        >
                          {t(step.titleKey)}
                        </motion.h3>
                        
                        {/* Description */}
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                          transition={{ duration: 0.3, delay: 0.3 }}
                          className="text-lg text-muted-foreground leading-relaxed"
                        >
                          {t(step.detailKey)}
                        </motion.p>
                        
                        {/* Key Points */}
                        <motion.ul
                          initial={{ opacity: 0 }}
                          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
                          transition={{ duration: 0.3, delay: 0.4 }}
                          className="space-y-3"
                        >
                          {Array.isArray(keyPoints) && keyPoints.map((point, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                              transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                              className="flex items-center gap-3 text-foreground"
                            >
                              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                              <span className="text-base font-medium">{point}</span>
                            </motion.li>
                          ))}
                        </motion.ul>
                      </div>
                    </div>
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
                        ${showScrollBlockedFeedback && isActive ? 'animate-pulse ring-white/60' : ''}
                      `}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      animate={showScrollBlockedFeedback && isActive ? { scale: [1, 1.15, 1] } : {}}
                      transition={{ duration: 0.3 }}
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
      
      {/* Scroll blocked micro-feedback */}
      <AnimatePresence>
        {showScrollBlockedFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 
                       bg-foreground/80 text-background text-xs px-3 py-1.5 rounded-full
                       backdrop-blur-sm z-50 pointer-events-none"
          >
            {t('infographic.scrollHint', 'Attendi per continuare')}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
