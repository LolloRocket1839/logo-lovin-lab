import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HomepageFAQ = () => {
  const { t } = useTranslation();

  // Top 5 investor FAQs for homepage
  const topFAQs = [
    { q: t("faq.investorQ1"), a: t("faq.investorA1") },
    { q: t("faq.investorQ2"), a: t("faq.investorA2") },
    { q: t("faq.investorQ3"), a: t("faq.investorA3") },
    { q: t("faq.investorQ4"), a: t("faq.investorA4") },
    { q: t("faq.investorQ5"), a: t("faq.investorA5") },
  ];

  return (
    <section id="faq" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            {t("homeFaq.title")}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            {t("homeFaq.subtitle")}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {topFAQs.map((faq, index) => (
              <AccordionItem
                key={`home-faq-${index}`}
                value={`home-faq-${index}`}
                className="bg-background border border-border/20 rounded-lg px-6"
              >
                <AccordionTrigger className="text-left text-sm sm:text-base hover:no-underline py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm sm:text-base pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-8">
            <Button asChild variant="outline" className="group">
              <Link to="/faq">
                {t("homeFaq.viewAll")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomepageFAQ;
