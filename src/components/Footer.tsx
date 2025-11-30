import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import jungleRentLogo from "@/assets/jungle-rent-logo-new.svg";
import logo2i3t from "@/assets/2i3t-logo-green.png";
import { MessageCircle, Mail, MapPin } from "lucide-react";
import { CONTACTS, openGeneralEmail } from "@/lib/contacts";
import { LogoModal } from "@/components/LogoModal";

export const Footer = () => {
  const { t, i18n } = useTranslation();
  const [logoModalOpen, setLogoModalOpen] = useState(false);
  const [isPartnershipVisible, setIsPartnershipVisible] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const partnershipRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

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

  useEffect(() => {
    const handleScroll = () => {
      if (logoRef.current) {
        const rect = logoRef.current.getBoundingClientRect();
        const scrollProgress = (window.innerHeight - rect.top) / window.innerHeight;
        // Parallax effect: logo moves slower than scroll (0.3x speed)
        setScrollOffset(scrollProgress * 30);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const language = i18n.language as 'it' | 'en';
    openGeneralEmail(language === 'en' ? 'en' : 'it');
  };
  
  return (
    <footer id="footer" className="relative overflow-hidden transition-spacing">
      {/* Gradient overlay */}
      <div className="absolute inset-0 gradient-jungle-footer" />
      
      <div className="container px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20 relative z-10 transition-spacing">
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-10 md:mb-16 lg:mb-20 max-w-6xl mx-auto transition-spacing transition-layout">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <img 
                src={jungleRentLogo} 
                alt="Jungle Rent" 
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 opacity-80 rounded-3xl cursor-pointer 
                           hover:opacity-100 hover:scale-105 transition-size"
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
            <h3 className="font-display text-base sm:text-lg font-bold mb-4 sm:mb-6 text-foreground">{t('footer.contactTitle')}</h3>
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
            <h3 className="font-display text-base sm:text-lg font-bold mb-4 sm:mb-6 text-foreground">{t('footer.forStudentsTitle')}</h3>
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
            <h3 className="font-display text-base sm:text-lg font-bold mb-4 sm:mb-6 text-foreground">{t('footer.partnershipTitle')}</h3>
            <div className="space-y-4">
              <a 
                href="https://www.2i3t.it"
                target="_blank"
                rel="noopener noreferrer"
                className="block group relative"
              >
                <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-lg" />
                <img
                  ref={logoRef}
                  src={logo2i3t}
                  alt="2i3T - Incubatore Imprese Innovative Politecnico di Torino"
                  className="h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24 w-auto object-contain grayscale hover:grayscale-0 transition-size mb-4 relative z-10"
                  style={{
                    transform: `translateY(${scrollOffset}px)`,
                    transition: 'transform 0.1s ease-out'
                  }}
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
