import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import type { LinkableContent } from '@/data/linkableContent';

interface ContextualSuggestionProps {
  suggestion: LinkableContent;
  lang: 'it' | 'en';
}

const typeIcons: Record<string, string> = {
  tool: '🧮',
  page: '📄',
  blog: '📝'
};

const typeLabels: Record<string, Record<string, string>> = {
  tool: { it: 'Strumento utile', en: 'Useful tool' },
  page: { it: 'Risorsa correlata', en: 'Related resource' },
  blog: { it: 'Articolo correlato', en: 'Related article' }
};

export const ContextualSuggestion = ({ suggestion, lang }: ContextualSuggestionProps) => {
  const title = lang === 'it' ? suggestion.titleIt : suggestion.titleEn;
  const typeLabel = typeLabels[suggestion.type]?.[lang] || typeLabels.tool[lang];
  const icon = typeIcons[suggestion.type] || '📌';
  
  const ctaText = lang === 'it' ? 'Scopri di più' : 'Learn more';

  return (
    <div className="my-6 rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-4 not-prose">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 text-2xl">{icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-primary uppercase tracking-wide">
              {typeLabel}
            </span>
          </div>
          <h4 className="font-semibold text-foreground mb-2 leading-tight">
            {title}
          </h4>
          <Link 
            to={suggestion.url}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            {ctaText}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

interface ContextualSuggestionsListProps {
  suggestions: LinkableContent[];
  lang: 'it' | 'en';
}

export const ContextualSuggestionsList = ({ suggestions, lang }: ContextualSuggestionsListProps) => {
  if (suggestions.length === 0) return null;
  
  return (
    <div className="space-y-4 my-8">
      {suggestions.map((suggestion, index) => (
        <ContextualSuggestion 
          key={`${suggestion.url}-${index}`}
          suggestion={suggestion} 
          lang={lang} 
        />
      ))}
    </div>
  );
};
