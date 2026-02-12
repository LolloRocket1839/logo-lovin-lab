import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Euro, Key, Users, TrendingUp } from "lucide-react";

const steps = [
  { key: "invest", icon: Euro },
  { key: "acquire", icon: Key },
  { key: "rent", icon: Users },
  { key: "win", icon: TrendingUp },
];

export const HowItWorksMobile = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Track scroll position for indicators
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = 168 + 12; // card width + gap
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(index, steps.length - 1));
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="py-8 bg-background md:hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <span className="inline-block px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs uppercase tracking-[0.15em] font-medium mb-3">
            {t("howItWorks.badge")}
          </span>
          <h2 className="text-2xl font-display font-bold text-foreground">
            {t("howItWorks.title")}
          </h2>
        </div>

        {/* Larger horizontal scroll cards with better touch targets */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 pl-4"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.key}
                className={`flex-shrink-0 w-[168px] snap-center bg-card border border-border/30 rounded-xl p-5 text-center shadow-sm active:scale-[0.98] transition-transform ${index === steps.length - 1 ? 'mr-4' : ''}`}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-base mb-2">
                  {t(`howItWorks.steps.${step.key}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`howItWorks.steps.${step.key}.desc`)}
                </p>
              </div>
            );
          })}
        </div>

        {/* Scroll indicators */}
        <div className="flex justify-center gap-2 mt-3">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                index === activeIndex 
                  ? "w-6 bg-primary" 
                  : "w-1.5 bg-border"
              }`}
            />
          ))}
        </div>

        {/* Highlight stat */}
        <div className="mt-6 py-5 px-5 bg-primary/5 rounded-xl border border-primary/20 text-center">
          <div className="text-4xl font-bold text-primary mb-1">25%</div>
          <p className="text-sm text-muted-foreground">
            {t("howItWorks.savingHighlight")}
          </p>
        </div>
      </div>
    </section>
  );
};
