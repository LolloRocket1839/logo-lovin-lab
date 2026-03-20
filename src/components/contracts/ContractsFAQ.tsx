import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    q: {
      it: "Quanto tempo ci vuole per ricevere il contratto?",
      en: "How long does it take to receive the contract?",
    },
    a: {
      it: "Il contratto viene consegnato entro 48 ore lavorative dalla ricezione di tutte le informazioni necessarie. Per il Pacchetto Locatore, che include verbale e inventario, i tempi possono estendersi a 72 ore.",
      en: "The contract is delivered within 48 business hours of receiving all necessary information. For the Landlord Package, which includes handover report and inventory, delivery may take up to 72 hours.",
    },
  },
  {
    q: {
      it: "Quante revisioni sono incluse nel prezzo?",
      en: "How many revisions are included in the price?",
    },
    a: {
      it: "I piani Standard e Transitorio includono una revisione gratuita entro 48 ore dalla consegna. Il Pacchetto Locatore include revisioni illimitate entro 7 giorni dalla consegna.",
      en: "The Standard and Temporary plans include one free revision within 48 hours of delivery. The Landlord Package includes unlimited revisions within 7 days of delivery.",
    },
  },
  {
    q: {
      it: "Il contratto è pronto per la registrazione all'Agenzia delle Entrate?",
      en: "Is the contract ready for registration with the Revenue Agency?",
    },
    a: {
      it: "Sì, tutti i nostri contratti sono redatti in conformità alla normativa vigente e pronti per la registrazione presso l'Agenzia delle Entrate. Includiamo tutte le clausole obbligatorie, compresi i riferimenti APE e le attestazioni necessarie.",
      en: "Yes, all our contracts are drafted in compliance with current regulations and ready for registration with the Revenue Agency. We include all mandatory clauses, including energy performance references and required certifications.",
    },
  },
  {
    q: {
      it: "Posso includere la cedolare secca nel contratto?",
      en: "Can I include the flat tax option in the contract?",
    },
    a: {
      it: "Assolutamente sì. Tutti i nostri piani includono la possibilità di inserire le clausole per la cedolare secca, sia per contratti a canone libero che concordato. Nel piano Transitorio è inclusa di default.",
      en: "Absolutely. All our plans include the option to add flat tax clauses, for both free-market and agreed-rent contracts. It's included by default in the Temporary plan.",
    },
  },
  {
    q: {
      it: "Quando devo pagare?",
      en: "When do I pay?",
    },
    a: {
      it: "Il pagamento avviene solo dopo la consegna del contratto. Riceverai il documento per la revisione e, una volta approvato, procediamo con la fatturazione. Nessun anticipo richiesto.",
      en: "Payment is due only after contract delivery. You'll receive the document for review and, once approved, we proceed with invoicing. No advance payment required.",
    },
  },
  {
    q: {
      it: "Che differenza c'è tra contratto 4+4 e 3+2?",
      en: "What's the difference between a 4+4 and 3+2 contract?",
    },
    a: {
      it: "Il contratto 4+4 è a canone libero con durata di 4 anni rinnovabili per altri 4. Il contratto 3+2 è a canone concordato (con agevolazioni fiscali) con durata di 3 anni rinnovabili per 2. Ti consigliamo il formato più adatto in base alla tua situazione.",
      en: "The 4+4 contract is a free-market lease lasting 4 years, renewable for another 4. The 3+2 contract uses agreed rent rates (with tax benefits) for 3 years, renewable for 2. We'll recommend the best format based on your situation.",
    },
  },
];

interface ContractsFAQProps {
  lang: "it" | "en";
}

export const ContractsFAQ = ({ lang }: ContractsFAQProps) => {
  return (
    <section className="mb-16" aria-labelledby="faq-heading">
      <h2
        id="faq-heading"
        className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8"
      >
        {lang === "it" ? "Domande frequenti" : "Frequently asked questions"}
      </h2>
      <Accordion type="single" collapsible className="max-w-3xl mx-auto">
        {FAQ_ITEMS.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger className="text-left text-sm md:text-base">
              {faq.q[lang]}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
              {faq.a[lang]}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export const CONTRACT_FAQ_ITEMS = FAQ_ITEMS;
