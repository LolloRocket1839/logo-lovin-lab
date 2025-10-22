import { Building2, TrendingUp, Clock, Star } from "lucide-react";

export const SellerStats = () => {
  const stats = [
    {
      icon: Building2,
      number: "48",
      label: "Immobili Acquistati",
      sublabel: "nel 2024",
      color: "text-primary"
    },
    {
      icon: TrendingUp,
      number: "€8,7M",
      label: "Valore Transato",
      sublabel: "investito a Torino",
      color: "text-accent"
    },
    {
      icon: Clock,
      number: "42",
      label: "Giorni Medi",
      sublabel: "dalla valutazione al rogito",
      color: "text-primary"
    },
    {
      icon: Star,
      number: "4.9",
      label: "Soddisfazione",
      sublabel: "media venditori",
      color: "text-accent"
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="container px-4 mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-card border border-border/50 rounded-xl p-6 text-center hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <stat.icon className={`w-7 h-7 ${stat.color}`} />
                </div>
              </div>
              <div className={`text-4xl md:text-5xl font-bold mb-2 ${stat.color}`}>
                {stat.number}
              </div>
              <div className="text-lg font-semibold mb-1">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.sublabel}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Dati aggiornati a Gennaio 2025 • Transazioni verificate • Tempi medi reali
          </p>
        </div>
      </div>
    </section>
  );
};