import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import {
  Building2, Clock, Check, X, FileText, Handshake,
  CalendarCheck, MessageCircle, Facebook, Users, Hammer, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SellerStickyCta } from "@/components/sellers/SellerStickyCta";
import { VendiLeadForm } from "@/components/vendi/VendiLeadForm";
import { CONTACTS, openWhatsApp } from "@/constants/contacts";
import { FACEBOOK_SELLER_GROUP_URL } from "@/constants/social";
import { useAnalytics } from "@/hooks/useAnalytics";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const PAGE_TITLE = "Vendi il tuo appartamento a Torino direttamente a Jungle Rent";
const PAGE_DESCRIPTION =
  "Vendi il tuo appartamento a Torino ereditato, con inquilino o da ristrutturare: Jungle Rent S.r.l. compra direttamente, valutazione gratuita entro 48 ore, nessuna commissione.";
const PAGE_URL = "https://junglerent.it/vendi";

const scenarios = [
  {
    icon: FileText,
    title: "L'hai ereditato",
    body:
      "Successione chiusa o in corso, magari con più eredi che devono mettersi d'accordo. L'appartamento resta vuoto e continua a costare tra IMU, spese condominiali e utenze. Noi trattiamo con tutti gli eredi insieme e aspettiamo i tempi del notaio.",
  },
  {
    icon: Users,
    title: "C'è un inquilino dentro",
    body:
      "Un contratto in corso spaventa la maggior parte degli acquirenti privati. Per noi non è un problema: compriamo anche con l'inquilino dentro e ci occupiamo noi del rapporto dopo il rogito.",
  },
  {
    icon: Hammer,
    title: "È da ristrutturare",
    body:
      "Bagno degli anni Settanta, impianti da rifare, infissi vecchi. Non serve che tu spenda un euro in lavori o in home staging: lo compriamo com'è, ristrutturiamo noi dopo l'acquisto.",
  },
];

const steps = [
  { icon: MessageCircle, n: "01", title: "Ci scrivi", time: "5 minuti", body: "Compili il modulo qui sotto o ci scrivi su WhatsApp. Bastano indirizzo, metri quadri e qualche foto." },
  { icon: FileText, n: "02", title: "Ti diamo un range di prezzo", time: "entro 48 ore", body: "Guardiamo i dati della zona e le foto e ti diciamo una forbice indicativa. Senza impegno e senza costi." },
  { icon: Building2, n: "03", title: "Veniamo a vedere", time: "1 visita", body: "Una sola visita, noi e un tecnico. Niente sfilata di curiosi nel weekend." },
  { icon: Handshake, n: "04", title: "Proposta scritta e rogito", time: "60-90 giorni", body: "Se il prezzo va bene a entrambi, firmiamo la proposta e andiamo dal notaio. I tempi dipendono anche dalla delibera della banca." },
];

const weAreNot = [
  { no: "Non siamo un'agenzia immobiliare", yes: "Compriamo per noi, non cerchiamo un acquirente per te. Non c'è provvigione perché non c'è intermediazione." },
  { no: "Non facciamo aste né incanto", yes: "Facciamo una proposta e la scriviamo. Se non ti va bene, finisce lì senza penali." },
  { no: "Non promettiamo il prezzo più alto del mercato", yes: "Se il tuo obiettivo è spuntare il massimo e hai tempo davanti, un'agenzia tradizionale è probabilmente la scelta giusta." },
  { no: "Non siamo un iBuyer che paga in contanti in 48 ore", yes: "Compriamo con capitale proprio e/o mutuo bancario. La proposta è vincolata alla delibera della banca e questo lo scriviamo nero su bianco nella proposta stessa, con i tempi. Preferiamo dirtelo prima che scoprirlo al compromesso." },
];

const faqs = [
  {
    q: "Quanto mi offrite rispetto al valore di mercato?",
    a: "In genere una cifra sotto il prezzo che potresti spuntare con una vendita tradizionale lunga: è il prezzo della certezza, della velocità e del fatto che i lavori e i rischi passano a noi. Il range preciso te lo diamo dopo aver visto l'immobile.",
  },
  {
    q: "Devo pagare qualcosa?",
    a: "No. La valutazione è gratuita e non ci sono commissioni di agenzia. Restano a tuo carico solo le spese che la legge mette in capo al venditore, come eventuali certificazioni mancanti.",
  },
  {
    q: "Quanto tempo serve per arrivare al rogito?",
    a: "Di norma 60-90 giorni dalla proposta firmata. Se serve un mutuo bancario per l'acquisto, i tempi dipendono anche dalla delibera dell'istituto.",
  },
  {
    q: "Comprate anche con l'inquilino dentro?",
    a: "Sì. Ci servono il contratto e la data di scadenza. Dopo il rogito il rapporto con l'inquilino passa a noi.",
  },
  {
    q: "E se l'immobile è ancora in successione?",
    a: "Possiamo iniziare a parlarne subito. Per firmare serve che la successione sia registrata e che tutti gli eredi siano d'accordo: intanto ti diamo il range di prezzo.",
  },
  {
    q: "In quali zone di Torino comprate?",
    a: "Guardiamo soprattutto le zone vicine alle università e ben collegate: San Salvario, Vanchiglia, Crocetta, Aurora, Santa Rita, San Paolo, Cenisia, Lingotto, Campidoglio. Se sei fuori da questi quartieri scrivici lo stesso.",
  },
  {
    q: "Siamo più eredi e uno non vuole vendere. Si può fare?",
    a: "Per vendere serve l'accordo di tutti i comproprietari. Possiamo però darvi un range di prezzo scritto da mettere sul tavolo: spesso è quello che sblocca la discussione, perché trasforma un'idea vaga in una cifra concreta. Se l'accordo non arriva, l'unica strada resta la divisione giudiziale, che è lunga e costosa: ve lo diciamo chiaramente.",
  },
  {
    q: "Ho ancora un mutuo sull'appartamento.",
    a: "Non è un problema. Al rogito il notaio usa parte del prezzo per estinguere il mutuo residuo e cancellare l'ipoteca; tu incassi la differenza. Ci serve solo il conteggio di estinzione della tua banca.",
  },
  {
    q: "E se rifiuto la proposta?",
    a: "Non succede nulla. La proposta è scritta e ha una scadenza; se non la firmi, decade senza penali, senza vincoli e senza che tu ci debba niente. Manteniamo i tuoi dati solo per il tempo indicato nella privacy policy.",
  },
];

const Sellers = () => {
  const { trackClick } = useAnalytics();

  const scrollToForm = () => {
    trackClick("vendi_cta_form");
    document.getElementById("valutazione")?.scrollIntoView({ behavior: "smooth" });
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Acquisto diretto di appartamenti a Torino",
    description: PAGE_DESCRIPTION,
    provider: {
      "@type": "Organization",
      name: "Jungle Rent S.r.l.",
      url: "https://junglerent.it",
      logo: "https://junglerent.it/jungle-rent-logo.svg",
    },
    areaServed: { "@type": "City", name: "Torino", containedIn: "Piemonte, Italia" },
    serviceType: "Acquisto immobiliare diretto",
  };

  return (
    <>
      <Helmet>
        <html lang="it" />
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <link rel="canonical" href={PAGE_URL} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:locale" content="it_IT" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <main className="min-h-screen bg-background pb-24 md:pb-0">
        <div className="container px-4 md:px-8 mx-auto pt-20 md:pt-28">
          <Breadcrumbs items={[{ label: "Vendi casa a Torino" }]} />
        </div>

        {/* Hero */}
        <section id="seller-hero" className="pt-6 pb-14 md:pt-10 md:pb-20">
          <div className="container px-4 md:px-8 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl"
            >
              <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Torino</p>
              <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-6">
                Vendi il tuo appartamento direttamente a Jungle Rent
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Compriamo appartamenti a Torino per affittarli a studenti: anche ereditati, con
                inquilino dentro o da ristrutturare. Valutazione gratuita entro 48 ore, nessuna
                commissione di agenzia, una sola visita, proposta scritta.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" variant="premium" onClick={scrollToForm} className="text-base">
                  Chiedi una valutazione gratuita
                  <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary/40"
                  onClick={() => {
                    trackClick("vendi_whatsapp_click");
                    openWhatsApp(
                      CONTACTS.lorenzo.phone,
                      "Ciao Lorenzo, ho un appartamento a Torino da vendere e vorrei una valutazione."
                    );
                  }}
                >
                  <MessageCircle className="w-4 h-4 mr-2" aria-hidden="true" />
                  Scrivi su WhatsApp
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Scenari */}
        <section className="py-14 md:py-20 bg-muted/30">
          <div className="container px-4 md:px-8 mx-auto">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-10 max-w-2xl">
              Se il tuo appartamento è in una di queste situazioni, siamo il tipo di acquirente giusto
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {scenarios.map((s) => (
                <div key={s.title} className="rounded-2xl bg-background border border-border p-6">
                  <s.icon className="w-6 h-6 text-primary mb-4" strokeWidth={1.5} aria-hidden="true" />
                  <h3 className="text-lg font-semibold mb-3">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Come funziona */}
        <section className="py-14 md:py-20">
          <div className="container px-4 md:px-8 mx-auto">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-10">Come funziona</h2>
            <ol className="grid md:grid-cols-4 gap-6">
              {steps.map((s) => (
                <li key={s.n} className="rounded-2xl border border-border p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-mono text-muted-foreground">{s.n}</span>
                    <s.icon className="w-5 h-5 text-primary" strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold mb-1">{s.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                    <Clock className="w-3 h-3" aria-hidden="true" />
                    {s.time}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Cosa non siamo */}
        <section className="py-14 md:py-20 bg-muted/30">
          <div className="container px-4 md:px-8 mx-auto max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-8">Cosa non siamo</h2>
            <ul className="space-y-6">
              {weAreNot.map((item) => (
                <li key={item.no} className="rounded-2xl bg-background border border-border p-6">
                  <p className="font-semibold flex items-start gap-2 mb-2">
                    <X className="w-4 h-4 text-muted-foreground mt-1 shrink-0" aria-hidden="true" />
                    {item.no}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                    {item.yes}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Il prezzo */}
        <section className="py-14 md:py-20">
          <div className="container px-4 md:px-8 mx-auto max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">Come ragioniamo sul prezzo</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Partiamo dai prezzi reali di vendita della zona, non dalle richieste degli annunci.
                Da lì togliamo i lavori che servono, il tempo in cui l'appartamento resterà fermo e i
                costi di trasferimento.
              </p>
              <p>
                Quello che resta è la nostra proposta. Sarà quasi sempre inferiore alla cifra che
                potresti ottenere con una vendita tradizionale che dura molti mesi: in cambio hai un
                interlocutore unico, una sola visita, nessuna commissione e nessun lavoro da fare.
              </p>
              <p>
                Per dare un ordine di grandezza: su un immobile da ristrutturare o occupato la nostra
                proposta si colloca in genere tra il 10 e il 15% sotto il prezzo che chiederesti in un
                annuncio. Da quel prezzo però tu risparmi la provvigione (2–3% più IVA), le visite, e
                il rischio che il compratore non ottenga il mutuo. Spesso il netto che ti resta è
                vicino, e chiudi in tre mesi invece che in dodici.
              </p>
              <p>
                Se dopo la valutazione pensi che ti convenga la strada dell'agenzia, te lo diciamo
                anche noi. Non insistiamo.
              </p>
            </div>
          </div>
        </section>

        {/* Form */}
        <section id="valutazione" className="py-14 md:py-20 bg-muted/30 scroll-mt-24">
          <div className="container px-4 md:px-8 mx-auto max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">Chiedi una valutazione gratuita</h2>
            <p className="text-muted-foreground mb-8">
              Ti rispondiamo entro 48 ore con un range di prezzo indicativo. Nessun impegno.
            </p>
            <div className="rounded-2xl bg-background border border-border p-6 md:p-8">
              <VendiLeadForm />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 md:py-20">
          <div className="container px-4 md:px-8 mx-auto max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-8">Domande frequenti</h2>
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, i) => (
                <AccordionItem key={faq.q} value={`vendi-faq-${i}`} className="bg-background border rounded-lg px-4 md:px-6">
                  <AccordionTrigger className="text-left text-sm sm:text-base hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Community */}
        <section className="py-14 md:py-20 bg-muted/30">
          <div className="container px-4 md:px-8 mx-auto max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Unisciti a VENDI CASA - Torino Jungle
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Un gruppo per chi ha una casa a Torino difficile da vendere: ereditata, con inquilino,
              da ristrutturare o ferma da mesi. Successioni, sfratti, imposte, Salva Casa e prezzi
              reali. Niente annunci di agenzia.
            </p>
            <a
              href={FACEBOOK_SELLER_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick("seller_community_click")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors"
            >
              <Facebook className="w-5 h-5" aria-hidden="true" />
              Entra nel gruppo
              <span className="sr-only"> (si apre in una nuova finestra)</span>
            </a>
          </div>
        </section>

        {/* Chi siamo */}
        <section className="py-14 md:py-20">
          <div className="container px-4 md:px-8 mx-auto max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">Chi compra</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Jungle Rent S.r.l. è una startup innovativa con sede a Torino, incubata da 2I3T,
              l'incubatore dell'Università di Torino. Compriamo appartamenti, li sistemiamo e li
              affittiamo a studenti universitari. Siamo all'inizio: stiamo chiudendo le prime
              acquisizioni e non abbiamo ancora un portafoglio da mostrarti — per questo su questa
              pagina non trovi testimonianze inventate.
            </p>
            <p className="text-sm text-muted-foreground">
              Jungle Rent S.r.l. — P.IVA 13333450016 — Torino — Presidente del CdA Lorenzo Oni-Joseph.
            </p>
          </div>
        </section>
      </main>
      <SellerStickyCta onOpenDialog={scrollToForm} />
    </>
  );
};

export default Sellers;
