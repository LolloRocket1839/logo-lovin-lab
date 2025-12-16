import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

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

// Invest - Animated coin with euro symbol
const InvestIllustration = ({ isActive, prefersReducedMotion }: { isActive: boolean; prefersReducedMotion: boolean }) => (
  <motion.svg
    viewBox="0 0 200 200"
    className="w-48 h-48 md:w-64 md:h-64"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0.5, scale: 0.9 }}
    transition={{ duration: 0.5 }}
  >
    {/* Coin base */}
    <motion.ellipse
      cx="100"
      cy="110"
      rx="70"
      ry="20"
      fill="hsl(var(--primary) / 0.2)"
      animate={isActive && !prefersReducedMotion ? { ry: [20, 25, 20] } : {}}
      transition={{ duration: 2, repeat: Infinity }}
    />
    
    {/* Coin body */}
    <motion.circle
      cx="100"
      cy="90"
      r="60"
      fill="hsl(var(--primary))"
      stroke="hsl(var(--primary-foreground) / 0.3)"
      strokeWidth="3"
      animate={isActive && !prefersReducedMotion ? { y: [0, -5, 0] } : {}}
      transition={{ duration: 2, repeat: Infinity }}
    />
    
    {/* Inner circle */}
    <motion.circle
      cx="100"
      cy="90"
      r="48"
      fill="none"
      stroke="hsl(var(--primary-foreground) / 0.3)"
      strokeWidth="2"
      animate={isActive && !prefersReducedMotion ? { y: [0, -5, 0] } : {}}
      transition={{ duration: 2, repeat: Infinity }}
    />
    
    {/* Euro symbol */}
    <motion.text
      x="100"
      y="100"
      textAnchor="middle"
      className="text-5xl font-bold fill-primary-foreground"
      animate={isActive && !prefersReducedMotion ? { y: [0, -5, 0] } : {}}
      transition={{ duration: 2, repeat: Infinity }}
    >
      €
    </motion.text>

    {/* Small floating coins */}
    {[1, 2, 3].map((i) => (
      <motion.circle
        key={i}
        cx={40 + i * 40}
        cy={160}
        r="12"
        fill="hsl(var(--primary) / 0.5)"
        initial={{ y: 0, opacity: 0 }}
        animate={isActive && !prefersReducedMotion ? { 
          y: [-10, -30, -10], 
          opacity: [0.3, 0.7, 0.3] 
        } : {}}
        transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
      />
    ))}
  </motion.svg>
);

// Acquire - Key and building
const AcquireIllustration = ({ isActive, prefersReducedMotion }: { isActive: boolean; prefersReducedMotion: boolean }) => (
  <motion.svg
    viewBox="0 0 200 200"
    className="w-48 h-48 md:w-64 md:h-64"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0.5, scale: 0.9 }}
    transition={{ duration: 0.5 }}
  >
    {/* Building */}
    <motion.rect
      x="80"
      y="60"
      width="80"
      height="100"
      rx="4"
      fill="hsl(var(--muted))"
      stroke="hsl(var(--border))"
      strokeWidth="2"
    />
    
    {/* Windows */}
    {[0, 1, 2].map((row) => (
      [0, 1].map((col) => (
        <motion.rect
          key={`${row}-${col}`}
          x={95 + col * 30}
          y={75 + row * 28}
          width="18"
          height="18"
          rx="2"
          fill="hsl(var(--primary) / 0.3)"
          animate={isActive && !prefersReducedMotion ? { 
            fill: ["hsl(var(--primary) / 0.3)", "hsl(var(--primary) / 0.6)", "hsl(var(--primary) / 0.3)"] 
          } : {}}
          transition={{ duration: 2, delay: (row + col) * 0.2, repeat: Infinity }}
        />
      ))
    ))}
    
    {/* Door */}
    <rect x="105" y="135" width="30" height="25" rx="2" fill="hsl(var(--primary))" />
    
    {/* Key */}
    <motion.g
      animate={isActive && !prefersReducedMotion ? { 
        x: [0, 10, 0],
        rotate: [0, -15, 0]
      } : {}}
      transition={{ duration: 2, repeat: Infinity }}
      style={{ transformOrigin: "50px 100px" }}
    >
      {/* Key head */}
      <circle cx="50" cy="100" r="18" fill="hsl(var(--chart-2))" stroke="hsl(var(--chart-2))" strokeWidth="2" />
      <circle cx="50" cy="100" r="8" fill="hsl(var(--background))" />
      
      {/* Key shaft */}
      <rect x="60" y="96" width="35" height="8" rx="2" fill="hsl(var(--chart-2))" />
      
      {/* Key teeth */}
      <rect x="85" y="104" width="5" height="8" fill="hsl(var(--chart-2))" />
      <rect x="78" y="104" width="5" height="6" fill="hsl(var(--chart-2))" />
    </motion.g>
    
    {/* University cap */}
    <motion.g
      animate={isActive && !prefersReducedMotion ? { y: [0, -3, 0] } : {}}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <polygon points="120,50 95,65 145,65" fill="hsl(var(--foreground))" />
      <rect x="100" y="55" width="40" height="8" fill="hsl(var(--foreground))" />
    </motion.g>
  </motion.svg>
);

// Manage - Dashboard with checklist
const ManageIllustration = ({ isActive, prefersReducedMotion }: { isActive: boolean; prefersReducedMotion: boolean }) => (
  <motion.svg
    viewBox="0 0 200 200"
    className="w-48 h-48 md:w-64 md:h-64"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0.5, scale: 0.9 }}
    transition={{ duration: 0.5 }}
  >
    {/* Clipboard */}
    <rect x="40" y="30" width="120" height="150" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="2" />
    
    {/* Clipboard clip */}
    <rect x="75" y="22" width="50" height="20" rx="4" fill="hsl(var(--muted))" />
    <rect x="85" y="18" width="30" height="12" rx="6" fill="hsl(var(--chart-3))" />
    
    {/* Checklist items */}
    {[0, 1, 2, 3].map((i) => (
      <motion.g key={i}>
        {/* Checkbox */}
        <rect 
          x="55" 
          y={60 + i * 30} 
          width="18" 
          height="18" 
          rx="3" 
          fill="hsl(var(--background))"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
        />
        
        {/* Checkmark */}
        <motion.path
          d={`M 59 ${69 + i * 30} l 4 4 l 7 -8`}
          stroke="hsl(var(--primary))"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={isActive && !prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.4, delay: i * 0.3 + 0.5 }}
        />
        
        {/* Text line */}
        <rect x="80" y={65 + i * 30} width="60" height="8" rx="2" fill="hsl(var(--muted-foreground) / 0.3)" />
      </motion.g>
    ))}
    
    {/* Gear icon */}
    <motion.g
      animate={isActive && !prefersReducedMotion ? { rotate: 360 } : {}}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: "165px 45px" }}
    >
      <circle cx="165" cy="45" r="12" fill="hsl(var(--chart-3))" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <rect
          key={angle}
          x="163"
          y="30"
          width="4"
          height="8"
          fill="hsl(var(--chart-3))"
          transform={`rotate(${angle} 165 45)`}
        />
      ))}
      <circle cx="165" cy="45" r="5" fill="hsl(var(--background))" />
    </motion.g>
  </motion.svg>
);

// Earn - Growing chart with arrow
const EarnIllustration = ({ isActive, prefersReducedMotion }: { isActive: boolean; prefersReducedMotion: boolean }) => (
  <motion.svg
    viewBox="0 0 200 200"
    className="w-48 h-48 md:w-64 md:h-64"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0.5, scale: 0.9 }}
    transition={{ duration: 0.5 }}
  >
    {/* Chart background */}
    <rect x="30" y="30" width="140" height="130" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="2" />
    
    {/* Grid lines */}
    {[0, 1, 2, 3].map((i) => (
      <line key={i} x1="45" y1={50 + i * 28} x2="155" y2={50 + i * 28} stroke="hsl(var(--muted))" strokeWidth="1" strokeDasharray="4" />
    ))}
    
    {/* Bars */}
    {[
      { x: 55, height: 40 },
      { x: 80, height: 60 },
      { x: 105, height: 80 },
      { x: 130, height: 100 },
    ].map((bar, i) => (
      <motion.rect
        key={i}
        x={bar.x}
        y={145 - bar.height}
        width="18"
        height={bar.height}
        rx="3"
        fill="hsl(var(--chart-4))"
        initial={{ height: 0, y: 145 }}
        animate={isActive ? { height: bar.height, y: 145 - bar.height } : { height: 0, y: 145 }}
        transition={{ duration: 0.5, delay: i * 0.15 }}
      />
    ))}
    
    {/* Trend line */}
    <motion.path
      d="M 64 115 Q 90 100 99 95 T 139 55"
      stroke="hsl(var(--primary))"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={isActive && !prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    />
    
    {/* Arrow up */}
    <motion.g
      animate={isActive && !prefersReducedMotion ? { y: [0, -5, 0] } : {}}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      <polygon points="139,55 145,70 133,70" fill="hsl(var(--primary))" />
      <rect x="136" y="68" width="6" height="20" fill="hsl(var(--primary))" />
    </motion.g>
    
    {/* Percentage badge */}
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{ duration: 0.3, delay: 1 }}
    >
      <rect x="145" y="25" width="40" height="22" rx="11" fill="hsl(var(--primary))" />
      <text x="165" y="40" textAnchor="middle" className="text-xs font-bold fill-primary-foreground">
        +%
      </text>
    </motion.g>
  </motion.svg>
);
