import { useIsMobile } from '@/hooks/use-mobile';
import { HowItWorksDesktop } from './HowItWorksDesktop';
import { HowItWorksMobile } from './HowItWorksMobile';

export const HowItWorks = () => {
  const isMobile = useIsMobile();
  
  // Return appropriate version based on screen size
  // Note: We render both and use CSS to hide/show for SSR compatibility
  return (
    <>
      <div className="hidden md:block">
        <HowItWorksDesktop />
      </div>
      <HowItWorksMobile />
    </>
  );
};

export default HowItWorks;
