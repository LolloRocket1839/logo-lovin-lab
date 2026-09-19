import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SceneReveal } from "@/components/home/SceneReveal";

interface FAQ {
  q: string;
  a: string;
}

const FAQSectionComponent = () => {
  const { t } = useTranslation();
  const items = useMemo(
    () => t("investor.landing.faq.items", { returnObjects: true }) as FAQ[],
    [t]
  );
  const visibleItems = (items || []).slice(0, 5);

  return (
    <SceneReveal as="section" className="py-20 md:py-28 bg-background">
      <div className="container max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-10 tracking-tight">
          {t("investor.landing.faq.title")}
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {visibleItems.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </SceneReveal>
  );
};

export const FAQSection = memo(FAQSectionComponent);
