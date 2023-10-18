import { Link } from "react-router-dom";
import { usePrefixApp } from "../hooks";
import { cn } from "../libs/utils";

const Logo = ({ className }) => {
  const prefix = usePrefixApp();

  return (
    <Link
      to="/seller"
      className={cn(
        "flex h-10 flex-col justify-center px-2 text-black/90",
        className,
      )}
    >
      <p className="text-sm leading-none">Fake-Commerce</p>
      <p className="mt-0.5 text-sm font-semibold capitalize leading-none">
        [ {prefix} ]
      </p>
    </Link>
  );
};

export default Logo;
