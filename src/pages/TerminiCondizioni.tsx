import { Navigation, Footer } from "@/components/layout";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { ScrollArea } from "@/components/ui/scroll-area";

const TerminiCondizioni = () => {
  const { i18n } = useTranslation();
  const isEnglish = i18n.language === 'en';

  return (
    <main role="main" className="min-h-screen bg-gradient-subtle">
      <Helmet>
        <title>{isEnglish ? "Terms and Conditions | Jungle Rent" : "Termini e Condizioni | Jungle Rent"}</title>
        <meta name="description" content={isEnglish 
          ? "Terms and Conditions of JUNGLE RENT S.R.L. - Rules and regulations for using our real estate services in Turin."
          : "Termini e Condizioni di JUNGLE RENT S.R.L. - Regole e regolamenti per l'utilizzo dei nostri servizi immobiliari a Torino."
        } />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://junglerent.it/${isEnglish ? 'terms' : 'termini-e-condizioni'}`} />
        <link rel="alternate" hrefLang="it" href="https://junglerent.it/termini-e-condizioni" />
        <link rel="alternate" hrefLang="en" href="https://junglerent.it/terms" />
        <link rel="alternate" hrefLang="x-default" href="https://junglerent.it/termini-e-condizioni" />
      </Helmet>

      <Navigation />

      <div className="container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent">
            {isEnglish ? "Terms and Conditions" : "Termini e Condizioni"}
          </h1>
          
          <p className="text-muted-foreground mb-8">
            {isEnglish ? "Last updated: December 2025" : "Ultimo aggiornamento: Dicembre 2025"}
          </p>

          <ScrollArea className="h-auto">
            <div className="prose prose-lg max-w-none text-foreground">
              
              {/* Identificazione Titolare */}
              <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">
                  {isEnglish ? "1. Service Provider Identification" : "1. Identificazione del titolare"}
                </h2>
                <div className="bg-muted/30 rounded-xl p-6 space-y-2">
                  <p><strong>{isEnglish ? "Company Name" : "Ragione Sociale"}:</strong> JUNGLE RENT SOCIETA' A RESPONSABILITA' LIMITATA</p>
                  <p><strong>{isEnglish ? "Registered Office" : "Sede Legale"}:</strong> Via Gioacchino Quarello 15/A, 10135 Torino (TO), Italia</p>
                  <p><strong>{isEnglish ? "VAT / Tax ID" : "P.IVA / C.F."}:</strong> 13333450016</p>
                  <p><strong>REA:</strong> TO - 1355899</p>
                  <p><strong>PEC:</strong> junglerent@legalmail.it</p>
                  <p><strong>Email:</strong> junglerententeprise@gmail.com</p>
                  <p><strong>{isEnglish ? "Legal Form" : "Forma Giuridica"}:</strong> Start-up Innovativa S.r.l.</p>
                </div>
              </section>

              {/* Oggetto e Ambito */}
              <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">
                  {isEnglish ? "2. Scope and Purpose" : "2. Oggetto e ambito di applicazione"}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {isEnglish 
                    ? "These Terms and Conditions govern the use of the website junglerent.it and the services offered by JUNGLE RENT S.R.L. ('Company', 'We', 'Us'). By accessing or using our services, you agree to be bound by these terms."
                    : "I presenti Termini e Condizioni regolano l'utilizzo del sito web junglerent.it e dei servizi offerti da JUNGLE RENT S.R.L. ('Società', 'Noi'). Accedendo o utilizzando i nostri servizi, l'utente accetta di essere vincolato dai presenti termini."
                  }
                </p>
              </section>

              {/* Definizioni */}
              <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">
                  {isEnglish ? "3. Definitions" : "3. Definizioni"}
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li><strong>{isEnglish ? "User" : "Utente"}:</strong> {isEnglish ? "Any person accessing the website or using our services" : "Qualsiasi persona che accede al sito web o utilizza i nostri servizi"}</li>
                  <li><strong>{isEnglish ? "Student" : "Studente"}:</strong> {isEnglish ? "User seeking rental accommodation in Turin" : "Utente in cerca di alloggio in affitto a Torino"}</li>
                  <li><strong>{isEnglish ? "Investor" : "Investitore"}:</strong> {isEnglish ? "User interested in real estate investment opportunities" : "Utente interessato a opportunità di investimento immobiliare"}</li>
                  <li><strong>{isEnglish ? "Seller" : "Venditore"}:</strong> {isEnglish ? "Property owner looking to sell their property" : "Proprietario che desidera vendere il proprio immobile"}</li>
                  <li><strong>{isEnglish ? "Services" : "Servizi"}:</strong> {isEnglish ? "All services provided by the Company through this website" : "Tutti i servizi forniti dalla Società attraverso questo sito web"}</li>
                </ul>
              </section>

              {/* Servizi Offerti */}
              <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">
                  {isEnglish ? "4. Services Offered" : "4. Servizi offerti"}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {isEnglish ? "JUNGLE RENT S.R.L. provides the following services:" : "JUNGLE RENT S.R.L. offre i seguenti servizi:"}
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>{isEnglish ? "Short-term and medium-term rental management in Turin" : "Gestione affitti brevi e medi a Torino"}</li>
                  <li>{isEnglish ? "Student housing solutions near universities" : "Soluzioni abitative per studenti vicino alle università"}</li>
                  <li>{isEnglish ? "Real estate investment opportunities starting from €100" : "Opportunità di investimento immobiliare a partire da €100"}</li>
                  <li>{isEnglish ? "Property acquisition in university areas" : "Acquisizione immobili nelle zone universitarie"}</li>
                  <li>{isEnglish ? "Complete property management services" : "Servizi completi di gestione immobiliare"}</li>
                </ul>
              </section>

              {/* Requisiti Utente */}
              <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">
                  {isEnglish ? "5. User Requirements" : "5. Requisiti dell'utente"}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {isEnglish 
                    ? "To use our services, users must: be at least 18 years of age; provide accurate and complete information; have the legal capacity to enter into binding contracts; comply with all applicable laws and regulations."
                    : "Per utilizzare i nostri servizi, gli utenti devono: avere almeno 18 anni di età; fornire informazioni accurate e complete; avere la capacità giuridica di stipulare contratti vincolanti; rispettare tutte le leggi e i regolamenti applicabili."
                  }
                </p>
              </section>

              {/* Obblighi Utente */}
              <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">
                  {isEnglish ? "6. User Obligations" : "6. Obblighi dell'utente"}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {isEnglish ? "Users agree to:" : "L'utente si impegna a:"}
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>{isEnglish ? "Use the website and services in a lawful manner" : "Utilizzare il sito e i servizi in modo lecito"}</li>
                  <li>{isEnglish ? "Not attempt to gain unauthorized access to our systems" : "Non tentare di ottenere accesso non autorizzato ai nostri sistemi"}</li>
                  <li>{isEnglish ? "Provide truthful information in all forms and communications" : "Fornire informazioni veritiere in tutti i moduli e comunicazioni"}</li>
                  <li>{isEnglish ? "Respect intellectual property rights" : "Rispettare i diritti di proprietà intellettuale"}</li>
                  <li>{isEnglish ? "Not engage in any fraudulent or deceptive practices" : "Non intraprendere pratiche fraudolente o ingannevoli"}</li>
                </ul>
              </section>

              {/* Proprietà Intellettuale */}
              <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">
                  {isEnglish ? "7. Intellectual Property" : "7. Proprietà intellettuale"}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {isEnglish 
                    ? "All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of JUNGLE RENT S.R.L. or its licensors and is protected by Italian and international copyright laws. The Jungle Rent name, logo, and all related trademarks are registered trademarks of JUNGLE RENT S.R.L."
                    : "Tutti i contenuti di questo sito web, inclusi ma non limitati a testi, grafiche, loghi, immagini e software, sono di proprietà di JUNGLE RENT S.R.L. o dei suoi licenziatari e sono protetti dalle leggi italiane e internazionali sul diritto d'autore. Il nome Jungle Rent, il logo e tutti i marchi correlati sono marchi registrati di JUNGLE RENT S.R.L."
                  }
                </p>
              </section>

              {/* Limitazione Responsabilità */}
              <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">
                  {isEnglish ? "8. Limitation of Liability" : "8. Limitazione di responsabilità"}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {isEnglish 
                    ? "JUNGLE RENT S.R.L. provides information and services on an 'as is' basis. To the fullest extent permitted by law:"
                    : "JUNGLE RENT S.R.L. fornisce informazioni e servizi 'così come sono'. Nei limiti massimi consentiti dalla legge:"
                  }
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>{isEnglish ? "We do not guarantee uninterrupted or error-free access to the website" : "Non garantiamo l'accesso ininterrotto o privo di errori al sito web"}</li>
                  <li>{isEnglish ? "Investment returns and rental yields shown are estimates and not guaranteed" : "I rendimenti degli investimenti e i canoni di affitto mostrati sono stime e non garantiti"}</li>
                  <li>{isEnglish ? "We are not liable for indirect, incidental, or consequential damages" : "Non siamo responsabili per danni indiretti, incidentali o consequenziali"}</li>
                  <li>{isEnglish ? "Real estate investments carry inherent risks" : "Gli investimenti immobiliari comportano rischi intrinseci"}</li>
                </ul>
              </section>

              {/* Privacy */}
              <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">
                  {isEnglish ? "9. Privacy and Data Protection" : "9. Privacy e protezione dei dati"}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {isEnglish 
                    ? "The processing of personal data is governed by our Privacy Policy, available at junglerent.it/privacy. By using our services, you consent to the collection and processing of your data as described therein."
                    : "Il trattamento dei dati personali è regolato dalla nostra Informativa Privacy, disponibile su junglerent.it/privacy. Utilizzando i nostri servizi, l'utente acconsente alla raccolta e al trattamento dei propri dati come ivi descritto."
                  }
                </p>
              </section>

              {/* Modifiche ai Termini */}
              <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">
                  {isEnglish ? "10. Modifications to Terms" : "10. Modifiche ai termini"}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {isEnglish 
                    ? "JUNGLE RENT S.R.L. reserves the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on the website. Continued use of the services after changes constitutes acceptance of the new terms."
                    : "JUNGLE RENT S.R.L. si riserva il diritto di modificare i presenti Termini e Condizioni in qualsiasi momento. Le modifiche saranno efficaci immediatamente dopo la pubblicazione sul sito web. L'uso continuato dei servizi dopo le modifiche costituisce accettazione dei nuovi termini."
                  }
                </p>
              </section>

              {/* Legge Applicabile */}
              <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">
                  {isEnglish ? "11. Applicable Law and Jurisdiction" : "11. Legge applicabile e foro competente"}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {isEnglish 
                    ? "These Terms and Conditions are governed by Italian law. Any dispute arising from the interpretation or execution of these terms shall be subject to the exclusive jurisdiction of the Court of Turin (Tribunale di Torino)."
                    : "I presenti Termini e Condizioni sono regolati dalla legge italiana. Qualsiasi controversia derivante dall'interpretazione o dall'esecuzione dei presenti termini sarà di competenza esclusiva del Tribunale di Torino."
                  }
                </p>
              </section>

              {/* Contatti */}
              <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">
                  {isEnglish ? "12. Contact Information" : "12. Contatti"}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {isEnglish 
                    ? "For questions regarding these Terms and Conditions, please contact us:"
                    : "Per domande riguardanti i presenti Termini e Condizioni, contattaci:"
                  }
                </p>
                <div className="bg-muted/30 rounded-xl p-6 space-y-2">
                  <p><strong>Email:</strong> junglerententeprise@gmail.com</p>
                  <p><strong>PEC:</strong> junglerent@legalmail.it</p>
                  <p><strong>{isEnglish ? "Phone" : "Telefono"}:</strong> +39 331 905 3037</p>
                  <p><strong>{isEnglish ? "Address" : "Indirizzo"}:</strong> Via Gioacchino Quarello 15/A, 10135 Torino (TO)</p>
                </div>
              </section>

            </div>
          </ScrollArea>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default TerminiCondizioni;
