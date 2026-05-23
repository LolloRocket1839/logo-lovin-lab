import { ReactNode, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { CheckCircle2, MessageCircle, ArrowRight } from "lucide-react";
import { Navigation, Footer, BottomNav } from "@/components/layout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CONTACTS, openWhatsApp } from "@/constants/contacts";
import { QuickSellerLeadDialog, QuickInvestorLeadDialog } from "@/components/dialogs";

export interface SeoLandingFAQ {
  q: string;
  a: string;
}

export interface SeoLandingProps {
  /** Canonical path, e.g. "/vendere-casa-senza-agenzia-torino" */
  canonicalPath: string;
  /** SEO */
  metaTitle: string;
  metaDescription: string;
  /** Hero */
  eyebrow: string;
  h1: string;
  subhead: string;
  /** Trust strip badges */
  trustBadges?: string[];
  /** Value pillars (3) */
  pillars: { icon?: ReactNode; title: string; body: string }[];
  /** Step list */
  steps: { title: string; body: string }[];
  /** Comparison rows (vs alternative) */
  comparison?: {
    leftLabel: string;
    rightLabel: string;
    rows: { feature: string; left: string; right: string }[];
  };
  /** FAQs (will be turned into JSON-LD FAQPage) */
  faqs: SeoLandingFAQ[];
  /** WhatsApp prefilled message */
  waMessage: string;
  /** Lead dialog variant */
  leadVariant: "seller" | "investor";
  /** Primary CTA label */
  primaryCtaLabel: string;
  /** Secondary CTA label */
  secondaryCtaLabel: string;
  /** Breadcrumb crumbs (without home) */
  crumbs: { name: string; href?: string }[];
  /** Internal links section */
  relatedLinks: { label: string; href: string; description?: string }[];
}

export const SeoLandingTemplate = (props: SeoLandingProps) => {
  const [leadOpen, setLeadOpen] = useState(false);
  const canonical = `https://junglerent.it${props.canonicalPath}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: props.h1,
      url: canonical,
      description: props.metaDescription,
      isPartOf: { "@id": "https://junglerent.it/#website" },
      about: { "@id": "https://junglerent.it/#organization" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: props.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://junglerent.it/" },
        ...props.crumbs.map((c, i) => ({
          "@type": "ListItem",
          position: i + 2,
          name: c.name,
          item: c.href ? `https://junglerent.it${c.href}` : canonical,
        })),
      ],
    },
  ];

  const openWa = () => openWhatsApp(CONTACTS.lorenzo.phone, props.waMessage);
  const openLead = () => setLeadOpen(true);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{props.metaTitle}</title>
        <meta name="description" content={props.metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={props.metaTitle} />
        <meta property="og:description" content={props.metaDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="it_IT" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <ScrollToTop />
      <Navigation />

      <main className="pt-20 pb-24 md:pb-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <Breadcrumbs />

          {/* Hero */}
          <header className="py-10 md:py-16">
            <Badge variant="secondary" className="mb-4">{props.eyebrow}</Badge>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              {props.h1}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-6">
              {props.subhead}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" onClick={openWa} className="gap-2">
                <MessageCircle className="h-5 w-5" />
                {props.primaryCtaLabel}
              </Button>
              <Button size="lg" variant="outline" onClick={openLead}>
                {props.secondaryCtaLabel}
              </Button>
            </div>
            {props.trustBadges && props.trustBadges.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-3 text-sm text-muted-foreground">
                {props.trustBadges.map((t) => (
                  <li key={t} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </header>

          {/* Pillars */}
          <section className="grid gap-4 md:grid-cols-3 mb-12">
            {props.pillars.map((p) => (
              <Card key={p.title} className="border-border/60">
                <CardContent className="p-6">
                  {p.icon && <div className="mb-3 text-primary">{p.icon}</div>}
                  <h2 className="text-lg font-semibold mb-2">{p.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                </CardContent>
              </Card>
            ))}
          </section>

          {/* Steps */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Come funziona</h2>
            <ol className="space-y-4">
              {props.steps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{s.title}</h3>
                    <p className="text-sm text-muted-foreground">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Comparison */}
          {props.comparison && (
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Confronto</h2>
              <div className="overflow-x-auto border rounded-lg">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 font-semibold"></th>
                      <th className="text-left p-3 font-semibold">{props.comparison.leftLabel}</th>
                      <th className="text-left p-3 font-semibold text-primary">{props.comparison.rightLabel}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.comparison.rows.map((r) => (
                      <tr key={r.feature} className="border-t">
                        <td className="p-3 font-medium">{r.feature}</td>
                        <td className="p-3 text-muted-foreground">{r.left}</td>
                        <td className="p-3 text-foreground font-medium">{r.right}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Mid CTA */}
          <section className="my-12 rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Parla con Lorenzo</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Risposta diretta su WhatsApp, di solito entro un'ora. Senza impegno.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" onClick={openWa} className="gap-2">
                <MessageCircle className="h-5 w-5" />
                {props.primaryCtaLabel}
              </Button>
              <Button size="lg" variant="outline" onClick={openLead}>
                {props.secondaryCtaLabel}
              </Button>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Domande frequenti</h2>
            <div className="space-y-4">
              {props.faqs.map((f) => (
                <details key={f.q} className="group rounded-lg border p-4">
                  <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                    {f.q}
                    <span className="text-primary group-open:rotate-180 transition-transform">▾</span>
                  </summary>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Related */}
          {props.relatedLinks.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Approfondisci</h2>
              <div className="grid gap-3 md:grid-cols-2">
                {props.relatedLinks.map((l) => (
                  <Link
                    key={l.href}
                    to={l.href}
                    className="group flex items-start justify-between gap-3 rounded-lg border p-4 hover:border-primary hover:bg-primary/5 transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-foreground">{l.label}</div>
                      {l.description && (
                        <div className="text-sm text-muted-foreground mt-1">{l.description}</div>
                      )}
                    </div>
                    <ArrowRight className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
      <BottomNav />

      {props.leadVariant === "seller" ? (
        <QuickSellerLeadDialog open={leadOpen} onOpenChange={setLeadOpen} />
      ) : (
        <QuickInvestorLeadDialog open={leadOpen} onOpenChange={setLeadOpen} />
      )}
    </div>
  );
};
