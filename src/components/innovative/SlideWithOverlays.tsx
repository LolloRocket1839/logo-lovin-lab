import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export interface OverlayConfig {
  id: string;
  type: 'spotlight' | 'arrow' | 'callout' | 'caption' | 'highlight';
  position: { x: string; y: string; width?: string; height?: string };
  delay: number;
  content?: string;
  arrowDirection?: 'right' | 'down' | 'left' | 'up';
  color?: string;
}

interface SlideWithOverlaysProps {
  slideImage: string;
  overlays: OverlayConfig[];
  isActive: boolean;
  stepColor: string;
}

const SpotlightOverlay = ({ config, stepColor }: { config: OverlayConfig; stepColor: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: config.delay / 1000 }}
    className="absolute rounded-2xl pointer-events-none"
    style={{
      left: config.position.x,
      top: config.position.y,
      width: config.position.width || '120px',
      height: config.position.height || '80px',
      boxShadow: `0 0 0 9999px rgba(0,0,0,0.4), 0 0 30px 10px ${stepColor}40`,
      border: `3px solid ${stepColor}`,
    }}
  />
);

const HighlightOverlay = ({ config, stepColor }: { config: OverlayConfig; stepColor: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ 
      opacity: [0, 1, 0.7, 1],
      scale: [0.9, 1.02, 1]
    }}
    transition={{ 
      duration: 0.8, 
      delay: config.delay / 1000,
      times: [0, 0.5, 0.75, 1]
    }}
    className="absolute rounded-xl pointer-events-none"
    style={{
      left: config.position.x,
      top: config.position.y,
      width: config.position.width || '100px',
      height: config.position.height || '60px',
      backgroundColor: `${stepColor}20`,
      border: `2px solid ${stepColor}`,
      boxShadow: `0 0 20px 5px ${stepColor}30`,
    }}
  />
);

const ArrowOverlay = ({ config, stepColor }: { config: OverlayConfig; stepColor: string }) => {
  const getArrowPath = () => {
    switch (config.arrowDirection) {
      case 'down': return 'M 25 0 L 25 60 M 15 50 L 25 60 L 35 50';
      case 'left': return 'M 70 25 L 10 25 M 20 15 L 10 25 L 20 35';
      case 'up': return 'M 25 70 L 25 10 M 15 20 L 25 10 L 35 20';
      default: return 'M 0 25 L 60 25 M 50 15 L 60 25 L 50 35';
    }
  };

  return (
    <motion.svg
      initial={{ opacity: 0, pathLength: 0 }}
      animate={{ opacity: 1, pathLength: 1 }}
      transition={{ duration: 0.8, delay: config.delay / 1000 }}
      className="absolute pointer-events-none"
      style={{
        left: config.position.x,
        top: config.position.y,
        width: config.position.width || '70px',
        height: config.position.height || '50px',
      }}
      viewBox="0 0 70 50"
    >
      <motion.path
        d={getArrowPath()}
        fill="none"
        stroke={stepColor}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: config.delay / 1000 }}
      />
    </motion.svg>
  );
};

const CalloutBadge = ({ config, stepColor }: { config: OverlayConfig; stepColor: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ 
      type: 'spring', 
      stiffness: 300, 
      damping: 20,
      delay: config.delay / 1000 
    }}
    className="absolute px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap pointer-events-none"
    style={{
      left: config.position.x,
      top: config.position.y,
      backgroundColor: stepColor,
      color: 'white',
      boxShadow: `0 4px 15px ${stepColor}50`,
    }}
  >
    {config.content}
  </motion.div>
);

const CaptionOverlay = ({ config }: { config: OverlayConfig }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: config.delay / 1000 }}
    className="absolute px-4 py-2 bg-background/90 backdrop-blur-sm rounded-lg text-sm md:text-base font-medium text-foreground shadow-lg pointer-events-none"
    style={{
      left: config.position.x,
      top: config.position.y,
      maxWidth: config.position.width || '300px',
    }}
  >
    {config.content}
  </motion.div>
);

export const SlideWithOverlays = ({ 
  slideImage, 
  overlays, 
  isActive,
  stepColor 
}: SlideWithOverlaysProps) => {
  const { t } = useTranslation();

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl">
      {/* PDF Slide Background */}
      <motion.img
        src={slideImage}
        alt="Business model slide"
        className="w-full h-full object-contain bg-white"
        initial={{ opacity: 0.8, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Animated Overlays */}
      <AnimatePresence>
        {isActive && overlays.map((overlay) => {
          switch (overlay.type) {
            case 'spotlight':
              return <SpotlightOverlay key={overlay.id} config={overlay} stepColor={stepColor} />;
            case 'highlight':
              return <HighlightOverlay key={overlay.id} config={overlay} stepColor={stepColor} />;
            case 'arrow':
              return <ArrowOverlay key={overlay.id} config={overlay} stepColor={stepColor} />;
            case 'callout':
              return <CalloutBadge key={overlay.id} config={{...overlay, content: t(overlay.content || '')}} stepColor={stepColor} />;
            case 'caption':
              return <CaptionOverlay key={overlay.id} config={{...overlay, content: t(overlay.content || '')}} />;
            default:
              return null;
          }
        })}
      </AnimatePresence>
    </div>
  );
};

export default SlideWithOverlays;
