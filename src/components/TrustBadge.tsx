import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { ExternalLink, ArrowRight } from "lucide-react";
import logo2i3t from "@/assets/2i3t-logo-green.png";
import { useHasBeenSeen } from "@/hooks/useScrollProgress";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const TrustBadge = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasBeenSeen = useHasBeenSeen(sectionRef, 0.3);
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <section 
      ref={sectionRef}
      className="py-6 md:py-10 bg-muted/30 relative overflow-hidden border-b border-border/20"
    >
      
      <div className="container px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="hidden md:block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-6 font-medium">
            {t('trustBadge.sectionLabel')}
          </p>
          
          <a 
            href="https://2i3t.it"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex flex-row items-center gap-4 md:gap-5 bg-card border border-border/20 rounded-xl px-4 py-4 sm:px-6 sm:py-5 md:px-10 md:py-6 mb-4 hover:border-primary/30 transition-colors duration-[var(--duration-fast)] cursor-pointer ${
              hasBeenSeen && !prefersReducedMotion 
                ? 'animate-fade-up' 
                : prefersReducedMotion 
                  ? '' 
                  : 'opacity-0'
            }`}
            style={{
              opacity: prefersReducedMotion ? 1 : undefined
            }}
          >
            <div className="w-16 h-16 sm:w-32 sm:h-32 md:w-48 md:h-48 flex items-center justify-center flex-shrink-0">
              <img 
                src={logo2i3t} 
                alt="2i3T Logo" 
                className="w-full h-full object-contain rounded-lg"
                width={192}
                height={192}
                loading="eager"
                decoding="async"
              />
            </div>
            <div className="text-left max-w-sm">
              <p className="text-sm sm:text-lg md:text-xl font-display font-bold text-foreground mb-0.5 md:mb-1 leading-tight">
                {t('trustBadge.supportedBy')}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                {t('trustBadge.incubator')}
              </p>
            </div>
          </a>
          
          <a 
            href="https://2i3t.it"
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden sm:inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors duration-[var(--duration-fast)] font-medium group ${
              hasBeenSeen && !prefersReducedMotion ? 'animate-fade-up stagger-1' : prefersReducedMotion ? '' : 'opacity-0'
            }`}
          >
            <span>{t('trustBadge.learnMore')}</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </a>
          
          <p className={`hidden md:block text-xs text-muted-foreground/60 mt-4 font-light max-w-2xl mx-auto leading-relaxed ${
            hasBeenSeen && !prefersReducedMotion ? 'animate-fade-up stagger-2' : prefersReducedMotion ? '' : 'opacity-0'
          }`}>
            {t('trustBadge.guarantee')}
          </p>
        </div>
      </div>
    </section>
  );
};
