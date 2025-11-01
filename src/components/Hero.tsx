import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import jungleRentLogo from "@/assets/jungle-rent-logo-new.svg";
import logo2i3t from "@/assets/2i3t-logo.png";
import { CONTACTS, openWhatsApp, MESSAGES } from "@/lib/contacts";
import { LogoModal } from "@/components/LogoModal";
export const Hero = () => {
  const {
    t
  } = useTranslation();
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
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
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

  return <header role="banner" className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden bg-background">
      <h1 className="sr-only">
        {t('hero.seoH1')}
      </h1>
      
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
    }} />

      <div className="container relative z-10 px-8 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo statico */}
          <div className="mb-8 animate-fade-in">
            <img 
              src={jungleRentLogo} 
              alt={t('hero.logoAlt')} 
              width="80" 
              height="80" 
              className="w-16 h-16 md:w-20 md:h-20 mx-auto opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-300 rounded-full cursor-pointer" 
              loading="eager" 
              onClick={() => setLogoModalOpen(true)} 
              role="button" 
              tabIndex={0} 
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setLogoModalOpen(true);
                }
              }} 
            />
          </div>

          {/* Headline unico chiaro e diretto */}
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight text-foreground tracking-tight animate-fade-in-up">
            {t('hero.mainHeadline')}
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 font-light leading-relaxed animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            {t('hero.mainSubheadline')}
          </p>

          {/* 2 CTA chiarissime */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up mb-8" style={{ animationDelay: '200ms' }}>
            <Button size="lg" variant="premium" onClick={scrollToStudent} className="w-full sm:w-auto px-10 py-6 text-base group">
              {t('hero.findHome')}
              <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="hero" onClick={scrollToInvestor} className="w-full sm:w-auto px-10 py-6 text-base group">
              {t('hero.invest')}
              <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
      
      <LogoModal open={logoModalOpen} onOpenChange={setLogoModalOpen} />
    </header>;
};