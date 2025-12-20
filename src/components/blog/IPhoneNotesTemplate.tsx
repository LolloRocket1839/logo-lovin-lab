import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { CheckSquare, Square } from "lucide-react";

interface IPhoneNotesTemplateProps {
  content: string;
  title: string;
  date: string;
}

export const IPhoneNotesTemplate = ({ content, title, date }: IPhoneNotesTemplateProps) => {
  // Process content to handle checkboxes
  const processCheckboxes = (text: string) => {
    return text
      .replace(/- \[x\]/gi, '✓CHECKED✓')
      .replace(/- \[ \]/g, '✓UNCHECKED✓');
  };

  const processedContent = processCheckboxes(content);

  return (
    <div className="relative max-w-2xl mx-auto my-8">
      {/* iPhone frame */}
      <div className="relative bg-[#1c1c1e] rounded-[3rem] p-3 shadow-2xl">
        {/* Dynamic Island */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-10" />
        
        {/* Screen */}
        <div className="relative bg-gradient-to-b from-[#fffef0] via-[#fffce8] to-[#fff8dc] rounded-[2.5rem] overflow-hidden min-h-[600px]">
          {/* Status bar */}
          <div className="flex justify-between items-center px-8 pt-4 pb-2 text-xs text-[#3c3c43]/60">
            <span className="font-medium">9:41</span>
            <div className="flex gap-1 items-center">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3C7.46 3 3.34 4.78.29 7.67c-.18.18-.29.43-.29.71 0 .28.11.53.29.71l11.29 11.29c.39.39 1.02.39 1.41 0l11.29-11.29c.18-.18.29-.43.29-.71 0-.28-.11-.53-.29-.71C21.66 4.78 17.54 3 12 3z"/>
              </svg>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 4h-3V2h-4v2H7v18h10V4z"/>
              </svg>
            </div>
          </div>
          
          {/* Notes header */}
          <div className="px-6 pb-4 border-b border-[#d1c4a9]/30">
            <div className="flex items-center gap-2 text-[#ff9500] text-sm mb-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Notes</span>
            </div>
            <p className="text-xs text-[#8e8e93]">
              {new Date(date).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
              })}
            </p>
          </div>
          
          {/* Content area with lines */}
          <div 
            className="px-6 py-4 space-y-0"
            style={{
              backgroundImage: `repeating-linear-gradient(
                transparent,
                transparent 27px,
                #d1c4a9 27px,
                #d1c4a9 28px
              )`,
              backgroundPositionY: '8px'
            }}
          >
            {/* Title in Notes style */}
            <h1 className="text-2xl font-bold text-[#1c1c1e] leading-[28px] mb-4 font-['SF_Pro_Text',_system-ui,_-apple-system,_sans-serif]">
              {title}
            </h1>
            
            {/* Markdown content */}
            <div className="notes-content text-[#1c1c1e] text-base leading-[28px] font-['SF_Pro_Text',_system-ui,_-apple-system,_sans-serif]">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-2xl font-bold mt-6 mb-2 text-[#1c1c1e]">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-xl font-bold mt-6 mb-2 text-[#1c1c1e]">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-lg font-semibold mt-4 mb-2 text-[#1c1c1e]">{children}</h3>
                  ),
                  p: ({ children }) => {
                    const text = String(children);
                    // Handle checkbox markers
                    if (text.includes('✓CHECKED✓') || text.includes('✓UNCHECKED✓')) {
                      const items = text.split('\n').map((line, i) => {
                        if (line.includes('✓CHECKED✓')) {
                          return (
                            <div key={i} className="flex items-start gap-2 my-1">
                              <CheckSquare className="w-5 h-5 text-[#ff9500] mt-0.5 flex-shrink-0" />
                              <span className="line-through text-[#8e8e93]">
                                {line.replace('✓CHECKED✓', '').trim()}
                              </span>
                            </div>
                          );
                        }
                        if (line.includes('✓UNCHECKED✓')) {
                          return (
                            <div key={i} className="flex items-start gap-2 my-1">
                              <Square className="w-5 h-5 text-[#ff9500] mt-0.5 flex-shrink-0" />
                              <span>{line.replace('✓UNCHECKED✓', '').trim()}</span>
                            </div>
                          );
                        }
                        return <span key={i}>{line}</span>;
                      });
                      return <div className="my-2">{items}</div>;
                    }
                    return <p className="my-2 leading-[28px]">{children}</p>;
                  },
                  ul: ({ children }) => (
                    <ul className="my-2 space-y-1">{children}</ul>
                  ),
                  li: ({ children }) => {
                    const text = String(children);
                    if (text.includes('✓CHECKED✓')) {
                      return (
                        <li className="flex items-start gap-2 list-none">
                          <CheckSquare className="w-5 h-5 text-[#ff9500] mt-0.5 flex-shrink-0" />
                          <span className="line-through text-[#8e8e93]">
                            {text.replace('✓CHECKED✓', '').trim()}
                          </span>
                        </li>
                      );
                    }
                    if (text.includes('✓UNCHECKED✓')) {
                      return (
                        <li className="flex items-start gap-2 list-none">
                          <Square className="w-5 h-5 text-[#ff9500] mt-0.5 flex-shrink-0" />
                          <span>{text.replace('✓UNCHECKED✓', '').trim()}</span>
                        </li>
                      );
                    }
                    return (
                      <li className="flex items-start gap-2 list-none">
                        <span className="text-[#ff9500]">•</span>
                        <span>{children}</span>
                      </li>
                    );
                  },
                  strong: ({ children }) => (
                    <strong className="font-semibold text-[#1c1c1e]">{children}</strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic">{children}</em>
                  ),
                  hr: () => (
                    <hr className="border-[#d1c4a9] my-4" />
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-[#ff9500] pl-4 my-4 italic text-[#8e8e93]">
                      {children}
                    </blockquote>
                  ),
                  a: ({ href, children }) => (
                    <a href={href} className="text-[#007aff] underline" target="_blank" rel="noopener noreferrer">
                      {children}
                    </a>
                  ),
                }}
              >
                {processedContent}
              </ReactMarkdown>
            </div>
          </div>
          
          {/* Bottom toolbar */}
          <div className="absolute bottom-0 left-0 right-0 bg-[#fffef0]/90 backdrop-blur-sm border-t border-[#d1c4a9]/30 px-6 py-3 flex justify-between items-center rounded-b-[2.5rem]">
            <div className="flex gap-6">
              <svg className="w-6 h-6 text-[#ff9500]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <svg className="w-6 h-6 text-[#ff9500]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              </svg>
            </div>
            <svg className="w-6 h-6 text-[#ff9500]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Reflection effect */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-8 bg-gradient-to-b from-black/10 to-transparent rounded-full blur-xl" />
    </div>
  );
};
