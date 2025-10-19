import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

export const CTA = () => {
  const handleWhatsAppLorenzoStudent = () => {
    const message = encodeURIComponent("Ciao Lorenzo! Sono uno studente interessato a JungleRent.\n\nVorrei informazioni su:\n- Stanze disponibili\n- Prezzi e risparmio del 25%\n- Contratti flessibili\n\nGrazie!");
    window.open(`https://wa.me/393319053037?text=${message}`, "_blank");
  };

  const handleWhatsAppAndreaStudent = () => {
    const message = encodeURIComponent("Ciao Andrea! Sono uno studente interessato a JungleRent.\n\nVorrei informazioni su:\n- Stanze disponibili\n- Prezzi e risparmio del 25%\n- Contratti flessibili\n\nGrazie!");
    window.open(`https://wa.me/393920675357?text=${message}`, "_blank");
  };

  const handleWhatsAppLorenzoInvestor = () => {
    const message = encodeURIComponent("Ciao Lorenzo! Sono interessato/a alle opportunità di investimento immobiliare con JungleRent.\n\nVorrei informazioni su:\n- ROI e rendimenti\n- Proprietà disponibili\n- Gestione del servizio\n\nGrazie!");
    window.open(`https://wa.me/393319053037?text=${message}`, "_blank");
  };

  const handleWhatsAppAndreaInvestor = () => {
    const message = encodeURIComponent("Ciao Andrea! Sono interessato/a alle opportunità di investimento immobiliare con JungleRent.\n\nVorrei informazioni su:\n- ROI e rendimenti\n- Proprietà disponibili\n- Gestione del servizio\n\nGrazie!");
    window.open(`https://wa.me/393920675357?text=${message}`, "_blank");
  };

  const handleEmailInvestor = () => {
    const subject = encodeURIComponent("Richiesta Informazioni - Investimento Immobiliare");
    const body = encodeURIComponent(`Buongiorno,

sono interessato/a a ricevere maggiori informazioni sulle opportunità di investimento immobiliare con JungleRent.

Vorrei saperne di più su:
- ROI previsto e rendimenti
- Tipologie di proprietà disponibili
- Gestione completa del servizio
- Prossimi step

Nome e Cognome: 
Contatto telefonico: 

Grazie,
Cordiali saluti`);
    window.open(`mailto:junglerententerprise@gmail.com?subject=${subject}&body=${body}`, "_blank");
  };

  const handleEmailStudent = () => {
    const subject = encodeURIComponent("Richiesta informazioni studente - JungleRent");
    const body = encodeURIComponent(`Buongiorno,

Sono uno studente interessato a trovare una stanza tramite JungleRent.

Vorrei ricevere informazioni su:
- Stanze disponibili vicino al mio ateneo
- Prezzi e condizioni di affitto
- Possibilità di visitare gli appartamenti
- Tempistiche di disponibilità

Grazie per la vostra disponibilità.

Cordiali saluti`);
    window.open(`mailto:junglerententerprise@gmail.com?subject=${subject}&body=${body}`, "_blank");
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
                  onClick={handleWhatsAppLorenzoStudent}
                  className="w-full px-8 py-6 bg-primary-foreground text-primary hover:bg-primary-foreground/95 border-2 border-primary-foreground/20 font-medium tracking-wide uppercase text-sm transition-all duration-500 hover:shadow-[0_8px_32px_hsla(37,35%,98%,0.3)]"
                >
                  Contatta Lorenzo
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={handleWhatsAppAndreaStudent}
                  className="w-full px-8 py-6 bg-primary-foreground text-primary hover:bg-primary-foreground/95 border-2 border-primary-foreground/20 font-medium tracking-wide uppercase text-sm transition-all duration-500 hover:shadow-[0_8px_32px_hsla(37,35%,98%,0.3)]"
                >
                  Contatta Andrea
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={handleEmailStudent}
                  className="w-full px-8 py-6 bg-primary-foreground/80 text-primary hover:bg-primary-foreground/95 border-2 border-primary-foreground/10 font-medium tracking-wide uppercase text-sm transition-all duration-500"
                >
                  <Mail className="mr-2 w-4 h-4" />
                  Email
                </Button>
              </div>
              <p className="text-xs text-primary-foreground/60 mt-4 font-light">
                Risposta entro 40 minuti
              </p>
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
                  onClick={handleWhatsAppLorenzoInvestor}
                  className="w-full px-8 py-6 bg-primary-foreground text-primary hover:bg-primary-foreground/95 border-2 border-primary-foreground/20 font-medium tracking-wide uppercase text-sm transition-all duration-500 hover:shadow-[0_8px_32px_hsla(37,35%,98%,0.3)]"
                >
                  Contatta Lorenzo
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={handleWhatsAppAndreaInvestor}
                  className="w-full px-8 py-6 bg-primary-foreground text-primary hover:bg-primary-foreground/95 border-2 border-primary-foreground/20 font-medium tracking-wide uppercase text-sm transition-all duration-500 hover:shadow-[0_8px_32px_hsla(37,35%,98%,0.3)]"
                >
                  Contatta Andrea
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={handleEmailInvestor}
                  className="w-full px-8 py-6 bg-primary-foreground/80 text-primary hover:bg-primary-foreground/95 border-2 border-primary-foreground/10 font-medium tracking-wide uppercase text-sm transition-all duration-500"
                >
                  <Mail className="mr-2 w-4 h-4" />
                  Email
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
