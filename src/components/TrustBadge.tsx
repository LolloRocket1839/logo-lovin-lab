import { useTranslation } from "react-i18next";
import { ExternalLink } from "lucide-react";
import logo2i3t from "@/assets/2i3t-logo-green.png";

export const TrustBadge = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-accent/30 relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      <div className="container px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8 font-medium">
            {t('trustBadge.sectionLabel')}
          </p>
          
          <a 
            href="https://2i3t.it"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-card border border-border/50 rounded-2xl px-6 py-6 sm:px-8 sm:py-6 md:px-12 md:py-8 mb-6 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_8px_24px_hsla(28,24%,14%,0.1)] cursor-pointer"
          >
            <div className="w-64 h-64 md:w-80 md:h-80 flex items-center justify-center flex-shrink-0">
              <img src={logo2i3t} alt="2i3T Logo" className="w-full h-full object-contain rounded-xl" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-1">
                {t('trustBadge.supportedBy')}
              </h3>
              <p className="text-sm text-muted-foreground font-light">
                {t('trustBadge.incubator')}
              </p>
            </div>
          </a>
          
          <a 
            href="https://2i3t.it"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors duration-300 font-medium group"
          >
            <span>{t('trustBadge.learnMore')}</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </a>
          
          <p className="text-xs text-muted-foreground/60 mt-6 font-light max-w-2xl mx-auto leading-relaxed">
            {t('trustBadge.guarantee')}
          </p>
        </div>
      </div>
    </section>
  );
};