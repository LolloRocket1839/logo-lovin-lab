import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrendingUp, PieChart, BarChart3, ArrowRight } from "lucide-react";
import { InvestorWaitlistDialog } from "@/components/InvestorWaitlistDialog";
import { openEmail, MESSAGES } from "@/lib/contacts";

const investorBenefits = [
  {
    icon: TrendingUp,
    title: "Investimento Ottimizzato",
    description: "Opportunità nel mercato immobiliare grazie alla nostra gestione professionale e pricing strategico"
  },
  {
    icon: BarChart3,
    title: "Gestione Completa",
    description: "Ci occupiamo di tutto: contratti, manutenzione, relazioni con inquilini. Zero stress per te"
  },
  {
    icon: PieChart,
    title: "Portfolio Strategico",
    description: "Proprietà selezionate vicino ai 7 principali poli universitari di Torino (Politecnico, UniTo, ESCP, SAA, IED, IAAD, IUSTO) con alta domanda costante"
  }
];

export const InvestorSection = () => {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  const handleInvestorContact = () => {
    openEmail(MESSAGES.investor.email.subject, MESSAGES.investor.email.body);
  };

  return (
    <section id="investor-section" className="py-20 md:py-32 lg:py-40 bg-accent/20 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-border" />
      
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      {/* Decorative blur circles */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent/30 rounded-full blur-3xl" />

      <div className="container px-8 relative z-10">
        <div className="text-center mb-12 md:mb-20 lg:mb-28 max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6 font-medium">
            Per Investitori
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-display font-bold mb-8 leading-tight text-foreground tracking-tight">
            Opportunità di<br />Investimento Immobiliare
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
            Partnership professionali nel mercato degli affitti universitari torinesi
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
          {investorBenefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card 
                key={index}
                className="p-6 md:p-8 lg:p-10 backdrop-blur-xl bg-white/10 border border-white/20 hover:border-white/40 transition-all duration-700 group hover:bg-white/15 hover:-translate-y-1"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  boxShadow: 'var(--shadow-glass)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--shadow-glass-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--shadow-glass)';
                }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="mb-6 relative z-10">
                  <Icon className="w-10 h-10 text-primary/70 group-hover:text-primary transition-colors duration-700" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-display font-semibold mb-4 leading-tight text-foreground relative z-10">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed font-light text-sm relative z-10">
                  {benefit.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <Button 
            size="lg" 
            variant="premium"
            onClick={handleInvestorContact}
            className="w-full sm:w-auto px-6 py-5 sm:px-10 sm:py-6 md:px-12 md:py-7 text-sm sm:text-base"
          >
            Richiedi Informazioni per Investitori
            <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          <p className="text-xs text-muted-foreground/60 font-light">
            Risposta entro 40 minuti
          </p>
          
          {/* Waitlist button */}
          <div className="pt-4">
            <Button 
              onClick={() => setWaitlistOpen(true)}
              className="bg-primary/90 hover:bg-primary
                         text-primary-foreground
                         h-11 text-sm font-medium
                         border border-primary/20
                         transition-all duration-300
                         hover:shadow-lg hover:shadow-primary/20
                         rounded-lg
                         px-8"
            >
              Iscriviti alla Waitlist Investitori
            </Button>
          </div>
        </div>
        
        <InvestorWaitlistDialog open={waitlistOpen} onOpenChange={setWaitlistOpen} />

      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-border" />
    </section>
  );
};
