import { TrendingUp, FileText, KeySquare } from "lucide-react";
import { SeoLandingTemplate } from "@/components/landings/SeoLandingTemplate";

export default function ComprareCasaAffittata() {
  return (
    <SeoLandingTemplate
      canonicalPath="/comprare-casa-affittata-torino"
      metaTitle="Comprare casa già affittata a Torino — income property | Jungle Rent"
      metaDescription="Comprare casa già affittata a Torino: rendita dal giorno del rogito, contratti regolari, gestione completa. Guida pratica e opportunità su misura."
      eyebrow="Comprare per affittare"
      h1="Comprare casa già affittata a Torino"
      subhead="Un immobile a reddito è un appartamento con inquilino in regola che produce affitto dal giorno uno. Niente vuoti, niente ricerca tenant: solo cash flow."
      trustBadges={[
        "Contratti regolari",
        "Cash flow dal rogito",
        "Gestione professionale",
        "Focus Torino città",
      ]}
      pillars={[
        {
          icon: <TrendingUp className="h-7 w-7" />,
          title: "Rendita immediata",
          body: "L'inquilino è già dentro, il canone arriva sul tuo conto dal mese successivo al rogito.",
        },
        {
          icon: <FileText className="h-7 w-7" />,
          title: "Due diligence completa",
          body: "Contratto registrato, ricevute, deposito, conformità impianti: ti consegniamo il dossier completo.",
        },
        {
          icon: <KeySquare className="h-7 w-7" />,
          title: "Gestione opzionale",
          body: "Se vuoi, gestiamo noi l'inquilino: incassi, manutenzione, fiscalità. Tu vedi solo il bonifico.",
        },
      ]}
      steps={[
        {
          title: "Capiamo il tuo profilo",
          body: "Budget, orizzonte, propensione al rischio. 15 minuti su WhatsApp con Lorenzo.",
        },
        {
          title: "Selezione immobili a reddito",
          body: "Ti proponiamo solo immobili che superano i nostri filtri: zona, contratto, stato.",
        },
        {
          title: "Numeri trasparenti",
          body: "Canone attuale, spese condominiali, IMU, tassazione cedolare: tutto sul tavolo.",
        },
        {
          title: "Rogito e subentro nel contratto",
          body: "Subentri nel contratto esistente. Nessuna interruzione per l'inquilino, nessun vuoto per te.",
        },
      ]}
      comparison={{
        leftLabel: "Casa vuota",
        rightLabel: "Casa già affittata",
        rows: [
          { feature: "Tempo per primo incasso", left: "2-6 mesi", right: "Dal mese del rogito" },
          { feature: "Ricerca inquilino", left: "A tuo carico", right: "Non serve" },
          { feature: "Costi di startup", left: "Arredo, annunci, agenzia", right: "Zero" },
          { feature: "Rendimento certo", left: "Stimato", right: "Reale, documentato" },
        ],
      }}
      faqs={[
        {
          q: "L'inquilino può opporsi alla vendita?",
          a: "No. L'inquilino mantiene il contratto in essere alle stesse condizioni; cambia solo il proprietario sul bonifico. Il diritto di prelazione si applica solo ai contratti 4+4 (art. 38 L. 392/1978).",
        },
        {
          q: "Che rendimento posso aspettarmi a Torino?",
          a: "Dipende da zona, contratto e prezzo d'acquisto. Ti mostriamo i numeri caso per caso con dati reali, non promesse generiche.",
        },
        {
          q: "Posso usare un mutuo?",
          a: "Sì. Anzi, una casa già affittata aiuta la pratica perché la banca considera il canone come reddito aggiuntivo. Vedi anche la nostra guida mutui per investitori.",
        },
        {
          q: "Cosa succede se l'inquilino smette di pagare?",
          a: "Il contratto prevede deposito cauzionale e clausole standard. Possiamo affiancarti nella gestione della morosità o assicurarti il canone con polizze dedicate.",
        },
        {
          q: "Che tassazione si applica?",
          a: "La più comune è la cedolare secca al 21% (10% in canone concordato). Vedi le nostre guide su IRPEF vs cedolare e canone concordato a Torino.",
        },
      ]}
      waMessage="Ciao Lorenzo, vorrei comprare un immobile a reddito (già affittato) a Torino. Cosa avete disponibile?"
      leadVariant="investor"
      primaryCtaLabel="Parla con Lorenzo"
      secondaryCtaLabel="Lasciaci i tuoi contatti"
      crumbs={[
        { name: "Investitori", href: "/investitori" },
        { name: "Casa affittata" },
      ]}
      relatedLinks={[
        {
          label: "Cedolare secca 2026 per investitori",
          href: "/blog/cedolare-secca-2026-investitori",
          description: "Aliquote, requisiti, convenienza.",
        },
        {
          label: "Mutui per investitori immobiliari",
          href: "/blog/mutui-investitori-immobiliari-guida-completa",
          description: "Cosa chiede la banca su un immobile a reddito.",
        },
        {
          label: "Canone concordato Torino",
          href: "/blog/canone-concordato-torino-2026-guida-completa",
          description: "Cedolare al 10% e calcolo del canone.",
        },
        {
          label: "Zone investitori a Torino",
          href: "/investitori/zone",
          description: "Mappa delle aree con migliore rapporto prezzo/affitto.",
        },
      ]}
    />
  );
}
