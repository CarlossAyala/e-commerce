import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Button, Sheet, SheetContent } from "@/components";
import { LogoAdmin } from "./logo-admin";
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
          <div className="flex items-center px-6 pt-4">
            <LogoAdmin />
          </div>
          <div className="mt-4">
            <SideNav />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
