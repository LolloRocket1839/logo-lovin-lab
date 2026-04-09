

## Priority Fixes and Improvements for Jungle Rent

### CRITICAL FIX: Emails are broken (401 errors)

The `send-transactional-email` edge function has `verify_jwt = true` in `supabase/config.toml`, but `useLeadCapture.ts` calls it without an authenticated user session. Every email attempt returns **401 Unauthorized** — no confirmation emails, no admin notifications are being sent.

**Fix:** Change `verify_jwt = false` for `send-transactional-email` in `config.toml` (line 46). The function already validates inputs and uses service role internally — JWT verification at the gateway level is unnecessary and blocks unauthenticated lead submissions.

Same issue applies to `process-email-queue` (line 43) — it should also be `verify_jwt = false` if triggered by cron or other functions.

---

### After fixing emails, here's a prioritized roadmap:

#### 1. Test the email flow end-to-end
After the JWT fix, submit a test lead and verify both the confirmation email to the lead and the admin notification arrive correctly.

#### 2. Admin lead dashboard
You have 1 lead in the database and no way to view them except raw SQL. Build a simple authenticated admin page (`/admin/leads`) showing all leads with filters by type, source, and date.

#### 3. og:image upgrade
All pages currently use the SVG logo as `og:image`. Social shares (WhatsApp, LinkedIn, Twitter) render poorly with SVGs. Create a proper 1200x630px PNG/JPG card for the homepage and key landing pages.

#### 4. Error boundaries
No `ErrorBoundary` component exists anywhere. A single runtime error crashes the entire app. Add a global error boundary wrapping `AnimatedRoutes`.

#### 5. ADMIN_NOTIFICATION_EMAIL secret
You mentioned submitting a password instead of an email address for this secret. This needs to be corrected — otherwise admin notification emails go to a nonsensical address.

---

### Technical Summary

| Item | Change | Files |
|------|--------|-------|
| Fix email 401 | Set `verify_jwt = false` | `supabase/config.toml` |
| Fix admin email secret | Update secret value | Secrets manager |
| Error boundary | New component + wrap routes | `src/components/ErrorBoundary.tsx`, `App.tsx` |
| Admin dashboard | New protected page | `src/pages/admin/Leads.tsx`, routes |
| OG images | Create PNG assets | `public/`, page Helmet tags |

