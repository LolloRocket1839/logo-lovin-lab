import { useEffect, useState } from "react";

const getSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

export function useViewportSize() {
  const [size, setSize] = useState(() =>
    typeof window !== "undefined" ? getSize() : { width: 375, height: 812 }
  );

  useEffect(() => {
    const onResize = () => setSize(getSize());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return size;
}
