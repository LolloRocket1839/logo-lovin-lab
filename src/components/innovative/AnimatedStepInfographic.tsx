import { useTranslation } from "react-i18next";
import { User, Euro, Building2, Key, Users, Plane, FileText, Wrench, Receipt, TrendingUp, BarChart3, PieChart } from "lucide-react";
import jungleRentLogo from "@/assets/jungle-rent-logo.svg";

interface AnimatedStepInfographicProps {
  stepId: string;
  isActive: boolean;
}

// Step 1: Investi - Investor → € → Jungle Rent
const InvestInfographic = () => {
  const { t } = useTranslation();
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="flex items-center justify-center gap-4 md:gap-8 w-full max-w-2xl">
        {/* Investor */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center">
            <User className="w-10 h-10 md:w-14 md:h-14 text-emerald-600" />
          </div>
          <span className="mt-3 text-sm md:text-base font-semibold text-foreground">{t('infographic.labels.investor', 'Investitore')}</span>
        </div>

        {/* Arrow with Euro */}
        <div className="flex-1 flex flex-col items-center relative">
          <svg className="w-full h-12" viewBox="0 0 200 50">
            <path
              d="M 10 25 L 190 25"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              fill="none"
              strokeDasharray="8 4"
            />
            <polygon
              points="180,15 200,25 180,35"
              fill="hsl(var(--primary))"
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background border-2 border-primary rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
            <Euro className="w-5 h-5 text-primary" />
            <span className="font-bold text-primary">€100+</span>
          </div>
        </div>

        {/* Jungle Rent */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center p-4">
            <img src={jungleRentLogo} alt="Jungle Rent" className="w-full h-full object-contain" />
          </div>
          <span className="mt-3 text-sm md:text-base font-semibold text-foreground">Jungle Rent</span>
        </div>
      </div>

      {/* Bottom explanation */}
      <p className="mt-8 text-center text-muted-foreground max-w-md text-sm md:text-base">
        {t('infographic.steps.invest.detail', 'Nessun immobile da gestire, nessuna burocrazia. Tu investi, noi facciamo il resto.')}
      </p>
    </div>
  );
};

// Step 2: Acquistiamo - Jungle Rent → Key → House
const AcquireInfographic = () => {
  const { t } = useTranslation();
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="flex items-center justify-center gap-4 md:gap-8 w-full max-w-2xl">
        {/* Jungle Rent */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center p-4">
            <img src={jungleRentLogo} alt="Jungle Rent" className="w-full h-full object-contain" />
          </div>
          <span className="mt-3 text-sm md:text-base font-semibold text-foreground">Jungle Rent</span>
        </div>

        {/* Arrow with Key */}
        <div className="flex-1 flex flex-col items-center relative">
          <svg className="w-full h-12" viewBox="0 0 200 50">
            <path
              d="M 10 25 L 190 25"
              stroke="#0ea5e9"
              strokeWidth="3"
              fill="none"
              strokeDasharray="8 4"
            />
            <polygon
              points="180,15 200,25 180,35"
              fill="#0ea5e9"
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background border-2 border-sky-500 rounded-full p-3 shadow-lg">
            <Key className="w-6 h-6 text-sky-500" />
          </div>
        </div>

        {/* Property */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-sky-500/20 border-2 border-sky-500 flex items-center justify-center relative">
            <Building2 className="w-10 h-10 md:w-14 md:h-14 text-sky-600" />
            {/* University badge */}
            <div className="absolute -bottom-2 -right-2 bg-sky-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
              📍 Uni
            </div>
          </div>
          <span className="mt-3 text-sm md:text-base font-semibold text-foreground text-center">{t('infographic.labels.property', 'Immobile')}</span>
        </div>
      </div>

      {/* University locations */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {['Politecnico', 'UniTo', 'ESCP', 'SAA'].map((uni) => (
          <span key={uni} className="px-3 py-1 bg-sky-500/10 text-sky-600 rounded-full text-xs font-medium">
            {uni}
          </span>
        ))}
      </div>

      <p className="mt-6 text-center text-muted-foreground max-w-md text-sm md:text-base">
        {t('infographic.steps.acquire.detail', 'Acquistiamo immobili vicino a Politecnico, UniTo e i 7 atenei torinesi.')}
      </p>
    </div>
  );
};

// Step 3: Gestiamo - Property with Students/Tourists cycle
const ManageInfographic = () => {
  const { t } = useTranslation();
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="flex items-center justify-center gap-6 md:gap-12 w-full max-w-3xl">
        {/* Students */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center">
            <Users className="w-8 h-8 md:w-12 md:h-12 text-amber-600" />
          </div>
          <span className="mt-2 text-xs md:text-sm font-semibold text-foreground">{t('infographic.labels.students', 'Studenti')}</span>
          <span className="text-xs text-muted-foreground">Set - Giu</span>
        </div>

        {/* Center Property with management icons */}
        <div className="flex flex-col items-center relative">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center">
            <Building2 className="w-12 h-12 md:w-16 md:h-16 text-amber-600" />
          </div>
          
          {/* Management badges around the house */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-background border border-amber-500 rounded-full p-1.5 shadow-md">
            <FileText className="w-4 h-4 text-amber-500" />
          </div>
          <div className="absolute top-1/2 -left-3 -translate-y-1/2 bg-background border border-amber-500 rounded-full p-1.5 shadow-md">
            <Wrench className="w-4 h-4 text-amber-500" />
          </div>
          <div className="absolute top-1/2 -right-3 -translate-y-1/2 bg-background border border-amber-500 rounded-full p-1.5 shadow-md">
            <Receipt className="w-4 h-4 text-amber-500" />
          </div>
          
          {/* 365 days badge */}
          <div className="mt-3 px-4 py-1.5 bg-amber-500 text-white rounded-full text-sm font-bold">
            365 {t('infographic.labels.days', 'giorni')}
          </div>
        </div>

        {/* Tourists */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center">
            <Plane className="w-8 h-8 md:w-12 md:h-12 text-amber-600" />
          </div>
          <span className="mt-2 text-xs md:text-sm font-semibold text-foreground">{t('infographic.labels.tourists', 'Turisti')}</span>
          <span className="text-xs text-muted-foreground">Lug - Ago</span>
        </div>
      </div>

      {/* Management services */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {[
          t('infographic.labels.contracts', 'Contratti'),
          t('infographic.labels.tenants', 'Inquilini'),
          t('infographic.labels.maintenance', 'Manutenzione'),
          t('infographic.labels.taxes', 'Fiscalità')
        ].map((service) => (
          <span key={service} className="px-3 py-1 bg-amber-500/10 text-amber-600 rounded-full text-xs font-medium">
            ✓ {service}
          </span>
        ))}
      </div>

      <p className="mt-6 text-center text-muted-foreground max-w-md text-sm md:text-base">
        {t('infographic.steps.manage.detail', 'Contratti, inquilini, manutenzione, fiscalità. Zero pensieri per te.')}
      </p>
    </div>
  );
};

// Step 4: Guadagni - Returns flow back to investor
const EarnInfographic = () => {
  const { t } = useTranslation();
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="flex items-center justify-center gap-4 md:gap-8 w-full max-w-2xl">
        {/* Portfolio */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-violet-500/20 border-2 border-violet-500 flex items-center justify-center relative">
            <PieChart className="w-10 h-10 md:w-14 md:h-14 text-violet-600" />
          </div>
          <span className="mt-3 text-sm md:text-base font-semibold text-foreground">{t('infographic.labels.portfolio', 'Portfolio')}</span>
        </div>

        {/* Arrow with chart */}
        <div className="flex-1 flex flex-col items-center relative">
          <svg className="w-full h-12" viewBox="0 0 200 50">
            <path
              d="M 10 25 L 190 25"
              stroke="#8b5cf6"
              strokeWidth="3"
              fill="none"
              strokeDasharray="8 4"
            />
            <polygon
              points="180,15 200,25 180,35"
              fill="#8b5cf6"
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background border-2 border-violet-500 rounded-lg px-3 py-2 shadow-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-violet-500" />
            <BarChart3 className="w-5 h-5 text-violet-500" />
          </div>
        </div>

        {/* Investor receiving returns */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-violet-500/20 border-2 border-violet-500 flex items-center justify-center relative">
            <User className="w-10 h-10 md:w-14 md:h-14 text-violet-600" />
            {/* Euro badge */}
            <div className="absolute -bottom-2 -right-2 bg-violet-500 text-white rounded-full p-1.5">
              <Euro className="w-4 h-4" />
            </div>
          </div>
          <span className="mt-3 text-sm md:text-base font-semibold text-foreground">{t('infographic.labels.investor', 'Investitore')}</span>
        </div>
      </div>

      {/* Features */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {[
          t('infographic.labels.quarterlyReports', 'Report trimestrali'),
          t('infographic.labels.dashboard', 'Dashboard'),
          t('infographic.labels.transparency', 'Trasparenza')
        ].map((feature) => (
          <span key={feature} className="px-3 py-1 bg-violet-500/10 text-violet-600 rounded-full text-xs font-medium">
            ✓ {feature}
          </span>
        ))}
      </div>

      <p className="mt-6 text-center text-muted-foreground max-w-md text-sm md:text-base">
        {t('infographic.steps.earn.detail', 'Rendite trimestrali con report trasparenti. Accesso a dashboard personale.')}
      </p>
    </div>
  );
};

export const AnimatedStepInfographic = ({ stepId, isActive }: AnimatedStepInfographicProps) => {
  if (!isActive) return null;
  
  switch (stepId) {
    case 'invest':
      return <InvestInfographic />;
    case 'acquire':
      return <AcquireInfographic />;
    case 'manage':
      return <ManageInfographic />;
    case 'earn':
      return <EarnInfographic />;
    default:
      return null;
  }
};
