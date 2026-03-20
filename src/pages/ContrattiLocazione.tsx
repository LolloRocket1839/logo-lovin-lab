import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { Navigation, Footer, MobileHeader, MobileFooter } from "@/components/layout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, FileText, Shield, Clock, Mail } from "lucide-react";
import { CONTACTS } from "@/constants/contacts";
import { cn } from "@/lib/utils";
import { ContractRequestDialog } from "@/components/dialogs";

const PLANS = [
  {
    id: "base",
    name: { it: "Contratto standard", en: "Standard lease" },
    price: 89,
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
    price: 109,
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
    price: 149,
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
      ? "Contratti di locazione redatti da professionisti, conformi alla normativa italiana. Da €89, pronti per la registrazione."
      : "Lease agreements drafted by professionals, compliant with Italian law. From €89, ready for registration.";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={`https://junglerent.it/${lang === "it" ? "contratti-locazione" : "rental-contracts"}`} />
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
            <div className="inline-flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary tracking-wide uppercase">
                {lang === "it" ? "Servizi" : "Services"}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              {lang === "it"
                ? "Contratti di locazione"
                : "Lease agreements"}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {lang === "it"
                ? "Redatti su misura, conformi alla normativa italiana e pronti per la registrazione presso l'Agenzia delle Entrate. Prezzo fisso, nessuna sorpresa."
                : "Tailor-made, compliant with Italian law and ready for registration. Fixed price, no surprises."}
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
                    <span className="text-4xl font-bold text-foreground">€{plan.price}</span>
                    <span className="text-muted-foreground ml-1 text-sm">
                      / {lang === "it" ? "fisso" : "fixed"}
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

          {/* Footer note */}
          <p className="text-center text-sm text-muted-foreground">
            {lang === "it"
              ? "Pagamento dopo consegna del contratto. Hai domande? "
              : "Payment after contract delivery. Questions? "}
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
    </>
  );
};

export default ContrattiLocazione;
