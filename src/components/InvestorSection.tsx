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
          
          {/* Visual Decoration - Investment Flow - Enhanced */}
          <div className="max-w-4xl mx-auto mb-12 md:mb-16 px-4">
            <div className="relative flex items-center justify-between py-12">
              {/* Gradient connection line with pulse effect */}
              <div className="absolute top-1/2 left-0 right-0 h-[1px] -translate-y-1/2 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 animate-pulse" 
                     style={{ animationDuration: '3s' }} />
              </div>
              
              {/* Enhanced step indicators */}
              <div className="relative z-10 flex flex-col items-center gap-4 group">
                <div className="relative">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary/5 to-primary/15 
                                border-[3px] border-primary/30 
                                flex items-center justify-center 
                                group-hover:border-primary/60 
                                group-hover:shadow-lg group-hover:shadow-primary/20
                                transition-all duration-700 
                                group-hover:scale-110
                                backdrop-blur-sm">
                    <TrendingUp className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-700" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-sm font-semibold text-foreground block mb-1">Rendimenti</span>
                  <span className="text-xs text-muted-foreground font-light">Ottimizzati</span>
                </div>
              </div>
              
              <div className="relative z-10 flex flex-col items-center gap-4 group">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary/5 to-primary/15 
                                border-[3px] border-primary/30 
                                flex items-center justify-center 
                                group-hover:border-primary/60 
                                group-hover:shadow-lg group-hover:shadow-primary/20
                                transition-all duration-700 
                                group-hover:scale-110
                                backdrop-blur-sm">
                    <BarChart3 className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-700" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-sm font-semibold text-foreground block mb-1">Gestione</span>
                  <span className="text-xs text-muted-foreground font-light">Professionale</span>
                </div>
              </div>
              
              <div className="relative z-10 flex flex-col items-center gap-4 group">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary/5 to-primary/15 
                                border-[3px] border-primary/30 
                                flex items-center justify-center 
                                group-hover:border-primary/60 
                                group-hover:shadow-lg group-hover:shadow-primary/20
                                transition-all duration-700 
                                group-hover:scale-110
                                backdrop-blur-sm">
                    <PieChart className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-700" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-sm font-semibold text-foreground block mb-1">Portfolio</span>
                  <span className="text-xs text-muted-foreground font-light">Strategico</span>
                </div>
              </div>
            </div>
          </div>
          
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
          
          {/* CTA Waitlist - Integrated */}
          <div className="mt-12 md:mt-16 max-w-6xl mx-auto">
            <div className="p-10 md:p-14 lg:p-20 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-card/80 to-primary/5 backdrop-blur-sm space-y-8">
              <div className="text-center space-y-4">
                <h3 className="font-gotham text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Iscriviti alla Waitlist Investitori
                </h3>
                <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
                  Ricevi aggiornamenti esclusivi sulle opportunità di investimento immobiliare a Torino
                </p>
              </div>
              
              <div className="flex flex-col items-center gap-6">
                <Button 
                  onClick={() => setWaitlistOpen(true)}
                  size="lg"
                  variant="premium"
                  className="w-full sm:w-auto px-16 py-8 text-lg group shadow-xl"
                >
                  Iscriviti Ora
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <div className="flex items-center gap-3 text-base text-muted-foreground">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="font-medium">Risposta prioritaria garantita</span>
                </div>
              </div>
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
