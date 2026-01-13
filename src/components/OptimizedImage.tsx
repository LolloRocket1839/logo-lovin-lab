import { useState, useMemo, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

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
  /** Enable blur placeholder effect */
  blurPlaceholder?: boolean;
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
 * - Blur placeholder effect for smooth loading
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
  blurPlaceholder = true,
}: OptimizedImageProps) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  
  // Determine loading strategy
  const loadingAttr = priority ? "eager" : loading;
  const fetchPriority = priority ? "high" : "low";
  
  // Generate srcset for responsive loading
  const srcSet = useMemo(() => responsive ? generateSrcSet(src) : undefined, [src, responsive]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        rootMargin: '50px 0px', // Start loading 50px before entering viewport
        threshold: 0.01 
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  if (hasError) {
    return (
      <div 
        className={cn("bg-muted flex items-center justify-center", className)}
        style={{ width, height }}
        role="img"
        aria-label={alt}
      >
        <span className="text-muted-foreground text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <div 
      ref={imgRef}
      className={cn("relative overflow-hidden", className)}
      style={{ width, height }}
    >
      {/* Blur placeholder skeleton */}
      {blurPlaceholder && !isLoaded && (
        <div 
          className="absolute inset-0 bg-muted animate-pulse"
          style={{
            background: 'linear-gradient(90deg, hsl(var(--muted)) 0%, hsl(var(--muted-foreground) / 0.1) 50%, hsl(var(--muted)) 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
          }}
        />
      )}
      
      {/* Actual image - only load when in view */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          width={width}
          height={height}
          loading={loadingAttr}
          decoding="async"
          fetchPriority={fetchPriority as "high" | "low" | "auto"}
          sizes={sizes}
          srcSet={srcSet}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
};
