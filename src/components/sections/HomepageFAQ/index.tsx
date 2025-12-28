import { HomepageFAQDesktop } from './HomepageFAQDesktop';
import { HomepageFAQMobile } from './HomepageFAQMobile';

export const HomepageFAQ = () => {
  return (
    <>
      <div className="hidden md:block">
        <HomepageFAQDesktop />
      </div>
      <HomepageFAQMobile />
    </>
  );
};

export default HomepageFAQ;
