import { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
  priority?: boolean;
  sizes?: string;
}

/**
 * Optimized image component with:
 * - Explicit width/height to prevent CLS
 * - Lazy loading by default
 * - Responsive sizes
 * - Fallback on error
 */
export const OptimizedImage = ({
  src,
  alt,
  className = "",
  width,
  height,
  loading = "lazy",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: OptimizedImageProps) => {
  const [hasError, setHasError] = useState(false);
  
  // Determine loading strategy
  const loadingAttr = priority ? "eager" : loading;
  const fetchPriority = priority ? "high" : "low";

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
      onError={() => setHasError(true)}
    />
  );
};
