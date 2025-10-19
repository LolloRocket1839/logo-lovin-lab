import { Search, Users, Home } from "lucide-react";
import { Card } from "@/components/ui/card";

const steps = [
  {
    icon: Search,
    title: "Trova l'Alloggio",
    description: "Scegli tra le nostre case strategicamente posizionate vicino a tutti gli atenei torinesi",
    step: "01"
  },
  {
    icon: Users,
    title: "Forma il Team",
    description: "Unisciti ad altri studenti o porta i tuoi amici (2 o 3 persone)",
    step: "02"
  },
  {
    icon: Home,
    title: "Risparmia il 25%",
    description: "Goditi il tuo nuovo spazio risparmiando centinaia di euro ogni anno",
    step: "03"
  }
];

export const HowItWorks = () => {
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
            Tre semplici passi per iniziare a risparmiare
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto relative">
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
                <h3 className="text-2xl font-display font-semibold mb-4 leading-tight text-foreground relative z-10">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-light relative z-10">
                  {step.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
      
      {/* Bottom border line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-border" />
    </section>
  );
};
