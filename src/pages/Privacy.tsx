import { Navigation, Footer } from "@/components/layout";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Shield, Mail, MapPin, Phone, FileText, Lock, Eye, Clock, Users, Globe, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Privacy = () => {
  const { t, i18n } = useTranslation();
  const isItalian = i18n.language === 'it' || i18n.language.startsWith('it');

  return (
    <main role="main" className="min-h-screen bg-gradient-subtle">
      <Helmet>
        <title>{isItalian ? "Privacy Policy - JUNGLE RENT S.R.L." : "Privacy Policy - JUNGLE RENT S.R.L."}</title>
        <meta name="description" content={isItalian 
          ? "Informativa sulla privacy di JUNGLE RENT S.R.L. - Start-up Innovativa. Trattamento dati personali secondo GDPR. P.IVA 13333450016."
          : "Privacy Policy of JUNGLE RENT S.R.L. - Innovative Startup. Personal data processing according to GDPR. VAT ID IT13333450016."
        } />
        <link rel="canonical" href={`https://junglerent.it/${isItalian ? 'privacy' : 'privacy'}`} />
        <link rel="alternate" hrefLang="it" href="https://junglerent.it/privacy" />
        <link rel="alternate" hrefLang="en" href="https://junglerent.it/privacy" />
        <link rel="alternate" hrefLang="x-default" href="https://junglerent.it/privacy" />
      </Helmet>

      <Navigation />

      <div className="container mx-auto px-4 py-20 md:py-28 max-w-4xl">
        {/* Header */}
        <section className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-primary/10">
              <Shield className="w-12 h-12 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 text-foreground">
            {isItalian ? "Informativa sulla Privacy" : "Privacy Policy"}
          </h1>
          <p className="text-muted-foreground text-lg">
            {isItalian 
              ? "Ai sensi del Regolamento UE 2016/679 (GDPR)" 
              : "In accordance with EU Regulation 2016/679 (GDPR)"}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {isItalian ? "Ultimo aggiornamento: Dicembre 2025" : "Last updated: December 2025"}
          </p>
        </section>

        {/* Titolare del Trattamento */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-primary" />
              {isItalian ? "1. Titolare del Trattamento" : "1. Data Controller"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              {isItalian 
                ? "Il Titolare del trattamento dei dati personali è:"
                : "The Data Controller is:"}
            </p>
            <div className="bg-muted/30 rounded-lg p-4 space-y-2">
              <p className="font-semibold text-lg">JUNGLE RENT SOCIETA' A RESPONSABILITA' LIMITATA</p>
              <p className="text-sm text-muted-foreground">Start-up Innovativa</p>
              <Separator className="my-3" />
              <div className="grid gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Via Gioacchino Quarello 15/A, 10135 Torino (TO), Italia</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <span>P.IVA / C.F.: 13333450016</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <span>REA: TO - 1355899</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>PEC: junglerent@legalmail.it</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>Email: junglerententeprise@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>Tel: +39 331 905 3037</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dati Raccolti */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-primary" />
              {isItalian ? "2. Dati Personali Raccolti" : "2. Personal Data Collected"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              {isItalian 
                ? "Raccogliamo i seguenti dati personali:"
                : "We collect the following personal data:"}
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <div>
                  <span className="font-medium">{isItalian ? "Dati identificativi" : "Identification data"}</span>
                  <p className="text-sm text-muted-foreground">
                    {isItalian 
                      ? "Nome, cognome, indirizzo email, numero di telefono"
                      : "Name, surname, email address, phone number"}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <div>
                  <span className="font-medium">{isItalian ? "Dati finanziari" : "Financial data"}</span>
                  <p className="text-sm text-muted-foreground">
                    {isItalian 
                      ? "Budget di investimento, preferenze di investimento (solo per investitori)"
                      : "Investment budget, investment preferences (investors only)"}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <div>
                  <span className="font-medium">{isItalian ? "Dati di navigazione" : "Navigation data"}</span>
                  <p className="text-sm text-muted-foreground">
                    {isItalian 
                      ? "Indirizzo IP, browser, sistema operativo, pagine visitate (tramite cookie analitici)"
                      : "IP address, browser, operating system, pages visited (via analytics cookies)"}
                  </p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Finalità */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-primary" />
              {isItalian ? "3. Finalità del Trattamento" : "3. Purpose of Processing"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              {isItalian 
                ? "I dati personali sono trattati per le seguenti finalità:"
                : "Personal data is processed for the following purposes:"}
            </p>
            <div className="grid gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">{isItalian ? "A) Esecuzione contrattuale" : "A) Contract execution"}</h4>
                <p className="text-sm text-muted-foreground">
                  {isItalian 
                    ? "Gestione delle richieste di contatto, fornitura dei servizi richiesti, comunicazioni relative ai nostri servizi immobiliari."
                    : "Managing contact requests, providing requested services, communications regarding our real estate services."}
                </p>
                <p className="text-xs text-primary mt-2">{isItalian ? "Base giuridica: Art. 6(1)(b) GDPR" : "Legal basis: Art. 6(1)(b) GDPR"}</p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">{isItalian ? "B) Consenso" : "B) Consent"}</h4>
                <p className="text-sm text-muted-foreground">
                  {isItalian 
                    ? "Invio di newsletter, comunicazioni promozionali, aggiornamenti su opportunità di investimento."
                    : "Sending newsletters, promotional communications, updates on investment opportunities."}
                </p>
                <p className="text-xs text-primary mt-2">{isItalian ? "Base giuridica: Art. 6(1)(a) GDPR" : "Legal basis: Art. 6(1)(a) GDPR"}</p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">{isItalian ? "C) Interesse legittimo" : "C) Legitimate interest"}</h4>
                <p className="text-sm text-muted-foreground">
                  {isItalian 
                    ? "Analisi statistiche aggregate per migliorare i nostri servizi, prevenzione frodi, sicurezza informatica."
                    : "Aggregate statistical analysis to improve our services, fraud prevention, IT security."}
                </p>
                <p className="text-xs text-primary mt-2">{isItalian ? "Base giuridica: Art. 6(1)(f) GDPR" : "Legal basis: Art. 6(1)(f) GDPR"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conservazione */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              {isItalian ? "4. Periodo di Conservazione" : "4. Retention Period"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              {isItalian 
                ? "I dati personali sono conservati per il tempo strettamente necessario alle finalità per cui sono stati raccolti:"
                : "Personal data is retained for the time strictly necessary for the purposes for which it was collected:"}
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                {isItalian 
                  ? "Dati contrattuali: 10 anni dalla cessazione del rapporto"
                  : "Contractual data: 10 years from end of relationship"}
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                {isItalian 
                  ? "Dati marketing: fino a revoca del consenso o 24 mesi dall'ultima interazione"
                  : "Marketing data: until consent withdrawal or 24 months from last interaction"}
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                {isItalian 
                  ? "Dati di navigazione: 26 mesi"
                  : "Navigation data: 26 months"}
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Condivisione */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Users className="w-5 h-5 text-primary" />
              {isItalian ? "5. Condivisione dei Dati" : "5. Data Sharing"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              {isItalian 
                ? "I dati personali possono essere condivisi con:"
                : "Personal data may be shared with:"}
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                <span>{isItalian 
                  ? "Fornitori di servizi tecnologici (hosting, email, analytics) che agiscono come Responsabili del trattamento"
                  : "Technology service providers (hosting, email, analytics) acting as Data Processors"}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                <span>{isItalian 
                  ? "Professionisti e consulenti (legali, fiscali) per adempimenti normativi"
                  : "Professionals and consultants (legal, tax) for regulatory compliance"}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                <span>{isItalian 
                  ? "Autorità pubbliche su richiesta legittima"
                  : "Public authorities upon legitimate request"}
                </span>
              </li>
            </ul>
            <p className="text-sm text-muted-foreground mt-4">
              {isItalian 
                ? "I dati non vengono venduti a terzi né trasferiti al di fuori dello Spazio Economico Europeo."
                : "Data is not sold to third parties nor transferred outside the European Economic Area."}
            </p>
          </CardContent>
        </Card>

        {/* Trasferimenti Internazionali */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-primary" />
              {isItalian ? "6. Trasferimenti Internazionali" : "6. International Transfers"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              {isItalian 
                ? "Alcuni dei nostri fornitori di servizi potrebbero essere situati negli Stati Uniti. In tal caso, il trasferimento avviene sulla base di:"
                : "Some of our service providers may be located in the United States. In such cases, the transfer is based on:"}
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                {isItalian 
                  ? "EU-US Data Privacy Framework (DPF)"
                  : "EU-US Data Privacy Framework (DPF)"}
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                {isItalian 
                  ? "Clausole Contrattuali Standard (SCC) approvate dalla Commissione Europea"
                  : "Standard Contractual Clauses (SCC) approved by the European Commission"}
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Diritti */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-primary" />
              {isItalian ? "7. I Tuoi Diritti" : "7. Your Rights"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              {isItalian 
                ? "Ai sensi degli articoli 15-22 del GDPR, hai diritto di:"
                : "Under Articles 15-22 of the GDPR, you have the right to:"}
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                {isItalian ? "Accesso ai tuoi dati" : "Access your data"}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                {isItalian ? "Rettifica dei dati inesatti" : "Rectification of inaccurate data"}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                {isItalian ? "Cancellazione dei dati" : "Erasure of data"}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                {isItalian ? "Limitazione del trattamento" : "Restriction of processing"}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                {isItalian ? "Portabilità dei dati" : "Data portability"}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                {isItalian ? "Opposizione al trattamento" : "Object to processing"}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                {isItalian ? "Revoca del consenso" : "Withdraw consent"}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                {isItalian ? "Reclamo al Garante Privacy" : "Complaint to Data Protection Authority"}
              </div>
            </div>
            <div className="bg-muted/30 rounded-lg p-4 mt-4">
              <p className="text-sm">
                {isItalian 
                  ? "Per esercitare i tuoi diritti, contattaci via email a:"
                  : "To exercise your rights, contact us by email at:"}
              </p>
              <a href="mailto:junglerent@legalmail.it" className="text-primary font-medium hover:underline">
                junglerent@legalmail.it
              </a>
              <p className="text-xs text-muted-foreground mt-2">
                {isItalian 
                  ? "Risponderemo entro 30 giorni dalla ricezione della richiesta."
                  : "We will respond within 30 days of receiving your request."}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Cookie */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Trash2 className="w-5 h-5 text-primary" />
              {isItalian ? "8. Cookie" : "8. Cookies"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              {isItalian 
                ? "Il sito utilizza cookie tecnici necessari al funzionamento e cookie analitici per migliorare l'esperienza utente."
                : "The site uses technical cookies necessary for operation and analytical cookies to improve user experience."}
            </p>
            <div className="grid gap-3">
              <div className="border rounded-lg p-3">
                <h5 className="font-medium text-sm">{isItalian ? "Cookie tecnici" : "Technical cookies"}</h5>
                <p className="text-xs text-muted-foreground">
                  {isItalian 
                    ? "Necessari per il funzionamento del sito. Non richiedono consenso."
                    : "Necessary for site operation. No consent required."}
                </p>
              </div>
              <div className="border rounded-lg p-3">
                <h5 className="font-medium text-sm">{isItalian ? "Cookie analitici" : "Analytics cookies"}</h5>
                <p className="text-xs text-muted-foreground">
                  {isItalian 
                    ? "Utilizzati per analisi statistiche aggregate. Dati anonimizzati."
                    : "Used for aggregate statistical analysis. Anonymized data."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Modifiche */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-primary" />
              {isItalian ? "9. Modifiche alla Privacy Policy" : "9. Changes to Privacy Policy"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {isItalian 
                ? "Ci riserviamo il diritto di modificare questa informativa. Le modifiche saranno pubblicate su questa pagina con indicazione della data di ultimo aggiornamento. Ti invitiamo a consultare periodicamente questa pagina."
                : "We reserve the right to modify this policy. Changes will be published on this page with the date of last update. We invite you to periodically check this page."}
            </p>
          </CardContent>
        </Card>

        {/* Contatti */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary" />
              {isItalian ? "10. Contatti" : "10. Contact"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              {isItalian 
                ? "Per qualsiasi domanda relativa al trattamento dei tuoi dati personali:"
                : "For any questions regarding the processing of your personal data:"}
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>JUNGLE RENT S.R.L.</strong></p>
              <p>Via Gioacchino Quarello 15/A, 10135 Torino (TO)</p>
              <p>PEC: <a href="mailto:junglerent@legalmail.it" className="text-primary hover:underline">junglerent@legalmail.it</a></p>
              <p>Email: <a href="mailto:junglerententeprise@gmail.com" className="text-primary hover:underline">junglerententeprise@gmail.com</a></p>
            </div>
            <Separator className="my-4" />
            <p className="text-xs text-muted-foreground">
              {isItalian 
                ? "Autorità di controllo: Garante per la protezione dei dati personali - www.garanteprivacy.it"
                : "Supervisory authority: Italian Data Protection Authority - www.garanteprivacy.it"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </main>
  );
};

export default Privacy;
