import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TrendingUp, Home, Building2 } from "lucide-react";

export const FAQSection = () => {
  const { t } = useTranslation();

  const investorFAQs = [
    { q: t("faq.investorQ1"), a: t("faq.investorA1") },
    { q: t("faq.investorQ2"), a: t("faq.investorA2") },
    { q: t("faq.investorQ3"), a: t("faq.investorA3") },
    { q: t("faq.investorQ4"), a: t("faq.investorA4") },
    { q: t("faq.investorQ5"), a: t("faq.investorA5") },
    { q: t("faq.investorQ6"), a: t("faq.investorA6") },
    { q: t("faq.investorQ7"), a: t("faq.investorA7") },
    { q: t("faq.investorQ8"), a: t("faq.investorA8") },
    { q: t("faq.investorQ9"), a: t("faq.investorA9") },
    { q: t("faq.investorQ10"), a: t("faq.investorA10") },
    { q: t("faq.investorQ11"), a: t("faq.investorA11") },
  ];

  const sellerFAQs = [
    { q: t("faq.sellerQ1"), a: t("faq.sellerA1") },
    { q: t("faq.sellerQ2"), a: t("faq.sellerA2") },
    { q: t("faq.sellerQ3"), a: t("faq.sellerA3") },
    { q: t("faq.sellerQ4"), a: t("faq.sellerA4") },
    { q: t("faq.sellerQ5"), a: t("faq.sellerA5") },
  ];

  const aboutFAQs = [
    { q: t("faq.aboutQ1"), a: t("faq.aboutA1") },
    { q: t("faq.aboutQ2"), a: t("faq.aboutA2") },
    { q: t("faq.aboutQ3"), a: t("faq.aboutA3") },
  ];

  return (
    <section id="faq-section" className="py-8 sm:py-10 md:py-12 lg:py-16 bg-muted/30">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 mb-4">{t("faq.title")}</h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            {t("faq.subtitle")}
          </p>
        </div>

        <div className="max-w-3xl lg:max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Investitori */}
          <div>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <TrendingUp className="h-4 w-4 sm:w-5 sm:h-5 text-primary" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">{t("faq.investorCategory")}</h3>
            </div>
            <Accordion type="single" collapsible className="space-y-2">
              {investorFAQs.map((faq, index) => (
                <AccordionItem
                  key={`investor-${index}`}
                  value={`investor-${index}`}
                  className="bg-background border rounded-lg px-3 sm:px-4 md:px-6"
                >
                  <AccordionTrigger className="text-left text-sm sm:text-base hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm sm:text-base">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Venditori */}
          <div>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Home className="h-4 w-4 sm:w-5 sm:h-5 text-primary" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">{t("faq.sellerCategory")}</h3>
            </div>
            <Accordion type="single" collapsible className="space-y-2">
              {sellerFAQs.map((faq, index) => (
                <AccordionItem
                  key={`seller-${index}`}
                  value={`seller-${index}`}
                  className="bg-background border rounded-lg px-3 sm:px-4 md:px-6"
                >
                  <AccordionTrigger className="text-left text-sm sm:text-base hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm sm:text-base">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Chi è Jungle Rent */}
          <div>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Building2 className="h-4 w-4 sm:w-5 sm:h-5 text-primary" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">{t("faq.aboutCategory")}</h3>
            </div>
            <Accordion type="single" collapsible className="space-y-2">
              {aboutFAQs.map((faq, index) => (
                <AccordionItem
                  key={`about-${index}`}
                  value={`about-${index}`}
                  className="bg-background border rounded-lg px-3 sm:px-4 md:px-6"
                >
                  <AccordionTrigger className="text-left text-sm sm:text-base hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm sm:text-base">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};
