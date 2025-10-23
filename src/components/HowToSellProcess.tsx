import { Clock, FileSearch, FileText, FileCheck } from "lucide-react";

export const HowToSellProcess = () => {
  const steps = [
    {
      icon: FileSearch,
      number: "01",
      title: "Richiedi Valutazione",
      description: "Compila il form con i dati della tua proprietà. Ti ricontatteremo entro 3-5 giorni per confermare i dettagli e fissare un eventuale sopralluogo.",
      bullets: [
        "Valutazione gratuita e senza impegno",
        "Risposta garantita in 3-5 giorni",
        "Zero commissioni per il venditore"
      ]
    },
    {
      icon: Clock,
      number: "02",
      title: "Sopralluogo Gratuito",
      description: "Il nostro team visita l'immobile entro 10-14 giorni per valutare le condizioni reali, la posizione e il potenziale di ottimizzazione per il mercato studentesco.",
      bullets: [
        "Sopralluogo entro 10-14 giorni dalla richiesta",
        "Valutazione professionale sul posto",
        "Analisi del potenziale immobiliare"
      ]
    },
    {
      icon: FileText,
      number: "03",
      title: "Offerta Scritta",
      description: "Entro 5-7 giorni dal sopralluogo riceverai un'offerta scritta chiara e trasparente, basata sui prezzi di mercato aggiornati della zona universitaria.",
      bullets: [
        "Offerta scritta entro 5-7 giorni",
        "Prezzo di mercato competitivo",
        "Nessuna sorpresa o costi nascosti"
      ]
    },
    {
      icon: FileCheck,
      number: "04",
      title: "Rogito e Pagamento",
      description: "Una volta accettata l'offerta, procediamo con il rogito notarile entro 60-90 giorni. Gestiamo tutta la burocrazia e il pagamento è rapido e sicuro.",
      bullets: [
        "Rogito entro 60-90 giorni",
        "Supporto legale incluso",
        "Pagamento veloce e garantito"
      ]
    }
  ];

  return (
    <section className="py-16 bg-card/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Come Funziona la Vendita
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Processo semplice, veloce e trasparente in 4 step. Dal primo contatto al rogito in 60-90 giorni.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent -translate-x-1/2 z-0" />
              )}
              
              <div className="relative bg-card border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-primary/20">
                    {step.number}
                  </div>
                </div>

                <h4 className="text-xl font-semibold mb-3">{step.title}</h4>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {step.description}
                </p>

                <ul className="space-y-2">
                  {step.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-1">✓</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};