import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Bars3Icon,
  BookOpenIcon,
  BuildingStorefrontIcon,
  CubeIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { Logo } from "@/shared/components";
import { cn } from "@/shared/utils";
import { Button, Sheet, SheetContent, SheetHeader } from "@/shared/components";
import { ECOMMERCE_NAV } from "../config";

const { home, categories, stores, products } = ECOMMERCE_NAV;
const items = [
  { ...home, icon: HomeIcon },
  { ...categories, icon: BookOpenIcon },
  { ...products, icon: CubeIcon },
  { ...stores, icon: BuildingStorefrontIcon },
];

export const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="ghost"
        size="icon"
        className="-ml-2 sm:hidden"
      >
        <Bars3Icon className="size-5 text-foreground" />
        <span className="sr-only">Open sidebar</span>
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="p-0">
          <SheetHeader className="p-4 text-start">
            <Logo className="-mx-1" />
          </SheetHeader>
          <nav className="grid px-2 text-sm font-medium">
            {items.map((link, index) => (
              <NavLink
                key={index}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 rounded-lg p-2 text-muted-foreground transition-all",
                    isActive
                      ? "bg-primary text-foreground"
                      : "hover:text-primary",
                  )
                }
                onClick={() => setOpen(false)}
              >
                <link.icon className="size-4 stroke-2" />
                {link.name}
              </NavLink>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
};
