import { Wallet, Shield, MapPin, Gift } from "lucide-react";
import { Card } from "@/components/ui/card";

const benefits = [
  {
    icon: Wallet,
    title: "Risparmio Garantito",
    description: "Risparmi il 25% sull'affitto annuale. Su un affitto di €400/mese, risparmi €1.200 all'anno!",
    highlight: "€1.200+"
  },
  {
    icon: Gift,
    title: "Bonus Mese Gratis",
    description: "Partecipa al nostro programma e potresti vincere un mese di affitto completamente gratuito",
    highlight: "1 Mese"
  },
  {
    icon: MapPin,
    title: "Posizione Strategica",
    description: "Tutte le nostre case sono vicino al Politecnico e all'Università di Torino",
    highlight: "Top Location"
  },
  {
    icon: Shield,
    title: "Contratti Sicuri",
    description: "Contratti regolari, supporto dedicato e trasparenza totale. Zero sorprese.",
    highlight: "100% Safe"
  }
];

export const Benefits = () => {
  return (
    <section className="py-40 bg-background relative overflow-hidden">
      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-border" />
      
      <div className="container px-8 relative z-10">
        <div className="text-center mb-28 max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6 font-medium">
            I Nostri Vantaggi
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight text-foreground tracking-tight">
            Perché Scegliere<br />Jungle Rent
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
            Più di un semplice affitto
          </p>
        </div>

        {/* Asymmetric grid layout */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {benefits.slice(0, 2).map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card 
                  key={index}
                  className="relative p-12 border border-border/50 bg-card hover:border-primary/30 transition-all duration-700 hover:shadow-[0_8px_24px_hsla(28,24%,14%,0.1)] group hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Subtle highlight badge */}
                  <div className="absolute top-8 right-8 text-xs uppercase tracking-wider text-primary/60 font-medium">
                    {benefit.highlight}
                  </div>

                  {/* Simple icon */}
                  <div className="mb-8">
                    <Icon className="w-10 h-10 text-primary/60 group-hover:text-primary transition-colors duration-700" strokeWidth={1.5} />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-display font-semibold mb-4 leading-tight text-foreground">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-light">
                    {benefit.description}
                  </p>
                </Card>
              );
            })}
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.slice(2, 4).map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card 
                  key={index + 2}
                  className="relative p-12 border border-border/50 bg-card hover:border-primary/30 transition-all duration-700 hover:shadow-[0_8px_24px_hsla(28,24%,14%,0.1)] group hover:-translate-y-1"
                  style={{ animationDelay: `${(index + 2) * 100}ms` }}
                >
                  {/* Subtle highlight badge */}
                  <div className="absolute top-8 right-8 text-xs uppercase tracking-wider text-primary/60 font-medium">
                    {benefit.highlight}
                  </div>

                  {/* Simple icon */}
                  <div className="mb-8">
                    <Icon className="w-10 h-10 text-primary/60 group-hover:text-primary transition-colors duration-700" strokeWidth={1.5} />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-display font-semibold mb-4 leading-tight text-foreground">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-light">
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
