import { NavLink } from "react-router-dom";
import { Logo } from "@/shared/components";
import { Separator } from "@/components";
import { cn } from "@/libs";
import { MAIN_NAV } from "../config";

export const Footer = () => {
  return (
    <footer className="border-t py-6">
      <div className="container space-y-6">
        <section className="flex items-center justify-between gap-4">
          <Logo />

          <div className="flex gap-4">
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
          </div>
        </section>

        <Separator />

        <section className="text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} <strong>Fake-Commerce</strong>.
            All rights reserved.
          </p>
        </section>
      </div>
    </footer>
  );
};
