import { useState } from "react";
import { Copy, Check, Bot, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Seo } from "@/components/Seo";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

const MCP_SERVER_URL = `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/functions/v1/mcp`;

export default function Connect() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(MCP_SERVER_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Seo
        title="Connect Jungle Rent to ChatGPT & Claude — Agent Integrations"
        description="Connect Jungle Rent's real-estate tools (Turin neighborhoods, investor zones, rent estimators, lead submission) to ChatGPT or Claude via MCP in under a minute."
        canonical="https://junglerent.it/connect"
      />
      <Navigation />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs uppercase tracking-widest mb-4">
              <Bot className="w-3.5 h-3.5" /> Agent integrations
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold mb-4">
              Connect Jungle Rent to your AI assistant
            </h1>
            <p className="text-muted-foreground text-lg font-light">
              Use Jungle Rent's Turin real-estate tools directly inside ChatGPT or Claude. Paste one URL — that's it.
            </p>
          </div>

          {/* MCP URL */}
          <Card className="p-6 md:p-8 mb-10 border-primary/20">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">MCP server URL</p>
            <div className="flex items-center gap-3 bg-muted/50 rounded-lg px-4 py-3 border border-border">
              <code className="flex-1 text-sm md:text-base break-all font-mono text-foreground">
                {MCP_SERVER_URL}
              </code>
              <Button
                size="sm"
                variant="default"
                onClick={handleCopy}
                aria-label="Copy MCP URL"
                className="shrink-0"
              >
                {copied ? (
                  <><Check className="w-4 h-4 mr-1.5" /> Copied</>
                ) : (
                  <><Copy className="w-4 h-4 mr-1.5" /> Copy</>
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Public endpoint — no login or API key required.
            </p>
          </Card>

          {/* ChatGPT */}
          <Card className="p-6 md:p-8 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-primary" />
              <h2 className="font-display text-2xl font-bold">ChatGPT</h2>
            </div>
            <ol className="space-y-3 text-sm md:text-base text-foreground/90 list-decimal list-inside">
              <li>
                Open{" "}
                <a
                  href="https://chatgpt.com/#settings/Connectors/Advanced"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-4"
                >
                  ChatGPT → Settings → Connectors → Advanced
                </a>{" "}
                and enable Developer mode (read the risk notice).
              </li>
              <li>In the chat composer's "+" menu, turn on Developer mode.</li>
              <li>Click "Add sources", then "Connect more".</li>
              <li>Name the connector "Jungle Rent" and paste the URL above.</li>
              <li>Ask ChatGPT: <em>"Use Jungle Rent to find investor zones in Turin."</em></li>
            </ol>
          </Card>

          {/* Claude */}
          <Card className="p-6 md:p-8 mb-10">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-primary" />
              <h2 className="font-display text-2xl font-bold">Claude</h2>
            </div>
            <ol className="space-y-3 text-sm md:text-base text-foreground/90 list-decimal list-inside">
              <li>
                Open{" "}
                <a
                  href="https://claude.ai/customize/connectors?modal=add-custom-connector"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-4"
                >
                  Claude → Connectors → Add custom connector
                </a>.
              </li>
              <li>Name the connector "Jungle Rent" and paste the URL above.</li>
              <li>Enable the connector from the chat composer.</li>
              <li>Ask Claude: <em>"Use Jungle Rent to estimate rent for a 2-room in San Salvario."</em></li>
            </ol>
          </Card>

          <div className="text-center text-sm text-muted-foreground">
            <p>
              Once connected, your assistant can access Turin neighborhood data, investor zones, rent & property-value
              estimators, direct-buyer offer simulator, blog search, and submit investor/seller/student leads on your behalf.
            </p>
            <p className="mt-4">
              Need help? <a href="https://wa.me/393319053037" className="text-primary underline underline-offset-4">WhatsApp Lorenzo</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
