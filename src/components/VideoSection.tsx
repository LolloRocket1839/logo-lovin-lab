import { useTranslation } from "react-i18next";
import { useState, useRef } from "react";
import { Play, CheckCircle2, ArrowRight, Clock, Calendar, Loader2, Euro, Key, Home, TrendingUp } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

// Mobile Steps Component
const MobileSteps = () => {
  const { t } = useTranslation();
  
  const steps = [
    {
      icon: Euro,
      number: "1",
      title: t('infographic.steps.invest.title', 'Investi'),
      description: t('video.mobileStep1', 'Da €100'),
    },
    {
      icon: Key,
      number: "2", 
      title: t('infographic.steps.acquire.title', 'Acquistiamo'),
      description: t('video.mobileStep2', 'Immobili vicino alle università'),
    },
    {
      icon: Home,
      number: "3",
      title: 'Gestiamo',
      description: 'Affittiamo a studenti, facendoli risparmiare',
    },
    {
      icon: TrendingUp,
      number: "4",
      title: t('infographic.steps.earn.title', 'Guadagni'),
      description: t('video.mobileStep4', 'Rendite trimestrali'),
    },
  ];

  return (
    <div className="space-y-0">
      {steps.map((step, index) => (
        <div key={index} className="relative">
          {/* Connecting line */}
          {index < steps.length - 1 && (
            <div className="absolute left-5 top-12 w-px h-8 bg-primary/20" />
          )}
          
          <div className="flex items-start gap-4 py-3">
            {/* Icon circle */}
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <step.icon className="w-5 h-5 text-primary" />
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground font-medium">
                  {step.number}
                </span>
                <h3 className="text-base font-semibold text-foreground">
                  {step.title}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">
                {step.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const VideoSection = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = async () => {
    setIsPlaying(true);
    if (videoRef.current) {
      try {
        videoRef.current.muted = false;
        await videoRef.current.play();
      } catch (error) {
        console.error('Errore riproduzione video:', error);
        videoRef.current.muted = true;
        await videoRef.current.play();
      }
    }
  };

  const keyPoints = [
    t('video.point1', 'Come funziona il modello'),
    t('video.point2', 'Rendimenti attesi'),
    t('video.point3', 'Zero gestione per te'),
  ];

  return (
    <section className="py-12 md:py-24 lg:py-32 bg-accent/30 relative overflow-hidden">
      
      <div className="container px-6 md:px-8 relative">
        <div className="max-w-6xl mx-auto">
          {/* Mobile: Simple Steps */}
          {isMobile ? (
            <div className="space-y-6">
              {/* Title */}
              <div className="text-center space-y-3">
                <h2 className="text-2xl font-display font-bold text-foreground">
                  {t('video.title')}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {t('video.subtitle')}
                </p>
              </div>
              
              {/* Steps */}
              <MobileSteps />
              
              {/* CTA */}
              <div className="text-center">
                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={() => window.open('https://calendly.com/lorenzo-onijoseph/jungle-rent', '_blank')}
                >
                  {t('video.cta', 'Parla con Lorenzo')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          ) : (
            /* Desktop: Video Grid */
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Video Column */}
              <div className="order-1">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-card border border-border/50 group">
                  <AspectRatio ratio={16 / 9}>
                    {/* Loading spinner */}
                    {isLoading && !hasError && (
                      <div className="absolute inset-0 z-20 flex items-center justify-center bg-muted">
                        <Loader2 className="w-12 h-12 text-primary animate-spin" />
                      </div>
                    )}
                    
                    {/* Error fallback */}
                    {hasError ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted p-6 text-center">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                          <Play className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {t('video.comingSoon', 'Video in preparazione')}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 max-w-xs">
                          {t('video.comingSoonDescription', 'Nel frattempo, prenota una call con Lorenzo per scoprire Jungle Rent')}
                        </p>
                        <Button 
                          onClick={() => window.open('https://calendly.com/lorenzo-onijoseph/jungle-rent', '_blank')}
                          className="gap-2"
                        >
                          <Calendar className="w-4 h-4" />
                          {t('video.bookCall', 'Prenota una call')}
                        </Button>
                      </div>
                    ) : (
                      <>
                        {/* Play button overlay */}
                        {!isPlaying && !isLoading && (
                          <button
                            onClick={handlePlayClick}
                            className="absolute inset-0 z-10 flex items-center justify-center bg-foreground/30 backdrop-blur-[2px] cursor-pointer transition-all duration-300 group-hover:bg-foreground/20"
                            aria-label={t('video.play', 'Play video')}
                          >
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg group-hover:shadow-primary/30">
                              <Play className="w-10 h-10 md:w-12 md:h-12 text-primary-foreground ml-1" fill="currentColor" />
                            </div>
                          </button>
                        )}
                        <video
                          ref={videoRef}
                          controls={isPlaying}
                          preload="metadata"
                          playsInline
                          muted
                          className="absolute inset-0 w-full h-full object-cover"
                          onEnded={() => setIsPlaying(false)}
                          onError={() => setHasError(true)}
                          onLoadedData={() => setIsLoading(false)}
                        >
                          <source src="/videos/jungle-rent-explainer.mp4" type="video/mp4" />
                          {t('video.notSupported', 'Your browser does not support the video tag.')}
                        </video>
                      </>
                    )}
                  </AspectRatio>
                </div>
              </div>

              {/* Content Column */}
              <div className="order-2 space-y-6 text-center">
                {/* Intro Text */}
                <p className="text-xl md:text-2xl text-foreground font-bold">
                  {t('video.intro', 'Te lo spieghiamo in un video illustrativo...')}
                </p>

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Clock className="w-4 h-4" />
                  <span>{t('video.badge', '2 minuti')}</span>
                </div>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground leading-tight">
                  {t('video.title')}
                </h2>

                {/* Subtitle */}
                <p className="text-lg text-muted-foreground">
                  {t('video.subtitle')}
                </p>

                {/* Key Points */}
                <ul className="space-y-3">
                  {keyPoints.map((point, index) => (
                    <li key={index} className="flex items-center gap-3 text-foreground">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="font-medium">{point}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="pt-4">
                  <Button 
                    size="lg" 
                    className="group"
                    onClick={() => window.open('https://calendly.com/lorenzo-onijoseph/jungle-rent', '_blank')}
                  >
                    {t('video.cta', 'Parla con Lorenzo')}
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Structured Data for SEO - only on desktop */}
      {!isMobile && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              "name": t('video.title'),
              "description": t('video.subtitle'),
              "uploadDate": "2025-12-16",
              "contentUrl": "https://junglerent.it/videos/jungle-rent-explainer.mp4"
            })
          }}
        />
      )}
    </section>
  );
};
