import { Button } from "@/components/ui/button";
import { ArrowRight, Percent, MessageCircle } from "lucide-react";
import jungleRentLogo from "@/assets/jungle-rent-logo-transparent.png";

export const Hero = () => {
  const handleWhatsAppLorenzo = () => {
    window.open("https://wa.me/393319053037", "_blank");
  };

  const handleWhatsAppAndrea = () => {
    window.open("https://wa.me/393920675357", "_blank");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-cream/50 to-accent/10">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-[32rem] h-[32rem] bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-primary/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(150_55%_23%/0.03),transparent_50%)]" />

      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-10 animate-fade-in">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl scale-110" />
              <img 
                src={jungleRentLogo} 
                alt="Jungle Rent Logo" 
                className="w-36 h-36 mx-auto relative z-10 drop-shadow-2xl transition-transform hover:scale-105 duration-500"
              />
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tight animate-fade-in-up leading-[1.1]">
            Risparmia il{" "}
            <span className="inline-block relative">
              <span className="text-primary inline-flex items-center gap-2 relative z-10">
                25%
                <Percent className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" />
              </span>
              <div className="absolute inset-0 bg-primary/10 blur-2xl scale-110 animate-pulse" />
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              sull'Affitto
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-10 max-w-3xl mx-auto animate-fade-in-up animation-delay-200 leading-relaxed font-light">
            Il modo rivoluzionario per affittare casa a Torino.
            <br />
            <span className="text-primary font-semibold">Vicino al Politecnico e Università di Torino</span>
          </p>

          {/* Bonus Badge */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-2 border-primary/30 rounded-full px-8 py-4 mb-12 animate-fade-in-up animation-delay-300 shadow-lg hover:shadow-xl transition-all hover:scale-105 backdrop-blur-sm">
            <span className="text-xl font-bold text-primary">🎉 BONUS:</span>
            <span className="text-foreground font-medium">Possibilità di vincere 1 mese gratis!</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center animate-fade-in-up animation-delay-400">
            <Button 
              size="lg" 
              variant="hero"
              onClick={handleWhatsAppLorenzo}
              className="text-lg px-10 py-7 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.20)] transition-all duration-500 hover:scale-[1.02] hover:-translate-y-0.5 group"
            >
              <MessageCircle className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              Contatta Lorenzo
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="hero"
              onClick={handleWhatsAppAndrea}
              className="text-lg px-10 py-7 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.20)] transition-all duration-500 hover:scale-[1.02] hover:-translate-y-0.5 group"
            >
              <MessageCircle className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              Contatta Andrea
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-lg px-10 py-7 hover:shadow-lg transition-all duration-300"
            >
              Come Funziona
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-20 flex flex-wrap justify-center gap-10 text-base animate-fade-in-up animation-delay-500">
            <div className="flex items-center gap-3 group cursor-default">
              <div className="w-2.5 h-2.5 bg-primary rounded-full group-hover:scale-125 transition-transform" />
              <span className="text-muted-foreground group-hover:text-foreground transition-colors font-medium">Contratti sicuri</span>
            </div>
            <div className="flex items-center gap-3 group cursor-default">
              <div className="w-2.5 h-2.5 bg-primary rounded-full group-hover:scale-125 transition-transform" />
              <span className="text-muted-foreground group-hover:text-foreground transition-colors font-medium">Supporto dedicato</span>
            </div>
            <div className="flex items-center gap-3 group cursor-default">
              <div className="w-2.5 h-2.5 bg-primary rounded-full group-hover:scale-125 transition-transform" />
              <span className="text-muted-foreground group-hover:text-foreground transition-colors font-medium">Zero commissioni nascoste</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
