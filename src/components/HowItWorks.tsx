import { useState } from "react";
import { MapPin, UserPlus, FileCheck, HeartHandshake, Sparkles, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WaitlistDialog } from "@/components/WaitlistDialog";

const steps = [
  {
    icon: MapPin,
    title: "Esplora le Stanze Disponibili",
    description: "Naviga le nostre stanze vicino a Politecnico, UniTo e tutti gli atenei torinesi. Ogni annuncio mostra prezzo, foto, servizi inclusi e coinquilini.",
    step: "01",
    bullets: [
      "A 10-15 min a piedi dalle università",
      "Tutte le bollette incluse (luce, gas, Wi-Fi)",
      "Arredate e pronte da abitare"
    ]
  },
  {
    icon: UserPlus,
    title: "Prenota la Tua Stanza",
    description: "Compila il form con le tue preferenze (budget, università, interessi). Ti abbiniamo con coinquilini compatibili o prenota con i tuoi amici.",
    step: "02",
    bullets: [
      "Matching automatico con studenti affini",
      "Puoi venire da solo o con amici",
      "Profili verificati, zero sorprese"
    ]
  },
  {
    icon: FileCheck,
    title: "Firma Contratto e Paga Online",
    description: "Ricevi il contratto regolare via email, firma digitalmente e paga il deposito. Zero commissioni di agenzia, zero costi nascosti.",
    step: "03",
    bullets: [
      "Contratto registrato",
      "Deposito cauzionale standard",
      "Pagamento sicuro online"
    ]
  },
  {
    icon: HeartHandshake,
    title: "Ti Seguiamo Sempre",
    description: "Assistenza WhatsApp 7/7 per manutenzione, bollette o problemi di convivenza.",
    step: "04",
    bullets: [
      "Accoglienza personale e consegna chiavi",
      "Risposta in <24h per emergenze"
    ]
  }
];

export const HowItWorks = () => {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <section id="how-it-works" className="py-40 bg-gradient-to-b from-background to-accent/10 relative overflow-hidden">
      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-border" />
      
      {/* Decorative blur circles */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
      
      <div className="container px-8 relative z-10">
        <div className="text-center mb-28 max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6 font-medium">
            Processo Semplice
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight text-foreground tracking-tight">
            Come Funziona
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
            Quattro semplici passi per iniziare a risparmiare
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto relative">
          {/* Connecting lines between steps */}
          <div className="hidden md:block absolute top-24 left-1/6 right-1/6 h-[1px] bg-border -z-10" />
          
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card 
                key={index}
                className="relative p-12 backdrop-blur-xl bg-white/10 border border-white/20 hover:border-white/40 transition-all duration-700 group hover:-translate-y-1 hover:bg-white/15"
                style={{ 
                  animationDelay: `${index * 150}ms`,
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
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                {/* Elegant number badge */}
                <div className="mb-8 relative z-10">
                  <div className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center text-primary font-display text-lg font-medium group-hover:border-primary/50 transition-colors duration-700 backdrop-blur-sm">
                    {step.step}
                  </div>
                </div>

                {/* Simple line icon */}
                <div className="mb-6 relative z-10">
                  <Icon className="w-8 h-8 text-primary/70 group-hover:text-primary transition-colors duration-700" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-display font-semibold mb-3 leading-tight text-foreground relative z-10">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light relative z-10 mb-4">
                  {step.description}
                </p>
                
                {/* Bullet points */}
                <ul className="space-y-2 relative z-10">
                  {step.bullets.map((bullet, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/70 mt-1.5 mr-2 flex-shrink-0" />
                      <span className="font-light">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Waitlist button for Step 2 */}
                {index === 1 && (
                  <div className="mt-8 relative group">
                    {/* Glow background animato */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-emerald-500/20 to-cyan-500/20 
                                    rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <Button 
                      onClick={() => setWaitlistOpen(true)}
                      className="relative w-full 
                                 backdrop-blur-xl bg-gradient-to-r from-primary/15 via-emerald-500/15 to-primary/15
                                 border-2 border-white/30 hover:border-white/50
                                 text-foreground font-bold py-7 px-10 text-lg
                                 shadow-[0_8px_24px_rgba(0,0,0,0.2),0_4px_12px_rgba(139,195,74,0.15)]
                                 hover:shadow-[0_12px_32px_rgba(0,0,0,0.3),0_6px_16px_rgba(139,195,74,0.25)]
                                 hover:scale-[1.02] hover:bg-gradient-to-r hover:from-primary/25 hover:via-emerald-500/25 hover:to-primary/25
                                 transition-all duration-700
                                 rounded-2xl overflow-hidden"
                    >
                      {/* Shimmer effect on hover */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full 
                                      bg-gradient-to-r from-transparent via-white/20 to-transparent 
                                      transition-transform duration-1000 pointer-events-none" />
                      
                      <span className="relative flex items-center justify-center gap-3">
                        <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                        <span className="bg-gradient-to-r from-primary via-emerald-600 to-primary 
                                         bg-clip-text text-transparent group-hover:from-emerald-600 group-hover:via-primary group-hover:to-emerald-600
                                         transition-all duration-700">
                          Iscriviti Ora alla Waitlist
                        </span>
                        <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </Button>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        <WaitlistDialog open={waitlistOpen} onOpenChange={setWaitlistOpen} />
      </div>
      
      {/* Bottom border line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-border" />
    </section>
  );
};
