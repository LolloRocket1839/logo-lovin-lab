import { OptimizedImage } from "@/components/OptimizedImage";

interface ParallaxHeroImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

export const ParallaxHeroImage = ({ src, alt, priority = true }: ParallaxHeroImageProps) => {
  return (
    <div className="aspect-video rounded-xl overflow-hidden mb-12">
      <OptimizedImage
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        priority={priority}
        sizes="(max-width: 768px) 100vw, 80vw"
      />
    </div>
  );
};
