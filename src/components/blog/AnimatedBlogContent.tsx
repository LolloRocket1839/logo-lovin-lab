import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { createMarkdownComponents } from "@/lib/markdown";
import type { Components } from "react-markdown";

interface AnimatedBlogContentProps {
  content: string;
  markdownComponents?: Components;
}

export const AnimatedBlogContent = ({ content }: AnimatedBlogContentProps) => {
  const staticComponents = createMarkdownComponents();

  return (
    <div className="prose prose-sm sm:prose-base md:prose-lg lg:prose-xl prose-slate dark:prose-invert max-w-none blog-content-wrapper mb-12 prose-headings:scroll-mt-20 prose-a:text-primary prose-strong:font-bold prose-table:overflow-x-auto prose-pre:overflow-x-auto overflow-x-hidden">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={staticComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
