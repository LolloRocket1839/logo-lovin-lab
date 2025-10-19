import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import jungleRentLogo from "@/assets/jungle-rent-logo.svg";
import logo2i3t from "@/assets/2i3t-logo.png";

export const Hero = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleWhatsAppLorenzo = () => {
    window.open("https://wa.me/393319053037", "_blank");
  };

  const handleWhatsAppAndrea = () => {
    window.open("https://wa.me/393920675357", "_blank");
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calcolo molto sensibile: inizia subito e si completa entro 1 viewport
      // Progress va da 0 (top) a 1 (dopo 1vh)
      const progress = Math.min(Math.max(scrollPosition / windowHeight, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
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

  // STUDENTE: Grande all'inizio (1.15), piccolo alla fine (0.85)
  const studentScale = 1.15 - (scrollProgress * 0.3);
  const studentOpacity = 1 - (scrollProgress * 0.3);
  const studentRotate = scrollProgress * -2;

  // INVESTITORE: Piccolo all'inizio (0.85), grande alla fine (1.15)
  const investorScale = 0.85 + (scrollProgress * 0.3);
  const investorOpacity = 0.7 + (scrollProgress * 0.3);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="container relative z-10 px-8 py-32">
        <div className="max-w-5xl mx-auto text-center">
          {/* Logo - animated and prominent */}
          <div className="mb-12 animate-fade-in">
            <img 
              src={jungleRentLogo} 
              alt="Jungle Rent" 
              className="w-24 h-24 mx-auto opacity-90 transition-all duration-700 
                         hover:opacity-100 hover:scale-110 hover:rotate-6 
                         hover:drop-shadow-[0_0_20px_hsla(150,45%,18%,0.5)]
                         animate-[logo-pulse_3s_ease-in-out_infinite]
                         rounded-3xl"
            />
            <p className="mt-4 text-base font-accent text-primary/80 tracking-wider">
              Il tuo rifugio sicuro nella giungla immobiliare
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
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/35 via-blue-400/30 to-indigo-400/35
                                opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl z-0" />
                
                <h1 className="relative text-5xl md:text-7xl lg:text-8xl font-display font-extrabold mb-4 
                               tracking-tighter leading-[0.9] text-foreground
                               group-hover:text-transparent group-hover:bg-clip-text 
                               group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:via-blue-600 group-hover:to-indigo-600
                               group-hover:scale-105
                               transition-all duration-700 z-10">
                  Sei uno studente?
                </h1>
                <p className="relative text-4xl md:text-6xl lg:text-7xl font-display font-extrabold 
                              bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600
                              tracking-tighter leading-[0.95]
                              group-hover:animate-pulse z-10">
                  Risparmi circa il 25% per il tuo affitto!
                </p>
                
                {/* Arrow con bounce */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 
                                group-hover:opacity-100 group-hover:translate-x-2 group-hover:animate-bounce
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
                
                <h2 className="relative text-5xl md:text-7xl lg:text-8xl font-display font-extrabold mb-4 
                               tracking-tighter leading-[0.9] text-foreground
                               group-hover:text-primary
                               transition-all duration-1000">
                  Sei un investitore immobiliare?
                </h2>
                <p className="relative text-4xl md:text-6xl lg:text-7xl font-display font-extrabold 
                              text-primary tracking-tighter leading-[0.95]">
                  Ottieni ottimi rendimenti ed investi a partire da 100€!
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
            Affitti Smart & Opportunità di Investimento
          </p>
          
          <p className="text-lg md:text-xl text-primary/70 mb-4 font-light" style={{ animationDelay: '350ms' }}>
            Per studenti e investitori
          </p>
          
          <p className="text-base text-muted-foreground/70 mb-16 font-light" style={{ animationDelay: '400ms' }}>
            Vicino a tutti i principali atenei torinesi
          </p>

          {/* Questionario 100€ Badge - clickable */}
          <a
            href="https://it.surveymonkey.com/r/Q27QDBG"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-3 border-2 border-primary/30 
                        bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 
                        rounded-full px-10 py-4 mb-8
                        overflow-hidden group
                        hover:border-primary/50 hover:shadow-[0_0_30px_hsla(150,45%,18%,0.2)]
                        hover:scale-105
                        transition-all duration-500 cursor-pointer
                        animate-[pulse-border_3s_ease-in-out_infinite]
                        animate-fade-in-up" 
            style={{ animationDelay: '500ms' }}
          >
            {/* Shimmer overlay */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full 
                            bg-gradient-to-r from-transparent via-white/20 to-transparent 
                            transition-transform duration-1000" />
            
            <span className="relative text-primary text-xl">🎁</span>
            <span className="relative text-foreground font-semibold text-lg">
              Vinci 100€ - Compila il questionario!
            </span>
            <ArrowRight className="relative w-5 h-5 text-primary/70 transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          {/* Info aggiuntiva sul questionario */}
          <p className="text-sm text-muted-foreground/70 max-w-2xl mx-auto mb-16 animate-fade-in-up flex flex-col items-center gap-3" style={{ animationDelay: '550ms' }}>
            <span><span className="font-semibold text-foreground">30 stanze in quadrilocali</span> disponibili da settembre 2026</span>
            <span className="flex items-center gap-2">
              Supportati da 
              <a href="https://2i3t.it" target="_blank" rel="noopener noreferrer" className="inline-block hover:opacity-80 transition-opacity">
                <img src={logo2i3t} alt="2i3T Incubatore Imprese Università di Torino" className="h-8 inline-block" />
              </a>
            </span>
          </p>

          {/* Hero CTAs - LARGE & PROMINENT */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up mb-20" style={{ animationDelay: '600ms' }}>
            <Button 
              size="lg" 
              variant="hero"
              onClick={handleWhatsAppLorenzo}
              className="px-16 py-8 text-lg group"
            >
              Contatta Lorenzo
              <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button 
              size="lg" 
              variant="hero"
              onClick={handleWhatsAppAndrea}
              className="px-16 py-8 text-lg group"
            >
              Contatta Andrea
              <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-12 py-7 text-base"
            >
              Come Funziona
            </Button>
          </div>

          {/* Minimal trust indicators */}
          <div className="flex flex-wrap justify-center gap-12 text-sm animate-fade-in-up text-muted-foreground font-light tracking-wide" style={{ animationDelay: '700ms' }}>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-primary/40 rounded-full" />
              <span>Contratti sicuri</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-primary/40 rounded-full" />
              <span>Supporto dedicato</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-primary/40 rounded-full" />
              <span>Zero commissioni</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
