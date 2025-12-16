import { motion, Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import { User, Euro, Building2, Key, Users, Plane, FileText, Wrench, Receipt, TrendingUp, BarChart3, PieChart } from "lucide-react";
import jungleRentLogo from "@/assets/jungle-rent-logo.svg";

interface AnimatedStepInfographicProps {
  stepId: string;
  isActive: boolean;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
  }
};

const arrowVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, 
    opacity: 1,
    transition: { duration: 0.8, ease: [0.42, 0, 0.58, 1] }
  }
};

// Step 1: Investi - Investor → € → Jungle Rent
const InvestInfographic = ({ isActive }: { isActive: boolean }) => {
  const { t } = useTranslation();
  
  return (
    <motion.div 
      className="w-full h-full flex flex-col items-center justify-center p-8"
      variants={containerVariants}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
    >
      <div className="flex items-center justify-center gap-4 md:gap-8 w-full max-w-2xl">
        {/* Investor */}
        <motion.div variants={itemVariants} className="flex flex-col items-center">
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center">
            <User className="w-10 h-10 md:w-14 md:h-14 text-emerald-600" />
          </div>
          <span className="mt-3 text-sm md:text-base font-semibold text-foreground">{t('infographic.labels.investor', 'Investitore')}</span>
        </motion.div>

        {/* Arrow with Euro */}
        <motion.div variants={itemVariants} className="flex-1 flex flex-col items-center relative">
          <svg className="w-full h-12" viewBox="0 0 200 50">
            <motion.path
              d="M 10 25 L 190 25"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              fill="none"
              strokeDasharray="8 4"
              variants={arrowVariants}
            />
            <motion.polygon
              points="180,15 200,25 180,35"
              fill="hsl(var(--primary))"
              variants={itemVariants}
            />
          </svg>
          <motion.div 
            variants={itemVariants}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background border-2 border-primary rounded-full px-4 py-2 flex items-center gap-2 shadow-lg"
          >
            <Euro className="w-5 h-5 text-primary" />
            <span className="font-bold text-primary">€100+</span>
          </motion.div>
        </motion.div>

        {/* Jungle Rent */}
        <motion.div variants={itemVariants} className="flex flex-col items-center">
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center p-4">
            <img src={jungleRentLogo} alt="Jungle Rent" className="w-full h-full object-contain" />
          </div>
          <span className="mt-3 text-sm md:text-base font-semibold text-foreground">Jungle Rent</span>
        </motion.div>
      </div>

      {/* Bottom explanation */}
      <motion.p 
        variants={itemVariants}
        className="mt-8 text-center text-muted-foreground max-w-md text-sm md:text-base"
      >
        {t('infographic.steps.invest.detail', 'Nessun immobile da gestire, nessuna burocrazia. Tu investi, noi facciamo il resto.')}
      </motion.p>
    </motion.div>
  );
};

// Step 2: Acquistiamo - Jungle Rent → Key → House
const AcquireInfographic = ({ isActive }: { isActive: boolean }) => {
  const { t } = useTranslation();
  
  return (
    <motion.div 
      className="w-full h-full flex flex-col items-center justify-center p-8"
      variants={containerVariants}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
    >
      <div className="flex items-center justify-center gap-4 md:gap-8 w-full max-w-2xl">
        {/* Jungle Rent */}
        <motion.div variants={itemVariants} className="flex flex-col items-center">
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center p-4">
            <img src={jungleRentLogo} alt="Jungle Rent" className="w-full h-full object-contain" />
          </div>
          <span className="mt-3 text-sm md:text-base font-semibold text-foreground">Jungle Rent</span>
        </motion.div>

        {/* Arrow with Key */}
        <motion.div variants={itemVariants} className="flex-1 flex flex-col items-center relative">
          <svg className="w-full h-12" viewBox="0 0 200 50">
            <motion.path
              d="M 10 25 L 190 25"
              stroke="hsl(var(--sky-500, 56 189 248))"
              strokeWidth="3"
              fill="none"
              strokeDasharray="8 4"
              variants={arrowVariants}
            />
            <motion.polygon
              points="180,15 200,25 180,35"
              fill="hsl(var(--sky-500, 56 189 248))"
              variants={itemVariants}
            />
          </svg>
          <motion.div 
            variants={itemVariants}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background border-2 border-sky-500 rounded-full p-3 shadow-lg"
          >
            <Key className="w-6 h-6 text-sky-500" />
          </motion.div>
        </motion.div>

        {/* Property */}
        <motion.div variants={itemVariants} className="flex flex-col items-center">
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-sky-500/20 border-2 border-sky-500 flex items-center justify-center relative">
            <Building2 className="w-10 h-10 md:w-14 md:h-14 text-sky-600" />
            {/* University badge */}
            <motion.div 
              variants={itemVariants}
              className="absolute -bottom-2 -right-2 bg-sky-500 text-white text-xs px-2 py-1 rounded-full font-semibold"
            >
              📍 Uni
            </motion.div>
          </div>
          <span className="mt-3 text-sm md:text-base font-semibold text-foreground text-center">{t('infographic.labels.property', 'Immobile')}</span>
        </motion.div>
      </div>

      {/* University locations */}
      <motion.div 
        variants={itemVariants}
        className="mt-6 flex flex-wrap justify-center gap-2"
      >
        {['Politecnico', 'UniTo', 'ESCP', 'SAA'].map((uni) => (
          <span key={uni} className="px-3 py-1 bg-sky-500/10 text-sky-600 rounded-full text-xs font-medium">
            {uni}
          </span>
        ))}
      </motion.div>

      <motion.p 
        variants={itemVariants}
        className="mt-6 text-center text-muted-foreground max-w-md text-sm md:text-base"
      >
        {t('infographic.steps.acquire.detail', 'Acquistiamo immobili vicino a Politecnico, UniTo e i 7 atenei torinesi.')}
      </motion.p>
    </motion.div>
  );
};

// Step 3: Gestiamo - Property with Students/Tourists cycle
const ManageInfographic = ({ isActive }: { isActive: boolean }) => {
  const { t } = useTranslation();
  
  return (
    <motion.div 
      className="w-full h-full flex flex-col items-center justify-center p-8"
      variants={containerVariants}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
    >
      <div className="flex items-center justify-center gap-6 md:gap-12 w-full max-w-3xl">
        {/* Students */}
        <motion.div variants={itemVariants} className="flex flex-col items-center">
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center">
            <Users className="w-8 h-8 md:w-12 md:h-12 text-amber-600" />
          </div>
          <span className="mt-2 text-xs md:text-sm font-semibold text-foreground">{t('infographic.labels.students', 'Studenti')}</span>
          <span className="text-xs text-muted-foreground">Set - Giu</span>
        </motion.div>

        {/* Center Property with management icons */}
        <motion.div variants={itemVariants} className="flex flex-col items-center relative">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center">
            <Building2 className="w-12 h-12 md:w-16 md:h-16 text-amber-600" />
          </div>
          
          {/* Management badges around the house */}
          <motion.div 
            variants={itemVariants}
            className="absolute -top-3 left-1/2 -translate-x-1/2 bg-background border border-amber-500 rounded-full p-1.5 shadow-md"
          >
            <FileText className="w-4 h-4 text-amber-500" />
          </motion.div>
          <motion.div 
            variants={itemVariants}
            className="absolute top-1/2 -left-3 -translate-y-1/2 bg-background border border-amber-500 rounded-full p-1.5 shadow-md"
          >
            <Wrench className="w-4 h-4 text-amber-500" />
          </motion.div>
          <motion.div 
            variants={itemVariants}
            className="absolute top-1/2 -right-3 -translate-y-1/2 bg-background border border-amber-500 rounded-full p-1.5 shadow-md"
          >
            <Receipt className="w-4 h-4 text-amber-500" />
          </motion.div>
          
          {/* 365 days badge */}
          <motion.div 
            variants={itemVariants}
            className="mt-3 px-4 py-1.5 bg-amber-500 text-white rounded-full text-sm font-bold"
          >
            365 {t('infographic.labels.days', 'giorni')}
          </motion.div>
        </motion.div>

        {/* Tourists */}
        <motion.div variants={itemVariants} className="flex flex-col items-center">
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center">
            <Plane className="w-8 h-8 md:w-12 md:h-12 text-amber-600" />
          </div>
          <span className="mt-2 text-xs md:text-sm font-semibold text-foreground">{t('infographic.labels.tourists', 'Turisti')}</span>
          <span className="text-xs text-muted-foreground">Lug - Ago</span>
        </motion.div>
      </div>

      {/* Management services */}
      <motion.div 
        variants={itemVariants}
        className="mt-6 flex flex-wrap justify-center gap-2"
      >
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
      </motion.div>

      <motion.p 
        variants={itemVariants}
        className="mt-6 text-center text-muted-foreground max-w-md text-sm md:text-base"
      >
        {t('infographic.steps.manage.detail', 'Contratti, inquilini, manutenzione, fiscalità. Zero pensieri per te.')}
      </motion.p>
    </motion.div>
  );
};

// Step 4: Guadagni - Returns flow back to investor
const EarnInfographic = ({ isActive }: { isActive: boolean }) => {
  const { t } = useTranslation();
  
  return (
    <motion.div 
      className="w-full h-full flex flex-col items-center justify-center p-8"
      variants={containerVariants}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
    >
      <div className="flex items-center justify-center gap-4 md:gap-8 w-full max-w-2xl">
        {/* Portfolio */}
        <motion.div variants={itemVariants} className="flex flex-col items-center">
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-violet-500/20 border-2 border-violet-500 flex items-center justify-center relative">
            <PieChart className="w-10 h-10 md:w-14 md:h-14 text-violet-600" />
          </div>
          <span className="mt-3 text-sm md:text-base font-semibold text-foreground">{t('infographic.labels.portfolio', 'Portfolio')}</span>
        </motion.div>

        {/* Arrow with chart */}
        <motion.div variants={itemVariants} className="flex-1 flex flex-col items-center relative">
          <svg className="w-full h-12" viewBox="0 0 200 50">
            <motion.path
              d="M 10 25 L 190 25"
              stroke="hsl(var(--violet-500, 139 92 246))"
              strokeWidth="3"
              fill="none"
              strokeDasharray="8 4"
              variants={arrowVariants}
            />
            <motion.polygon
              points="180,15 200,25 180,35"
              fill="hsl(var(--violet-500, 139 92 246))"
              variants={itemVariants}
            />
          </svg>
          <motion.div 
            variants={itemVariants}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background border-2 border-violet-500 rounded-lg px-3 py-2 shadow-lg flex items-center gap-2"
          >
            <TrendingUp className="w-5 h-5 text-violet-500" />
            <BarChart3 className="w-5 h-5 text-violet-500" />
          </motion.div>
        </motion.div>

        {/* Investor receiving returns */}
        <motion.div variants={itemVariants} className="flex flex-col items-center">
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-violet-500/20 border-2 border-violet-500 flex items-center justify-center relative">
            <User className="w-10 h-10 md:w-14 md:h-14 text-violet-600" />
            {/* Euro badge */}
            <motion.div 
              variants={itemVariants}
              className="absolute -bottom-2 -right-2 bg-violet-500 text-white rounded-full p-1.5"
            >
              <Euro className="w-4 h-4" />
            </motion.div>
          </div>
          <span className="mt-3 text-sm md:text-base font-semibold text-foreground">{t('infographic.labels.investor', 'Investitore')}</span>
        </motion.div>
      </div>

      {/* Features */}
      <motion.div 
        variants={itemVariants}
        className="mt-6 flex flex-wrap justify-center gap-2"
      >
        {[
          t('infographic.labels.quarterlyReports', 'Report trimestrali'),
          t('infographic.labels.dashboard', 'Dashboard'),
          t('infographic.labels.transparency', 'Trasparenza')
        ].map((feature) => (
          <span key={feature} className="px-3 py-1 bg-violet-500/10 text-violet-600 rounded-full text-xs font-medium">
            ✓ {feature}
          </span>
        ))}
      </motion.div>

      <motion.p 
        variants={itemVariants}
        className="mt-6 text-center text-muted-foreground max-w-md text-sm md:text-base"
      >
        {t('infographic.steps.earn.detail', 'Rendite trimestrali con report trasparenti. Accesso a dashboard personale.')}
      </motion.p>
    </motion.div>
  );
};

export const AnimatedStepInfographic = ({ stepId, isActive }: AnimatedStepInfographicProps) => {
  switch (stepId) {
    case 'invest':
      return <InvestInfographic isActive={isActive} />;
    case 'acquire':
      return <AcquireInfographic isActive={isActive} />;
    case 'manage':
      return <ManageInfographic isActive={isActive} />;
    case 'earn':
      return <EarnInfographic isActive={isActive} />;
    default:
      return null;
  }
};
