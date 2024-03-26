import { NavLink } from "react-router-dom";
import { buttonVariants } from "@/components";
import { cn } from "@/libs";
import { settingsNav } from "../utils";

export const SettingsNav = () => {
  return (
    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
      {settingsNav.map((nav) => (
        <NavLink
          key={nav.name}
          to={nav.to}
          end
          className={({ isActive }) =>
            cn(
              buttonVariants({ variant: "ghost" }),
              isActive
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline",
              "justify-start",
            )
          }
        >
          {nav.name}
        </NavLink>
      ))}
    </nav>
  );
};
