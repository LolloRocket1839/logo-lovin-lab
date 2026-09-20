import jungleRentLogo from "@/assets/jungle-rent-logo-new.svg";

export const HeroLogo = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <img
        src={jungleRentLogo}
        alt="Jungle Rent"
        width={384}
        height={384}
        className="w-40 h-40 md:w-72 md:h-72 lg:w-96 lg:h-96 mx-auto block"
        fetchPriority="high"
        decoding="async"
      />
    </div>
  );
};