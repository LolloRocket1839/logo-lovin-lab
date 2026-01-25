import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

interface IPhoneNotesTemplateProps {
  content: string;
  title: string;
  date: string;
}

export const IPhoneNotesTemplate = ({ content, title, date }: IPhoneNotesTemplateProps) => {
  // Format date in elegant style
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric',
      month: 'long', 
      year: 'numeric'
    };
    return d.toLocaleDateString('en-US', options);
  };

  return (
    <motion.div 
      className="relative max-w-sm mx-auto my-8"
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: "spring",
        damping: 25,
        stiffness: 200,
        duration: 0.6
      }}
    >
      {/* Minimal iPhone-like container */}
      <div className="relative bg-[#F8F8FA] rounded-[2.5rem] overflow-hidden shadow-xl">
        {/* Status bar - minimal */}
        <div className="flex justify-between items-center px-8 pt-4 pb-2 text-sm text-[#1c1c1e]/60 font-medium">
          <span>9:41</span>
          <div className="flex gap-1 items-center">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
            </svg>
            <svg className="w-6 h-4" fill="currentColor" viewBox="0 0 24 24">
              <rect x="2" y="7" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1" fill="none"/>
              <rect x="20" y="10" width="2" height="4" rx="0.5" fill="currentColor"/>
              <rect x="4" y="9" width="14" height="6" rx="1" fill="currentColor"/>
            </svg>
          </div>
        </div>
        
        {/* Navigation bar - minimal */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#e5e5e7]">
          <div className="flex items-center gap-0.5 text-[#007AFF]">
            <ChevronLeft className="w-5 h-5" strokeWidth={2} />
            <span className="text-base">Notes</span>
          </div>
        </div>
        
        {/* Content area - clean white */}
        <div className="bg-white min-h-[480px] pb-8">
          {/* Date */}
          <div className="px-5 pt-4 pb-1">
            <p className="text-xs text-[#8e8e93] text-center tracking-wide">
              {formatDate(date)}
            </p>
          </div>
          
          {/* Main content */}
          <div className="px-5 py-2">
            {/* Title */}
            <h1 className="text-2xl font-bold text-[#1c1c1e] mb-4 font-['SF_Pro_Text',_system-ui,_-apple-system,_sans-serif]">
              {title}
            </h1>
            
            {/* Markdown content */}
            <div className="notes-content text-[#1c1c1e] text-[15px] leading-relaxed font-['SF_Pro_Text',_system-ui,_-apple-system,_sans-serif]">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  // Demote all headings by one level to preserve semantic hierarchy
                  // (article title is the true H1)
                  h1: ({ children }) => (
                    <h2 className="text-2xl font-bold mt-6 mb-2 text-[#1c1c1e]">{children}</h2>
                  ),
                  h2: ({ children }) => (
                    <h3 className="text-lg font-semibold mt-6 mb-2 text-[#1c1c1e] tracking-tight">{children}</h3>
                  ),
                  h3: ({ children }) => (
                    <h4 className="text-base font-semibold mt-5 mb-2 text-[#1c1c1e]">{children}</h4>
                  ),
                  p: ({ children }) => (
                    <p className="my-3 leading-[1.6] text-[#3a3a3c]">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="my-3 space-y-1.5">{children}</ul>
                  ),
                  li: ({ children }) => (
                    <li className="flex items-start gap-2 list-none text-[#3a3a3c]">
                      <span className="text-[#8e8e93] mt-0.5">•</span>
                      <span>{children}</span>
                    </li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-[#1c1c1e]">{children}</strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-[#3a3a3c]">{children}</em>
                  ),
                  hr: () => (
                    <hr className="border-[#e5e5e7] my-5" />
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-2 border-[#c7c7cc] pl-4 my-4 text-[#636366] italic">
                      {children}
                    </blockquote>
                  ),
                  a: ({ href, children }) => (
                    <a href={href} className="text-[#007AFF] hover:underline" target="_blank" rel="noopener noreferrer">
                      {children}
                    </a>
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
        
        {/* Home indicator */}
        <div className="bg-white pb-2 pt-1 flex justify-center">
          <div className="w-32 h-1 bg-[#1c1c1e] rounded-full" />
        </div>
      </div>
      
      {/* Subtle shadow */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[80%] h-6 bg-gradient-to-b from-black/10 to-transparent rounded-full blur-xl" />
    </motion.div>
  );
};
