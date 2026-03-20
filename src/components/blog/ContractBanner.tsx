import { Link } from "react-router-dom";
import { FileText, ArrowRight } from "lucide-react";
import { useBlogLanguage } from "@/hooks/useBlogLanguage";

export const ContractBanner = () => {
  const lang = useBlogLanguage();

  return (
    <div className="my-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-4 rounded-lg bg-primary/5 border border-primary/20 not-prose">
      <FileText className="h-5 w-5 text-primary flex-shrink-0" />
      <p className="flex-1 text-sm text-foreground leading-relaxed">
        {lang === "it"
          ? "Hai bisogno di un contratto di locazione? Da €89, redatto su misura e pronto per la registrazione."
          : "Need a lease agreement? From €89, tailor-made and ready for registration."}
      </p>
      <Link
        to={lang === "it" ? "/contratti-locazione" : "/rental-contracts"}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors whitespace-nowrap"
      >
        {lang === "it" ? "Richiedi preventivo" : "Get a quote"}
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
};
