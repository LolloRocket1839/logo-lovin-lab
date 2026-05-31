import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  MapPin,
  Hospital,
  MessageCircle,
  Loader2,
  CheckCircle2,
  Train,
  GraduationCap,
  Home,
  ShieldCheck,
} from "lucide-react";

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
import { FORMSPREE_ENDPOINTS } from "@/constants/formspree";

const HOSPITALS = [
  { name: "Molinette (Città della Salute)", walk: "1–8 min" },
  { name: "Sant'Anna ginecologico", walk: "5 min" },
  { name: "Regina Margherita pediatrico", walk: "6 min" },
  { name: "CTO (traumatologia)", walk: "12 min" },
  { name: "Dental School UniTo", walk: "3 min" },
  { name: "Politecnico (Castello del Valentino)", walk: "15 min" },
];

const MICRO_ZONES = [
  {
    name: "Nizza",
    body: "Cuore del quartiere, mercato di via Nizza, vita di strada e bar. Più vivace, vicino a Molinette.",
    rent: "€500–700",
  },
  {
    name: "Millefonti",
    body: "Residenziale tranquillo a ridosso degli ospedali. Ideale per chi vuole silenzio e camminare al lavoro.",
    rent: "€450–650",
  },
  {
    name: "Lingotto",
    body: "Vicino al centro commerciale, Eataly, metro Lingotto. Comodo per chi si sposta in città.",
    rent: "€500–700",
  },
  {
    name: "Italia 61",
    body: "Zona moderna verso il Po, vicino a Grattacielo Intesa e parchi. Verde e ben collegata.",
    rent: "€550–750",
  },
];

const AUDIENCES = [
  { value: "studente", label: "Studente / studentessa" },
  { value: "specializzando", label: "Specializzando/a o medico" },
  { value: "sanitario", label: "Infermiere/a o professione sanitaria" },
  { value: "lavoratore", label: "Lavoratore/lavoratrice" },
  { value: "famiglia", label: "Coppia / famiglia" },
  { value: "altro", label: "Altro" },
];

const MOVE_IN = [
  { value: "subito", label: "Il prima possibile" },
  { value: "1-3mesi", label: "Entro 1–3 mesi" },
  { value: "estate", label: "Estate 2026" },
  { value: "settembre", label: "Settembre 2026" },
  { value: "flessibile", label: "Sono flessibile" },
];

const BUDGET = [
  { value: "400-550", label: "€400–550 (stanza)" },
  { value: "550-700", label: "€550–700 (stanza/monolocale)" },
  { value: "700-900", label: "€700–900 (bilocale)" },
  { value: "900+", label: "€900+ (trilocale o più)" },
];

const FAQS = [
  {
    q: "Che tipo di contratto offrite?",
    a: "Dipende dal tuo profilo: transitorio (per lavoro o ospedale fuori sede), contratto studenti 6–36 mesi, o 4+4 per chi resta a lungo. Tutto regolare, registrato, con cedolare secca quando possibile.",
  },
  {
    q: "Quanto serve di deposito?",
    a: "Solitamente 1–3 mensilità di deposito a seconda del contratto e del profilo. Niente fee d'agenzia: trattiamo direttamente.",
  },
  {
    q: "Posso vedere casa prima di firmare?",
    a: "Sì, organizziamo visita di persona o videocall se sei fuori Torino. Mandiamo planimetria, foto recenti e tempi reali verso ospedali e Politecnico.",
  },
  {
    q: "Animali ammessi?",
    a: "Caso per caso: dipende dall'appartamento e dalle regole di condominio. Dillo subito così filtriamo solo soluzioni compatibili.",
  },
  {
    q: "Quando avete disponibilità?",
    a: "Lavoriamo su una lista d'attesa: appena si libera una soluzione adatta al tuo periodo e budget, ti contattiamo prima della pubblicazione.",
  },
];

const schema = z.object({
  email: z.string().email("Email non valida").max(255),
  phone: z
    .string()
    .trim()
    .max(40)
    .optional()
    .or(z.literal("")),
  name: z
    .string()
    .trim()
    .min(2, "Inserisci almeno 2 caratteri")
    .max(100)
    .optional()
    .or(z.literal("")),
  audience: z.string().min(1, "Seleziona un'opzione"),
  move_in: z.string().min(1, "Seleziona un'opzione"),
  budget: z.string().min(1, "Seleziona un'opzione"),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
  consent: z.boolean().refine((v) => v === true, {
    message: "Serve il consenso per ricontattarti",
  }),
});
type FormData = z.infer<typeof schema>;

const CANONICAL = "https://junglerent.it/affitti-lingotto-ospedali-torino";

const AffittiLingottoOspedali = () => {
  const { submitLead } = useLeadCapture();
  const { trackFormSubmit } = useAnalytics();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      phone: "",
      name: "",
      audience: "",
      move_in: "",
      budget: "",
      notes: "",
      consent: false,
    },
  });

  const title =
    "Cerca casa in zona Lingotto, Nizza Millefonti e Ospedali (Molinette) | Jungle Rent";
  const description =
    "Stanze, monolocali e bilocali in affitto vicino a Molinette, CTO, Sant'Anna, Regina Margherita e Politecnico. Contratto regolare, zero agenzia, lista d'attesa diretta con Lorenzo.";

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      url: CANONICAL,
      description,
      isPartOf: { "@id": "https://junglerent.it/#website" },
      about: { "@id": "https://junglerent.it/#organization" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://junglerent.it/" },
        { "@type": "ListItem", position: 2, name: "Affitti Lingotto / Ospedali", item: CANONICAL },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      name: "Jungle Rent — Affitti Lingotto / Nizza Millefonti / Ospedali",
      url: CANONICAL,
      description,
      areaServed: [
        { "@type": "Place", name: "Lingotto, Torino" },
        { "@type": "Place", name: "Nizza Millefonti, Torino" },
        { "@type": "Place", name: "Italia 61, Torino" },
        { "@type": "Place", name: "Molinette (Città della Salute), Torino" },
        { "@type": "Place", name: "CTO Torino" },
        { "@type": "Place", name: "Ospedale Sant'Anna, Torino" },
        { "@type": "Place", name: "Ospedale Regina Margherita, Torino" },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Torino",
        addressRegion: "TO",
        addressCountry: "IT",
      },
      telephone: "+393319053037",
      priceRange: "€€",
    },
  ];

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      // Map audience to leadType (student template reuses well for medical/students)
      const leadType: "student" | "general" =
        ["studente", "specializzando", "sanitario"].includes(data.audience)
          ? "student"
          : "general";

      // Use `nizza-millefonti-` prefix so useLeadCapture fires the priority WhatsApp ping.
      const source = `nizza-millefonti-tenant-${data.audience}`;

      const result = await submitLead(
        {
          email: data.email,
          name: data.name || undefined,
          phone: data.phone || undefined,
          leadType,
          source,
          metadata: {
            audience: data.audience,
            move_in: data.move_in,
            budget: data.budget,
            notes: data.notes || undefined,
            zone: "lingotto-nizza-millefonti-ospedali",
            page: "affitti-lingotto-ospedali-torino",
          },
        },
        {
          endpoint: FORMSPREE_ENDPOINTS.main,
          subject: "Cerca casa — Lingotto / Nizza Millefonti / Ospedali",
          extraFields: {
            audience: data.audience,
            move_in: data.move_in,
            budget: data.budget,
            notes: data.notes || "",
            zone: "lingotto-nizza-millefonti-ospedali",
          },
        },
      );

      if (result.success) {
        trackFormSubmit("affitti-lingotto-ospedali", {
          zone: "lingotto-nizza-millefonti-ospedali",
        });
        setSubmitted(true);
        toast({
          title: "Grazie!",
          description: "Ti scriviamo appena abbiamo qualcosa di adatto.",
        });
      } else {
        throw new Error(result.error);
      }
    } catch {
      toast({
        title: "Errore",
        description: "Riprova o scrivi su WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const openWa = () => {
    const audience = form.getValues("audience");
    const move = form.getValues("move_in");
    const audLabel = AUDIENCES.find((a) => a.value === audience)?.label ?? "";
    const moveLabel = MOVE_IN.find((m) => m.value === move)?.label ?? "";
    const msg = `Ciao Lorenzo, sto cercando casa in zona Lingotto / Nizza Millefonti / Ospedali${
      audLabel ? ` (${audLabel})` : ""
    }${moveLabel ? `, ingresso: ${moveLabel}` : ""}.`;
    openWhatsApp(CONTACTS.lorenzo.phone, msg);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="it_IT" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <ScrollToTop />
      <Navigation />

      <main className="pt-20 pb-24 md:pb-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Affitti Lingotto / Ospedali" },
            ]}
          />

          {/* Hero */}
          <header className="py-10 md:py-16">
            <Badge variant="secondary" className="mb-4">
              Lingotto · Nizza Millefonti · Ospedali
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              Cerca casa in zona Lingotto, Nizza Millefonti e Ospedali a Torino
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-6">
              Stanze, monolocali e bilocali a pochi minuti da Molinette, CTO,
              Sant'Anna, Regina Margherita, Dental School e Politecnico.
              Contratto regolare, gestione diretta, zero agenzia.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" onClick={openWa} className="gap-2">
                <MessageCircle className="h-5 w-5" />
                Parla con Lorenzo
              </Button>
              <a href="#waitlist">
                <Button size="lg" variant="outline">
                  Lascia le tue preferenze
                </Button>
              </a>
            </div>
            <ul className="mt-6 flex flex-wrap gap-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Zero commissioni d'agenzia
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Contratto regolare registrato
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Risposta su WhatsApp entro 1 ora
              </li>
            </ul>
          </header>

          {/* Pillars */}
          <section className="grid gap-4 md:grid-cols-3 mb-12">
            <Card className="border-border/60">
              <CardContent className="p-6">
                <Hospital className="h-6 w-6 text-primary mb-3" />
                <h2 className="text-lg font-semibold mb-2">
                  A piedi dagli ospedali
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Tempi reali verso Molinette, CTO, Sant'Anna e Regina
                  Margherita. Perfetto per turni, guardie e tirocinio.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/60">
              <CardContent className="p-6">
                <ShieldCheck className="h-6 w-6 text-primary mb-3" />
                <h2 className="text-lg font-semibold mb-2">
                  Contratto regolare
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Transitorio, studenti 6–36 mesi o 4+4: scegliamo insieme
                  quello giusto. Cedolare secca dove possibile.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/60">
              <CardContent className="p-6">
                <Home className="h-6 w-6 text-primary mb-3" />
                <h2 className="text-lg font-semibold mb-2">Zero agenzia</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Parli direttamente con Lorenzo. Niente intermediari, niente
                  fee, niente visite a vuoto.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Micro zones */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              I micro-quartieri della zona
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {MICRO_ZONES.map((z) => (
                <Card key={z.name} className="border-border/60">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        {z.name}
                      </h3>
                      <Badge variant="outline">{z.rent}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{z.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Hospitals table */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              A che distanza sono ospedali e Politecnico
            </h2>
            <div className="overflow-x-auto border rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3 font-semibold">Polo</th>
                    <th className="text-left p-3 font-semibold">A piedi</th>
                  </tr>
                </thead>
                <tbody>
                  {HOSPITALS.map((h) => (
                    <tr key={h.name} className="border-t">
                      <td className="p-3 font-medium flex items-center gap-2">
                        {h.name.includes("Politecnico") ? (
                          <GraduationCap className="h-4 w-4 text-primary" />
                        ) : (
                          <Hospital className="h-4 w-4 text-primary" />
                        )}
                        {h.name}
                      </td>
                      <td className="p-3 text-muted-foreground">{h.walk}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-muted-foreground flex items-center gap-2">
              <Train className="h-4 w-4" /> Metro Lingotto, tram 4 e linee bus
              35/52/74 a portata.
            </p>
          </section>

          {/* Waitlist Form */}
          <section
            id="waitlist"
            className="mb-12 rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Entra in lista d'attesa
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl">
              Lasciaci email e preferenze. Quando arriva qualcosa di adatto al
              tuo periodo e budget, ti scriviamo prima della pubblicazione.
            </p>

            {submitted ? (
              <div className="rounded-lg bg-background border p-6 text-center">
                <CheckCircle2 className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-1">
                  Ci siamo, grazie!
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Ti scriviamo appena abbiamo una soluzione adatta. Vuoi
                  accelerare?
                </p>
                <Button onClick={openWa} className="gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Scrivi a Lorenzo su WhatsApp
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid gap-4 md:grid-cols-2"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="tu@email.it"
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
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefono (opzionale)</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="+39 ..."
                            autoComplete="tel"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="audience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Chi sei *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleziona" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {AUDIENCES.map((a) => (
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
                    name="move_in"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quando ti serve *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleziona" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {MOVE_IN.map((m) => (
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
                    name="budget"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Budget mensile *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleziona" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {BUDGET.map((b) => (
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
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Note (opzionali)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Es. preferisco silenzio, ho un gatto, mi serve scrivania..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="consent"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2 flex items-start gap-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="text-sm text-muted-foreground leading-snug">
                          Acconsento a essere ricontattato/a da Jungle Rent via
                          email o WhatsApp per soluzioni abitative in zona.
                          Leggi la{" "}
                          <Link to="/privacy" className="underline">
                            privacy
                          </Link>
                          .
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="md:col-span-2 flex flex-col sm:flex-row gap-3">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={submitting}
                      className="gap-2"
                    >
                      {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                      Entra in lista
                    </Button>
                    <Button
                      type="button"
                      size="lg"
                      variant="outline"
                      onClick={openWa}
                      className="gap-2"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Parla subito con Lorenzo
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Domande frequenti
            </h2>
            <div className="space-y-4">
              {FAQS.map((f) => (
                <details key={f.q} className="group rounded-lg border p-4">
                  <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                    {f.q}
                    <span className="text-primary group-open:rotate-180 transition-transform">
                      ▾
                    </span>
                  </summary>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* Related */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Approfondisci</h2>
            <div className="grid gap-3 md:grid-cols-2">
              <Link
                to="/zone/nizza-millefonti-ospedali"
                className="rounded-lg border p-4 hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <div className="font-semibold">
                  Nizza Millefonti per medici e studenti sanitari
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Guida dettagliata per specializzandi e personale ospedaliero.
                </div>
              </Link>
              <Link
                to="/affitto-stanza-torino"
                className="rounded-lg border p-4 hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <div className="font-semibold">
                  Tutti i quartieri di Torino per affitto stanza
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Confronta zone, prezzi medi e tempi verso atenei e ospedali.
                </div>
              </Link>
              <Link
                to="/contratti-locazione"
                className="rounded-lg border p-4 hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <div className="font-semibold">
                  Tipi di contratto di locazione
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Transitorio, studenti, 4+4: quale fa per te.
                </div>
              </Link>
              <Link
                to="/blog/affittare-vicino-molinette-specializzandi-2026"
                className="rounded-lg border p-4 hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <div className="font-semibold">
                  Affittare vicino Molinette (guida 2026)
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Tempi reali, prezzi e cosa controllare prima di firmare.
                </div>
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

export default AffittiLingottoOspedali;
