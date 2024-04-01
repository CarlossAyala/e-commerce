import { NavLink } from "react-router-dom";
import { cn } from "@/libs";
import { MAIN_NAV } from "../config";

export const MainNav = () => {
  return (
    <nav className="mx-6 hidden items-center gap-x-4 sm:flex">
      {MAIN_NAV.map((nav) => (
        <NavLink
          key={nav.name}
          to={nav.to}
          className={({ isActive }) =>
            cn(
              "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
              isActive && "text-primary",
            )
          }
        >
          {nav.name}
        </NavLink>
      ))}
    </nav>
  );
};
