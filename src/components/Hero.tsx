import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import jungleRentLogo from "@/assets/jungle-rent-logo.svg";

export const Hero = () => {
  const handleWhatsAppLorenzo = () => {
    window.open("https://wa.me/393319053037", "_blank");
  };

  const handleWhatsAppAndrea = () => {
    window.open("https://wa.me/393920675357", "_blank");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="container relative z-10 px-8 py-32">
        <div className="max-w-5xl mx-auto text-center">
          {/* Logo - refined and smaller */}
          <div className="mb-12 animate-fade-in">
            <img 
              src={jungleRentLogo} 
              alt="Jungle Rent" 
              className="w-20 h-20 mx-auto opacity-90 transition-all duration-700 hover:opacity-100 hover:scale-105 rounded-3xl"
            />
            <p className="mt-4 text-base font-accent text-primary/80 tracking-wider">
              Il tuo rifugio sicuro nella giungla immobiliare
            </p>
          </div>

          {/* Dual headline for students and investors */}
          <div className="mb-16 space-y-8">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 tracking-tight text-foreground">
                Sei uno studente?
              </h1>
              <p className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-primary tracking-tight">
                Risparmia il 25% per il tuo alloggio!
              </p>
            </div>
            
            <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 tracking-tight text-foreground">
                Sei un investitore immobiliare?
              </h2>
              <p className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-primary tracking-tight">
                Ottieni ottimi rendimenti ed investi a partire da 100€!
              </p>
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

          {/* Bonus - subtle and elegant */}
          <div className="inline-flex items-center gap-3 border border-primary/20 bg-primary/5 rounded-full px-8 py-3 mb-20 animate-fade-in-up text-sm font-medium tracking-wide" style={{ animationDelay: '500ms' }}>
            <span className="text-primary">✦</span>
            <span className="text-foreground">Possibilità di vincere 1 mese gratis</span>
          </div>

          {/* Single large CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up mb-20" style={{ animationDelay: '600ms' }}>
            <Button 
              size="lg" 
              variant="premium"
              onClick={handleWhatsAppLorenzo}
              className="px-12 py-7 text-base"
            >
              Contatta Lorenzo
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button 
              size="lg" 
              variant="premium"
              onClick={handleWhatsAppAndrea}
              className="px-12 py-7 text-base"
            >
              Contatta Andrea
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-12 py-7"
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
