import { useTranslation } from "react-i18next";
import { useState, useRef } from "react";
import { Play } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-accent/20 to-background">
      <div className="container px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
              {t('video.title')}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('video.subtitle')}
            </p>
          </div>

          {/* Video Container */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500 bg-card border border-border/50">
            <AspectRatio ratio={16 / 9}>
              {!isPlaying && (
                <button
                  onClick={handlePlayClick}
                  className="absolute inset-0 z-10 flex items-center justify-center bg-foreground/40 backdrop-blur-sm group cursor-pointer"
                  aria-label={t('video.play', 'Play video')}
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/90 group-hover:bg-primary flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg">
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

          {/* Optional CTA Below Video */}
          {t('video.cta') && (
            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground">
                {t('video.cta')}
              </p>
            </div>
          )}
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
