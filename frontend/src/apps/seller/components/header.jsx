import { useState } from "react";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/outline";
import { Button, Logo } from "../../../components";
import { cn } from "../../../libs/utils";
import SidebarMobile from "./sidebar-mobile";
import UserNav from "./user-nav";

const Header = ({ className }) => {
  const [sidebar, setSidebar] = useState(false);

  return (
    <header
      className={cn("sticky -top-px z-40 border-b bg-background", className)}
    >
      <div className="container flex h-14 w-full items-center justify-between">
        <div className="flex">
          <Button
            onClick={() => setSidebar(true)}
            type="button"
            variant="ghost"
            size="icon"
            className="-ml-2 lg:hidden"
          >
            <Bars3CenterLeftIcon className="h-6 w-6 text-gray-600" />
          </Button>
          <Logo className="lg:-mx-2" />
        </div>
        <UserNav />
      </div>

      <SidebarMobile open={sidebar} onOpenChange={setSidebar} />
    </header>
  );
};

export default Header;
