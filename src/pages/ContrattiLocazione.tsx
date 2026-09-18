import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { ContractRequestDialog } from "@/components/dialogs";
import { ContractsFAQ } from "@/components/contracts/ContractsFAQ";

const ContrattiLocazione = () => {
  const { i18n } = useTranslation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const lang = (i18n.language.startsWith("en") ? "en" : "it") as "it" | "en";
  const isItalian = lang === "it";

  const pageTitle = isItalian
    ? "Contratti di locazione su misura | Jungle Rent"
    : "Custom lease agreements | Jungle Rent";
  const pageDesc = isItalian
    ? "Contratti di locazione redatti su misura e conformi alla normativa italiana, pronti per la registrazione."
    : "Tailor-made lease agreements compliant with Italian law, ready for registration.";

  return (
    <main role="main">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link
          rel="canonical"
          href={`https://junglerent.it/${isItalian ? "contratti-locazione" : "rental-contracts"}`}
        />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <section className="container mx-auto max-w-[720px] px-4 py-16 md:py-24">
        <h1 className="font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
          {isItalian ? "Contratti di locazione su misura" : "Tailor-made lease agreements"}
        </h1>

        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          {isItalian
            ? "Scrivici che tipo di contratto ti serve (4+4, 3+2, transitorio o per studenti), l'indirizzo dell'immobile e la durata che hai in mente. Ti rispondiamo entro 48 ore con il testo pronto per la registrazione."
            : "Tell us which contract you need (4+4, 3+2, transitional or student), the property address and the duration you have in mind. We reply within 48 hours with a text ready for registration."}
        </p>

        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {isItalian
            ? "Il testo segue le regole in vigore e gli accordi territoriali di Torino. Se dopo la lettura vuoi cambiare qualcosa, lo rivediamo insieme."
            : "The text follows current rules and the Turin territorial agreements. If you want to change something after reading it, we revise it together."}
        </p>

        <Button className="mt-8" onClick={() => setDialogOpen(true)}>
          {isItalian ? "Scrivi a Lorenzo" : "Write to Lorenzo"}
        </Button>
      </section>

      <section className="container mx-auto max-w-[720px] px-4 pb-16 md:pb-24">
        <h2 className="font-display text-2xl font-bold text-foreground">
          {isItalian ? "Domande frequenti" : "Frequently asked questions"}
        </h2>
        <div className="mt-6">
          <ContractsFAQ lang={lang} />
        </div>
      </section>

      <ContractRequestDialog open={dialogOpen} onOpenChange={setDialogOpen} selectedPlan="" />
    </main>
  );
};

export default ContrattiLocazione;
