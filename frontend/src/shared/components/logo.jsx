import { Link, useLocation } from "react-router-dom";
import { cn, getCurrentApp } from "../utils";

export const Logo = ({ className }) => {
  const location = useLocation();
  const { label, to } = getCurrentApp(location.pathname);

  return (
    <Link
      to={to}
      className={cn(
        "inline-flex w-max flex-col space-y-1 rounded-sm p-1 text-sm sm:-mx-1",
        className,
      )}
    >
      <p className="font-normal leading-3">Legger</p>
      <p className="font-semibold capitalize leading-3">{label}</p>
    </Link>
  );
};
