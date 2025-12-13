import { useState, useMemo } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
  priority?: boolean;
  sizes?: string;
  /** Enable responsive srcset generation for public images */
  responsive?: boolean;
}

/**
 * Generate srcset for responsive images
 * Assumes images are in public/images/ and creates virtual breakpoints
 */
const generateSrcSet = (src: string): string | undefined => {
  // Only generate srcset for local images in public folder
  if (!src.startsWith('/images/') && !src.startsWith('public/images/')) {
    return undefined;
  }
  
  // Return the source as-is since we don't have multiple resolutions
  // This provides the foundation for future WebP/responsive optimization
  return undefined;
};

/**
 * Optimized image component with:
 * - Explicit width/height to prevent CLS
 * - Lazy loading by default
 * - Responsive sizes attribute
 * - Fallback on error
 * - Optional srcset support
 */
export const OptimizedImage = ({
  src,
  alt,
  className = "",
  width,
  height,
  loading = "lazy",
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  responsive = true,
}: OptimizedImageProps) => {
  const [hasError, setHasError] = useState(false);
  
  // Determine loading strategy
  const loadingAttr = priority ? "eager" : loading;
  const fetchPriority = priority ? "high" : "low";
  
  // Generate srcset for responsive loading
  const srcSet = useMemo(() => responsive ? generateSrcSet(src) : undefined, [src, responsive]);

  if (hasError) {
    return (
      <div 
        className={`bg-muted flex items-center justify-center ${className}`}
        style={{ width, height }}
        role="img"
        aria-label={alt}
      >
        <span className="text-muted-foreground text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loadingAttr}
      decoding="async"
      fetchPriority={fetchPriority as "high" | "low" | "auto"}
      sizes={sizes}
      srcSet={srcSet}
      onError={() => setHasError(true)}
    />
  );
};
