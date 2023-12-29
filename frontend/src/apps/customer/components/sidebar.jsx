import {
  Bars3CenterLeftIcon,
  BookOpenIcon,
  BuildingStorefrontIcon,
  CubeIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  Logo,
  Sheet,
  SheetContent,
  SheetHeader,
  buttonVariants,
} from "../../../components";
import { navigation } from "../config";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../../libs/utils";
import { useState } from "react";

const { home, categories, stores, products } = navigation;
const items = [
  { ...home, icon: HomeIcon },
  { ...categories, icon: BookOpenIcon },
  { ...products, icon: CubeIcon },
  { ...stores, icon: BuildingStorefrontIcon },
];

const SidebarLink = ({ name, to, icon: Icon, setOpen }) => {
  const { pathname } = useLocation();
  const variant = pathname === to ? "default" : "ghost";

  return (
    <Link
      to={to}
      className={cn(
        buttonVariants({ variant, size: "lg" }),
        "justify-start px-3",
      )}
      onClick={() => setOpen(false)}
    >
      <Icon className="mr-2 h-4 w-4" />
      {name}
    </Link>
  );
};

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
        <Bars3CenterLeftIcon className="h-6 w-6" />
        <span className="sr-only">Open sidebar</span>
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="py-3">
          <SheetHeader className="mb-4 ">
            <Logo />
          </SheetHeader>
          <nav className="-ml-1 grid gap-1">
            {items.map((link, index) => (
              <SidebarLink key={index} {...link} setOpen={setOpen} />
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
};
