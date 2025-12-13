import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, PiggyBank, CheckCircle2, Home, Calendar, Gift } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const StudentInfographic: React.FC = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const steps = [
    {
      id: 0,
      icon: Search,
      title: t('studentInfographic.steps.search.title'),
      description: t('studentInfographic.steps.search.description'),
    },
    {
      id: 1,
      icon: PiggyBank,
      title: t('studentInfographic.steps.save.title'),
      description: t('studentInfographic.steps.save.description'),
    }
  ];

  const benefits = [
    { icon: Calendar, label: t('studentInfographic.benefits.contract') },
    { icon: PiggyBank, label: t('studentInfographic.benefits.savings') },
    { icon: Gift, label: t('studentInfographic.benefits.examDays') },
  ];

  return (
    <motion.div 
      ref={ref}
      className="w-full max-w-3xl mx-auto px-4 py-6 md:py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium mb-4 inline-block border-b border-primary/30 pb-1">
          {t('studentInfographic.badge')}
        </span>
        <h2 className="text-2xl md:text-4xl font-extrabold text-foreground mb-3">
          {t('studentInfographic.title')}
        </h2>
        <p className="text-muted-foreground text-base max-w-md mx-auto">
          {t('studentInfographic.subtitle')}
        </p>
      </div>

      {/* Two-step flow */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-8">
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          return (
            <React.Fragment key={step.id}>
              <motion.div
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border/40 w-full md:w-56"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                transition={{ duration: 0.4, delay: index * 0.2 }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <IconComponent className="w-7 h-7 text-primary" strokeWidth={1.5} />
                </div>
                <span className="text-xs text-primary/70 font-medium mb-1">{index + 1}.</span>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground font-light">
                  {step.description}
                </p>
              </motion.div>
              
              {/* Arrow between steps */}
              {index < steps.length - 1 && (
                <motion.div
                  className="hidden md:flex items-center"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.5 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <div className="w-12 h-px bg-primary/30" />
                  <div className="w-0 h-0 border-t-4 border-b-4 border-l-6 border-t-transparent border-b-transparent border-l-primary/40" />
                </motion.div>
              )}
              
              {/* Mobile arrow */}
              {index < steps.length - 1 && (
                <motion.div
                  className="md:hidden flex flex-col items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isInView ? 1 : 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <div className="h-6 w-px bg-primary/30" />
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-6 border-l-transparent border-r-transparent border-t-primary/40" />
                </motion.div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Benefits grid */}
      <motion.div
        className="grid grid-cols-3 gap-3 md:gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        {benefits.map((benefit, index) => {
          const IconComponent = benefit.icon;
          return (
            <div 
              key={index}
              className="flex flex-col items-center text-center p-3 md:p-4 rounded-xl bg-card/50 border border-border/30"
            >
              <IconComponent className="w-5 h-5 text-primary mb-2" strokeWidth={1.5} />
              <span className="text-xs md:text-sm text-muted-foreground font-light leading-tight">
                {benefit.label}
              </span>
            </div>
          );
        })}
      </motion.div>

      {/* CTA */}
      <motion.div 
        className="mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full">
          <CheckCircle2 className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">
            {t('studentInfographic.cta')}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StudentInfographic;
