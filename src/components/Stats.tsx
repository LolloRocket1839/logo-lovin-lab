import { Users, Home, TrendingUp, Award } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "200+",
    label: "Studenti Serviti"
  },
  {
    icon: Home,
    value: "50+",
    label: "Proprietà Gestite"
  },
  {
    icon: TrendingUp,
    value: "25%",
    label: "Risparmio Medio"
  },
  {
    icon: Award,
    value: "98%",
    label: "Soddisfazione"
  }
];

export const Stats = () => {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-border" />
      
      <div className="container px-8 relative z-10">
        <div className="text-center mb-20">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6 font-medium">
            I Nostri Numeri
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight text-foreground tracking-tight">
            Risultati Concreti
          </h2>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index}
                className="text-center group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-500">
                    <Icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="text-6xl md:text-7xl font-display font-bold text-primary mb-3 leading-none">
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground font-light tracking-wide">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Trust badge */}
        <div className="text-center mt-16 pt-16 border-t border-border">
          <div className="inline-flex items-center gap-3 border border-primary/20 bg-primary/5 rounded-full px-8 py-3 text-sm font-medium tracking-wide">
            <span className="text-primary">✦</span>
            <span className="text-foreground">Supportati da 2i3T - Incubatore Università di Torino</span>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-border" />
    </section>
  );
};
