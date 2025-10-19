import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wallet, Calendar, ArrowRight } from "lucide-react";

const studentBenefits = [
  {
    icon: Wallet,
    title: "Risparmio del 25%",
    description: "Risparmia il 25% rispetto agli affitti tradizionali. Più soldi per studiare e vivere la città"
  },
  {
    icon: Calendar,
    title: "Contratti Flessibili",
    description: "Massima flessibilità per il tuo percorso universitario"
  }
];

export const StudentSection = () => {
  const handleWhatsAppLorenzo = () => {
    window.open("https://wa.me/393207840116?text=Ciao! Sono interessato a trovare una stanza tramite JungleRent", "_blank");
  };

  const handleWhatsAppAndrea = () => {
    window.open("https://wa.me/393349340449?text=Ciao! Sono interessato a trovare una stanza tramite JungleRent", "_blank");
  };

  return (
    <section className="py-40 bg-accent/20 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-border" />
      
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="container px-8 relative z-10">
        <div className="text-center mb-28 max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6 font-medium">
            Per Studenti
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-8 leading-tight text-foreground tracking-tight">
            Affitta Smart,<br />Risparmia e Studia
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
            Soluzioni abitative pensate per il tuo successo universitario a Torino
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 mb-16">
          {studentBenefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card 
                key={index}
                className="p-10 border border-border/50 bg-card hover:border-primary/30 transition-all duration-700 hover:shadow-[0_8px_24px_hsla(28,24%,14%,0.1)] group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-6">
                  <Icon className="w-10 h-10 text-primary/60 group-hover:text-primary transition-colors duration-700" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-display font-semibold mb-4 leading-tight text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed font-light text-sm">
                  {benefit.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-6 font-light">
            Contatta direttamente i nostri student advisor:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              variant="premium"
              onClick={handleWhatsAppLorenzo}
              className="px-10 py-7 text-base"
            >
              Parla con Lorenzo
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button 
              size="lg" 
              variant="premium"
              onClick={handleWhatsAppAndrea}
              className="px-10 py-7 text-base"
            >
              Parla con Andrea
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground/60 mt-6 font-light">
            Risposta entro 40 minuti
          </p>
        </div>

        {/* Trust indicator */}
        <div className="text-center mt-16 pt-16 border-t border-border">
          <p className="text-sm text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
            <span className="text-foreground font-medium">Supportati da 2i3T</span> — Incubatore d'Imprese dell'Università di Torino. Il tuo successo universitario è la nostra priorità.
          </p>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-border" />
    </section>
  );
};
