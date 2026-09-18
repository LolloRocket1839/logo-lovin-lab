import { useRef, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FAQSection = lazy(() =>
  import("@/components/investitori/FAQSection").then((m) => ({ default: m.FAQSection }))
);
const RequestInfoForm = lazy(() =>
  import("@/components/investitori/RequestInfoForm").then((m) => ({ default: m.RequestInfoForm }))
);
const LegalDisclaimerFooter = lazy(() =>
  import("@/components/investitori/LegalDisclaimerFooter").then((m) => ({ default: m.LegalDisclaimerFooter }))
);

const SectionFallback = () => <div className="min-h-[200px]" aria-hidden="true" />;

const Investors = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const formRef = useRef<HTMLElement>(null);
  const isEnPath = location.pathname.startsWith("/investors") || i18n.language.startsWith("en");
  const canonical = location.pathname.startsWith("/investors")
    ? "https://junglerent.it/investors"
    : "https://junglerent.it/investitori";

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const points = isEnPath
    ? [
        {
          title: "One operation at a time",
          text: "Each investment is tied to a single Turin property, not to a generic fund.",
        },
        {
          title: "Student rentals",
          text: "We buy, renovate and rent apartments to university students in Turin.",
        },
        {
          title: "Written information first",
          text: "No online subscription: you request the memorandum, read it, then decide.",
        },
      ]
    : [
        {
          title: "Una operazione alla volta",
          text: "Ogni investimento è legato a un singolo immobile torinese, non a un fondo generico.",
        },
        {
          title: "Affitti a studenti",
          text: "Compriamo, ristrutturiamo e affittiamo appartamenti a studenti universitari a Torino.",
        },
        {
          title: "Prima le informazioni scritte",
          text: "Nessuna sottoscrizione online: richiedi il memorandum, leggilo con calma, poi decidi.",
        },
      ];

  return (
    <main role="main" className="bg-background">
      <Helmet>
        <title>{t("investor.landing.meta.title")}</title>
        <meta name="description" content={t("investor.landing.meta.description")} />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="it" href="https://junglerent.it/investitori" />
        <link rel="alternate" hrefLang="en" href="https://junglerent.it/investors" />
        <link rel="alternate" hrefLang="x-default" href="https://junglerent.it/investitori" />
        <meta property="og:title" content={t("investor.landing.meta.title")} />
        <meta property="og:description" content={t("investor.landing.meta.description")} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
      </Helmet>

      <section className="container mx-auto max-w-3xl px-4 py-16 md:py-24">
        <h1 className="font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
          {t("investor.landing.hero.h1")}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {isEnPath
            ? "Jungle Rent is an innovative start-up in Turin. We buy apartments, renovate them and rent them to students."
            : "Jungle Rent è una start-up innovativa torinese. Compriamo appartamenti, li ristrutturiamo e li affittiamo a studenti."}
        </p>
        <Button className="mt-8" onClick={scrollToForm}>
          {t("investor.landing.hero.ctaSecondary")}
        </Button>
      </section>

      <section className="container mx-auto max-w-5xl px-4 pb-16 md:pb-24">
        <div className="grid gap-8 md:grid-cols-3">
          {points.map((p) => (
            <div key={p.title}>
              <h2 className="font-display text-lg font-bold text-foreground">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <Suspense fallback={<SectionFallback />}>
        <RequestInfoForm ref={formRef} />
        <FAQSection />
        <LegalDisclaimerFooter />
      </Suspense>
    </main>
  );
};

export default Investors;
