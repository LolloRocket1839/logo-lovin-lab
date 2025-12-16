import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import investIllustration from "@/assets/invest-illustration.jpg";

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

// Step 2: ACQUISTIAMO - Premium University with connected houses
const AcquireIllustration = ({ isActive, prefersReducedMotion }: { isActive: boolean; prefersReducedMotion: boolean }) => (
  <motion.svg
    viewBox="0 0 300 250"
    className="w-full h-full max-w-[340px]"
    initial={{ opacity: 0 }}
    animate={isActive ? { opacity: 1 } : { opacity: 0.5 }}
    transition={{ duration: 0.4 }}
  >
    <PremiumDefs />
    
    {/* University Building - Politecnico inspired */}
    <motion.g
      initial={{ y: -15, opacity: 0 }}
      animate={isActive ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
      filter="url(#mediumShadow)"
    >
      {/* Main building base */}
      <rect x="80" y="30" width="140" height="60" rx="2" fill="url(#cardGradient)" stroke="hsl(var(--border))" strokeWidth="1.5" />
      
      {/* Central tower/cupola */}
      <rect x="130" y="8" width="40" height="22" rx="1" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
      <path d="M 130 8 Q 150 -5 170 8" fill="hsl(var(--primary))" opacity="0.8" />
      <circle cx="150" cy="5" r="4" fill="hsl(var(--primary))" />
      
      {/* Pediment */}
      <polygon points="150,18 195,32 105,32" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1" />
      
      {/* Columns with details */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x={95 + i * 25} y="45" width="10" height="45" fill="hsl(var(--background))" stroke="hsl(var(--border))" rx="1" />
          {/* Column capital */}
          <rect x={93 + i * 25} y="43" width="14" height="4" fill="hsl(var(--muted))" rx="1" />
          {/* Column base */}
          <rect x={93 + i * 25} y="88" width="14" height="4" fill="hsl(var(--muted))" rx="1" />
        </g>
      ))}
      
      {/* Windows on upper floor */}
      {[0, 1, 2].map((i) => (
        <rect key={`window-${i}`} x={100 + i * 40} y="35" width="20" height="8" fill="hsl(var(--background))" opacity="0.5" rx="1" />
      ))}
      
      {/* Graduation cap */}
      <motion.g
        initial={{ scale: 0, rotate: -20 }}
        animate={isActive ? { scale: 1, rotate: 0 } : {}}
        transition={{ delay: 0.3, type: "spring" }}
      >
        <rect x="138" y="-2" width="24" height="4" fill="hsl(var(--primary))" />
        <polygon points="150,-8 165,-2 135,-2" fill="hsl(var(--primary))" />
        <circle cx="165" cy="2" r="2.5" fill="hsl(var(--primary))" />
        <path d="M 165 2 Q 170 8 168 14" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" />
        {/* Tassel end */}
        <circle cx="168" cy="14" r="1.5" fill="hsl(var(--primary))" />
      </motion.g>
      
      {/* University label */}
      <rect x="115" y="75" width="70" height="14" rx="7" fill="hsl(var(--primary))" opacity="0.1" />
      <text x="150" y="85" textAnchor="middle" fill="hsl(var(--primary))" fontSize="8" fontWeight="bold">7 ATENEI TORINESI</text>
    </motion.g>

    {/* Pulsing radar effect from university */}
    {!prefersReducedMotion && isActive && (
      <motion.circle
        cx="150"
        cy="60"
        r="30"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="1"
        initial={{ r: 30, opacity: 0.6 }}
        animate={{ r: 80, opacity: 0 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      />
    )}

    {/* Connection lines with animated dots */}
    <motion.g initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}>
      {[
        { x1: 95, x2: 55, house: 0 },
        { x1: 150, x2: 150, house: 1 },
        { x1: 205, x2: 245, house: 2 }
      ].map((line, i) => (
        <g key={i}>
          <motion.line
            x1={line.x1} y1="95" x2={line.x2} y2="120"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeOpacity="0.4"
            strokeDasharray="6 4"
            initial={{ pathLength: 0 }}
            animate={isActive ? { pathLength: 1 } : {}}
            transition={{ delay: 0.4 + i * 0.15, duration: 0.4 }}
          />
          {/* Moving dot along line */}
          {!prefersReducedMotion && isActive && (
            <motion.circle
              r="3"
              fill="hsl(var(--primary))"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                cx: [line.x1, line.x2],
                cy: [95, 120]
              }}
              transition={{
                delay: 0.6 + i * 0.15,
                duration: 1,
                repeat: Infinity,
                repeatDelay: 2
              }}
            />
          )}
          {/* Pin icon at connection point */}
          <motion.g
            initial={{ scale: 0 }}
            animate={isActive ? { scale: 1 } : {}}
            transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
          >
            <circle cx={line.x1} cy="95" r="6" fill="hsl(var(--primary))" opacity="0.2" />
            <circle cx={line.x1} cy="95" r="3" fill="hsl(var(--primary))" />
          </motion.g>
        </g>
      ))}
    </motion.g>

    {/* Three premium houses with checkmarks */}
    {[
      { x: 20, delay: 0.5 },
      { x: 120, delay: 0.65 },
      { x: 215, delay: 0.8 }
    ].map((house, i) => (
      <motion.g key={i}>
        <PremiumHouse 
          x={house.x} 
          y={i === 1 ? 125 : 130} 
          variant={i === 1 ? "main" : "medium"} 
          scale={i === 1 ? 0.9 : 0.85}
          isActive={isActive} 
          delay={house.delay} 
        />
        
        {/* Premium checkmark badge */}
        <motion.g
          initial={{ scale: 0 }}
          animate={isActive ? { scale: 1 } : {}}
          transition={{ delay: house.delay + 0.3, type: "spring", stiffness: 300 }}
        >
          <circle 
            cx={house.x + (i === 1 ? 50 : 35)} 
            cy={i === 1 ? 130 : 135} 
            r="14" 
            fill="hsl(var(--primary))" 
            filter="url(#softShadow)"
          />
          <circle 
            cx={house.x + (i === 1 ? 50 : 35)} 
            cy={i === 1 ? 130 : 135} 
            r="12" 
            fill="none" 
            stroke="white" 
            strokeWidth="1" 
            opacity="0.3"
          />
          <motion.path
            d={`M ${house.x + (i === 1 ? 44 : 29)} ${i === 1 ? 130 : 135} L ${house.x + (i === 1 ? 48 : 33)} ${i === 1 ? 134 : 139} L ${house.x + (i === 1 ? 56 : 41)} ${i === 1 ? 126 : 131}`}
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isActive && !prefersReducedMotion ? { pathLength: 1 } : { pathLength: 1 }}
            transition={{ delay: house.delay + 0.45, duration: 0.25 }}
          />
        </motion.g>
      </motion.g>
    ))}

    {/* Label */}
    <motion.text
      x="150" y="225"
      textAnchor="middle"
      fill="hsl(var(--muted-foreground))"
      fontSize="11"
      initial={{ opacity: 0 }}
      animate={isActive ? { opacity: 1 } : {}}
      transition={{ delay: 1 }}
    >
      Acquistiamo immobili vicino agli atenei
    </motion.text>
  </motion.svg>
);

// Step 3: GESTIAMO - Premium split view with relaxed person
const ManageIllustration = ({ isActive, prefersReducedMotion }: { isActive: boolean; prefersReducedMotion: boolean }) => {
  const tasks = [
    { icon: "contract", label: "Contratti" },
    { icon: "users", label: "Inquilini" },
    { icon: "wrench", label: "Manutenzione" },
    { icon: "chart", label: "Fiscalità" }
  ];

  // Custom SVG icons for tasks
  const TaskIcon = ({ type, x, y }: { type: string; x: number; y: number }) => {
    switch (type) {
      case "contract":
        return (
          <g transform={`translate(${x}, ${y})`}>
            <rect x={0} y={0} width={12} height={15} rx={1} fill="none" stroke="hsl(var(--primary))" strokeWidth={1.5} />
            <line x1={3} y1={4} x2={9} y2={4} stroke="hsl(var(--primary))" strokeWidth={1} />
            <line x1={3} y1={7} x2={9} y2={7} stroke="hsl(var(--primary))" strokeWidth={1} />
            <line x1={3} y1={10} x2={7} y2={10} stroke="hsl(var(--primary))" strokeWidth={1} />
          </g>
        );
      case "users":
        return (
          <g transform={`translate(${x}, ${y})`}>
            <circle cx={6} cy={4} r={3} fill="none" stroke="hsl(var(--primary))" strokeWidth={1.5} />
            <path d="M 0 14 Q 0 8 6 8 Q 12 8 12 14" fill="none" stroke="hsl(var(--primary))" strokeWidth={1.5} />
          </g>
        );
      case "wrench":
        return (
          <g transform={`translate(${x}, ${y})`}>
            <path d="M 2 2 L 10 10 M 8 2 Q 12 4 10 10 L 2 10 Q 0 4 4 0 Z" fill="none" stroke="hsl(var(--primary))" strokeWidth={1.5} strokeLinecap="round" />
          </g>
        );
      case "chart":
        return (
          <g transform={`translate(${x}, ${y})`}>
            <rect x={0} y={8} width={3} height={6} fill="hsl(var(--primary))" rx={0.5} />
            <rect x={4.5} y={4} width={3} height={10} fill="hsl(var(--primary))" rx={0.5} />
            <rect x={9} y={0} width={3} height={14} fill="hsl(var(--primary))" rx={0.5} />
          </g>
        );
      default:
        return null;
    }
  };

  return (
    <motion.svg
      viewBox="0 0 300 250"
      className="w-full h-full max-w-[340px]"
      initial={{ opacity: 0 }}
      animate={isActive ? { opacity: 1 } : { opacity: 0.5 }}
      transition={{ duration: 0.4 }}
    >
      <PremiumDefs />
      
      {/* Elegant divider */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        <line x1="150" y1="20" x2="150" y2="190" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="8 6" />
        <circle cx="150" cy="20" r="3" fill="hsl(var(--border))" />
        <circle cx="150" cy="190" r="3" fill="hsl(var(--border))" />
      </motion.g>

      {/* LEFT SIDE: JUNGLE RENT Tasks */}
      <motion.g
        initial={{ opacity: 0, x: -15 }}
        animate={isActive ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.2 }}
      >
        {/* Header badge */}
        <rect x="10" y="18" width="120" height="26" rx="13" fill="hsl(var(--primary))" opacity="0.1" filter="url(#softShadow)" />
        <rect x="12" y="20" width="116" height="22" rx="11" fill="hsl(var(--primary))" opacity="0.05" />
        <text x="70" y="36" textAnchor="middle" fill="hsl(var(--primary))" fontSize="11" fontWeight="bold">JUNGLE RENT</text>
        
        {/* Task cards */}
        {tasks.map((task, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={isActive ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.1 }}
          >
            {/* Card background */}
            <rect 
              x="12" y={52 + i * 35} 
              width="118" height="30" 
              rx="8" 
              fill="hsl(var(--card))" 
              filter="url(#softShadow)"
            />
            <rect 
              x="12" y={52 + i * 35} 
              width="118" height="30" 
              rx="8" 
              fill="hsl(var(--primary))" 
              opacity="0.02"
            />
            
            {/* Icon */}
            <TaskIcon type={task.icon} x={22} y={59 + i * 35} />
            
            {/* Label */}
            <text x="50" y={71 + i * 35} fill="hsl(var(--foreground))" fontSize="11" fontWeight="500">{task.label}</text>
            
            {/* Animated checkmark circle */}
            <motion.g
              initial={{ scale: 0 }}
              animate={isActive ? { scale: 1 } : {}}
              transition={{ delay: 0.5 + i * 0.12, type: "spring", stiffness: 200 }}
            >
              <circle cx="115" cy={67 + i * 35} r="10" fill="hsl(var(--primary))" opacity="0.15" />
              <motion.path
                d={`M 109 ${67 + i * 35} L 113 ${71 + i * 35} L 121 ${63 + i * 35}`}
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={isActive && !prefersReducedMotion ? { pathLength: 1 } : { pathLength: 1 }}
                transition={{ delay: 0.65 + i * 0.12, duration: 0.2 }}
              />
            </motion.g>
          </motion.g>
        ))}
      </motion.g>

      {/* RIGHT SIDE: TU - Relaxing person */}
      <motion.g
        initial={{ opacity: 0, x: 15 }}
        animate={isActive ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.3 }}
      >
        {/* Header badge */}
        <rect x="170" y="18" width="70" height="26" rx="13" fill="hsl(var(--muted))" opacity="0.5" filter="url(#softShadow)" />
        <text x="205" y="36" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="11" fontWeight="bold">TU</text>
        
        {/* Premium Sofa Scene */}
        <motion.g
          initial={{ opacity: 0, y: 15 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {/* Floor/shadow */}
          <ellipse cx="210" cy="185" rx="55" ry="6" fill="hsl(var(--foreground))" opacity="0.05" />
          
          {/* Side table */}
          <g transform="translate(260, 125)">
            <rect x="0" y="35" width="24" height="3" rx="1.5" fill="hsl(var(--muted-foreground))" opacity="0.4" />
            <rect x="2" y="38" width="4" height="20" rx="1" fill="hsl(var(--muted-foreground))" opacity="0.3" />
            <rect x="18" y="38" width="4" height="20" rx="1" fill="hsl(var(--muted-foreground))" opacity="0.3" />
            
            {/* Cup with steam */}
            <rect x="5" y="23" width="14" height="14" rx="2" fill="hsl(var(--accent))" opacity="0.6" />
            <rect x="4" y="21" width="16" height="4" rx="2" fill="hsl(var(--accent))" opacity="0.7" />
            <path d="M 19 26 Q 25 26 25 32 Q 25 38 19 38" stroke="hsl(var(--accent))" fill="none" strokeWidth="2" opacity="0.5" />
            
            {/* Steam */}
            <motion.g
              animate={isActive && !prefersReducedMotion ? { 
                y: [0, -8, 0],
                opacity: [0.5, 0.2, 0.5]
              } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="M 9 17 Q 11 12 9 7" stroke="hsl(var(--muted-foreground))" fill="none" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
              <path d="M 14 18 Q 16 13 14 8" stroke="hsl(var(--muted-foreground))" fill="none" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
            </motion.g>
          </g>

          {/* Decorative plant */}
          <g transform="translate(155, 140)">
            <rect x="0" y="30" width="14" height="18" rx="2" fill="hsl(var(--muted))" opacity="0.4" />
            <ellipse cx="7" cy="25" rx="10" ry="12" fill="hsl(var(--primary))" opacity="0.3" />
            <ellipse cx="7" cy="22" rx="7" ry="8" fill="hsl(var(--primary))" opacity="0.4" />
          </g>
          
          {/* Premium curved sofa */}
          {/* Back rest */}
          <path 
            d="M 165 95 Q 165 70 195 70 L 250 70 Q 280 70 280 95 L 280 145 L 165 145 Z" 
            fill="url(#sofaGradient)"
          />
          {/* Seat cushion */}
          <rect x="160" y="145" width="125" height="35" rx="5" fill="hsl(var(--primary))" opacity="0.25" />
          {/* Left armrest */}
          <path 
            d="M 150 90 Q 150 70 162 70 L 168 70 L 168 180 L 162 180 Q 150 180 150 165 Z" 
            fill="hsl(var(--primary))" opacity="0.35"
          />
          {/* Right armrest */}
          <path 
            d="M 290 90 Q 290 70 278 70 L 272 70 L 272 180 L 278 180 Q 290 180 290 165 Z" 
            fill="hsl(var(--primary))" opacity="0.35"
          />
          {/* Cushion lines */}
          <rect x="172" y="150" width="40" height="6" rx="3" fill="hsl(var(--primary))" opacity="0.15" />
          <rect x="220" y="150" width="40" height="6" rx="3" fill="hsl(var(--primary))" opacity="0.15" />
          
          {/* Pillow */}
          <ellipse cx="175" cy="105" rx="18" ry="14" fill="hsl(var(--accent))" opacity="0.3" />
          
          {/* Person relaxing - clear silhouette */}
          <motion.g
            animate={isActive && !prefersReducedMotion ? { y: [0, -2, 0] } : {}}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Legs stretched */}
            <path d="M 200 140 Q 235 135 265 140 Q 275 142 275 148 L 200 148 Z" fill="hsl(var(--muted-foreground))" opacity="0.5" />
            <ellipse cx="270" cy="145" rx="8" ry="5" fill="hsl(var(--muted-foreground))" opacity="0.55" />
            
            {/* Body/torso */}
            <ellipse cx="195" cy="120" rx="18" ry="30" fill="hsl(var(--muted-foreground))" opacity="0.5" />
            
            {/* Arm behind head */}
            <path d="M 180 85 Q 165 80 160 95" stroke="hsl(var(--muted-foreground))" strokeWidth="8" strokeLinecap="round" opacity="0.45" />
            
            {/* Other arm on body */}
            <ellipse cx="210" cy="125" rx="12" ry="5" transform="rotate(-10, 210, 125)" fill="hsl(var(--muted-foreground))" opacity="0.45" />
            
            {/* Head */}
            <circle cx="188" cy="78" r="18" fill="hsl(var(--muted-foreground))" opacity="0.55" />
            
            {/* Hair */}
            <ellipse cx="188" cy="66" rx="15" ry="10" fill="hsl(var(--foreground))" opacity="0.3" />
            
            {/* Face - closed eyes showing relaxation */}
            <path d="M 180 77 Q 183 80 186 77" stroke="hsl(var(--background))" fill="none" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
            <path d="M 190 77 Q 193 80 196 77" stroke="hsl(var(--background))" fill="none" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
            
            {/* Relaxed smile */}
            <path d="M 183 86 Q 188 90 193 86" stroke="hsl(var(--background))" fill="none" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          </motion.g>
          
          {/* Floating Zzz */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={isActive && !prefersReducedMotion ? { 
              opacity: [0, 1, 1, 0],
              y: [0, -10, -20, -30],
              x: [0, 4, 8, 12]
            } : { opacity: 0.6 }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeOut" }}
          >
            <text x="208" y="55" fill="hsl(var(--primary))" fontSize="14" fontWeight="bold" opacity="0.7">Z</text>
            <text x="218" y="48" fill="hsl(var(--primary))" fontSize="11" fontWeight="bold" opacity="0.5">z</text>
            <text x="226" y="43" fill="hsl(var(--primary))" fontSize="8" fontWeight="bold" opacity="0.4">z</text>
          </motion.g>
        </motion.g>

        {/* Zero pensieri badge with glow */}
        <motion.g
          initial={{ scale: 0, y: 10 }}
          animate={isActive ? { scale: 1, y: 0 } : {}}
          transition={{ delay: 0.8, type: "spring", stiffness: 150 }}
        >
          {/* Glow effect */}
          {!prefersReducedMotion && isActive && (
            <motion.rect
              x="172" y="46"
              width="85" height="28"
              rx="14"
              fill="hsl(var(--primary))"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              filter="url(#glowEffect)"
            />
          )}
          <rect x="175" y="48" width="80" height="26" rx="13" fill="hsl(var(--primary))" filter="url(#softShadow)" />
          <text x="215" y="66" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">0 PENSIERI</text>
        </motion.g>
      </motion.g>

      {/* Label */}
      <motion.text
        x="150" y="225"
        textAnchor="middle"
        fill="hsl(var(--muted-foreground))"
        fontSize="11"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : {}}
        transition={{ delay: 1.1 }}
      >
        Gestiamo tutto noi, zero stress per te
      </motion.text>
    </motion.svg>
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
