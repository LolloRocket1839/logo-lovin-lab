import { createClient } from 'npm:@supabase/supabase-js@2'
import {
  sendTemplateEmail,
  type SendTemplateEmailOptions,
  type SendTemplateEmailResult,
} from './send-email.ts'

// Server-only helper: sends a registered template through Lovable's managed
// email API and appends the project's own delivery row to `email_send_log`.
// The log row is informational — it never decides the send result.

function logClient() {
  const url = Deno.env.get('SUPABASE_URL')
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!url || !serviceKey) return null
  return createClient(url, serviceKey)
}

async function appendLog(row: {
  template_name: string
  recipient_email: string
  status: 'sent' | 'suppressed' | 'failed'
  error_message?: string
}) {
  const supabase = logClient()
  if (!supabase) return
  const { error } = await supabase.from('email_send_log').insert({
    message_id: null,
    template_name: row.template_name,
    recipient_email: row.recipient_email,
    status: row.status,
    error_message: row.error_message ?? null,
  })
  if (error) {
    console.error('email_send_log insert failed', {
      code: error.code,
      message: error.message,
      template_name: row.template_name,
    })
  }
}

export async function sendAndLogTemplateEmail(
  templateName: string,
  to: string,
  options: SendTemplateEmailOptions = {},
): Promise<SendTemplateEmailResult> {
  const recipient = to
  try {
    const result = await sendTemplateEmail(templateName, to, options)
    await appendLog({
      template_name: templateName,
      recipient_email: recipient,
      status: result.sent ? 'sent' : 'suppressed',
    })
    return result
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown send error'
    await appendLog({
      template_name: templateName,
      recipient_email: recipient,
      status: 'failed',
      error_message: message,
    })
    throw error
  }
}
