import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Hr, Link, Button,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Jungle Rent"
const WHATSAPP = "https://wa.me/393791398291"

interface Props {
  name?: string
  propertyCondition?: string
  sqmRange?: string
}

const SellerNurtureLingottoDay2 = ({ name, propertyCondition, sqmRange }: Props) => (
  <Html lang="it" dir="ltr">
    <Head />
    <Preview>Stiamo analizzando il tuo immobile a Lingotto — {SITE_NAME}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={logo}>{SITE_NAME}</Text>
        <Hr style={divider} />
        <Heading style={h1}>
          {name ? `Ciao ${name},` : "Ciao,"} ecco a che punto siamo
        </Heading>
        <Text style={text}>
          Grazie per averci contattato per il tuo immobile in zona Lingotto / Nizza Millefonti.
          Sto raccogliendo i comparabili recenti della zona
          {sqmRange ? ` per tagli ${sqmRange}` : ""}{propertyCondition ? ` in stato "${propertyCondition}"` : ""}{" "}
          per prepararti una proposta concreta.
        </Text>
        <Text style={text}>
          Compro direttamente l'immobile (zero commissioni, zero agenzia), con rogito notarile
          in 60–90 giorni. Nessun impegno: ti porto solo dei numeri reali su cui ragionare.
        </Text>
        <Text style={text}>
          Se vuoi accelerare, il modo più veloce è scrivermi su WhatsApp:
        </Text>
        <Button href={WHATSAPP} style={cta}>
          Scrivi a Lorenzo su WhatsApp
        </Button>
        <Hr style={divider} />
        <Text style={text}>
          Oppure rispondi direttamente a questa email con due righe sull'immobile (piano,
          metratura, stato) e ti rispondo personalmente.
        </Text>
        <Hr style={divider} />
        <Text style={footer}>
          Email automatica da {SITE_NAME}. Lorenzo Oni-Joseph, Amministratore Unico.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: SellerNurtureLingottoDay2,
  subject: `${SITE_NAME} — Sto preparando la tua valutazione Lingotto`,
  displayName: 'Seller nurture Lingotto — day 2',
  previewData: { name: 'Marco', propertyCondition: 'da ristrutturare', sqmRange: '60–80 mq' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '32px 28px', maxWidth: '520px', margin: '0 auto' }
const logo = { fontSize: '20px', fontWeight: '700' as const, color: '#1e3a2b', margin: '0 0 16px', letterSpacing: '-0.02em' }
const divider = { borderColor: '#e8e0d4', margin: '24px 0' }
const h1 = { fontSize: '22px', fontWeight: '700' as const, color: '#1a1a1a', margin: '0 0 16px', lineHeight: '1.3' }
const text = { fontSize: '15px', color: '#4a4a4a', lineHeight: '1.6', margin: '0 0 16px' }
const cta = { backgroundColor: '#1e3a2b', color: '#ffffff', padding: '14px 28px', borderRadius: '8px', fontSize: '15px', fontWeight: '600' as const, textDecoration: 'none', display: 'inline-block' as const, margin: '0 0 16px' }
const footer = { fontSize: '12px', color: '#999999', margin: '0', lineHeight: '1.5' }
