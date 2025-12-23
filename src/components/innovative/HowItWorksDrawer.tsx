import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Euro, Key, Home, Users, TrendingUp, ChevronDown } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const steps = [
  { key: "invest", icon: Euro },
  { key: "acquire", icon: Key },
  { key: "manage", icon: Home },
  { key: "rent", icon: Users },
  { key: "win", icon: TrendingUp },
];

export const HowItWorksDrawer = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="mt-6 md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mx-auto"
        aria-expanded={isOpen}
      >
        <span>{t('hero.howItWorks')}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-6 pt-6 border-t border-border/20">
              <div className="space-y-4">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.key}
                      initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: prefersReducedMotion ? 0 : 0.3, 
                        delay: prefersReducedMotion ? 0 : index * 0.08 
                      }}
                      className="flex items-start gap-3"
                    >
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        {index < steps.length - 1 && (
                          <div className="w-0.5 h-4 bg-primary/20 mt-1" />
                        )}
                      </div>
                      <div className="pt-1">
                        <h4 className="font-semibold text-foreground text-sm">
                          {t(`howItWorks.steps.${step.key}.title`)}
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {t(`howItWorks.steps.${step.key}.desc`)}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
