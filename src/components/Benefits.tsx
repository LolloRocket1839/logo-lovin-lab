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
    <section className="py-28 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="container px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold text-sm tracking-wide">
            I NOSTRI VANTAGGI
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Perché Scegliere Jungle Rent
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Più di un semplice affitto, un nuovo modo di vivere da studente
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card 
                key={index}
                className="relative p-8 border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] bg-gradient-to-br from-card to-card/50 group hover:-translate-y-2 overflow-hidden"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Highlight badge */}
                <div className="absolute -top-3 right-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground px-5 py-2 rounded-full text-sm font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {benefit.highlight}
                </div>

                {/* Icon */}
                <div className="relative mb-6 inline-flex p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
                  <Icon className="w-7 h-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="relative text-xl font-bold mb-3 leading-tight">{benefit.title}</h3>
                <p className="relative text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
