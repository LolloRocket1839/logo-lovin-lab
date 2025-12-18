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

// Static overlay components without animations
const HighlightOverlay = ({ config, stepColor }: { config: OverlayConfig; stepColor: string }) => (
  <div
    className="absolute rounded-xl pointer-events-none"
    style={{
      left: config.position.x,
      top: config.position.y,
      width: config.position.width || '100px',
      height: config.position.height || '60px',
      backgroundColor: `${stepColor}20`,
      border: `2px solid ${stepColor}`,
    }}
  />
);

const CalloutBadge = ({ config, stepColor }: { config: OverlayConfig; stepColor: string }) => (
  <div
    className="absolute px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap pointer-events-none"
    style={{
      left: config.position.x,
      top: config.position.y,
      backgroundColor: stepColor,
      color: 'white',
    }}
  >
    {config.content}
  </div>
);

const CaptionOverlay = ({ config }: { config: OverlayConfig }) => (
  <div
    className="absolute px-4 py-2 bg-background/90 backdrop-blur-sm rounded-lg text-sm md:text-base font-medium text-foreground shadow-lg pointer-events-none"
    style={{
      left: config.position.x,
      top: config.position.y,
      maxWidth: config.position.width || '300px',
    }}
  >
    {config.content}
  </div>
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
      {/* Static Slide Background */}
      <img
        src={slideImage}
        alt="Business model slide"
        className="w-full h-full object-contain bg-white"
      />
      
      {/* Static Overlays - only shown when active */}
      {isActive && overlays.map((overlay) => {
        switch (overlay.type) {
          case 'highlight':
            return <HighlightOverlay key={overlay.id} config={overlay} stepColor={stepColor} />;
          case 'callout':
            return <CalloutBadge key={overlay.id} config={{...overlay, content: t(overlay.content || '')}} stepColor={stepColor} />;
          case 'caption':
            return <CaptionOverlay key={overlay.id} config={{...overlay, content: t(overlay.content || '')}} />;
          default:
            return null;
        }
      })}
    </div>
  );
};

export default SlideWithOverlays;
