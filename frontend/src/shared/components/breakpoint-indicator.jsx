import { cn } from "@/libs";
import { useEffect, useState } from "react";

export const BreakpointIndicator = () => {
  const [show, setShow] = useState(false);
  let timeoutId;

  useEffect(() => {
    const handleResize = () => {
      clearTimeout(timeoutId);

      setShow(true);

      // eslint-disable-next-line react-hooks/exhaustive-deps
      timeoutId = setTimeout(() => setShow(false), 1500);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  if (import.meta.env.PROD) return null;

  return (
    <div
      className={cn(
        "fixed left-1/2 top-2 z-[9999] flex -translate-x-1/2 items-center justify-center rounded bg-black px-2 py-1 font-mono text-xs leading-3 text-primary-foreground transition",
        show ? "opacity-100" : "opacity-0",
      )}
    >
      <span className="block sm:hidden">xs</span>
      <span className="hidden sm:block md:hidden">sm</span>
      <span className="hidden md:block lg:hidden">md</span>
      <span className="hidden lg:block xl:hidden">lg</span>
      <span className="hidden xl:block 2xl:hidden">xl</span>
      <span className="hidden 2xl:block">2xl</span>
    </div>
  );
};
