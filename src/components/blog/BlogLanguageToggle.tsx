import { Globe } from "lucide-react";
import type { BlogLanguage } from "@/hooks/useBlogLanguage";

interface BlogLanguageToggleProps {
  currentLang: BlogLanguage;
  onToggle: (lang: BlogLanguage) => void;
}

export const BlogLanguageToggle = ({ currentLang, onToggle }: BlogLanguageToggleProps) => {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 p-0.5 text-sm" role="radiogroup" aria-label="Article language">
      <Globe className="w-3.5 h-3.5 ml-2 text-muted-foreground" aria-hidden="true" />
      {(['it', 'en'] as const).map((lang) => (
        <button
          key={lang}
          role="radio"
          aria-checked={currentLang === lang}
          onClick={() => onToggle(lang)}
          className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide transition-colors ${
            currentLang === lang
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  );
};
