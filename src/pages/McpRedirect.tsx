import { useEffect } from "react";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID;
const MCP_URL = `https://${projectRef}.supabase.co/functions/v1/mcp`;

export default function McpRedirect() {
  useEffect(() => {
    window.location.replace(MCP_URL);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <p className="text-muted-foreground">Redirecting to Jungle Rent MCP…</p>
    </main>
  );
}
