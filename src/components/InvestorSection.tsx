import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrendingUp, PieChart, BarChart3, ArrowRight } from "lucide-react";

const investorBenefits = [
  {
    icon: TrendingUp,
    title: "ROI Ottimizzato",
    description: "Rendimenti superiori alla media del mercato grazie alla nostra gestione professionale e pricing strategico"
  },
  {
    icon: BarChart3,
    title: "Gestione Completa",
    description: "Ci occupiamo di tutto: contratti, manutenzione, relazioni con inquilini. Zero stress per te"
  },
  {
    icon: PieChart,
    title: "Portfolio Strategico",
    description: "Proprietà selezionate vicino ai poli universitari torinesi, con domanda costante tutto l'anno"
  }
];

export const InvestorSection = () => {
  const handleInvestorContact = () => {
    window.open("mailto:junglerententerprise@gmail.com?subject=Opportunità Investimento Immobiliare", "_blank");
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
            Per Investitori
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-8 leading-tight text-foreground tracking-tight">
            Opportunità di<br />Investimento Immobiliare
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
            Partnership professionali nel mercato degli affitti universitari torinesi
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-16">
          {investorBenefits.map((benefit, index) => {
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
          <Button 
            size="lg" 
            variant="premium"
            onClick={handleInvestorContact}
            className="px-12 py-7 text-base"
          >
            Richiedi Informazioni per Investitori
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <p className="text-xs text-muted-foreground/60 mt-6 font-light">
            Ti risponderemo entro 24 ore con una proposta personalizzata
          </p>
        </div>

        {/* Trust indicator */}
        <div className="text-center mt-16 pt-16 border-t border-border">
          <p className="text-sm text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
            <span className="text-foreground font-medium">Supportati da 2i3T</span> — Incubatore d'Imprese dell'Università di Torino. Garanzia di professionalità e trasparenza in ogni investimento.
          </p>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-border" />
    </section>
  );
};
