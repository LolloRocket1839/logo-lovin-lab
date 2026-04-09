import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Hr, Link,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Jungle Rent"

interface LeadConfirmationProps {
  leadType?: 'investor' | 'seller' | 'student' | 'general'
}

const getTitle = (leadType?: string) => {
  switch (leadType) {
    case 'investor': return 'Grazie per il tuo interesse come investitore!'
    case 'seller': return 'Grazie per averci contattato!'
    case 'student': return 'Benvenuto nella community!'
    default: return 'Grazie per il tuo interesse!'
  }
}

const getMessage = (leadType?: string) => {
  switch (leadType) {
    case 'investor':
      return 'Abbiamo ricevuto la tua registrazione di interesse per le opportunità di investimento immobiliare a Torino. Il nostro team ti contatterà presto con maggiori dettagli sui progetti disponibili.'
    case 'seller':
      return 'Abbiamo ricevuto la tua richiesta. Un membro del nostro team ti contatterà a breve per discutere la valutazione del tuo immobile.'
    case 'student':
      return 'Ti sei registrato con successo! Ti terremo aggiornato su opportunità di alloggio a Torino.'
    default:
      return 'Abbiamo ricevuto il tuo messaggio e ti risponderemo al più presto.'
  }
}

const LeadConfirmationEmail = ({ leadType }: LeadConfirmationProps) => (
  <Html lang="it" dir="ltr">
    <Head />
    <Preview>{getTitle(leadType)} - {SITE_NAME}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={logo}>{SITE_NAME}</Text>
        <Hr style={divider} />
        <Heading style={h1}>{getTitle(leadType)}</Heading>
        <Text style={text}>{getMessage(leadType)}</Text>
        <Text style={text}>
          Nel frattempo, puoi visitare il nostro sito per esplorare le zone di Torino e le opportunità disponibili.
        </Text>
        <Link href="https://junglerent.it" style={link}>
          Visita junglerent.it →
        </Link>
        <Hr style={divider} />
        <Text style={footer}>
          Questa è un'email automatica da {SITE_NAME}. Non è necessario rispondere.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: LeadConfirmationEmail,
  subject: (data: Record<string, any>) => {
    switch (data.leadType) {
      case 'investor': return `${SITE_NAME} — Interesse investitore registrato`
      case 'seller': return `${SITE_NAME} — Richiesta ricevuta`
      case 'student': return `${SITE_NAME} — Benvenuto!`
      default: return `${SITE_NAME} — Abbiamo ricevuto il tuo messaggio`
    }
  },
  displayName: 'Lead confirmation',
  previewData: { leadType: 'investor' },
} satisfies TemplateEntry

// Brand: Jungle Rent — deep green primary (#1e3a2b), cream background
const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '32px 28px', maxWidth: '520px', margin: '0 auto' }
const logo = { fontSize: '20px', fontWeight: '700' as const, color: '#1e3a2b', margin: '0 0 16px', letterSpacing: '-0.02em' }
const divider = { borderColor: '#e8e0d4', margin: '24px 0' }
const h1 = { fontSize: '22px', fontWeight: '700' as const, color: '#1a1a1a', margin: '0 0 16px', lineHeight: '1.3' }
const text = { fontSize: '15px', color: '#4a4a4a', lineHeight: '1.6', margin: '0 0 16px' }
const link = { fontSize: '15px', color: '#1e3a2b', fontWeight: '600' as const, textDecoration: 'underline' }
const footer = { fontSize: '12px', color: '#999999', margin: '0', lineHeight: '1.5' }
