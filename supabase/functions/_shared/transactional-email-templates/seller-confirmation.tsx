import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Hr, Button, Link,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Jungle Rent"
const CALENDLY_URL = "https://calendly.com/junglerent/30min"

interface SellerConfirmationProps {
  estimatedValue?: string
}

const SellerConfirmationEmail = ({ estimatedValue }: SellerConfirmationProps) => (
  <Html lang="it" dir="ltr">
    <Head />
    <Preview>Abbiamo ricevuto la tua richiesta — {SITE_NAME}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={logo}>{SITE_NAME}</Text>
        <Hr style={divider} />
        <Heading style={h1}>Grazie per averci contattato!</Heading>
        <Text style={text}>
          Abbiamo ricevuto la tua richiesta di valutazione immobiliare. Un membro del nostro team
          ti contatterà entro <strong>48 ore</strong> per discutere il tuo immobile e fornirti
          una stima dettagliata.
        </Text>

        {estimatedValue && (
          <Text style={highlightBox}>
            Stima preliminare indicata: <strong>{estimatedValue}</strong>
          </Text>
        )}

        <Text style={text}>
          Nel frattempo, se vuoi accelerare il processo puoi prenotare direttamente una
          chiamata con Lorenzo:
        </Text>

        <Button href={CALENDLY_URL} style={ctaButton}>
          📞 Prenota una chiamata
        </Button>

        <Text style={subtext}>
          Cosa succede ora?
        </Text>
        <Text style={text}>
          1. Analizziamo la tua zona e i comparabili recenti{'\n'}
          2. Ti contattiamo per un sopralluogo (se necessario){'\n'}
          3. Ricevi la nostra proposta senza impegno
        </Text>

        <Hr style={divider} />
        <Text style={text}>
          Hai domande? Rispondi a questa email o scrivici su{' '}
          <Link href="https://wa.me/393791398291" style={linkStyle}>WhatsApp</Link>.
        </Text>
        <Hr style={divider} />
        <Text style={footer}>
          Questa è un'email automatica da {SITE_NAME}. Non è un impegno contrattuale.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: SellerConfirmationEmail,
  subject: `${SITE_NAME} — Richiesta di valutazione ricevuta`,
  displayName: 'Seller confirmation',
  previewData: { estimatedValue: '€180.000' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '32px 28px', maxWidth: '520px', margin: '0 auto' }
const logo = { fontSize: '20px', fontWeight: '700' as const, color: '#1e3a2b', margin: '0 0 16px', letterSpacing: '-0.02em' }
const divider = { borderColor: '#e8e0d4', margin: '24px 0' }
const h1 = { fontSize: '22px', fontWeight: '700' as const, color: '#1a1a1a', margin: '0 0 16px', lineHeight: '1.3' }
const text = { fontSize: '15px', color: '#4a4a4a', lineHeight: '1.6', margin: '0 0 16px' }
const subtext = { fontSize: '15px', color: '#1e3a2b', fontWeight: '600' as const, margin: '0 0 8px' }
const highlightBox = { fontSize: '15px', color: '#1e3a2b', backgroundColor: '#f0f7f2', borderRadius: '8px', padding: '12px 16px', margin: '0 0 16px', fontWeight: '500' as const }
const ctaButton = { backgroundColor: '#1e3a2b', color: '#ffffff', padding: '14px 28px', borderRadius: '8px', fontSize: '15px', fontWeight: '600' as const, textDecoration: 'none', display: 'inline-block' as const, margin: '0 0 24px' }
const linkStyle = { color: '#1e3a2b', fontWeight: '600' as const, textDecoration: 'underline' }
const footer = { fontSize: '12px', color: '#999999', margin: '0', lineHeight: '1.5' }
