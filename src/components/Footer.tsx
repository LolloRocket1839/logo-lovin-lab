import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import jungleRentLogo from "@/assets/jungle-rent-logo-new.svg";
import logo2i3t from "@/assets/2i3t-logo-green.png";
import { MessageCircle, Mail, MapPin } from "lucide-react";
import { CONTACTS, openGeneralEmail } from "@/lib/contacts";
import { LogoModal } from "@/components/LogoModal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const Footer = () => {
  const { t, i18n } = useTranslation();
  const [logoModalOpen, setLogoModalOpen] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const logoRef = useRef<HTMLImageElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Skip parallax effect if user prefers reduced motion
    if (prefersReducedMotion) return;

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
  }, [prefersReducedMotion]);
  
  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const language = i18n.language as 'it' | 'en';
    openGeneralEmail(language === 'en' ? 'en' : 'it');
  };
  
  return (
    <footer id="footer" className="bg-accent/30 relative overflow-hidden transition-spacing">
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
                className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 opacity-80 rounded-3xl cursor-pointer 
                           focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                  prefersReducedMotion ? 'hover:opacity-100' : 'hover:opacity-100 hover:scale-105 transition-size'
                }`}
                onClick={() => setLogoModalOpen(true)}
                role="button"
                tabIndex={0}
                aria-label={t('accessibility.openLogoModal')}
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
                <MessageCircle className="w-4 h-4 mt-0.5 opacity-60 group-hover:opacity-100" strokeWidth={1.5} aria-hidden="true" />
                <span className="text-sm font-light link-elegant">Lorenzo: {CONTACTS.lorenzo.phone.replace(/(\+\d{2})(\d{3})(\d{3})(\d{4})/, '$1 $2 $3 $4')}</span>
                <span className="sr-only">{t('accessibility.opensNewWindow')}</span>
              </a>
              <a 
                href="#"
                onClick={handleEmailClick}
                className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors duration-500 group"
              >
                <Mail className="w-4 h-4 mt-0.5 opacity-60 group-hover:opacity-100" strokeWidth={1.5} aria-hidden="true" />
                <span className="text-sm font-light link-elegant break-all">{CONTACTS.email}</span>
              </a>
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 opacity-60" strokeWidth={1.5} aria-hidden="true" />
                <span className="text-sm font-light">{t('footer.location')}</span>
              </div>
            </div>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-display text-base sm:text-lg font-bold mb-4 sm:mb-6 text-foreground">{t('footer.forStudentsTitle')}</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <Link to="/studenti" className="text-sm font-light hover:text-primary transition-colors duration-500 link-elegant">
                  {t('nav.students')}
                </Link>
              </li>
              <li>
                <a href="#how-it-works" className="text-sm font-light hover:text-primary transition-colors duration-500 link-elegant">
                  {t('footer.howItWorksLink')}
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-3 font-medium">{t('footer.universitiesLabel')}</p>
              <div className="grid grid-cols-1 gap-y-2">
                <a href="https://www.polito.it" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-muted-foreground font-light hover:text-primary transition-colors duration-500 underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-primary cursor-pointer">Politecnico di Torino<span className="sr-only"> {t('accessibility.opensNewWindow')}</span></a>
                <a href="https://www.unito.it" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-muted-foreground font-light hover:text-primary transition-colors duration-500 underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-primary cursor-pointer">Università di Torino<span className="sr-only"> {t('accessibility.opensNewWindow')}</span></a>
                <a href="https://www.escp.eu" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-muted-foreground font-light hover:text-primary transition-colors duration-500 underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-primary cursor-pointer">ESCP Business School<span className="sr-only"> {t('accessibility.opensNewWindow')}</span></a>
                <a href="https://www.saamanagement.com/" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-muted-foreground font-light hover:text-primary transition-colors duration-500 underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-primary cursor-pointer">SAA School of Management<span className="sr-only"> {t('accessibility.opensNewWindow')}</span></a>
                <a href="https://www.ied.it" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-muted-foreground font-light hover:text-primary transition-colors duration-500 underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-primary cursor-pointer">IED Torino<span className="sr-only"> {t('accessibility.opensNewWindow')}</span></a>
                <a href="https://www.iaad.it" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-muted-foreground font-light hover:text-primary transition-colors duration-500 underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-primary cursor-pointer">IAAD<span className="sr-only"> {t('accessibility.opensNewWindow')}</span></a>
                <a href="https://www.ius.to/" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-muted-foreground font-light hover:text-primary transition-colors duration-500 underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-primary cursor-pointer">IUSTO<span className="sr-only"> {t('accessibility.opensNewWindow')}</span></a>
              </div>
            </div>
          </div>

          {/* Partnership con logo 2i3T */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground/60 mb-3 font-medium">
              Powered by
            </p>
            <h3 className="font-display text-base sm:text-lg font-bold mb-4 sm:mb-6 text-foreground">{t('footer.partnershipTitle')}</h3>
            <div className="space-y-4">
              <a 
                href="https://www.2i3t.it"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('investor.incubatorTooltip')}
                className="block group relative focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
              >
                <div className={`absolute inset-0 shimmer-effect rounded-lg ${prefersReducedMotion ? 'hidden' : 'opacity-0 group-hover:opacity-100 transition-opacity duration-700'}`} aria-hidden="true" />
                <img
                  ref={logoRef}
                  src={logo2i3t}
                  alt=""
                  className={`h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24 w-auto object-contain mb-4 relative z-10 ${prefersReducedMotion ? '' : 'grayscale hover:grayscale-0 transition-size'}`}
                  style={prefersReducedMotion ? {} : {
                    transform: `translateY(${scrollOffset}px)`,
                    transition: 'transform 0.1s ease-out'
                  }}
                  loading="lazy"
                  width={140}
                  height={96}
                  decoding="async"
                />
                <span className="sr-only">{t('accessibility.opensNewWindow')}</span>
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
          
          {/* Legal Information */}
          <div className="mt-6 pt-6 border-t border-border/50">
            <p className="text-muted-foreground/70 text-xs font-light">
              JUNGLE RENT S.R.L. - Start-up Innovativa | P.IVA 13333450016 | REA TO-1355899
            </p>
            <p className="text-muted-foreground/60 text-xs font-light mt-1">
              {t('footer.legalAddress')} | PEC: junglerent@legalmail.it
            </p>
            <div className="mt-3 flex items-center justify-center gap-4">
              <Link 
                to="/privacy" 
                className="text-muted-foreground/60 text-xs font-light hover:text-primary transition-colors underline underline-offset-4"
              >
                Privacy Policy
              </Link>
              <span className="text-muted-foreground/40">|</span>
              <Link 
                to="/termini-e-condizioni" 
                className="text-muted-foreground/60 text-xs font-light hover:text-primary transition-colors underline underline-offset-4"
              >
                {i18n.language === 'it' || i18n.language.startsWith('it') ? 'Termini e Condizioni' : 'Terms & Conditions'}
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <LogoModal open={logoModalOpen} onOpenChange={setLogoModalOpen} />
    </footer>
  );
};
