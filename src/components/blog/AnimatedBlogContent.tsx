import { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import type { Components } from "react-markdown";

interface AnimatedBlogContentProps {
  content: string;
  markdownComponents: Components;
}

export const AnimatedBlogContent = ({ content, markdownComponents }: AnimatedBlogContentProps) => {
  // Custom components for markdown rendering (static, no animations)
  const staticComponents: Components = {
    h2: ({ children, ...props }) => {
      const text = String(children);
      const match = text.match(/^(.*?)\s*\{#([^}]+)\}$/);
      if (match) {
        const [, title, id] = match;
        return <h2 id={id} {...props}>{title}</h2>;
      }
      return <h2 {...props}>{children}</h2>;
    },
    h3: ({ children, ...props }) => {
      const text = String(children);
      const match = text.match(/^(.*?)\s*\{#([^}]+)\}$/);
      if (match) {
        const [, title, id] = match;
        return <h3 id={id} {...props}>{title}</h3>;
      }
      return <h3 {...props}>{children}</h3>;
    },
    img: ({ src, alt, ...props }) => (
      <img src={src} alt={alt} loading="lazy" decoding="async" {...props} />
    ),
    a: ({ href, children, ...props }) => {
      if (href?.startsWith('#')) {
        return (
          <a
            href={href}
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById(href.slice(1));
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                window.history.pushState(null, '', href);
              }
            }}
            {...props}
          >
            {children}
          </a>
        );
      }
      return <a href={href} {...props}>{children}</a>;
    },
  };

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
