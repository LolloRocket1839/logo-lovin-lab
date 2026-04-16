import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Bell, TrendingUp, ArrowRight } from "lucide-react";
import { CONTACTS } from "@/constants";
import { useABTest } from "@/hooks/useABTest";
import { INLINE_CTAS, type InlineCTAVariant } from "@/data/blog/inlineCTAs";
import { WaitlistDialog } from "@/components/dialogs";
import { useState } from "react";

interface InlineContextualCTAProps {
  slug: string;
  lang: "it" | "en";
}

const ICONS: Record<InlineCTAVariant, typeof Bell> = {
  whatsapp: MessageCircle,
  waitlist: Bell,
  investor: TrendingUp,
};

export const InlineContextualCTA = ({ slug, lang }: InlineContextualCTAProps) => {
  const config = INLINE_CTAS[slug];
  const { variation, trackImpression, trackClick } = useABTest("blog_inline_cta");
  const [showWaitlist, setShowWaitlist] = useState(false);

  useEffect(() => {
    if (config) trackImpression();
  }, [config, trackImpression]);

  if (!config) return null;

  const copy = config[lang];
  const Icon = ICONS[config.variant];

  const handleClick = () => {
    trackClick();
    if (config.variant === "waitlist") {
      setShowWaitlist(true);
      return;
    }
    const message = encodeURIComponent(copy.title);
    const phone = CONTACTS.lorenzo.phone.replace("+", "");
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  // Variant B: more prominent gradient card with stronger contrast
  const isVariantB = variation === "B";

  return (
    <>
      <aside
        role="complementary"
        aria-label={copy.eyebrow}
        className={`my-10 not-prose rounded-2xl border ${
          isVariantB
            ? "bg-gradient-to-br from-primary/15 via-primary/5 to-background border-primary/30 shadow-lg shadow-primary/5"
            : "bg-muted/40 border-border"
        } p-6 md:p-7`}
      >
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <div className="flex-shrink-0">
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                isVariantB ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
              }`}
            >
              <Icon className="w-5 h-5" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs uppercase tracking-wider font-semibold text-primary mb-1">
              {copy.eyebrow}
            </p>
            <h3 className="text-lg md:text-xl font-display font-bold leading-tight mb-1">
              {copy.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {copy.description}
            </p>
          </div>
          <div className="flex-shrink-0">
            <Button onClick={handleClick} size="lg" className="group w-full sm:w-auto">
              {copy.button}
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>
        </div>
      </aside>

      <WaitlistDialog open={showWaitlist} onOpenChange={setShowWaitlist} />
    </>
  );
};
