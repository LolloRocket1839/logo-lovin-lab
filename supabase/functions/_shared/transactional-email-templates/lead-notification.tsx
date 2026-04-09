import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Hr, Section,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Jungle Rent"

interface LeadNotificationProps {
  email?: string
  name?: string
  phone?: string
  leadType?: string
  source?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  metadata?: Record<string, unknown>
}

const typeLabel: Record<string, string> = {
  investor: '🏦 Investitore',
  seller: '🏠 Proprietario',
  student: '🎓 Studente',
  general: '📋 Generico',
}

const LeadNotificationEmail = ({
  email = '—',
  name,
  phone,
  leadType = 'general',
  source = 'unknown',
  utmSource,
  utmMedium,
  utmCampaign,
  metadata,
}: LeadNotificationProps) => (
  <Html lang="it" dir="ltr">
    <Head />
    <Preview>Nuovo lead {typeLabel[leadType] || leadType}: {email}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={logo}>{SITE_NAME} — Admin</Text>
        <Hr style={divider} />
        <Heading style={h1}>
          {typeLabel[leadType] || leadType} — Nuovo Lead
        </Heading>

        <Section style={detailsBox}>
          <Text style={detailRow}><strong>Email:</strong> {email}</Text>
          {name && <Text style={detailRow}><strong>Nome:</strong> {name}</Text>}
          {phone && <Text style={detailRow}><strong>Telefono:</strong> {phone}</Text>}
          <Text style={detailRow}><strong>Tipo:</strong> {typeLabel[leadType] || leadType}</Text>
          <Text style={detailRow}><strong>Sorgente:</strong> {source}</Text>
        </Section>

        {(utmSource || utmMedium || utmCampaign) && (
          <Section style={utmBox}>
            <Text style={utmTitle}>UTM</Text>
            {utmSource && <Text style={detailRow}>source: {utmSource}</Text>}
            {utmMedium && <Text style={detailRow}>medium: {utmMedium}</Text>}
            {utmCampaign && <Text style={detailRow}>campaign: {utmCampaign}</Text>}
          </Section>
        )}

        {metadata && Object.keys(metadata).length > 0 && (
          <Section style={utmBox}>
            <Text style={utmTitle}>Extra</Text>
            {Object.entries(metadata).map(([k, v]) => (
              <Text key={k} style={detailRow}>{k}: {String(v)}</Text>
            ))}
          </Section>
        )}

        <Hr style={divider} />
        <Text style={footer}>
          Notifica automatica da {SITE_NAME}. Timestamp: {new Date().toISOString()}
        </Text>
      </Container>
    </Body>
  </Html>
)

const ADMIN_EMAIL = Deno.env.get('ADMIN_NOTIFICATION_EMAIL') || ''

export const template = {
  component: LeadNotificationEmail,
  subject: (data: Record<string, any>) =>
    `🔔 Nuovo lead ${typeLabel[data.leadType] || data.leadType || ''} — ${data.email || 'N/A'}`,
  to: ADMIN_EMAIL,
  displayName: 'Admin lead notification',
  previewData: {
    email: 'mario@example.com',
    name: 'Mario Rossi',
    leadType: 'investor',
    source: 'hero_cta',
    utmSource: 'google',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '32px 28px', maxWidth: '560px', margin: '0 auto' }
const logo = { fontSize: '14px', fontWeight: '600' as const, color: '#888', margin: '0 0 8px', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }
const divider = { borderColor: '#e8e0d4', margin: '20px 0' }
const h1 = { fontSize: '20px', fontWeight: '700' as const, color: '#1a1a1a', margin: '0 0 20px', lineHeight: '1.3' }
const detailsBox = { backgroundColor: '#f7f5f0', borderRadius: '8px', padding: '16px 20px', margin: '0 0 16px' }
const detailRow = { fontSize: '14px', color: '#333', lineHeight: '1.6', margin: '0 0 4px' }
const utmBox = { backgroundColor: '#f0f0f0', borderRadius: '8px', padding: '12px 20px', margin: '0 0 16px' }
const utmTitle = { fontSize: '11px', fontWeight: '700' as const, color: '#888', textTransform: 'uppercase' as const, margin: '0 0 6px', letterSpacing: '0.05em' }
const footer = { fontSize: '11px', color: '#999999', margin: '0', lineHeight: '1.5' }
