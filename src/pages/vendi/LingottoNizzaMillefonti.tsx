import { useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Navigation, Footer, BottomNav } from "@/components/layout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { useLeadCapture } from "@/hooks/useLeadCapture";
import { useAnalytics } from "@/hooks/useAnalytics";
import { CONTACTS, openWhatsApp } from "@/constants/contacts";
import { FORMSPREE_ENDPOINTS } from "@/constants";
import {
  Home,
  Clock,
  CheckCircle2,
  MessageCircle,
  Loader2,
  Banknote,
  HandCoins,
  ShieldCheck,
  MapPin,
} from "lucide-react";

const STREETS = [
  { name: "Via Nizza (200–400)", note: "asse principale, palazzi anni 60–70" },
  { name: "Via Spotorno", note: "tranquilla, vicino parco" },
  { name: "Via Passo Buole", note: "stock ampio, eredità frequenti" },
  { name: "Borgo Filadelfia", note: "scuole, famiglie, ottima domanda affitto" },
  { name: "Via Genova / Via Madama Cristina sud", note: "ponte con San Salvario" },
  { name: "Corso Bramante / Corso Spezia", note: "vicino Molinette, alta domanda" },
];

const REASONS_IT = [
  { value: "eredita", label: "Eredità" },
  { value: "trasferimento", label: "Trasferimento / lavoro" },
  { value: "liquidita", label: "Bisogno di liquidità" },
  { value: "seconda_casa", label: "Seconda casa che non uso" },
  { value: "ristrutturare", label: "Da ristrutturare, non voglio occuparmene" },
  { value: "altro", label: "Altro" },
];

const REASONS_EN = [
  { value: "eredita", label: "Inheritance" },
  { value: "trasferimento", label: "Relocation / job" },
  { value: "liquidita", label: "Need liquidity" },
  { value: "seconda_casa", label: "Second home I don't use" },
  { value: "ristrutturare", label: "Needs renovation, don't want to deal with it" },
  { value: "altro", label: "Other" },
];

const SIZE_OPTIONS = [
  { value: "<40", label: "<40 m²" },
  { value: "40-55", label: "40–55 m² (bilocale)" },
  { value: "55-75", label: "55–75 m² (trilocale)" },
  { value: "75-100", label: "75–100 m²" },
  { value: ">100", label: ">100 m²" },
];

const CONDITION_IT = [
  { value: "ottimo", label: "Ottimo / ristrutturato" },
  { value: "buono", label: "Buono / abitabile" },
  { value: "da_sistemare", label: "Da sistemare" },
  { value: "da_ristrutturare", label: "Da ristrutturare" },
];

const CONDITION_EN = [
  { value: "ottimo", label: "Excellent / renovated" },
  { value: "buono", label: "Good / liveable" },
  { value: "da_sistemare", label: "Needs minor work" },
  { value: "da_ristrutturare", label: "Needs full renovation" },
];

const schema = z.object({
  email: z.string().email().max(255),
  name: z.string().trim().max(100).optional().or(z.literal("")),
  property_address: z.string().trim().max(200).optional().or(z.literal("")),
  property_sqm_range: z.string().min(1),
  property_condition: z.string().min(1),
  selling_reason: z.string().min(1),
  consent: z.boolean().refine((v) => v === true, { message: "required" }),
});

type FormData = z.infer<typeof schema>;

const LingottoNizzaMillefontiSeller = () => {
  const { i18n } = useTranslation();
  const isItalian = i18n.language.startsWith("it");
  const { submitLead } = useLeadCapture();
  const { trackFormSubmit } = useAnalytics();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const reasons = isItalian ? REASONS_IT : REASONS_EN;
  const conditions = isItalian ? CONDITION_IT : CONDITION_EN;

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      name: "",
      property_address: "",
      property_sqm_range: "",
      property_condition: "",
      selling_reason: "",
      consent: false,
    },
  });

  const canonicalUrl = "https://junglerent.it/vendi-casa/lingotto-nizza-millefonti";

  const title = isItalian
    ? "Vendere casa a Lingotto / Nizza Millefonti — acquisto diretto in 60–90 giorni | Jungle Rent"
    : "Sell your home in Lingotto / Nizza Millefonti — direct purchase in 60–90 days | Jungle Rent";

  const description = isItalian
    ? "Acquistiamo direttamente bilocali e trilocali a Lingotto, Nizza Millefonti e zona Molinette. Zero commissioni, offerta entro 7 giorni, chiusura in 60–90 giorni. Parla con Lorenzo."
    : "We directly buy 1- and 2-bedroom apartments in Lingotto, Nizza Millefonti and the Molinette area. Zero commission, offer within 7 days, closing in 60–90 days. Talk to Lorenzo.";

  const ldJson = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonicalUrl}#service`,
    "name": isItalian
      ? "Acquisto diretto immobili Lingotto / Nizza Millefonti"
      : "Direct property purchase Lingotto / Nizza Millefonti",
    "serviceType": isItalian ? "Acquisto immobiliare diretto" : "Direct real estate purchase",
    "areaServed": [
      { "@type": "Place", "name": "Lingotto, Torino" },
      { "@type": "Place", "name": "Nizza Millefonti, Torino" },
      { "@type": "Place", "name": "Borgo Filadelfia, Torino" },
    ],
    "provider": {
      "@type": "RealEstateAgent",
      "name": "Jungle Rent S.r.l.",
      "url": "https://junglerent.it",
      "areaServed": { "@type": "City", "name": "Torino" },
    },
    "offers": {
      "@type": "Offer",
      "description": isItalian
        ? "Zero commissioni venditore, offerta scritta entro 7 giorni, chiusura 60–90 giorni."
        : "Zero seller commission, written offer within 7 days, closing in 60–90 days.",
    },
  };

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const result = await submitLead(
        {
          email: data.email,
          name: data.name || undefined,
          leadType: "seller",
          source: "vendi-lingotto-nizza-millefonti",
          metadata: {
            property_address: data.property_address || null,
            property_sqm_range: data.property_sqm_range,
            property_condition: data.property_condition,
            selling_reason: data.selling_reason,
            zone: "lingotto-nizza-millefonti",
            language: isItalian ? "it" : "en",
          },
        },
        {
          endpoint: FORMSPREE_ENDPOINTS.quickSeller,
          subject: "🏠 Vendi Lingotto / Nizza Millefonti — nuovo venditore",
          extraFields: {
            property_address: data.property_address || "",
            property_sqm_range: data.property_sqm_range,
            property_condition: data.property_condition,
            selling_reason: data.selling_reason,
            zone: "lingotto-nizza-millefonti",
          },
        },
      );

      if (result.success) {
        trackFormSubmit("vendi-lingotto-nizza-millefonti", { zone: "lingotto-nizza-millefonti" });
        setSubmitted(true);
        toast({
          title: isItalian ? "Grazie!" : "Thanks!",
          description: isItalian
            ? "Lorenzo ti ricontatta entro 24 ore."
            : "Lorenzo will reach out within 24 hours.",
        });
      } else {
        throw new Error(result.error);
      }
    } catch {
      toast({
        title: isItalian ? "Errore" : "Error",
        description: isItalian
          ? "Riprova o scrivi su WhatsApp."
          : "Try again or message us on WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const openWhats = () => {
    const reason = form.getValues("selling_reason");
    const reasonLabel = reasons.find((r) => r.value === reason)?.label ?? "";
    const msg = isItalian
      ? `Ciao Lorenzo, ho un appartamento a Lingotto / Nizza Millefonti che vorrei vendere${
          reasonLabel ? ` (${reasonLabel})` : ""
        }. Mi puoi richiamare?`
      : `Hi Lorenzo, I have an apartment in Lingotto / Nizza Millefonti I'd like to sell${
          reasonLabel ? ` (${reasonLabel})` : ""
        }. Can you get back to me?`;
    openWhatsApp(CONTACTS.lorenzo.phone, msg);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(ldJson)}</script>
      </Helmet>

      <Navigation />
      <ScrollToTop />

      <main className="pt-20 pb-24 md:pb-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <Breadcrumbs
            items={[
              { label: isItalian ? "Home" : "Home", href: "/" },
              { label: isItalian ? "Vendi casa" : "Sell your home", href: "/vendi" },
              {
                label: isItalian
                  ? "Lingotto / Nizza Millefonti"
                  : "Lingotto / Nizza Millefonti",
              },
            ]}
          />

          {/* HERO */}
          <section className="py-10 md:py-16">
            <Badge variant="secondary" className="mb-4">
              <Home className="w-3.5 h-3.5 mr-1.5" />
              {isItalian ? "Acquisto diretto" : "Direct purchase"}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
              {isItalian
                ? "Vendi il tuo appartamento a Lingotto in 60–90 giorni."
                : "Sell your apartment in Lingotto in 60–90 days."}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
              {isItalian
                ? "Acquistiamo direttamente bilocali e trilocali a Lingotto, Nizza Millefonti e zona Molinette. Zero commissioni venditore, offerta scritta entro 7 giorni, una persona sola che ti segue dalla visita al rogito."
                : "We directly buy 1- and 2-bedroom apartments in Lingotto, Nizza Millefonti and the Molinette area. Zero seller commission, written offer within 7 days, one person following you from viewing to deed."}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" onClick={openWhats} className="gap-2">
                <MessageCircle className="w-4 h-4" />
                {isItalian ? "Parla con Lorenzo" : "Talk to Lorenzo"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() =>
                  document.getElementById("seller-form")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                {isItalian ? "Chiedi una valutazione" : "Request a valuation"}
              </Button>
            </div>
          </section>

          {/* VALUE PROPS */}
          <section className="py-8 grid md:grid-cols-3 gap-4">
            {[
              {
                icon: HandCoins,
                title: isItalian ? "0% commissioni" : "0% commission",
                body: isItalian
                  ? "Non siamo un'agenzia. Compriamo noi direttamente: niente provvigione del 3% sul prezzo finale."
                  : "We are not an agency. We buy directly: no 3% commission on the final price.",
              },
              {
                icon: Clock,
                title: isItalian ? "Offerta in 7 giorni" : "Offer in 7 days",
                body: isItalian
                  ? "Sopralluogo entro 5 giorni dalla richiesta, offerta scritta entro 7."
                  : "Visit within 5 days of contact, written offer within 7.",
              },
              {
                icon: ShieldCheck,
                title: isItalian ? "Chiusura 60–90 giorni" : "Closing in 60–90 days",
                body: isItalian
                  ? "Tempi certi al rogito. Nessuna catena di acquirenti, nessuna trattativa che salta."
                  : "Certain deed timing. No buyer chain, no deals falling through.",
              },
            ].map(({ icon: Icon, title: t, body }) => (
              <Card key={t}>
                <CardContent className="pt-6">
                  <Icon className="w-5 h-5 text-primary mb-3" />
                  <h3 className="font-semibold mb-1">{t}</h3>
                  <p className="text-sm text-muted-foreground">{body}</p>
                </CardContent>
              </Card>
            ))}
          </section>

          {/* WHAT WE BUY */}
          <section className="py-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              {isItalian ? "Che immobili compriamo" : "What we buy"}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl">
              {isItalian
                ? "Cerchiamo bilocali e trilocali tra 40 e 80 m², a Lingotto, Nizza Millefonti, Borgo Filadelfia e Mirafiori nord. Anche da ristrutturare. Soprattutto vicino al polo Molinette."
                : "We look for 1- and 2-bedroom flats between 40 and 80 m², in Lingotto, Nizza Millefonti, Borgo Filadelfia and northern Mirafiori. Renovation-ready also welcome. Especially near the Molinette hospital cluster."}
            </p>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {STREETS.map((s) => (
                    <div key={s.name} className="flex items-start gap-3 px-5 py-4">
                      <MapPin className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />
                      <div>
                        <div className="font-medium">{s.name}</div>
                        <div className="text-sm text-muted-foreground">{s.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* HOW IT WORKS */}
          <section className="py-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              {isItalian ? "Come funziona" : "How it works"}
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  n: "1",
                  title: isItalian ? "Ci scrivi" : "You reach out",
                  body: isItalian
                    ? "Compila il modulo o scrivi su WhatsApp. Ti richiamiamo entro 24 ore."
                    : "Fill the form or message us on WhatsApp. We call you back within 24 hours.",
                },
                {
                  n: "2",
                  title: isItalian ? "Sopralluogo e offerta" : "Visit and offer",
                  body: isItalian
                    ? "Veniamo a vedere l'immobile entro 5 giorni. Offerta scritta entro 7."
                    : "We visit within 5 days. Written offer within 7.",
                },
                {
                  n: "3",
                  title: isItalian ? "Compromesso e rogito" : "Preliminary and deed",
                  body: isItalian
                    ? "Se accetti: compromesso, caparra, rogito entro 60–90 giorni. Notaio scelto da te."
                    : "If you accept: preliminary, deposit, deed within 60–90 days. Notary of your choice.",
                },
              ].map((step) => (
                <Card key={step.n}>
                  <CardContent className="pt-6">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center mb-3">
                      {step.n}
                    </div>
                    <h3 className="font-semibold mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CONTEXT NUMBERS */}
          <section className="py-8">
            <Card>
              <CardContent className="pt-6">
                <Banknote className="w-5 h-5 text-primary mb-3" />
                <h3 className="font-semibold mb-2">
                  {isItalian ? "Riferimenti di zona, 2026" : "Area benchmarks, 2026"}
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1.5">
                  <li>
                    {isItalian
                      ? "• Prezzo medio Lingotto / Nizza Millefonti: €1.400–1.900 al m²"
                      : "• Average price Lingotto / Nizza Millefonti: €1,400–1,900 per m²"}
                  </li>
                  <li>
                    {isItalian
                      ? "• Tempo medio di vendita con agenzia: 6–9 mesi"
                      : "• Average time to sell via agency: 6–9 months"}
                  </li>
                  <li>
                    {isItalian
                      ? "• Provvigione tipica agenzia: 3% + IVA dal venditore"
                      : "• Typical agency commission: 3% + VAT from seller"}
                  </li>
                  <li>
                    {isItalian
                      ? "• Con Jungle Rent: 0% commissione, chiusura 60–90 giorni"
                      : "• With Jungle Rent: 0% commission, closing 60–90 days"}
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* FORM */}
          <section id="seller-form" className="py-12">
            <Card className="border-primary/30">
              <CardContent className="p-6 md:p-10">
                {submitted ? (
                  <div className="text-center py-6">
                    <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">
                      {isItalian ? "Ricevuto." : "Got it."}
                    </h2>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      {isItalian
                        ? "Lorenzo ti ricontatta entro 24 ore. Se hai fretta, scrivi direttamente su WhatsApp."
                        : "Lorenzo will reach out within 24 hours. If you're in a hurry, message us directly on WhatsApp."}
                    </p>
                    <Button onClick={openWhats} className="gap-2">
                      <MessageCircle className="w-4 h-4" />
                      {isItalian ? "Parla con Lorenzo" : "Talk to Lorenzo"}
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                      {isItalian ? "Chiedi una valutazione" : "Request a valuation"}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {isItalian
                        ? "Nessun impegno. Ti ricontattiamo entro 24 ore con domande mirate e fissiamo il sopralluogo."
                        : "No commitment. We'll get back to you within 24 hours with targeted questions and schedule the visit."}
                    </p>

                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email *</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="tuo@email.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  {isItalian ? "Nome (opzionale)" : "Name (optional)"}
                                </FormLabel>
                                <FormControl>
                                  <Input placeholder={isItalian ? "Mario" : "Maria"} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="property_address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {isItalian
                                  ? "Indirizzo o via (opzionale)"
                                  : "Address or street (optional)"}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={
                                    isItalian
                                      ? "Es. Via Nizza 270"
                                      : "E.g. Via Nizza 270"
                                  }
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid md:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="property_sqm_range"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{isItalian ? "Metratura *" : "Size *"}</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="—" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {SIZE_OPTIONS.map((o) => (
                                      <SelectItem key={o.value} value={o.value}>
                                        {o.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="property_condition"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  {isItalian ? "Condizioni *" : "Condition *"}
                                </FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="—" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {conditions.map((c) => (
                                      <SelectItem key={c.value} value={c.value}>
                                        {c.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="selling_reason"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  {isItalian ? "Motivo *" : "Reason *"}
                                </FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="—" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {reasons.map((r) => (
                                      <SelectItem key={r.value} value={r.value}>
                                        {r.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="consent"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start gap-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="text-sm font-normal text-muted-foreground">
                                  {isItalian
                                    ? "Acconsento al trattamento dei dati per essere ricontattato. Vedi privacy."
                                    : "I consent to data processing to be contacted back. See privacy."}
                                </FormLabel>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />

                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button type="submit" size="lg" disabled={submitting} className="gap-2">
                            {submitting ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <CheckCircle2 className="w-4 h-4" />
                            )}
                            {isItalian ? "Chiedi una valutazione" : "Request a valuation"}
                          </Button>
                          <Button
                            type="button"
                            size="lg"
                            variant="outline"
                            onClick={openWhats}
                            className="gap-2"
                          >
                            <MessageCircle className="w-4 h-4" />
                            {isItalian ? "Oppure scrivi su WhatsApp" : "Or message on WhatsApp"}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </>
                )}
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
};

export default LingottoNizzaMillefontiSeller;
