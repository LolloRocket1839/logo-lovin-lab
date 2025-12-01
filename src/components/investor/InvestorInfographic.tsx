import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, CheckCircle2 } from 'lucide-react';

// SVG House Component with lights effect
interface HouseProps {
  isActive: boolean;
  variant: 'invest' | 'acquire' | 'manage' | 'earn';
  onClick?: () => void;
}

const House: React.FC<HouseProps> = ({ isActive, variant, onClick }) => {
  const getHouseStyle = () => {
    switch (variant) {
      case 'invest':
        return { hasCoins: true, hasGear: false, hasChart: false };
      case 'acquire':
        return { hasCoins: false, hasGear: false, hasChart: false };
      case 'manage':
        return { hasCoins: false, hasGear: true, hasChart: false };
      case 'earn':
        return { hasCoins: false, hasGear: false, hasChart: true };
      default:
        return { hasCoins: false, hasGear: false, hasChart: false };
    }
  };

  const style = getHouseStyle();

  return (
    <motion.svg
      viewBox="0 0 80 80"
      className="w-16 h-16 md:w-20 md:h-20 cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* House Body */}
      <motion.rect
        x="15"
        y="35"
        width="50"
        height="40"
        rx="2"
        fill="hsl(var(--card))"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: isActive ? 1 : 0.7 }}
      />
      
      {/* Roof */}
      <motion.path
        d="M10 38 L40 12 L70 38"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.path
        d="M10 38 L40 12 L70 38 Z"
        fill="hsl(var(--primary))"
        initial={{ opacity: 0.8 }}
        animate={{ opacity: isActive ? 1 : 0.8 }}
      />
      
      {/* Chimney */}
      <rect x="52" y="18" width="8" height="14" fill="hsl(var(--primary))" rx="1" />
      
      {/* Door */}
      <rect
        x="33"
        y="52"
        width="14"
        height="23"
        rx="1"
        fill="hsl(var(--primary))"
        opacity={0.6}
      />
      <circle cx="44" cy="64" r="1.5" fill="hsl(var(--primary-foreground))" />
      
      {/* Windows with light effect */}
      <motion.rect
        x="20"
        y="44"
        width="10"
        height="10"
        rx="1"
        fill={isActive ? "hsl(48 100% 70%)" : "hsl(var(--muted))"}
        initial={{ opacity: 0.5 }}
        animate={{ 
          opacity: isActive ? 1 : 0.5,
          fill: isActive ? "hsl(48 100% 70%)" : "hsl(var(--muted))"
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.rect
        x="50"
        y="44"
        width="10"
        height="10"
        rx="1"
        fill={isActive ? "hsl(48 100% 70%)" : "hsl(var(--muted))"}
        initial={{ opacity: 0.5 }}
        animate={{ 
          opacity: isActive ? 1 : 0.5,
          fill: isActive ? "hsl(48 100% 70%)" : "hsl(var(--muted))"
        }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />
      
      {/* Light glow effect */}
      {isActive && (
        <>
          <motion.ellipse
            cx="25"
            cy="49"
            rx="8"
            ry="6"
            fill="hsl(48 100% 70%)"
            opacity={0.3}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.ellipse
            cx="55"
            cy="49"
            rx="8"
            ry="6"
            fill="hsl(48 100% 70%)"
            opacity={0.3}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </>
      )}

      {/* Variant-specific icons */}
      {style.hasCoins && (
        <g transform="translate(32, 2)">
          <motion.circle
            cx="8"
            cy="8"
            r="7"
            fill="hsl(48 90% 55%)"
            stroke="hsl(40 90% 45%)"
            strokeWidth="1.5"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          />
          <text x="8" y="11" fontSize="8" fill="hsl(40 90% 35%)" textAnchor="middle" fontWeight="bold">€</text>
        </g>
      )}

      {style.hasGear && (
        <motion.g
          transform="translate(32, 2)"
          initial={{ rotate: 0, opacity: 0 }}
          animate={{ rotate: isActive ? 360 : 0, opacity: 1 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="8" cy="8" r="5" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
          <circle cx="8" cy="8" r="2" fill="hsl(var(--primary))" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <rect
              key={i}
              x="6.5"
              y="1"
              width="3"
              height="3"
              fill="hsl(var(--primary))"
              transform={`rotate(${angle} 8 8)`}
            />
          ))}
        </motion.g>
      )}

      {style.hasChart && (
        <g transform="translate(28, 0)">
          <motion.path
            d="M4 14 L10 8 L16 10 L22 4"
            fill="none"
            stroke="hsl(142 70% 45%)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
          <motion.circle
            cx="22"
            cy="4"
            r="3"
            fill="hsl(142 70% 45%)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2 }}
          />
        </g>
      )}
    </motion.svg>
  );
};

// Animated Arrow Component
interface AnimatedArrowProps {
  direction: 'horizontal' | 'vertical';
  isActive: boolean;
}

const AnimatedArrow: React.FC<AnimatedArrowProps> = ({ direction, isActive }) => {
  const isHorizontal = direction === 'horizontal';
  
  return (
    <svg
      className={isHorizontal ? "w-12 h-8 md:w-16 md:h-10" : "w-8 h-12 md:w-10 md:h-16"}
      viewBox={isHorizontal ? "0 0 60 30" : "0 0 30 60"}
    >
      <defs>
        <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
          <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      
      {isHorizontal ? (
        <>
          {/* Horizontal arrow line with flow animation */}
          <motion.path
            d="M5 15 L45 15"
            fill="none"
            stroke="url(#arrowGradient)"
            strokeWidth="2"
            strokeDasharray="4 4"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: isActive ? -20 : 0 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          {/* Arrow head */}
          <motion.path
            d="M40 8 L52 15 L40 22"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: isActive ? 1 : 0.5 }}
          />
        </>
      ) : (
        <>
          {/* Vertical arrow line with flow animation */}
          <motion.path
            d="M15 5 L15 45"
            fill="none"
            stroke="url(#arrowGradient)"
            strokeWidth="2"
            strokeDasharray="4 4"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: isActive ? -20 : 0 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          {/* Arrow head */}
          <motion.path
            d="M8 40 L15 52 L22 40"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: isActive ? 1 : 0.5 }}
          />
        </>
      )}
    </svg>
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
      description: 'Da €5.000',
      detail: 'Investimento minimo accessibile'
    },
    {
      id: 1,
      variant: 'acquire' as const,
      title: 'Acquistiamo',
      description: 'Immobili strategici',
      detail: 'Vicino alle università'
    },
    {
      id: 2,
      variant: 'manage' as const,
      title: 'Gestiamo',
      description: 'Tutto incluso',
      detail: 'Contratti e manutenzione'
    },
    {
      id: 3,
      variant: 'earn' as const,
      title: 'Guadagni',
      description: '7-9% annuo',
      detail: 'Report trimestrali'
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

      {/* Desktop: Horizontal Flow */}
      <div className="hidden md:block mb-12">
        <div className="flex items-center justify-center gap-2 lg:gap-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              {/* Step */}
              <motion.div
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <House
                  isActive={activeStep === index}
                  variant={step.variant}
                  onClick={() => setActiveStep(index)}
                />
                <motion.div
                  className={`mt-3 px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                    activeStep === index 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {index + 1}
                </motion.div>
                <h3 className={`mt-2 text-lg font-bold transition-colors ${
                  activeStep === index ? 'text-primary' : 'text-foreground'
                }`}>
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground max-w-[120px]">
                  {step.description}
                </p>
                <motion.p
                  className="text-xs text-muted-foreground/70 max-w-[120px] mt-1"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ 
                    opacity: activeStep === index ? 1 : 0, 
                    height: activeStep === index ? 'auto' : 0 
                  }}
                >
                  {step.detail}
                </motion.p>
              </motion.div>

              {/* Arrow between steps */}
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.1 }}
                >
                  <AnimatedArrow 
                    direction="horizontal" 
                    isActive={activeStep >= index} 
                  />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Mobile: Vertical Flow */}
      <div className="md:hidden mb-10">
        <div className="flex flex-col items-center gap-2">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              {/* Step */}
              <motion.div
                className="flex items-center gap-4 w-full max-w-xs"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -20 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <House
                  isActive={activeStep === index}
                  variant={step.variant}
                  onClick={() => setActiveStep(index)}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold transition-colors ${
                      activeStep === index 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {index + 1}
                    </span>
                    <h3 className={`text-base font-bold transition-colors ${
                      activeStep === index ? 'text-primary' : 'text-foreground'
                    }`}>
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                  <motion.p
                    className="text-xs text-muted-foreground/70 mt-0.5"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: activeStep === index ? 1 : 0, 
                      height: activeStep === index ? 'auto' : 0 
                    }}
                  >
                    {step.detail}
                  </motion.p>
                </div>
              </motion.div>

              {/* Arrow between steps */}
              {index < steps.length - 1 && (
                <motion.div
                  className="my-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isInView ? 1 : 0 }}
                  transition={{ duration: 0.3, delay: index * 0.15 + 0.1 }}
                >
                  <AnimatedArrow 
                    direction="vertical" 
                    isActive={activeStep >= index} 
                  />
                </motion.div>
              )}
            </React.Fragment>
          ))}
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
