import { Link } from "react-router-dom";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useGetProfile, useSignout } from "@/shared/auth";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Skeleton,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components";
import { getFullName, getInitials } from "@/utils";
import { CUSTOMER_NAV } from "../config";

const { orders, history, bookmarks, questions, reviews, settings } =
  CUSTOMER_NAV;
const navs = [orders, history, bookmarks, questions, reviews];

export const UserNav = () => {
  const signout = useSignout();

  const { data: customer, isLoading, isError, error } = useGetProfile();

  const handleSignout = () => {
    signout.mutate(null);
  };

  const fullName = getFullName(customer);

  return (
    <>
      {isLoading ? (
        <Skeleton className="size-9 rounded-full" />
      ) : isError ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <ExclamationTriangleIcon className="size-5 text-red-400" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                <span className="font-medium">Error:</span> {error.message}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full"
            >
              <Avatar>
                <AvatarImage src={customer.avatar} alt={fullName} />
                <AvatarFallback className="font-normal">
                  {getInitials(fullName)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-52" align="end" forceMount>
            <DropdownMenuLabel className="space-y-1 font-normal">
              <p className="truncate text-sm font-medium leading-none">
                {fullName}
              </p>
              <p className="truncate text-xs leading-none text-muted-foreground">
                {customer.email}
              </p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {navs.map((nav, index) => (
                <DropdownMenuItem asChild key={index}>
                  <Link to={nav.to}>{nav.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link to={settings.to}>{settings.name}</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={handleSignout}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};
