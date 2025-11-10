import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export const FAQSection = () => {
  const { t } = useTranslation();

  const studentFAQs = [
    { q: t("faq.studentQ1"), a: t("faq.studentA1") },
    { q: t("faq.studentQ2"), a: t("faq.studentA2") },
    { q: t("faq.studentQ3"), a: t("faq.studentA3") },
    { q: t("faq.studentQ4"), a: t("faq.studentA4") },
    { q: t("faq.studentQ5"), a: t("faq.studentA5") },
    { q: t("faq.studentQ6"), a: t("faq.studentA6") },
  ];

  const investorFAQs = [
    { q: t("faq.investorQ1"), a: t("faq.investorA1") },
    { q: t("faq.investorQ2"), a: t("faq.investorA2") },
    { q: t("faq.investorQ3"), a: t("faq.investorA3") },
    { q: t("faq.investorQ4"), a: t("faq.investorA4") },
    { q: t("faq.investorQ5"), a: t("faq.investorA5") },
  ];

  const generalFAQs = [
    { q: t("faq.generalQ1"), a: t("faq.generalA1") },
    { q: t("faq.generalQ2"), a: t("faq.generalA2") },
  ];

  const howItWorksFAQs = [
    { q: t("faq.howItWorksQ1"), a: t("faq.howItWorksA1") },
    { q: t("faq.howItWorksQ2"), a: t("faq.howItWorksA2") },
    { q: t("faq.howItWorksQ3"), a: t("faq.howItWorksA3") },
    { q: t("faq.howItWorksQ4"), a: t("faq.howItWorksA4") },
    { q: t("faq.howItWorksQ5"), a: t("faq.howItWorksA5") },
    { q: t("faq.howItWorksQ6"), a: t("faq.howItWorksA6") },
  ];

  return (
    <section id="faq-section" className="py-8 sm:py-10 md:py-12 lg:py-16 bg-muted/30">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <span className="text-primary font-semibold text-xs sm:text-sm uppercase tracking-wide">
            {t("faq.sectionLabel")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 mb-4">{t("faq.title")}</h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            {t("faq.subtitle")}
          </p>
        </div>

        <div className="max-w-3xl lg:max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Studenti */}
          <div>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <HelpCircle className="h-4 w-4 sm:w-5 sm:h-5 text-primary" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">{t("faq.studentCategory")}</h3>
            </div>
            <Accordion type="single" collapsible className="space-y-2">
              {studentFAQs.map((faq, index) => (
                <AccordionItem
                  key={`student-${index}`}
                  value={`student-${index}`}
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

          {/* Investitori */}
          <div>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <HelpCircle className="h-4 w-4 sm:w-5 sm:h-5 text-primary" />
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

          {/* Come Funziona */}
          <div>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <HelpCircle className="h-4 w-4 sm:w-5 sm:h-5 text-primary" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">{t("faq.howItWorksCategory")}</h3>
            </div>
            <Accordion type="single" collapsible className="space-y-2">
              {howItWorksFAQs.map((faq, index) => (
                <AccordionItem
                  key={`how-it-works-${index}`}
                  value={`how-it-works-${index}`}
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

          {/* Generale */}
          <div>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <HelpCircle className="h-4 w-4 sm:w-5 sm:h-5 text-primary" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">{t("faq.generalCategory")}</h3>
            </div>
            <Accordion type="single" collapsible className="space-y-2">
              {generalFAQs.map((faq, index) => (
                <AccordionItem
                  key={`general-${index}`}
                  value={`general-${index}`}
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
