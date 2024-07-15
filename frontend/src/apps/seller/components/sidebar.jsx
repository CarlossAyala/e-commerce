import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import {
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/shared/components";
import { LogoSeller } from "./logo-seller";
import { SideNav } from "./side-nav";

export const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        size="icon"
        variant="outline"
        className="tablet:hidden"
        onClick={() => setOpen(true)}
      >
        <Bars3Icon className="size-5" />
      </Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SheetTitle className="sr-only">Sidebar</SheetTitle>
          <SheetDescription className="sr-only">Sidebar</SheetDescription>
          <div className="flex items-center px-6 pt-4">
            <LogoSeller />
          </div>
          <div className="mt-4">
            <SideNav />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
