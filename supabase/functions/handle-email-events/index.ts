import { createEmailWebhookHandler } from 'npm:@lovable.dev/email-js@0.1.0'
import { createClient } from 'npm:@supabase/supabase-js@2'

// Mirrors the project's own bookkeeping for terminal email outcomes:
// suppressed_emails (notification-only record) and the append-only
// email_send_log history. Suppression itself is enforced by Lovable.

function admin() {
  const url = Deno.env.get('SUPABASE_URL')
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!url || !serviceKey) {
    throw new Error('Missing Supabase environment variables')
  }
  return createClient(url, serviceKey)
}

const REASON_MESSAGE: Record<string, string> = {
  bounce: 'Permanent bounce — email address is invalid or rejected',
  complaint: 'Spam complaint — recipient marked email as spam',
  unsubscribe: 'Recipient unsubscribed',
}

const REASON_STATUS: Record<string, 'bounced' | 'complained' | 'suppressed'> = {
  bounce: 'bounced',
  complaint: 'complained',
  unsubscribe: 'suppressed',
}

async function record(
  eventId: string,
  recipient: string | undefined,
  reason: 'bounce' | 'complaint' | 'unsubscribe',
) {
  if (!recipient) {
    console.warn('Email event without recipient', { event_id: eventId })
    return
  }
  const supabase = admin()
  const normalizedEmail = recipient.toLowerCase()

  const { error: suppressError } = await supabase
    .from('suppressed_emails')
    .upsert(
      { email: normalizedEmail, reason, metadata: null },
      { onConflict: 'email' },
    )
  if (suppressError) {
    console.error('Failed to upsert suppressed email', {
      code: suppressError.code,
      message: suppressError.message,
      event_id: eventId,
    })
    throw new Error('Failed to write suppression')
  }

  const { error: logError } = await supabase.from('email_send_log').insert({
    message_id: null,
    template_name: 'system',
    recipient_email: normalizedEmail,
    status: REASON_STATUS[reason],
    error_message: REASON_MESSAGE[reason],
    metadata: null,
  })
  if (logError) {
    console.error('Failed to insert email_send_log', {
      code: logError.code,
      message: logError.message,
      event_id: eventId,
    })
    throw new Error('Failed to write email send log')
  }
}

const handler = createEmailWebhookHandler({
  apiKey: Deno.env.get('LOVABLE_API_KEY')!,
  on: {
    'email.bounced': async (event) => {
      await record(event.event_id, event.data?.recipient, 'bounce')
    },
    'email.complaint': async (event) => {
      await record(event.event_id, event.data?.recipient, 'complaint')
    },
    'email.unsubscribed': async (event) => {
      await record(event.event_id, event.data?.recipient, 'unsubscribe')
    },
  },
})

Deno.serve((req) => handler(req))
