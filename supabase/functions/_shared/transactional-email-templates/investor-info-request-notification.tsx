import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Hr, Section,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Jungle Rent'
const ADMIN_TO = Deno.env.get('ADMIN_NOTIFICATION_EMAIL') ?? 'junglerententeprise@gmail.com'

interface Props {
  fullName?: string
  email?: string
  phone?: string | null
  taxResidence?: string
  ticketRange?: string
  horizon?: string
  prevExperience?: string
  source?: string | null
  notes?: string | null
  submittedAt?: string
}

const Row = ({ label, value }: { label: string; value?: string | null }) =>
  value ? (
    <Text style={rowText}>
      <strong style={rowLabel}>{label}:</strong> {value}
    </Text>
  ) : null

const InvestorNotification = (props: Props) => (
  <Html lang="it" dir="ltr">
    <Head />
    <Preview>Nuovo investor lead — {props.fullName ?? 'sconosciuto'} · {props.ticketRange ?? '—'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Nuovo investor lead</Heading>
        <Text style={text}>
          Richiesta memorandum informativo da /investitori.
        </Text>
        <Hr style={divider} />
        <Section>
          <Row label="Nome" value={props.fullName} />
          <Row label="Email" value={props.email} />
          <Row label="Telefono" value={props.phone || 'non fornito'} />
          <Row label="Residenza fiscale" value={props.taxResidence} />
          <Row label="Ticket indicativo" value={props.ticketRange} />
          <Row label="Orizzonte" value={props.horizon} />
          <Row label="Esperienza precedente" value={props.prevExperience} />
          <Row label="Fonte" value={props.source || '—'} />
          <Row label="Note" value={props.notes || '—'} />
          <Row label="Submitted at" value={props.submittedAt} />
        </Section>
        <Hr style={divider} />
        <Text style={footer}>
          Rispondi entro 48 ore. Non rispondere mai con materiali sensibili
          (memorandum, regolamento SFP, modello finanziario) senza prima una
          breve call conoscitiva.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: InvestorNotification,
  to: ADMIN_TO,
  subject: (data: Record<string, any>) =>
    `[Investor Lead] ${data.fullName ?? 'Anon'} — ${data.ticketRange ?? '—'} — ${data.horizon ?? '—'}`,
  displayName: 'Investor — admin notification',
  previewData: {
    fullName: 'Mario Rossi',
    email: 'mario@example.com',
    phone: '+39 333 1234567',
    taxResidence: 'IT',
    ticketRange: '10-20',
    horizon: '1-3M',
    prevExperience: 'PARTIAL',
    source: 'LinkedIn',
    notes: 'Interessato al ticket €15k.',
    submittedAt: new Date().toISOString(),
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '32px 28px', maxWidth: '600px', margin: '0 auto' }
const h1 = { fontSize: '20px', fontWeight: '700' as const, color: '#1a1a1a', margin: '0 0 12px' }
const text = { fontSize: '14px', color: '#4a4a4a', lineHeight: '1.6', margin: '0 0 12px' }
const divider = { borderColor: '#e8e0d4', margin: '20px 0' }
const rowText = { fontSize: '14px', color: '#1a1a1a', lineHeight: '1.6', margin: '0 0 8px' }
const rowLabel = { color: '#6a6a6a', fontWeight: '600' as const }
const footer = { fontSize: '12px', color: '#999999', margin: '0', lineHeight: '1.5', fontStyle: 'italic' as const }
