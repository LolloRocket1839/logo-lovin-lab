import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Hr, Link,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Jungle Rent'

interface Props {
  fullName?: string
}

const InvestorConfirmation = ({ fullName }: Props) => (
  <Html lang="it" dir="ltr">
    <Head />
    <Preview>Abbiamo ricevuto la tua richiesta di memorandum — {SITE_NAME}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={logo}>{SITE_NAME}</Text>
        <Hr style={divider} />
        <Heading style={h1}>
          {fullName ? `Grazie ${fullName.split(' ')[0]},` : 'Grazie,'}
        </Heading>
        <Text style={text}>
          ho ricevuto la tua richiesta del memorandum informativo sul co-investimento
          in Jungle Rent.
        </Text>
        <Text style={text}>
          Ti rispondo personalmente entro 48 ore per fissare una breve call
          conoscitiva di 30 minuti. Dopo quella, ti invio i materiali completi
          (memorandum, regolamento SFP, business plan, modello finanziario).
        </Text>
        <Text style={text}>
          Nessuno step è automatizzato. Nessun follow-up commerciale.
        </Text>
        <Text style={textSmall}>
          Se nel frattempo hai domande urgenti, puoi rispondere direttamente
          a questa email.
        </Text>
        <Hr style={divider} />
        <Text style={signature}>Lorenzo Oni-Joseph</Text>
        <Text style={role}>Founder &amp; CEO, {SITE_NAME} S.r.l.</Text>
        <Link href="https://junglerent.it" style={link}>junglerent.it</Link>
        <Hr style={divider} />
        <Text style={footer}>
          Questa email è una conferma automatica relativa alla tua richiesta di
          informazioni. Le informazioni sul collocamento privato di Strumenti
          Finanziari Partecipativi non costituiscono offerta al pubblico ai sensi
          dell'art. 94 D.Lgs. 58/1998 (TUF). Jungle Rent S.r.l. · P.IVA 13333450016 ·
          REA TO-1355899.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: InvestorConfirmation,
  subject: `${SITE_NAME} — Richiesta memorandum ricevuta`,
  displayName: 'Investor — info request confirmation',
  previewData: { fullName: 'Mario Rossi' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '32px 28px', maxWidth: '560px', margin: '0 auto' }
const logo = { fontSize: '20px', fontWeight: '700' as const, color: '#1e3a2b', margin: '0 0 16px', letterSpacing: '-0.02em' }
const divider = { borderColor: '#e8e0d4', margin: '24px 0' }
const h1 = { fontSize: '22px', fontWeight: '700' as const, color: '#1a1a1a', margin: '0 0 18px', lineHeight: '1.3' }
const text = { fontSize: '15px', color: '#3a3a3a', lineHeight: '1.65', margin: '0 0 16px' }
const textSmall = { fontSize: '14px', color: '#6a6a6a', lineHeight: '1.6', margin: '0 0 8px' }
const signature = { fontSize: '15px', color: '#1a1a1a', fontWeight: '600' as const, margin: '0 0 2px' }
const role = { fontSize: '13px', color: '#6a6a6a', margin: '0 0 12px' }
const link = { fontSize: '14px', color: '#1e3a2b', fontWeight: '500' as const, textDecoration: 'underline' }
const footer = { fontSize: '11px', color: '#999999', margin: '0', lineHeight: '1.55' }
