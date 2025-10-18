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
    <section className="py-24 bg-primary/5">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Perché Scegliere Jungle Rent
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Più di un semplice affitto, un nuovo modo di vivere da studente
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card 
                key={index}
                className="p-6 border-2 hover:border-primary transition-all duration-300 hover:shadow-xl bg-card group hover:-translate-y-1"
              >
                {/* Highlight badge */}
                <div className="absolute -top-3 right-4 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold shadow-md">
                  {benefit.highlight}
                </div>

                {/* Icon */}
                <div className="mb-4 inline-flex p-3 bg-primary/10 rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
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
