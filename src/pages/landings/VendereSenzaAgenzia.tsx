import { Banknote, Clock, ShieldCheck } from "lucide-react";
import { SeoLandingTemplate } from "@/components/landings/SeoLandingTemplate";

export default function VendereSenzaAgenzia() {
  return (
    <SeoLandingTemplate
      canonicalPath="/vendere-casa-senza-agenzia-torino"
      metaTitle="Vendere casa senza agenzia a Torino — 0% commissioni | Jungle Rent"
      metaDescription="Vendi casa a Torino senza agenzia e senza commissioni. Acquirente diretto, valutazione gratuita, rogito in 60-90 giorni. Parla con Lorenzo su WhatsApp."
      eyebrow="Vendere casa a Torino"
      h1="Vendere casa senza agenzia a Torino"
      subhead="Saltare l'agenzia significa zero commissioni, meno visite e tempi più corti. Siamo l'acquirente diretto: ti facciamo un'offerta scritta in pochi giorni."
      trustBadges={[
        "0% commissioni",
        "Acquirente diretto",
        "Rogito in 60-90 giorni",
        "Valutazione gratuita",
      ]}
      pillars={[
        {
          icon: <Banknote className="h-7 w-7" />,
          title: "Risparmi 2-4% di commissioni",
          body: "Su un appartamento da 100.000€ sono 2.000-4.000€ che restano nelle tue tasche, non nelle nostre.",
        },
        {
          icon: <Clock className="h-7 w-7" />,
          title: "Tempi certi: 60-90 giorni",
          body: "Niente open house infiniti. Una o due visite, offerta scritta, rogito programmato.",
        },
        {
          icon: <ShieldCheck className="h-7 w-7" />,
          title: "Startup innovativa iscritta",
          body: "Jungle Rent S.r.l., iscritta alla Camera di Commercio di Torino. Contratti regolari, notaio a tua scelta.",
        },
      ]}
      steps={[
        {
          title: "Mandaci i dati dell'immobile",
          body: "Indirizzo, metratura, piano, stato. Bastano 2 minuti su WhatsApp o sul form.",
        },
        {
          title: "Ricevi una valutazione gratuita",
          body: "Entro 48-72h ti diamo una forchetta di prezzo basata su comparabili reali della zona.",
        },
        {
          title: "Sopralluogo e offerta scritta",
          body: "Una visita di 30 minuti, poi proposta d'acquisto formale. Senza impegno se decidi di no.",
        },
        {
          title: "Rogito dal notaio",
          body: "Scegli tu il notaio. Ci occupiamo noi della documentazione tecnica e urbanistica.",
        },
      ]}
      comparison={{
        leftLabel: "Agenzia tradizionale",
        rightLabel: "Jungle Rent",
        rows: [
          { feature: "Commissioni", left: "2-4% + IVA", right: "0%" },
          { feature: "Tempi medi vendita", left: "6-12 mesi", right: "60-90 giorni" },
          { feature: "Visite e open house", left: "Decine", right: "1-2 sopralluoghi" },
          { feature: "Certezza di chiusura", left: "Bassa", right: "Offerta scritta" },
          { feature: "Trattativa", left: "Lunga", right: "Diretta" },
        ],
      }}
      faqs={[
        {
          q: "Davvero zero commissioni?",
          a: "Sì. Compriamo direttamente noi, non siamo intermediari. L'unico costo a tuo carico è il notaio (a tua scelta) e le imposte di vendita standard.",
        },
        {
          q: "Per quali immobili siete interessati?",
          a: "Bilocali e trilocali a Torino, indicativamente tra 45.000€ e 130.000€. Anche da ristrutturare, anche con inquilino dentro, anche in successione.",
        },
        {
          q: "Quanto ci mettete a fare un'offerta?",
          a: "Valutazione preliminare entro 48-72h dai dati. Offerta scritta dopo il sopralluogo, di solito entro una settimana.",
        },
        {
          q: "Cosa succede se rifiuto la vostra offerta?",
          a: "Nulla. La valutazione e il sopralluogo sono gratuiti e senza impegno. Resti libero di vendere a chiunque altro.",
        },
        {
          q: "Posso vendere casa anche se è affittata?",
          a: "Sì, anzi è spesso un vantaggio per noi: l'immobile produce già reddito dal giorno del rogito.",
        },
      ]}
      waMessage="Ciao Lorenzo, voglio vendere casa a Torino senza agenzia. Puoi farmi una valutazione gratuita?"
      leadVariant="seller"
      primaryCtaLabel="Valutazione gratuita su WhatsApp"
      secondaryCtaLabel="Compila il form"
      crumbs={[
        { name: "Vendi", href: "/vendi" },
        { name: "Senza agenzia" },
      ]}
      relatedLinks={[
        {
          label: "Guida completa a vendere casa a Torino",
          href: "/blog/vendere-casa-torino-guida-completa-2025",
          description: "Tutti i passaggi, i costi e i tempi reali.",
        },
        {
          label: "Valutazione immobiliare gratuita",
          href: "/valutazione-immobile",
          description: "Stima online del tuo appartamento.",
        },
        {
          label: "Vendere a Lingotto e Nizza Millefonti",
          href: "/vendi-casa/lingotto-nizza-millefonti",
          description: "Pagina dedicata alla zona.",
        },
        {
          label: "Vendere a investitori immobiliari",
          href: "/blog/vendere-immobile-investitori-torino",
          description: "Come presentare l'immobile a chi compra per rendimento.",
        },
      ]}
    />
  );
}
