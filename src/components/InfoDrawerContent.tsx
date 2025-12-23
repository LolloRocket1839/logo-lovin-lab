import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Suspense, lazy, useMemo } from "react";
import { 
  Search, 
  FileText, 
  ArrowRight,
  Sparkles,
  BookOpen,
  Calendar
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { blogPosts } from "@/data/blog/posts";

// Lazy load AISearchBox since it's heavy
const AISearchBox = lazy(() => import("@/components/AISearchBox").then(m => ({ default: m.AISearchBox })));

export const InfoDrawerContent = ({ onClose }: { onClose: () => void }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.startsWith('en') ? 'en' : 'it';

  // Get latest 3 blog posts
  const latestPosts = useMemo(() => {
    return blogPosts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
  }, []);

  const topFAQs = [
    { q: t("faq.investorQ1"), a: t("faq.investorA1") },
    { q: t("faq.investorQ2"), a: t("faq.investorA2") },
    { q: t("faq.studentQ1"), a: t("faq.studentA1") },
    { q: t("faq.sellerQ1"), a: t("faq.sellerA1") },
    { q: t("faq.aboutQ1"), a: t("faq.aboutA1") },
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
            {t("homepageFaq.viewAll")} <ArrowRight className="w-3 h-3" />
          </Link>
        </section>

        {/* Blog - Latest Articles */}
        <section className="bg-muted/30 rounded-lg p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            {t("blog.sectionTitle")}
          </h3>
          <div className="space-y-3 mb-4">
            {latestPosts.map((post) => {
              const translation = post.translations[currentLang as keyof typeof post.translations] || post.translations.it;
              return (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  onClick={onClose}
                  className="block p-3 bg-background/50 rounded-lg hover:bg-background/80 transition-colors"
                >
                  <p className="text-sm font-medium text-foreground line-clamp-2 mb-1">
                    {translation.title}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(post.date).toLocaleDateString(currentLang === 'it' ? 'it-IT' : 'en-US', { day: 'numeric', month: 'short' })}</span>
                    <span>•</span>
                    <span>{post.readTime} min</span>
                  </div>
                </Link>
              );
            })}
          </div>
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
