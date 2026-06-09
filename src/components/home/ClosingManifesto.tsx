import { useTranslation } from "react-i18next";
import { SceneReveal } from "./SceneReveal";
import { CONTACTS, MESSAGES, openWhatsApp } from "@/constants/contacts";
import { useAnalytics } from "@/hooks/useAnalytics";

/**
 * ClosingManifesto
 * Final beat before footer. Signed voice of the founder, closes
 * the narrative opened by Scene 1 of LiquidHomepageStory.
 */
export const ClosingManifesto = () => {
  const { i18n } = useTranslation();
  const isItalian = i18n.language.startsWith("it");
  const { trackClick } = useAnalytics();

  const handleTalk = () => {
    trackClick("closing_manifesto_whatsapp");
    const lang = isItalian ? "it" : "en";
    openWhatsApp(
      CONTACTS.lorenzo.phone,
      MESSAGES.investor.whatsapp[lang](CONTACTS.lorenzo.name)
    );
  };

  return (
    <section
      aria-label={isItalian ? "Manifesto di chiusura" : "Closing manifesto"}
      className="relative bg-background py-28 md:py-40 border-t border-border/30"
    >
      <div className="container mx-auto px-6 md:px-10 max-w-5xl">
        <SceneReveal>
          <div className="flex items-center gap-4 text-foreground/45">
            <span className="metric-mono text-xs text-primary">07</span>
            <span className="h-px w-12 bg-primary/25" aria-hidden="true" />
            <span className="eyebrow-mono text-foreground/60 text-xs">
              {isItalian ? "Chiusura" : "Closing"}
            </span>
            <span className="metric-mono text-xs text-foreground/40">/ 03</span>
          </div>
        </SceneReveal>

        <SceneReveal delay={100}>
          <h2 className="mt-10 font-display font-bold tracking-tighter text-foreground leading-[0.92] text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl">
            {isItalian ? (
              <>
                Torino non è una<br />
                <span className="italic font-normal text-primary">scommessa</span>.
              </>
            ) : (
              <>
                Turin is not a<br />
                <span className="italic font-normal text-primary">bet</span>.
              </>
            )}
          </h2>
        </SceneReveal>

        <SceneReveal delay={180}>
          <p className="mt-10 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
            {isItalian
              ? "È un mercato che leggo ogni giorno, palazzo per palazzo. Se vuoi entrarci con me, scrivimi su WhatsApp. Niente moduli."
              : "It's a market I read every day, building by building. If you want in with me, message me on WhatsApp. No forms."}
          </p>
        </SceneReveal>

        <SceneReveal delay={260}>
          <div className="mt-10 flex items-center gap-4">
            <div
              aria-hidden="true"
              className="w-12 h-px bg-primary/40"
            />
            <div>
              <p className="text-sm font-semibold text-foreground">Lorenzo Oni-Joseph</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isItalian ? "Founder, Jungle Rent" : "Founder, Jungle Rent"}
              </p>
            </div>
          </div>
        </SceneReveal>

        <SceneReveal delay={340}>
          <div className="mt-12">
            <button
              type="button"
              onClick={handleTalk}
              className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 font-semibold text-base hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {isItalian ? "Parla con Lorenzo" : "Talk to Lorenzo"}
              <span className="inline-block transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
            </button>
          </div>
        </SceneReveal>
      </div>
    </section>
  );
};

export default ClosingManifesto;
