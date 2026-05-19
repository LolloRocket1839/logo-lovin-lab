import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Navigation } from "@/components/layout/Navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Send, ShieldCheck, BellRing, RefreshCw } from "lucide-react";

const ADMIN_EMAILS = ["lorenzo.onijoseph@gmail.com"];

interface GscSnapshot {
  id: string;
  captured_at: string;
  totals: { errors: number; warnings: number; submitted: number };
  alerts: Array<{ severity: "info" | "warn" | "critical"; type: string; message: string }>;
  alert_sent: boolean;
}

const SeoAdmin = () => {
  const { user, loading: authLoading } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [monitoring, setMonitoring] = useState(false);
  const [loadingSnapshots, setLoadingSnapshots] = useState(false);
  const [result, setResult] = useState<unknown>(null);
  const [verifyResult, setVerifyResult] = useState<any>(null);
  const [monitorResult, setMonitorResult] = useState<any>(null);
  const [snapshots, setSnapshots] = useState<GscSnapshot[]>([]);
  const [error, setError] = useState<string | null>(null);

  const isAdmin = user && ADMIN_EMAILS.includes(user.email ?? "");

  const loadSnapshots = async () => {
    setLoadingSnapshots(true);
    try {
      const { data, error } = await supabase.functions.invoke("gsc-index-monitor", { method: "GET" });
      if (error) throw error;
      setSnapshots((data as any)?.snapshots ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoadingSnapshots(false);
    }
  };

  useEffect(() => { if (isAdmin) loadSnapshots(); }, [isAdmin]);

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

  const verifyGsc = async () => {
    setVerifying(true);
    setError(null);
    setVerifyResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("verify-gsc", { body: {} });
      if (error) throw error;
      setVerifyResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setVerifying(false);
    }
  };

  const runMonitor = async () => {
    setMonitoring(true);
    setError(null);
    setMonitorResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("gsc-index-monitor", { body: {} });
      if (error) throw error;
      setMonitorResult(data);
      await loadSnapshots();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setMonitoring(false);
    }
  };


  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-3xl mx-auto px-4 py-12 space-y-6">
        <h1 className="text-3xl font-serif mb-2">SEO admin</h1>

        <Card>
          <CardHeader>
            <CardTitle>Verify Google Search Console</CardTitle>
            <CardDescription>
              Fetches <code>https://junglerent.it/</code>, checks for the{" "}
              <code>google-site-verification</code> meta tag, then calls Google's verify endpoint.
              Run this after each production deploy.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={verifyGsc} disabled={verifying} variant="default">
              {verifying ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying…</>
              ) : (
                <><ShieldCheck className="mr-2 h-4 w-4" /> Verify now</>
              )}
            </Button>

            {verifyResult && (
              <div className="space-y-2">
                <div className={`text-sm font-medium px-3 py-2 rounded-md ${
                  verifyResult.overall === "verified"
                    ? "bg-green-500/10 text-green-700 dark:text-green-400"
                    : "bg-destructive/10 text-destructive"
                }`}>
                  {verifyResult.overall === "verified" && "✅ Verified by Google"}
                  {verifyResult.overall === "meta_missing" &&
                    `❌ Meta tag NOT detected on live site (HTTP ${verifyResult.metaTag?.httpStatus}). Republish required.`}
                  {verifyResult.overall === "verify_failed" &&
                    "⚠️ Meta tag detected on site, but Google verify call failed (see details)."}
                </div>
                <pre className="text-xs bg-muted p-3 rounded-md overflow-auto max-h-96">
                  {JSON.stringify(verifyResult, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Submit sitemap to Google Search Console</CardTitle>
            <CardDescription>
              Re-submits <code>https://junglerent.it/sitemap.xml</code> for the property{" "}
              <code>https://junglerent.it/</code>.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={submitSitemap} disabled={submitting} variant="outline">
              {submitting ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting…</>
              ) : (
                <><Send className="mr-2 h-4 w-4" /> Submit sitemap</>
              )}
            </Button>

            {result !== null && (
              <pre className="text-xs bg-muted p-3 rounded-md overflow-auto max-h-96">
                {JSON.stringify(result, null, 2)}
              </pre>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BellRing className="h-5 w-5" /> GSC indexing monitor &amp; alerts
            </CardTitle>
            <CardDescription>
              Cattura uno snapshot dello stato sitemap di Search Console, lo confronta con il precedente
              e invia email a <code>ADMIN_NOTIFICATION_EMAIL</code> se compaiono errori, aumentano i warning
              o calano gli URL inviati di oltre il 5%. Pianifica via pg_cron (vedi note) per esecuzione automatica giornaliera.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              <Button onClick={runMonitor} disabled={monitoring} variant="default">
                {monitoring ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Eseguo snapshot…</>
                ) : (
                  <><BellRing className="mr-2 h-4 w-4" /> Esegui ora</>
                )}
              </Button>
              <Button onClick={loadSnapshots} disabled={loadingSnapshots} variant="outline">
                {loadingSnapshots ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Carico…</>
                ) : (
                  <><RefreshCw className="mr-2 h-4 w-4" /> Ricarica storico</>
                )}
              </Button>
            </div>

            {monitorResult && (
              <div className="text-sm px-3 py-2 rounded-md bg-muted">
                Snapshot salvato — errori: <b>{monitorResult.totals?.errors}</b>,
                warning: <b>{monitorResult.totals?.warnings}</b>,
                URL inviati: <b>{monitorResult.totals?.submitted}</b>
                {monitorResult.alertSent && <span className="ml-2 text-yellow-700 dark:text-yellow-400">📧 email alert inviata</span>}
                {monitorResult.whatsappSent && <span className="ml-2 text-green-700 dark:text-green-400">📱 WhatsApp inviato</span>}
              </div>
            )}

            {snapshots.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold">Ultimi {snapshots.length} snapshot</h3>
                <div className="border rounded-md divide-y">
                  {snapshots.map((s) => (
                    <div key={s.id} className="p-3 text-sm flex flex-col gap-1">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="font-mono text-xs">
                          {new Date(s.captured_at).toLocaleString("it-IT")}
                        </span>
                        <div className="flex gap-1 flex-wrap">
                          <Badge variant={s.totals.errors > 0 ? "destructive" : "secondary"}>
                            {s.totals.errors} err
                          </Badge>
                          <Badge variant={s.totals.warnings > 0 ? "outline" : "secondary"}>
                            {s.totals.warnings} warn
                          </Badge>
                          <Badge variant="secondary">{s.totals.submitted} URL</Badge>
                          {s.alert_sent && <Badge variant="outline">📧 alert</Badge>}
                        </div>
                      </div>
                      {s.alerts?.filter((a) => a.severity !== "info").length > 0 && (
                        <ul className="text-xs text-muted-foreground list-disc list-inside">
                          {s.alerts.filter((a) => a.severity !== "info").map((a, i) => (
                            <li key={i}>
                              <span className={a.severity === "critical" ? "text-destructive" : "text-yellow-700 dark:text-yellow-400"}>
                                [{a.severity}]
                              </span>{" "}
                              {a.message}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {error && (
          <pre className="text-sm bg-destructive/10 text-destructive p-3 rounded-md overflow-auto">
            {error}
          </pre>
        )}
      </main>
    </div>
  );
};

export default SeoAdmin;
