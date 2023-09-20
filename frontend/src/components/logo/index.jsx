import { Link } from "react-router-dom";
import { usePrefixApp } from "../../hooks";

const Logo = () => {
  const prefix = usePrefixApp();

  return (
    <Link
      to="/seller"
      className="flex h-10 flex-col justify-center px-2 text-black/90"
    >
      <p className="text-sm leading-none">Fak-Ommerce</p>
      <p className="mt-0.5 text-sm font-semibold capitalize leading-none">
        [{prefix}]
      </p>
    </Link>
  );
};

export default Logo;
