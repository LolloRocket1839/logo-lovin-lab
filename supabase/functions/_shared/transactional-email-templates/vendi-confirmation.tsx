import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Jungle Rent"

interface VendiConfirmationProps {
  address?: string
}

const VendiConfirmationEmail = ({ address }: VendiConfirmationProps) => (
  <Html lang="it" dir="ltr">
    <Head />
    <Preview>Abbiamo ricevuto la tua richiesta — {SITE_NAME}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={logo}>{SITE_NAME}</Text>
        <Hr style={divider} />
        <Heading style={h1}>Richiesta ricevuta</Heading>
        <Text style={text}>
          Grazie, abbiamo ricevuto la tua richiesta per {address || 'il tuo immobile'}.
          Ti rispondiamo entro 48 ore con un range di prezzo indicativo.
          Non è un impegno per nessuna delle due parti.
        </Text>
        <Text style={text}>— Lorenzo, Jungle Rent S.r.l.</Text>
        <Hr style={divider} />
        <Text style={footer}>
          Jungle Rent S.r.l., startup innovativa, incubata 2I3T – Università di Torino. P.IVA 13333450016.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: VendiConfirmationEmail,
  subject: `${SITE_NAME} — Richiesta ricevuta`,
  displayName: 'Conferma pagina Vendi',
  previewData: { address: 'Via Nizza 100, Torino' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '32px 28px', maxWidth: '520px', margin: '0 auto' }
const logo = { fontSize: '20px', fontWeight: '700' as const, color: '#1e3a2b', margin: '0 0 16px', letterSpacing: '-0.02em' }
const divider = { borderColor: '#e8e0d4', margin: '24px 0' }
const h1 = { fontSize: '22px', fontWeight: '700' as const, color: '#1a1a1a', margin: '0 0 16px', lineHeight: '1.3' }
const text = { fontSize: '15px', color: '#4a4a4a', lineHeight: '1.6', margin: '0 0 16px' }
const footer = { fontSize: '12px', color: '#999999', margin: '0', lineHeight: '1.5' }
