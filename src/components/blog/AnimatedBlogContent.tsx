import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { Components } from "react-markdown";

interface AnimatedBlogContentProps {
  content: string;
  markdownComponents: Components;
}

interface AnimatedElementProps {
  children: ReactNode;
  animation?: "fadeUp" | "fadeLeft" | "scaleIn" | "blurIn";
  delay?: number;
  className?: string;
}

const AnimatedElement = ({ children, animation = "fadeUp", delay = 0, className }: AnimatedElementProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  const variants = {
    fadeUp: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    },
    fadeLeft: {
      hidden: { opacity: 0, x: -15 },
      visible: { opacity: 1, x: 0 }
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.96 },
      visible: { opacity: 1, scale: 1 }
    },
    blurIn: {
      hidden: { opacity: 0, filter: "blur(4px)" },
      visible: { opacity: 1, filter: "blur(0px)" }
    }
  };

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[animation]}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedBlogContent = ({ content, markdownComponents }: AnimatedBlogContentProps) => {
  const prefersReducedMotion = useReducedMotion();

  // Merge custom components with animated wrappers
  const animatedComponents: Components = {
    h2: ({ children, ...props }) => {
      const text = String(children);
      const match = text.match(/^(.*?)\s*\{#([^}]+)\}$/);
      let rendered;
      if (match) {
        const [, title, id] = match;
        rendered = <h2 id={id} {...props}>{title}</h2>;
      } else {
        rendered = <h2 {...props}>{children}</h2>;
      }
      return (
        <AnimatedElement animation="fadeUp" delay={0}>
          {rendered}
        </AnimatedElement>
      );
    },
    h3: ({ children, ...props }) => {
      const text = String(children);
      const match = text.match(/^(.*?)\s*\{#([^}]+)\}$/);
      let rendered;
      if (match) {
        const [, title, id] = match;
        rendered = <h3 id={id} {...props}>{title}</h3>;
      } else {
        rendered = <h3 {...props}>{children}</h3>;
      }
      return (
        <AnimatedElement animation="fadeUp" delay={0.05}>
          {rendered}
        </AnimatedElement>
      );
    },
    p: ({ children, ...props }) => (
      <AnimatedElement animation="fadeUp" delay={0.03}>
        <p {...props}>{children}</p>
      </AnimatedElement>
    ),
    li: ({ children, ...props }) => (
      <AnimatedElement animation="fadeLeft" delay={0.02}>
        <li {...props}>{children}</li>
      </AnimatedElement>
    ),
    blockquote: ({ children, ...props }) => (
      <AnimatedElement animation="scaleIn">
        <blockquote {...props}>{children}</blockquote>
      </AnimatedElement>
    ),
    img: ({ src, alt, ...props }) => (
      <AnimatedElement animation="scaleIn">
        <img src={src} alt={alt} loading="lazy" decoding="async" {...props} />
      </AnimatedElement>
    ),
    table: ({ children, ...props }) => (
      <AnimatedElement animation="blurIn">
        <table {...props}>{children}</table>
      </AnimatedElement>
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
        components={animatedComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
