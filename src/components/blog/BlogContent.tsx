import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import DOMPurify from "dompurify";
import { useMemo } from "react";
import { createMarkdownComponents } from "@/lib/markdown";

interface BlogContentProps {
  content: string;
}

export const BlogContent = ({ content }: BlogContentProps) => {
  const components = createMarkdownComponents();
  const safeContent = useMemo(
    () => DOMPurify.sanitize(content, { USE_PROFILES: { html: true } }),
    [content]
  );

  return (
    <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-display prose-a:text-primary">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={components}>
        {safeContent}
      </ReactMarkdown>
    </div>
  );
};
