import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export const BlogBanner = () => {
  const { t } = useTranslation();

  return (
    <section className="py-10 md:py-24 px-4 md:px-8 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="relative rounded-xl bg-card border border-border/30 p-5 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg md:text-2xl font-display font-bold">
                  {t('blog.bannerTitle', 'Esplora il nostro blog')}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  {t('blog.bannerSubtitle', 'Guide, analisi e consigli su Torino')}
                </p>
              </div>
            </div>
            
            <Button asChild size="lg" variant="premium" className="feel-good-click whitespace-nowrap w-full md:w-auto">
              <Link to="/blog">
                {t('blog.exploreAll', 'Esplora tutto')}
                <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
