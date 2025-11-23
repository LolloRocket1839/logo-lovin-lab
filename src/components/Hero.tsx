import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import jungleRentLogo from "@/assets/jungle-rent-logo-new.svg";
import logo2i3t from "@/assets/2i3t-logo-green.png";
import { CONTACTS, openWhatsApp, MESSAGES } from "@/lib/contacts";
import { LogoModal } from "@/components/LogoModal";
import { InvestorWaitlistDialog } from "@/components/InvestorWaitlistDialog";
import { LaunchCountdown } from "@/components/LaunchCountdown";
import { WaitlistBadge } from "@/components/WaitlistBadge";
import { StyledText } from "@/components/StyledText";
import { useAnalytics } from "@/hooks/useAnalytics";
export const Hero = () => {
  const {
    t,
    i18n
  } = useTranslation();
  const { trackClick } = useAnalytics();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [logoModalOpen, setLogoModalOpen] = useState(false);
  const [investorDialogOpen, setInvestorDialogOpen] = useState(false);
  const currentLang = (i18n.language === 'en' ? 'en' : 'it') as 'it' | 'en';
  const handleWhatsAppLorenzo = () => {
    openWhatsApp(CONTACTS.lorenzo.phone, MESSAGES.student.whatsapp[currentLang](CONTACTS.lorenzo.name));
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
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToStudent = () => {
    trackClick('hero_find_home_button');
    document.getElementById('student-section')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };
  const handleInvestClick = () => {
    trackClick('hero_invest_button');
    setInvestorDialogOpen(true);
  };
  const studentScale = 1.15 - scrollProgress * 0.3;
  const studentOpacity = 1 - scrollProgress * 0.3;
  const studentRotate = scrollProgress * -2;
  const investorScale = 0.85 + scrollProgress * 0.3;
  const investorOpacity = 0.7 + scrollProgress * 0.3;

  // Logo animation - moves from center to nav position
  const logoScrollProgress = Math.min(scrollProgress * 2, 1); // Faster transition
  const logoOpacity = 1 - logoScrollProgress;
  const logoScale = 1 - logoScrollProgress * 0.3;
  const logoTranslateY = logoScrollProgress * -200; // Move up
  const logoTranslateX = logoScrollProgress * -45; // Move left (percentage of screen)

  return <header role="banner" className="relative min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden gradient-jungle-hero">
      <h1 className="sr-only">
        {t('hero.seoH1')}
      </h1>

      <div className="container relative z-10 px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo statico */}
          <div className="mb-16 md:mb-20 animate-fade-in">
            <img 
              src={jungleRentLogo} 
              alt={t('hero.logoAlt')} 
              width="128" 
              height="128" 
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mx-auto opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-300 rounded-full cursor-pointer"
              loading="eager" 
              onClick={() => {
                trackClick('hero_logo');
                setLogoModalOpen(true);
              }} 
              role="button" 
              tabIndex={0} 
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  trackClick('hero_logo');
                  setLogoModalOpen(true);
                }
              }} 
            />
          </div>

          {/* Headline principale */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight text-foreground tracking-tight animate-fade-in-up">
            <StyledText>{t('hero.mainHeadline')}</StyledText>
          </h2>
          
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-10 font-normal leading-relaxed animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <StyledText>{t('hero.mainSubheadline')}</StyledText>
          </p>

          {/* Urgency Elements */}
          <div className="flex flex-col items-center gap-6 mb-10 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
            <LaunchCountdown />
            <WaitlistBadge />
          </div>

          {/* 2 CTA con focus su Investi */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center animate-fade-in-up mb-8" style={{ animationDelay: '200ms' }}>
            <Button 
              size="lg" 
              variant="premium" 
              onClick={handleInvestClick} 
              className="w-full sm:w-auto text-base sm:text-lg group feel-good-click"
            >
              {t('hero.invest')}
              <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={scrollToStudent} 
              className="w-full sm:w-auto text-sm sm:text-base group feel-good-click"
            >
              {t('hero.findHome')}
              <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
      
      <LogoModal open={logoModalOpen} onOpenChange={setLogoModalOpen} />
      <InvestorWaitlistDialog 
        open={investorDialogOpen}
        onOpenChange={setInvestorDialogOpen}
        guideType="general"
      />
    </header>;
};