import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Users, ShieldCheck } from "lucide-react";

export const SocialProofMini = () => {
  const { t } = useTranslation();
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;
    supabase.functions
      .invoke("get-investor-interest-count")
      .then(({ data }) => {
        if (mounted && data?.count !== undefined) setCount(data.count);
      })
      .catch(() => {
        // silent fail — fallback to static fallback
      });
    return () => {
      mounted = false;
    };
  }, []);

  // Fallback: if no live count, show a credible baseline derived from real seed
  const displayCount = count !== null && count > 0 ? count : null;

  return (
    <section className="py-6 md:py-8 bg-cream">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-center sm:justify-between">
          {displayCount !== null && (
            <div className="flex gap-3 items-center">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 text-primary" strokeWidth={1.75} />
              </div>
              <p className="text-sm text-foreground/85 leading-snug">
                <span className="font-medium text-foreground">
                  {t("investor.landing.socialProof.countPrefix", { count: displayCount })}
                </span>{" "}
                {t("investor.landing.socialProof.countSuffix")}
              </p>
            </div>
          )}
          <div className="flex gap-3 items-center">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-4 h-4 text-primary" strokeWidth={1.75} />
            </div>
            <p className="text-sm text-foreground/85 leading-snug">
              <span className="font-medium text-foreground">
                {t("investor.landing.socialProof.startupLabel")}
              </span>{" "}
              {t("investor.landing.socialProof.startupSuffix")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
