import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const HomepageFAQMobile = () => {
  const { t } = useTranslation();

  // Only top 3 FAQs for mobile
  const topFAQs = [
    { q: t("faq.investorQ1"), a: t("faq.investorA1") },
    { q: t("faq.investorQ2"), a: t("faq.investorA2") },
    { q: t("faq.investorQ3"), a: t("faq.investorA3") },
  ];

  return (
    <section className="py-8 bg-background md:hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <h2 className="text-xl font-display font-bold mb-1">
            {t("homeFaq.title")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("homeFaq.subtitle")}
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-2">
          {topFAQs.map((faq, index) => (
            <AccordionItem
              key={`mobile-faq-${index}`}
              value={`mobile-faq-${index}`}
              className="bg-card border border-border/20 rounded-lg px-4"
            >
              <AccordionTrigger className="text-left text-sm hover:no-underline py-3">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm pb-3">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-4">
          <Button asChild variant="ghost" size="sm" className="group">
            <Link to="/faq">
              {t("homeFaq.viewAll")}
              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
