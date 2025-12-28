import { InvestorSectionDesktop } from './InvestorSectionDesktop';
import { InvestorSectionMobile } from './InvestorSectionMobile';

export const InvestorSection = () => {
  return (
    <>
      <div className="hidden md:block">
        <InvestorSectionDesktop />
      </div>
      <InvestorSectionMobile />
    </>
  );
};

export default InvestorSection;
