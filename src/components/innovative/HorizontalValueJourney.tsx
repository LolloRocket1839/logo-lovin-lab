import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/use-mobile";

// Import generated images
import investImage from "@/assets/journey-step-invest.png";
import acquireImage from "@/assets/journey-step-acquire.jpg";
import manageImage from "@/assets/journey-step-manage.jpg";
import earnImage from "@/assets/journey-step-earn.jpg";
import jungleRentLogo from "@/assets/jungle-rent-logo.svg";

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
                        className="absolute bottom-4 right-4 w-10 h-10 object-contain opacity-80"
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
                        className="absolute bottom-6 right-6 w-12 h-12 object-contain opacity-80"
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

        {/* Step indicators */}
        <div className="pb-12 flex justify-center gap-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`
                h-3 rounded-full transition-all duration-300
                ${index === activeStep 
                  ? `${step.accentColor} w-8` 
                  : index < activeStep 
                    ? `${step.accentColor} opacity-50 w-3` 
                    : 'bg-muted-foreground/20 w-3'
                }
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
