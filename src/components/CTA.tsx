import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight } from "lucide-react";

export const CTA = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/393920675357", "_blank");
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-secondary" />
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black text-primary-foreground mb-6">
            Pronto a Risparmiare?
          </h2>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto">
            Unisciti a centinaia di studenti che già risparmiano con Jungle Rent. 
            <br />
            <span className="font-bold">Il tuo nuovo appartamento ti aspetta!</span>
          </p>

          {/* Large CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={handleWhatsAppClick}
              className="text-lg px-10 py-7 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 bg-primary-foreground text-primary border-4 border-primary-foreground/20"
            >
              <MessageCircle className="mr-2 w-6 h-6" />
              Scrivici su WhatsApp
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Extra info */}
          <p className="mt-8 text-primary-foreground/80">
            📱 Risposta veloce • 🏠 Case disponibili ora • 💰 Risparmio garantito
          </p>
        </div>
      </div>
    </section>
  );
};
