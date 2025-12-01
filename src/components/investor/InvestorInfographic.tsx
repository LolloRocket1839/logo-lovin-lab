import React, { useState } from 'react';
import { motion, AnimatePresence, type Easing } from 'framer-motion';
import { 
  Wallet, 
  Home, 
  Settings, 
  TrendingUp, 
  Users, 
  Building2, 
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface Step {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  detail: string;
  color: string;
}

const InvestorInfographic: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [hoveredMetric, setHoveredMetric] = useState<number | null>(null);

  const steps: Step[] = [
    {
      id: 1,
      icon: <Wallet className="w-8 h-8 md:w-10 md:h-10" />,
      title: "Investi",
      description: "Da €5.000",
      detail: "Investimento minimo accessibile per entrare nel mercato immobiliare studentesco di Torino",
      color: "hsl(var(--primary))"
    },
    {
      id: 2,
      icon: <Home className="w-8 h-8 md:w-10 md:h-10" />,
      title: "Acquistiamo",
      description: "Immobili strategici",
      detail: "Selezioniamo proprietà vicino alle università con alto potenziale di rendimento",
      color: "hsl(var(--primary))"
    },
    {
      id: 3,
      icon: <Settings className="w-8 h-8 md:w-10 md:h-10" />,
      title: "Gestiamo",
      description: "Tutto incluso",
      detail: "Contratti, manutenzione, inquilini, pagamenti - gestione completa senza stress",
      color: "hsl(var(--primary))"
    },
    {
      id: 4,
      icon: <TrendingUp className="w-8 h-8 md:w-10 md:h-10" />,
      title: "Guadagni",
      description: "7-9% annuo",
      detail: "Rendimenti superiori alla media con report trimestrali dettagliati",
      color: "hsl(var(--primary))"
    }
  ];

  const metrics = [
    { 
      value: "8.34%", 
      label: "Rental Yield", 
      icon: <TrendingUp className="w-5 h-5" />,
      description: "Rendimento medio annuo"
    },
    { 
      value: "95%", 
      label: "Occupazione", 
      icon: <Users className="w-5 h-5" />,
      description: "Tasso di occupazione medio"
    },
    { 
      value: "90k+", 
      label: "Studenti", 
      icon: <GraduationCap className="w-5 h-5" />,
      description: "Studenti universitari a Torino"
    },
    { 
      value: "7", 
      label: "Università", 
      icon: <Building2 className="w-5 h-5" />,
      description: "Atenei nel territorio"
    }
  ];

  const easeOut: Easing = [0.0, 0.0, 0.2, 1];
  const easeInOut: Easing = [0.4, 0, 0.2, 1];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: easeOut }
    }
  };

  const pulseVariants = {
    initial: { scale: 1 },
    pulse: { 
      scale: [1, 1.05, 1],
      transition: { 
        duration: 2,
        repeat: Infinity,
        ease: easeInOut
      }
    }
  };

  return (
    <motion.div 
      className="w-full max-w-5xl mx-auto px-4 py-8 md:py-12"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* Header */}
      <motion.div 
        className="text-center mb-10 md:mb-14"
        variants={itemVariants}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Come Funziona</span>
        </div>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-3">
          Il Modello Jungle Rent
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
          Investimenti immobiliari semplificati nel mercato studentesco di Torino
        </p>
      </motion.div>

      {/* Steps Flow */}
      <motion.div 
        className="relative mb-12 md:mb-16"
        variants={itemVariants}
      >
        {/* Desktop: Horizontal Flow */}
        <div className="hidden md:grid md:grid-cols-4 gap-4 lg:gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="relative"
              variants={itemVariants}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/40 to-primary/10 z-0" />
              )}
              
              {/* Step Card */}
              <motion.div
                className={`relative z-10 p-5 lg:p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                  activeStep === step.id 
                    ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20' 
                    : 'bg-card border-border hover:border-primary/50 hover:shadow-md'
                }`}
                onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Step Number */}
                <div className={`absolute -top-3 -left-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  activeStep === step.id 
                    ? 'bg-primary-foreground text-primary' 
                    : 'bg-primary text-primary-foreground'
                }`}>
                  {step.id}
                </div>

                <div className={`mb-3 ${activeStep === step.id ? 'text-primary-foreground' : 'text-primary'}`}>
                  {step.icon}
                </div>
                
                <h3 className={`text-lg lg:text-xl font-bold mb-1 ${
                  activeStep === step.id ? 'text-primary-foreground' : 'text-foreground'
                }`}>
                  {step.title}
                </h3>
                
                <p className={`text-sm ${
                  activeStep === step.id ? 'text-primary-foreground/90' : 'text-muted-foreground'
                }`}>
                  {step.description}
                </p>

                {/* Expanded Detail */}
                <AnimatePresence>
                  {activeStep === step.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 pt-3 border-t border-primary-foreground/20"
                    >
                      <p className="text-sm text-primary-foreground/80">
                        {step.detail}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: Vertical Flow */}
        <div className="md:hidden space-y-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="relative"
              variants={itemVariants}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-6 top-[72px] w-0.5 h-8 bg-gradient-to-b from-primary/40 to-primary/10" />
              )}
              
              {/* Step Card */}
              <motion.div
                className={`relative flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  activeStep === step.id 
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : 'bg-card border-border'
                }`}
                onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                  activeStep === step.id 
                    ? 'bg-primary-foreground/20' 
                    : 'bg-primary/10'
                }`}>
                  <div className={activeStep === step.id ? 'text-primary-foreground' : 'text-primary'}>
                    {step.icon}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      activeStep === step.id 
                        ? 'bg-primary-foreground/20 text-primary-foreground' 
                        : 'bg-primary/10 text-primary'
                    }`}>
                      Step {step.id}
                    </span>
                  </div>
                  
                  <h3 className={`text-lg font-bold mb-0.5 ${
                    activeStep === step.id ? 'text-primary-foreground' : 'text-foreground'
                  }`}>
                    {step.title}
                  </h3>
                  
                  <p className={`text-sm ${
                    activeStep === step.id ? 'text-primary-foreground/90' : 'text-muted-foreground'
                  }`}>
                    {step.description}
                  </p>

                  <AnimatePresence>
                    {activeStep === step.id && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 text-sm text-primary-foreground/80"
                      >
                        {step.detail}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <ArrowRight className={`flex-shrink-0 w-5 h-5 transition-transform ${
                  activeStep === step.id 
                    ? 'text-primary-foreground rotate-90' 
                    : 'text-muted-foreground'
                }`} />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
        variants={containerVariants}
      >
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            className="relative p-4 md:p-5 rounded-xl bg-card border border-border cursor-pointer overflow-hidden group"
            variants={itemVariants}
            onMouseEnter={() => setHoveredMetric(index)}
            onMouseLeave={() => setHoveredMetric(null)}
            whileHover={{ y: -2 }}
          >
            {/* Background Glow */}
            <motion.div 
              className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2 text-primary">
                {metric.icon}
              </div>
              
              <motion.div
                className="text-2xl md:text-3xl font-extrabold text-foreground mb-1"
                variants={pulseVariants}
                initial="initial"
                animate={hoveredMetric === index ? "pulse" : "initial"}
              >
                {metric.value}
              </motion.div>
              
              <div className="text-sm font-medium text-muted-foreground">
                {metric.label}
              </div>

              <AnimatePresence>
                {hoveredMetric === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-2 text-xs text-muted-foreground"
                  >
                    {metric.description}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom CTA */}
      <motion.div 
        className="mt-10 md:mt-12 text-center"
        variants={itemVariants}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full">
          <CheckCircle2 className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">
            Zero stress. Gestione completa inclusa.
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default InvestorInfographic;
