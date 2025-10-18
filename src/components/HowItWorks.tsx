import { Search, Users, Home } from "lucide-react";
import { Card } from "@/components/ui/card";

const steps = [
  {
    icon: Search,
    title: "Trova l'Alloggio",
    description: "Scegli tra le nostre case vicino al Politecnico e Università di Torino",
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
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-background to-accent/5">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Come Funziona
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tre semplici passi per iniziare a risparmiare
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card 
                key={index}
                className="relative p-8 border-2 hover:border-primary transition-all duration-300 hover:shadow-xl bg-card/50 backdrop-blur group"
              >
                {/* Step number */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-black shadow-lg">
                  {step.step}
                </div>

                {/* Icon */}
                <div className="mb-6 inline-flex p-4 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-8 h-8 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
