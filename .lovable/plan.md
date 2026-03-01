

# Add "send email" tool to the MCP server

## Problem
The MCP server exposes 8 tools for AI agents, but none lets a user send a message to Jungle Rent. If someone asks an AI agent "contact Jungle Rent for me", the agent has no way to do it.

## Solution
Add a 9th MCP tool called `contact_jungle_rent` that sends an email via the existing Formspree endpoint (`https://formspree.io/f/xeojbzow`) directly from the edge function.

### Tool definition
- **Name**: `contact_jungle_rent`
- **Inputs**: `name` (string, required), `email` (string, required), `message` (string, required), `category` (enum: investor/student/seller/tourist/general, optional), `phone` (string, optional)
- **Behavior**: Validates inputs server-side (email format, string length limits, sanitization), then POSTs to Formspree. Returns success confirmation with a follow-up WhatsApp link.

### Security
- Email format validation
- Name max 100 chars, message max 2000 chars, phone max 20 chars
- HTML entity sanitization on all string inputs
- Category allowlist

### File modified
- `supabase/functions/mcp-server/index.ts` — add the `contact_jungle_rent` tool (~50 lines) before the HTTP transport section

### What the tool returns to the AI agent
```json
{
  "success": true,
  "message": "Email sent to Jungle Rent. They will reply within 24 hours.",
  "alternativeContact": {
    "whatsapp": "https://wa.me/393319053037",
    "email": "junglerententeprise@gmail.com"
  }
}
```

