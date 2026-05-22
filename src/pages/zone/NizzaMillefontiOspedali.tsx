import { useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
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
import {
  MapPin,
  Hospital,
  Clock,
  FileCheck,
  MessageCircle,
  Loader2,
  CheckCircle2,
  Train,
  GraduationCap,
} from "lucide-react";

const HOSPITALS = [
  { name: "Molinette (Città della Salute)", walk: "1–8 min", bike: "—" },
  { name: "Dental School UniTo", walk: "3 min", bike: "—" },
  { name: "Sant'Anna ginecologico", walk: "5 min", bike: "—" },
  { name: "Regina Margherita pediatrico", walk: "6 min", bike: "—" },
  { name: "CTO (traumatologia)", walk: "12 min", bike: "5 min" },
  { name: "Mauriziano Umberto I", walk: "20 min", bike: "8 min" },
  { name: "San Giovanni Bosco", walk: "—", bike: "20 min (tram 4)" },
];

const AUDIENCES_IT = [
  { value: "specializzando", label: "Specializzando/a (SSM)" },
  { value: "infermieristica", label: "Studente infermieristica / professioni sanitarie" },
  { value: "medicina", label: "Studente medicina (anni clinici)" },
  { value: "erasmus", label: "Erasmus / studente internazionale" },
  { value: "dottorato", label: "Dottorato / ricerca" },
  { value: "altro", label: "Altro" },
];

const AUDIENCES_EN = [
  { value: "specializzando", label: "Medical resident (SSM)" },
  { value: "infermieristica", label: "Nursing / health professions student" },
  { value: "medicina", label: "Medical student (clinical years)" },
  { value: "erasmus", label: "Erasmus / international student" },
  { value: "dottorato", label: "PhD / research" },
  { value: "altro", label: "Other" },
];

const MONTHS_IT = [
  { value: "luglio", label: "Luglio 2026" },
  { value: "agosto", label: "Agosto 2026" },
  { value: "settembre", label: "Settembre 2026" },
  { value: "ottobre", label: "Ottobre 2026" },
  { value: "novembre", label: "Novembre 2026" },
  { value: "altro", label: "Altro / flessibile" },
];

const MONTHS_EN = [
  { value: "luglio", label: "July 2026" },
  { value: "agosto", label: "August 2026" },
  { value: "settembre", label: "September 2026" },
  { value: "ottobre", label: "October 2026" },
  { value: "novembre", label: "November 2026" },
  { value: "altro", label: "Other / flexible" },
];

const BUDGET_OPTIONS = [
  { value: "400-500", label: "€400–500" },
  { value: "500-650", label: "€500–650" },
  { value: "650-800", label: "€650–800" },
  { value: "800+", label: "€800+" },
  { value: "bilocale", label: "Bilocale intero" },
];

const schema = z.object({
  email: z.string().email().max(255),
  name: z.string().trim().min(2).max(100).optional().or(z.literal("")),
  target_audience: z.string().min(1),
  move_in_month: z.string().min(1),
  budget_range: z.string().min(1),
  consent: z.boolean().refine((v) => v === true, { message: "required" }),
});

type FormData = z.infer<typeof schema>;

const NizzaMillefontiOspedali = () => {
  const { i18n } = useTranslation();
  const isItalian = i18n.language.startsWith("it");
  const { submitLead } = useLeadCapture();
  const { trackFormSubmit } = useAnalytics();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const audiences = isItalian ? AUDIENCES_IT : AUDIENCES_EN;
  const months = isItalian ? MONTHS_IT : MONTHS_EN;

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      name: "",
      target_audience: "",
      move_in_month: "",
      budget_range: "",
      consent: false,
    },
  });

  const canonicalUrl = "https://junglerent.it/zone/nizza-millefonti-ospedali";

  const title = isItalian
    ? "Casa per studenti e specializzandi vicino alle Molinette | Jungle Rent"
    : "Housing for students and medical residents near Molinette | Jungle Rent";

  const description = isItalian
    ? "Stanze e appartamenti a Nizza Millefonti per chi lavora o studia a Molinette, Sant'Anna, Regina Margherita, CTO e Dental School. Contratto regolare, gestione veloce, parla con Lorenzo."
    : "Rooms and apartments in Nizza Millefonti for those working or studying at Molinette, Sant'Anna, Regina Margherita, CTO and Dental School. Regular contract, quick management, talk to Lorenzo.";

  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": "Nizza Millefonti – Polo ospedaliero Molinette, Torino",
    "description": description,
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 45.0395,
      "longitude": 7.6739,
    },
    "containedInPlace": {
      "@type": "City",
      "name": "Torino",
      "addressCountry": "IT",
    },
  };

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const result = await submitLead(
        {
          email: data.email,
          name: data.name || undefined,
          leadType: "student",
          source: "nizza-millefonti-waitlist",
          metadata: {
            target_audience: data.target_audience,
            move_in_month: data.move_in_month,
            budget_range: data.budget_range,
            zone: "nizza-millefonti-ospedali",
            language: isItalian ? "it" : "en",
          },
        },
        {
          endpoint: "https://formspree.io/f/xeojbzow",
          subject: "Nizza Millefonti / Ospedali — student waitlist",
          extraFields: {
            target_audience: data.target_audience,
            move_in_month: data.move_in_month,
            budget_range: data.budget_range,
            zone: "nizza-millefonti-ospedali",
          },
        },
      );

      if (result.success) {
        trackFormSubmit("nizza-millefonti-waitlist", true);
        setSubmitted(true);
        toast({
          title: isItalian ? "Grazie!" : "Thanks!",
          description: isItalian
            ? "Ti scriviamo appena abbiamo qualcosa per il tuo periodo."
            : "We'll write as soon as we have something for your period.",
        });
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
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
    const month = form.getValues("move_in_month");
    const audience = form.getValues("target_audience");
    const audienceLabel =
      audiences.find((a) => a.value === audience)?.label ?? "";
    const monthLabel = months.find((m) => m.value === month)?.label ?? "";
    const msg = isItalian
      ? `Ciao Lorenzo, sono interessato/a a una casa a Nizza Millefonti / Molinette${
          audienceLabel ? ` (${audienceLabel})` : ""
        }${monthLabel ? ` per ${monthLabel}` : ""}.`
      : `Hi Lorenzo, I'm looking for a place in Nizza Millefonti / Molinette${
          audienceLabel ? ` (${audienceLabel})` : ""
        }${monthLabel ? ` from ${monthLabel}` : ""}.`;
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
        <script type="application/ld+json">{JSON.stringify(placeSchema)}</script>
      </Helmet>

      <Navigation />
      <ScrollToTop />

      <main className="pt-20 pb-24 md:pb-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <Breadcrumbs
            items={[
              { label: isItalian ? "Home" : "Home", href: "/" },
              {
                label: isItalian
                  ? "Nizza Millefonti / Ospedali"
                  : "Nizza Millefonti / Hospitals",
              },
            ]}
          />

          {/* HERO */}
          <section className="py-10 md:py-16">
            <Badge variant="secondary" className="mb-4">
              <Hospital className="w-3.5 h-3.5 mr-1.5" />
              {isItalian
                ? "Polo ospedaliero Molinette"
                : "Molinette hospital cluster"}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
              {isItalian
                ? "Casa vicino alle Molinette, senza perdere tempo."
                : "A place near Molinette, without wasting time."}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
              {isItalian
                ? "Specializzandi, studenti di medicina, infermieristica, dottorandi: ti aiutiamo a trovare casa nel raggio di camminata da Molinette, Sant'Anna, Regina Margherita, CTO e Dental School. Contratto regolare (valido per residenza e borsa), gestione rapida, una persona sola che risponde su WhatsApp."
                : "Medical residents, students of medicine and nursing, PhDs: we help you find housing within walking distance of Molinette, Sant'Anna, Regina Margherita, CTO and Dental School. Regular contract (valid for residency and stipend), quick management, one person answering on WhatsApp."}
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
                  document
                    .getElementById("waitlist")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                {isItalian ? "Iscriviti alla lista" : "Join the waitlist"}
              </Button>
            </div>
          </section>

          {/* WHY THIS ZONE */}
          <section className="py-8 grid md:grid-cols-3 gap-4">
            {[
              {
                icon: MapPin,
                title: isItalian ? "A piedi dal reparto" : "Walking distance",
                body: isItalian
                  ? "Tutte le strutture del polo Molinette nel raggio di 1–12 minuti a piedi."
                  : "All Molinette facilities within a 1–12 minute walk.",
              },
              {
                icon: FileCheck,
                title: isItalian ? "Contratto regolare" : "Regular contract",
                body: isItalian
                  ? "Contratti registrati validi per residenza, borsa e detrazione fiscale."
                  : "Registered contracts valid for residency, stipend and tax deduction.",
              },
              {
                icon: Clock,
                title: isItalian ? "Risposta veloce" : "Quick response",
                body: isItalian
                  ? "Una persona, su WhatsApp. Niente agenzie, niente filtri."
                  : "One person, on WhatsApp. No agencies, no filters.",
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

          {/* HOSPITAL DISTANCES */}
          <section className="py-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              {isItalian
                ? "Distanze dal polo ospedaliero"
                : "Distances from the hospital cluster"}
            </h2>
            <p className="text-muted-foreground mb-6">
              {isItalian
                ? "Punto di riferimento: Corso Bramante, ingresso Molinette."
                : "Reference point: Corso Bramante, Molinette entrance."}
            </p>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {HOSPITALS.map((h) => (
                    <div
                      key={h.name}
                      className="flex items-center justify-between px-5 py-4"
                    >
                      <div className="flex items-center gap-3">
                        <Hospital className="w-4 h-4 text-muted-foreground shrink-0" />
                        <span className="font-medium">{h.name}</span>
                      </div>
                      <div className="text-sm text-muted-foreground tabular-nums">
                        {h.walk !== "—"
                          ? isItalian
                            ? `${h.walk} a piedi`
                            : `${h.walk} walk`
                          : isItalian
                          ? `${h.bike} in bici`
                          : `${h.bike} bike`}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* TRANSPORT + AUDIENCES */}
          <section className="py-8 grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <Train className="w-5 h-5 text-primary mb-3" />
                <h3 className="font-semibold mb-2">
                  {isItalian ? "Trasporti notturni (turni)" : "Night transport (shifts)"}
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Tram 4 (24h corsia separata) — Falchera / Mirafiori</li>
                  <li>• Bus 35, 42, 45 — collegamenti notturni</li>
                  <li>{isItalian ? "• Metro Linea 1: Carducci–Molinette (5 min a piedi)" : "• Metro Line 1: Carducci–Molinette (5 min walk)"}</li>
                  <li>{isItalian ? "• Bike-sharing [TO]BIKE in zona" : "• [TO]BIKE bike-sharing in the area"}</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <GraduationCap className="w-5 h-5 text-primary mb-3" />
                <h3 className="font-semibold mb-2">
                  {isItalian ? "Per chi è questa zona" : "Who this area is for"}
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>{isItalian ? "• Specializzandi medici (SSM)" : "• Medical residents (SSM)"}</li>
                  <li>{isItalian ? "• Studenti Medicina anni clinici (Polo Molinette)" : "• Medical students clinical years (Molinette Pole)"}</li>
                  <li>{isItalian ? "• Infermieristica e professioni sanitarie" : "• Nursing and health professions"}</li>
                  <li>{isItalian ? "• Erasmus / internazionali in scambio clinico" : "• Erasmus / international clinical exchange"}</li>
                  <li>{isItalian ? "• Dottorandi e ricercatori IRCCS" : "• PhDs and IRCCS researchers"}</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* WAITLIST */}
          <section id="waitlist" className="py-12">
            <Card className="border-primary/30">
              <CardContent className="p-6 md:p-10">
                {submitted ? (
                  <div className="text-center py-6">
                    <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">
                      {isItalian ? "Ci siamo." : "You're in."}
                    </h2>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      {isItalian
                        ? "Ti scriviamo appena abbiamo una camera o un appartamento adatto al tuo periodo. Se vuoi accelerare, mandaci un WhatsApp."
                        : "We'll write as soon as we have a room or apartment for your period. To speed things up, message us on WhatsApp."}
                    </p>
                    <Button onClick={openWhats} className="gap-2">
                      <MessageCircle className="w-4 h-4" />
                      {isItalian ? "Parla con Lorenzo" : "Talk to Lorenzo"}
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                      {isItalian
                        ? "Lista d'attesa Nizza Millefonti"
                        : "Nizza Millefonti waitlist"}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {isItalian
                        ? "Lasciaci email, profilo e mese in cui ti serve. Ti contattiamo appena liberiamo qualcosa di adatto."
                        : "Leave email, profile and the month you need. We'll contact you as soon as we have something suitable."}
                    </p>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                      >
                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email *</FormLabel>
                                <FormControl>
                                  <Input
                                    type="email"
                                    placeholder="tu@esempio.it"
                                    autoComplete="email"
                                    {...field}
                                  />
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
                                  <Input autoComplete="given-name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="target_audience"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  {isItalian ? "Profilo *" : "Profile *"}
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue
                                        placeholder={
                                          isItalian ? "Seleziona" : "Select"
                                        }
                                      />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {audiences.map((a) => (
                                      <SelectItem key={a.value} value={a.value}>
                                        {a.label}
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
                            name="move_in_month"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  {isItalian ? "Trasloco *" : "Move-in *"}
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue
                                        placeholder={
                                          isItalian ? "Quando" : "When"
                                        }
                                      />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {months.map((m) => (
                                      <SelectItem key={m.value} value={m.value}>
                                        {m.label}
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
                            name="budget_range"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  {isItalian ? "Budget *" : "Budget *"}
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue
                                        placeholder={
                                          isItalian ? "Mensile" : "Monthly"
                                        }
                                      />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {BUDGET_OPTIONS.map((b) => (
                                      <SelectItem key={b.value} value={b.value}>
                                        {b.label}
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
                            <FormItem className="flex items-start gap-3 pt-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal leading-snug">
                                {isItalian
                                  ? "Acconsento al trattamento dei dati per essere contattato/a su disponibilità in zona Nizza Millefonti."
                                  : "I consent to being contacted about availability in the Nizza Millefonti area."}{" "}
                                <Link
                                  to="/privacy"
                                  className="underline underline-offset-2"
                                >
                                  Privacy
                                </Link>
                              </FormLabel>
                            </FormItem>
                          )}
                        />

                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                          <Button
                            type="submit"
                            size="lg"
                            disabled={submitting}
                            className="sm:w-auto"
                          >
                            {submitting && (
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            )}
                            {isItalian
                              ? "Entra in lista d'attesa"
                              : "Join the waitlist"}
                          </Button>
                          <Button
                            type="button"
                            size="lg"
                            variant="outline"
                            onClick={openWhats}
                            className="gap-2"
                          >
                            <MessageCircle className="w-4 h-4" />
                            {isItalian
                              ? "Preferisco WhatsApp"
                              : "I prefer WhatsApp"}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </>
                )}
              </CardContent>
            </Card>
          </section>

          {/* RELATED CONTENT */}
          <section className="py-10">
            <h2 className="text-xl font-bold mb-4">
              {isItalian ? "Approfondisci" : "Learn more"}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                to="/blog/affittare-vicino-molinette-specializzandi-2026"
                className="block"
              >
                <Card className="h-full hover:border-primary/40 transition-colors">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-1">
                      {isItalian
                        ? "Affittare casa vicino alle Molinette: guida per specializzandi 2026"
                        : "Renting near Molinette: 2026 guide for medical residents"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {isItalian
                        ? "Tempistiche, contratti, prezzi reali e cosa chiedere prima di firmare."
                        : "Timing, contracts, real prices and what to check before signing."}
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <Link to="/affitto-stanza-torino" className="block">
                <Card className="h-full hover:border-primary/40 transition-colors">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-1">
                      {isItalian
                        ? "Tutti i quartieri studenti di Torino"
                        : "All Turin student neighborhoods"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {isItalian
                        ? "Confronta zone, prezzi e profili universitari."
                        : "Compare zones, prices and university profiles."}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
};

export default NizzaMillefontiOspedali;
