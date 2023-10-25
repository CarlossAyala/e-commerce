import { Bars3CenterLeftIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Logo,
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../../../../components";
import { Sidebar } from "./sidebar";
import { useSidebarStore } from "./store";

export const SidebarMobile = () => {
  const { isOpen, setToggle } = useSidebarStore();

  return (
    <Sheet open={isOpen} onOpenChange={setToggle}>
      <div className="-ml-2 flex items-center gap-1 lg:hidden">
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Bars3CenterLeftIcon className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <Logo app="admin" />
      </div>
      <SheetContent className="max-w-[276px] p-0" side="left">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
