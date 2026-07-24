import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Leaf } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * Public trust badge that links to the /fair-rent-pledge page.
 * Visual language mirrors StartupInnovativaBadge so the two sigilli
 * (governance + missione) sit as a matching pair in the footer.
 */
export const FairRentPledgeBadge = () => {
  const { t, i18n } = useTranslation();
  const isIt = i18n.language?.startsWith("it");

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          to="/fair-rent-pledge"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer"
          aria-label={
            isIt
              ? "Fair Rent Pledge — il nostro impegno per un affitto sostenibile"
              : "Fair Rent Pledge — our commitment to fair rentals"
          }
        >
          <Leaf className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium text-primary">
            {t("fairRentPledge.badge", "Fair Rent Pledge")}
          </span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="max-w-xs">
        <p className="text-sm">
          {t(
            "fairRentPledge.tooltip",
            isIt
              ? "Il nostro impegno pubblico: canoni allineati al mercato, contratti regolari, zero commissioni occulte."
              : "Our public commitment: market-aligned rents, registered contracts, zero hidden fees.",
          )}
        </p>
      </TooltipContent>
    </Tooltip>
  );
};
