import { useState } from "react";
import { Link } from "react-router-dom";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Logo,
} from "../../../components";
import { cn } from "../../../libs/utils";
import SidebarMobile from "./sidebar-mobile";

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
            className="-ml-2"
          >
            <Bars3CenterLeftIcon className="h-6 w-6 text-gray-600" />
          </Button>
          <Logo />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full">
            <Avatar>
              <AvatarImage src={null} alt="@user" />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={8} align="end">
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                <p className="font-medium">Carlos Ayala</p>
                <p className="w-[200px] truncate text-sm text-muted-foreground">
                  infocarlosayala@gmail.com
                </p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/account">Account</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/store">Store</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={(event) => {
                event.preventDefault();
              }}
            >
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <SidebarMobile open={sidebar} onOpenChange={setSidebar} />
    </header>
  );
};

export default Header;
