import { useEffect, useState, type RefObject } from "react";
import { useTranslation } from "react-i18next";
import { MessageCircle, Mail } from "lucide-react";
import { CONTACTS, MESSAGES, openWhatsApp } from "@/constants/contacts";
import { useAnalytics } from "@/hooks/useAnalytics";

interface Props {
  formRef: RefObject<HTMLElement>;
  emailAnchorId?: string;
}

/**
 * Mobile-only sticky CTA bar for the /investitori page.
 * Two actions: WhatsApp Lorenzo + scroll to email form.
 * Hides itself when the full RequestInfoForm enters viewport.
 */
export const InvestorStickyCTA = ({ formRef, emailAnchorId = "email-first" }: Props) => {
  const { t, i18n } = useTranslation();
  const { trackEvent } = useAnalytics();
  const [visible, setVisible] = useState(false);
  const [hiddenByForm, setHiddenByForm] = useState(false);
  const lang = i18n.language.startsWith("en") ? "en" : "it";

  // Show after a small scroll so it doesn't appear above the hero
  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide when the qualification form is in view
  useEffect(() => {
    const el = formRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setHiddenByForm(entry.isIntersecting));
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [formRef]);

  const handleWhatsApp = () => {
    trackEvent("investor_sticky_cta_click", { action: "whatsapp" });
    const message = MESSAGES.investor.whatsapp[lang](CONTACTS.lorenzo.name);
    openWhatsApp(CONTACTS.lorenzo.phone, message);
  };

  const handleEmail = () => {
    trackEvent("investor_sticky_cta_click", { action: "email_scroll" });
    const target = document.getElementById(emailAnchorId);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
    // Focus the email field after scroll completes
    setTimeout(() => {
      document.getElementById("ef-email")?.focus();
    }, 600);
  };

  if (!visible || hiddenByForm) return null;

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border/60 px-3 pt-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] shadow-[0_-4px_16px_-4px_rgba(0,0,0,0.08)]"
      role="region"
      aria-label={t("investor.landing.stickyCta.label", { defaultValue: "Azioni rapide" })}
    >
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleWhatsApp}
          className="flex-1 inline-flex items-center justify-center gap-1.5 h-11 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 active:scale-[0.98] transition-all"
        >
          <MessageCircle className="w-4 h-4" strokeWidth={2} />
          <span>WhatsApp Lorenzo</span>
        </button>
        <button
          type="button"
          onClick={handleEmail}
          className="flex-1 inline-flex items-center justify-center gap-1.5 h-11 rounded-full bg-background text-foreground border border-border text-sm font-medium hover:bg-cream/60 active:scale-[0.98] transition-all"
        >
          <Mail className="w-4 h-4" strokeWidth={2} />
          <span>{lang === "en" ? "Leave email" : "Lascia email"}</span>
        </button>
      </div>
    </div>
  );
};
