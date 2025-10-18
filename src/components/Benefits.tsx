import { Wallet, Shield, MapPin, Gift, TrendingUp, HeadphonesIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

const benefits = [
  {
    icon: Wallet,
    title: "25% di Risparmio Certificato",
    description: "Risparmio calcolato su media mercato Torino 2024. Su €400/mese, risparmi €1.200 all'anno con contratti trasparenti.",
    highlight: "€1.200+"
  },
  {
    icon: TrendingUp,
    title: "ROI Ottimizzato",
    description: "Per investitori: rendimenti superiori alla media grazie alla gestione professionale e domanda universitaria costante",
    highlight: "Investitori"
  },
  {
    icon: MapPin,
    title: "Posizione Strategica",
    description: "Portfolio immobiliare selezionato vicino a tutti i principali atenei: Politecnico, UniTo, ESCP, SAA, IED, IAD, IUSTO",
    highlight: "Top Location"
  },
  {
    icon: Shield,
    title: "Contratti Certificati",
    description: "Contratti regolari, gestione professionale e trasparenza totale. Supportati da 2i3T - Incubatore Universitario.",
    highlight: "100% Safe"
  },
  {
    icon: Gift,
    title: "Bonus Studenti",
    description: "Programma fedeltà con possibilità di vincere un mese di affitto completamente gratuito per studenti attivi",
    highlight: "1 Mese"
  },
  {
    icon: HeadphonesIcon,
    title: "Gestione Completa",
    description: "Supporto dedicato H24, manutenzione rapida e assistenza personalizzata. Zero stress per studenti e proprietari.",
    highlight: "H24"
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
            Vantaggi Concreti per<br />Studenti & Investitori
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
            Gestione professionale, risparmio garantito e partnership istituzionali
          </p>
        </div>

        {/* Grid layout - 6 benefits */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card 
                  key={index}
                  className="relative p-10 border border-border/50 bg-card hover:border-primary/30 transition-all duration-700 hover:shadow-[0_8px_24px_hsla(28,24%,14%,0.1)] group hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Subtle highlight badge */}
                  <div className="absolute top-6 right-6 text-xs uppercase tracking-wider text-primary/60 font-medium">
                    {benefit.highlight}
                  </div>

                  {/* Simple icon */}
                  <div className="mb-6">
                    <Icon className="w-10 h-10 text-primary/60 group-hover:text-primary transition-colors duration-700" strokeWidth={1.5} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-display font-semibold mb-4 leading-tight text-foreground">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-light text-sm">
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
