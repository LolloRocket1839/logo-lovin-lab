import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Hr, Section,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Jungle Rent"

interface VendiNotificationProps {
  name?: string
  email?: string
  phone?: string
  address?: string
  sqm?: string
  floor?: string
  hasElevator?: string
  condition?: string
  situation?: string
  tenantStatus?: string
  tenantLeaseEnd?: string
  askingPrice?: string
  message?: string
  photoCount?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  fbclid?: string
}

const Row = ({ label, value }: { label: string; value?: string }) =>
  value ? (
    <Text style={row}>
      <strong>{label}:</strong> {value}
    </Text>
  ) : null

const VendiNotificationEmail = (props: VendiNotificationProps) => (
  <Html lang="it" dir="ltr">
    <Head />
    <Preview>Nuovo lead /vendi — {props.email || 'senza email'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={logo}>{SITE_NAME} — Admin</Text>
        <Hr style={divider} />
        <Heading style={h1}>Nuovo lead dalla pagina Vendi</Heading>

        <Section style={detailsBox}>
          <Row label="Nome" value={props.name} />
          <Row label="Email" value={props.email} />
          <Row label="Telefono" value={props.phone} />
          <Row label="Indirizzo / zona" value={props.address} />
          <Row label="Metri quadri" value={props.sqm} />
          <Row label="Piano" value={props.floor} />
          <Row label="Ascensore" value={props.hasElevator} />
          <Row label="Stato" value={props.condition} />
          <Row label="Situazione" value={props.situation} />
          <Row label="Inquilino" value={props.tenantStatus} />
          <Row label="Scadenza contratto" value={props.tenantLeaseEnd} />
          <Row label="Prezzo in mente" value={props.askingPrice} />
          <Row label="Foto caricate" value={props.photoCount} />
          <Row label="Messaggio" value={props.message} />
        </Section>

        <Hr style={divider} />
        <Section style={detailsBox}>
          <Row label="utm_source" value={props.utmSource} />
          <Row label="utm_medium" value={props.utmMedium} />
          <Row label="utm_campaign" value={props.utmCampaign} />
          <Row label="fbclid" value={props.fbclid} />
        </Section>
      </Container>
    </Body>
  </Html>
)

const ADMIN_EMAIL = Deno.env.get('ADMIN_NOTIFICATION_EMAIL') || ''

export const template = {
  component: VendiNotificationEmail,
  subject: (data: Record<string, any>) =>
    `Nuovo lead Vendi — ${data.address || data.email || 'N/A'}`,
  to: ADMIN_EMAIL,
  displayName: 'Admin notifica pagina Vendi',
  previewData: {
    name: 'Mario Rossi',
    email: 'mario@example.com',
    phone: '+39 333 1234567',
    address: 'Via Nizza 100, Torino',
    sqm: '52',
    floor: '3',
    hasElevator: 'Sì',
    condition: 'Da ristrutturare',
    situation: 'Eredità',
    askingPrice: '95.000 €',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '32px 28px', maxWidth: '560px', margin: '0 auto' }
const logo = { fontSize: '20px', fontWeight: '700' as const, color: '#1e3a2b', margin: '0 0 16px', letterSpacing: '-0.02em' }
const divider = { borderColor: '#e8e0d4', margin: '24px 0' }
const h1 = { fontSize: '20px', fontWeight: '700' as const, color: '#1a1a1a', margin: '0 0 16px', lineHeight: '1.3' }
const detailsBox = { backgroundColor: '#f7f5f1', borderRadius: '8px', padding: '16px 18px' }
const row = { fontSize: '14px', color: '#3a3a3a', lineHeight: '1.6', margin: '0 0 6px' }
