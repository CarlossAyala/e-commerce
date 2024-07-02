import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { cn } from "@/shared/utils";

export const LogoSeller = ({ className }) => {
  return (
    <Link
      to="/seller"
      className={cn("flex items-center font-medium", className)}
    >
      <span className="leading-none">Legger</span>
      <XMarkIcon className="size-8 stroke-1 text-muted-foreground" />
      <span className="leading-none">Seller</span>
    </Link>
  );
};
