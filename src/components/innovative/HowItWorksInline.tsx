import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Coins, Key, Users, TrendingUp, ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const steps = [
  { key: "invest", icon: Coins },
  { key: "acquire", icon: Key },
  { key: "rent", icon: Users },
  { key: "earn", icon: TrendingUp },
];

export const HowItWorksInline = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(false);

  if (isMobile) {
    return (
      <div className="w-full">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center gap-2 mx-auto text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <span>{t('howItWorks.title', 'Come funziona?')}</span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-3 mt-4 px-4">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.key}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2 p-3 rounded-lg bg-background/40 backdrop-blur-sm border border-border/20"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-medium text-foreground">
                        {t(`howItWorks.steps.${step.key}.title`)}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2 md:gap-4">
      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          <div key={step.key} className="flex items-center gap-2 md:gap-4">
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-background/40 backdrop-blur-sm border border-border/20 hover:bg-background/60 transition-colors">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary">
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-medium text-foreground whitespace-nowrap">
                {t(`howItWorks.steps.${step.key}.title`)}
              </span>
            </div>
            {index < steps.length - 1 && (
              <span className="text-primary/60 font-bold">→</span>
            )}
          </div>
        );
      })}
    </div>
  );
};
