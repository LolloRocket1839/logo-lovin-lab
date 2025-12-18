interface ParallaxHeroImageProps {
  src: string;
  alt: string;
}

export const ParallaxHeroImage = ({ src, alt }: ParallaxHeroImageProps) => {
  return (
    <div className="aspect-video rounded-xl overflow-hidden mb-12">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
      />
    </div>
  );
};
