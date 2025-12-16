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

// Step 1: INVESTI - Smartphone con €100 che fluisce verso portafoglio case
const InvestIllustration = ({ isActive, prefersReducedMotion }: { isActive: boolean; prefersReducedMotion: boolean }) => (
  <motion.svg
    viewBox="0 0 280 240"
    className="w-full h-full max-w-[320px]"
    initial={{ opacity: 0 }}
    animate={isActive ? { opacity: 1 } : { opacity: 0.5 }}
    transition={{ duration: 0.4 }}
  >
    {/* Smartphone */}
    <motion.g
      initial={{ x: -20, opacity: 0 }}
      animate={isActive ? { x: 0, opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      <rect x="20" y="50" width="70" height="120" rx="10" 
        className="fill-card stroke-border" strokeWidth="2" />
      <rect x="28" y="62" width="54" height="88" rx="4" 
        className="fill-background" />
      {/* €100 on screen */}
      <text x="55" y="100" textAnchor="middle" 
        className="fill-primary font-bold" fontSize="20">€100</text>
      {/* Send button */}
      <rect x="38" y="125" width="34" height="16" rx="8" 
        className="fill-primary" />
      <text x="55" y="137" textAnchor="middle" 
        className="fill-primary-foreground" fontSize="8">INVESTI</text>
      {/* Phone notch */}
      <rect x="45" y="55" width="20" height="4" rx="2" className="fill-muted" />
    </motion.g>

    {/* Animated flow - coins flying */}
    <motion.g>
      {[0, 1, 2].map((i) => (
        <motion.g key={i}>
          <motion.circle
            cx={100 + i * 15}
            cy={110 - i * 5}
            r="10"
            className="fill-primary"
            initial={{ x: 0, opacity: 0 }}
            animate={isActive && !prefersReducedMotion ? {
              x: [0, 60 + i * 10],
              opacity: [0, 1, 1, 0.6]
            } : { x: 60 + i * 10, opacity: 0.6 }}
            transition={{ duration: 1.2, delay: 0.4 + i * 0.2, ease: "easeOut" }}
          />
          <motion.text
            x={100 + i * 15}
            y={114 - i * 5}
            textAnchor="middle"
            className="fill-primary-foreground font-bold"
            fontSize="10"
            initial={{ x: 0, opacity: 0 }}
            animate={isActive && !prefersReducedMotion ? {
              x: [0, 60 + i * 10],
              opacity: [0, 1, 1, 0.6]
            } : { x: 60 + i * 10, opacity: 0.6 }}
            transition={{ duration: 1.2, delay: 0.4 + i * 0.2, ease: "easeOut" }}
          >€</motion.text>
        </motion.g>
      ))}
    </motion.g>

    {/* Portfolio of houses with JR branding */}
    <motion.g
      initial={{ scale: 0.8, opacity: 0 }}
      animate={isActive ? { scale: 1, opacity: 1 } : {}}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      {/* Background container */}
      <rect x="160" y="45" width="105" height="130" rx="12" 
        className="fill-primary/5 stroke-primary/20" strokeWidth="1" />
      
      {/* House 1 - main */}
      <g transform="translate(175, 55)">
        <polygon points="30,0 60,22 0,22" className="fill-primary" />
        <rect x="5" y="22" width="50" height="42" className="fill-card stroke-border" strokeWidth="1.5" />
        <rect x="20" y="38" width="18" height="26" className="fill-primary/20" />
        <rect x="10" y="30" width="12" height="12" className="fill-background stroke-border" />
        <rect x="36" y="30" width="12" height="12" className="fill-background stroke-border" />
      </g>
      
      {/* House 2 - small left */}
      <g transform="translate(165, 115)">
        <polygon points="18,0 36,14 0,14" className="fill-primary/70" />
        <rect x="3" y="14" width="30" height="28" className="fill-card stroke-border" strokeWidth="1" />
        <rect x="13" y="26" width="10" height="16" className="fill-primary/20" />
      </g>
      
      {/* House 3 - small right */}
      <g transform="translate(210, 118)">
        <polygon points="18,0 36,14 0,14" className="fill-primary/60" />
        <rect x="3" y="14" width="30" height="25" className="fill-card stroke-border" strokeWidth="1" />
        <rect x="13" y="24" width="10" height="15" className="fill-primary/20" />
      </g>

      {/* JR Logo Badge */}
      <motion.g
        initial={{ scale: 0 }}
        animate={isActive ? { scale: 1 } : {}}
        transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
      >
        <circle cx="250" cy="60" r="16" className="fill-card stroke-border" strokeWidth="1" />
        <image 
          href="/jungle-rent-logo.svg" 
          x="236" 
          y="46" 
          width="28" 
          height="28"
          preserveAspectRatio="xMidYMid meet"
        />
      </motion.g>
    </motion.g>

    {/* Label */}
    <motion.text
      x="140" y="220"
      textAnchor="middle"
      className="fill-muted-foreground"
      fontSize="11"
      initial={{ opacity: 0 }}
      animate={isActive ? { opacity: 1 } : {}}
      transition={{ delay: 0.6 }}
    >
      Tu investi da €100, noi facciamo il resto
    </motion.text>
  </motion.svg>
);

// Step 2: ACQUISTIAMO - Università con case selezionate vicine
const AcquireIllustration = ({ isActive, prefersReducedMotion }: { isActive: boolean; prefersReducedMotion: boolean }) => (
  <motion.svg
    viewBox="0 0 280 240"
    className="w-full h-full max-w-[320px]"
    initial={{ opacity: 0 }}
    animate={isActive ? { opacity: 1 } : { opacity: 0.5 }}
    transition={{ duration: 0.4 }}
  >
    {/* University Building */}
    <motion.g
      initial={{ y: -15, opacity: 0 }}
      animate={isActive ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      {/* Main building */}
      <rect x="90" y="25" width="100" height="55" className="fill-card stroke-border" strokeWidth="2" />
      {/* Pediment */}
      <polygon points="140,8 195,28 85,28" className="fill-muted stroke-border" strokeWidth="2" />
      {/* Columns */}
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={100 + i * 22} y="42" width="10" height="38" className="fill-background stroke-border" />
      ))}
      {/* Graduation cap */}
      <motion.g
        initial={{ scale: 0 }}
        animate={isActive ? { scale: 1 } : {}}
        transition={{ delay: 0.2, type: "spring" }}
      >
        <rect x="127" y="14" width="26" height="5" className="fill-primary" />
        <polygon points="140,6 155,14 125,14" className="fill-primary" />
        <circle cx="155" cy="20" r="2" className="fill-primary" />
        <line x1="155" y1="20" x2="160" y2="28" className="stroke-primary" strokeWidth="1.5" />
      </motion.g>
      
      {/* University label */}
      <text x="140" y="70" textAnchor="middle" className="fill-muted-foreground" fontSize="8">UNIVERSITÀ</text>
    </motion.g>

    {/* Connection lines from university to houses */}
    <motion.g
      initial={{ opacity: 0 }}
      animate={isActive ? { opacity: 1 } : {}}
      transition={{ delay: 0.3 }}
    >
      {[{ x1: 100, x2: 55 }, { x1: 140, x2: 140 }, { x1: 180, x2: 225 }].map((line, i) => (
        <motion.line
          key={i}
          x1={line.x1} y1="85" x2={line.x2} y2="115"
          className="stroke-primary/30"
          strokeWidth="2"
          strokeDasharray="5 5"
          initial={{ pathLength: 0 }}
          animate={isActive && !prefersReducedMotion ? { pathLength: 1 } : { pathLength: 1 }}
          transition={{ delay: 0.4 + i * 0.12, duration: 0.4 }}
        />
      ))}
    </motion.g>

    {/* Three houses with checkmarks */}
    {[
      { x: 20, delay: 0.5 },
      { x: 110, delay: 0.65 },
      { x: 200, delay: 0.8 }
    ].map((house, i) => (
      <motion.g
        key={i}
        initial={{ y: 15, opacity: 0 }}
        animate={isActive ? { y: 0, opacity: 1 } : {}}
        transition={{ delay: house.delay, duration: 0.4 }}
      >
        {/* House */}
        <g transform={`translate(${house.x}, 120)`}>
          <polygon points="30,0 60,18 0,18" className="fill-primary" />
          <rect x="5" y="18" width="50" height="38" className="fill-card stroke-border" strokeWidth="1.5" />
          <rect x="20" y="32" width="18" height="24" className="fill-primary/15" />
          <rect x="9" y="25" width="12" height="10" className="fill-background stroke-border" />
          <rect x="37" y="25" width="12" height="10" className="fill-background stroke-border" />
        </g>
        
        {/* Green checkmark badge */}
        <motion.g
          initial={{ scale: 0 }}
          animate={isActive ? { scale: 1 } : {}}
          transition={{ delay: house.delay + 0.25, type: "spring", stiffness: 300 }}
        >
          <circle cx={house.x + 52} cy="128" r="12" className="fill-primary" />
          <motion.path
            d={`M ${house.x + 46} 128 L ${house.x + 50} 132 L ${house.x + 58} 124`}
            className="stroke-primary-foreground fill-none"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={isActive && !prefersReducedMotion ? { pathLength: 1 } : { pathLength: 1 }}
            transition={{ delay: house.delay + 0.4, duration: 0.25 }}
          />
        </motion.g>
      </motion.g>
    ))}

    {/* Label */}
    <motion.text
      x="140" y="220"
      textAnchor="middle"
      className="fill-muted-foreground"
      fontSize="11"
      initial={{ opacity: 0 }}
      animate={isActive ? { opacity: 1 } : {}}
      transition={{ delay: 1 }}
    >
      Acquistiamo immobili vicino agli atenei
    </motion.text>
  </motion.svg>
);

// Step 3: GESTIAMO - Split: JR gestisce tutto, tu zero pensieri
const ManageIllustration = ({ isActive, prefersReducedMotion }: { isActive: boolean; prefersReducedMotion: boolean }) => {
  const tasks = [
    { emoji: "📝", label: "Contratti" },
    { emoji: "👥", label: "Inquilini" },
    { emoji: "🔧", label: "Manutenzione" },
    { emoji: "📊", label: "Fiscalità" }
  ];

  return (
    <motion.svg
      viewBox="0 0 280 240"
      className="w-full h-full max-w-[320px]"
      initial={{ opacity: 0 }}
      animate={isActive ? { opacity: 1 } : { opacity: 0.5 }}
      transition={{ duration: 0.4 }}
    >
      {/* Divider line */}
      <motion.line
        x1="140" y1="25" x2="140" y2="185"
        className="stroke-border"
        strokeWidth="2"
        strokeDasharray="6 4"
        initial={{ pathLength: 0 }}
        animate={isActive ? { pathLength: 1 } : {}}
        transition={{ duration: 0.5 }}
      />

      {/* LEFT SIDE: JUNGLE RENT */}
      <motion.g
        initial={{ opacity: 0, x: -10 }}
        animate={isActive ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.2 }}
      >
        {/* Header */}
        <rect x="15" y="20" width="110" height="24" rx="12" className="fill-primary/10" />
        <text x="70" y="36" textAnchor="middle" className="fill-primary font-bold" fontSize="11">JUNGLE RENT</text>
        
        {/* Task list */}
        {tasks.map((task, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, x: -15 }}
            animate={isActive ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.12 }}
          >
            <rect x="18" y={55 + i * 32} width="105" height="26" rx="6" 
              className="fill-card stroke-border" strokeWidth="1" />
            <text x="32" y={72 + i * 32} fontSize="14">{task.emoji}</text>
            <text x="50" y={72 + i * 32} className="fill-foreground" fontSize="11">{task.label}</text>
            
            {/* Animated check */}
            <motion.g
              initial={{ scale: 0 }}
              animate={isActive ? { scale: 1 } : {}}
              transition={{ delay: 0.5 + i * 0.15, type: "spring" }}
            >
              <circle cx="110" cy={68 + i * 32} r="9" className="fill-primary/15" />
              <motion.path
                d={`M 104 ${68 + i * 32} L 108 ${72 + i * 32} L 116 ${64 + i * 32}`}
                className="stroke-primary fill-none"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isActive && !prefersReducedMotion ? { pathLength: 1 } : { pathLength: 1 }}
                transition={{ delay: 0.7 + i * 0.15, duration: 0.25 }}
              />
            </motion.g>
          </motion.g>
        ))}
      </motion.g>

      {/* RIGHT SIDE: TU = ZERO PENSIERI */}
      <motion.g
        initial={{ opacity: 0, x: 10 }}
        animate={isActive ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.3 }}
      >
        {/* Header */}
        <rect x="155" y="20" width="110" height="24" rx="12" className="fill-muted/50" />
        <text x="210" y="36" textAnchor="middle" className="fill-muted-foreground font-bold" fontSize="11">TU</text>
        
        {/* Person relaxing on sofa illustration */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {/* Sofa base */}
          <rect x="158" y="130" width="104" height="45" rx="8" className="fill-primary/20" />
          {/* Sofa back */}
          <rect x="158" y="95" width="104" height="40" rx="8" className="fill-primary/30" />
          {/* Sofa arm left */}
          <rect x="152" y="100" width="18" height="70" rx="6" className="fill-primary/25" />
          {/* Sofa arm right */}
          <rect x="250" y="100" width="18" height="70" rx="6" className="fill-primary/25" />
          {/* Sofa cushions */}
          <rect x="165" y="133" width="38" height="12" rx="4" className="fill-primary/15" />
          <rect x="208" y="133" width="38" height="12" rx="4" className="fill-primary/15" />
          
          {/* Person body - relaxed pose */}
          <motion.g
            animate={isActive && !prefersReducedMotion ? { y: [0, -2, 0] } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Legs on sofa */}
            <ellipse cx="235" cy="125" rx="25" ry="8" className="fill-muted-foreground/60" />
            {/* Torso leaning */}
            <ellipse cx="188" cy="115" rx="16" ry="22" className="fill-muted-foreground/60" />
            {/* Head */}
            <circle cx="185" cy="85" r="14" className="fill-muted-foreground/70" />
            {/* Hair */}
            <ellipse cx="185" cy="78" rx="12" ry="8" className="fill-foreground/40" />
            {/* Face - closed eyes (relaxed) */}
            <path d="M 180 84 Q 182 86 184 84" className="stroke-background fill-none" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 186 84 Q 188 86 190 84" className="stroke-background fill-none" strokeWidth="1.5" strokeLinecap="round" />
            {/* Smile */}
            <path d="M 182 90 Q 185 93 188 90" className="stroke-background fill-none" strokeWidth="1.5" strokeLinecap="round" />
            {/* Arm resting */}
            <ellipse cx="205" cy="115" rx="12" ry="6" className="fill-muted-foreground/60" />
          </motion.g>
          
          {/* Pillow */}
          <ellipse cx="175" cy="105" rx="12" ry="8" className="fill-accent/30" />
          
          {/* Small plant decoration */}
          <g transform="translate(255, 70)">
            <rect x="0" y="15" width="10" height="12" rx="2" className="fill-primary/40" />
            <ellipse cx="5" cy="12" rx="8" ry="10" className="fill-primary/30" />
            <ellipse cx="5" cy="8" rx="6" ry="7" className="fill-primary/40" />
          </g>
        </motion.g>

        {/* Zero pensieri badge - small */}
        <motion.g
          initial={{ scale: 0 }}
          animate={isActive ? { scale: 1 } : {}}
          transition={{ delay: 0.8, type: "spring", stiffness: 150 }}
        >
          <rect x="175" y="52" width="70" height="22" rx="11" className="fill-primary" />
          <text x="210" y="67" textAnchor="middle" className="fill-primary-foreground font-bold" fontSize="10">0 PENSIERI</text>
        </motion.g>
      </motion.g>

      {/* Label */}
      <motion.text
        x="140" y="220"
        textAnchor="middle"
        className="fill-muted-foreground"
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

// Step 4: GUADAGNI - Timeline Q1-Q4 con rendite
const EarnIllustration = ({ isActive, prefersReducedMotion }: { isActive: boolean; prefersReducedMotion: boolean }) => {
  const quarters = ["Q1", "Q2", "Q3", "Q4"];
  
  return (
    <motion.svg
      viewBox="0 0 280 240"
      className="w-full h-full max-w-[320px]"
      initial={{ opacity: 0 }}
      animate={isActive ? { opacity: 1 } : { opacity: 0.5 }}
      transition={{ duration: 0.4 }}
    >
      {/* Timeline base */}
      <motion.line
        x1="30" y1="50" x2="250" y2="50"
        className="stroke-border"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={isActive ? { pathLength: 1 } : {}}
        transition={{ duration: 0.4 }}
      />

      {/* Quarter markers with coins dropping */}
      {quarters.map((q, i) => {
        const x = 50 + i * 55;
        return (
          <motion.g key={q}>
            {/* Quarter circle */}
            <motion.g
              initial={{ scale: 0 }}
              animate={isActive ? { scale: 1 } : {}}
              transition={{ delay: 0.2 + i * 0.1, type: "spring" }}
            >
              <circle cx={x} cy="50" r="18" className="fill-card stroke-primary" strokeWidth="2" />
              <text x={x} y="55" textAnchor="middle" className="fill-primary font-bold" fontSize="12">{q}</text>
            </motion.g>
            
            {/* Dropping coin */}
            <motion.g
              initial={{ y: 0, opacity: 0 }}
              animate={isActive && !prefersReducedMotion ? {
                y: [0, 45],
                opacity: [0, 1, 1, 0.7]
              } : { y: 45, opacity: 0.7 }}
              transition={{ delay: 0.6 + i * 0.15, duration: 0.5, ease: "easeIn" }}
            >
              <circle cx={x} cy="75" r="11" className="fill-primary" />
              <text x={x} y="80" textAnchor="middle" className="fill-primary-foreground font-bold" fontSize="11">€</text>
            </motion.g>
            
            {/* Arrow down */}
            <motion.path
              d={`M ${x} 88 L ${x} 118`}
              className="stroke-primary/30 fill-none"
              strokeWidth="2"
              strokeDasharray="4 3"
              initial={{ pathLength: 0 }}
              animate={isActive ? { pathLength: 1 } : {}}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.3 }}
            />
          </motion.g>
        );
      })}

      {/* Dashboard / Your Account */}
      <motion.g
        initial={{ y: 15, opacity: 0 }}
        animate={isActive ? { y: 0, opacity: 1 } : {}}
        transition={{ delay: 0.9, duration: 0.4 }}
      >
        {/* Container */}
        <rect x="35" y="125" width="210" height="70" rx="10" 
          className="fill-card stroke-border" strokeWidth="2" />
        
        {/* Header bar */}
        <rect x="35" y="125" width="210" height="22" rx="10" 
          className="fill-muted" />
        <text x="140" y="140" textAnchor="middle" className="fill-muted-foreground" fontSize="9">
          💰 IL TUO DASHBOARD
        </text>
        
        {/* Growing bars */}
        {[0, 1, 2, 3].map((i) => (
          <motion.rect
            key={i}
            x={55 + i * 48}
            y={180 - (18 + i * 10)}
            width="32"
            height={18 + i * 10}
            rx="3"
            className="fill-primary"
            initial={{ scaleY: 0 }}
            animate={isActive ? { scaleY: 1 } : {}}
            transition={{ delay: 1.1 + i * 0.08, duration: 0.3 }}
            style={{ transformOrigin: "bottom" }}
          />
        ))}
        
        {/* Trend arrow */}
        <motion.path
          d="M 70 168 Q 110 158 150 150 Q 190 142 220 132"
          className="stroke-chart-4 fill-none"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={isActive && !prefersReducedMotion ? { pathLength: 1 } : { pathLength: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        />
        <motion.polygon
          points="215,127 225,132 215,137"
          className="fill-chart-4"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : {}}
          transition={{ delay: 1.8 }}
        />
      </motion.g>

      {/* Label */}
      <motion.text
        x="140" y="220"
        textAnchor="middle"
        className="fill-muted-foreground"
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
