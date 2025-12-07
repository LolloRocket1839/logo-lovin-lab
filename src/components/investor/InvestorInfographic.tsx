import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Premium SVG House Component with refined architecture
interface PremiumHouseProps {
  isActive: boolean;
  variant: 'invest' | 'acquire' | 'manage' | 'earn';
  size?: 'sm' | 'md' | 'lg';
}

const PremiumHouse: React.FC<PremiumHouseProps> = ({ isActive, variant, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-28 h-28'
  };

  const getVariantIcon = () => {
    switch (variant) {
      case 'invest':
        // Premium 3D Coin with € symbol
        return (
          <g transform="translate(32, 0)">
            {/* Coin shadow */}
            <motion.ellipse
              cx="16"
              cy="20"
              rx="13"
              ry="4"
              fill="hsl(40 70% 30%)"
              opacity="0.3"
              initial={{ scale: 0 }}
              animate={{ scale: isActive ? 1 : 0.8 }}
              transition={{ delay: 0.2 }}
            />
            {/* Coin back (3D effect) */}
            <motion.ellipse
              cx="16"
              cy="16"
              rx="12"
              ry="12"
              fill="url(#coinEdgeGradient)"
              initial={{ scale: 0 }}
              animate={{ scale: isActive ? 1.05 : 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            />
            {/* Coin front */}
            <motion.circle
              cx="16"
              cy="14"
              r="11"
              fill="url(#coinGradientPremium)"
              stroke="url(#coinRimGradient)"
              strokeWidth="1.5"
              initial={{ scale: 0 }}
              animate={{ scale: isActive ? 1.05 : 1 }}
              transition={{ delay: 0.25, type: "spring" }}
            />
            {/* Inner ring detail */}
            <circle cx="16" cy="14" r="8" fill="none" stroke="hsl(45 80% 55%)" strokeWidth="0.5" opacity="0.6" />
            {/* € symbol - elegant serif style */}
            <text 
              x="16" 
              y="18" 
              fontSize="13" 
              fill="hsl(35 80% 25%)" 
              textAnchor="middle" 
              fontWeight="700"
              fontFamily="Georgia, serif"
            >
              €
            </text>
            {/* Shine highlight */}
            <ellipse cx="12" cy="10" rx="3" ry="2" fill="white" opacity="0.4" />
          </g>
        );
      case 'acquire':
        // Elegant key icon (represents ownership/acquisition)
        return (
          <motion.g 
            transform="translate(32, 2)"
            initial={{ opacity: 0, rotate: -20 }}
            animate={{ opacity: 1, rotate: isActive ? 0 : -10 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            {/* Key shadow */}
            <ellipse cx="18" cy="24" rx="10" ry="3" fill="hsl(var(--primary))" opacity="0.2" />
            {/* Key head (bow) */}
            <circle cx="10" cy="10" r="7" fill="none" stroke="url(#keyGradient)" strokeWidth="3" />
            <circle cx="10" cy="10" r="3.5" fill="url(#keyGradient)" />
            {/* Key shaft */}
            <rect x="15" y="8" width="16" height="4" rx="2" fill="url(#keyGradient)" />
            {/* Key teeth */}
            <rect x="25" y="12" width="3" height="5" rx="1" fill="url(#keyGradient)" />
            <rect x="29" y="12" width="2" height="4" rx="0.5" fill="url(#keyGradient)" />
            {/* Key shine */}
            <ellipse cx="8" cy="8" rx="2" ry="1.5" fill="white" opacity="0.3" />
          </motion.g>
        );
      case 'manage':
        // Elegant clipboard with checklist
        return (
          <motion.g 
            transform="translate(32, 0)"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Clipboard shadow */}
            <rect x="6" y="24" width="22" height="4" rx="2" fill="hsl(var(--primary))" opacity="0.15" />
            {/* Clipboard body */}
            <rect x="4" y="6" width="26" height="20" rx="3" fill="url(#clipboardGradient)" stroke="hsl(var(--primary))" strokeWidth="1" />
            {/* Clipboard clip */}
            <rect x="11" y="3" width="12" height="6" rx="2" fill="hsl(var(--primary))" />
            <rect x="14" y="5" width="6" height="2" rx="1" fill="hsl(var(--primary-foreground))" opacity="0.8" />
            {/* Checklist lines */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, staggerChildren: 0.1 }}
            >
              {/* Check mark 1 */}
              <motion.path
                d="M8 12 L10 14 L14 10"
                stroke="hsl(142 70% 45%)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: isActive ? 1 : 0.7 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              />
              <rect x="16" y="11" width="10" height="2" rx="1" fill="hsl(var(--muted-foreground))" opacity="0.5" />
              {/* Check mark 2 */}
              <motion.path
                d="M8 18 L10 20 L14 16"
                stroke="hsl(142 70% 45%)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: isActive ? 1 : 0.5 }}
                transition={{ duration: 0.4, delay: 0.7 }}
              />
              <rect x="16" y="17" width="8" height="2" rx="1" fill="hsl(var(--muted-foreground))" opacity="0.5" />
            </motion.g>
          </motion.g>
        );
      case 'earn':
        // Elegant growing bar chart with upward arrow
        return (
          <g transform="translate(28, -2)">
            {/* Chart shadow */}
            <rect x="2" y="26" width="32" height="3" rx="1.5" fill="hsl(142 50% 30%)" opacity="0.15" />
            {/* Chart bars */}
            <motion.rect
              x="4"
              y="18"
              width="6"
              height="8"
              rx="1.5"
              fill="url(#chartBarGradient1)"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              style={{ transformOrigin: 'bottom' }}
            />
            <motion.rect
              x="13"
              y="12"
              width="6"
              height="14"
              rx="1.5"
              fill="url(#chartBarGradient2)"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              style={{ transformOrigin: 'bottom' }}
            />
            <motion.rect
              x="22"
              y="4"
              width="6"
              height="22"
              rx="1.5"
              fill="url(#chartBarGradient3)"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              style={{ transformOrigin: 'bottom' }}
            />
            {/* Upward arrow */}
            <motion.g
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: isActive ? 1 : 0.7, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <path
                d="M30 8 L34 2 L38 8"
                fill="none"
                stroke="hsl(142 70% 40%)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line x1="34" y1="2" x2="34" y2="12" stroke="hsl(142 70% 40%)" strokeWidth="2" strokeLinecap="round" />
            </motion.g>
            {/* € symbol on tallest bar */}
            <text x="25" y="18" fontSize="8" fill="white" fontWeight="bold" textAnchor="middle">€</text>
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
      animate={{ opacity: isActive ? 1 : 0.75 }}
      transition={{ duration: 0.4 }}
    >
      <defs>
        {/* Premium house body gradient with texture hint */}
        <linearGradient id="houseBodyGradientPremium" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(45 30% 96%)" />
          <stop offset="50%" stopColor="hsl(40 25% 92%)" />
          <stop offset="100%" stopColor="hsl(35 20% 88%)" />
        </linearGradient>
        
        {/* Premium roof gradient with 3 stops */}
        <linearGradient id="roofGradientPremium" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(150 50% 28%)" />
          <stop offset="50%" stopColor="hsl(150 45% 22%)" />
          <stop offset="100%" stopColor="hsl(150 40% 16%)" />
        </linearGradient>
        
        {/* Roof tiles highlight */}
        <linearGradient id="roofTileHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.15" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        
        {/* Window warm glow */}
        <radialGradient id="windowGlowPremium" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="hsl(45 100% 85%)" />
          <stop offset="60%" stopColor="hsl(40 95% 70%)" />
          <stop offset="100%" stopColor="hsl(35 90% 55%)" />
        </radialGradient>
        
        {/* Premium 3D coin gradient */}
        <linearGradient id="coinGradientPremium" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(48 100% 70%)" />
          <stop offset="30%" stopColor="hsl(45 95% 62%)" />
          <stop offset="70%" stopColor="hsl(42 90% 55%)" />
          <stop offset="100%" stopColor="hsl(38 85% 48%)" />
        </linearGradient>
        
        {/* Coin edge gradient for 3D */}
        <linearGradient id="coinEdgeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(40 80% 45%)" />
          <stop offset="100%" stopColor="hsl(35 70% 35%)" />
        </linearGradient>
        
        {/* Coin rim highlight */}
        <linearGradient id="coinRimGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(50 90% 75%)" />
          <stop offset="100%" stopColor="hsl(38 80% 40%)" />
        </linearGradient>
        
        {/* Key gradient */}
        <linearGradient id="keyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(150 50% 35%)" />
          <stop offset="50%" stopColor="hsl(150 45% 28%)" />
          <stop offset="100%" stopColor="hsl(150 40% 22%)" />
        </linearGradient>
        
        {/* Clipboard gradient */}
        <linearGradient id="clipboardGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(45 30% 98%)" />
          <stop offset="100%" stopColor="hsl(40 25% 94%)" />
        </linearGradient>
        
        {/* Chart bar gradients */}
        <linearGradient id="chartBarGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(142 50% 55%)" />
          <stop offset="100%" stopColor="hsl(142 45% 40%)" />
        </linearGradient>
        <linearGradient id="chartBarGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(142 55% 50%)" />
          <stop offset="100%" stopColor="hsl(142 50% 35%)" />
        </linearGradient>
        <linearGradient id="chartBarGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(142 60% 45%)" />
          <stop offset="100%" stopColor="hsl(142 55% 30%)" />
        </linearGradient>
        
        {/* Door gradient */}
        <linearGradient id="doorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(150 40% 32%)" />
          <stop offset="100%" stopColor="hsl(150 35% 22%)" />
        </linearGradient>
        
        {/* Shutter gradient */}
        <linearGradient id="shutterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(150 35% 38%)" />
          <stop offset="100%" stopColor="hsl(150 30% 28%)" />
        </linearGradient>
        
        {/* Premium shadow filter */}
        <filter id="houseShadowPremium" x="-30%" y="-20%" width="160%" height="160%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="hsl(0 0% 0%)" floodOpacity="0.12" />
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="hsl(var(--primary))" floodOpacity="0.08" />
        </filter>
        
        {/* Active glow filter */}
        <filter id="activeGlowPremium" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodColor="hsl(var(--primary))" floodOpacity="0.15" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="shadow" />
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Ground shadow */}
      <motion.ellipse
        cx="50"
        cy="94"
        rx="35"
        ry="5"
        fill="hsl(var(--primary))"
        initial={{ opacity: 0.08 }}
        animate={{ opacity: isActive ? 0.18 : 0.08, scale: isActive ? 1.05 : 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* Main house group */}
      <g filter={isActive ? "url(#activeGlowPremium)" : "url(#houseShadowPremium)"}>
        
        {/* Foundation / Base */}
        <rect x="18" y="86" width="64" height="6" rx="1" fill="hsl(30 15% 75%)" />
        <rect x="20" y="88" width="60" height="2" fill="hsl(30 10% 65%)" />
        
        {/* House body with subtle brick texture hint */}
        <motion.rect
          x="20"
          y="48"
          width="60"
          height="40"
          rx="2"
          fill="url(#houseBodyGradientPremium)"
          stroke="hsl(35 20% 80%)"
          strokeWidth="1"
          initial={{ y: 52 }}
          animate={{ y: 48 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Decorative cornice under roof */}
        <rect x="16" y="46" width="68" height="4" rx="1" fill="hsl(40 25% 90%)" />
        <rect x="18" y="48" width="64" height="2" fill="hsl(35 20% 85%)" />
        
        {/* Roof with tile pattern */}
        <motion.path
          d="M10 50 L50 20 L90 50 Z"
          fill="url(#roofGradientPremium)"
          stroke="hsl(150 40% 18%)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        
        {/* Roof tile lines (subtle) */}
        <g opacity="0.25">
          <path d="M20 46 Q50 26 80 46" fill="none" stroke="hsl(150 30% 35%)" strokeWidth="0.5" />
          <path d="M25 42 Q50 25 75 42" fill="none" stroke="hsl(150 30% 35%)" strokeWidth="0.5" />
          <path d="M30 38 Q50 24 70 38" fill="none" stroke="hsl(150 30% 35%)" strokeWidth="0.5" />
          <path d="M35 34 Q50 23 65 34" fill="none" stroke="hsl(150 30% 35%)" strokeWidth="0.5" />
        </g>
        
        {/* Roof highlight */}
        <path d="M15 48 L50 22 L52 23 L17 48 Z" fill="white" opacity="0.1" />
        
        {/* Chimney */}
        <rect x="66" y="24" width="10" height="20" rx="1" fill="hsl(25 20% 70%)" />
        <rect x="65" y="22" width="12" height="4" rx="1" fill="hsl(25 15% 60%)" />
        {/* Chimney detail */}
        <rect x="68" y="26" width="6" height="2" fill="hsl(25 15% 55%)" opacity="0.5" />
        
        {/* Left window with shutters */}
        <g>
          {/* Left shutter */}
          <rect x="22" y="56" width="4" height="16" rx="0.5" fill="url(#shutterGradient)" />
          <line x1="23" y1="58" x2="23" y2="70" stroke="hsl(150 25% 25%)" strokeWidth="0.5" />
          <line x1="25" y1="58" x2="25" y2="70" stroke="hsl(150 25% 25%)" strokeWidth="0.5" />
          
          {/* Window frame */}
          <rect x="26" y="54" width="14" height="18" rx="1" fill="hsl(35 20% 85%)" stroke="hsl(30 15% 70%)" strokeWidth="1" />
          
          {/* Window glass */}
          <motion.rect
            x="28"
            y="56"
            width="10"
            height="14"
            rx="0.5"
            fill={isActive ? "url(#windowGlowPremium)" : "hsl(210 20% 85%)"}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: isActive ? 1 : 0.6 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Window cross dividers */}
          <line x1="33" y1="56" x2="33" y2="70" stroke="hsl(35 20% 80%)" strokeWidth="1.5" />
          <line x1="28" y1="63" x2="38" y2="63" stroke="hsl(35 20% 80%)" strokeWidth="1.5" />
          
          {/* Window reflection */}
          <polygon points="29,57 32,57 29,62" fill="white" opacity="0.35" />
          
          {/* Window sill */}
          <rect x="25" y="72" width="16" height="2" rx="0.5" fill="hsl(35 20% 82%)" />
          
          {/* Right shutter */}
          <rect x="40" y="56" width="4" height="16" rx="0.5" fill="url(#shutterGradient)" />
          <line x1="41" y1="58" x2="41" y2="70" stroke="hsl(150 25% 25%)" strokeWidth="0.5" />
          <line x1="43" y1="58" x2="43" y2="70" stroke="hsl(150 25% 25%)" strokeWidth="0.5" />
        </g>
        
        {/* Right window with shutters */}
        <g>
          {/* Left shutter */}
          <rect x="56" y="56" width="4" height="16" rx="0.5" fill="url(#shutterGradient)" />
          <line x1="57" y1="58" x2="57" y2="70" stroke="hsl(150 25% 25%)" strokeWidth="0.5" />
          <line x1="59" y1="58" x2="59" y2="70" stroke="hsl(150 25% 25%)" strokeWidth="0.5" />
          
          {/* Window frame */}
          <rect x="60" y="54" width="14" height="18" rx="1" fill="hsl(35 20% 85%)" stroke="hsl(30 15% 70%)" strokeWidth="1" />
          
          {/* Window glass */}
          <motion.rect
            x="62"
            y="56"
            width="10"
            height="14"
            rx="0.5"
            fill={isActive ? "url(#windowGlowPremium)" : "hsl(210 20% 85%)"}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: isActive ? 1 : 0.6 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
          
          {/* Window cross dividers */}
          <line x1="67" y1="56" x2="67" y2="70" stroke="hsl(35 20% 80%)" strokeWidth="1.5" />
          <line x1="62" y1="63" x2="72" y2="63" stroke="hsl(35 20% 80%)" strokeWidth="1.5" />
          
          {/* Window reflection */}
          <polygon points="63,57 66,57 63,62" fill="white" opacity="0.35" />
          
          {/* Window sill */}
          <rect x="59" y="72" width="16" height="2" rx="0.5" fill="hsl(35 20% 82%)" />
          
          {/* Right shutter */}
          <rect x="74" y="56" width="4" height="16" rx="0.5" fill="url(#shutterGradient)" />
          <line x1="75" y1="58" x2="75" y2="70" stroke="hsl(150 25% 25%)" strokeWidth="0.5" />
          <line x1="77" y1="58" x2="77" y2="70" stroke="hsl(150 25% 25%)" strokeWidth="0.5" />
        </g>
        
        {/* Elegant paneled door */}
        <g>
          {/* Door frame */}
          <rect x="42" y="60" width="16" height="28" rx="1" fill="hsl(30 15% 75%)" />
          
          {/* Door body */}
          <rect x="44" y="62" width="12" height="24" rx="0.5" fill="url(#doorGradient)" />
          
          {/* Door panels */}
          <rect x="46" y="64" width="8" height="6" rx="0.5" fill="hsl(150 35% 28%)" stroke="hsl(150 30% 35%)" strokeWidth="0.5" />
          <rect x="46" y="72" width="8" height="8" rx="0.5" fill="hsl(150 35% 28%)" stroke="hsl(150 30% 35%)" strokeWidth="0.5" />
          
          {/* Semi-circular window at top of door */}
          <path d="M47 64 A3 3 0 0 1 53 64" fill="hsl(45 40% 80%)" stroke="hsl(150 30% 32%)" strokeWidth="0.5" />
          
          {/* Door handle with plate */}
          <rect x="53" y="74" width="2" height="4" rx="0.5" fill="hsl(45 50% 65%)" />
          <circle cx="54" cy="76" r="1" fill="hsl(45 60% 55%)" />
          
          {/* Door step */}
          <rect x="40" y="86" width="20" height="3" rx="0.5" fill="hsl(30 15% 65%)" />
        </g>
      </g>
      
      {/* Window light glow effect (ambient) */}
      {isActive && (
        <>
          <motion.ellipse
            cx="33"
            cy="63"
            rx="12"
            ry="10"
            fill="hsl(45 100% 75%)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.ellipse
            cx="67"
            cy="63"
            rx="12"
            ry="10"
            fill="hsl(45 100% 75%)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
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
  const { t } = useTranslation();
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
      title: t('infographic.steps.invest.title'),
      description: t('infographic.steps.invest.description'),
      detail: t('infographic.steps.invest.detail')
    },
    {
      id: 1,
      variant: 'acquire' as const,
      title: t('infographic.steps.acquire.title'),
      description: t('infographic.steps.acquire.description'),
      detail: t('infographic.steps.acquire.detail')
    },
    {
      id: 2,
      variant: 'manage' as const,
      title: t('infographic.steps.manage.title'),
      description: t('infographic.steps.manage.description'),
      detail: t('infographic.steps.manage.detail')
    },
    {
      id: 3,
      variant: 'earn' as const,
      title: t('infographic.steps.earn.title'),
      description: t('infographic.steps.earn.description'),
      detail: t('infographic.steps.earn.detail')
    }
  ];

  const metrics = [
    { value: 8, suffix: '.34%', label: t('infographic.metrics.yield.label'), description: t('infographic.metrics.yield.description'), isEstimate: true },
    { value: 95, suffix: '%', label: t('infographic.metrics.occupancy.label'), description: t('infographic.metrics.occupancy.description'), isEstimate: true },
    { value: 90, suffix: 'k+', label: t('infographic.metrics.students.label'), description: t('infographic.metrics.students.description'), isEstimate: false },
    { value: 7, suffix: '', label: t('infographic.metrics.universities.label'), description: t('infographic.metrics.universities.description'), isEstimate: false }
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
        <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium mb-4 inline-block border-b border-primary/30 pb-1">
          {t('infographic.badge')}
        </span>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-3">
          {t('infographic.title')}
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
          {t('infographic.subtitle')}
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
          
          <div 
            className="relative z-10 flex items-start justify-between"
            role="tablist"
            aria-label={t('infographic.badge')}
          >
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
                  role="tab"
                  tabIndex={0}
                  aria-selected={activeStep === index}
                  aria-label={`${t('infographic.badge')} ${index + 1}: ${step.title} - ${step.description}`}
                  className={`p-4 lg:p-6 rounded-2xl border-2 bg-card transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    activeStep === index 
                      ? 'border-primary shadow-lg shadow-primary/10' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setActiveStep(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveStep(index);
                    } else if (e.key === 'ArrowRight') {
                      e.preventDefault();
                      setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
                    } else if (e.key === 'ArrowLeft') {
                      e.preventDefault();
                      setActiveStep((prev) => Math.max(prev - 1, 0));
                    } else if (e.key === 'Home') {
                      e.preventDefault();
                      setActiveStep(0);
                    } else if (e.key === 'End') {
                      e.preventDefault();
                      setActiveStep(steps.length - 1);
                    }
                  }}
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
                  aria-hidden="true"
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
                  aria-hidden={activeStep !== index}
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
          <div className="space-y-6" role="tablist" aria-label={t('infographic.badge')}>
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -20 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                {/* Timeline node */}
                <div className="absolute -left-14 top-4" aria-hidden="true">
                  <TimelineNode 
                    index={index} 
                    isActive={activeStep === index}
                    isCompleted={activeStep > index}
                  />
                </div>
                
                {/* Step card */}
                <motion.div
                  role="tab"
                  tabIndex={0}
                  aria-selected={activeStep === index}
                  aria-label={`${t('infographic.badge')} ${index + 1}: ${step.title} - ${step.description}`}
                  className={`p-4 rounded-2xl border-2 bg-card transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    activeStep === index 
                      ? 'border-primary shadow-lg shadow-primary/10' 
                      : 'border-border'
                  }`}
                  onClick={() => setActiveStep(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveStep(index);
                    } else if (e.key === 'ArrowDown') {
                      e.preventDefault();
                      setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
                    } else if (e.key === 'ArrowUp') {
                      e.preventDefault();
                      setActiveStep((prev) => Math.max(prev - 1, 0));
                    } else if (e.key === 'Home') {
                      e.preventDefault();
                      setActiveStep(0);
                    } else if (e.key === 'End') {
                      e.preventDefault();
                      setActiveStep(steps.length - 1);
                    }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start gap-4">
                    {/* House */}
                    <div className="flex-shrink-0" aria-hidden="true">
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
                        aria-hidden={activeStep !== index}
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
        {t('infographic.disclaimer')}
      </motion.p>

      {/* Bottom CTA */}
      <motion.div 
        className="mt-6 md:mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full">
          <CheckCircle2 className="w-4 h-4 text-primary" aria-hidden="true" />
          <span className="text-sm text-muted-foreground">
            {t('infographic.cta')}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default InvestorInfographic;
