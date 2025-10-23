import { Building2, TrendingUp, Clock, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { SellerContactDialog } from "./SellerContactDialog";
import { HowToSellProcess } from "./HowToSellProcess";
import { SellerComparison } from "./SellerComparison";
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
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Sei proprietario di un immobile a Torino e vuoi venderlo velocemente? Jungle Rent è l'acquirente diretto 
            che stavi cercando. Acquistiamo appartamenti nelle zone universitarie di Torino (Crocetta, San Salvario, 
            Centro, Vanchiglia, Vanchiglietta, Aurora, Lingotto) per trasformarli in soluzioni abitative ottimizzate per studenti e giovani 
            professionisti. <strong>Valutazione gratuita in 3-5 giorni</strong>, processo trasparente e <strong>zero commissioni</strong> 
            per il venditore.
          </p>
          
          <div className="max-w-4xl mx-auto text-left space-y-6 bg-card/50 p-8 rounded-xl border border-border/50">
            <h3 className="text-2xl font-bold text-center mb-4">Perché Acquistiamo Immobili a Torino</h3>
            
            <p className="text-muted-foreground leading-relaxed">
              Jungle Rent nasce dalla visione di ottimizzare il mercato degli affitti studenteschi a Torino, 
              una città universitaria in continua crescita con oltre 90.000 studenti tra Politecnico di Torino, 
              Università degli Studi (UniTo), ESCP Business School e IED. La domanda di alloggi di qualità 
              nelle zone universitarie è altissima, ma l'offerta è spesso frammentata e poco professionale.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              La nostra missione è acquisire appartamenti strategicamente posizionati nelle zone universitarie 
              e trasformarli in housing moderno e ottimizzato: spazi condivisi confortevoli, camere singole 
              ben arredate, servizi inclusi e gestione professionale. Per questo cerchiamo trilocali, quadrilocali 
              e appartamenti più grandi in zone come <strong>Crocetta, San Salvario, Centro, Vanchiglia, Vanchiglietta, 
              Aurora, Lingotto, Santa Rita e San Paolo</strong>, idealmente a 10-20 minuti a piedi o in mezzi pubblici dai principali 
              atenei torinesi.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Lavoriamo con notai e avvocati specializzati per garantire transazioni sicure e veloci. 
              La nostra valutazione si basa su analisi di mercato aggiornate settimanalmente, considerando 
              posizione, metratura, stato dell'immobile e potenziale di ottimizzazione per il mercato degli affitti.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              <strong>Vantaggi per chi vende a Jungle Rent:</strong> nessuna commissione di agenzia (risparmi 
              €6.000-10.000), processo rapido senza decine di visite di estranei in casa, offerta scritta chiara 
              entro 48 ore dal sopralluogo, supporto legale incluso e pagamento garantito. Acquistiamo anche 
              immobili da ristrutturare, valutandoli nello stato attuale senza richiedere lavori preventivi.
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <HowToSellProcess />

        {/* Comparison Section */}
        <SellerComparison />

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
              <strong> Crocetta, San Salvario, Centro, Vanchiglia, Vanchiglietta, Aurora, Lingotto, Santa Rita, San Paolo</strong>. 
              Ideali: trilocali, quadrilocali o appartamenti più grandi vicini a Politecnico di Torino, 
              Università di Torino (UniTo), ESCP Business School, SAA, IED.
            </p>
            <p className="text-muted-foreground mb-8">
              Compiliamo il form per ricevere una valutazione gratuita della tua proprietà. 
              Nessun impegno, risposta garantita entro 3-5 giorni.
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
