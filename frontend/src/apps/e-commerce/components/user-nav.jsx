import { Link } from "react-router-dom";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Spinner } from "@/shared/components";
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
} from "@/components";
import { getFullName, getInitials } from "@/utils";
import { ECOMMERCE_NAV } from "../config";

const { orders, history, bookmarks, questions, reviews, settings } =
  ECOMMERCE_NAV;
const navs = [orders, history, bookmarks, questions, reviews];

export const UserNav = () => {
  const signout = useSignout();

  const { data: customer, isLoading, isError, error } = useGetProfile();

  const handleSignout = () => {
    signout.mutate(null);
  };

  const fullName = getFullName(customer);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          {isLoading ? (
            <Skeleton className="size-full" />
          ) : isError ? (
            <ExclamationTriangleIcon className="size-4" />
          ) : (
            <Avatar>
              <AvatarImage src={customer.avatar} alt={fullName} />
              <AvatarFallback className="font-normal">
                {getInitials(fullName)}
              </AvatarFallback>
            </Avatar>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52" align="end" forceMount>
        {isLoading ? (
          <div className="space-y-1 p-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-full" />
          </div>
        ) : isError ? (
          <DropdownMenuLabel className="font-normal">
            <p className="line-clamp-2 text-center text-sm text-muted-foreground">
              {error.message}
            </p>
          </DropdownMenuLabel>
        ) : (
          <DropdownMenuLabel className="space-y-1 font-normal">
            <p className="truncate text-sm font-medium leading-none">
              {fullName}
            </p>
            <p className="truncate text-xs leading-none text-muted-foreground">
              {customer.email}
            </p>
          </DropdownMenuLabel>
        )}
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
        <DropdownMenuItem onSelect={handleSignout} disabled={signout.isLoading}>
          {signout.isLoading && <Spinner className="mr-2 size-4" />}
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
