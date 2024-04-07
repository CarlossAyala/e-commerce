import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Bars3Icon,
  BookOpenIcon,
  BuildingStorefrontIcon,
  CubeIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { Logo } from "@/shared/components";
import { cn } from "@/libs";
import {
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  buttonVariants,
} from "@/components";
import { ECOMMERCE_NAV } from "../config";

const { home, categories, stores, products } = ECOMMERCE_NAV;
const items = [
  { ...home, icon: HomeIcon },
  { ...categories, icon: BookOpenIcon },
  { ...products, icon: CubeIcon },
  { ...stores, icon: BuildingStorefrontIcon },
];

// TODO: Check
export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="ghost"
        size="icon"
        className="-ml-2 mr-2 sm:hidden"
      >
        <Bars3Icon className="size-5 text-black" />
        <span className="sr-only">Open sidebar</span>
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="py-2">
          <SheetHeader className="mb-2">
            <Logo />
          </SheetHeader>
          <nav className="-ml-1 grid gap-1">
            {items.map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className={cn(
                  buttonVariants({
                    variant: pathname === link.to ? "default" : "ghost",
                    size: "lg",
                  }),
                  "justify-start px-3",
                )}
                onClick={() => setOpen(false)}
              >
                <link.icon className="mr-2 h-4 w-4" />
                {link.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
};
