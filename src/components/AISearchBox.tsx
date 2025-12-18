import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Search, ExternalLink, Loader2, AlertCircle, MessageCircle, BookOpen, Globe, ArrowRight, Sparkles, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import perplexityLogo from "@/assets/perplexity-logo.svg";

interface ArticleLink {
  slug: string;
  title: string;
  url: string;
}

interface AIResponse {
  answer: string;
  source: 'jungle_rent' | 'perplexity';
  articles?: ArticleLink[];
  citations: string[];
  followUpQuestions: string[];
  query: string;
  language: string;
}

export const AISearchBox = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFollowUp = (question: string) => {
    setQuery(question);
    setIsLoading(true);
    setError(null);
    setResponse(null);
    
    supabase.functions.invoke('perplexity-search', {
      body: {
        query: question.trim(),
        language: i18n.language.startsWith('it') ? 'it' : 'en',
      },
    }).then(({ data, error: fnError }) => {
      if (fnError || data?.error) {
        setError(t("aiSearch.error"));
      } else {
        setResponse(data as AIResponse);
      }
      setIsLoading(false);
    }).catch(() => {
      setError(t("aiSearch.error"));
      setIsLoading(false);
    });
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim() || query.trim().length < 3) {
      toast({
        title: t("aiSearch.errorTitle"),
        description: t("aiSearch.minChars"),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('perplexity-search', {
        body: {
          query: query.trim(),
          language: i18n.language.startsWith('it') ? 'it' : 'en',
        },
      });

      if (fnError) {
        throw new Error(fnError.message);
      }

      if (data.error) {
        if (data.error === 'rate_limit') {
          setError(t("aiSearch.rateLimit"));
        } else {
          setError(t("aiSearch.error"));
        }
        return;
      }

      setResponse(data as AIResponse);
    } catch (err) {
      console.error('AI Search error:', err);
      setError(t("aiSearch.error"));
    } finally {
      setIsLoading(false);
    }
  };

  const extractDomain = (url: string): string => {
    try {
      const domain = new URL(url).hostname.replace('www.', '');
      return domain;
    } catch {
      return url;
    }
  };

  const isJungleRent = response?.source === 'jungle_rent';
  const sourceLabel = i18n.language.startsWith('it')
    ? (isJungleRent ? 'Dalle nostre guide' : 'Da Perplexity AI')
    : (isJungleRent ? 'From our guides' : 'From Perplexity AI');

  return (
    <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-accent/5 rounded-2xl p-5 sm:p-8 border border-primary/20">
      {/* Header */}
      <div className="flex items-start gap-3 mb-5">
        <div className="p-2.5 bg-[#1a7b7b] rounded-xl shadow-lg">
          <img src={perplexityLogo} alt="Perplexity" className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-bold text-foreground">{t("aiSearch.title")}</h3>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-0.5">
            <a 
              href="https://perplexity.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-primary/80 hover:text-primary transition-colors font-medium"
            >
              Powered by Perplexity AI
            </a>
            <span className="text-muted-foreground/50 hidden sm:inline">·</span>
            <p className="text-xs text-muted-foreground">{t("aiSearch.subtitle")}</p>
          </div>
        </div>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex flex-col gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("aiSearch.placeholder")}
            className="pl-10 h-12 bg-background/80 border-primary/20 focus:border-primary text-base"
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading || query.trim().length < 3}
          className="h-12 w-full sm:w-auto sm:px-8 font-semibold gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {t("aiSearch.searching")}
            </>
          ) : (
            <>
              <img src={perplexityLogo} alt="" className="h-4 w-4 brightness-0 invert" />
              {t("aiSearch.askButton")}
            </>
          )}
        </Button>
      </form>

      {/* Error State */}
      {error && (
        <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Response */}
      {response && (
        <div className="mt-6 space-y-4">
          {/* Source Badge with Updated Data Indicator */}
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full ${
              isJungleRent 
                ? 'bg-primary/10 text-primary border border-primary/20' 
                : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
            }`}>
              {isJungleRent ? (
                <BookOpen className="h-3 w-3" />
              ) : (
                <Globe className="h-3 w-3" />
              )}
              {sourceLabel}
            </span>
            {/* Fresh Data Badge - only for Perplexity responses */}
            {!isJungleRent && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <Sparkles className="h-3 w-3" />
                {i18n.language.startsWith('it') ? 'Dati aggiornati 2025' : 'Updated data 2025'}
              </span>
            )}
          </div>

          {/* Answer */}
          <div className="bg-background/80 rounded-xl p-4 sm:p-6 border">
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">
              {response.answer}
            </p>
          </div>

          {/* Related Articles from Jungle Rent */}
          {response.articles && response.articles.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                {i18n.language.startsWith('it') ? 'Approfondisci su Jungle Rent' : 'Read more on Jungle Rent'}
              </h4>
              <div className="grid gap-2">
                {response.articles.map((article, index) => (
                  <Link
                    key={index}
                    to={article.url}
                    className="flex items-center justify-between gap-3 p-3 bg-primary/5 hover:bg-primary/10 border border-primary/20 rounded-lg transition-colors group"
                  >
                    <span className="text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {article.title}
                    </span>
                    <ArrowRight className="h-4 w-4 text-primary shrink-0 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Citations (only for Perplexity responses) */}
          {!isJungleRent && response.citations && response.citations.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                {t("aiSearch.sources")}
              </h4>
              <div className="flex flex-wrap gap-2">
                {response.citations.map((citation, index) => (
                  <a
                    key={index}
                    href={citation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-muted hover:bg-muted/80 rounded-full transition-colors"
                  >
                    <span className="text-primary font-medium">{index + 1}</span>
                    <span className="text-muted-foreground truncate max-w-[150px]">
                      {extractDomain(citation)}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Follow-up Questions */}
          {response.followUpQuestions && response.followUpQuestions.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                {t("aiSearch.followUp")}
              </h4>
              <div className="flex flex-col gap-2">
                {response.followUpQuestions.map((question, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleFollowUp(question)}
                    disabled={isLoading}
                    className="text-left text-sm px-4 py-2.5 bg-primary/5 hover:bg-primary/10 border border-primary/20 rounded-lg transition-colors text-foreground hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Example Queries */}
      {!response && !isLoading && (
        <div className="mt-4">
          <p className="text-xs text-muted-foreground mb-2">{t("aiSearch.examples")}</p>
          <div className="flex flex-wrap gap-2">
            {[
              t("aiSearch.example1"),
              t("aiSearch.example2"),
              t("aiSearch.example3"),
            ].map((example, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setQuery(example)}
                className="text-xs px-3 py-1.5 bg-muted/50 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
