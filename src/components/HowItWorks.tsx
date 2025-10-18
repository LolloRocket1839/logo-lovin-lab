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
    <section id="how-it-works" className="py-28 bg-gradient-to-b from-background via-accent/5 to-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(150_55%_23%/0.03),transparent_70%)]" />
      
      <div className="container px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold text-sm tracking-wide">
            PROCESSO SEMPLICE
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Come Funziona
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Tre semplici passi per iniziare a risparmiare
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card 
                key={index}
                className="relative p-10 border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] bg-gradient-to-br from-card to-card/50 backdrop-blur group hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Step number */}
                <div className="absolute -top-5 -right-5 w-20 h-20 bg-gradient-to-br from-primary to-secondary text-primary-foreground rounded-2xl flex items-center justify-center text-3xl font-black shadow-xl group-hover:scale-110 transition-transform duration-300 rotate-3 group-hover:rotate-6">
                  {step.step}
                </div>

                {/* Icon */}
                <div className="mb-8 inline-flex p-5 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
                  <Icon className="w-10 h-10 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
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
