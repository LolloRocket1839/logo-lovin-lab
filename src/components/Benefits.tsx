import { Wallet, Shield, MapPin, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { openEmail, MESSAGES } from "@/lib/contacts";

const benefits = [
  {
    icon: Wallet,
    title: "Risparmi Certificati",
    description: "Risparmia sui costi rispetto alle agenzie tradizionali. Affitti convenienti con contratti trasparenti.",
    highlight: "Risparmia"
  },
  {
    icon: TrendingUp,
    title: "Opportunità di Investimento",
    description: "Per investitori: gestione professionale delle proprietà con domanda universitaria costante",
    highlight: "Investitori"
  },
  {
    icon: MapPin,
    title: "Posizione Strategica",
    description: "Portfolio immobiliare selezionato vicino a tutti i principali atenei: Politecnico, UniTo, ESCP, SAA, IED, IAAD, IUSTO",
    highlight: "Top Location"
  },
  {
    icon: Shield,
    title: "Contratti Certificati",
    description: "Contratti regolari, gestione professionale e trasparenza totale. Supportati da 2i3T - Incubatore Universitario.",
    highlight: "100% Safe"
  }
];

export const Benefits = () => {
  return (
    <section id="benefits" aria-labelledby="benefits-heading" className="py-20 md:py-32 lg:py-40 bg-background relative overflow-hidden">
      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-border" />
      
      {/* Decorative blur circles for depth */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/30 rounded-full blur-3xl" />
      
      <div className="container px-8 relative z-10">
        <div className="text-center mb-12 md:mb-20 lg:mb-28 max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6 font-medium">
            I Nostri Vantaggi
          </p>
          <h2 id="benefits-heading" className="text-3xl md:text-5xl lg:text-7xl font-display font-bold mb-6 leading-tight text-foreground tracking-tight">
            Vantaggi Concreti per<br />Studenti & Investitori
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed mb-8">
            Gestione professionale, risparmio garantito e partnership istituzionali
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => openEmail(MESSAGES.student.email.subject, MESSAGES.student.email.body)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base group"
            >
              <Mail className="mr-2 w-5 h-5" />
              Sono uno Studente
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => openEmail(MESSAGES.investor.email.subject, MESSAGES.investor.email.body)}
              className="border-primary/30 hover:bg-primary/5 px-8 py-6 text-base group"
            >
              <Mail className="mr-2 w-5 h-5" />
              Sono un Investitore
            </Button>
          </div>
        </div>

        {/* Grid layout - 4 benefits */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card 
                  key={index}
                  className="relative p-6 md:p-8 lg:p-10 backdrop-blur-xl bg-white/10 border border-white/20 hover:border-white/40 transition-all duration-700 group hover:-translate-y-1 hover:bg-white/15"
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
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  {/* Subtle highlight badge */}
                  <div className="absolute top-6 right-6 text-xs uppercase tracking-wider text-primary/80 font-medium z-10">
                    {benefit.highlight}
                  </div>

                  {/* Simple icon */}
                  <div className="mb-6 relative z-10">
                    <Icon className="w-10 h-10 text-primary/70 group-hover:text-primary transition-colors duration-700" strokeWidth={1.5} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-display font-semibold mb-4 leading-tight text-foreground relative z-10">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-light text-sm relative z-10">
                    {benefit.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Bottom border line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-border" />
    </section>
  );
};
