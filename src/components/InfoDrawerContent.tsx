import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { 
  Building2, 
  TrendingUp, 
  Users, 
  Shield, 
  Search, 
  FileText, 
  CheckCircle,
  ArrowRight,
  GraduationCap,
  Wallet,
  Home,
  Key,
  Sparkles
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import logo2i3t from "@/assets/2i3t-logo-green.png";

const steps = [
  { key: "search", icon: Search },
  { key: "analyze", icon: FileText },
  { key: "acquire", icon: Key },
  { key: "manage", icon: Home },
  { key: "earn", icon: Wallet },
];

const investorBenefits = [
  { icon: TrendingUp, key: "yields" },
  { icon: Shield, key: "management" },
  { icon: Users, key: "students" },
];

export const InfoDrawerContent = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();

  const topFAQs = [
    { q: t("faq.investors.q1"), a: t("faq.investors.a1") },
    { q: t("faq.investors.q2"), a: t("faq.investors.a2") },
    { q: t("faq.investors.q3"), a: t("faq.investors.a3") },
  ];

  return (
    <ScrollArea className="h-[70vh] pr-4">
      <div className="space-y-6 pb-8">
        
        {/* 2i3T Partnership */}
        <section className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <img src={logo2i3t} alt="2i3T" className="h-8 w-auto" />
            <div>
              <p className="text-sm font-medium">{t("trust.incubator")}</p>
              <p className="text-xs text-muted-foreground">{t("trust.university")}</p>
            </div>
          </div>
          <a 
            href="https://2i3t.it" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-primary hover:underline inline-flex items-center gap-1"
          >
            {t("common.learnMore")} <ArrowRight className="w-3 h-3" />
          </a>
        </section>

        {/* Come Funziona - 5 Steps */}
        <section>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            {t("howItWorks.title")}
          </h3>
          <div className="space-y-2">
            {steps.map((step, index) => (
              <div 
                key={step.key}
                className="flex items-start gap-3 p-2 rounded-lg bg-muted/20"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">{index + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{t(`howItWorks.steps.${step.key}.title`)}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {t(`howItWorks.steps.${step.key}.description`)}
                  </p>
                </div>
                <step.icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </div>
            ))}
          </div>
        </section>

        {/* Per Investitori */}
        <section className="bg-primary/5 rounded-lg p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            {t("investors.title")}
          </h3>
          <div className="space-y-2 mb-3">
            {investorBenefits.map((benefit) => (
              <div key={benefit.key} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span className="text-sm">{t(`info.benefits.${benefit.key}`)}</span>
              </div>
            ))}
          </div>
          <div className="text-center py-2 bg-background/50 rounded">
            <span className="text-2xl font-bold text-primary">90.000+</span>
            <p className="text-xs text-muted-foreground">{t("hero.stats.students")}</p>
          </div>
        </section>

        {/* FAQ Rapide */}
        <section>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            FAQ
          </h3>
          <Accordion type="single" collapsible className="w-full">
            {topFAQs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`} className="border-b-0">
                <AccordionTrigger className="text-sm text-left py-2 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground pb-2">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <Link 
            to="/faq" 
            onClick={onClose}
            className="text-xs text-primary hover:underline inline-flex items-center gap-1 mt-2"
          >
            {t("faq.viewAll")} <ArrowRight className="w-3 h-3" />
          </Link>
        </section>

        {/* Blog */}
        <section className="bg-muted/30 rounded-lg p-4">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-primary" />
            Blog
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            {t("blog.subtitle")}
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={onClose}
            asChild
          >
            <Link to="/blog">
              {t("blog.viewAll")} <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </section>

        {/* Studenti Link */}
        <section className="text-center">
          <Button 
            variant="secondary" 
            className="w-full"
            onClick={onClose}
            asChild
          >
            <Link to="/studenti">
              <GraduationCap className="w-4 h-4 mr-2" />
              {t("nav.students")}
            </Link>
          </Button>
        </section>
      </div>
    </ScrollArea>
  );
};
