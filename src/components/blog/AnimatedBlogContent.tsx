import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { createMarkdownComponents, preprocessMarkdownWithAutoLinks } from "@/lib/markdown";
import { getContextualSuggestions } from "@/lib/autoLinking";
import { autoLinkConfig } from "@/data/linkableContent";
import { ContextualSuggestionsList } from "./ContextualSuggestion";
import { useMemo } from "react";
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
  
  // Preprocess content with auto-links
  const processedContent = useMemo(() => {
    return preprocessMarkdownWithAutoLinks(content, slug, lang);
  }, [content, slug, lang]);
  
  // Get contextual tool suggestions for callout boxes
  const contextualSuggestions = useMemo(() => {
    if (!autoLinkConfig.enableCalloutBoxes) return [];
    return getContextualSuggestions(content, slug, lang, 2);
  }, [content, slug, lang]);

  return (
    <div className="prose prose-sm sm:prose-base md:prose-lg lg:prose-xl prose-slate dark:prose-invert max-w-none blog-content-wrapper mb-12 prose-headings:scroll-mt-20 prose-a:text-primary prose-strong:font-bold prose-table:overflow-x-auto prose-pre:overflow-x-auto overflow-x-hidden">
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
