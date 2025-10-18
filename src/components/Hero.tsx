import { Button } from "@/components/ui/button";
import { ArrowRight, Percent } from "lucide-react";
import jungleRentLogo from "@/assets/jungle-rent-logo-transparent.png";

export const Hero = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/393920675357", "_blank");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-accent/10">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-8 animate-fade-in">
            <img 
              src={jungleRentLogo} 
              alt="Jungle Rent Logo" 
              className="w-32 h-32 mx-auto drop-shadow-lg"
            />
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight animate-fade-in-up">
            Risparmia il{" "}
            <span className="text-primary inline-flex items-center gap-2">
              25%
              <Percent className="w-12 h-12 md:w-16 md:h-16" />
            </span>
            <br />
            sull'Affitto
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Il modo rivoluzionario per affittare casa a Torino.
            <br />
            <span className="text-primary font-semibold">Vicino al Politecnico e Università di Torino</span>
          </p>

          {/* Bonus Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border-2 border-primary rounded-full px-6 py-3 mb-10 animate-fade-in-up animation-delay-300">
            <span className="text-lg font-bold text-primary">🎉 BONUS:</span>
            <span className="text-foreground">Possibilità di vincere 1 mese gratis!</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-400">
            <Button 
              size="lg" 
              variant="hero"
              onClick={handleWhatsAppClick}
              className="text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Contattaci su WhatsApp
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-lg px-8 py-6"
            >
              Come Funziona
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground animate-fade-in-up animation-delay-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>Contratti sicuri</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>Supporto dedicato</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>Zero commissioni nascoste</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
