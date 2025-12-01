import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, CheckCircle2 } from 'lucide-react';

// Premium SVG House Component with shadows and gradients
interface PremiumHouseProps {
  isActive: boolean;
  variant: 'invest' | 'acquire' | 'manage' | 'earn';
  size?: 'sm' | 'md' | 'lg';
}

const PremiumHouse: React.FC<PremiumHouseProps> = ({ isActive, variant, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-14 h-14',
    md: 'w-20 h-20',
    lg: 'w-24 h-24'
  };

  const getVariantIcon = () => {
    switch (variant) {
      case 'invest':
        return (
          <g transform="translate(34, 4)">
            <motion.circle
              cx="12"
              cy="12"
              r="10"
              fill="url(#coinGradient)"
              stroke="hsl(40 90% 40%)"
              strokeWidth="1.5"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: isActive ? 1.1 : 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            />
            <text x="12" y="16" fontSize="12" fill="hsl(40 90% 25%)" textAnchor="middle" fontWeight="bold">€</text>
          </g>
        );
      case 'acquire':
        return (
          <motion.g transform="translate(36, 6)">
            <motion.path
              d="M8 4 L16 12 M16 4 L8 12"
              stroke="hsl(var(--primary))"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            />
            <motion.circle
              cx="12"
              cy="8"
              r="10"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            />
          </motion.g>
        );
      case 'manage':
        return (
          <motion.g
            transform="translate(36, 6)"
            initial={{ rotate: 0 }}
            animate={{ rotate: isActive ? 360 : 0 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <circle cx="10" cy="10" r="7" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" />
            <circle cx="10" cy="10" r="3" fill="hsl(var(--primary))" />
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <rect
                key={i}
                x="8"
                y="0"
                width="4"
                height="4"
                rx="1"
                fill="hsl(var(--primary))"
                transform={`rotate(${angle} 10 10)`}
              />
            ))}
          </motion.g>
        );
      case 'earn':
        return (
          <g transform="translate(30, 2)">
            <motion.path
              d="M4 18 L12 10 L20 14 L28 4"
              fill="none"
              stroke="hsl(142 70% 45%)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            />
            <motion.circle
              cx="28"
              cy="4"
              r="4"
              fill="hsl(142 70% 45%)"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.3, 1] }}
              transition={{ delay: 1.2, duration: 0.4 }}
            />
          </g>
        );
      default:
        return null;
    }
  };

  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={sizeClasses[size]}
      initial={{ opacity: 0.6 }}
      animate={{ opacity: isActive ? 1 : 0.7 }}
      transition={{ duration: 0.3 }}
    >
      <defs>
        {/* House body gradient */}
        <linearGradient id="houseBodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--card))" />
          <stop offset="100%" stopColor="hsl(var(--muted))" stopOpacity="0.5" />
        </linearGradient>
        
        {/* Roof gradient */}
        <linearGradient id="roofGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(150 45% 12%)" />
        </linearGradient>
        
        {/* Window glow */}
        <radialGradient id="windowGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(48 100% 80%)" />
          <stop offset="100%" stopColor="hsl(48 100% 60%)" />
        </radialGradient>
        
        {/* Coin gradient */}
        <linearGradient id="coinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(48 100% 65%)" />
          <stop offset="100%" stopColor="hsl(40 90% 50%)" />
        </linearGradient>
        
        {/* Shadow filter */}
        <filter id="houseShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="hsl(var(--primary))" floodOpacity="0.15" />
        </filter>
        
        {/* Active glow filter */}
        <filter id="activeGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* House shadow/glow */}
      <motion.ellipse
        cx="50"
        cy="92"
        rx="32"
        ry="6"
        fill="hsl(var(--primary))"
        initial={{ opacity: 0.1 }}
        animate={{ opacity: isActive ? 0.25 : 0.1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Main house group with shadow */}
      <g filter={isActive ? "url(#activeGlow)" : "url(#houseShadow)"}>
        {/* House body */}
        <motion.rect
          x="20"
          y="45"
          width="60"
          height="45"
          rx="3"
          fill="url(#houseBodyGradient)"
          stroke="hsl(var(--border))"
          strokeWidth="1.5"
          initial={{ y: 50 }}
          animate={{ y: 45 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Roof */}
        <motion.path
          d="M12 48 L50 18 L88 48"
          fill="url(#roofGradient)"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        
        {/* Roof detail line */}
        <path
          d="M18 46 L50 22 L82 46"
          fill="none"
          stroke="hsl(var(--primary-foreground))"
          strokeWidth="0.5"
          strokeOpacity="0.3"
        />
        
        {/* Chimney */}
        <rect x="65" y="24" width="10" height="18" rx="1" fill="hsl(var(--primary))" />
        <rect x="64" y="22" width="12" height="4" rx="1" fill="hsl(150 45% 25%)" />
        
        {/* Door */}
        <rect x="42" y="62" width="16" height="28" rx="2" fill="hsl(var(--primary))" opacity="0.7" />
        <rect x="44" y="64" width="12" height="4" rx="1" fill="hsl(var(--primary-foreground))" opacity="0.2" />
        <circle cx="54" cy="78" r="2" fill="hsl(var(--primary-foreground))" opacity="0.6" />
        
        {/* Left window */}
        <rect x="26" y="54" width="12" height="14" rx="1.5" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1" />
        <motion.rect
          x="27"
          y="55"
          width="10"
          height="12"
          rx="1"
          fill={isActive ? "url(#windowGlow)" : "hsl(var(--muted))"}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: isActive ? 1 : 0.4 }}
          transition={{ duration: 0.4 }}
        />
        {/* Window cross */}
        <line x1="32" y1="55" x2="32" y2="67" stroke="hsl(var(--border))" strokeWidth="1" />
        <line x1="27" y1="61" x2="37" y2="61" stroke="hsl(var(--border))" strokeWidth="1" />
        
        {/* Right window */}
        <rect x="62" y="54" width="12" height="14" rx="1.5" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1" />
        <motion.rect
          x="63"
          y="55"
          width="10"
          height="12"
          rx="1"
          fill={isActive ? "url(#windowGlow)" : "hsl(var(--muted))"}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: isActive ? 1 : 0.4 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        />
        {/* Window cross */}
        <line x1="68" y1="55" x2="68" y2="67" stroke="hsl(var(--border))" strokeWidth="1" />
        <line x1="63" y1="61" x2="73" y2="61" stroke="hsl(var(--border))" strokeWidth="1" />
      </g>
      
      {/* Window light glow effect */}
      {isActive && (
        <>
          <motion.ellipse
            cx="32"
            cy="61"
            rx="10"
            ry="8"
            fill="hsl(48 100% 70%)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.ellipse
            cx="68"
            cy="61"
            rx="10"
            ry="8"
            fill="hsl(48 100% 70%)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          />
        </>
      )}

      {/* Variant-specific icons */}
      {getVariantIcon()}
    </motion.svg>
  );
};

// Timeline Node Component
interface TimelineNodeProps {
  index: number;
  isActive: boolean;
  isCompleted: boolean;
}

const TimelineNode: React.FC<TimelineNodeProps> = ({ index, isActive, isCompleted }) => {
  return (
    <motion.div
      className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 font-bold text-sm transition-all duration-300 ${
        isActive 
          ? 'bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/30' 
          : isCompleted 
            ? 'bg-primary/20 border-primary text-primary'
            : 'bg-card border-border text-muted-foreground'
      }`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.1, type: "spring" }}
    >
      {isCompleted && !isActive ? (
        <CheckCircle2 className="w-5 h-5" />
      ) : (
        index + 1
      )}
      
      {/* Active pulse ring */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary"
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 1.8, opacity: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
        />
      )}
    </motion.div>
  );
};

// Animated Counter Hook
const useCounter = (end: number, duration: number = 2000, startCounting: boolean = false) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!startCounting) return;
    
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [end, duration, startCounting]);
  
  return count;
};

// Counter Component
interface CounterMetricProps {
  value: number;
  suffix: string;
  label: string;
  description: string;
  isInView: boolean;
  isEstimate?: boolean;
}

const CounterMetric: React.FC<CounterMetricProps> = ({ value, suffix, label, description, isInView, isEstimate = false }) => {
  const count = useCounter(value, 2000, isInView);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative p-4 md:p-6 rounded-2xl bg-card border-2 border-border cursor-pointer overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4, borderColor: 'hsl(var(--primary))' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background glow on hover */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="relative z-10">
        <motion.div
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-1"
          initial={{ scale: 1 }}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {count}{suffix}{isEstimate && <span className="text-lg md:text-xl align-top text-muted-foreground/70">*</span>}
        </motion.div>
        
        <div className="text-sm md:text-base font-semibold text-foreground mb-1">
          {label}
        </div>
        
        <motion.div
          className="text-xs md:text-sm text-muted-foreground"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? 'auto' : 0 }}
          transition={{ duration: 0.2 }}
        >
          {description}
        </motion.div>
      </div>
    </motion.div>
  );
};

// Main Infographic Component
const InvestorInfographic: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Auto-advance steps for visual effect
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isInView]);

  const steps = [
    {
      id: 0,
      variant: 'invest' as const,
      title: 'Investi',
      description: 'Da €100',
      detail: 'Investimento minimo accessibile per tutti'
    },
    {
      id: 1,
      variant: 'acquire' as const,
      title: 'Acquistiamo',
      description: 'Immobili strategici',
      detail: 'Vicino alle università di Torino'
    },
    {
      id: 2,
      variant: 'manage' as const,
      title: 'Gestiamo',
      description: 'Tutto incluso',
      detail: 'Contratti, inquilini e manutenzione'
    },
    {
      id: 3,
      variant: 'earn' as const,
      title: 'Guadagni',
      description: '7-9% annuo',
      detail: 'Report trimestrali trasparenti'
    }
  ];

  const metrics = [
    { value: 8, suffix: '.34%', label: 'Rental Yield', description: 'Rendimento medio annuo', isEstimate: true },
    { value: 95, suffix: '%', label: 'Occupazione', description: 'Tasso di occupazione', isEstimate: true },
    { value: 90, suffix: 'k+', label: 'Studenti', description: 'Universitari a Torino', isEstimate: false },
    { value: 7, suffix: '', label: 'Università', description: 'Atenei nel territorio', isEstimate: false }
  ];

  return (
    <motion.div 
      ref={ref}
      className="w-full max-w-5xl mx-auto px-4 py-8 md:py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <motion.div 
        className="text-center mb-8 md:mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-primary">Come Funziona</span>
        </div>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-3">
          Il Modello Jungle Rent
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
          Investimenti immobiliari semplificati
        </p>
      </motion.div>

      {/* Desktop: Horizontal Flow with Premium Design */}
      <div className="hidden md:block mb-12">
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-border -translate-y-1/2 z-0 mx-16">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-primary to-primary/50 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          
          <div className="relative z-10 flex items-start justify-between">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className="flex flex-col items-center text-center w-1/4 px-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                {/* Card container */}
                <motion.div
                  className={`p-4 lg:p-6 rounded-2xl border-2 bg-card transition-all duration-300 cursor-pointer ${
                    activeStep === index 
                      ? 'border-primary shadow-lg shadow-primary/10' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setActiveStep(index)}
                  whileHover={{ y: -4 }}
                >
                  <PremiumHouse
                    isActive={activeStep === index}
                    variant={step.variant}
                    size="lg"
                  />
                </motion.div>
                
                {/* Step number badge */}
                <motion.div
                  className={`mt-4 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    activeStep === index 
                      ? 'bg-primary text-primary-foreground' 
                      : activeStep > index
                        ? 'bg-primary/20 text-primary'
                        : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {activeStep > index ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
                </motion.div>
                
                {/* Text content */}
                <h3 className={`mt-3 text-lg font-bold transition-colors ${
                  activeStep === index ? 'text-primary' : 'text-foreground'
                }`}>
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {step.description}
                </p>
                <motion.p
                  className="text-xs text-muted-foreground/70 mt-2 max-w-[140px]"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ 
                    opacity: activeStep === index ? 1 : 0, 
                    height: activeStep === index ? 'auto' : 0 
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {step.detail}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: Vertical Timeline with Cards */}
      <div className="md:hidden mb-10">
        <div className="relative pl-14">
          {/* Timeline line */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border">
            <motion.div
              className="w-full bg-primary rounded-full origin-top"
              initial={{ height: "0%" }}
              animate={{ height: `${((activeStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          
          {/* Steps */}
          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -20 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                {/* Timeline node */}
                <div className="absolute -left-14 top-4">
                  <TimelineNode 
                    index={index} 
                    isActive={activeStep === index}
                    isCompleted={activeStep > index}
                  />
                </div>
                
                {/* Step card */}
                <motion.div
                  className={`p-4 rounded-2xl border-2 bg-card transition-all duration-300 ${
                    activeStep === index 
                      ? 'border-primary shadow-lg shadow-primary/10' 
                      : 'border-border'
                  }`}
                  onClick={() => setActiveStep(index)}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start gap-4">
                    {/* House */}
                    <div className="flex-shrink-0">
                      <PremiumHouse
                        isActive={activeStep === index}
                        variant={step.variant}
                        size="md"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0 pt-1">
                      <h3 className={`text-lg font-bold transition-colors ${
                        activeStep === index ? 'text-primary' : 'text-foreground'
                      }`}>
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {step.description}
                      </p>
                      <motion.p
                        className="text-xs text-muted-foreground/70 mt-2"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ 
                          opacity: activeStep === index ? 1 : 0, 
                          height: activeStep === index ? 'auto' : 0 
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {step.detail}
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Metrics Grid with Animated Counters */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        {metrics.map((metric, index) => (
          <CounterMetric
            key={index}
            value={metric.value}
            suffix={metric.suffix}
            label={metric.label}
            description={metric.description}
            isInView={isInView}
            isEstimate={metric.isEstimate}
          />
        ))}
      </motion.div>

      {/* Estimate Disclaimer */}
      <motion.p
        className="text-center text-xs text-muted-foreground/60 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        *Valori stimati basati su analisi di mercato
      </motion.p>

      {/* Bottom CTA */}
      <motion.div 
        className="mt-6 md:mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
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
