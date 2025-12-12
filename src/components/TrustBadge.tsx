import { useTranslation } from "react-i18next";
import { ExternalLink } from "lucide-react";
import logo2i3t from "@/assets/2i3t-logo-green.png";

export const TrustBadge = () => {
  const { t } = useTranslation();
  
  return (
    <section 
      className="py-8 md:py-12 lg:py-16 bg-accent/30 relative overflow-hidden border-b border-border"
    >
      
      <div className="container px-8 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
          <p className="hidden md:block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6 font-medium">
            {t('trustBadge.sectionLabel')}
          </p>
          
          <a 
            href="https://2i3t.it"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-5 bg-card border border-border/50 rounded-xl sm:rounded-2xl px-4 py-4 sm:px-6 sm:py-5 md:px-10 md:py-6 mb-4 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_16px_48px_hsla(142,76%,36%,0.25)] cursor-pointer"
          >
            <div className="w-20 h-20 sm:w-32 sm:h-32 md:w-48 md:h-48 flex items-center justify-center flex-shrink-0">
              <img src={logo2i3t} alt="2i3T Logo" className="w-full h-full object-contain rounded-lg" />
            </div>
            <div className="text-center sm:text-left max-w-sm">
              <h3 className="text-base sm:text-lg md:text-xl font-display font-bold text-foreground mb-1 leading-tight">
                {t('trustBadge.supportedBy')}
              </h3>
              <p className="hidden sm:block text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                {t('trustBadge.incubator')}
              </p>
            </div>
          </a>
          
          <a 
            href="https://2i3t.it"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-all duration-500 font-medium group"
          >
            <span>{t('trustBadge.learnMore')}</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </a>
          
          <p className="hidden md:block text-xs text-muted-foreground/60 mt-4 font-light max-w-2xl mx-auto leading-relaxed">
            {t('trustBadge.guarantee')}
          </p>
        </div>
      </div>
    </section>
  );
};
