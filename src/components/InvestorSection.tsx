import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrendingUp, PieChart, BarChart3, ArrowRight, Target, Users, Building2 } from "lucide-react";
import { InvestorWaitlistDialog } from "@/components/InvestorWaitlistDialog";
import { openEmail, MESSAGES } from "@/lib/contacts";
import { InvestorMetricCard } from "@/components/investor/InvestorMetricCard";
import { PartnerLogos } from "@/components/investor/PartnerLogos";
import { StickyInvestorCTA } from "@/components/investor/StickyInvestorCTA";
import { Skeleton } from "@/components/ui/skeleton";

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
    <>
      <section id="investor-section" className="py-32 md:py-48 lg:py-56 bg-accent/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-border" />
      
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      {/* Decorative blur circles */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent/30 rounded-full blur-3xl" />

      <div className="container px-8 md:px-12 lg:px-16 relative z-10">
        {/* Header Section with increased whitespace */}
        <div className="text-center mb-20 md:mb-32 lg:mb-40 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <p className="text-xs uppercase tracking-widest text-primary font-semibold">
              Premium Investors
            </p>
          </div>
          <h2 className="font-gotham text-4xl md:text-6xl lg:text-8xl font-black mb-10 leading-tighter tracking-tighter">
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              Opportunità di<br />Investimento Immobiliare
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed tracking-wide">
            Partnership professionali nel mercato degli affitti universitari torinesi
          </p>
        </div>

        {/* Partner Logos */}
        <PartnerLogos />

        {/* Benefits Section - Bento Grid Layout */}
        <div className="my-16 md:my-20 lg:my-24">
          <h3 className="text-center text-2xl md:text-4xl font-display font-bold mb-10 md:mb-14 tracking-tight">
            Perché Investire con Noi
          </h3>
          
          {/* Asymmetric Bento Grid */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {investorBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card 
                  key={index}
                  className={`
                    p-8 md:p-10 lg:p-12 
                    backdrop-blur-xl bg-white/10 
                    border border-white/20 hover:border-primary/40 
                    transition-all duration-700 
                    group hover:bg-white/15 hover:-translate-y-2
                    ${index === 0 ? 'md:col-span-2 lg:row-span-2' : ''}
                  `}
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
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-700">
                      <Icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className={`font-display font-bold mb-4 leading-tight text-foreground relative z-10 tracking-tight ${index === 0 ? 'text-2xl md:text-3xl lg:text-4xl' : 'text-xl md:text-2xl'}`}>
                    {benefit.title}
                  </h3>
                  <p className={`text-muted-foreground leading-relaxed font-light relative z-10 ${index === 0 ? 'text-base md:text-lg' : 'text-sm md:text-base'}`}>
                    {benefit.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* CTA Section - Asymmetric Layout */}
        <div className="mt-24 md:mt-32 lg:mt-40 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12">
            {/* Left - Main CTA */}
            <div className="lg:col-span-3 space-y-6">
              <div>
                <h3 className="font-gotham text-3xl md:text-4xl font-bold mb-4 tracking-tight leading-tight">
                  Prenota Consulenza<br />Esclusiva
                </h3>
                <p className="text-muted-foreground text-lg font-light leading-relaxed">
                  Parliamo della tua strategia di investimento immobiliare
                </p>
              </div>
              
              <Button 
                size="lg" 
                variant="premium"
                onClick={handleInvestorContact}
                className="w-full sm:w-auto px-10 py-7 text-base group"
              >
                Contatta Consulente
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="font-medium">Risposta prioritaria garantita</span>
                </div>
              </div>
            </div>
            
            {/* Right - Waitlist */}
            <div className="lg:col-span-2 p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm space-y-4">
              <div className="text-center space-y-2">
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                  Oppure
                </p>
                <h4 className="font-display text-xl font-semibold">
                  Iscriviti alla Waitlist
                </h4>
                <p className="text-sm text-muted-foreground font-light">
                  Ricevi aggiornamenti sulle opportunità
                </p>
              </div>
              
              <Button 
                onClick={() => setWaitlistOpen(true)}
                variant="outline"
                className="w-full h-12 border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all duration-300"
              >
                Iscriviti Ora
              </Button>
            </div>
          </div>
        </div>
        
        <InvestorWaitlistDialog open={waitlistOpen} onOpenChange={setWaitlistOpen} />

      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-border" />
    </section>
    
    {/* Sticky Mobile CTA */}
    <StickyInvestorCTA />
    </>
  );
};
