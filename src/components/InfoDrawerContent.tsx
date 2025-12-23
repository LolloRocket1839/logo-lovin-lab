import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Suspense, lazy } from "react";
import { 
  Search, 
  FileText, 
  ArrowRight,
  Sparkles,
  BookOpen
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

// Lazy load AISearchBox since it's heavy
const AISearchBox = lazy(() => import("@/components/AISearchBox").then(m => ({ default: m.AISearchBox })));

export const InfoDrawerContent = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();

  const topFAQs = [
    { q: t("faq.investors.q1"), a: t("faq.investors.a1") },
    { q: t("faq.investors.q2"), a: t("faq.investors.a2") },
    { q: t("faq.investors.q3"), a: t("faq.investors.a3") },
    { q: t("faq.students.q1"), a: t("faq.students.a1") },
    { q: t("faq.students.q2"), a: t("faq.students.a2") },
  ];

  return (
    <ScrollArea className="h-[70vh] pr-4">
      <div className="space-y-6 pb-8">
        
        {/* AI Search Section */}
        <section className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Search className="w-4 h-4 text-primary" />
            <Sparkles className="w-3 h-3 text-primary" />
            {t("search.askAnything")}
          </h3>
          <Suspense fallback={
            <div className="h-24 flex items-center justify-center text-muted-foreground text-sm">
              {t("common.loading")}...
            </div>
          }>
            <AISearchBox />
          </Suspense>
        </section>

        {/* FAQ */}
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
            <BookOpen className="w-4 h-4 text-primary" />
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
      </div>
    </ScrollArea>
  );
};
