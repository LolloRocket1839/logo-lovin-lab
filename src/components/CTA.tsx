import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CTA = () => {
  const handleWhatsAppLorenzo = () => {
    window.open("https://wa.me/393319053037", "_blank");
  };

  const handleWhatsAppAndrea = () => {
    window.open("https://wa.me/393920675357", "_blank");
  };

  return (
    <section className="py-40 relative overflow-hidden bg-primary">
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="container px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/70 mb-8 font-medium">
            Inizia Oggi
          </p>
          
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-display font-bold text-primary-foreground mb-8 leading-tight tracking-tight">
            Inizia Oggi
          </h2>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-4 max-w-2xl mx-auto leading-relaxed font-light">
            Studenti e investitori: parliamo delle vostre esigenze
          </p>
          
          <p className="text-base text-primary-foreground/70 mb-16 font-light">
            Centinaia di studenti già risparmiano. Portfolio in crescita per investitori.
          </p>

          {/* Dual Target CTAs */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {/* Students CTA */}
            <div className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-2xl p-8">
              <h3 className="text-2xl font-display font-bold text-primary-foreground mb-4">
                Per Studenti
              </h3>
              <p className="text-primary-foreground/80 mb-6 font-light text-sm">
                Risparmia il 25% sul tuo affitto. Contattaci su WhatsApp per case disponibili.
              </p>
              <div className="flex flex-col gap-3">
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={handleWhatsAppLorenzo}
                  className="w-full px-8 py-6 bg-primary-foreground text-primary hover:bg-primary-foreground/95 border-2 border-primary-foreground/20 font-medium tracking-wide uppercase text-sm transition-all duration-500 hover:shadow-[0_8px_32px_hsla(37,35%,98%,0.3)]"
                >
                  Contatta Lorenzo
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={handleWhatsAppAndrea}
                  className="w-full px-8 py-6 bg-primary-foreground text-primary hover:bg-primary-foreground/95 border-2 border-primary-foreground/20 font-medium tracking-wide uppercase text-sm transition-all duration-500 hover:shadow-[0_8px_32px_hsla(37,35%,98%,0.3)]"
                >
                  Contatta Andrea
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {/* Investors CTA */}
            <div className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-2xl p-8">
              <h3 className="text-2xl font-display font-bold text-primary-foreground mb-4">
                Per Investitori
              </h3>
              <p className="text-primary-foreground/80 mb-6 font-light text-sm">
                Opportunità immobiliari nel mercato universitario torinese. ROI ottimizzato.
              </p>
              <div className="flex flex-col gap-3">
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={handleWhatsAppLorenzo}
                  className="w-full px-8 py-6 bg-primary-foreground text-primary hover:bg-primary-foreground/95 border-2 border-primary-foreground/20 font-medium tracking-wide uppercase text-sm transition-all duration-500 hover:shadow-[0_8px_32px_hsla(37,35%,98%,0.3)]"
                >
                  Contatta Lorenzo
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={handleWhatsAppAndrea}
                  className="w-full px-8 py-6 bg-primary-foreground text-primary hover:bg-primary-foreground/95 border-2 border-primary-foreground/20 font-medium tracking-wide uppercase text-sm transition-all duration-500 hover:shadow-[0_8px_32px_hsla(37,35%,98%,0.3)]"
                >
                  Contatta Andrea
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => window.open("mailto:junglerententerprise@gmail.com?subject=Opportunità Investimento", "_blank")}
                  className="w-full px-8 py-6 bg-primary-foreground/80 text-primary hover:bg-primary-foreground/95 border-2 border-primary-foreground/10 font-medium tracking-wide uppercase text-sm transition-all duration-500"
                >
                  Email
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-primary-foreground/60 mt-4 font-light">
                Risposta entro 24 ore
              </p>
            </div>
          </div>

          {/* Minimal info */}
          <div className="flex flex-wrap justify-center gap-10 text-primary-foreground/80 text-sm font-light tracking-wide">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-primary-foreground/40 rounded-full" />
              <span>Risposta veloce</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-primary-foreground/40 rounded-full" />
              <span>Case disponibili</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-primary-foreground/40 rounded-full" />
              <span>Risparmio garantito</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
