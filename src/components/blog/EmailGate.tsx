import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { FORMSPREE_ENDPOINTS } from "@/constants/formspree";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Mail, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

interface EmailGateProps {
  slug: string;
  lang: 'it' | 'en';
  children: React.ReactNode;
}

const copy = {
  it: {
    headline: "Inserisci la tua email per leggere l'articolo completo",
    subtitle: "Contenuto gratuito, riservato a chi vuole restare aggiornato sulle novità fiscali per investitori immobiliari.",
    placeholder: "La tua email",
    cta: "Sblocca l'articolo",
    trust1: "Niente spam, mai.",
    trust2: "Accesso immediato e gratuito",
    sending: "Invio in corso...",
    success: "Articolo sbloccato! Buona lettura 📖",
    error: "Errore nell'invio. Riprova.",
  },
  en: {
    headline: "Enter your email to read the full article",
    subtitle: "Free content, reserved for those who want to stay updated on tax news for real estate investors.",
    placeholder: "Your email",
    cta: "Unlock article",
    trust1: "No spam, ever.",
    trust2: "Instant, free access",
    sending: "Sending...",
    success: "Article unlocked! Enjoy reading 📖",
    error: "Error submitting. Please try again.",
  },
};

export const EmailGate = ({ slug, lang, children }: EmailGateProps) => {
  const [unlocked, setUnlocked] = useLocalStorage(`blog_unlocked_${slug}`, false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const t = copy[lang];

  if (unlocked) {
    return <>{children}</>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;

    setLoading(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINTS.main, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          _subject: `📘 CEDOLARE SECCA GATE - ${email.trim()}`,
          source: `blog_gate_${slug}`,
          language: lang,
        }),
      });

      if (res.ok) {
        setUnlocked(true);
        toast.success(t.success);
      } else {
        toast.error(t.error);
      }
    } catch {
      toast.error(t.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Preview: first portion visible, rest hidden behind gate */}
      <div className="max-h-[600px] overflow-hidden relative">
        {children}
        {/* Gradient fade overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/95 to-transparent pointer-events-none" />
      </div>

      {/* Email gate card */}
      <div className="relative -mt-16 z-10 mx-auto max-w-lg">
        <div className="rounded-2xl border-2 border-primary/20 bg-card p-6 sm:p-8 shadow-xl text-center space-y-5">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mx-auto">
            <Lock className="w-7 h-7 text-primary" />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">{t.headline}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t.subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.placeholder}
                className="pl-10"
                disabled={loading}
              />
            </div>
            <Button type="submit" disabled={loading} className="whitespace-nowrap">
              {loading ? t.sending : t.cta}
            </Button>
          </form>

          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              {t.trust1}
            </span>
            <span>•</span>
            <span>{t.trust2}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
