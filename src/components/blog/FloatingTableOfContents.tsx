import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface FloatingTableOfContentsProps {
  content: string;
}

export const FloatingTableOfContents = ({ content }: FloatingTableOfContentsProps) => {
  const prefersReducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string>("");
  const { scrollYProgress } = useScroll();

  // Show TOC after scrolling past hero, hide near footer
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.85, 0.92],
    [0, 1, 1, 0]
  );

  // Extract headings from markdown content
  const headings = useMemo(() => {
    const items: TOCItem[] = [];
    const lines = content.split('\n');
    
    lines.forEach(line => {
      // Match ## and ### headings
      const h2Match = line.match(/^## (.+?)(?:\s*\{#([^}]+)\})?$/);
      const h3Match = line.match(/^### (.+?)(?:\s*\{#([^}]+)\})?$/);
      
      if (h2Match) {
        const title = h2Match[1].trim();
        const id = h2Match[2] || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        items.push({ id, title, level: 2 });
      } else if (h3Match) {
        const title = h3Match[1].trim();
        const id = h3Match[2] || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        items.push({ id, title, level: 3 });
      }
    });
    
    return items;
  }, [content]);

  // Track active section via Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -70% 0%" }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: prefersReducedMotion ? 'auto' : 'smooth', 
        block: 'start' 
      });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  // Only show on desktop, hide if no headings
  if (headings.length === 0) return null;

  return (
    <motion.nav
      className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden xl:block max-w-[200px]"
      style={{ opacity: prefersReducedMotion ? 1 : opacity }}
      aria-label="Table of contents"
    >
      <div className="relative pl-4 border-l border-border/50">
        <ul className="space-y-2" role="list">
          {headings.map(({ id, title, level }) => (
            <li key={id}>
              <button
                onClick={() => handleClick(id)}
                className={cn(
                  "text-left text-xs transition-colors duration-200 line-clamp-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded px-1 -ml-1",
                  level === 3 && "pl-3",
                  activeId === id
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-current={activeId === id ? "location" : undefined}
              >
                {title}
              </button>
            </li>
          ))}
        </ul>
        
        {/* Active indicator dot */}
        {activeId && (
          <motion.div
            className="absolute left-0 w-1.5 h-1.5 rounded-full bg-primary -translate-x-[3px]"
            layoutId="toc-indicator"
            style={{
              top: `${headings.findIndex(h => h.id === activeId) * 28 + 6}px`
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </div>
    </motion.nav>
  );
};
