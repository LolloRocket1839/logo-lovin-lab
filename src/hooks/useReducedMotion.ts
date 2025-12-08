import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

/**
 * Custom hook that detects if the user prefers reduced motion.
 * Wraps framer-motion's useReducedMotion for centralized usage.
 * 
 * @returns boolean - true if user prefers reduced motion, false otherwise
 * 
 * @example
 * const prefersReducedMotion = useReducedMotion();
 * 
 * // Use in className
 * className={prefersReducedMotion ? '' : 'animate-fade-in'}
 * 
 * // Use in style
 * style={prefersReducedMotion ? {} : { animationDelay: '100ms' }}
 * 
 * // Use for scroll behavior
 * scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' })
 */
export const useReducedMotion = (): boolean => {
  const prefersReducedMotion = useFramerReducedMotion();
  return !!prefersReducedMotion;
};
