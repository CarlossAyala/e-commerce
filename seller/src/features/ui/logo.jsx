import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/"
      className="px-2 flex h-10 flex-col justify-center text-black/90"
    >
      <p className="text-sm leading-none">Fak-Ommerce</p>
      <p className="text-sm font-semibold leading-normal">[Seller]</p>
    </Link>
  );
};

export default Logo;
