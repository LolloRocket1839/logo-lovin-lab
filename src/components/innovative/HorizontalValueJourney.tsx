import { useRef, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/use-mobile";
import { Euro, Key, ClipboardCheck, TrendingUp, Check, CheckCircle2 } from "lucide-react";
import { StepIllustration } from "./StepIllustration";

// PDF slide images (kept for mobile)
import slideInvest from "@/assets/journey-step-invest.jpg";
import slideAcquire from "@/assets/journey-step-acquire.jpg";
import slideManage from "@/assets/journey-step-manage.jpg";
import slideEarn from "@/assets/journey-step-earn.jpg";

// Step icons mapping
const stepIcons = [Euro, Key, ClipboardCheck, TrendingUp];

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
  const isMobile = useIsMobile();
  const [activeStep, setActiveStep] = useState(0);

  // Handle click on step indicator to jump to that step
  const handleStepClick = useCallback((stepIndex: number) => {
    setActiveStep(stepIndex);
  }, []);

  // Mobile fallback - vertical layout with static images
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
                {/* Connecting line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-px h-8 z-0">
                    <div className={`w-full h-full ${step.accentColor}`} />
                  </div>
                )}
                
                <div className="mb-12 last:mb-0">
                  {/* Card with slide image */}
                  <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${step.color} border border-border/50 shadow-lg`}>
                    {/* Step number badge */}
                    <div className={`absolute top-4 left-4 w-10 h-10 rounded-full ${step.accentColor} text-white flex items-center justify-center font-bold text-lg z-20`}>
                      {index + 1}
                    </div>
                    
                    {/* Static Slide Image */}
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img
                        src={step.slideImage}
                        alt={t(step.titleKey)}
                        className="w-full h-full object-contain bg-white"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 relative z-10">
                      <h3 className="text-xl font-bold mb-2">
                        {t(step.titleKey)}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Desktop - static layout with clickable tabs
  return (
    <section 
      ref={containerRef}
      className="relative py-16 md:py-24 bg-accent/30"
      id="value-journey"
    >
      <div className="container mx-auto px-4 md:px-8">
        {/* Section title */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {t('infographic.badge', 'Il nostro modello')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold">
            {t('infographic.title', 'Come funziona')}
          </h2>
        </div>

        {/* Step tabs */}
        <div className="flex justify-center gap-2 md:gap-4 mb-8">
          {steps.map((step, index) => {
            const Icon = stepIcons[index];
            const isActive = index === activeStep;
            
            return (
              <button
                key={step.id}
                onClick={() => handleStepClick(index)}
                className={`
                  flex flex-col items-center gap-2 px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive 
                    ? `${step.accentColor} text-white shadow-lg` 
                    : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                  }
                `}
                aria-label={`${t(step.titleKey)} - Step ${index + 1}`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold">{index + 1}</span>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wide hidden md:block">
                  {t(step.titleKey)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active step content */}
        <div className="max-w-6xl mx-auto">
          {steps.map((step, index) => {
            if (index !== activeStep) return null;
            
            const keyPoints = t(step.keyPointsKey, { returnObjects: true }) as string[];
            
            return (
              <div
                key={step.id}
                className={`
                  rounded-3xl overflow-hidden
                  bg-gradient-to-br ${step.color}
                  border border-border/50 shadow-lg
                `}
              >
                {/* Two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
                  {/* Left: Illustration */}
                  <div className={`relative flex items-center justify-center bg-gradient-to-br ${step.bgGradient} p-8`}>
                    {/* Step number badge */}
                    <div className="absolute top-6 left-6 z-20">
                      <div className={`w-12 h-12 rounded-full ${step.accentColor} text-white flex items-center justify-center font-bold text-xl shadow-lg`}>
                        {index + 1}
                      </div>
                    </div>
                    
                    <StepIllustration step={step.id} isActive={true} />
                  </div>
                  
                  {/* Right: Content */}
                  <div className="flex flex-col justify-center p-8 lg:p-12 space-y-6">
                    {/* Badge */}
                    <span className={`inline-block self-start px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide text-white ${step.accentColor}`}>
                      {t(step.descriptionKey)}
                    </span>
                    
                    {/* Title */}
                    <h3 className="text-3xl lg:text-4xl font-display font-extrabold text-foreground">
                      {t(step.titleKey)}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {t(step.detailKey)}
                    </p>
                    
                    {/* Key Points */}
                    <ul className="space-y-3">
                      {Array.isArray(keyPoints) && keyPoints.map((point, i) => (
                        <li key={i} className="flex items-center gap-3 text-foreground">
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-base font-medium">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Step indicators at bottom */}
        <div className="flex justify-center gap-2 mt-8">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => handleStepClick(index)}
              className={`
                w-3 h-3 rounded-full transition-all duration-200
                ${index === activeStep ? step.accentColor : 'bg-muted-foreground/30'}
              `}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
