import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import DOMPurify from "dompurify";
import { createMarkdownComponents, preprocessMarkdownWithAutoLinks } from "@/lib/markdown";
import { getContextualSuggestions } from "@/lib/autoLinking";
import { autoLinkConfig } from "@/data/linkableContent";
import { ContextualSuggestionsList } from "./ContextualSuggestion";
import { useEffect, useMemo, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { Components } from "react-markdown";

interface AnimatedBlogContentProps {
  content: string;
  markdownComponents?: Components;
  slug?: string;
  lang?: 'it' | 'en';
}

export const AnimatedBlogContent = ({ 
  content, 
  slug = '', 
  lang = 'it' 
}: AnimatedBlogContentProps) => {
  const staticComponents = createMarkdownComponents();
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  // Preprocess content with auto-links
  const processedContent = useMemo(() => {
    return preprocessMarkdownWithAutoLinks(content, slug, lang);
  }, [content, slug, lang]);
  
  // Get contextual tool suggestions for callout boxes
  const contextualSuggestions = useMemo(() => {
    if (!autoLinkConfig.enableCalloutBoxes) return [];
    return getContextualSuggestions(content, slug, lang, 2);
  }, [content, slug, lang]);

  // Fade-up paragraphs/headings as they enter viewport (once)
  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;
    const root = containerRef.current;
    const blocks = root.querySelectorAll<HTMLElement>(
      "p, h2, h3, h4, blockquote, ul, ol, figure, pre, table"
    );
    blocks.forEach((el) => el.classList.add("editorial-reveal"));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("editorial-revealed");
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );
    blocks.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [processedContent, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="prose prose-sm sm:prose-base md:prose-lg lg:prose-xl prose-slate dark:prose-invert max-w-none blog-content-wrapper blog-editorial mb-12 prose-headings:scroll-mt-24 prose-a:text-primary prose-strong:font-bold prose-table:overflow-x-auto prose-pre:overflow-x-auto overflow-x-hidden"
    >
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={staticComponents}
      >
        {processedContent}
      </ReactMarkdown>
      
      {/* Contextual tool suggestions at the end of content */}
      {contextualSuggestions.length > 0 && (
        <ContextualSuggestionsList 
          suggestions={contextualSuggestions} 
          lang={lang} 
        />
      )}
    </div>
  );
};
