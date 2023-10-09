import { Link, useLocation } from "react-router-dom";
import { settingActionRoutes, settingsNav } from "../utils";
import { cn } from "../../../../../libs/utils";
import { buttonVariants } from "../../../../../components";

/**
 * @param {Location} location
 * @param {string} path
 * @returns {Boolean}
 */
const isCurrentPath = (location, path) => {
  if (location.pathname === path) return true;
  else if (
    location.pathname.includes(path) &&
    settingActionRoutes.base !== path
  ) {
    return true;
  }
};

export const SettingsNav = () => {
  const location = useLocation();

  return (
    <aside className="w-full overflow-x-auto border-y border-black/10 py-2 sm:border-0 sm:p-0">
      <nav className="flex gap-1 sm:flex-col">
        {settingsNav.map((nav) => (
          <Link
            key={nav.name}
            to={nav.to}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              isCurrentPath(location, nav.to)
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline",
              "justify-start",
            )}
          >
            {nav.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};