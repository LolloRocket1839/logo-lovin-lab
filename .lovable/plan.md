## Plan: keep the MCP surface as it is

You chose to keep `/connect` public, so nothing needs to change.

### Current state (already working)
- **Public page** `/connect` — explains agent integrations, shows the branded `https://junglerent.it/mcp` URL with copy button, and ChatGPT/Claude setup instructions.
- **Short redirect** `/mcp` — instantly redirects visitors to the real Supabase MCP endpoint.
- **Live MCP server** at the Supabase function URL — external AI assistants (ChatGPT, Claude, Cursor, etc.) connect here and get Jungle Rent's tools.
- **Footer links** on desktop and mobile point to `/connect` for discoverability.

### Why this is a good choice
- Signals to investors and journalists that Jungle Rent is "agent-ready" — a differentiator few Italian proptech sites have.
- Zero maintenance cost: the page is static; the endpoint runs itself.
- The branded `junglerent.it/mcp` URL is memorable and reinforces the domain.

### No files will be changed
Nothing to implement — the current setup already matches this decision.

If later you want to remove the public surface but keep the endpoint working for people who know the URL, just say so and I'll delete the page, redirect, and footer links in one pass.
