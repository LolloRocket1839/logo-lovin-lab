import { useCallback } from "react";

const prefetched = new Set<string>();

const routeMap: Record<string, () => Promise<any>> = {
  "/": () => import("@/pages/Index"),
  "/blog": () => import("@/pages/Blog"),
  "/studenti": () => import("@/pages/Students"),
  "/investitori": () => import("@/pages/Investors"),
  "/vendi-casa": () => import("@/pages/Sellers"),
  "/valutazione-immobile": () => import("@/pages/PropertyValuation"),
};

export function usePrefetch() {
  const prefetch = useCallback((path: string) => {
    const basePath = path.split("?")[0].split("#")[0];
    if (prefetched.has(basePath)) return;

    const loader = routeMap[basePath];
    if (loader) {
      prefetched.add(basePath);
      loader().catch(() => prefetched.delete(basePath));
    }
  }, []);

  const prefetchProps = useCallback((path: string) => ({
    onMouseEnter: () => prefetch(path),
    onTouchStart: () => prefetch(path),
    onFocus: () => prefetch(path),
  }), [prefetch]);

  return { prefetch, prefetchProps };
}
