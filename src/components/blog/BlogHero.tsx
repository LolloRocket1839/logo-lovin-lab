import { useTranslation } from "react-i18next";
import { BookOpen } from "lucide-react";

export const BlogHero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-12 md:py-16 px-4 md:px-8 bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-6">
          <BookOpen className="w-6 h-6 text-primary" />
        </div>
        
        <p className="text-xs uppercase tracking-[0.15em] font-medium text-muted-foreground mb-4">
          {t('blog.hero.label', 'Resources')}
        </p>
        
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
          {t('blog.hero.title')}
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          {t('blog.hero.subtitle')}
        </p>
      </div>
    </section>
  );
};
