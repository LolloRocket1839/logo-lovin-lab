import { Building2, TrendingUp, Clock, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { SellerContactDialog } from "./SellerContactDialog";
import { useState } from "react";

export const SellerSection = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const benefits = [
    {
      icon: TrendingUp,
      title: "Valutazione Immediata",
      description: "Ricevi una valutazione professionale della tua proprietà in 24-48 ore",
    },
    {
      icon: Clock,
      title: "Vendita Rapida",
      description: "Processo di vendita semplificato e veloce, senza intermediari inutili",
    },
    {
      icon: Shield,
      title: "Transazione Sicura",
      description: "Contratti trasparenti e supporto legale durante tutto il processo",
    },
    {
      icon: Building2,
      title: "Massimo Valore",
      description: "Ottieni il miglior prezzo di mercato per la tua proprietà a Torino",
    },
  ];

  return (
    <section id="vendi-casa" className="py-24 bg-gradient-to-b from-background via-accent/5 to-background">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
            Vendi la Tua Casa a Torino
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Sei proprietario di un immobile a Torino e vuoi venderlo? Jungle Rent acquista appartamenti nelle zone universitarie 
            di Torino per trasformarli in soluzioni abitative ottimizzate per studenti. Valutazione gratuita in 48 ore, 
            processo trasparente e pagamento rapido.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              <benefit.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-card p-8 md:p-12 rounded-2xl border border-border/50 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Zone di Interesse a Torino
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              Cerchiamo appartamenti in vendita nelle seguenti zone universitarie di Torino: 
              <strong> Crocetta, San Salvario, Centro, Vanchiglia, Lingotto, Santa Rita, San Paolo</strong>. 
              Ideali: trilocali, quadrilocali o appartamenti più grandi vicini a Politecnico di Torino, 
              Università di Torino (UniTo), ESCP Business School, SAA, IED.
            </p>
            <p className="text-muted-foreground mb-8">
              Compiliamo il form per ricevere una valutazione gratuita della tua proprietà. 
              Nessun impegno, risposta garantita entro 48 ore.
            </p>
          </div>

          <div className="flex justify-center">
            <Button 
              size="lg" 
              onClick={() => setIsDialogOpen(true)}
              className="text-lg px-8 py-6 shadow-elegant hover:shadow-glow transition-all duration-300"
            >
              Richiedi Valutazione Gratuita
            </Button>
          </div>
        </div>
      </div>

      <SellerContactDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </section>
  );
};
