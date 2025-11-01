import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import jungleRentLogo from "@/assets/jungle-rent-logo-new.svg";
import logo2i3t from "@/assets/2i3t-logo.png";
import { CONTACTS, openWhatsApp, MESSAGES } from "@/lib/contacts";
import { LogoModal } from "@/components/LogoModal";

export const Hero = () => {
  const { t } = useTranslation();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [logoModalOpen, setLogoModalOpen] = useState(false);

  const handleWhatsAppLorenzo = () => {
    openWhatsApp(CONTACTS.lorenzo.phone, MESSAGES.student.whatsapp(CONTACTS.lorenzo.name));
  };

  const handleWhatsAppAndrea = () => {
    openWhatsApp(CONTACTS.andrea.phone, MESSAGES.student.whatsapp(CONTACTS.andrea.name));
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY;
          const windowHeight = window.innerHeight;
          const progress = Math.min(Math.max(scrollPosition / windowHeight, 0), 1);
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToStudent = () => {
    document.getElementById('student-section')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const scrollToInvestor = () => {
    document.getElementById('investor-section')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const studentScale = 1.15 - (scrollProgress * 0.3);
  const studentOpacity = 1 - (scrollProgress * 0.3);
  const studentRotate = scrollProgress * -2;

  const investorScale = 0.85 + (scrollProgress * 0.3);
  const investorOpacity = 0.7 + (scrollProgress * 0.3);

  // Logo animation - moves from center to nav position
  const logoScrollProgress = Math.min(scrollProgress * 2, 1); // Faster transition
  const logoOpacity = 1 - logoScrollProgress;
  const logoScale = 1 - (logoScrollProgress * 0.3);
  const logoTranslateY = logoScrollProgress * -200; // Move up
  const logoTranslateX = logoScrollProgress * -45; // Move left (percentage of screen)

  return (
    <header role="banner" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <h1 className="sr-only">
        {t('hero.seoH1')}
      </h1>
      
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="container relative z-10 px-8 py-16 md:py-32">
        <div className="max-w-5xl mx-auto text-center">
          {/* Logo - animated and prominent with scroll transition */}
          <div 
            className="mb-6 md:mb-12 animate-fade-in transition-all duration-500"
            style={{
              opacity: logoOpacity,
              transform: `translate(calc(${logoTranslateX}vw), ${logoTranslateY}px) scale(${logoScale})`,
              pointerEvents: logoScrollProgress > 0.5 ? 'none' : 'auto'
            }}
          >
            <img 
              src={jungleRentLogo} 
              alt={t('hero.logoAlt')}
              width="96"
              height="96"
              className="w-16 h-16 md:w-24 md:h-24 mx-auto opacity-90 transition-all duration-700
                         hover:opacity-100 hover:scale-110 hover:rotate-6 
                         hover:drop-shadow-[0_0_20px_hsla(150,45%,18%,0.5)]
                         rounded-full cursor-pointer"
              loading="eager"
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
            <p 
              className="mt-4 text-base font-accent text-primary/80 tracking-wider transition-opacity duration-500"
              style={{ opacity: logoOpacity }}
            >
              {t('hero.tagline')}
            </p>
          </div>

          {/* Dual headline for students and investors - BOLD & MASSIVE & INTERACTIVE */}
          <div className="mb-16 space-y-8">
            {/* STUDENTE - Clickable & Zoomable - GIOCOSO */}
            <div 
              onClick={scrollToStudent}
              className="cursor-pointer transition-all duration-700 hover:scale-[1.02] group"
              style={{
                transform: `scale(${studentScale}) rotate(${studentRotate}deg)`,
                opacity: studentOpacity,
                transformOrigin: 'center',
              }}
            >
              <div className="relative p-8 rounded-3xl overflow-hidden
                              border-2 border-transparent
                              hover:border-cyan-400/50
                              hover:bg-gradient-to-br hover:from-cyan-500/12 hover:via-blue-500/12 hover:to-indigo-500/12
                              hover:shadow-[0_12px_48px_rgba(6,182,212,0.3),0_8px_24px_rgba(99,102,241,0.25)]
                              transition-all duration-700
                              animate-fade-in-up
                              bg-gradient-to-br from-cyan-500/8 via-blue-500/8 to-indigo-500/8">
                
                {/* Glow elegante cyan/indigo */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/15 via-blue-400/12 to-indigo-400/15
                                opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm z-0" />
                
                <div className="relative text-xl md:text-4xl lg:text-6xl font-display font-extrabold mb-4 
                               tracking-tighter leading-[0.9] text-foreground
                               group-hover:text-transparent group-hover:bg-clip-text 
                               group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:via-blue-600 group-hover:to-indigo-600
                               group-hover:scale-105
                               transition-all duration-700 z-10">
                  {t('hero.studentTitle')}
                </div>
                <p className="relative text-2xl md:text-5xl lg:text-7xl font-display font-extrabold 
                              text-primary
                              hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:via-purple-600 hover:to-red-600
                              tracking-tighter leading-tight
                              group-hover:scale-105
                              transition-all duration-500
                              z-10
                              py-2
                              cursor-default">
                  {t('hero.studentSubtitle')}
                </p>
                
                {/* Arrow elegant */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 
                                group-hover:opacity-100 group-hover:translate-x-2
                                transition-all duration-500 z-10">
                  <ArrowRight className="w-12 h-12 text-cyan-500 drop-shadow-lg" />
                </div>
              </div>
            </div>
            
            {/* INVESTITORE - Clickable & Zoomable - ELEGANTE/SERIO */}
            <div 
              onClick={scrollToInvestor}
              className="cursor-pointer transition-all duration-1000 hover:scale-[1.01] group"
              style={{
                transform: `scale(${investorScale})`,
                opacity: investorOpacity,
                transformOrigin: 'center',
              }}
            >
              <div className="relative p-8 rounded-3xl overflow-hidden
                              border-2 border-transparent
                              hover:border-primary/20
                              hover:bg-gradient-to-br hover:from-primary/5 hover:to-transparent
                              hover:shadow-[0_16px_48px_rgba(139,195,74,0.15)]
                              transition-all duration-1000
                              animate-fade-in-up"
                   style={{ animationDelay: '100ms' }}>
                {/* Glow sottile professionale */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5
                                opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                
                <h2 className="relative text-3xl md:text-6xl lg:text-8xl font-display font-extrabold mb-4 
                               tracking-tighter leading-[0.9] text-foreground
                               group-hover:text-primary
                               transition-all duration-1000">
                  {t('hero.investorTitle')}
                </h2>
                <p className="relative text-2xl md:text-5xl lg:text-7xl font-display font-extrabold 
                              text-primary tracking-tighter leading-[0.95]">
                  {t('hero.investorSubtitle')}
                </p>
                
                {/* Arrow elegante senza bounce */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 
                                group-hover:opacity-100 group-hover:translate-x-2
                                transition-all duration-700">
                  <ArrowRight className="w-12 h-12 text-primary" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>

          {/* Refined subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-2xl mx-auto animate-fade-in-up font-light leading-relaxed" style={{ animationDelay: '300ms' }}>
            <a href="#how-it-works" className="hover:text-primary transition-colors">{t('hero.smartRentals')}</a> & <a href="#investor-section" className="hover:text-primary transition-colors">{t('hero.investmentOpportunities')}</a>
          </p>
          
          <p className="text-lg md:text-xl text-primary/70 mb-4 font-light" style={{ animationDelay: '350ms' }}>
            {t('hero.targetAudience').split(' ').map((word, index) => {
              if (word === t('hero.students') || word === 'students') {
                return <a key={index} href="#student-section" className="hover:text-foreground transition-colors">{word} </a>;
              }
              if (word === t('hero.investors') || word === 'investors') {
                return <a key={index} href="#investor-section" className="hover:text-foreground transition-colors">{word}</a>;
              }
              return word + ' ';
            })}
          </p>
          
          <p className="text-base text-muted-foreground/70 mb-16 font-light" style={{ animationDelay: '400ms' }}>
            {t('hero.location')}
          </p>

          {/* Questionario 100€ Badge - clickable - SMALLER */}
          <a
            href="https://it.surveymonkey.com/r/Q27QDBG"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-2 border border-primary/30 
                        bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 
                        rounded-full px-6 py-2 mb-8
                        overflow-hidden group
                        hover:border-primary/50 hover:shadow-[0_0_20px_hsla(150,45%,18%,0.15)]
                        transition-all duration-300 cursor-pointer
                        animate-fade-in-up" 
            style={{ animationDelay: '500ms' }}
          >
            {/* Shimmer overlay */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full 
                            bg-gradient-to-r from-transparent via-white/20 to-transparent 
                            transition-transform duration-1000" />
            
            <span className="relative text-primary text-sm">🎁</span>
            <span className="relative text-foreground font-medium text-sm">
              {t('hero.questionnaire')}
            </span>
            <ArrowRight className="relative w-4 h-4 text-primary/70 transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          {/* Info aggiuntiva sul questionario */}
          <p className="text-sm text-muted-foreground/70 max-w-2xl mx-auto mb-16 animate-fade-in-up" style={{ animationDelay: '550ms' }}>
            <span className="font-semibold text-foreground">{t('hero.availableRooms').split(' ').slice(0, 4).join(' ')}</span> {t('hero.availableRooms').split(' ').slice(4).join(' ')}
          </p>

          {/* Hero CTAs - SIMPLIFIED - 2 BUTTONS ONLY */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up mb-12" style={{ animationDelay: '600ms' }}>
            <Button 
              size="lg" 
              variant="hero"
              onClick={scrollToStudent}
              className="w-full sm:w-auto px-8 py-6 text-base group"
            >
              {t('hero.iAmStudent')}
              <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button 
              size="lg" 
              variant="hero"
              onClick={scrollToInvestor}
              className="w-full sm:w-auto px-8 py-6 text-base group"
            >
              {t('hero.iAmInvestor')}
              <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
      
      <LogoModal open={logoModalOpen} onOpenChange={setLogoModalOpen} />
    </header>
  );
};