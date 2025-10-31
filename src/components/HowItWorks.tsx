import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MapPin, UserPlus, FileCheck, HeartHandshake } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WaitlistDialog } from "@/components/WaitlistDialog";

export const HowItWorks = () => {
  const { t } = useTranslation();
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  const steps = [
    {
      icon: MapPin,
      title: t('howItWorks.step1Title'),
      description: t('howItWorks.step1Desc'),
      step: "01",
      bullets: [
        t('howItWorks.step1Bullet1'),
        t('howItWorks.step1Bullet2'),
        t('howItWorks.step1Bullet3')
      ]
    },
    {
      icon: UserPlus,
      title: t('howItWorks.step2Title'),
      description: t('howItWorks.step2Desc'),
      step: "02",
      bullets: [
        t('howItWorks.step2Bullet1'),
        t('howItWorks.step2Bullet2'),
        t('howItWorks.step2Bullet3')
      ]
    },
    {
      icon: FileCheck,
      title: t('howItWorks.step3Title'),
      description: t('howItWorks.step3Desc'),
      step: "03",
      bullets: [
        t('howItWorks.step3Bullet1'),
        t('howItWorks.step3Bullet2'),
        t('howItWorks.step3Bullet3')
      ]
    },
    {
      icon: HeartHandshake,
      title: t('howItWorks.step4Title'),
      description: t('howItWorks.step4Desc'),
      step: "04",
      bullets: [
        t('howItWorks.step4Bullet1'),
        t('howItWorks.step4Bullet2')
      ]
    }
  ];

  return (
    <section id="how-it-works" aria-labelledby="how-it-works-heading" className="py-20 md:py-32 lg:py-40 bg-gradient-to-b from-background to-accent/10 relative overflow-hidden scroll-mt-[-250px]">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-border" />
      
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
      
      <div className="container px-8 relative z-10">
        <div className="text-center mb-12 md:mb-20 lg:mb-28 max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6 font-medium">
            {t('howItWorks.sectionLabel')}
          </p>
          <h2 id="how-it-works-heading" className="text-3xl md:text-5xl lg:text-7xl font-display font-bold mb-6 leading-tight text-foreground tracking-tight">
            {t('howItWorks.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
            <strong>{t('howItWorks.sectionSubtitle')}</strong>
          </p>
          
          <ol className="sr-only">
            <li><strong>Step 1:</strong> {t('howItWorks.step1Title')}</li>
            <li><strong>Step 2:</strong> {t('howItWorks.step2Title')}</li>
            <li><strong>Step 3:</strong> {t('howItWorks.step3Title')}</li>
            <li><strong>Step 4:</strong> {t('howItWorks.step4Title')}</li>
          </ol>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 max-w-7xl mx-auto relative">
          <div className="hidden md:block absolute top-24 left-1/6 right-1/6 h-[1px] bg-border -z-10" />
          
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card 
                key={index}
                className="relative p-6 md:p-8 lg:p-12 backdrop-blur-xl bg-white/10 border border-white/20 hover:border-white/40 transition-all duration-700 group hover:-translate-y-1 hover:bg-white/15"
                style={{ 
                  animationDelay: `${index * 150}ms`,
                  boxShadow: 'var(--shadow-glass)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--shadow-glass-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--shadow-glass)';
                }}
              >
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="mb-8 relative z-10">
                  <div className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center text-primary font-display text-lg font-medium group-hover:border-primary/50 transition-colors duration-700 backdrop-blur-sm">
                    {step.step}
                  </div>
                </div>

                <div className="mb-6 relative z-10">
                  <Icon className="w-8 h-8 text-primary/70 group-hover:text-primary transition-colors duration-700" strokeWidth={1.5} />
                </div>

                <h3 className="text-xl font-display font-semibold mb-3 leading-tight text-foreground relative z-10">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light relative z-10 mb-4">
                  {step.description}
                </p>
                
                <ul className="space-y-2 relative z-10">
                  {step.bullets.map((bullet, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/70 mt-1.5 mr-2 flex-shrink-0" />
                      <span className="font-light">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {index === 1 && (
                  <Button 
                    onClick={() => setWaitlistOpen(true)}
                    className="w-full mt-8
                               bg-primary/90 hover:bg-primary
                               text-primary-foreground
                               h-11 text-sm font-medium
                               border border-primary/20
                               transition-all duration-300
                               hover:shadow-lg hover:shadow-primary/20
                               rounded-lg
                               relative z-10"
                  >
                    {t('howItWorks.waitlistCta')}
                  </Button>
                )}
              </Card>
            );
          })}
        </div>

        <WaitlistDialog open={waitlistOpen} onOpenChange={setWaitlistOpen} />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-border" />
    </section>
  );
};