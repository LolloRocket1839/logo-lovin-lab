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
        {/* Section removed */}
      </div>
    </section>
  );
};