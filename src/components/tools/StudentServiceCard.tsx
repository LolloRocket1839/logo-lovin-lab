import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  Clock, 
  ChevronDown,
  ChevronUp,
  Calendar,
  ExternalLink,
  Info,
  FileText,
  Wallet,
  Accessibility,
  Users,
  Brain,
  GraduationCap,
  Languages,
  UtensilsCrossed,
  Home,
  Scale,
  Music,
  Send
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { StudentService, categoryLabels, institutionLabels, ServiceCategory } from '@/data/studentServicesDirectory';

interface StudentServiceCardProps {
  service: StudentService;
}

const categoryIcons: Record<ServiceCategory, React.ElementType> = {
  'informazioni-generali': Info,
  'iscrizione-carriera': FileText,
  'tasse-borse': Wallet,
  'inclusione-accessibilita': Accessibility,
  'mobilita-internazionale': Globe,
  'studenti-internazionali': Users,
  'supporto-psicologico': Brain,
  'supporto-accademico': GraduationCap,
  'lingue': Languages,
  'ristorazione': UtensilsCrossed,
  'alloggio': Home,
  'diritti-studenti': Scale,
  'musica-arte': Music,
};

// Generate personalized mailto link based on service category and language
const generateMailtoLink = (service: StudentService, lang: 'it' | 'en'): string => {
  const categoryTemplates: Record<ServiceCategory, { it: string; en: string }> = {
    'informazioni-generali': {
      it: 'riguardo a informazioni generali sui servizi universitari',
      en: 'regarding general information about university services'
    },
    'iscrizione-carriera': {
      it: 'riguardo a pratiche di iscrizione e carriera',
      en: 'regarding enrollment and academic career procedures'
    },
    'tasse-borse': {
      it: 'riguardo a tasse universitarie e borse di studio',
      en: 'regarding tuition fees and scholarships'
    },
    'inclusione-accessibilita': {
      it: 'riguardo ai servizi di inclusione e accessibilità',
      en: 'regarding inclusion and accessibility services'
    },
    'mobilita-internazionale': {
      it: 'riguardo ai programmi di mobilità internazionale',
      en: 'regarding international mobility programs'
    },
    'studenti-internazionali': {
      it: 'riguardo ai servizi per studenti internazionali',
      en: 'regarding services for international students'
    },
    'supporto-psicologico': {
      it: 'riguardo alla prenotazione di un colloquio di supporto psicologico',
      en: 'regarding booking a psychological support session'
    },
    'supporto-accademico': {
      it: 'riguardo ai servizi di supporto accademico e tutoraggio',
      en: 'regarding academic support and tutoring services'
    },
    'lingue': {
      it: 'riguardo ai corsi e certificazioni linguistiche',
      en: 'regarding language courses and certifications'
    },
    'ristorazione': {
      it: 'riguardo ai servizi di ristorazione universitaria',
      en: 'regarding university catering services'
    },
    'alloggio': {
      it: 'riguardo agli alloggi e residenze universitarie',
      en: 'regarding university housing and residences'
    },
    'diritti-studenti': {
      it: 'riguardo ai diritti degli studenti e rappresentanza',
      en: 'regarding student rights and representation'
    },
    'musica-arte': {
      it: 'riguardo alle attività musicali e artistiche',
      en: 'regarding music and artistic activities'
    }
  };

  const categoryText = categoryTemplates[service.category];
  const institutionName = institutionLabels[service.institution]?.it || 'l\'università';

  const subject = lang === 'it' 
    ? `Richiesta informazioni - ${service.name}`
    : `Information request - ${service.name}`;

  const body = lang === 'it'
    ? `Gentile ${service.name},

Sono uno studente presso ${institutionName} e scrivo per richiedere informazioni ${categoryText.it}.

[Inserire qui la tua richiesta]

Cordiali saluti,
[Il tuo nome]
[Numero di matricola, se applicabile]`
    : `Dear ${service.name},

I am a student at ${institutionName} and I am writing to request information ${categoryText.en}.

[Insert your request here]

Best regards,
[Your name]
[Student ID, if applicable]`;

  return `mailto:${service.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

export const StudentServiceCard = ({ service }: StudentServiceCardProps) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith('it') ? 'it' : 'en';
  const [isHoursOpen, setIsHoursOpen] = useState(false);
  
  const institutionInfo = institutionLabels[service.institution];
  const categoryInfo = categoryLabels[service.category];
  const CategoryIcon = categoryIcons[service.category];

  const bookingLabels = {
    it: {
      no: 'Senza prenotazione',
      consigliato: 'Prenotazione consigliata',
      obbligatorio: 'Prenotazione obbligatoria'
    },
    en: {
      no: 'No booking required',
      consigliato: 'Booking recommended',
      obbligatorio: 'Booking required'
    }
  };

  const labels = {
    it: {
      hours: 'Orari',
      services: 'Servizi offerti',
      online: 'Online',
      visitWebsite: 'Visita sito',
      monday: 'Lunedì',
      tuesday: 'Martedì',
      wednesday: 'Mercoledì',
      thursday: 'Giovedì',
      friday: 'Venerdì',
      saturday: 'Sabato',
      sunday: 'Domenica',
    },
    en: {
      hours: 'Opening hours',
      services: 'Services offered',
      online: 'Online',
      visitWebsite: 'Visit website',
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday',
      sunday: 'Sunday',
    }
  };

  const t = labels[currentLang];

  const dayLabels = {
    monday: t.monday,
    tuesday: t.tuesday,
    wednesday: t.wednesday,
    thursday: t.thursday,
    friday: t.friday,
    saturday: t.saturday,
    sunday: t.sunday,
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-l-4" style={{ borderLeftColor: institutionInfo.color }}>
      <CardHeader className="pb-3">
        {/* Institution Badge */}
        <div className="flex items-center justify-between mb-2">
          <Badge 
            variant="outline" 
            className="text-xs font-medium"
            style={{ 
              borderColor: institutionInfo.color, 
              color: institutionInfo.color,
              backgroundColor: `${institutionInfo.color}10`
            }}
          >
            {institutionInfo[currentLang]}
          </Badge>
          <Badge variant="secondary" className="text-xs flex items-center gap-1">
            <CategoryIcon className="w-3 h-3" />
            {categoryInfo[currentLang]}
          </Badge>
        </div>

        {/* Name */}
        <h3 className="text-lg font-semibold text-foreground leading-tight">
          {service.name}
        </h3>

        {/* Address - clickable to open Google Maps */}
        <a 
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(service.address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-2 text-sm text-muted-foreground mt-1 hover:text-primary transition-colors group"
        >
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span className="underline-offset-2 group-hover:underline">{service.address}</span>
        </a>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Booking Badge */}
        <Badge 
          variant={service.booking === 'obbligatorio' ? 'destructive' : service.booking === 'consigliato' ? 'default' : 'secondary'}
          className="text-xs"
        >
          <Calendar className="w-3 h-3 mr-1" />
          {bookingLabels[currentLang][service.booking]}
        </Badge>

        {/* Contact Info */}
        <div className="space-y-2">
          {service.phone && (
            <a 
              href={`tel:${service.phone}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              {service.phone}
            </a>
          )}
        {service.email && (
            <a 
              href={generateMailtoLink(service, currentLang)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors break-all group"
              title={currentLang === 'it' ? 'Clicca per inviare email con modello pre-compilato' : 'Click to send email with pre-filled template'}
            >
              <div className="relative flex-shrink-0">
                <Mail className="w-4 h-4" />
                <Send className="w-2.5 h-2.5 absolute -top-0.5 -right-1 text-primary opacity-80" />
              </div>
              <span className="group-hover:underline underline-offset-2">{service.email}</span>
            </a>
          )}
        </div>

        {/* Services */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">{t.services}:</p>
          <div className="flex flex-wrap gap-1">
            {service.services.slice(0, 4).map((s, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {s}
              </Badge>
            ))}
            {service.services.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{service.services.length - 4}
              </Badge>
            )}
          </div>
        </div>

        {/* Online Mode */}
        {service.online && (
          <div className="text-xs text-muted-foreground bg-muted/50 rounded-md p-2">
            <span className="font-medium">{t.online}:</span> {service.online}
          </div>
        )}

        {/* Hours Collapsible */}
        <Collapsible open={isHoursOpen} onOpenChange={setIsHoursOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full justify-between p-2 h-auto">
              <span className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4" />
                {t.hours}
              </span>
              {isHoursOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <div className="bg-muted/30 rounded-md p-3 space-y-1 text-xs">
              {Object.entries(service.hours).map(([day, hours]) => (
                <div key={day} className="flex justify-between">
                  <span className="font-medium">{dayLabels[day as keyof typeof dayLabels]}</span>
                  <span className="text-muted-foreground">{hours}</span>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Website Button */}
        {service.website && (
          <a 
            href={service.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <Button variant="outline" size="sm" className="w-full">
              <Globe className="w-4 h-4 mr-2" />
              {t.visitWebsite}
              <ExternalLink className="w-3 h-3 ml-2" />
            </Button>
          </a>
        )}
      </CardContent>
    </Card>
  );
};
