import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Euro, Key, Home, Users, TrendingUp, ChevronDown } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const steps = [
  { key: "invest", icon: Euro },
  { key: "acquire", icon: Key },
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
            <motion.div 
              className="mt-6 pt-6 border-t border-border/20"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: prefersReducedMotion ? 0 : 0.12,
                    delayChildren: prefersReducedMotion ? 0 : 0.1
                  }
                }
              }}
            >
              <div className="space-y-2 max-w-xs mx-auto">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.key}
                      variants={{
                        hidden: { opacity: 0, x: -20, scale: 0.95 },
                        visible: { 
                          opacity: 1, 
                          x: 0, 
                          scale: 1,
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 24
                          }
                        }
                      }}
                      className="flex items-start gap-4"
                    >
                      <div className="flex flex-col items-center flex-shrink-0 w-10">
                        <motion.div 
                          className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20"
                          whileTap={{ scale: 0.95 }}
                        >
                          <Icon className="w-4 h-4 text-primary" />
                        </motion.div>
                        {index < steps.length - 1 && (
                          <motion.div 
                            className="w-0.5 bg-primary/20 mt-1"
                            initial={{ height: 0 }}
                            animate={{ height: 12 }}
                            transition={{ 
                              delay: prefersReducedMotion ? 0 : 0.3 + index * 0.12,
                              duration: prefersReducedMotion ? 0 : 0.3,
                              ease: "easeOut"
                            }}
                          />
                        )}
                      </div>
                      <div className="flex flex-col justify-center min-h-[40px] text-left pt-1">
                        <h4 className="font-semibold text-foreground text-sm leading-tight">
                          {t(`howItWorks.steps.${step.key}.title`)}
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                          {t(`howItWorks.steps.${step.key}.desc`)}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
