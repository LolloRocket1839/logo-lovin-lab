import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Hr, Link,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Jungle Rent"

interface Props {
  name?: string
  targetAudience?: string
  moveInMonth?: string
}

const StudentNurtureDay2 = ({ name, targetAudience, moveInMonth }: Props) => (
  <Html lang="it" dir="ltr">
    <Head />
    <Preview>Aggiornamento sulla tua waitlist Molinette — {SITE_NAME}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={logo}>{SITE_NAME}</Text>
        <Hr style={divider} />
        <Heading style={h1}>
          {name ? `Ciao ${name},` : "Ciao,"} ecco cosa stiamo facendo
        </Heading>
        <Text style={text}>
          Grazie per esserti iscritto alla nostra waitlist per la zona Nizza Millefonti / Molinette.
          Sto preparando una lista di soluzioni adatte al tuo profilo
          {targetAudience ? ` (${targetAudience})` : ""}{moveInMonth ? `, per ${moveInMonth}` : ""}.
        </Text>
        <Text style={text}>
          Nei prossimi giorni ti contatterò personalmente con le opzioni disponibili.
          Se nel frattempo vuoi anticipare i tempi, scrivimi direttamente su WhatsApp:
        </Text>
        <Link href="https://wa.me/393319053037" style={link}>
          Scrivi a Lorenzo su WhatsApp →
        </Link>
        <Hr style={divider} />
        <Text style={footer}>
          Email automatica da {SITE_NAME}. Rispondi pure se hai domande.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: StudentNurtureDay2,
  subject: `${SITE_NAME} — Aggiornamento sulla tua waitlist Molinette`,
  displayName: 'Student nurture — day 2',
  previewData: { name: 'Marco', targetAudience: 'Specializzando', moveInMonth: 'Settembre 2026' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '32px 28px', maxWidth: '520px', margin: '0 auto' }
const logo = { fontSize: '20px', fontWeight: '700' as const, color: '#1e3a2b', margin: '0 0 16px', letterSpacing: '-0.02em' }
const divider = { borderColor: '#e8e0d4', margin: '24px 0' }
const h1 = { fontSize: '22px', fontWeight: '700' as const, color: '#1a1a1a', margin: '0 0 16px', lineHeight: '1.3' }
const text = { fontSize: '15px', color: '#4a4a4a', lineHeight: '1.6', margin: '0 0 16px' }
const link = { color: '#1e3a2b', fontSize: '15px', fontWeight: '600' as const, textDecoration: 'underline' }
const footer = { fontSize: '12px', color: '#999999', margin: '24px 0 0' }
