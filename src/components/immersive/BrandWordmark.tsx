/**
 * BrandWordmark
 * Static oversized wordmark behind the page.
 */
export const BrandWordmark = ({ word = "TORINO" }: { word?: string }) => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden flex items-center justify-center select-none"
    >
      <span
        className="font-display font-extrabold tracking-tighter text-primary whitespace-nowrap leading-none"
        style={{
          fontSize: "clamp(18rem, 38vw, 44rem)",
          opacity: 0.04,
        }}
      >
        {word}
      </span>
    </div>
  );
};
