import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { Navigation, Footer, MobileHeader, MobileFooter } from "@/components/layout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, FileText, Shield, Clock, Mail, ClipboardList, Send, FileCheck, CalendarCheck } from "lucide-react";
import { CONTACTS } from "@/constants/contacts";
import { cn } from "@/lib/utils";
import { ContractRequestDialog } from "@/components/dialogs";
import { ContractsFAQ, CONTRACT_FAQ_ITEMS } from "@/components/contracts/ContractsFAQ";

const PLANS = [
  {
    id: "base",
    name: { it: "Contratto standard", en: "Standard lease" },
    price: 0,
    description: {
      it: "Contratto di locazione 4+4 o 3+2, personalizzato e pronto per la registrazione.",
      en: "4+4 or 3+2 lease agreement, customized and ready for registration.",
    },
    includes: {
      it: [
        "Contratto redatto su misura",
        "Clausole conformi alla normativa vigente",
        "Revisione inclusa entro 48h",
      ],
      en: [
        "Tailor-made contract",
        "Clauses compliant with current regulations",
        "Revision included within 48h",
      ],
    },
    popular: false,
  },
  {
    id: "transitorio",
    name: { it: "Contratto transitorio", en: "Temporary lease" },
    price: 0,
    description: {
      it: "Per esigenze temporanee documentate: contratto transitorio o per studenti universitari.",
      en: "For documented temporary needs: transitional or university student lease.",
    },
    includes: {
      it: [
        "Contratto transitorio o studenti",
        "Attestazione esigenza transitoria",
        "Clausole cedolare secca incluse",
        "Revisione inclusa entro 48h",
      ],
      en: [
        "Transitional or student contract",
        "Transitional need attestation",
        "Flat tax clauses included",
        "Revision included within 48h",
      ],
    },
    popular: true,
  },
  {
    id: "pacchetto",
    name: { it: "Pacchetto locatore", en: "Landlord package" },
    price: 0,
    description: {
      it: "Contratto + verbale di consegna + inventario beni mobili. Tutto il necessario per partire.",
      en: "Contract + handover report + furniture inventory. Everything you need to start.",
    },
    includes: {
      it: [
        "Contratto completo su misura",
        "Verbale di consegna immobile",
        "Inventario beni mobili",
        "Consulenza via email (30gg)",
        "Revisione illimitata entro 7gg",
      ],
      en: [
        "Complete tailor-made contract",
        "Property handover report",
        "Furniture inventory",
        "Email consulting (30 days)",
        "Unlimited revision within 7 days",
      ],
    },
    popular: false,
  },
];

const ContrattiLocazione = () => {
  const { i18n } = useTranslation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const lang = (i18n.language.startsWith("en") ? "en" : "it") as "it" | "en";

  const pageTitle =
    lang === "it"
      ? "Contratti di locazione su misura | Jungle Rent"
      : "Custom lease agreements | Jungle Rent";
  const pageDesc =
    lang === "it"
      ? "Contratti di locazione redatti da professionisti, conformi alla normativa italiana. Gratuito, pronti per la registrazione."
      : "Lease agreements drafted by professionals, compliant with Italian law. Free, ready for registration.";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={`https://junglerent.it/${lang === "it" ? "contratti-locazione" : "rental-contracts"}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": "https://junglerent.it/contratti-locazione#service",
            name: lang === "it" ? "Contratti di locazione su misura" : "Custom lease agreements",
            description: pageDesc,
            url: `https://junglerent.it/${lang === "it" ? "contratti-locazione" : "rental-contracts"}`,
            provider: {
              "@type": "ProfessionalService",
              "@id": "https://junglerent.it/#organization",
              name: "Jungle Rent S.r.l.",
            },
            areaServed: {
              "@type": "City",
              name: "Torino",
              "@id": "https://www.wikidata.org/wiki/Q495",
            },
            serviceType: "Lease Agreement Drafting",
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: lang === "it" ? "Piani contratti di locazione" : "Lease agreement plans",
              itemListElement: PLANS.map((plan, i) => ({
                "@type": "Offer",
                "@id": `https://junglerent.it/contratti-locazione#offer-${plan.id}`,
                name: plan.name[lang],
                description: plan.description[lang],
                price: String(plan.price),
                priceCurrency: "EUR",
                priceSpecification: {
                  "@type": "UnitPriceSpecification",
                  price: String(plan.price),
                  priceCurrency: "EUR",
                  unitText: lang === "it" ? "fisso" : "fixed",
                },
                itemOffered: {
                  "@type": "Service",
                  name: plan.name[lang],
                  description: plan.includes[lang].join(". "),
                },
                position: i + 1,
              })),
            },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://junglerent.it/" },
              {
                "@type": "ListItem",
                position: 2,
                name: lang === "it" ? "Contratti di locazione" : "Rental contracts",
                item: `https://junglerent.it/${lang === "it" ? "contratti-locazione" : "rental-contracts"}`,
              },
            ],
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: CONTRACT_FAQ_ITEMS.map((faq) => ({
              "@type": "Question",
              name: faq.q[lang],
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.a[lang],
              },
            })),
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: lang === "it" ? "Come richiedere un contratto di locazione su misura" : "How to request a custom lease agreement",
            description: lang === "it"
              ? "Quattro semplici passi per ottenere il tuo contratto su misura."
              : "Four simple steps to get your custom lease agreement.",
            totalTime: "PT72H",
            estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0" },
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: lang === "it" ? "Scegli il piano" : "Choose your plan",
                text: lang === "it"
                  ? "Seleziona il pacchetto più adatto alle tue esigenze tra Standard, Transitorio o Pacchetto locatore."
                  : "Select the package that best fits your needs: Standard, Temporary, or Landlord package.",
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: lang === "it" ? "Invia la richiesta" : "Submit your request",
                text: lang === "it"
                  ? "Compila il modulo con i tuoi dati. Ti ricontatteremo per raccogliere le informazioni necessarie."
                  : "Fill out the form with your details. We'll contact you to gather the necessary information.",
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: lang === "it" ? "Ricevi il contratto" : "Receive the contract",
                text: lang === "it"
                  ? "Entro 48-72 ore ricevi il contratto redatto su misura via email, pronto per la revisione."
                  : "Within 48-72 hours you receive the tailor-made contract via email, ready for review.",
              },
              {
                "@type": "HowToStep",
                position: 4,
                name: lang === "it" ? "Revisione e firma" : "Review and sign",
                text: lang === "it"
                  ? "Revisiona il contratto e richiedi modifiche gratuite. Poi procedi con la firma e la registrazione."
                  : "Review the contract and request free revisions. Then proceed with signing and registration.",
              },
            ],
          })}
        </script>
      </Helmet>

      <Navigation />
      <MobileHeader />

      <main id="main-content" className="min-h-screen bg-background">
        <div className="container max-w-6xl mx-auto px-4 pt-24 pb-16 md:pt-32 md:pb-24">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              {
                label: lang === "it" ? "Contratti di locazione" : "Rental contracts",
              },
            ]}
          />

          {/* Hero */}
          <div className="text-center mb-12 md:mb-16">
            <div className="relative w-full max-w-3xl mx-auto mb-8 rounded-2xl overflow-hidden shadow-lg aspect-[16/7]">
              <img
                src="/images/contratti-locazione-torino.jpg"
                alt={lang === "it" ? "Contratti di locazione su misura Torino" : "Custom lease agreements Turin"}
                className="w-full h-full object-cover"
                loading="eager"
                width={960}
                height={420}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
                <div className="inline-flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-primary-foreground" />
                  <span className="text-xs font-medium text-primary-foreground tracking-wide uppercase">
                    {lang === "it" ? "Servizi" : "Services"}
                  </span>
                </div>
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              {lang === "it"
                ? "Contratti di locazione"
                : "Lease agreements"}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {lang === "it"
                ? "Redatti su misura, conformi alla normativa italiana e pronti per la registrazione presso l'Agenzia delle Entrate. Gratuito per tutti i nostri clienti."
                : "Tailor-made, compliant with Italian law and ready for registration. Free for all our clients."}
            </p>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12 md:mb-16">
            {[
              {
                icon: Shield,
                text: lang === "it" ? "Conformi alla normativa" : "Legally compliant",
              },
              {
                icon: Clock,
                text: lang === "it" ? "Consegna in 48h" : "48h delivery",
              },
              {
                icon: Mail,
                text: lang === "it" ? "Revisione inclusa" : "Revision included",
              },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="h-4 w-4 text-primary" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {PLANS.map((plan) => (
              <Card
                key={plan.id}
                className={cn(
                  "relative flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
                  plan.popular && "border-primary/40 ring-1 ring-primary/20"
                )}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                    {lang === "it" ? "Più richiesto" : "Most popular"}
                  </Badge>
                )}
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{plan.name[lang]}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {plan.description[lang]}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-foreground">
                      {lang === "it" ? "Gratuito" : "Free"}
                    </span>
                  </div>

                  <ul className="space-y-2.5 mb-8 flex-1">
                    {plan.includes[lang].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.popular ? "default" : "outline"}
                    className="w-full"
                    onClick={() => {
                      setSelectedPlan(plan.name[lang]);
                      setDialogOpen(true);
                    }}
                  >
                    {lang === "it" ? "Richiedi ora →" : "Request now →"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Come funziona */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-3">
              {lang === "it" ? "Come funziona" : "How it works"}
            </h2>
            <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
              {lang === "it"
                ? "Quattro semplici passi per ottenere il tuo contratto su misura."
                : "Four simple steps to get your custom lease agreement."}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: ClipboardList,
                  step: 1,
                  title: { it: "Scegli il piano", en: "Choose your plan" },
                  desc: {
                    it: "Seleziona il pacchetto più adatto alle tue esigenze tra Standard, Transitorio o Pacchetto locatore.",
                    en: "Select the package that best fits your needs: Standard, Temporary, or Landlord package.",
                  },
                },
                {
                  icon: Send,
                  step: 2,
                  title: { it: "Invia la richiesta", en: "Submit your request" },
                  desc: {
                    it: "Compila il modulo con i tuoi dati. Ti ricontatteremo per raccogliere le informazioni necessarie.",
                    en: "Fill out the form with your details. We'll contact you to gather the necessary information.",
                  },
                },
                {
                  icon: FileCheck,
                  step: 3,
                  title: { it: "Ricevi il contratto", en: "Receive the contract" },
                  desc: {
                    it: "Entro 48-72 ore ricevi il contratto redatto su misura via email, pronto per la revisione.",
                    en: "Within 48-72 hours you receive the tailor-made contract via email, ready for review.",
                  },
                },
                {
                  icon: CalendarCheck,
                  step: 4,
                  title: { it: "Revisione e firma", en: "Review and sign" },
                  desc: {
                    it: "Revisiona il contratto e richiedi modifiche gratuite. Poi procedi con la firma e la registrazione.",
                    en: "Review the contract and request free revisions. Then proceed with signing and registration.",
                  },
                },
              ].map(({ icon: Icon, step, title, desc }) => (
                <div
                  key={step}
                  className="relative flex flex-col items-center text-center p-6 rounded-xl border border-border bg-card"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold text-primary tracking-wider uppercase mb-2">
                    {lang === "it" ? `Passo ${step}` : `Step ${step}`}
                  </span>
                  <h3 className="text-base font-semibold text-foreground mb-2">{title[lang]}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc[lang]}</p>
                </div>
              ))}
            </div>
          </section>

          <ContractsFAQ lang={lang} />

          {/* Footer note */}
          <p className="text-center text-sm text-muted-foreground">
            {lang === "it"
              ? "Servizio gratuito. Hai domande? "
              : "Free service. Questions? "}
            <a
              href={`mailto:${CONTACTS.email}`}
              className="text-primary font-medium hover:underline"
            >
              {lang === "it" ? "Scrivici" : "Contact us"}
            </a>
            .
          </p>
        </div>
      </main>

      <Footer />
      <MobileFooter />

      <ContractRequestDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        selectedPlan={selectedPlan}
      />
    </>
  );
};

export default ContrattiLocazione;
