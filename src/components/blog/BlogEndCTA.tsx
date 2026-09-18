import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

interface BlogEndCTAProps {
  category: string;
}

export const BlogEndCTA = ({ category }: BlogEndCTAProps) => {
  const { i18n } = useTranslation();
  const isItalian = !i18n.language.startsWith("en");

  if (category === "sellers") {
    return (
      <div className="mt-12 rounded-lg border border-border p-8">
        <p className="font-display text-xl font-bold text-foreground">
          {isItalian ? "Hai una casa da vendere a Torino?" : "Do you have a home to sell in Turin?"}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {isItalian
            ? "Range di prezzo indicativo entro 48 ore, senza commissioni di agenzia."
            : "Indicative price range within 48 hours, with no agency fees."}
        </p>
        <Button asChild className="mt-6">
          <Link to={isItalian ? "/vendi" : "/sell"}>
            {isItalian ? "Vendi casa" : "Sell your home"}
          </Link>
        </Button>
      </div>
    );
  }

  if (category === "investors") {
    return (
      <div className="mt-12 rounded-lg border border-border p-8">
        <p className="font-display text-xl font-bold text-foreground">
          {isItalian ? "Vuoi capire come investiamo?" : "Want to understand how we invest?"}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {isItalian
            ? "Ti spieghiamo il modello e ti aggiorniamo sulle operazioni."
            : "We explain the model and keep you posted on our operations."}
        </p>
        <Button asChild className="mt-6">
          <Link to={isItalian ? "/investitori" : "/investors"}>
            {isItalian ? "Area investitori" : "Investors"}
          </Link>
        </Button>
      </div>
    );
  }

  return null;
};
