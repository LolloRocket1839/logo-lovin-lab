import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { CheckSquare, Square, ChevronLeft, Share, MoreHorizontal, Undo2, Redo2, ListChecks, Pencil, Type, SquarePen } from "lucide-react";

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

  // Format date in Italian style like iOS
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric',
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return d.toLocaleDateString('it-IT', options).replace(',', ' alle ore');
  };

  return (
    <div className="relative max-w-sm mx-auto my-8">
      {/* iPhone-like container without frame */}
      <div className="relative bg-[#65C466] rounded-[2.5rem] overflow-hidden shadow-2xl">
        {/* Status bar - green background */}
        <div className="flex justify-between items-center px-8 pt-4 pb-2 text-sm text-white font-medium">
          <span>Salt 4G</span>
          <span className="font-semibold">20:57</span>
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
        
        {/* Navigation bar - green background */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-1 text-white">
            <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
            <span className="text-lg">Indietro</span>
          </div>
          <div className="flex items-center gap-2">
            {/* Yellow circular icons */}
            <div className="w-8 h-8 rounded-full bg-[#FFCC00] flex items-center justify-center">
              <Undo2 className="w-4 h-4 text-[#65C466]" strokeWidth={2.5} />
            </div>
            <div className="w-8 h-8 rounded-full bg-[#FFCC00] flex items-center justify-center">
              <Redo2 className="w-4 h-4 text-[#65C466]" strokeWidth={2.5} />
            </div>
            <div className="w-8 h-8 rounded-full bg-[#FFCC00] flex items-center justify-center">
              <Share className="w-4 h-4 text-[#65C466]" strokeWidth={2.5} />
            </div>
            <div className="w-8 h-8 rounded-full bg-[#FFCC00] flex items-center justify-center">
              <MoreHorizontal className="w-4 h-4 text-[#65C466]" strokeWidth={2.5} />
            </div>
          </div>
        </div>
        
        {/* Content area - cream/yellow background */}
        <div className="bg-[#FEF9E7] min-h-[500px] pb-20">
          {/* Date */}
          <div className="px-5 pt-4 pb-2">
            <p className="text-xs text-[#8e8e93] text-center">
              {formatDate(date)}
            </p>
          </div>
          
          {/* Main content */}
          <div className="px-5 py-2">
            {/* Title in Notes style */}
            <h1 className="text-2xl font-bold text-[#1c1c1e] mb-4 font-['SF_Pro_Text',_system-ui,_-apple-system,_sans-serif]">
              {title}
            </h1>
            
            {/* Markdown content */}
            <div className="notes-content text-[#1c1c1e] text-base leading-relaxed font-['SF_Pro_Text',_system-ui,_-apple-system,_sans-serif]">
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
                              <CheckSquare className="w-5 h-5 text-[#FFCC00] mt-0.5 flex-shrink-0" />
                              <span className="line-through text-[#8e8e93]">
                                {line.replace('✓CHECKED✓', '').trim()}
                              </span>
                            </div>
                          );
                        }
                        if (line.includes('✓UNCHECKED✓')) {
                          return (
                            <div key={i} className="flex items-start gap-2 my-1">
                              <Square className="w-5 h-5 text-[#FFCC00] mt-0.5 flex-shrink-0" />
                              <span>{line.replace('✓UNCHECKED✓', '').trim()}</span>
                            </div>
                          );
                        }
                        return <span key={i}>{line}</span>;
                      });
                      return <div className="my-2">{items}</div>;
                    }
                    return <p className="my-2 leading-relaxed">{children}</p>;
                  },
                  ul: ({ children }) => (
                    <ul className="my-2 space-y-1">{children}</ul>
                  ),
                  li: ({ children }) => {
                    const text = String(children);
                    if (text.includes('✓CHECKED✓')) {
                      return (
                        <li className="flex items-start gap-2 list-none">
                          <CheckSquare className="w-5 h-5 text-[#FFCC00] mt-0.5 flex-shrink-0" />
                          <span className="line-through text-[#8e8e93]">
                            {text.replace('✓CHECKED✓', '').trim()}
                          </span>
                        </li>
                      );
                    }
                    if (text.includes('✓UNCHECKED✓')) {
                      return (
                        <li className="flex items-start gap-2 list-none">
                          <Square className="w-5 h-5 text-[#FFCC00] mt-0.5 flex-shrink-0" />
                          <span>{text.replace('✓UNCHECKED✓', '').trim()}</span>
                        </li>
                      );
                    }
                    return (
                      <li className="flex items-start gap-2 list-none">
                        <span className="text-[#FFCC00]">•</span>
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
                    <blockquote className="border-l-4 border-[#FFCC00] pl-4 my-4 italic text-[#8e8e93]">
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
        </div>
        
        {/* Bottom toolbar - authentic iOS style */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#FEF9E7] border-t border-[#e5dcc8] px-6 py-4 flex justify-between items-center">
          <div className="flex gap-8">
            <ListChecks className="w-6 h-6 text-[#FFCC00]" strokeWidth={2} />
            <Pencil className="w-6 h-6 text-[#FFCC00]" strokeWidth={2} />
            <Type className="w-6 h-6 text-[#FFCC00]" strokeWidth={2} />
          </div>
          <SquarePen className="w-6 h-6 text-[#FFCC00]" strokeWidth={2} />
        </div>
      </div>
      
      {/* Subtle shadow effect */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[85%] h-8 bg-gradient-to-b from-black/15 to-transparent rounded-full blur-xl" />
    </div>
  );
};
