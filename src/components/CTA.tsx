import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight } from "lucide-react";

export const CTA = () => {
  const handleWhatsAppLorenzo = () => {
    window.open("https://wa.me/393319053037", "_blank");
  };

  const handleWhatsAppAndrea = () => {
    window.open("https://wa.me/393920675357", "_blank");
  };

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-secondary" />
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.1),transparent_50%)]" />
      </div>
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />
      </div>

      <div className="container px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-primary-foreground font-semibold text-sm mb-6">
              <span className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse" />
              RISPARMIA ORA
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-primary-foreground mb-8 leading-tight">
            Pronto a Risparmiare?
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl text-primary-foreground/95 mb-14 max-w-3xl mx-auto leading-relaxed font-light">
            Unisciti a centinaia di studenti che già risparmiano con Jungle Rent. 
            <br />
            <span className="font-bold">Il tuo nuovo appartamento ti aspetta!</span>
          </p>

          {/* Large CTA */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-12">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={handleWhatsAppLorenzo}
              className="text-xl px-12 py-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_80px_rgba(0,0,0,0.4)] transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 bg-white text-primary border-4 border-white/30 font-bold group"
            >
              <MessageCircle className="mr-3 w-7 h-7 group-hover:scale-110 transition-transform" />
              Contatta Lorenzo
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={handleWhatsAppAndrea}
              className="text-xl px-12 py-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_80px_rgba(0,0,0,0.4)] transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 bg-white text-primary border-4 border-white/30 font-bold group"
            >
              <MessageCircle className="mr-3 w-7 h-7 group-hover:scale-110 transition-transform" />
              Contatta Andrea
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Extra info */}
          <div className="flex flex-wrap justify-center gap-8 text-primary-foreground/90 text-lg">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📱</span>
              <span className="font-medium">Risposta veloce</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏠</span>
              <span className="font-medium">Case disponibili ora</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">💰</span>
              <span className="font-medium">Risparmio garantito</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
