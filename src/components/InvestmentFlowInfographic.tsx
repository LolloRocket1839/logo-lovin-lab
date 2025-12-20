import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { 
  Wallet, 
  PieChart, 
  Building2, 
  Users, 
  Banknote,
  ArrowDown,
  Repeat
} from "lucide-react";

const flowSteps = [
  { key: "deposit", icon: Wallet, color: "from-emerald-500 to-emerald-600" },
  { key: "portfolio", icon: PieChart, color: "from-blue-500 to-blue-600" },
  { key: "properties", icon: Building2, color: "from-violet-500 to-violet-600" },
  { key: "tenants", icon: Users, color: "from-amber-500 to-amber-600" },
  { key: "returns", icon: Banknote, color: "from-emerald-500 to-emerald-600" },
];

export const InvestmentFlowInfographic = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-24 bg-background" aria-labelledby="investment-flow-title">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            {t("investmentFlow.badge")}
          </span>
          <h2 id="investment-flow-title" className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("investmentFlow.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("investmentFlow.subtitle")}
          </p>
        </motion.div>

        {/* Desktop Flow - Horizontal with curved path */}
        <div className="hidden lg:block relative">
          {/* Background path line */}
          <div className="absolute top-1/2 left-[10%] right-[10%] h-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 rounded-full transform -translate-y-1/2" />
          
          <div className="flex items-center justify-between relative px-8">
            {flowSteps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === flowSteps.length - 1;
              
              return (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="flex flex-col items-center relative z-10"
                >
                  {/* Card */}
                  <div className="bg-card border border-border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-[180px]">
                    {/* Icon circle */}
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    
                    {/* Amount/Label */}
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground mb-1">
                        {t(`investmentFlow.steps.${step.key}.amount`)}
                      </div>
                      <h3 className="font-semibold text-foreground text-sm mb-2">
                        {t(`investmentFlow.steps.${step.key}.title`)}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {t(`investmentFlow.steps.${step.key}.desc`)}
                      </p>
                    </div>
                  </div>
                  
                  {/* Arrow connector */}
                  {!isLast && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.15 + 0.3 }}
                      className="absolute -right-8 top-1/2 transform -translate-y-1/2"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <ArrowDown className="w-4 h-4 text-primary rotate-[-90deg]" />
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
          
          {/* Cycle indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex items-center justify-center mt-8 gap-3"
          >
            <Repeat className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground font-medium">
              {t("investmentFlow.cycle")}
            </span>
          </motion.div>
        </div>

        {/* Tablet Flow - 2x2 + 1 grid */}
        <div className="hidden md:block lg:hidden">
          <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
            {flowSteps.slice(0, 4).map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="bg-card border border-border rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-xl font-bold text-foreground">
                          {t(`investmentFlow.steps.${step.key}.amount`)}
                        </div>
                        <h3 className="font-medium text-foreground text-sm">
                          {t(`investmentFlow.steps.${step.key}.title`)}
                        </h3>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      {t(`investmentFlow.steps.${step.key}.desc`)}
                    </p>
                  </div>
                  
                  {/* Connector arrows */}
                  {index < 3 && (
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 z-10">
                      <ArrowDown className="w-5 h-5 text-primary/50" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
          
          {/* Final step centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="max-w-sm mx-auto mt-6"
          >
            <div className="bg-card border-2 border-primary/30 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${flowSteps[4].color} flex items-center justify-center flex-shrink-0`}>
                  <Banknote className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-xl font-bold text-foreground">
                    {t(`investmentFlow.steps.returns.amount`)}
                  </div>
                  <h3 className="font-medium text-foreground text-sm">
                    {t(`investmentFlow.steps.returns.title`)}
                  </h3>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                {t(`investmentFlow.steps.returns.desc`)}
              </p>
            </div>
          </motion.div>
          
          <div className="flex items-center justify-center mt-6 gap-2">
            <Repeat className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">{t("investmentFlow.cycle")}</span>
          </div>
        </div>

        {/* Mobile Flow - Vertical timeline */}
        <div className="md:hidden">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/40 via-primary/20 to-primary/40" />
            
            <div className="space-y-6">
              {flowSteps.map((step, index) => {
                const Icon = step.icon;
                const isLast = index === flowSteps.length - 1;
                
                return (
                  <motion.div
                    key={step.key}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-4 relative"
                  >
                    {/* Icon node */}
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0 z-10 shadow-lg`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    
                    {/* Content card */}
                    <div className={`flex-1 bg-card border ${isLast ? 'border-primary/30 border-2' : 'border-border'} rounded-xl p-4 shadow-sm`}>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-foreground">
                          {t(`investmentFlow.steps.${step.key}.title`)}
                        </h3>
                        <span className="text-lg font-bold text-primary">
                          {t(`investmentFlow.steps.${step.key}.amount`)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {t(`investmentFlow.steps.${step.key}.desc`)}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          {/* Cycle indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center justify-center mt-8 gap-2 text-sm text-muted-foreground"
          >
            <Repeat className="w-4 h-4 text-primary" />
            <span>{t("investmentFlow.cycle")}</span>
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {["minInvestment", "payoutFrequency", "properties", "occupancy"].map((stat, index) => (
            <div 
              key={stat}
              className="bg-card border border-border rounded-xl p-4 md:p-5 text-center hover:border-primary/30 transition-colors"
            >
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                {t(`investmentFlow.stats.${stat}.value`)}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">
                {t(`investmentFlow.stats.${stat}.label`)}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default InvestmentFlowInfographic;
