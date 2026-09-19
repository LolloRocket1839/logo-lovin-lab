import jungleRentLogo from "@/assets/jungle-rent-logo-new.svg";

export const HeroLogo = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <img
        src={jungleRentLogo}
        alt="Jungle Rent"
        width={240}
        height={240}
        className="w-32 h-32 md:w-60 md:h-60 mx-auto block"
        fetchPriority="high"
        decoding="async"
      />
    </div>
  );
};