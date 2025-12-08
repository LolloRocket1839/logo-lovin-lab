import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Play } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export const VideoSection = () => {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = { current: null as HTMLIFrameElement | null };

  const handlePlayClick = () => {
    setIsPlaying(true);
    if (iframeRef.current) {
      const currentSrc = iframeRef.current.src;
      if (!currentSrc.includes('autoplay=1')) {
        iframeRef.current.src = currentSrc + (currentSrc.includes('?') ? '&' : '?') + 'autoplay=1';
      }
    }
  };

  // PLACEHOLDER - Replace with actual video URL
  const videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ";
  
  return (
    <section 
      className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-accent/20 to-background relative overflow-hidden"
    >
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      <div className="container px-6 md:px-8 relative z-10">
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
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500 bg-card border border-border/50">
              <AspectRatio ratio={16 / 9}>
                {!isPlaying && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-foreground/40 backdrop-blur-sm group cursor-pointer" onClick={handlePlayClick}>
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/90 group-hover:bg-primary flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg">
                      <Play className="w-10 h-10 md:w-12 md:h-12 text-primary-foreground ml-1" fill="currentColor" />
                    </div>
                  </div>
                )}
                <iframe
                  ref={(el) => { iframeRef.current = el; }}
                  src={videoUrl}
                  title={t('video.title')}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  loading="lazy"
                />
              </AspectRatio>
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
                  "thumbnailUrl": "https://junglerent.it/images/video-thumbnail.jpg",
                  "uploadDate": new Date().toISOString(),
                  "contentUrl": videoUrl,
                  "embedUrl": videoUrl
                })
              }}
            />
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
    </section>
  );
};
