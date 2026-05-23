import { Zap, FileCheck, HandCoins } from "lucide-react";
import { SeoLandingTemplate } from "@/components/landings/SeoLandingTemplate";

export default function VendereVelocemente() {
  return (
    <SeoLandingTemplate
      canonicalPath="/vendere-casa-velocemente-torino"
      metaTitle="Vendere casa velocemente a Torino — rogito in 60-90 giorni | Jungle Rent"
      metaDescription="Devi vendere casa a Torino in fretta? Acquirente diretto, offerta scritta in una settimana, rogito in 60-90 giorni. Eredità, trasferimento, liquidità."
      eyebrow="Vendita rapida"
      h1="Vendere casa velocemente a Torino"
      subhead="Quando il tempo conta più del prezzo massimo: ti facciamo un'offerta scritta in una settimana e chiudiamo dal notaio in 60-90 giorni."
      trustBadges={[
        "Offerta in 7 giorni",
        "Rogito in 60-90 giorni",
        "0% commissioni",
        "Anche con inquilino",
      ]}
      pillars={[
        {
          icon: <Zap className="h-7 w-7" />,
          title: "Decisione rapida",
          body: "Niente catene di trattative. Diamo una risposta sì/no entro pochi giorni dal sopralluogo.",
        },
        {
          icon: <FileCheck className="h-7 w-7" />,
          title: "Pratica gestita da noi",
          body: "Visure, conformità urbanistica, APE, planimetrie: ce ne occupiamo noi per non rallentare il rogito.",
        },
        {
          icon: <HandCoins className="h-7 w-7" />,
          title: "Liquidità in tempi certi",
          body: "Sai esattamente quando arriva il bonifico. Utile per eredità, trasferimenti, divorzi, debiti.",
        },
      ]}
      steps={[
        {
          title: "Contatto e dati immobile",
          body: "WhatsApp a Lorenzo con indirizzo e foto. Tempi reali, niente moduli infiniti.",
        },
        {
          title: "Sopralluogo entro 7 giorni",
          body: "Veniamo a vedere l'immobile, di solito nella stessa settimana del primo contatto.",
        },
        {
          title: "Offerta scritta",
          body: "Proposta formale con prezzo, tempi di rogito e condizioni. La valuti con calma.",
        },
        {
          title: "Rogito programmato",
          body: "Fissiamo data dal notaio. Tipicamente 45-90 giorni dall'accettazione.",
        },
      ]}
      faqs={[
        {
          q: "In quanto tempo posso davvero chiudere?",
          a: "Il rogito tipico va da 45 a 90 giorni dall'accettazione dell'offerta, dipende soprattutto dalla disponibilità del notaio e dalla pulizia dei documenti.",
        },
        {
          q: "Se l'immobile è in successione, si può fare?",
          a: "Sì, basta che la successione sia stata accettata e trascritta. Possiamo aspettare la trascrizione se è in corso.",
        },
        {
          q: "Pagate cash o serve un mutuo?",
          a: "Acquistiamo con risorse della società, senza vincoli di erogazione mutuo. Questo riduce drasticamente il rischio che la vendita salti all'ultimo.",
        },
        {
          q: "Sconto sul prezzo per la velocità?",
          a: "L'offerta riflette il valore di mercato meno i costi che ci accolliamo (ristrutturazione, gestione, rischio). È trasparente e ti spieghiamo i numeri.",
        },
        {
          q: "Quali zone di Torino comprate?",
          a: "Tutta Torino città, con focus su zone universitarie e ospedali: Lingotto, Nizza Millefonti, San Salvario, Aurora, Cenisia, Crocetta, Mirafiori, Barriera di Milano.",
        },
      ]}
      waMessage="Ciao Lorenzo, devo vendere casa a Torino in tempi rapidi. Quanto ci mettete a farmi un'offerta?"
      leadVariant="seller"
      primaryCtaLabel="Scrivi a Lorenzo ora"
      secondaryCtaLabel="Richiedi offerta scritta"
      crumbs={[
        { name: "Vendi", href: "/vendi" },
        { name: "Vendita rapida" },
      ]}
      relatedLinks={[
        {
          label: "Vendere senza agenzia a Torino",
          href: "/vendere-casa-senza-agenzia-torino",
          description: "Zero commissioni, processo diretto.",
        },
        {
          label: "Valutazione immobiliare Torino",
          href: "/blog/valutazione-immobiliare-torino-guida-completa",
          description: "Come si stima un appartamento in città.",
        },
        {
          label: "Vendere a Lingotto e Nizza Millefonti",
          href: "/vendi-casa/lingotto-nizza-millefonti",
          description: "Landing dedicata alla zona prioritaria.",
        },
        {
          label: "Stima online gratuita",
          href: "/valutazione-immobile",
          description: "Forchetta di prezzo in 2 minuti.",
        },
      ]}
    />
  );
}
