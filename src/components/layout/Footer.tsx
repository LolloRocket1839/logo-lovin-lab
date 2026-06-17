import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import jungleRentLogo from "@/assets/jungle-rent-logo-new.svg";
import logo2i3t from "@/assets/2i3t-logo-green.png";
import euFundingBanner from "@/assets/eu-funding-banner.png";
import { MessageCircle, Mail, MapPin } from "lucide-react";
import { CONTACTS, openGeneralEmail } from "@/constants";
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
    <footer id="footer" className="hidden md:block bg-background relative overflow-hidden transition-spacing">
      
      <div className="container px-4 md:px-8 py-16 md:py-24 relative z-10 transition-spacing">
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-20 max-w-6xl mx-auto transition-spacing transition-layout">
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
            <h3 className="font-display text-base sm:text-lg font-bold mb-6 text-foreground">{t('footer.contactTitle')}</h3>
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
                <Mail className="w-4 h-4 mt-1 shrink-0 opacity-60 group-hover:opacity-100" strokeWidth={1.5} aria-hidden="true" />
                <span className="text-sm font-light leading-relaxed tracking-wide link-elegant break-all">{CONTACTS.email}</span>
              </a>
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 opacity-60" strokeWidth={1.5} aria-hidden="true" />
                <span className="text-sm font-light">{t('footer.location')}</span>
              </div>
            </div>
          </div>

          {/* For Property Owners - NEW SECTION */}
          <div>
            <h3 className="font-display text-base sm:text-lg font-bold mb-6 text-foreground">{t('footer.forOwnersTitle')}</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <Link to={i18n.language.startsWith('it') ? '/valutazione-immobile' : '/property-valuation'} className="text-sm font-light hover:text-primary transition-colors duration-500 link-elegant">
                  {t('footer.valuateProperty')}
                </Link>
              </li>
              <li>
                <Link to={i18n.language.startsWith('it') ? '/vendi' : '/sell'} className="text-sm font-light hover:text-primary transition-colors duration-500 link-elegant">
                  {t('footer.sellProperty')}
                </Link>
              </li>
              <li>
                <Link to="/chi-siamo" className="text-sm font-light hover:text-primary transition-colors duration-500 link-elegant">
                  {t('footer.howItWorksLink')}
                </Link>
              </li>
              <li>
                <Link to="/blog/investire-real-assets-torino-2025" className="text-sm font-light hover:text-primary transition-colors duration-500 link-elegant">
                  {i18n.language.startsWith('it') ? 'Guida investimenti 2025' : 'Investment guide 2025'}
                </Link>
              </li>
              <li>
                <Link to="/blog/cedolare-secca-2026-investitori" className="text-sm font-light hover:text-primary transition-colors duration-500 link-elegant">
                  {i18n.language.startsWith('it') ? 'Cedolare secca 2026' : 'Flat tax 2026'}
                </Link>
              </li>
              <li>
                <Link to={i18n.language.startsWith('it') ? '/contratti-locazione' : '/rental-contracts'} className="text-sm font-light hover:text-primary transition-colors duration-500 link-elegant">
                  {i18n.language.startsWith('it') ? 'Contratti di locazione' : 'Lease agreements'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Neighborhoods - SEO PageRank distribution (Students) */}
          <div>
            <h3 className="font-display text-base sm:text-lg font-bold mb-6 text-foreground">
              {i18n.language.startsWith('it') ? 'Quartieri studenti' : 'Student neighborhoods'}
            </h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <Link to="/affitto-stanza-torino/san-salvario" className="text-sm font-light hover:text-primary transition-colors duration-500 link-elegant">
                  San Salvario
                </Link>
              </li>
              <li>
                <Link to="/affitto-stanza-torino/crocetta" className="text-sm font-light hover:text-primary transition-colors duration-500 link-elegant">
                  Crocetta
                </Link>
              </li>
              <li>
                <Link to="/affitto-stanza-torino/cenisia" className="text-sm font-light hover:text-primary transition-colors duration-500 link-elegant">
                  Cenisia
                </Link>
              </li>
              <li>
                <Link to="/affitto-stanza-torino/vanchiglia" className="text-sm font-light hover:text-primary transition-colors duration-500 link-elegant">
                  Vanchiglia
                </Link>
              </li>
              <li>
                <Link to={i18n.language.startsWith('it') ? '/affitti-lingotto-ospedali-torino' : '/rent-lingotto-hospitals-turin'} className="text-sm font-light hover:text-primary transition-colors duration-500 link-elegant">
                  {i18n.language.startsWith('it') ? 'Lingotto / Ospedali' : 'Lingotto / Hospitals'}
                </Link>
              </li>
              <li>
                <Link to="/affitto-stanza-torino" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-500 link-elegant">
                  {i18n.language.startsWith('it') ? 'Tutti i quartieri →' : 'All neighborhoods →'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Investment Zones - SEO PageRank distribution (Investors) */}
          <div>
            <h3 className="font-display text-base sm:text-lg font-bold mb-6 text-foreground">
              {i18n.language.startsWith('it') ? 'Zone investimento' : 'Investment zones'}
            </h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <Link to="/investitori/zone/aurora" className="text-sm font-light hover:text-primary transition-colors duration-500 link-elegant">
                  Aurora
                </Link>
              </li>
              <li>
                <Link to="/investitori/zone/barriera-di-milano" className="text-sm font-light hover:text-primary transition-colors duration-500 link-elegant">
                  Barriera di Milano
                </Link>
              </li>
              <li>
                <Link to="/investitori/zone/cenisia" className="text-sm font-light hover:text-primary transition-colors duration-500 link-elegant">
                  Cenisia
                </Link>
              </li>
              <li>
                <Link to="/investitori/zone/san-salvario" className="text-sm font-light hover:text-primary transition-colors duration-500 link-elegant">
                  San Salvario
                </Link>
              </li>
              <li>
                <Link to="/investitori/zone/vanchiglia" className="text-sm font-light hover:text-primary transition-colors duration-500 link-elegant">
                  Vanchiglia
                </Link>
              </li>
              <li>
                <Link to="/investitori/zone" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-500 link-elegant">
                  {i18n.language.startsWith('it') ? 'Tutte le zone →' : 'All zones →'}
                </Link>
              </li>
            </ul>
          </div>

          {/* For Students */}
          <div>
            <h3 className="font-display text-base sm:text-lg font-bold mb-6 text-foreground">{t('footer.forStudentsTitle')}</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <Link to="/studenti" className="text-sm font-light hover:text-primary transition-colors duration-500 link-elegant">
                  {t('nav.students')}
                </Link>
              </li>
              <li>
                <Link to="/studenti/strumenti" className="text-sm font-light hover:text-primary transition-colors duration-500 link-elegant">
                  {i18n.language.startsWith('it') ? 'Strumenti Studenti' : 'Student Tools'}
                </Link>
              </li>
              <li>
                <Link to="/strumenti/aule-studio-torino" className="text-sm font-light hover:text-primary transition-colors duration-500 link-elegant">
                  {i18n.language.startsWith('it') ? 'Aule Studio' : 'Study Spaces'}
                </Link>
              </li>
              <li>
                <Link to={i18n.language.startsWith('it') ? '/strumenti/dove-mangiare-torino' : '/tools/cheap-eats-turin'} className="text-sm font-light hover:text-primary transition-colors duration-500 link-elegant">
                  {t('footer.cheapEats')}
                </Link>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-3 font-medium">{t('footer.universitiesLabel')}</p>
              <div className="grid grid-cols-1 gap-y-2">
                <a href="https://www.polito.it" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-muted-foreground font-light hover:text-primary transition-colors duration-500 underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-primary cursor-pointer">Politecnico di Torino<span className="sr-only"> {t('accessibility.opensNewWindow')}</span></a>
                <a href="https://www.unito.it" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-muted-foreground font-light hover:text-primary transition-colors duration-500 underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-primary cursor-pointer">Università di Torino<span className="sr-only"> {t('accessibility.opensNewWindow')}</span></a>
              </div>
            </div>
          </div>

          {/* Partnership con logo 2i3T */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3 font-medium">
              Powered by
            </p>
            <h3 className="font-display text-base sm:text-lg font-bold mb-6 text-foreground">{t('footer.partnershipTitle')}</h3>
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
        <div className="border-t border-border/20 pt-12 text-center">
          <p className="text-primary text-base font-accent mb-2 tracking-wide">
            {t('footer.bottomTagline')}
          </p>
          <p className="text-muted-foreground text-xs font-light">
            {t('footer.bottomText')}
          </p>
          
          {/* EU Co-Funding Compliance Banner */}
          <div className="mt-8">
            <a
              href="https://www.regione.piemonte.it/web/temi/fondi-europei/fondo-sociale-europeo/pr-fse-2021-2027"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#003399] rounded-xl px-8 py-6 flex flex-col items-center gap-3 hover:bg-[#002b80] transition-colors cursor-pointer"
            >
              <img 
                src={euFundingBanner} 
                alt="Coesione Italia 21-27 Piemonte — L'Europa investe sul Piemonte, il Piemonte investe su di te — PR FSE+ 2021-2027" 
                className="w-full max-w-[320px]"
                style={{ imageRendering: 'auto' }}
                loading="lazy"
              />
              <p className="text-white/60 text-[9px] tracking-wide font-light max-w-lg leading-relaxed text-center">
                Realizzato con il finanziamento del Fondo Sociale Europeo Plus — PR FSE+ 2021-2027, Misura 8 e Misura 9
              </p>
            </a>
          </div>

          {/* Legal Information */}
          <div className="mt-8 pt-8 border-t border-border/10">
            <p className="text-muted-foreground text-xs font-light">
              JUNGLE RENT S.R.L. - Start-up Innovativa | P.IVA 13333450016 | REA TO-1355899
            </p>
            <p className="text-muted-foreground text-xs font-light mt-1">
              {t('footer.legalAddress')} | PEC: junglerent@legalmail.it
            </p>
            <div className="mt-3 flex items-center justify-center gap-4">
              <Link 
                to="/privacy" 
                className="text-muted-foreground text-xs font-light hover:text-primary transition-colors underline underline-offset-4"
              >
                Privacy Policy
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link 
                to="/termini-e-condizioni" 
                className="text-muted-foreground text-xs font-light hover:text-primary transition-colors underline underline-offset-4"
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
