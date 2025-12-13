import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Euro, Key, ClipboardCheck, TrendingUp } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/use-mobile";

interface JourneyStep {
  id: string;
  icon: React.ElementType;
  titleKey: string;
  descriptionKey: string;
  color: string;
}

const steps: JourneyStep[] = [
  {
    id: "invest",
    icon: Euro,
    titleKey: "infographic.step1.title",
    descriptionKey: "infographic.step1.description",
    color: "from-primary/20 to-primary/5"
  },
  {
    id: "acquire",
    icon: Key,
    titleKey: "infographic.step2.title",
    descriptionKey: "infographic.step2.description",
    color: "from-blue-500/20 to-blue-500/5"
  },
  {
    id: "manage",
    icon: ClipboardCheck,
    titleKey: "infographic.step3.title",
    descriptionKey: "infographic.step3.description",
    color: "from-amber-500/20 to-amber-500/5"
  },
  {
    id: "earn",
    icon: TrendingUp,
    titleKey: "infographic.step4.title",
    descriptionKey: "infographic.step4.description",
    color: "from-green-500/20 to-green-500/5"
  }
];

export const HorizontalValueJourney = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [activeStep, setActiveStep] = useState(0);

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

  // Mobile fallback - vertical layout
  if (isMobile) {
    return (
      <section className="py-16 px-4 gradient-jungle-section" id="value-journey">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-display font-extrabold text-center mb-12">
            {t('infographic.title', 'Come funziona')}
          </h2>
          
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />
            
            {steps.map((step, index) => (
              <div key={step.id} className="relative flex gap-6 mb-12 last:mb-0">
                {/* Step number */}
                <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-card border-2 border-primary flex items-center justify-center">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                
                {/* Content */}
                <div className="flex-1 pt-2">
                  <h3 className="text-lg font-semibold mb-2">
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(step.descriptionKey)}
                  </p>
                </div>
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
              const Icon = step.icon;
              const isActive = index === activeStep;
              
              return (
                <motion.div
                  key={step.id}
                  className="w-screen flex-shrink-0 px-8 md:px-16 lg:px-24"
                >
                  <div className={`
                    max-w-4xl mx-auto h-[60vh] rounded-3xl p-8 md:p-12 lg:p-16
                    bg-gradient-to-br ${step.color}
                    border border-border/50
                    flex flex-col justify-center items-center text-center
                    transition-all duration-500
                    ${isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-60'}
                  `}>
                    {/* Step number */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                      className="mb-8"
                    >
                      <div className="relative">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-card shadow-xl flex items-center justify-center">
                          <Icon className="w-12 h-12 md:w-16 md:h-16 text-primary" strokeWidth={1.5} />
                        </div>
                        <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                          {index + 1}
                        </div>
                      </div>
                    </motion.div>

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
                      className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
                    >
                      {t(step.descriptionKey)}
                    </motion.p>

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

        {/* Step indicators */}
        <div className="pb-12 flex justify-center gap-3">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${index === activeStep 
                  ? 'bg-primary w-8' 
                  : index < activeStep 
                    ? 'bg-primary/50' 
                    : 'bg-muted-foreground/20'
                }
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
