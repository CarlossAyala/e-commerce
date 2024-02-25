import { Link, useLocation } from "react-router-dom";
import { CUSTOMER_NAV } from "../config";
import { cn } from "../../../libs/utils";

const { home, categories, stores, products } = CUSTOMER_NAV;
const items = [home, categories, products, stores];

export const MainNav = () => {
  const { pathname } = useLocation();
  return (
    <nav className="mx-6 hidden items-center space-x-4 sm:flex">
      {items.map((nav) => (
        <Link
          key={nav.name}
          to={nav.to}
          className={cn(
            "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
            pathname === nav.to && "text-primary",
          )}
        >
          {nav.name}
        </Link>
      ))}
    </nav>
  );
};
