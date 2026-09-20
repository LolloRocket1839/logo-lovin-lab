import { createClient } from 'npm:@supabase/supabase-js@2'
import { sendAndLogTemplateEmail } from '../_shared/transactional-email-templates/send-and-log.ts'

// Trigger: a lead was just created (website form, MCP tool).
// Sends the lead its confirmation and Lorenzo the admin notification.
// Recipients are never arbitrary: a non-service-role caller may only trigger a
// send to an address that appears in a lead row created in the last 10 minutes.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
}

function json(data: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405)
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
    console.error('Missing required environment variables')
    return json({ error: 'Server configuration error' }, 500)
  }

  // Require a Bearer JWT (anon, signed-in user, or service role).
  const authHeader = req.headers.get('Authorization') ?? ''
  if (!authHeader.toLowerCase().startsWith('bearer ')) {
    return json({ error: 'Unauthorized' }, 401)
  }
  const token = authHeader.slice(7).trim()
  const isServiceRole = token === supabaseServiceKey
  if (!isServiceRole) {
    const authClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    })
    const { data: claimsData, error: claimsError } =
      await authClient.auth.getClaims(token)
    if (claimsError || !claimsData?.claims) {
      return json({ error: 'Unauthorized' }, 401)
    }
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Invalid JSON in request body' }, 400)
  }

  const email = String(body.email ?? '').trim().toLowerCase()
  const leadType = String(body.leadType ?? 'general')
  if (!email || email.length > 255 || !EMAIL_RE.test(email)) {
    return json({ error: 'A valid email is required' }, 400)
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  if (!isServiceRole) {
    const sinceIso = new Date(Date.now() - 10 * 60 * 1000).toISOString()
    const [leadsRes, investorRes, sellerRes] = await Promise.all([
      supabase.from('leads').select('id').eq('email', email).gte('created_at', sinceIso).limit(1),
      supabase.from('investor_interest').select('id').eq('email', email).gte('created_at', sinceIso).limit(1),
      supabase.from('seller_leads').select('id').eq('email', email).gte('created_at', sinceIso).limit(1),
    ])
    const recentlyOptedIn =
      (leadsRes.data && leadsRes.data.length > 0) ||
      (investorRes.data && investorRes.data.length > 0) ||
      (sellerRes.data && sellerRes.data.length > 0)
    if (!recentlyOptedIn) {
      console.warn('Rejected lead emails: recipient not a recent lead', { leadType })
      return json({ error: 'Recipient not permitted for this caller' }, 403)
    }
  }

  const idempotencyBase =
    typeof body.idempotencyBase === 'string' && body.idempotencyBase
      ? body.idempotencyBase.slice(0, 120)
      : `${email}-${Date.now()}`

  const confirmTemplate =
    leadType === 'seller' ? 'seller-confirmation' : 'lead-confirmation'

  const confirmData: Record<string, unknown> = { leadType }
  if (typeof body.estimatedValue === 'string' && body.estimatedValue) {
    confirmData.estimatedValue = body.estimatedValue
  }

  const notificationData = {
    email,
    name: body.name ?? undefined,
    phone: body.phone ?? undefined,
    leadType,
    source: body.source ?? undefined,
    utmSource: body.utmSource ?? undefined,
    utmMedium: body.utmMedium ?? undefined,
    utmCampaign: body.utmCampaign ?? undefined,
    metadata: body.metadata ?? undefined,
  }

  let confirmed = false
  let notified = false

  try {
    const result = await sendAndLogTemplateEmail(confirmTemplate, email, {
      templateData: confirmData,
      idempotencyKey: `lead-confirm-${idempotencyBase}`,
    })
    confirmed = result.sent
  } catch (error) {
    console.error('Lead confirmation email failed', {
      message: error instanceof Error ? error.message : 'unknown',
    })
  }

  try {
    const result = await sendAndLogTemplateEmail('lead-notification', '', {
      templateData: notificationData,
      idempotencyKey: `lead-notify-${idempotencyBase}`,
    })
    notified = result.sent
  } catch (error) {
    console.error('Lead notification email failed', {
      message: error instanceof Error ? error.message : 'unknown',
    })
  }

  return json({ success: true, confirmed, notified })
})
