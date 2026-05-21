import { useEffect, useState } from "react";
import { BookOpen, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReadingMode } from "./ReadingModeProvider";

interface StickyArticleHeaderProps {
  title: string;
  onShare?: () => void;
  lang: "it" | "en";
}

export const StickyArticleHeader = ({ title, onShare, lang }: StickyArticleHeaderProps) => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const { readingMode, toggle } = useReadingMode();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 480);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      )}
      aria-hidden={!visible}
    >
      <div className="bg-background/85 backdrop-blur-lg border-b border-border/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-12 flex items-center gap-3">
          <p className="flex-1 truncate text-sm font-medium text-foreground">
            {title}
          </p>
          <button
            onClick={toggle}
            aria-pressed={readingMode}
            aria-label={lang === "it" ? "Modalità lettura" : "Reading mode"}
            className={cn(
              "h-8 w-8 inline-flex items-center justify-center rounded-full transition-colors",
              readingMode
                ? "bg-primary/15 text-primary"
                : "hover:bg-muted text-muted-foreground"
            )}
          >
            <BookOpen className="w-4 h-4" />
          </button>
          {onShare && (
            <button
              onClick={onShare}
              aria-label={lang === "it" ? "Condividi" : "Share"}
              className="h-8 w-8 inline-flex items-center justify-center rounded-full hover:bg-muted text-muted-foreground transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="h-[2px] bg-transparent">
          <div
            className="h-full bg-primary transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
