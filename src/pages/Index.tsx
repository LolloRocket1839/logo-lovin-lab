import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, GraduationCap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { i18n } = useTranslation();
  const isItalian = !i18n.language.startsWith("en");

  const title = isItalian
    ? "Jungle Rent — Compriamo e affittiamo case a Torino"
    : "Jungle Rent — We buy and rent apartments in Turin";

  const description = isItalian
    ? "Jungle Rent S.r.l., start-up innovativa di Torino: compriamo appartamenti da ristrutturare o con inquilino e li affittiamo a studenti."
    : "Jungle Rent S.r.l., innovative start-up in Turin: we buy apartments to renovate or with tenants and rent them to students.";

  const doors = [
    {
      to: isItalian ? "/vendi" : "/en/vendi",
      title: isItalian ? "Vendi casa a Torino" : "Sell your home in Turin",
      text: isItalian
        ? "Compriamo direttamente appartamenti difficili: ereditati, con inquilino o da ristrutturare."
        : "We buy difficult apartments directly: inherited, tenanted or in need of renovation.",
      primary: true,
      icon: Building2,
    },
    {
      to: isItalian ? "/investitori" : "/en/investitori",
      title: isItalian ? "Investitori" : "Investors",
      text: isItalian
        ? "Come funziona investire con noi su singole operazioni immobiliari a Torino."
        : "How investing with us in single Turin real-estate operations works.",
      primary: false,
      icon: TrendingUp,
    },
    {
      to: isItalian ? "/studenti" : "/en/studenti",
      title: isItalian ? "Studenti" : "Students",
      text: isItalian
        ? "Guide, quartieri e strumenti per cercare casa a Torino."
        : "Guides, neighborhoods and tools to find a home in Turin.",
      primary: false,
      icon: GraduationCap,
    },
  ];

  return (
    <main id="main-content" role="main" className="bg-background">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="https://junglerent.it/" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://junglerent.it/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://junglerent.it/og-image-homepage.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <section className="relative flex min-h-[85svh] items-end overflow-hidden bg-primary md:min-h-[680px] md:items-center">
        <img
          src="/images/mole-tramonto-torino.jpeg"
          alt="Torino al tramonto con la Mole Antonelliana"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-primary/70" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-24 md:py-24">
          <div className="max-w-3xl text-primary-foreground">
            <h1 className="font-display text-[38px] font-normal leading-[1.05] tracking-[-0.01em] md:text-[56px]">
              {isItalian ? "Compriamo case a Torino e le affittiamo a studenti" : "We buy homes in Turin and rent them to students"}
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-primary-foreground/90">
              {isItalian ? "Una società di Torino, non un'agenzia." : "A Turin company, not an agency."}
            </p>
            <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <Button asChild className="w-full bg-background text-primary hover:bg-background/90 sm:w-auto">
                <Link to={isItalian ? "/vendi" : "/en/vendi"}>
                  {isItalian ? "Vendi il tuo appartamento" : "Sell your apartment"}
                </Link>
              </Button>
              <Link
                to={isItalian ? "/investitori" : "/en/investitori"}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground underline underline-offset-4"
              >
                {isItalian ? "Sei un investitore?" : "Are you an investor?"}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-16 md:py-24">
        <div className="grid border-t border-border/60 md:grid-cols-3 md:gap-6 md:border-0">
          {doors.map((door) => {
            const Icon = door.icon;
            return (
            <Link
              key={door.to}
              to={door.to}
              className={`group flex items-center gap-4 border-b border-border/60 py-6 transition-colors duration-150 md:min-h-64 md:flex-col md:items-start md:rounded-2xl md:border md:p-6 md:shadow-[var(--shadow-card)] ${
                door.primary
                  ? "md:border-primary md:bg-primary md:text-primary-foreground"
                  : "md:bg-background hover:bg-primary/10"
              }`}
            >
              <Icon className={`h-6 w-6 shrink-0 ${door.primary ? "text-primary md:text-primary-foreground" : "text-primary"}`} aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <h2 className={`font-display text-2xl font-normal ${door.primary ? "md:text-primary-foreground" : "text-foreground"}`}>{door.title}</h2>
                <p className={`mt-1 text-sm leading-relaxed md:mt-4 ${door.primary ? "text-muted-foreground md:text-primary-foreground/85" : "text-muted-foreground"}`}>{door.text}</p>
              </div>
              <ArrowRight className={`h-5 w-5 shrink-0 md:mt-auto ${door.primary ? "text-primary md:text-primary-foreground" : "text-primary"}`} aria-hidden="true" />
            </Link>
          )})}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Start-up innovativa · incubata 2I3T · P.IVA 13333450016
        </p>
      </section>
    </main>
  );
};

export default Index;
