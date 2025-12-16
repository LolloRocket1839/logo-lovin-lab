import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import investIllustration from "@/assets/invest-illustration.jpg";
import acquireIllustration from "@/assets/journey-step-acquire.jpg";
import manageIllustration from "@/assets/journey-step-manage.jpg";

interface StepIllustrationProps {
  step: "invest" | "acquire" | "manage" | "earn";
  isActive: boolean;
}

export const StepIllustration = ({ step, isActive }: StepIllustrationProps) => {
  const prefersReducedMotion = useReducedMotion();

  const illustrations = {
    invest: <InvestIllustration isActive={isActive} prefersReducedMotion={prefersReducedMotion} />,
    acquire: <AcquireIllustration isActive={isActive} prefersReducedMotion={prefersReducedMotion} />,
    manage: <ManageIllustration isActive={isActive} prefersReducedMotion={prefersReducedMotion} />,
    earn: <EarnIllustration isActive={isActive} prefersReducedMotion={prefersReducedMotion} />,
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      {illustrations[step]}
    </div>
  );
};

// Shared SVG Definitions for Premium Effects
const PremiumDefs = () => (
  <defs>
    {/* Gradients */}
    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="hsl(45, 93%, 58%)" />
      <stop offset="50%" stopColor="hsl(42, 87%, 55%)" />
      <stop offset="100%" stopColor="hsl(38, 90%, 50%)" />
    </linearGradient>
    <linearGradient id="goldShine" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="hsl(45, 95%, 75%)" />
      <stop offset="100%" stopColor="hsl(42, 90%, 60%)" />
    </linearGradient>
    <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="1" />
      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.7" />
    </linearGradient>
    <linearGradient id="cardGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="hsl(var(--card))" />
      <stop offset="100%" stopColor="hsl(var(--muted))" stopOpacity="0.3" />
    </linearGradient>
    <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="hsl(var(--background))" stopOpacity="0.9" />
      <stop offset="100%" stopColor="hsl(var(--background))" stopOpacity="0.6" />
    </linearGradient>
    <linearGradient id="screenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="hsl(220, 15%, 20%)" />
      <stop offset="100%" stopColor="hsl(220, 15%, 12%)" />
    </linearGradient>
    <linearGradient id="roofGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="hsl(var(--primary))" />
      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.75" />
    </linearGradient>
    <linearGradient id="sofaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.35" />
      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
    </linearGradient>
    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="hsl(var(--primary))" />
      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
    </linearGradient>
    <linearGradient id="trendGradient" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="hsl(var(--chart-4))" stopOpacity="0.1" />
      <stop offset="100%" stopColor="hsl(var(--chart-4))" stopOpacity="0.4" />
    </linearGradient>
    
    {/* Shadows */}
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
    </filter>
    <filter id="mediumShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.2" />
    </filter>
    <filter id="glowEffect" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <filter id="coinShine" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="1" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
);

// Premium Coin Component
const PremiumCoin = ({ cx, cy, r, delay = 0, isActive, prefersReducedMotion }: { 
  cx: number; cy: number; r: number; delay?: number; isActive: boolean; prefersReducedMotion: boolean 
}) => (
  <motion.g
    initial={{ scale: 0, opacity: 0 }}
    animate={isActive ? { scale: 1, opacity: 1 } : {}}
    transition={{ delay, type: "spring", stiffness: 200 }}
  >
    {/* Coin base with gradient */}
    <circle cx={cx} cy={cy} r={r} fill="url(#goldGradient)" filter="url(#coinShine)" />
    {/* Inner ring */}
    <circle cx={cx} cy={cy} r={r * 0.85} fill="none" stroke="hsl(38, 90%, 45%)" strokeWidth="1" opacity="0.5" />
    {/* Highlight arc */}
    <path 
      d={`M ${cx - r * 0.5} ${cy - r * 0.3} Q ${cx} ${cy - r * 0.8} ${cx + r * 0.5} ${cy - r * 0.3}`}
      fill="none" 
      stroke="url(#goldShine)" 
      strokeWidth="2" 
      strokeLinecap="round"
      opacity="0.7"
    />
    {/* Euro symbol */}
    <text 
      x={cx} 
      y={cy + r * 0.35} 
      textAnchor="middle" 
      fontSize={r * 1.2} 
      fontWeight="bold"
      fill="hsl(38, 80%, 25%)"
    >€</text>
    {/* Sparkle animation */}
    {!prefersReducedMotion && isActive && (
      <motion.circle
        cx={cx + r * 0.4}
        cy={cy - r * 0.4}
        r="2"
        fill="white"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: [0, 1, 0],
          scale: [0, 1, 0]
        }}
        transition={{ 
          delay: delay + 0.5, 
          duration: 1.5, 
          repeat: Infinity,
          repeatDelay: 2
        }}
      />
    )}
  </motion.g>
);

// Premium House Component
const PremiumHouse = ({ x, y, scale = 1, variant = "main", delay = 0, isActive }: {
  x: number; y: number; scale?: number; variant?: "main" | "small" | "medium"; delay?: number; isActive: boolean
}) => {
  const baseWidth = variant === "main" ? 55 : variant === "medium" ? 40 : 32;
  const baseHeight = variant === "main" ? 45 : variant === "medium" ? 35 : 28;
  const roofHeight = variant === "main" ? 22 : variant === "medium" ? 16 : 12;
  
  return (
    <motion.g
      transform={`translate(${x}, ${y}) scale(${scale})`}
      initial={{ opacity: 0, y: 10 }}
      animate={isActive ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.4 }}
      filter="url(#softShadow)"
    >
      {/* Roof with tiles effect */}
      <polygon 
        points={`${baseWidth/2},0 ${baseWidth + 5},${roofHeight} -5,${roofHeight}`} 
        fill="url(#roofGradient)"
      />
      {/* Roof detail lines (tile effect) */}
      {variant === "main" && (
        <>
          <line x1="10" y1={roofHeight - 4} x2={baseWidth - 10} y2={roofHeight - 4} stroke="hsl(var(--primary))" strokeOpacity="0.3" strokeWidth="1" />
          <line x1="15" y1={roofHeight - 8} x2={baseWidth - 15} y2={roofHeight - 8} stroke="hsl(var(--primary))" strokeOpacity="0.3" strokeWidth="1" />
        </>
      )}
      
      {/* Main building */}
      <rect x="0" y={roofHeight} width={baseWidth} height={baseHeight} fill="url(#cardGradient)" stroke="hsl(var(--border))" strokeWidth="1.5" rx="1" />
      
      {/* Windows with shutters (main house only) */}
      {variant === "main" ? (
        <>
          {/* Left window */}
          <rect x="6" y={roofHeight + 8} width="14" height="14" fill="hsl(var(--background))" stroke="hsl(var(--border))" rx="1" />
          <line x1="13" y1={roofHeight + 8} x2="13" y2={roofHeight + 22} stroke="hsl(var(--border))" strokeWidth="0.5" />
          <line x1="6" y1={roofHeight + 15} x2="20" y2={roofHeight + 15} stroke="hsl(var(--border))" strokeWidth="0.5" />
          {/* Shutters left */}
          <rect x="2" y={roofHeight + 7} width="3" height="16" fill="hsl(var(--primary))" opacity="0.5" rx="0.5" />
          <rect x="21" y={roofHeight + 7} width="3" height="16" fill="hsl(var(--primary))" opacity="0.5" rx="0.5" />
          
          {/* Right window */}
          <rect x="35" y={roofHeight + 8} width="14" height="14" fill="hsl(var(--background))" stroke="hsl(var(--border))" rx="1" />
          <line x1="42" y1={roofHeight + 8} x2="42" y2={roofHeight + 22} stroke="hsl(var(--border))" strokeWidth="0.5" />
          <line x1="35" y1={roofHeight + 15} x2="49" y2={roofHeight + 15} stroke="hsl(var(--border))" strokeWidth="0.5" />
          {/* Shutters right */}
          <rect x="31" y={roofHeight + 7} width="3" height="16" fill="hsl(var(--primary))" opacity="0.5" rx="0.5" />
          <rect x="50" y={roofHeight + 7} width="3" height="16" fill="hsl(var(--primary))" opacity="0.5" rx="0.5" />
          
          {/* Door */}
          <rect x="19" y={roofHeight + 25} width="17" height="20" fill="hsl(var(--primary))" opacity="0.2" rx="1" />
          <rect x="20" y={roofHeight + 26} width="15" height="19" fill="hsl(var(--primary))" opacity="0.15" rx="1" />
          {/* Door handle */}
          <circle cx="32" cy={roofHeight + 36} r="1.5" fill="hsl(var(--primary))" opacity="0.6" />
        </>
      ) : (
        <>
          {/* Simple window for smaller houses */}
          <rect x={(baseWidth - 12) / 2} y={roofHeight + 6} width="12" height="10" fill="hsl(var(--background))" stroke="hsl(var(--border))" rx="1" />
          {/* Simple door */}
          <rect x={(baseWidth - 10) / 2} y={roofHeight + baseHeight - 15} width="10" height="15" fill="hsl(var(--primary))" opacity="0.2" rx="1" />
        </>
      )}
      
      {/* Chimney for main house */}
      {variant === "main" && (
        <rect x={baseWidth - 12} y="-8" width="8" height="16" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1" rx="1" />
      )}
    </motion.g>
  );
};

// Step 1: INVESTI - Premium Image Illustration
const InvestIllustration = ({ isActive, prefersReducedMotion }: { isActive: boolean; prefersReducedMotion: boolean }) => (
  <motion.div
    className="w-full h-full flex flex-col items-center justify-center"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0.5, scale: 0.95 }}
    transition={{ duration: 0.4 }}
  >
    <motion.img
      src={investIllustration}
      alt="Investi da €100 in immobili - smartphone con monete che fluiscono verso case"
      className="w-full max-w-[400px] h-auto rounded-xl"
      initial={{ y: 10 }}
      animate={isActive ? { y: 0 } : {}}
      transition={{ duration: 0.5 }}
    />
    <motion.p
      className="mt-4 text-muted-foreground text-sm text-center"
      initial={{ opacity: 0 }}
      animate={isActive ? { opacity: 1 } : {}}
      transition={{ delay: 0.3 }}
    >
      Tu investi da €100, noi facciamo il resto
    </motion.p>
  </motion.div>
);

// Step 2: ACQUISTIAMO - Premium image illustration
const AcquireIllustration = ({ isActive, prefersReducedMotion }: { isActive: boolean; prefersReducedMotion: boolean }) => {
  return (
    <motion.div
      className="w-full h-full flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0.5, scale: 0.95 }}
      transition={{ duration: 0.4 }}
    >
      <img 
        src={acquireIllustration} 
        alt="Acquistiamo immobili vicino ai 7 atenei torinesi" 
        className="w-full h-full object-contain max-w-[500px] rounded-xl"
      />
    </motion.div>
  );
};

// Step 3: GESTIAMO - Premium image illustration
const ManageIllustration = ({ isActive, prefersReducedMotion }: { isActive: boolean; prefersReducedMotion: boolean }) => {
  return (
    <motion.div
      className="w-full h-full flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0.5, scale: 0.95 }}
      transition={{ duration: 0.4 }}
    >
      <img 
        src={manageIllustration} 
        alt="Jungle Rent gestisce tutto - Tu riposi" 
        className="w-full h-full object-contain max-w-[500px] rounded-xl"
      />
    </motion.div>
  );
};

// Step 4: GUADAGNI - Premium dashboard with timeline
const EarnIllustration = ({ isActive, prefersReducedMotion }: { isActive: boolean; prefersReducedMotion: boolean }) => {
  const quarters = ["Q1", "Q2", "Q3", "Q4"];
  
  return (
    <motion.svg
      viewBox="0 0 300 250"
      className="w-full h-full max-w-[340px]"
      initial={{ opacity: 0 }}
      animate={isActive ? { opacity: 1 } : { opacity: 0.5 }}
      transition={{ duration: 0.4 }}
    >
      <PremiumDefs />
      
      {/* Timeline with premium styling */}
      <motion.g>
        {/* Base line with gradient */}
        <motion.line
          x1="25" y1="50" x2="275" y2="50"
          stroke="hsl(var(--border))"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={isActive ? { pathLength: 1 } : {}}
          transition={{ duration: 0.5 }}
        />
        
        {/* Progress fill */}
        <motion.line
          x1="25" y1="50" x2="275" y2="50"
          stroke="hsl(var(--primary))"
          strokeWidth="3"
          strokeLinecap="round"
          strokeOpacity="0.3"
          initial={{ pathLength: 0 }}
          animate={isActive ? { pathLength: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3 }}
        />
      </motion.g>

      {/* Quarter markers with coins */}
      {quarters.map((q, i) => {
        const x = 45 + i * 65;
        const coinSize = 10 + i * 2; // Growing coins
        
        return (
          <motion.g key={q}>
            {/* Quarter circle with gradient */}
            <motion.g
              initial={{ scale: 0 }}
              animate={isActive ? { scale: 1 } : {}}
              transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 200 }}
            >
              <circle cx={x} cy="50" r="20" fill="hsl(var(--card))" filter="url(#softShadow)" />
              <circle cx={x} cy="50" r="18" fill="hsl(var(--primary))" opacity="0.1" />
              <circle cx={x} cy="50" r="16" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
              <text x={x} y="55" textAnchor="middle" fill="hsl(var(--primary))" fontSize="12" fontWeight="bold">{q}</text>
            </motion.g>
            
            {/* Dropping premium coin */}
            <motion.g
              initial={{ y: 0, opacity: 0, scale: 0.5 }}
              animate={isActive && !prefersReducedMotion ? {
                y: [0, 35],
                opacity: [0, 1, 1],
                scale: [0.5, 1]
              } : { y: 35, opacity: 0.8, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.12, duration: 0.4, ease: "easeIn" }}
            >
              <PremiumCoin 
                cx={x} 
                cy={75} 
                r={coinSize} 
                delay={0}
                isActive={isActive}
                prefersReducedMotion={prefersReducedMotion}
              />
            </motion.g>
            
            {/* Dashed arrow to dashboard */}
            <motion.path
              d={`M ${x} ${90 + i * 2} L ${x} 118`}
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeOpacity="0.3"
              strokeDasharray="5 4"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={isActive ? { pathLength: 1 } : {}}
              transition={{ delay: 0.7 + i * 0.1, duration: 0.3 }}
            />
          </motion.g>
        );
      })}

      {/* Premium Dashboard */}
      <motion.g
        initial={{ y: 20, opacity: 0 }}
        animate={isActive ? { y: 0, opacity: 1 } : {}}
        transition={{ delay: 0.8, duration: 0.4 }}
      >
        {/* Dashboard container */}
        <rect x="30" y="125" width="240" height="75" rx="12" 
          fill="hsl(var(--card))" filter="url(#mediumShadow)" />
        
        {/* Header bar */}
        <rect x="30" y="125" width="240" height="24" rx="12" 
          fill="hsl(var(--muted))" />
        <rect x="30" y="137" width="240" height="12" 
          fill="hsl(var(--muted))" />
        
        {/* Window controls */}
        <circle cx="44" cy="137" r="4" fill="hsl(var(--destructive))" opacity="0.6" />
        <circle cx="56" cy="137" r="4" fill="hsl(45, 90%, 50%)" opacity="0.6" />
        <circle cx="68" cy="137" r="4" fill="hsl(var(--primary))" opacity="0.6" />
        
        {/* Dashboard title */}
        <text x="150" y="141" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="10" fontWeight="bold">
          💰 IL TUO DASHBOARD
        </text>
        
        {/* Chart area background */}
        <rect x="40" y="155" width="160" height="38" rx="4" fill="hsl(var(--background))" opacity="0.5" />
        
        {/* Area chart fill */}
        <motion.path
          d="M 45 190 L 60 182 L 90 175 L 120 168 L 150 158 L 180 152 L 195 148 L 195 193 L 45 193 Z"
          fill="url(#trendGradient)"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.4 }}
        />
        
        {/* Growing bars with gradient */}
        {[0, 1, 2, 3].map((i) => (
          <motion.rect
            key={i}
            x={50 + i * 38}
            y={190 - (20 + i * 12)}
            width="28"
            height={20 + i * 12}
            rx="4"
            fill="url(#chartGradient)"
            initial={{ scaleY: 0 }}
            animate={isActive ? { scaleY: 1 } : {}}
            transition={{ delay: 1 + i * 0.08, duration: 0.3 }}
            style={{ transformOrigin: "bottom" }}
          />
        ))}
        
        {/* Trend line */}
        <motion.path
          d="M 64 180 Q 100 170 135 162 Q 170 154 188 148"
          stroke="hsl(var(--chart-4))"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={isActive && !prefersReducedMotion ? { pathLength: 1 } : { pathLength: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
        />
        
        {/* Trend arrow */}
        <motion.polygon
          points="185,143 195,148 185,153"
          fill="hsl(var(--chart-4))"
          initial={{ opacity: 0, x: -10 }}
          animate={isActive ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 1.7 }}
        />
        
        {/* Stats panel */}
        <rect x="210" y="155" width="55" height="38" rx="6" fill="hsl(var(--primary))" opacity="0.1" />
        <text x="237" y="170" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="8">RENDITA</text>
        <motion.text 
          x="237" 
          y="186" 
          textAnchor="middle" 
          fill="hsl(var(--primary))" 
          fontSize="14" 
          fontWeight="bold"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
        >
          +7.6%
        </motion.text>
      </motion.g>

      {/* Label */}
      <motion.text
        x="150" y="225"
        textAnchor="middle"
        fill="hsl(var(--muted-foreground))"
        fontSize="11"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : {}}
        transition={{ delay: 1.6 }}
      >
        Rendite trimestrali con report trasparenti
      </motion.text>
    </motion.svg>
  );
};
