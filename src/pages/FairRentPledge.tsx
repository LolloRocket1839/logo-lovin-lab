import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Leaf,
  FileCheck,
  Wallet,
  HeartHandshake,
  Hammer,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { CONTACTS, openGeneralEmail } from "@/constants";

/**
 * /fair-rent-pledge — public trust page that documents Jungle Rent's
 * self-declared commitments for a sustainable rental model.
 *
 * This is app-owned editable content signed by Lorenzo (Amministratore Unico).
 * We do NOT claim third-party certifications; each commitment points to a
 * fact already published on the site (contracts service, EU FSE+ funding,
 * Startup Innovativa registry, zone prices, etc.).
 */
const LAST_UPDATED_ISO = "2026-07-24";

const FairRentPledge = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isIt = i18n.language?.startsWith("it");
  const canonical = `https://junglerent.it${location.pathname}`;

  const lastUpdatedLabel = new Date(LAST_UPDATED_ISO).toLocaleDateString(
    isIt ? "it-IT" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" },
  );

  const commitments = isIt
    ? [
        {
          icon: Wallet,
          title: "Canoni allineati al mercato reale",
          body: "I nostri prezzi seguono i valori OMI dell'Agenzia delle Entrate e le medie di zona pubblicate apertamente sul sito, non le aspettative gonfiate del proprietario. Se il canone non regge un confronto pubblico, non lo proponiamo.",
          proofLabel: "Vedi prezzi zona per zona",
          proofHref: "/investitori/zone",
        },
        {
          icon: FileCheck,
          title: "Solo contratti regolari e registrati",
          body: "4+4, 3+2 concordato, transitori per studenti secondo Legge 431/1998. Registrazione all'Agenzia delle Entrate sempre inclusa. Nessun nero, nessun \"in bianco parziale\", nessun accordo verbale che scarica il rischio sull'inquilino.",
          proofLabel: "Servizio contratti gratuito",
          proofHref: "/contratti-locazione",
        },
        {
          icon: HeartHandshake,
          title: "Trasparenza totale sui costi",
          body: "Zero commissioni occulte a inquilino o venditore. Il servizio di stesura contratti è gratuito. Tutto quello che paghi è scritto prima di firmare, in una sola pagina.",
          proofLabel: "Come vendi con noi",
          proofHref: "/vendere-senza-agenzia",
        },
        {
          icon: ShieldCheck,
          title: "Zero speculazione sul disagio abitativo",
          body: "Il nostro target sono bilocali €45k–€70k in nove quartieri di Torino, non luxury flip. Compriamo case che nessuno vuole più gestire e le rimettiamo a reddito accessibile per studenti e famiglie della zona.",
          proofLabel: "Quartieri prioritari",
          proofHref: "/investitori/zone",
        },
        {
          icon: Hammer,
          title: "Riqualificazione, non estrazione",
          body: "Ogni immobile viene ristrutturato con classe energetica dichiarata, impianti a norma e arredi nuovi prima di essere affittato. Non estraiamo rendita da spazi degradati: li rimettiamo in circolo.",
          proofLabel: "Il nostro modello",
          proofHref: "/chi-siamo",
        },
        {
          icon: MessageCircle,
          title: "Accountability pubblica",
          body: "Questa pagina è versionata e pubblica. Lorenzo Oni-Joseph — unico amministratore e socio — risponde direttamente su WhatsApp per ogni impegno che leggi qui. Se un impegno non è rispettato, scrivici e correggiamo.",
          proofLabel: "Parla con Lorenzo",
          proofHref: `https://wa.me/${CONTACTS.lorenzo.phone.replace(/[^0-9]/g, "")}`,
          external: true,
        },
      ]
    : [
        {
          icon: Wallet,
          title: "Rents aligned with the real market",
          body: "Our prices follow the OMI reference values from the Italian Revenue Agency and the neighborhood averages we publish openly on this site — not inflated owner expectations. If a rent can't survive a public comparison, we don't list it.",
          proofLabel: "See prices by neighborhood",
          proofHref: "/investors/zones",
        },
        {
          icon: FileCheck,
          title: "Only regular, registered contracts",
          body: "4+4, 3+2 canone concordato, student transitional leases under Italian Law 431/1998. Registration with the Revenue Agency is always included. No cash-only side deals, no partial disclosure, no verbal agreements that shift risk onto the tenant.",
          proofLabel: "Free contract service",
          proofHref: "/contratti-locazione",
        },
        {
          icon: HeartHandshake,
          title: "Full cost transparency",
          body: "Zero hidden fees for tenants or sellers. Our contract drafting service is free. Every euro you pay is written down before you sign, on a single page.",
          proofLabel: "How you sell with us",
          proofHref: "/vendere-senza-agenzia",
        },
        {
          icon: ShieldCheck,
          title: "No speculation on the housing crisis",
          body: "We target €45k–€70k two-room apartments across nine Turin neighborhoods, not luxury flips. We buy homes no owner wants to manage anymore and put them back on the market at rents students and local families can actually afford.",
          proofLabel: "Priority neighborhoods",
          proofHref: "/investors/zones",
        },
        {
          icon: Hammer,
          title: "Requalification, not extraction",
          body: "Every property is renovated with a declared energy class, compliant systems, and new furniture before it's rented. We don't extract rent from decaying spaces — we put them back into circulation.",
          proofLabel: "Our model",
          proofHref: "/about",
        },
        {
          icon: MessageCircle,
          title: "Public accountability",
          body: "This page is versioned and public. Lorenzo Oni-Joseph — sole director and sole shareholder — answers on WhatsApp for every commitment on this page. If one of them isn't respected, message us and we fix it.",
          proofLabel: "Talk to Lorenzo",
          proofHref: `https://wa.me/${CONTACTS.lorenzo.phone.replace(/[^0-9]/g, "")}`,
          external: true,
        },
      ];

  const pageTitle = isIt
    ? "Fair Rent Pledge — il nostro impegno per un affitto sostenibile | Jungle Rent"
    : "Fair Rent Pledge — our commitment to fair rentals | Jungle Rent";
  const pageDescription = isIt
    ? "Sei impegni pubblici e verificabili di Jungle Rent per un modello di affitto sostenibile a Torino: canoni allineati OMI, contratti regolari, zero commissioni occulte, riqualificazione degli immobili."
    : "Six public, verifiable commitments from Jungle Rent for a sustainable rental model in Turin: OMI-aligned rents, registered contracts, zero hidden fees, property requalification.";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Jungle Rent S.r.l.",
    url: "https://junglerent.it",
    ethicsPolicy: canonical,
    slogan: isIt
      ? "Fair Rent Pledge — affitto sostenibile a Torino"
      : "Fair Rent Pledge — sustainable rentals in Turin",
    founder: {
      "@type": "Person",
      name: "Lorenzo Oni-Joseph",
      jobTitle: "Amministratore Unico",
    },
  };

  return (
    <main
      role="main"
      className="min-h-screen bg-gradient-subtle"
    >
      <Helmet>
        <html lang={isIt ? "it" : "en"} />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonical} />
        <link
          rel="alternate"
          hrefLang="it"
          href="https://junglerent.it/fair-rent-pledge"
        />
        <link
          rel="alternate"
          hrefLang="en"
          href="https://junglerent.it/fair-rent-pledge"
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://junglerent.it/fair-rent-pledge"
        />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="container px-4 md:px-8 pt-20 md:pt-28 pb-12 md:pb-16 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8">
          <Leaf className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium text-primary tracking-wide uppercase">
            {isIt ? "Impegno pubblico" : "Public pledge"}
          </span>
        </div>

        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
          {isIt
            ? "Fair Rent Pledge"
            : "Fair Rent Pledge"}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mb-6">
          {isIt
            ? "Il nostro impegno pubblico per un modello di affitto sostenibile a Torino. Sei promesse concrete, ciascuna con una prova che puoi verificare adesso sul sito."
            : "Our public commitment to a sustainable rental model in Turin. Six concrete promises, each with a proof you can verify right now on this site."}
        </p>
        <p className="text-sm text-muted-foreground/80 font-light">
          {isIt
            ? `Ultimo aggiornamento: ${lastUpdatedLabel}. Pagina firmata da Lorenzo Oni-Joseph, Amministratore Unico di Jungle Rent S.r.l.`
            : `Last updated: ${lastUpdatedLabel}. Signed by Lorenzo Oni-Joseph, sole director of Jungle Rent S.r.l.`}
        </p>
      </section>

      {/* Commitments */}
      <section className="container px-4 md:px-8 pb-16 md:pb-24 max-w-4xl mx-auto">
        <ol className="space-y-6 md:space-y-8 list-none p-0">
          {commitments.map((c, idx) => {
            const Icon = c.icon;
            const number = String(idx + 1).padStart(2, "0");
            return (
              <li
                key={c.title}
                className="group bg-background/60 border border-border/40 rounded-2xl p-6 md:p-8 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start gap-4 md:gap-6">
                  <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3 mb-3">
                      <span className="text-xs font-mono text-muted-foreground/60 tracking-wider">
                        {number}
                      </span>
                      <h2 className="font-display text-xl md:text-2xl font-bold text-foreground tracking-tight">
                        {c.title}
                      </h2>
                    </div>
                    <p className="text-base text-muted-foreground font-light leading-relaxed mb-4">
                      {c.body}
                    </p>
                    {c.external ? (
                      <a
                        href={c.proofHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors group/link"
                      >
                        {c.proofLabel}
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
                      </a>
                    ) : (
                      <Link
                        to={c.proofHref}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors group/link"
                      >
                        {c.proofLabel}
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Signature + institutional refs */}
      <section className="container px-4 md:px-8 pb-24 md:pb-32 max-w-4xl mx-auto">
        <div className="border-t border-border/30 pt-12">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground/70 mb-4 font-medium">
              {isIt ? "Firmato" : "Signed"}
            </p>
            <p className="font-display text-2xl md:text-3xl text-foreground mb-2">
              Lorenzo Oni-Joseph
            </p>
            <p className="text-sm text-muted-foreground font-light mb-8">
              {isIt
                ? "Amministratore Unico e unico socio — Jungle Rent S.r.l."
                : "Sole director and sole shareholder — Jungle Rent S.r.l."}
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <a
                href={`https://wa.me/${CONTACTS.lorenzo.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                {isIt ? "Parla con Lorenzo" : "Talk to Lorenzo"}
              </a>
              <button
                type="button"
                onClick={() => openGeneralEmail(isIt ? "it" : "en")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-background border border-border/60 text-foreground text-sm font-medium hover:border-primary/40 hover:text-primary transition-colors"
              >
                {isIt ? "Scrivi via email" : "Write us an email"}
              </button>
            </div>

            <div className="rounded-xl bg-muted/40 border border-border/30 p-5 space-y-3">
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground/70 font-medium">
                {isIt ? "Riferimenti istituzionali" : "Institutional references"}
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground font-light">
                <li>
                  <a
                    href="https://startup.registroimprese.it/isin/dettaglio/16544950010/IT/profilo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors underline underline-offset-4 decoration-muted-foreground/30"
                  >
                    {isIt
                      ? "Iscrizione al Registro Speciale delle Start-up Innovative"
                      : "Registered on the Italian Innovative Startups Registry"}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.regione.piemonte.it/web/temi/fondi-europei/fondo-sociale-europeo/pr-fse-2021-2027"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors underline underline-offset-4 decoration-muted-foreground/30"
                  >
                    PR FSE+ 2021-2027 Regione Piemonte — Misura 8 e Misura 9
                  </a>
                </li>
                <li>
                  {isIt
                    ? "Contratti secondo Legge 431/1998 e Decreto MIT 16 gennaio 2017"
                    : "Contracts under Italian Law 431/1998 and MIT Decree 16 January 2017"}
                </li>
              </ul>
            </div>

            <p className="text-xs text-muted-foreground/70 font-light mt-6 leading-relaxed">
              {isIt
                ? "Questa pagina è mantenuta da Jungle Rent S.r.l. Non è una certificazione rilasciata da un ente terzo: è un impegno pubblico e verificabile firmato dall'unico amministratore della società."
                : "This page is maintained by Jungle Rent S.r.l. It is not a third-party certification: it is a public, verifiable commitment signed by the company's sole director."}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FairRentPledge;
