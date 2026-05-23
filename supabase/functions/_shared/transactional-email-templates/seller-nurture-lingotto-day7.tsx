import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Hr, Link, Button,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Jungle Rent"
const WHATSAPP = "https://wa.me/393791398291"

interface Props {
  name?: string
}

const SellerNurtureLingottoDay7 = ({ name }: Props) => (
  <Html lang="it" dir="ltr">
    <Head />
    <Preview>Tre cose che gli altri non ti dicono sulla vendita a Lingotto</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={logo}>{SITE_NAME}</Text>
        <Hr style={divider} />
        <Heading style={h1}>
          {name ? `${name}, ` : ""}tre cose da sapere prima di vendere
        </Heading>
        <Text style={text}>
          Lingotto e Nizza Millefonti stanno cambiando velocemente: nuove residenze
          universitarie, OGR, ospedali, metro. Tre cose che vediamo ogni settimana:
        </Text>
        <Text style={text}>
          <strong>1. I tempi medi con agenzia sono 7–11 mesi.</strong> Tra acquirenti in
          mutuo, perizie e trattative, l'attesa pesa più della commissione.
        </Text>
        <Text style={text}>
          <strong>2. Le case "da ristrutturare" sono le più richieste.</strong> Per noi
          vanno benissimo: le mettiamo a reddito per studenti delle Molinette.
        </Text>
        <Text style={text}>
          <strong>3. Il prezzo "di vetrina" non è il prezzo di vendita.</strong> Spesso
          l'offerta diretta è più vicina al rogito di quella mediata.
        </Text>
        <Text style={text}>
          Se vuoi capire a che cifra reale potresti chiudere, ne parliamo in 10 minuti
          su WhatsApp, senza impegno.
        </Text>
        <Button href={WHATSAPP} style={cta}>
          Parla con Lorenzo
        </Button>
        <Hr style={divider} />
        <Text style={footer}>
          Email automatica da {SITE_NAME}. Lorenzo Oni-Joseph, Amministratore Unico.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: SellerNurtureLingottoDay7,
  subject: `${SITE_NAME} — 3 cose da sapere prima di vendere a Lingotto`,
  displayName: 'Seller nurture Lingotto — day 7',
  previewData: { name: 'Marco' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '32px 28px', maxWidth: '520px', margin: '0 auto' }
const logo = { fontSize: '20px', fontWeight: '700' as const, color: '#1e3a2b', margin: '0 0 16px', letterSpacing: '-0.02em' }
const divider = { borderColor: '#e8e0d4', margin: '24px 0' }
const h1 = { fontSize: '22px', fontWeight: '700' as const, color: '#1a1a1a', margin: '0 0 16px', lineHeight: '1.3' }
const text = { fontSize: '15px', color: '#4a4a4a', lineHeight: '1.6', margin: '0 0 16px' }
const cta = { backgroundColor: '#1e3a2b', color: '#ffffff', padding: '14px 28px', borderRadius: '8px', fontSize: '15px', fontWeight: '600' as const, textDecoration: 'none', display: 'inline-block' as const, margin: '0 0 16px' }
const footer = { fontSize: '12px', color: '#999999', margin: '0', lineHeight: '1.5' }
