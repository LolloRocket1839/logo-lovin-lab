import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Building2, TrendingUp, ArrowRight, CheckCircle, Download } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { InvestorWaitlistDialog } from "@/components/InvestorWaitlistDialog";

export const ResourceLibrary = () => {
  const { t } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState<'general' | 'torino'>('general');

  const handleGuideRequest = (guideType: 'general' | 'torino') => {
    setSelectedGuide(guideType);
    setIsDialogOpen(true);
  };

  const handleDirectDownload = () => {
    window.open('/resources/mercato-immobiliare-universitario-torino.pdf', '_blank');
  };

  const guides = [
    {
      id: 'general' as const,
      icon: FileText,
      badge: t("resourceLibrary.guide1Badge"),
      badgeColor: "bg-primary/10 text-primary border-primary/20",
      title: t("resourceLibrary.guide1Title"),
      description: t("resourceLibrary.guide1Desc"),
      pages: t("resourceLibrary.guide1Pages"),
      bullets: [
        t("resourceLibrary.guide1Bullet1"),
        t("resourceLibrary.guide1Bullet2"),
        t("resourceLibrary.guide1Bullet3"),
        t("resourceLibrary.guide1Bullet4"),
      ],
      directDownload: false
    },
    {
      id: 'torino' as const,
      icon: Building2,
      badge: t("resourceLibrary.guide2Badge"),
      badgeColor: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
      title: t("resourceLibrary.guide2Title"),
      description: t("resourceLibrary.guide2Desc"),
      pages: t("resourceLibrary.guide2Pages"),
      bullets: [
        t("resourceLibrary.guide2Bullet1"),
        t("resourceLibrary.guide2Bullet2"),
        t("resourceLibrary.guide2Bullet3"),
        t("resourceLibrary.guide2Bullet4"),
      ],
      directDownload: false
    },
    {
      id: 'student-housing' as const,
      icon: TrendingUp,
      badge: t("resourceLibrary.guide3Badge"),
      badgeColor: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
      title: t("resourceLibrary.guide3Title"),
      description: t("resourceLibrary.guide3Desc"),
      pages: t("resourceLibrary.guide3Pages"),
      bullets: [
        t("resourceLibrary.guide3Bullet1"),
        t("resourceLibrary.guide3Bullet2"),
        t("resourceLibrary.guide3Bullet3"),
        t("resourceLibrary.guide3Bullet4"),
      ],
      directDownload: true
    }
  ];

  return (
    <>
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              {t("resourceLibrary.sectionTitle")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("resourceLibrary.sectionSubtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide, index) => {
              const Icon = guide.icon;
              return (
                <Card 
                  key={guide.id}
                  className="relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-primary/50 animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <Badge variant="outline" className={guide.badgeColor}>
                        {guide.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl mb-2">{guide.title}</CardTitle>
                    <CardDescription className="text-base">
                      {guide.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FileText className="h-4 w-4" />
                        <span>{guide.pages} • PDF</span>
                      </div>
                      
                      <ul className="space-y-2">
                        {guide.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      <Button 
                        className="w-full group mt-6"
                        size="lg"
                        onClick={() => guide.directDownload ? handleDirectDownload() : handleGuideRequest(guide.id as 'general' | 'torino')}
                      >
                        {guide.directDownload ? t("resourceLibrary.downloadDirectCta") : t("resourceLibrary.downloadCta")}
                        {guide.directDownload ? (
                          <Download className="ml-2 h-4 w-4" />
                        ) : (
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <InvestorWaitlistDialog 
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        guideType={selectedGuide}
      />
    </>
  );
};
