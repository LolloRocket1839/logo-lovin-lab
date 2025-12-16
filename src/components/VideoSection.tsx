import { useTranslation } from "react-i18next";
import { useState, useRef } from "react";
import { Play, CheckCircle2, ArrowRight, Clock } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

export const VideoSection = () => {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const keyPoints = [
    t('video.point1', 'Come funziona il modello'),
    t('video.point2', 'Rendimenti attesi'),
    t('video.point3', 'Zero gestione per te'),
  ];

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-primary/5 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      
      <div className="container px-6 md:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Video Column */}
            <div className="order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-card border border-border/50 group">
                <AspectRatio ratio={16 / 9}>
                  {!isPlaying && (
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
                    src="/videos/jungle-rent-explainer.mp4"
                    controls={isPlaying}
                    preload="metadata"
                    className="w-full h-full object-cover"
                    onEnded={() => setIsPlaying(false)}
                  >
                    Your browser does not support the video tag.
                  </video>
                </AspectRatio>
              </div>
            </div>

            {/* Content Column */}
            <div className="order-2 space-y-6">
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
        </div>
      </div>

      {/* Structured Data for SEO */}
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
    </section>
  );
};
