import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, Sparkles, ExternalLink, Loader2, AlertCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import perplexityLogo from "@/assets/perplexity-logo.svg";

interface AIResponse {
  answer: string;
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
    // Auto-submit the follow-up question
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

  return (
    <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-accent/5 rounded-2xl p-6 sm:p-8 border border-primary/20">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold">{t("aiSearch.title")}</h3>
            <p className="text-sm text-muted-foreground">{t("aiSearch.subtitle")}</p>
          </div>
        </div>
        
        <a 
          href="https://perplexity.ai" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0"
        >
          <span className="hidden sm:inline">{t("aiSearch.poweredBy")}</span>
          <img src={perplexityLogo} alt="Perplexity" className="h-5 w-5" />
        </a>
      </div>

      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("aiSearch.placeholder")}
            className="pl-10 h-12 bg-background/80 border-primary/20 focus:border-primary"
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading || query.trim().length < 3}
          className="h-12 px-6"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {t("aiSearch.searching")}
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
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
          <div className="bg-background/80 rounded-xl p-4 sm:p-6 border">
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">
              {response.answer}
            </p>
          </div>

          {/* Citations */}
          {response.citations && response.citations.length > 0 && (
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
