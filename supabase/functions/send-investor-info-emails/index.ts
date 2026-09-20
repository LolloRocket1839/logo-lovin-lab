import { createClient } from 'npm:@supabase/supabase-js@2'
import { sendAndLogTemplateEmail } from '../_shared/transactional-email-templates/send-and-log.ts'

// Trigger: an investor information request was just submitted.
// Sends the investor the confirmation and Lorenzo the admin notification.

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
  if (!email || email.length > 255 || !EMAIL_RE.test(email)) {
    return json({ error: 'A valid email is required' }, 400)
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  if (!isServiceRole) {
    const sinceIso = new Date(Date.now() - 10 * 60 * 1000).toISOString()
    const { data: recent } = await supabase
      .from('investor_interest')
      .select('id')
      .eq('email', email)
      .gte('created_at', sinceIso)
      .limit(1)
    if (!recent || recent.length === 0) {
      console.warn('Rejected investor emails: recipient not a recent request')
      return json({ error: 'Recipient not permitted for this caller' }, 403)
    }
  }

  const idempotencyBase =
    typeof body.idempotencyBase === 'string' && body.idempotencyBase
      ? body.idempotencyBase.slice(0, 120)
      : `${email}-${Date.now()}`

  const templateData = (body.templateData ?? {}) as Record<string, unknown>

  let confirmed = false
  let notified = false

  try {
    const result = await sendAndLogTemplateEmail(
      'investor-info-request-confirmation',
      email,
      { templateData, idempotencyKey: `${idempotencyBase}-confirm` },
    )
    confirmed = result.sent
  } catch (error) {
    console.error('Investor confirmation email failed', {
      message: error instanceof Error ? error.message : 'unknown',
    })
  }

  try {
    const result = await sendAndLogTemplateEmail(
      'investor-info-request-notification',
      '',
      { templateData, idempotencyKey: `${idempotencyBase}-notify` },
    )
    notified = result.sent
  } catch (error) {
    console.error('Investor notification email failed', {
      message: error instanceof Error ? error.message : 'unknown',
    })
  }

  return json({ success: true, confirmed, notified })
})
