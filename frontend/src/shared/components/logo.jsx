import { Link } from "react-router-dom";
import { cn } from "@/libs";

const getCurrentApp = () => {
  const { pathname } = new URL(window.location.href);

  if (pathname.startsWith("/admin")) {
    return { label: "Admin", to: "/admin" };
  } else if (pathname.startsWith("/seller")) {
    return { label: "Seller", to: "/seller" };
  } else {
    return { label: "E-Commerce", to: "/" };
  }
};

export const Logo = ({ className }) => {
  const { label, to } = getCurrentApp();

  return (
    <Link
      to={to}
      className={cn(
        "inline-flex flex-col space-y-1.5 rounded-sm p-1",
        className,
      )}
    >
      <p className="font-normal leading-3">Legger</p>
      <p className="font-semibold capitalize leading-3">{label}</p>
    </Link>
  );
};
