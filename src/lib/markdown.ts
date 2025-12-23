// Markdown rendering utilities for blog posts
import type { Components } from "react-markdown";
import React from "react";

export const createMarkdownComponents = (): Components => ({
  h2: ({ children, ...props }) => {
    const text = String(children);
    const match = text.match(/^(.*?)\s*\{#([^}]+)\}$/);
    if (match) {
      const [, title, id] = match;
      return React.createElement('h2', { id, ...props }, title);
    }
    return React.createElement('h2', props, children);
  },
  h3: ({ children, ...props }) => {
    const text = String(children);
    const match = text.match(/^(.*?)\s*\{#([^}]+)\}$/);
    if (match) {
      const [, title, id] = match;
      return React.createElement('h3', { id, ...props }, title);
    }
    return React.createElement('h3', props, children);
  },
  img: ({ src, alt, ...props }) => 
    React.createElement('img', { src, alt, loading: "lazy", decoding: "async", ...props }),
  a: ({ href, children, ...props }) => {
    if (href?.startsWith('#')) {
      return React.createElement('a', {
        href,
        onClick: (e: React.MouseEvent) => {
          e.preventDefault();
          const element = document.getElementById(href.slice(1));
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            window.history.pushState(null, '', href);
          }
        },
        ...props
      }, children);
    }
    return React.createElement('a', { href, ...props }, children);
  },
});
