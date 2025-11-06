import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import jungleRentLogo from "@/assets/jungle-rent-logo-new.svg";
import logo2i3t from "@/assets/2i3t-logo-hq.png";
import { MessageCircle, Mail, MapPin } from "lucide-react";
import { CONTACTS, openGeneralEmail } from "@/lib/contacts";
import { LogoModal } from "@/components/LogoModal";

export const Footer = () => {
  const { t, i18n } = useTranslation();
  const [logoModalOpen, setLogoModalOpen] = useState(false);
  const [isPartnershipVisible, setIsPartnershipVisible] = useState(false);
  const partnershipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsPartnershipVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px"
      }
    );

    if (partnershipRef.current) {
      observer.observe(partnershipRef.current);
    }

    return () => observer.disconnect();
  }, []);
  
  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const language = i18n.language as 'it' | 'en';
    openGeneralEmail(language === 'en' ? 'en' : 'it');
  };
  
  return (
    <footer id="footer" className="bg-background border-t border-border relative overflow-hidden">
      {/* Top border decoration */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container px-8 py-12 md:py-20 lg:py-24 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 md:gap-12 lg:gap-16 mb-10 md:mb-16 lg:mb-20 max-w-6xl mx-auto">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <img 
                src={jungleRentLogo} 
                alt="Jungle Rent" 
                className="w-12 h-12 md:w-16 md:h-16 opacity-80 rounded-3xl cursor-pointer 
                           hover:opacity-100 hover:scale-105 transition-all duration-300"
                onClick={() => setLogoModalOpen(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setLogoModalOpen(true);
                  }
                }}
              />
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed font-light">
              {t('footer.taglineAlt')}
            </p>
            <p className="text-xs text-muted-foreground font-light tracking-wide">
              {t('footer.copyright')}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-6 text-foreground">{t('footer.contactTitle')}</h3>
            <div className="space-y-3">
              <a 
                href={`https://wa.me/${CONTACTS.lorenzo.phone}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors duration-500 group"
              >
                <MessageCircle className="w-4 h-4 mt-0.5 opacity-60 group-hover:opacity-100" strokeWidth={1.5} />
                <span className="text-sm font-light link-elegant">Lorenzo: {CONTACTS.lorenzo.phone.replace(/(\+\d{2})(\d{3})(\d{3})(\d{4})/, '$1 $2 $3 $4')}</span>
              </a>
              <a 
                href={`https://wa.me/${CONTACTS.andrea.phone}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors duration-500 group"
              >
                <MessageCircle className="w-4 h-4 mt-0.5 opacity-60 group-hover:opacity-100" strokeWidth={1.5} />
                <span className="text-sm font-light link-elegant">Andrea: {CONTACTS.andrea.phone.replace(/(\+\d{2})(\d{3})(\d{3})(\d{4})/, '$1 $2 $3 $4')}</span>
              </a>
              <a 
                href="#"
                onClick={handleEmailClick}
                className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors duration-500 group"
              >
                <Mail className="w-4 h-4 mt-0.5 opacity-60 group-hover:opacity-100" strokeWidth={1.5} />
                <span className="text-sm font-light link-elegant break-all">{CONTACTS.email}</span>
              </a>
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 opacity-60" strokeWidth={1.5} />
                <span className="text-sm font-light">{t('footer.location')}</span>
              </div>
            </div>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-6 text-foreground">{t('footer.forStudentsTitle')}</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <a href="#how-it-works" className="text-sm font-light hover:text-primary transition-colors duration-500 link-elegant">
                  {t('footer.howItWorksLink')}
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-3 font-medium">{t('footer.universitiesLabel')}</p>
              <div className="grid grid-cols-1 gap-y-2">
                <a href="https://www.polito.it" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-muted-foreground font-light hover:text-primary transition-colors duration-500 underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-primary cursor-pointer">Politecnico di Torino</a>
                <a href="https://www.unito.it" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-muted-foreground font-light hover:text-primary transition-colors duration-500 underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-primary cursor-pointer">Università di Torino</a>
                <a href="https://www.escp.eu" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-muted-foreground font-light hover:text-primary transition-colors duration-500 underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-primary cursor-pointer">ESCP Business School</a>
                <a href="https://www.saamanagement.com/" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-muted-foreground font-light hover:text-primary transition-colors duration-500 underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-primary cursor-pointer">SAA School of Management</a>
                <a href="https://www.ied.it" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-muted-foreground font-light hover:text-primary transition-colors duration-500 underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-primary cursor-pointer">IED Torino</a>
                <a href="https://www.iaad.it" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-muted-foreground font-light hover:text-primary transition-colors duration-500 underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-primary cursor-pointer">IAAD</a>
                <a href="https://www.ius.to/" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-muted-foreground font-light hover:text-primary transition-colors duration-500 underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-primary cursor-pointer">IUSTO</a>
              </div>
            </div>
          </div>

          {/* Partnership con logo 2i3T */}
          <div 
            ref={partnershipRef}
            className={`transition-all duration-700 ${
              isPartnershipVisible ? "animate-fade-in" : "opacity-0"
            }`}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground/60 mb-3 font-medium">
              Powered by
            </p>
            <h3 className="font-display text-lg font-semibold mb-6 text-foreground">{t('footer.partnershipTitle')}</h3>
            <div className="space-y-4">
              <a 
                href="https://www.2i3t.it"
                target="_blank"
                rel="noopener noreferrer"
                className="block group relative"
              >
                <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-lg" />
                <img
                  src={logo2i3t}
                  alt="2i3T - Incubatore Imprese Innovative Politecnico di Torino"
                  className="h-16 md:h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-700 mb-4 relative z-10"
                  loading="lazy"
                />
              </a>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                {t('footer.incubatorDesc')}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="border-t border-border pt-12 text-center">
          <p className="text-primary text-base font-accent mb-2 tracking-wide">
            {t('footer.bottomTagline')}
          </p>
          <p className="text-muted-foreground text-xs font-light">
            {t('footer.bottomText')}
          </p>
        </div>
      </div>
      
      <LogoModal open={logoModalOpen} onOpenChange={setLogoModalOpen} />
    </footer>
  );
};
