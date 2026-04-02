import { Link } from "react-router-dom";
import { FileText, Check } from "lucide-react";
import { useBlogLanguage } from "@/hooks/useBlogLanguage";

export const ContractSidebarCard = () => {
  const lang = useBlogLanguage();

  const bullets =
    lang === "it"
      ? ["4+4 · 3+2 · Transitorio · Studenti", "Cedolare secca inclusa", "Consegna in 48h"]
      : ["4+4 · 3+2 · Temporary · Students", "Flat tax included", "48h delivery"];

  return (
    <div className="rounded-xl border border-border/50 bg-card p-5 not-prose">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <FileText className="h-4 w-4 text-primary" />
        </div>
        <h4 className="font-semibold text-foreground text-sm">
          {lang === "it" ? "Contratto su misura" : "Custom lease"}
        </h4>
      </div>

      <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
        {lang === "it"
          ? "Contratto di locazione redatto da professionisti, conforme alla normativa e pronto per la registrazione. Gratuito."
          : "Lease agreement drafted by professionals, legally compliant and ready for registration. Free."}
      </p>

      <ul className="space-y-1.5 mb-4">
        {bullets.map((item) => (
          <li key={item} className="flex items-center gap-2 text-xs text-foreground">
            <Check className="h-3 w-3 text-primary flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>

      <Link
        to={lang === "it" ? "/contratti-locazione" : "/rental-contracts"}
        className="block text-center text-sm font-semibold bg-primary text-primary-foreground rounded-lg py-2.5 hover:bg-primary/90 transition-colors"
      >
        {lang === "it" ? "Scopri i piani →" : "See plans →"}
      </Link>
    </div>
  );
};
