import { useTranslation } from "react-i18next";
import { BookOpen } from "lucide-react";

export const BlogHero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-8 md:py-12 lg:py-16 px-4 bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
          <BookOpen className="w-8 h-8 text-primary" />
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          {t('blog.hero.title')}
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          {t('blog.hero.subtitle')}
        </p>
      </div>
    </section>
  );
};
