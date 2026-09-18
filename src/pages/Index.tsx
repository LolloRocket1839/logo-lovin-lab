import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import jungleRentLogo from "@/assets/jungle-rent-logo-new.svg";

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
      to: isItalian ? "/vendi" : "/sell",
      title: isItalian ? "Vendi casa a Torino" : "Sell your home in Turin",
      text: isItalian
        ? "Compriamo direttamente appartamenti difficili: ereditati, con inquilino o da ristrutturare."
        : "We buy difficult apartments directly: inherited, tenanted or in need of renovation.",
      primary: true,
    },
    {
      to: isItalian ? "/investitori" : "/investors",
      title: isItalian ? "Investitori" : "Investors",
      text: isItalian
        ? "Come funziona investire con noi su singole operazioni immobiliari a Torino."
        : "How investing with us in single Turin real-estate operations works.",
      primary: false,
    },
    {
      to: isItalian ? "/studenti" : "/students",
      title: isItalian ? "Studenti" : "Students",
      text: isItalian
        ? "Guide, quartieri e strumenti per cercare casa a Torino."
        : "Guides, neighborhoods and tools to find a home in Turin.",
      primary: false,
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

      <section className="container mx-auto px-4 py-16 text-center md:py-24">
        <img src={jungleRentLogo} alt="Jungle Rent" className="mx-auto h-20 w-20 md:h-28 md:w-28" />
        <h1 className="mx-auto mt-8 max-w-3xl font-display text-3xl font-bold leading-tight text-foreground md:text-5xl">
          {isItalian ? "Compriamo case a Torino e le affittiamo a studenti" : "We buy homes in Turin and rent them to students"}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
          {isItalian
            ? "Una società di Torino, non un'agenzia."
            : "A Turin company, not an agency."}
        </p>
      </section>

      <section className="container mx-auto px-4 pb-16 md:pb-24">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {doors.map((door) => (
            <Link
              key={door.to}
              to={door.to}
              className={`flex flex-col rounded-lg border p-8 transition-colors ${
                door.primary
                  ? "border-primary bg-primary/5 md:row-span-1"
                  : "border-border hover:border-primary/40"
              }`}
            >
              <h2 className="font-display text-xl font-bold text-foreground">{door.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{door.text}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
                {isItalian ? "Apri" : "Open"}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-5xl text-center text-xs text-muted-foreground">
          Start-up innovativa · incubata 2I3T · P.IVA 13333450016
        </p>
      </section>
    </main>
  );
};

export default Index;
