import investIllustration from "@/assets/journey-step-invest.jpg";
import acquireIllustration from "@/assets/journey-step-acquire.jpg";
import manageIllustration from "@/assets/journey-step-manage.jpg";
import earnIllustration from "@/assets/journey-step-earn.jpg";
import jungleRentLogo from "@/assets/jungle-rent-logo.svg";

interface StepIllustrationProps {
  step: "invest" | "acquire" | "manage" | "earn";
  isActive: boolean;
}

export const StepIllustration = ({ step, isActive }: StepIllustrationProps) => {
  const illustrations: Record<typeof step, { src: string; alt: string }> = {
    invest: {
      src: investIllustration,
      alt: "Investi da €100 in immobili",
    },
    acquire: {
      src: acquireIllustration,
      alt: "Acquistiamo immobili vicino ai 7 atenei torinesi",
    },
    manage: {
      src: manageIllustration,
      alt: "Jungle Rent gestisce tutto",
    },
    earn: {
      src: earnIllustration,
      alt: "Dashboard rendite trimestrali",
    },
  };

  const { src, alt } = illustrations[step];

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className={`relative transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
        <img
          src={src}
          alt={alt}
          className="w-full h-auto max-w-[500px] object-contain rounded-2xl shadow-md"
        />
        <img
          src={jungleRentLogo}
          alt="Jungle Rent"
          className="absolute bottom-3 right-3 w-12 md:w-16 opacity-70"
        />
      </div>
    </div>
  );
};
