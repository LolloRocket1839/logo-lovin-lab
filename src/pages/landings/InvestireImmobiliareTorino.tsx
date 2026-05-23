import { Building2, Users, LineChart } from "lucide-react";
import { SeoLandingTemplate } from "@/components/landings/SeoLandingTemplate";

export default function InvestireImmobiliareTorino() {
  return (
    <SeoLandingTemplate
      canonicalPath="/investire-immobiliare-torino"
      metaTitle="Investire nell'immobiliare a Torino — operazioni a sviluppo | Jungle Rent"
      metaDescription="Investire nell'immobiliare a Torino con Jungle Rent: operazioni dedicate su bilocali in zona universitaria e ospedali, modello dual-season studenti + turisti."
      eyebrow="Investitori"
      h1="Investire nell'immobiliare a Torino"
      subhead="Esponi i tuoi capitali a singole operazioni immobiliari curate da Jungle Rent S.r.l.: acquisto, riqualificazione e gestione dual-season studenti + turisti."
      trustBadges={[
        "Startup innovativa",
        "Operazioni a Torino",
        "Modello dual-season",
        "Payout bimestrali",
      ]}
      pillars={[
        {
          icon: <Building2 className="h-7 w-7" />,
          title: "Operazioni reali, non astratte",
          body: "Ogni iniziativa è legata a un immobile fisico a Torino, scelto con criteri quantitativi su prezzo, zona e domanda affitto.",
        },
        {
          icon: <Users className="h-7 w-7" />,
          title: "Modello dual-season",
          body: "Studenti universitari da settembre a giugno, turisti d'estate. Due flussi di domanda coprono l'anno intero.",
        },
        {
          icon: <LineChart className="h-7 w-7" />,
          title: "Gestione interna",
          body: "Acquisto, ristrutturazione, contratti, fisco, inquilini: tutto gestito dal team. Tu segui l'andamento, noi operiamo.",
        },
      ]}
      steps={[
        {
          title: "Manifestazione di interesse",
          body: "Lasci email e numero. Ti contattiamo per capire profilo e budget.",
        },
        {
          title: "Call con Lorenzo",
          body: "30 minuti per spiegarti come lavoriamo, le zone su cui investiamo e cosa significa entrare in una serie dedicata.",
        },
        {
          title: "Memorandum informativo",
          body: "Ricevi documentazione completa con numeri, struttura giuridica, rischi e tempistiche. È lì che troverai cifre puntuali.",
        },
        {
          title: "Sottoscrizione e payout",
          body: "Se la valutazione torna, formalizziamo. Da lì payout bimestrali e reportistica periodica sull'operazione.",
        },
      ]}
      faqs={[
        {
          q: "Qual è l'investimento minimo?",
          a: "Lo definiamo caso per caso in base alla singola operazione. Ne parliamo in call: il taglio resta accessibile rispetto al comprare un intero immobile da soli.",
        },
        {
          q: "Che rendimento posso aspettarmi?",
          a: "Le cifre puntuali sono nel memorandum informativo che condividiamo dopo la qualifica del profilo. Non comunichiamo proiezioni di rendimento su canali pubblici per ragioni di compliance.",
        },
        {
          q: "Come sono strutturate le operazioni?",
          a: "Investi in Jungle Rent S.r.l. con esposizione economica alla singola operazione immobiliare (serie dedicata). La struttura giuridica precisa è descritta nel memorandum.",
        },
        {
          q: "Chi gestisce gli immobili?",
          a: "Il team di Jungle Rent gestisce direttamente acquisto, ristrutturazione, locazione studenti, locazioni brevi estive, fiscalità e rapporti con inquilini.",
        },
        {
          q: "Come e quando ricevo i payout?",
          a: "I payout sono bimestrali (ogni 2 mesi), accompagnati da reportistica sull'andamento dell'operazione.",
        },
        {
          q: "Posso visitare gli immobili?",
          a: "Sì. Organizziamo visite agli immobili in portafoglio per gli investitori qualificati.",
        },
      ]}
      waMessage="Ciao Lorenzo, vorrei capire come investire nell'immobiliare a Torino con Jungle Rent."
      leadVariant="investor"
      primaryCtaLabel="Parla con Lorenzo"
      secondaryCtaLabel="Lascia i tuoi contatti"
      crumbs={[
        { name: "Investitori", href: "/investitori" },
        { name: "Investire a Torino" },
      ]}
      relatedLinks={[
        {
          label: "Sezione investitori completa",
          href: "/investitori",
          description: "Modello, team, FAQ e processo.",
        },
        {
          label: "Investire in real assets a Torino",
          href: "/blog/investire-real-assets-torino-2025",
          description: "Perché Torino oggi, dati e tesi di lungo periodo.",
        },
        {
          label: "Comprare casa già affittata",
          href: "/comprare-casa-affittata-torino",
          description: "Alternativa diretta se preferisci possedere l'immobile.",
        },
        {
          label: "Zone investitori a Torino",
          href: "/investitori/zone",
          description: "Le aree che monitoriamo per acquisto.",
        },
      ]}
    />
  );
}
