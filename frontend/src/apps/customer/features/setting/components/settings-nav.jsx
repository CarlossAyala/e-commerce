import { NavLink } from "react-router-dom";
import { settingsNav } from "../utils";
import { cn } from "../../../../../libs/utils";
import { buttonVariants } from "../../../../../components";

export const SettingsNav = () => {
  return (
    <aside className="w-full overflow-x-auto border-y border-black/10 py-2 sm:border-0 sm:p-0">
      <nav className="flex gap-1 sm:flex-col">
        {settingsNav.map((nav) => (
          <NavLink
            key={nav.name}
            to={nav.to}
            end
            className={({ isActive }) =>
              cn(
                buttonVariants({ variant: "ghost" }),
                "justify-start",
                isActive
                  ? "bg-muted hover:bg-muted"
                  : "hover:bg-transparent hover:underline",
              )
            }
          >
            {nav.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
