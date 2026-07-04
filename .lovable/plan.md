Replace the long Supabase MCP URL with a short branded `junglerent.it/mcp` redirect on the Connect page and across the app, while keeping the actual endpoint in technical discovery files so agents still reach the function.

### Changes

1. **Add `/mcp` redirect route**
   - Create `src/pages/McpRedirect.tsx` — a minimal component that does `window.location.replace(fullMcpUrl)` immediately on mount.
   - Register the route at `/mcp` in `src/components/AnimatedRoutes.tsx`.

2. **Update the Connect page to show the short URL**
   - In `src/pages/Connect.tsx`, change the displayed and copied URL from the raw `https://<ref>.supabase.co/functions/v1/mcp` to `${window.location.origin}/mcp`.
   - Keep the URL card label, copy button, and surrounding copy exactly the same.

3. **Keep technical discovery files on the real endpoint**
   - `public/.well-known/mcp.json`, `public/.well-known/agent-card.json`, and any other machine-readable files continue to point to the actual Supabase function URL. Agents read these directly; they do not follow user-facing redirects.

### Result
- Humans visiting `/connect` copy `junglerent.it/mcp` (or `junglerent.it/mcp` on the custom domain) instead of the long Supabase string.
- Visiting `/mcp` in a browser instantly redirects to the live MCP endpoint.
- All agent-facing metadata stays on the canonical endpoint so integrations remain stable.