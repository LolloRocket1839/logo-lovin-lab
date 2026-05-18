import { useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Navigation } from "@/components/layout/Navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";

const ADMIN_EMAILS = ["lorenzo.onijoseph@gmail.com"];

const SeoAdmin = () => {
  const { user, loading: authLoading } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);

  const isAdmin = user && ADMIN_EMAILS.includes(user.email ?? "");
  if (!authLoading && !isAdmin) return <Navigate to="/" replace />;

  const submitSitemap = async () => {
    setSubmitting(true);
    setError(null);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("submit-sitemap", { body: {} });
      if (error) throw error;
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-serif mb-6">SEO admin</h1>
        <Card>
          <CardHeader>
            <CardTitle>Submit sitemap to Google Search Console</CardTitle>
            <CardDescription>
              Re-submits <code>https://junglerent.it/sitemap.xml</code> for the property{" "}
              <code>https://junglerent.it/</code>. Run this after each production deploy that
              changes routes or published content.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={submitSitemap} disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting…
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" /> Submit sitemap
                </>
              )}
            </Button>

            {error && (
              <pre className="text-sm bg-destructive/10 text-destructive p-3 rounded-md overflow-auto">
                {error}
              </pre>
            )}
            {result !== null && (
              <pre className="text-xs bg-muted p-3 rounded-md overflow-auto max-h-96">
                {JSON.stringify(result, null, 2)}
              </pre>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SeoAdmin;
