import { Check, X } from "lucide-react";

export const SellerComparison = () => {
  const comparisons = [
    {
      aspect: "Valutazione",
      jungleRent: "48 ore",
      traditional: "1-2 settimane",
      jungleRentBetter: true
    },
    {
      aspect: "Commissioni Agenzia",
      jungleRent: "0€",
      traditional: "3-5% (€6.000-10.000)",
      jungleRentBetter: true
    },
    {
      aspect: "Tempo di vendita",
      jungleRent: "30-60 giorni",
      traditional: "6-12 mesi",
      jungleRentBetter: true
    },
    {
      aspect: "Sopralluoghi",
      jungleRent: "1 sopralluogo",
      traditional: "Decine di visite",
      jungleRentBetter: true
    },
    {
      aspect: "Pagamento",
      jungleRent: "Rapido e garantito",
      traditional: "Dipende dall'acquirente",
      jungleRentBetter: true
    },
    {
      aspect: "Gestione Burocrazia",
      jungleRent: "Gestita da noi",
      traditional: "A carico del venditore",
      jungleRentBetter: true
    }
  ];

  return (
    <section className="py-16">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Perché Vendere a Jungle Rent
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Confronta il nostro servizio con la vendita tradizionale. Più veloce, più semplice, zero commissioni.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border/50 rounded-xl overflow-hidden shadow-lg">
            {/* Header */}
            <div className="grid grid-cols-3 bg-muted/30">
              <div className="p-4 border-r border-border/50">
                <p className="font-semibold text-sm text-muted-foreground">Aspetto</p>
              </div>
              <div className="p-4 border-r border-border/50 bg-primary/5">
                <p className="font-bold text-primary">Jungle Rent</p>
              </div>
              <div className="p-4">
                <p className="font-semibold text-muted-foreground">Vendita Tradizionale</p>
              </div>
            </div>

            {/* Rows */}
            {comparisons.map((row, index) => (
              <div
                key={index}
                className={`grid grid-cols-3 ${
                  index !== comparisons.length - 1 ? 'border-b border-border/30' : ''
                }`}
              >
                <div className="p-4 border-r border-border/50 flex items-center">
                  <p className="font-medium">{row.aspect}</p>
                </div>
                <div className="p-4 border-r border-border/50 bg-primary/5 flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <p className="font-semibold text-primary">{row.jungleRent}</p>
                </div>
                <div className="p-4 flex items-center gap-2">
                  <X className="w-5 h-5 text-muted-foreground/50 flex-shrink-0" />
                  <p className="text-muted-foreground">{row.traditional}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-8 text-center">
            <p className="text-lg font-semibold text-primary mb-2">
              Risparmia tempo e denaro vendendo direttamente a Jungle Rent
            </p>
            <p className="text-muted-foreground">
              Zero commissioni • Processo veloce • Supporto completo
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};